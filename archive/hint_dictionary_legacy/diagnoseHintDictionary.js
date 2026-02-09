import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  buildEntries,
  buildRuleKeyMap,
  collectHintWords,
  getRuleLabel,
  tokenizeIPA
} from "./hintDictionaryCore.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawArgs = process.argv.slice(2);
const getArgValue = (name) => {
  const idx = rawArgs.indexOf(name);
  if (idx === -1) return null;
  const value = rawArgs[idx + 1];
  if (!value || value.startsWith("--")) return null;
  return value;
};
const limitArg = getArgValue("--limit");
const offsetArg = getArgValue("--offset");
const wordArg = getArgValue("--word");
const missingFileArg = getArgValue("--missing-file");
const reportPathArg = getArgValue("--report");
const maxWords = limitArg ? Math.max(0, Number(limitArg)) : null;
const startOffset = offsetArg ? Math.max(0, Number(offsetArg)) : 0;
const reportPath = reportPathArg
  ? path.resolve(__dirname, reportPathArg)
  : path.join(__dirname, "../src/data/hint_dictionary_diagnostics.json");
const missingFilePath = missingFileArg
  ? path.resolve(__dirname, missingFileArg)
  : null;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const BASE_DELAY_MS = 500;
const MAX_RETRIES = 4;

const findIpaText = (data, word) => {
  if (!Array.isArray(data)) return null;
  const wantsRhotic = Boolean(word && word.toUpperCase().includes("R"));
  if (wantsRhotic) {
    for (const entry of data) {
      if (entry?.phonetic && /r/.test(entry.phonetic)) return entry.phonetic;
      if (Array.isArray(entry?.phonetics)) {
        const match = entry.phonetics.find((p) => p?.text && /r/.test(p.text))?.text;
        if (match) return match;
      }
    }
  }
  for (const entry of data) {
    if (entry?.phonetic) return entry.phonetic;
    if (Array.isArray(entry?.phonetics)) {
      const match = entry.phonetics.find((p) => p?.text)?.text;
      if (match) return match;
    }
  }
  return null;
};

const fetchIpa = async (word, attempt = 1) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (!response.ok) {
      if (response.status === 429 && attempt <= MAX_RETRIES) {
        await sleep(BASE_DELAY_MS * (attempt + 2));
        return fetchIpa(word, attempt + 1);
      }
      if (response.status >= 500 && attempt <= MAX_RETRIES) {
        await sleep(BASE_DELAY_MS * (attempt + 1));
        return fetchIpa(word, attempt + 1);
      }
      return { ipa: null, errorType: "fetch" };
    }
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return { ipa: null, errorType: "fetch" };
    }
    const data = await response.json();
    if (data?.title === "No Definitions Found") {
      return { ipa: null, errorType: "missing" };
    }
    return { ipa: findIpaText(data, word), errorType: null };
  } catch (error) {
    if (attempt <= MAX_RETRIES) {
      await sleep(BASE_DELAY_MS * (attempt + 1));
      return fetchIpa(word, attempt + 1);
    }
    return { ipa: null, errorType: "fetch" };
  }
};

const run = async () => {
  const ruleMap = buildRuleKeyMap();
  const unknownSymbols = new Set();
  let words = collectHintWords();
  if (missingFilePath) {
    const text = fs.readFileSync(missingFilePath, "utf-8");
    words = text
      .split(/\r?\n/g)
      .map((line) => line.trim().toUpperCase())
      .filter(Boolean);
  } else if (wordArg) {
    words = [wordArg.toUpperCase()];
  }
  const subset = maxWords == null
    ? words.slice(startOffset)
    : words.slice(startOffset, startOffset + maxWords);

  const results = [];
  let consecutiveFetchErrors = 0;

  for (const word of subset) {
    let result = await fetchIpa(word);
    await sleep(BASE_DELAY_MS);
    if (!result.ipa) result = await fetchIpa(word.toLowerCase());
    if (!result.ipa) {
      if (result.errorType === "fetch") {
        consecutiveFetchErrors += 1;
        results.push({ word, status: "api_error" });
        continue;
      }
      consecutiveFetchErrors = 0;
      results.push({ word, status: "missing_ipa" });
      continue;
    }
    consecutiveFetchErrors = 0;

    const entriesData = buildEntries(word, result.ipa, unknownSymbols);
    if (!entriesData) {
      results.push({ word, status: "tokenize_failed", ipa: result.ipa });
      continue;
    }

    const entries = entriesData.entries.map((entry) => {
      const ruleLabel = getRuleLabel(entry.soundId);
      const exactKey = `${entry.grapheme}||${entry.soundId ?? null}`;
      const exactRuleKey = ruleMap.exactMap.get(exactKey) || null;
      const fallbackRuleKey = ruleMap.soundFallback.get(`||${entry.soundId ?? null}`) || null;
      return {
        soundId: entry.soundId,
        grapheme: entry.grapheme,
        ruleLabel,
        exactKey,
        exactRuleKey,
        fallbackRuleKey
      };
    });

    const tokenized = tokenizeIPA(result.ipa, unknownSymbols, word);
    const mapped = entries.every((entry) => {
      if (entry.exactRuleKey && entry.exactRuleKey.startsWith(`${entry.ruleLabel}_`)) return true;
      if (entry.fallbackRuleKey && entry.fallbackRuleKey.startsWith(`${entry.ruleLabel}_`)) return true;
      return false;
    });

    results.push({
      word,
      status: mapped ? "mapped" : "unmapped",
      ipa: result.ipa,
      tokens: tokenized,
      entries
    });
  }

  const summary = results.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  console.log("Summary:", summary);
  if (unknownSymbols.size > 0) {
    console.log(`Unknown IPA symbols encountered: ${Array.from(unknownSymbols).join(", ")}`);
  }

  if (reportPath) {
    fs.writeFileSync(reportPath, JSON.stringify({ summary, results }, null, 2));
    console.log(`Wrote report to ${reportPath}`);
  }
};

run();

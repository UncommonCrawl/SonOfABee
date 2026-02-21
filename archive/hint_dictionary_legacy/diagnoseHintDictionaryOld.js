import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  buildEntries,
  buildRuleKeyMap,
  collectHintWords,
  getRuleLabel,
  tokenizeIPA
} from "./dictionaryCore.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envCandidates = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(__dirname, "../../.env")
];

const loadDotEnv = () => {
  for (const envPath of envCandidates) {
    if (!fs.existsSync(envPath)) continue;
    const raw = fs.readFileSync(envPath, "utf-8");
    raw.split(/\r?\n/g).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const idx = trimmed.indexOf("=");
      if (idx <= 0) return;
      const key = trimmed.slice(0, idx).trim();
      if (!key || process.env[key] !== undefined) return;
      let value = trimmed.slice(idx + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    });
    break;
  }
};

loadDotEnv();

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
  : path.join(__dirname, "dictionary_diagnostics.json");
const missingFilePath = missingFileArg
  ? path.resolve(__dirname, missingFileArg)
  : null;
const ipaPath = path.join(__dirname, "dictionary_ipa.json");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const BASE_DELAY_MS = 500;
const MAX_RETRIES = 4;
const WORDS_API_HOST = process.env.WORDS_API_HOST || "wordsapiv1.p.rapidapi.com";
const WORDS_API_KEY = process.env.WORDS_API_KEY || "";

const findIpaText = (data, word) => {
  if (!data || typeof data !== "object") return null;
  const pronunciation = data.pronunciation;
  if (!pronunciation) return null;
  const wantsRhotic = Boolean(word && word.toUpperCase().includes("R"));
  if (typeof pronunciation === "string") return pronunciation;
  if (typeof pronunciation !== "object") return null;
  const orderedKeys = wantsRhotic ? ["all", "us", "uk"] : ["us", "all", "uk"];
  for (const key of orderedKeys) {
    if (typeof pronunciation[key] === "string") {
      return pronunciation[key];
    }
  }
  const first = Object.values(pronunciation).find((value) => typeof value === "string");
  return first || null;
};

const fetchIpa = async (word, attempt = 1) => {
  if (!WORDS_API_KEY) return { ipa: null, errorType: "fetch" };
  try {
    const response = await fetch(
      `https://${WORDS_API_HOST}/words/${encodeURIComponent(word)}/pronunciation`,
      {
        headers: {
          "x-rapidapi-host": WORDS_API_HOST,
          "x-rapidapi-key": WORDS_API_KEY
        }
      }
    );
    if (!response.ok) {
      if (response.status === 404) {
        return { ipa: null, errorType: "missing" };
      }
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
    if (data?.success === false || data?.message === "word not found") {
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

const readIpaMap = () => {
  if (!fs.existsSync(ipaPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(ipaPath, "utf-8"));
  } catch {
    return {};
  }
};

const writeIpaMap = (ipaMap) => {
  const sortedEntries = Object.entries(ipaMap).sort(([a], [b]) => a.localeCompare(b));
  const output = JSON.stringify(Object.fromEntries(sortedEntries), null, 2) + "\n";
  fs.writeFileSync(ipaPath, output, "utf-8");
};

const run = async () => {
  if (!WORDS_API_KEY) {
    console.error("Missing WORDS_API_KEY in environment. Add it to local .env.");
    process.exit(1);
  }

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
  const ipaMap = readIpaMap();
  let ipaMapChanged = false;

  for (const word of subset) {
    let result = ipaMap[word]
      ? { ipa: ipaMap[word], errorType: null }
      : await fetchIpa(word);
    if (!result.ipa) {
      await sleep(BASE_DELAY_MS);
      result = await fetchIpa(word.toLowerCase());
    }
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
    if (ipaMap[word] !== result.ipa) {
      ipaMap[word] = result.ipa;
      ipaMapChanged = true;
    }

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
  if (ipaMapChanged) {
    writeIpaMap(ipaMap);
    console.log("Updated IPA cache.");
  }

  if (reportPath) {
    fs.writeFileSync(reportPath, JSON.stringify({ summary, results }, null, 2));
    console.log(`Wrote report to ${reportPath}`);
  }
};

run();

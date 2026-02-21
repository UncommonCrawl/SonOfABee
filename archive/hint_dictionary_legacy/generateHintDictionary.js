import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import {
  buildRuleKeyMap,
  collectHintWords,
  toRuleKeys
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
const args = new Set(rawArgs);
const shouldWrite = args.has("--write");
const getArgValue = (name) => {
  const idx = rawArgs.indexOf(name);
  if (idx === -1) return null;
  const value = rawArgs[idx + 1];
  if (!value || value.startsWith("--")) return null;
  return value;
};
const sourceMode = getArgValue("--source");
const limitArg = getArgValue("--limit");
const offsetArg = getArgValue("--offset");
const maxWords = limitArg ? Math.max(0, Number(limitArg)) : null;
const startOffset = offsetArg ? Math.max(0, Number(offsetArg)) : 0;

const outputPath = path.join(__dirname, "../../src/data/dictionary.js");
const missingPath = path.join(__dirname, "dictionary_missing.txt");
const queuePath = path.join(__dirname, "dictionary_queue.txt");
const ipaPath = path.join(__dirname, "dictionary_ipa.json");
const existingPath = pathToFileURL(outputPath).href;

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

const readExistingDictionary = async () => {
  if (!fs.existsSync(outputPath)) return {};
  try {
    const module = await import(existingPath);
    if (module?.dictionary && typeof module.dictionary === "object") {
      return module.dictionary;
    }
  } catch (error) {
    console.warn("⚠️  Failed to load existing dictionary.js:", error.message);
  }
  return {};
};

const writeDictionary = (dictionary) => {
  const sortedEntries = Object.entries(dictionary).sort(([a], [b]) => a.localeCompare(b));
  const body = sortedEntries
    .map(([word, rules]) => `  "${word}": ${JSON.stringify(rules)}`)
    .join(",\n");
  const output = `export const dictionary = {\n${body}\n};\n`;
  fs.writeFileSync(outputPath, output, "utf-8");
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

const readMissingWords = () => {
  if (!fs.existsSync(missingPath)) return new Set();
  const text = fs.readFileSync(missingPath, "utf-8");
  const words = text
    .split(/\r?\n/g)
    .map((line) => line.trim().toUpperCase())
    .filter(Boolean);
  return new Set(words);
};

const readQueueWords = () => {
  if (!fs.existsSync(queuePath)) return null;
  const text = fs.readFileSync(queuePath, "utf-8");
  const words = text
    .split(/\r?\n/g)
    .map((line) => line.trim().toUpperCase())
    .filter(Boolean);
  return new Set(words);
};

const writeQueueWords = (queueWords) => {
  const sorted = Array.from(queueWords).sort((a, b) => a.localeCompare(b));
  fs.writeFileSync(queuePath, sorted.join("\n") + "\n", "utf-8");
};

const writeMissingWords = (missingWords) => {
  const sorted = Array.from(missingWords).sort((a, b) => a.localeCompare(b));
  fs.writeFileSync(missingPath, sorted.join("\n") + "\n", "utf-8");
};

const run = async () => {
  if (!WORDS_API_KEY) {
    console.error("Missing WORDS_API_KEY in environment. Add it to local .env.");
    process.exit(1);
  }

  const existing = await readExistingDictionary();
  const existingWords = new Set(Object.keys(existing));
  const missingWordSet = readMissingWords();
  const queueWordSet = readQueueWords();
  const allWords = collectHintWords()
    .filter((word) => !existingWords.has(word))
    .filter((word) => !missingWordSet.has(word));
  const workingQueue = queueWordSet ?? new Set(allWords);
  const missingSource = sourceMode === "missing";
  const dictionarySource = sourceMode === "dictionary";
  if (missingSource) {
    for (const word of workingQueue) {
      if (!missingWordSet.has(word)) {
        // ensure queue doesn't overlap missing when forcing missing mode
        workingQueue.delete(word);
      }
    }
    for (const word of missingWordSet) workingQueue.add(word);
  }
  if (dictionarySource) {
    workingQueue.clear();
    for (const word of existingWords) workingQueue.add(word);
  }
  const queueList = Array.from(workingQueue);
  const words = maxWords == null
    ? queueList.slice(startOffset)
    : queueList.slice(startOffset, startOffset + maxWords);
  const ruleMap = buildRuleKeyMap();
  const unknownSymbols = new Set();
  const ipaMap = readIpaMap();
  let ipaMapChanged = false;

  const nextDictionary = { ...existing };
  const missing = [];
  let consecutiveFetchErrors = 0;
  const processed = new Set();

  for (const word of words) {
    let status = "unprocessed";
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
        if (consecutiveFetchErrors >= 5) {
          console.log("Stopping: 5+ API fetch errors in a row (likely timeout).");
          break;
        }
        status = "api_error";
        console.log(`${word}: ${status}`);
        if (!dictionarySource) {
          missingWordSet.add(word);
          processed.add(word);
        }
        continue;
      }
      consecutiveFetchErrors = 0;
      missing.push({ word, issue: "Missing IPA" });
      if (!dictionarySource) missingWordSet.add(word);
      status = "missing_ipa";
      console.log(`${word}: ${status}`);
      if (!dictionarySource) processed.add(word);
      continue;
    }
    consecutiveFetchErrors = 0;
    if (ipaMap[word] !== result.ipa) {
      ipaMap[word] = result.ipa;
      ipaMapChanged = true;
    }
    const ruleKeys = toRuleKeys(word, result.ipa, ruleMap, unknownSymbols);
    if (!ruleKeys) {
      missing.push({ word, issue: "Unmapped phoneme/grapheme pair" });
      if (!dictionarySource) missingWordSet.add(word);
      status = "unmapped";
      console.log(`${word}: ${status}`);
      if (!dictionarySource) processed.add(word);
      continue;
    }
    nextDictionary[word] = ruleKeys;
    status = "mapped";
    console.log(`${word}: ${status}`);
    processed.add(word);
  }

  if (!shouldWrite) {
    if (ipaMapChanged) {
      writeIpaMap(ipaMap);
      console.log("Updated IPA cache.");
    }
    console.log(`Would add ${Object.keys(nextDictionary).length - Object.keys(existing).length} words.`);
    if (unknownSymbols.size > 0) {
      console.log(`Unknown IPA symbols encountered: ${Array.from(unknownSymbols).join(", ")}`);
    }
    if (missing.length > 0) {
      console.log(`Missing ${missing.length} words:`);
      for (const entry of missing) {
        console.log(`- ${entry.word}: ${entry.issue}`);
      }
    }
    console.log("Run with --write to update dictionary.js.");
    return;
  }

  writeDictionary(nextDictionary);
  if (ipaMapChanged) writeIpaMap(ipaMap);
  if (!dictionarySource) writeMissingWords(missingWordSet);
  for (const word of processed) workingQueue.delete(word);
  if (!missingSource) writeQueueWords(workingQueue);
  console.log(`Wrote ${Object.keys(nextDictionary).length} words to dictionary.js.`);
  if (unknownSymbols.size > 0) {
    console.log(`Unknown IPA symbols encountered: ${Array.from(unknownSymbols).join(", ")}`);
  }
  if (missing.length > 0) {
    console.log(`Missing ${missing.length} words:`);
    for (const entry of missing) {
      console.log(`- ${entry.word}: ${entry.issue}`);
    }
  }
};

run();

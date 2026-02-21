import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dictionary } from "../src/data/dictionary.js";
import { rawIpaCache } from "../src/data/raw_ipa_cache.js";
import { buildRuleKeyMap, normalizeIpa, toRuleKeys } from "./dictionaryCore.js";
import { fetchIpaForWord, loadDotEnv } from "./wordsApi.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const limitArg = getArgValue("--limit");
const offsetArg = getArgValue("--offset");
const batchSizeArg = getArgValue("--batch-size");
const batchPauseArg = getArgValue("--batch-pause-ms");
const errorPauseArg = getArgValue("--error-pause-ms");
const maxWords = limitArg ? Math.max(0, Number(limitArg)) : 100;
const startOffset = offsetArg ? Math.max(0, Number(offsetArg)) : 0;
const batchSize = batchSizeArg ? Math.max(1, Number(batchSizeArg)) : 20;
const batchPauseMs = batchPauseArg ? Math.max(0, Number(batchPauseArg)) : 10000;
const errorPauseMs = errorPauseArg ? Math.max(0, Number(errorPauseArg)) : 20000;

const dictionaryPath = path.join(__dirname, "../src/data/dictionary.js");
const rawCachePath = path.join(__dirname, "../src/data/raw_ipa_cache.js");
const ruleMap = buildRuleKeyMap({ minUsage: 5 });

const writeRawIpaCache = (cache) => {
  const sortedEntries = Object.entries(cache).sort(([a], [b]) => a.localeCompare(b));
  const body = sortedEntries
    .map(([word, ipa]) => `  "${word}": ${JSON.stringify(ipa)}`)
    .join(",\n");
  const output =
    "// Raw IPA from external sources (WordsAPI). This is intentionally unnormalized.\n" +
    "// dictionaryCore.js applies normalization at conversion time.\n" +
    `export const rawIpaCache = {\n${body}\n};\n`;
  fs.writeFileSync(rawCachePath, output, "utf-8");
};

const writeDictionary = (nextDictionary) => {
  const sortedEntries = Object.entries(nextDictionary).sort(([a], [b]) => a.localeCompare(b));
  const body = sortedEntries
    .map(([word, rules]) => `  "${word}": ${JSON.stringify(rules)}`)
    .join(",\n");
  const output = `export const dictionary = {\n${body}\n};\n`;
  fs.writeFileSync(dictionaryPath, output, "utf-8");
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const BASE_DELAY_MS = 300;

const run = async () => {
  loadDotEnv();
  const test = await fetchIpaForWord("test");
  if (test.errorType === "missing_key") {
    console.error("Missing WORDS_API_KEY in environment. Add it to local .env.");
    process.exit(1);
  }

  const selectedWords = Object.keys(dictionary)
    .sort((a, b) => a.localeCompare(b))
    .slice(startOffset, startOffset + maxWords);

  const nextDictionary = { ...dictionary };
  const nextRawCache = { ...(rawIpaCache || {}) };
  const unknownSymbols = new Set();

  const fetchedIpa = [];
  const missingIpa = [];
  const fetchErrors = [];
  let cachedUsed = 0;
  let updatedRuleKeys = 0;
  let keptExistingOnNull = 0;

  for (let i = 0; i < selectedWords.length; i += batchSize) {
    const batchWords = selectedWords.slice(i, i + batchSize);
    let batchFetchAttempts = 0;
    let batchFetchErrors = 0;

    for (const word of batchWords) {
      let rawIpa = nextRawCache[word] || null;

      if (!rawIpa) {
        batchFetchAttempts += 1;
        let result = await fetchIpaForWord(word, 1, { maxRetries: 0 });
        await sleep(BASE_DELAY_MS);
        if (!result.ipa) result = await fetchIpaForWord(word.toLowerCase(), 1, { maxRetries: 0 });

        if (!result.ipa) {
          if (result.errorType === "missing") missingIpa.push(word);
          else {
            fetchErrors.push(word);
            batchFetchErrors += 1;
          }
          continue;
        }

        rawIpa = result.ipa;
        nextRawCache[word] = rawIpa;
        fetchedIpa.push(word);
      } else {
        cachedUsed += 1;
      }

      const ipa = normalizeIpa(rawIpa, word);
      if (!ipa) {
        keptExistingOnNull += 1;
        continue;
      }

      const mappedRuleKeys = toRuleKeys(word, ipa, ruleMap, unknownSymbols);
      if (!mappedRuleKeys) {
        keptExistingOnNull += 1;
        continue;
      }

      nextDictionary[word] = mappedRuleKeys;
      updatedRuleKeys += 1;
    }

    const batchNumber = Math.floor(i / batchSize) + 1;
    const batchTotal = Math.ceil(selectedWords.length / batchSize);
    console.log(`batch=${batchNumber}/${batchTotal} words=${batchWords.length} fetch_attempts=${batchFetchAttempts} fetch_errors=${batchFetchErrors}`);

    if (i + batchSize < selectedWords.length) {
      const sustainedFetchFailure = batchFetchAttempts >= 5 && batchFetchErrors === batchFetchAttempts;
      const pauseMs = sustainedFetchFailure ? errorPauseMs : batchPauseMs;
      if (pauseMs > 0) await sleep(pauseMs);
    }
  }

  if (shouldWrite) {
    if (fetchedIpa.length > 0) writeRawIpaCache(nextRawCache);
    if (updatedRuleKeys > 0) writeDictionary(nextDictionary);
  }

  console.log(`selected_words=${selectedWords.length}`);
  console.log(`cached_ipa_used=${cachedUsed}`);
  console.log(`fetched_ipa=${fetchedIpa.length}`);
  console.log(`missing_ipa=${missingIpa.length}`);
  console.log(`fetch_errors=${fetchErrors.length}`);
  console.log(`rule_keys_updated=${updatedRuleKeys}`);
  console.log(`kept_existing_rulekeys_on_null=${keptExistingOnNull}`);
  console.log(`unknown_ipa_symbols=${unknownSymbols.size}`);
  if (unknownSymbols.size > 0) {
    console.log(`unknown_symbols_list=${Array.from(unknownSymbols).sort((a, b) => a.localeCompare(b)).join(",")}`);
  }
  if (!shouldWrite) {
    console.log("Run with --write to persist updates.");
  }
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { levelData } from "../src/data/levels.js";
import { dictionary } from "../src/data/dictionary.js";
import { fetchIpaForWord, loadDotEnv } from "./wordsApi.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cachePath = path.join(__dirname, "../src/data/raw_ipa_cache.js");
const cacheModulePath = pathToFileURL(cachePath).href;

loadDotEnv();

const BASE_DELAY_MS = 300;

const rawArgs = process.argv.slice(2);
const args = new Set(rawArgs);
const shouldWrite = args.has("--write");
const refreshAll = args.has("--refresh");
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
const maxWords = limitArg ? Math.max(0, Number(limitArg)) : null;
const startOffset = offsetArg ? Math.max(0, Number(offsetArg)) : 0;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizeWord = (value) => String(value || "").trim().toUpperCase();

const collectSourceWords = () => {
  const words = new Set();

  for (const key of Object.keys(dictionary)) {
    const word = normalizeWord(key);
    if (word) words.add(word);
  }

  for (const level of levelData) {
    const word = normalizeWord(level?.word);
    if (word) words.add(word);
  }

  return Array.from(words).sort((a, b) => a.localeCompare(b));
};

const loadRawIpaCache = async () => {
  if (!fs.existsSync(cachePath)) return {};
  try {
    const cacheBust = `?t=${Date.now()}`;
    const module = await import(`${cacheModulePath}${cacheBust}`);
    if (module?.rawIpaCache && typeof module.rawIpaCache === "object") {
      return module.rawIpaCache;
    }
  } catch {
    return {};
  }
  return {};
};

const writeRawIpaCache = (cache) => {
  const sortedEntries = Object.entries(cache).sort(([a], [b]) => a.localeCompare(b));
  const body = sortedEntries
    .map(([word, ipa]) => `  "${word}": ${JSON.stringify(ipa)}`)
    .join(",\n");
  const output = `// Raw IPA from external sources (WordsAPI). This is intentionally unnormalized.\n// dictionaryCore.js applies normalization at conversion time.\nexport const rawIpaCache = {\n${body}\n};\n`;
  fs.writeFileSync(cachePath, output, "utf-8");
};

const run = async () => {
  const test = await fetchIpaForWord("test");
  if (test.errorType === "missing_key") {
    console.error("Missing WORDS_API_KEY in environment. Add it to local .env.");
    process.exit(1);
  }

  const existingCache = await loadRawIpaCache();
  const allWords = collectSourceWords();
  const selectedWords = wordArg
    ? [normalizeWord(wordArg)]
    : (maxWords == null
      ? allWords.slice(startOffset)
      : allWords.slice(startOffset, startOffset + maxWords));

  const nextCache = { ...existingCache };
  const fetched = [];
  const missing = [];
  const fetchErrors = [];
  let skippedCached = 0;

  for (const word of selectedWords) {
    if (!refreshAll && nextCache[word]) {
      skippedCached += 1;
      continue;
    }

    let result = await fetchIpaForWord(word);
    await sleep(BASE_DELAY_MS);
    if (!result.ipa) result = await fetchIpaForWord(word.toLowerCase());

    if (!result.ipa) {
      if (result.errorType === "missing") missing.push(word);
      else fetchErrors.push(word);
      continue;
    }

    nextCache[word] = result.ipa;
    fetched.push(word);
  }

  const changed = fetched.length > 0;
  if (shouldWrite && changed) {
    writeRawIpaCache(nextCache);
  }

  console.log(`source_words=${allWords.length}`);
  console.log(`selected_words=${selectedWords.length}`);
  console.log(`cached_skipped=${skippedCached}`);
  console.log(`fetched=${fetched.length}`);
  console.log(`missing_ipa=${missing.length}`);
  console.log(`fetch_errors=${fetchErrors.length}`);
  console.log(`cache_changed=${changed}`);
  if (!shouldWrite) {
    console.log("Run with --write to persist fetched IPA to src/data/raw_ipa_cache.js.");
  } else if (changed) {
    console.log("Updated src/data/raw_ipa_cache.js.");
  }
};

run();

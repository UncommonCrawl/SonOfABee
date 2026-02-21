import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  buildRuleKeyMap,
  collectHintWords,
  normalizeIpa,
  toRuleKeys
} from "./dictionaryCore.js";
import { dictionary } from "../src/data/dictionary.js";
import { rawIpaCache } from "../src/data/raw_ipa_cache.js";
import { fetchIpaForWord } from "./wordsApi.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawArgs = process.argv.slice(2);
const args = new Set(rawArgs);
const shouldWrite = args.has("--write");
const shouldAppend = args.has("--append");

const getArgValue = (name) => {
  const idx = rawArgs.indexOf(name);
  if (idx === -1) return null;
  const value = rawArgs[idx + 1];
  if (!value || value.startsWith("--")) return null;
  return value;
};

const wordsArg = getArgValue("--words");
const wordArg = getArgValue("--word");

const dictionaryPath = path.join(__dirname, "../src/data/dictionary.js");
const rawCache = rawIpaCache && typeof rawIpaCache === "object" ? rawIpaCache : {};
const ruleMap = buildRuleKeyMap({ minUsage: 5 });

const normalizeWord = (value) => String(value || "").trim().toUpperCase();
const selectedWords = wordsArg
  ? wordsArg.split(",").map((value) => normalizeWord(value)).filter(Boolean)
  : (wordArg ? [normalizeWord(wordArg)] : null);

const run = async () => {
  const hintWords = collectHintWords();
  const missingWords = hintWords.filter((word) => !(word in dictionary));
  const targetWords = selectedWords || missingWords;
  const mappedEntries = {};
  const noIpa = [];
  const unmapped = [];
  const unknownSymbols = new Set();
  const fetchedRaw = {};

  for (const word of targetWords) {
    let ipa = null;
    let rawIpa = rawCache[word];

    if (rawIpa) {
      const cleaned = normalizeIpa(rawIpa, word);
      if (cleaned) {
        ipa = cleaned;
      }
    }

    if (!ipa) {
      const fetched = await fetchIpaForWord(word);
      if (fetched.errorType === "missing_key") {
        console.error("Missing WORDS_API_KEY in environment. Add it to local .env.");
        process.exit(1);
      }
      if (fetched.ipa) {
        rawIpa = fetched.ipa;
        fetchedRaw[word] = rawIpa;
        const cleaned = normalizeIpa(rawIpa, word);
        if (cleaned) {
          ipa = cleaned;
        }
      }
    }

    if (!ipa) {
      noIpa.push(word);
      continue;
    }

    const ruleKeys = toRuleKeys(word, ipa, ruleMap, unknownSymbols);
    if (!ruleKeys) {
      unmapped.push(word);
      continue;
    }

    mappedEntries[word] = ruleKeys;
  }

  console.log(`missing_words=${missingWords.length}`);
  console.log(`mapped_from_raw_cache=${Object.keys(mappedEntries).length}`);
  console.log(`missing_ipa=${noIpa.length}`);
  console.log(`unmapped_with_ipa=${unmapped.length}`);
  console.log(`fetched_raw_ipa=${Object.keys(fetchedRaw).length}`);

  if (Object.keys(mappedEntries).length > 0) {
    console.log("\nMapped words:");
    for (const word of Object.keys(mappedEntries).sort((a, b) => a.localeCompare(b))) {
      console.log(`${word} -> ${JSON.stringify(mappedEntries[word])}`);
    }
  }

  if (unknownSymbols.size > 0) {
    console.log(`\nUnknown IPA symbols: ${Array.from(unknownSymbols).join(", ")}`);
  }

  if (!shouldWrite) {
    console.log("\nRun with --write to merge mapped entries into src/data/dictionary.js.");
    process.exit(0);
  }

  if (Object.keys(fetchedRaw).length > 0) {
    const rawMerged = { ...rawCache, ...fetchedRaw };
    const rawEntries = Object.entries(rawMerged).sort(([a], [b]) => a.localeCompare(b));
    const rawBody = rawEntries.map(([w, ipa]) => `  "${w}": ${JSON.stringify(ipa)}`).join(",\n");
    const rawOutput = `// Raw IPA from external sources (WordsAPI). This is intentionally unnormalized.\n// dictionaryCore.js applies normalization at conversion time.\nexport const rawIpaCache = {\n${rawBody}\n};\n`;
    fs.writeFileSync(path.join(__dirname, "../src/data/raw_ipa_cache.js"), rawOutput, "utf-8");
    console.log("Updated raw IPA cache.");
  }

  if (Object.keys(mappedEntries).length === 0) {
    console.log("No mapped entries to write.");
    process.exit(0);
  }

  if (shouldAppend) {
    const orderedWords = selectedWords || Object.keys(mappedEntries);
    const newEntries = orderedWords
      .filter((word) => mappedEntries[word] && !dictionary[word])
      .map((word) => `  "${word}": ${JSON.stringify(mappedEntries[word])}`)
      .join(",\n");
    if (!newEntries) {
      console.log("No new entries to append.");
      process.exit(0);
    }
    const existing = fs.readFileSync(dictionaryPath, "utf-8");
    const marker = "export const dictionary = {";
    const start = existing.indexOf(marker);
    if (start === -1) {
      console.error("Failed to locate dictionary export in src/data/dictionary.js.");
      process.exit(1);
    }
    const end = existing.indexOf("\n};", start);
    if (end === -1) {
      console.error("Failed to locate dictionary closing brace in src/data/dictionary.js.");
      process.exit(1);
    }
    const before = existing.slice(0, end);
    const after = existing.slice(end);
    const needsComma = !before.trimEnd().endsWith(",");
    const separator = needsComma ? "," : "";
    const output = `${before}${separator}\n${newEntries}${after}`;
    fs.writeFileSync(dictionaryPath, output, "utf-8");
    console.log(`\nAppended ${newEntries.split("\n").length} entries to src/data/dictionary.js.`);
    process.exit(0);
  }

  const merged = { ...dictionary, ...mappedEntries };
  const sortedEntries = Object.entries(merged).sort(([a], [b]) => a.localeCompare(b));
  const body = sortedEntries
    .map(([word, rules]) => `  "${word}": ${JSON.stringify(rules)}`)
    .join(",\n");
  const output = `export const dictionary = {\n${body}\n};\n`;

  fs.writeFileSync(dictionaryPath, output, "utf-8");
  console.log(`\nWrote ${Object.keys(mappedEntries).length} new entries to src/data/dictionary.js.`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

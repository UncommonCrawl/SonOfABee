import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";
import {
  buildRuleKeyMap,
  collectHintWords,
  toRuleKeys
} from "./hintDictionaryCore.js";
import { hintDictionary } from "../src/data/hint_dictionary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = new Set(process.argv.slice(2));
const shouldWrite = args.has("--write");
const useEspeak = args.has("--use-espeak");

const ipaPath = path.join(__dirname, "../archive/hint_dictionary_legacy/hint_dictionary_ipa.json");
const dictionaryPath = path.join(__dirname, "../src/data/hint_dictionary.js");

if (!fs.existsSync(ipaPath)) {
  console.error(`Missing IPA cache: ${ipaPath}`);
  process.exit(1);
}

const ipaCache = JSON.parse(fs.readFileSync(ipaPath, "utf-8"));

const getIpaFromEspeak = (word) => {
  try {
    const output = execFileSync(
      "espeak-ng",
      ["-q", "--ipa", "-v", "en-us", word],
      { encoding: "utf-8" }
    );
    const ipa = String(output || "").trim();
    return ipa || null;
  } catch {
    return null;
  }
};
const ruleMap = buildRuleKeyMap({ minUsage: 5 });

const hintWords = collectHintWords();
const missingWords = hintWords.filter((word) => !(word in hintDictionary));
const mappedEntries = {};
const noIpa = [];
const unmapped = [];
const espeakMisses = [];
let mappedFromEspeak = 0;
const unknownSymbols = new Set();

for (const word of missingWords) {
  let ipa = ipaCache[word];
  if (!ipa && useEspeak) {
    ipa = getIpaFromEspeak(word);
  }
  if (!ipa) {
    if (useEspeak) espeakMisses.push(word);
    else noIpa.push(word);
    continue;
  }

  const ruleKeys = toRuleKeys(word, ipa, ruleMap, unknownSymbols);
  if (!ruleKeys) {
    unmapped.push(word);
    continue;
  }

  mappedEntries[word] = ruleKeys;
  if (useEspeak && !ipaCache[word]) mappedFromEspeak += 1;
}

console.log(`missing_words=${missingWords.length}`);
console.log(`mapped_from_archive=${Object.keys(mappedEntries).length}`);
if (useEspeak) {
  console.log(`mapped_from_espeak=${mappedFromEspeak}`);
  console.log(`missing_ipa_after_espeak=${espeakMisses.length}`);
} else {
  console.log(`missing_ipa_in_archive=${noIpa.length}`);
}
console.log(`unmapped_with_ipa=${unmapped.length}`);

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
  console.log("\nRun with --write to merge mapped entries into src/data/hint_dictionary.js.");
  if (!useEspeak) {
    console.log("Add --use-espeak to generate IPA locally with espeak-ng when missing.");
  }
  process.exit(0);
}

const merged = { ...hintDictionary, ...mappedEntries };
const sortedEntries = Object.entries(merged).sort(([a], [b]) => a.localeCompare(b));
const body = sortedEntries
  .map(([word, rules]) => `  "${word}": ${JSON.stringify(rules)}`)
  .join(",\n");
const output = `export const hintDictionary = {\n${body}\n};\n`;

fs.writeFileSync(dictionaryPath, output, "utf-8");
console.log(`\nWrote ${Object.keys(mappedEntries).length} new entries to src/data/hint_dictionary.js.`);

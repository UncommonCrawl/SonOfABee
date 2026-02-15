import { collectHintWords } from "./hintDictionaryCore.js";
import { hintDictionary } from "../src/data/hint_dictionary.js";

const hintWords = collectHintWords();
const dictionaryWords = new Set(Object.keys(hintDictionary));

const missingWords = hintWords
  .filter((word) => !dictionaryWords.has(word))
  .sort((a, b) => a.localeCompare(b));

console.log(`total_hint_words=${hintWords.length}`);
console.log(`dictionary_words=${dictionaryWords.size}`);
console.log(`missing_count=${missingWords.length}`);

if (missingWords.length > 0) {
  console.log("");
  for (const word of missingWords) {
    console.log(word);
  }
  process.exitCode = 1;
}

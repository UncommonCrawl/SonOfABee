import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { RULES } from "../src/data/rules.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = new Set(process.argv.slice(2));
const shouldWrite = args.has("--write");

const phonemeMapping = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../src/data/phoneme_mapping.json"), "utf-8")
);

const ruleEntries = Object.entries(RULES);
const pairToRuleKeys = new Map();

for (const [ruleKey, rule] of ruleEntries) {
  if (rule?.spelling == null) continue;
  const spelling = rule.spelling;
  const soundId = rule.soundId ?? null;
  const pairKey = `${spelling}||${soundId}`;
  if (!pairToRuleKeys.has(pairKey)) pairToRuleKeys.set(pairKey, []);
  pairToRuleKeys.get(pairKey).push(ruleKey);
}

const getRulesForWord = (word) => {
  const phonemes = phonemeMapping[word.toUpperCase()];
  if (!phonemes) return null;

  const chosen = [];
  const chosenMutex = new Set();
  const chosenBlocks = new Set();

  for (const phoneme of phonemes) {
    const grapheme = phoneme.grapheme ?? "";
    const soundId = phoneme.soundId ?? null;
    const pairKey = `${grapheme}||${soundId}`;
    const candidates = pairToRuleKeys.get(pairKey);
    if (!candidates || candidates.length === 0) continue;

    const ruleKey = candidates[0];
    const rule = RULES[ruleKey];
    if (!rule) continue;

    const mutex = rule.mutexGroup;
    const blocks = new Set(rule.blocks || []);

    const isBlocked =
      (mutex && chosenMutex.has(mutex)) ||
      (mutex && chosenBlocks.has(mutex)) ||
      (ruleKey && chosenBlocks.has(ruleKey)) ||
      (blocks.size > 0 && [...blocks].some((b) => chosenMutex.has(b) || chosen.includes(b)));

    if (isBlocked) continue;

    chosen.push(ruleKey);
    if (mutex) chosenMutex.add(mutex);
    for (const b of blocks) chosenBlocks.add(b);
  }

  return chosen;
};

const levelsPath = path.join(__dirname, "../src/data/levels.js");
const originalText = fs.readFileSync(levelsPath, "utf-8");
const updates = new Map();
const missingPhonemes = [];

const wordMatches = originalText.matchAll(/\bword:\s*"([^"]+)"/g);
for (const match of wordMatches) {
  const word = match[1];
  const rulesForWord = getRulesForWord(word);
  if (!rulesForWord) {
    missingPhonemes.push(word);
    continue;
  }

  if (rulesForWord.length === 0) continue;

  updates.set(word.toUpperCase(), rulesForWord);
}
const lines = originalText.split("\n");

let currentWord = null;
const nextLines = lines.map((line) => {
  const wordMatch = line.match(/\bword:\s*"([^"]+)"/);
  if (wordMatch) {
    currentWord = wordMatch[1].toUpperCase();
  }

  if (line.includes("ruleKey:") && currentWord) {
    const rules = updates.get(currentWord);
    if (rules && rules.length > 0) {
      const indentMatch = line.match(/^(\s*)ruleKey:/);
      const indent = indentMatch ? indentMatch[1] : "    ";
      if (rules.length === 1) {
        return `${indent}ruleKey: "${rules[0]}",`;
      }
      return `${indent}ruleKey: [${rules.map((r) => `"${r}"`).join(", ")}],`;
    }
  }

  if (line.trim() === "},") {
    currentWord = null;
  }

  return line;
});

const updatedText = nextLines.join("\n");

if (!shouldWrite) {
  const changedCount = [...updates.values()].length;
  console.log(`Would update ruleKey for ${changedCount} words.`);
  if (missingPhonemes.length > 0) {
    console.log(`Missing phoneme mappings for ${missingPhonemes.length} words.`);
  }
  console.log("Run with --write to apply changes.");
  process.exit(0);
}

fs.writeFileSync(levelsPath, updatedText, "utf-8");
console.log(`Updated ruleKey for ${updates.size} words in levels.js.`);
if (missingPhonemes.length > 0) {
  console.log(`Missing phoneme mappings for ${missingPhonemes.length} words.`);
}

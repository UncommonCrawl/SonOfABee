import { RULES } from "../src/data/rules.js";
import { levelData } from "../src/data/levels.js";
import { hintDictionary } from "../src/data/hint_dictionary.js";

const args = new Set(process.argv.slice(2));
const maxUsage = Number.isFinite(Number(process.argv[2])) ? Number(process.argv[2]) : 5;

const normalizeRuleKeys = (ruleKey) => {
  if (!ruleKey) return [];
  return Array.isArray(ruleKey) ? ruleKey : [ruleKey];
};

const ruleToWords = new Map();
for (const key of Object.keys(RULES)) ruleToWords.set(key, new Set());

const addWord = (ruleKey, word) => {
  if (!ruleToWords.has(ruleKey)) ruleToWords.set(ruleKey, new Set());
  ruleToWords.get(ruleKey).add(word);
};

for (const level of levelData) {
  const word = level?.word;
  if (!word) continue;
  for (const key of normalizeRuleKeys(level?.ruleKey)) addWord(key, word);
}

for (const [word, ruleKeys] of Object.entries(hintDictionary)) {
  for (const key of normalizeRuleKeys(ruleKeys)) addWord(key, word);
}

const results = [];
for (const [ruleKey, rule] of Object.entries(RULES)) {
  const usageCount = rule?.usageCount ?? 0;
  if (usageCount <= maxUsage) {
    const words = Array.from(ruleToWords.get(ruleKey) || []).sort((a, b) =>
      a.localeCompare(b)
    );
    results.push({ ruleKey, usageCount, words });
  }
}

results.sort((a, b) => a.usageCount - b.usageCount || a.ruleKey.localeCompare(b.ruleKey));

console.log(`Rules with usageCount <= ${maxUsage}: ${results.length}`);
for (const item of results) {
  console.log(`\n${item.ruleKey} (usageCount=${item.usageCount})`);
  if (item.words.length === 0) {
    console.log("  (no words found)");
  } else {
    console.log(`  ${item.words.join(", ")}`);
  }
}

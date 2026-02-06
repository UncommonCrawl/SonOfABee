import fs from "fs";
import { levelData } from "../src/data/levels.js";
import { RULES } from "../src/data/rules.js";

const phonemeMapping = JSON.parse(
  fs.readFileSync(new URL("../src/data/phoneme_mapping.json", import.meta.url), "utf-8")
);

const getPhonemesForWord = (word) => {
  if (!word) return null;
  const key = word.toUpperCase();
  const phonemes = phonemeMapping[key];
  if (!phonemes || phonemes.length === 0) return null;
  return phonemes.map((entry) => ({
    soundId: entry.soundId,
    defaultSpelling: entry.grapheme || ""
  }));
};

const issues = [];

for (const level of levelData) {
  const ruleKeys = Array.isArray(level.ruleKey)
    ? level.ruleKey
    : (level.ruleKey ? [level.ruleKey] : []);

  if (ruleKeys.length === 0) continue;

  const rules = ruleKeys.map((key) => ({ key, rule: RULES[key] }));
  const missing = rules.filter((entry) => !entry.rule);
  if (missing.length > 0) {
    issues.push({
      type: "missing_rule",
      word: level.word,
      ruleKey: missing.map((entry) => entry.key)
    });
    continue;
  }

  const phonemes = getPhonemesForWord(level.word);
  if (!phonemes) {
    issues.push({ type: "missing_phonemes", word: level.word, ruleKey: ruleKeys });
    continue;
  }

  for (const { key, rule } of rules) {
    const match = phonemes.find(
      (p) => p.soundId === rule.soundId && p.defaultSpelling === rule.spelling
    );

    if (!match) {
      issues.push({
        type: "rule_mismatch",
        word: level.word,
        ruleKey: key,
        expected: `${rule.soundId}/${rule.spelling}`,
        phonemes
      });
    }
  }
}

const summarize = (list) =>
  list.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {});

const grouped = summarize(issues);
const summary = Object.fromEntries(Object.entries(grouped).map(([k, v]) => [k, v.length]));

if (issues.length === 0) {
  console.log("Level rules align with phoneme mappings.");
  process.exit(0);
}

console.log("Level rule validation issues:");
console.log(JSON.stringify({ summary, issues: grouped }, null, 2));
process.exit(1);

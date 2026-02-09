import { levelData } from "../src/data/levels.js";
import { hintDictionary } from "../src/data/hint_dictionary.js";
import { RULES } from "../src/data/rules.js";

const issues = [];

const normalizeRuleKeys = (ruleKey) => {
  if (!ruleKey) return [];
  return Array.isArray(ruleKey) ? ruleKey : [ruleKey];
};

const validateWord = (word, ruleKeys, sourceLabel) => {
  if (!ruleKeys || ruleKeys.length === 0) {
    issues.push({ word, issue: "Missing rule keys", source: sourceLabel });
    return;
  }

  const spellings = [];
  for (const key of ruleKeys) {
    const rule = RULES[key];
    if (!rule) {
      issues.push({ word, issue: `Unknown ruleKey: ${key}`, source: sourceLabel });
      return;
    }
    spellings.push(rule.spelling ?? "");
  }

  const reconstructed = spellings.join("");
  if (reconstructed !== word.toUpperCase()) {
    issues.push({ word, issue: `Mismatch: ${reconstructed}`, source: sourceLabel });
  }
};

for (const level of levelData) {
  if (!level?.word) continue;
  const word = level.word.toUpperCase();
  const ruleKeys = normalizeRuleKeys(level.ruleKey);
  validateWord(word, ruleKeys, "levels.js");
}

for (const [word, ruleKeys] of Object.entries(hintDictionary)) {
  validateWord(word.toUpperCase(), normalizeRuleKeys(ruleKeys), "hint_dictionary.js");
}

if (issues.length > 0) {
  console.log("Rule key issues:");
  for (const issue of issues) {
    console.log(`- ${issue.word} (${issue.source}): ${issue.issue}`);
  }
}

if (issues.length === 0) {
  console.log("All rule keys are mapped and aligned.");
}

import { hintDictionary } from "../src/data/hint_dictionary.js";
import { RULES } from "../src/data/rules.js";

const issues = [];

const normalizeRuleKeys = (ruleKey) => {
  if (!ruleKey) return [];
  return Array.isArray(ruleKey) ? ruleKey : [ruleKey];
};

const reconstructWord = (ruleKeys) => {
  const spellings = [];
  for (const key of ruleKeys) {
    const rule = RULES[key];
    if (!rule) return { error: `Unknown ruleKey: ${key}` };
    spellings.push(rule.spelling ?? "");
  }
  return { word: spellings.join("") };
};

for (const [word, ruleKeys] of Object.entries(hintDictionary)) {
  const keys = normalizeRuleKeys(ruleKeys);
  if (keys.length === 0) {
    issues.push({ word, issue: "Missing rule keys" });
    continue;
  }
  const result = reconstructWord(keys);
  if (result.error) {
    issues.push({ word, issue: result.error });
    continue;
  }
  const reconstructed = result.word;
  if (reconstructed !== word.toUpperCase()) {
    issues.push({ word, issue: `Mismatch: ${reconstructed}` });
  }
}

if (issues.length > 0) {
  console.log("Hint dictionary spelling mismatches:");
  for (const issue of issues) {
    console.log(`- ${issue.word}: ${issue.issue}`);
  }
  process.exitCode = 1;
} else {
  console.log("All hint dictionary entries match their spellings.");
}

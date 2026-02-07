import { levelData } from "../src/data/levels.js";
import { RULES } from "../src/data/rules.js";

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

  // Phoneme mapping checks removed; we're deprecating phoneme_mapping.json.
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
  console.log("Level rules are valid.");
  process.exit(0);
}

console.log("Level rule validation issues:");
console.log(JSON.stringify({ summary, issues: grouped }, null, 2));
process.exit(1);

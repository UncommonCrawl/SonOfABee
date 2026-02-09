import { hintDictionary } from "../src/data/hint_dictionary.js";
import { RULES } from "../src/data/rules.js";
import fs from "fs";
import path from "path";

const args = new Set(process.argv.slice(2));
const shouldWrite = args.has("--write");

const outputPath = path.join(process.cwd(), "src/data/hint_dictionary.js");

const normalizeRuleKeys = (ruleKey) => {
  if (!ruleKey) return [];
  return Array.isArray(ruleKey) ? ruleKey : [ruleKey];
};

const ruleKeyBySound = new Map();
for (const [key, rule] of Object.entries(RULES)) {
  const soundId = rule?.soundId ?? null;
  const spelling = rule?.spelling ?? "";
  if (!ruleKeyBySound.has(soundId)) ruleKeyBySound.set(soundId, []);
  ruleKeyBySound.get(soundId).push({ key, spelling });
}
for (const entries of ruleKeyBySound.values()) {
  entries.sort((a, b) => b.spelling.length - a.spelling.length);
}

const reconstruct = (ruleKeys) =>
  ruleKeys
    .map((key) => RULES[key]?.spelling ?? "")
    .join("");

const pickKeyForSound = (soundId, word, index, originalKey) => {
  const candidates = ruleKeyBySound.get(soundId) ?? [];
  if (candidates.length === 0) return originalKey;
  const upperWord = word.toUpperCase();
  // Prefer exact spelling match at current index
  for (const candidate of candidates) {
    const spelling = candidate.spelling ?? "";
    if (!spelling) continue;
    if (upperWord.startsWith(spelling, index)) return candidate.key;
  }
  // Fallback to original if still valid
  return originalKey;
};

const issues = [];
const fixes = [];
const nextDictionary = { ...hintDictionary };

for (const [word, ruleKeys] of Object.entries(hintDictionary)) {
  const keys = normalizeRuleKeys(ruleKeys);
  if (keys.length === 0) continue;

  let index = 0;
  let canFix = true;
  const fixed = [];

  for (const key of keys) {
    const rule = RULES[key];
    if (!rule) {
      issues.push({ word, issue: `Unknown ruleKey: ${key}` });
      canFix = false;
      fixed.push(key);
      continue;
    }
    const soundId = rule.soundId ?? null;
    const spelling = rule.spelling ?? "";
    const replacement = pickKeyForSound(soundId, word, index, key);
    fixed.push(replacement);
    const replacementSpelling = RULES[replacement]?.spelling ?? "";
    index += replacementSpelling.length;
    if (!word.toUpperCase().startsWith(replacementSpelling, index - replacementSpelling.length)) {
      canFix = false;
    }
  }

  const reconstructed = reconstruct(keys);
  if (reconstructed === word.toUpperCase()) continue;

  if (canFix) {
    const fixedReconstructed = reconstruct(fixed);
    if (fixedReconstructed === word.toUpperCase()) {
      nextDictionary[word] = fixed;
      fixes.push({ word, from: keys, to: fixed });
      continue;
    }
  }

  issues.push({ word, issue: `Mismatch: ${reconstructed}` });
}

if (fixes.length > 0) {
  console.log(`Auto-fixed ${fixes.length} entries.`);
}
if (issues.length > 0) {
  console.log("Remaining issues:");
  for (const issue of issues) {
    console.log(`- ${issue.word}: ${issue.issue}`);
  }
}

if (shouldWrite && fixes.length > 0) {
  const sortedEntries = Object.entries(nextDictionary).sort(([a], [b]) => a.localeCompare(b));
  const body = sortedEntries.map(([w, rules]) => `  "${w}": ${JSON.stringify(rules)}`).join(",\n");
  const output = `export const hintDictionary = {\n${body}\n};\n`;
  fs.writeFileSync(outputPath, output, "utf-8");
  console.log(`Wrote fixes to ${outputPath}.`);
}

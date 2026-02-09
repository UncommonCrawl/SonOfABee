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

const spellingToKeys = new Map();
for (const [key, rule] of Object.entries(RULES)) {
  const spelling = rule?.spelling ?? "";
  if (!spelling) continue;
  if (!spellingToKeys.has(spelling)) spellingToKeys.set(spelling, []);
  spellingToKeys.get(spelling).push(key);
}
for (const keys of spellingToKeys.values()) {
  keys.sort((a, b) => a.localeCompare(b));
}

const spellings = Array.from(spellingToKeys.keys()).sort((a, b) => b.length - a.length);

const reconstruct = (ruleKeys) =>
  ruleKeys
    .map((key) => RULES[key]?.spelling ?? "")
    .join("");

const segmentWord = (word) => {
  const upper = word.toUpperCase();
  const n = upper.length;
  const dp = Array(n + 1).fill(null);
  dp[0] = { count: 0, path: [] };

  for (let i = 0; i < n; i += 1) {
    if (!dp[i]) continue;
    for (const spelling of spellings) {
      if (!upper.startsWith(spelling, i)) continue;
      const next = i + spelling.length;
      const candidate = {
        count: dp[i].count + 1,
        path: [...dp[i].path, spelling]
      };
      if (!dp[next] || candidate.count < dp[next].count) {
        dp[next] = candidate;
      }
      // Tie-breaker: keep first found (spellings are length-desc sorted)
    }
  }

  return dp[n]?.path ?? null;
};

const pickKeyForSpelling = (spelling, desiredSoundId) => {
  const keys = spellingToKeys.get(spelling) ?? [];
  if (!keys.length) return null;
  if (desiredSoundId) {
    const match = keys.find((key) => RULES[key]?.soundId === desiredSoundId);
    if (match) return match;
  }
  return keys[0];
};

const issues = [];
const fixes = [];
const nextDictionary = { ...hintDictionary };

for (const [word, ruleKeys] of Object.entries(hintDictionary)) {
  const keys = normalizeRuleKeys(ruleKeys);
  if (keys.length === 0) continue;

  const reconstructed = reconstruct(keys);
  if (reconstructed === word.toUpperCase()) continue;

  const graphemes = segmentWord(word);
  if (!graphemes) {
    issues.push({ word, issue: "No grapheme segmentation" });
    continue;
  }

  const originalSoundIds = keys.map((key) => RULES[key]?.soundId ?? null);
  let soundIndex = 0;
  const fixed = [];

  for (const grapheme of graphemes) {
    let desired = null;
    // Try to preserve the next soundId if it matches a rule for this grapheme.
    while (soundIndex < originalSoundIds.length && !desired) {
      const candidateSound = originalSoundIds[soundIndex];
      const candidateKey = pickKeyForSpelling(grapheme, candidateSound);
      if (candidateKey && RULES[candidateKey]?.soundId === candidateSound) {
        desired = candidateSound;
        break;
      }
      soundIndex += 1;
    }
    const key = pickKeyForSpelling(grapheme, desired);
    if (!key) {
      issues.push({ word, issue: `No rule for spelling: ${grapheme}` });
      break;
    }
    fixed.push(key);
    soundIndex += 1;
  }

  if (fixed.length !== graphemes.length) continue;
  const fixedReconstructed = reconstruct(fixed);
  if (fixedReconstructed !== word.toUpperCase()) {
    issues.push({ word, issue: `Reconstruct mismatch: ${fixedReconstructed}` });
    continue;
  }

  nextDictionary[word] = fixed;
  fixes.push({ word, from: keys, to: fixed });
}

if (fixes.length > 0) {
  console.log(`Grapheme-first fixed ${fixes.length} entries.`);
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

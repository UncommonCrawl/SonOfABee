import fs from "node:fs";
import path from "node:path";

import { levelData } from "../src/data/levels.js";

const outputDir = path.resolve(process.cwd(), "reports");
const outputPath = path.join(outputDir, "levels_grapheme_report.txt");

const normalizeRuleKeys = (ruleKey) => {
  if (!ruleKey) return [];
  return Array.isArray(ruleKey) ? ruleKey : [ruleKey];
};

const graphemeFromRuleKey = (ruleKey) => {
  const underscoreIndex = ruleKey.indexOf("_");
  if (underscoreIndex < 0) return "";

  const suffix = ruleKey.slice(underscoreIndex + 1);
  return suffix.replace(/_\d+$/, "");
};

const rows = [];
const misspellings = [];

for (const level of levelData) {
  const keys = normalizeRuleKeys(level.ruleKey);
  const reconstructed = keys.map(graphemeFromRuleKey).join("").toUpperCase();
  const expected = String(level.word ?? "").toUpperCase();
  const mismatch = reconstructed !== expected;

  rows.push({
    id: level.id,
    expected,
    reconstructed,
    mismatch,
    ruleKey: keys
  });

  if (mismatch) {
    misspellings.push({
      id: level.id,
      expected,
      reconstructed,
      ruleKey: keys
    });
  }
}

const lines = [
  "Levels Grapheme Reconstruction Report",
  `Generated: ${new Date().toISOString()}`,
  `Total levels: ${rows.length}`,
  `Potential misspellings (mismatch): ${misspellings.length}`,
  "",
  "Entries",
  "id | expected | reconstructed | status",
  "--- | --- | --- | ---",
  ...rows.map((row) =>
    `${row.id} | ${row.expected} | ${row.reconstructed} | ${row.mismatch ? "MISMATCH" : "OK"}`
  ),
  "",
  "Misspellings",
  misspellings.length === 0 ? "None" : "id | expected | reconstructed | ruleKey",
  ...(misspellings.length === 0
    ? []
    : [
        "--- | --- | --- | ---",
        ...misspellings.map((row) =>
          `${row.id} | ${row.expected} | ${row.reconstructed} | ${JSON.stringify(row.ruleKey)}`
        )
      ])
];

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");

console.log(`Wrote ${rows.length} entries to ${outputPath}`);
console.log(`Potential misspellings: ${misspellings.length}`);

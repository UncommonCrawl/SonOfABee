import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { RULES } from "../src/data/rules.js";
import { levelData } from "../src/data/levels.js";
import { hintDictionary } from "../src/data/hint_dictionary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = new Set(process.argv.slice(2));
const shouldWrite = args.has("--write");

const normalizeRuleKeys = (ruleKey) => {
  if (!ruleKey) return [];
  return Array.isArray(ruleKey) ? ruleKey : [ruleKey];
};

const counts = new Map();
for (const key of Object.keys(RULES)) counts.set(key, 0);

const unknownKeys = new Map();
const bump = (key) => {
  if (counts.has(key)) counts.set(key, counts.get(key) + 1);
  else unknownKeys.set(key, (unknownKeys.get(key) || 0) + 1);
};

for (const level of levelData) {
  for (const key of normalizeRuleKeys(level?.ruleKey)) bump(key);
}

for (const ruleKeys of Object.values(hintDictionary)) {
  for (const key of normalizeRuleKeys(ruleKeys)) bump(key);
}

const rulesPath = path.join(__dirname, "../src/data/rules.js");
const input = fs.readFileSync(rulesPath, "utf-8");
const lines = input.split(/\r?\n/);

const output = [];
let inRule = false;
let ruleKey = null;
let ruleBuffer = [];

const flushRule = () => {
  if (!ruleKey) return;
  const count = counts.get(ruleKey) || 0;
  const cleaned = ruleBuffer.filter((line) => !line.trim().startsWith("usageCount:"));
  let insertAt = -1;
  const findLine = (pattern) => cleaned.findIndex((line) => pattern.test(line));
  const spellingIdx = findLine(/^\s*spelling:\s*/);
  const soundIdx = findLine(/^\s*soundId:\s*/);
  const descIdx = findLine(/^\s*description:\s*/);
  const nameIdx = findLine(/^\s*name:\s*/);
  if (spellingIdx >= 0) insertAt = spellingIdx + 1;
  else if (soundIdx >= 0) insertAt = soundIdx + 1;
  else if (descIdx >= 0) insertAt = descIdx + 1;
  else if (nameIdx >= 0) insertAt = nameIdx + 1;
  else insertAt = 1;

  const usageLine = `    usageCount: ${count},`;
  cleaned.splice(insertAt, 0, usageLine);
  for (const line of cleaned) output.push(line);
  ruleBuffer = [];
  ruleKey = null;
};

for (const line of lines) {
  const ruleStart = line.match(/^  ([A-Z0-9_]+): \{$/);
  if (!inRule && ruleStart) {
    inRule = true;
    ruleKey = ruleStart[1];
    ruleBuffer = [line];
    continue;
  }

  if (inRule) {
    ruleBuffer.push(line);
    if (/^  },$/.test(line)) {
      inRule = false;
      flushRule();
    }
    continue;
  }

  output.push(line);
}

if (inRule) flushRule();

if (!shouldWrite) {
  const top = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  console.log("Top 10 rule counts:");
  for (const [key, count] of top) console.log(`- ${key}: ${count}`);
  if (unknownKeys.size > 0) {
    console.log("\nUnknown rule keys (not in RULES):");
    for (const [key, count] of unknownKeys.entries()) {
      console.log(`- ${key}: ${count}`);
    }
  }
  console.log("\nRun with --write to update src/data/rules.js.");
  process.exit(0);
}

fs.writeFileSync(rulesPath, output.join("\n"), "utf-8");

if (unknownKeys.size > 0) {
  console.log("Updated counts. Unknown rule keys found:");
  for (const [key, count] of unknownKeys.entries()) {
    console.log(`- ${key}: ${count}`);
  }
} else {
  console.log("Updated counts in src/data/rules.js.");
}

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { RULES } from "../src/data/rules.js";
import { levelData } from "../src/data/levels.js";
import { hintDictionary } from "../src/data/hint_dictionary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const normalizeRuleKeys = (ruleKey) => {
  if (!ruleKey) return [];
  return Array.isArray(ruleKey) ? ruleKey : [ruleKey];
};

const knownKeys = new Set(Object.keys(RULES));
const unknownKeys = new Set();

const bump = (key) => {
  if (!knownKeys.has(key)) unknownKeys.add(key);
};

for (const level of levelData) {
  for (const key of normalizeRuleKeys(level?.ruleKey)) bump(key);
}

for (const keys of Object.values(hintDictionary)) {
  for (const key of normalizeRuleKeys(keys)) bump(key);
}

if (unknownKeys.size === 0) {
  console.log("No missing rules to add.");
  process.exit(0);
}

const soundIdByPrefix = new Map();
const mutexByPrefix = new Map();
const ruleLabelByPrefix = new Map();

for (const [key, rule] of Object.entries(RULES)) {
  const prefix = key.split("_")[0];
  if (!soundIdByPrefix.has(prefix) && rule?.soundId) soundIdByPrefix.set(prefix, rule.soundId);
  if (!mutexByPrefix.has(prefix) && rule?.mutexGroup) mutexByPrefix.set(prefix, rule.mutexGroup);
  if (!ruleLabelByPrefix.has(prefix) && rule?.name) {
    const label = rule.name.split("→")[0]?.trim();
    if (label) ruleLabelByPrefix.set(prefix, label);
  }
}

const toSoundLabel = (prefix) => {
  if (ruleLabelByPrefix.has(prefix)) return ruleLabelByPrefix.get(prefix);
  return prefix.toLowerCase();
};

const buildRuleBlock = (key) => {
  const parts = key.split("_");
  const prefix = parts[0];
  const spelling = parts.slice(1).join("_") || prefix;
  const soundId = soundIdByPrefix.get(prefix) ?? null;
  const mutexGroup = mutexByPrefix.get(prefix) ?? prefix;
  const soundLabel = toSoundLabel(prefix);
  return [
    `  ${key}: {`,
    `    name: "${soundLabel} → ${spelling}",`,
    `    description: "All '${soundLabel}' sounds are spelled ${spelling}",`,
    `    soundId: ${soundId ? `"${soundId}"` : "null"},`,
    `    spelling: "${spelling}",`,
    `    mutexGroup: "${mutexGroup}",`,
    `    maxDurability: 3,`,
    `    transform: (word) => word`,
    `  },`
  ];
};

const rulesPath = path.join(__dirname, "../src/data/rules.js");
const input = fs.readFileSync(rulesPath, "utf-8");
const lines = input.split(/\r?\n/);
const closeIndex = lines.lastIndexOf("};");
if (closeIndex < 0) throw new Error("Could not find RULES closing brace.");

const newKeys = Array.from(unknownKeys).sort((a, b) => a.localeCompare(b));
const newBlocks = [];
newBlocks.push("  // Added missing rules (auto-generated)");
for (const key of newKeys) newBlocks.push(...buildRuleBlock(key));

const output = [
  ...lines.slice(0, closeIndex),
  "",
  ...newBlocks,
  ...lines.slice(closeIndex)
];

fs.writeFileSync(rulesPath, output.join("\n"), "utf-8");
console.log(`Added ${newKeys.length} missing rules.`);

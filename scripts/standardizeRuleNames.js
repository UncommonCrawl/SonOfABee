import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { RULES } from "../src/data/rules.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rulesPath = path.join(__dirname, "../src/data/rules.js");

const args = new Set(process.argv.slice(2));
const shouldWrite = args.has("--write");

const getSoundLabel = (key, rule) => {
  const match = rule?.description?.match(/All\s+'([^']+)'\s+sounds\s+are\s+spelled/i);
  if (match?.[1]) return match[1].toLowerCase();

  const keyWithoutVariant = key.replace(/_\d+$/, "");
  const firstSegment = keyWithoutVariant.split("_")[0] ?? keyWithoutVariant;
  return firstSegment.toLowerCase();
};

const getExpectedName = (key, rule) => {
  const sound = getSoundLabel(key, rule);
  const grapheme = String(rule?.spelling ?? "").toUpperCase();
  return `${sound} → ${grapheme}`;
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const original = fs.readFileSync(rulesPath, "utf8");
let next = original;
let updatedCount = 0;

for (const [key, rule] of Object.entries(RULES)) {
  const expectedName = getExpectedName(key, rule);
  const blockPattern = new RegExp(
    `(\\n\\s*${escapeRegex(key)}:\\s*\\{[\\s\\S]*?\\n\\s*name:\\s*")([^"]*)(")`,
    "m"
  );
  if (!blockPattern.test(next)) continue;

  next = next.replace(blockPattern, (_, before, _currentName, after) => {
    updatedCount += 1;
    return `${before}${expectedName}${after}`;
  });
}

if (!shouldWrite) {
  console.log(`Would update ${updatedCount} rule names in ${rulesPath}`);
  console.log("Run with --write to apply changes.");
  process.exit(0);
}

if (next === original) {
  console.log("No changes needed.");
  process.exit(0);
}

fs.writeFileSync(rulesPath, next, "utf8");
console.log(`Updated ${updatedCount} rule names in ${rulesPath}`);

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rulesPath = path.join(__dirname, "../src/data/rules.js");

const args = new Set(process.argv.slice(2));
const shouldWrite = args.has("--write");

const text = fs.readFileSync(rulesPath, "utf8");
const lines = text.split("\n");

const rulesStartLine = lines.findIndex((line) => line.trim() === "export const RULES = {");
if (rulesStartLine === -1) {
  throw new Error("Could not find `export const RULES = {` in rules.js");
}

let firstEntryStart = -1;
let lastEntryEnd = -1;
const entryBlocks = new Map();

const countBraces = (line) => {
  let delta = 0;
  for (const ch of line) {
    if (ch === "{") delta += 1;
    if (ch === "}") delta -= 1;
  }
  return delta;
};

for (let i = rulesStartLine + 1; i < lines.length; i += 1) {
  const line = lines[i];
  if (line.trim() === "};") break;

  const match = line.match(/^  ([A-Z0-9_]+): \{$/);
  if (!match) continue;

  const key = match[1];
  if (firstEntryStart === -1) firstEntryStart = i;

  let depth = 0;
  let j = i;
  while (j < lines.length) {
    depth += countBraces(lines[j]);
    if (depth === 0) break;
    j += 1;
  }

  if (depth !== 0) {
    throw new Error(`Unbalanced braces while parsing rule block: ${key}`);
  }

  entryBlocks.set(key, lines.slice(i, j + 1).join("\n"));
  lastEntryEnd = j;
  i = j;
}

if (entryBlocks.size === 0 || firstEntryStart === -1 || lastEntryEnd === -1) {
  throw new Error("No rule entries parsed from rules.js");
}

const sortedKeys = [...entryBlocks.keys()].sort((a, b) => a.localeCompare(b, "en"));
const sortedBlockText = sortedKeys.map((key) => entryBlocks.get(key)).join("\n");

const nextLines = [
  ...lines.slice(0, firstEntryStart),
  ...sortedBlockText.split("\n"),
  ...lines.slice(lastEntryEnd + 1),
];
const nextText = nextLines.join("\n");

if (!shouldWrite) {
  console.log(`Would sort ${sortedKeys.length} rules alphabetically in ${rulesPath}`);
  console.log("Run with --write to apply changes.");
  process.exit(0);
}

if (nextText === text) {
  console.log("No changes needed.");
  process.exit(0);
}

fs.writeFileSync(rulesPath, nextText, "utf8");
console.log(`Sorted ${sortedKeys.length} rules alphabetically in ${rulesPath}`);

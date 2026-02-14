import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const levelsPath = path.join(__dirname, "../src/data/levels.js");
const wordsPath = path.join(__dirname, "../src/data/level_words.txt");

const args = new Set(process.argv.slice(2));
const shouldWrite = args.has("--write");

const text = fs.readFileSync(levelsPath, "utf8");
const lines = text.split("\n");

const levelsStartLine = lines.findIndex((line) => line.trim() === "export const levelData = [");
if (levelsStartLine === -1) {
  throw new Error("Could not find `export const levelData = [` in levels.js");
}

const countBraces = (line) => {
  let delta = 0;
  for (const ch of line) {
    if (ch === "{") delta += 1;
    if (ch === "}") delta -= 1;
  }
  return delta;
};

let firstEntryStart = -1;
let lastEntryEnd = -1;
const entries = [];

for (let i = levelsStartLine + 1; i < lines.length; i += 1) {
  const line = lines[i];
  if (line.trim() === "];") break;
  if (!line.match(/^  \{$/)) continue;

  if (firstEntryStart === -1) firstEntryStart = i;

  let depth = 0;
  let j = i;
  while (j < lines.length) {
    depth += countBraces(lines[j]);
    if (depth === 0) break;
    j += 1;
  }
  if (depth !== 0) {
    throw new Error(`Unbalanced braces while parsing level entry at line ${i + 1}`);
  }

  const block = lines.slice(i, j + 1).join("\n");
  const wordMatch = block.match(/^\s*word:\s*"([^"]+)"/m);
  const idMatch = block.match(/^\s*id:\s*"([^"]+)"/m);
  if (!wordMatch?.[1]) {
    throw new Error(`Missing word in level entry at line ${i + 1}`);
  }

  entries.push({
    block,
    word: wordMatch[1],
    id: idMatch?.[1] ?? "",
  });

  lastEntryEnd = j;
  i = j;
}

if (entries.length === 0 || firstEntryStart === -1 || lastEntryEnd === -1) {
  throw new Error("No level entries parsed from levels.js");
}

entries.sort((a, b) => {
  const wordDiff = a.word.localeCompare(b.word, "en", { sensitivity: "base" });
  if (wordDiff !== 0) return wordDiff;
  return a.id.localeCompare(b.id, "en", { sensitivity: "base" });
});

const sortedBlocks = entries.map((entry) => entry.block).join("\n");
const nextLines = [
  ...lines.slice(0, firstEntryStart),
  ...sortedBlocks.split("\n"),
  ...lines.slice(lastEntryEnd + 1),
];
const nextText = nextLines.join("\n");
const wordsText = `${entries.map((entry) => entry.word).join("\n")}\n`;

if (!shouldWrite) {
  console.log(`Would sort ${entries.length} levels in ${levelsPath}`);
  console.log(`Would write ${entries.length} words to ${wordsPath}`);
  console.log("Run with --write to apply changes.");
  process.exit(0);
}

let wroteLevels = false;
if (nextText !== text) {
  fs.writeFileSync(levelsPath, nextText, "utf8");
  wroteLevels = true;
}

fs.writeFileSync(wordsPath, wordsText, "utf8");
console.log(`Sorted ${entries.length} levels: ${wroteLevels ? "updated" : "already sorted"}`);
console.log(`Wrote word list: ${wordsPath}`);

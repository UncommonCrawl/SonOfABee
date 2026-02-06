import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { RULES } from "../src/data/rules.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rulesPath = path.join(__dirname, "../src/data/rules.js");
const text = fs.readFileSync(rulesPath, "utf-8");
const lines = text.split("\n");

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

let currentKey = null;
let inTransform = false;
const nextLines = lines.map((line) => {
  const keyMatch = line.match(/^\s*([A-Z0-9_]+)\s*:\s*\{/);
  if (keyMatch) {
    currentKey = keyMatch[1];
    inTransform = false;
  }

  if (currentKey && line.includes("transform:")) {
    inTransform = true;
  }

  if (inTransform && currentKey && RULES[currentKey]) {
    const spelling = RULES[currentKey].spelling ?? "";
    if (spelling) {
      const keyPattern = new RegExp(`"${escapeRegExp(currentKey)}"`, "g");
      const keyPatternSingle = new RegExp(`'${escapeRegExp(currentKey)}'`, "g");
      let next = line.replace(keyPattern, `"${spelling}"`);
      next = next.replace(keyPatternSingle, `'${spelling}'`);
      line = next;
    }
  }

  if (currentKey && line.trim() === "},") {
    currentKey = null;
    inTransform = false;
  }

  return line;
});

fs.writeFileSync(rulesPath, nextLines.join("\n"), "utf-8");
console.log("Updated rule transform strings to use grapheme spellings.");

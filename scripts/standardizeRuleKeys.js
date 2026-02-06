import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { RULES } from "../src/data/rules.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = new Set(process.argv.slice(2));
const shouldWrite = args.has("--write");

const phonemeLabelMap = {
  "æ": "AE",
  "ɑ": "AH",
  "ɔ": "AW",
  "ə": "UH",
  "ʌ": "UH",
  "ʊ": "UH",
  "ɛ": "EH",
  "ɪ": "IH",
  "i": "EE",
  "u": "OO",
  "oʊ": "OH",
  "aɪ": "EYE",
  "eɪ": "AY",
  "aʊ": "OW",
  "ɔɪ": "OY",
  "ər": "ER",
  "ɜr": "UR",
  "ɑr": "AR",
  "ɔr": "OR",
  "ɛr": "AIR",
  "ju": "YOU",
  "ŋ": "NG",
  "ʃ": "SH",
  "tʃ": "CH",
  "ʧ": "CH",
  "dʒ": "J",
  "ʤ": "J",
  "ð": "TH",
  "θ": "TH",
  "ɡ": "G",
  "ɹ": "R",
  "r": "R",
  "ks": "KS",
  "kw": "KW",
  "ts": "TS",
  "ni": "NI",
};

const normalizePhoneme = (soundId) => {
  if (soundId == null) return "SILENT";
  if (phonemeLabelMap[soundId]) return phonemeLabelMap[soundId];
  if (/^[a-z]+$/i.test(soundId)) return soundId.toUpperCase();
  const parts = Array.from(soundId).map((ch) =>
    /[a-z0-9]/i.test(ch) ? ch.toUpperCase() : `U${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`
  );
  return parts.join("_");
};

const normalizeGrapheme = (spelling) => {
  if (!spelling) return "NONE";
  const cleaned = spelling.toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  return cleaned || "NONE";
};

const oldKeys = Object.keys(RULES);
const mapping = new Map();
const usedNewKeys = new Map();

for (const oldKey of oldKeys) {
  const rule = RULES[oldKey];
  const phoneme = normalizePhoneme(rule?.soundId ?? null);
  const grapheme = normalizeGrapheme(rule?.spelling ?? "");
  let newKey = `${phoneme}_${grapheme}`;
  if (usedNewKeys.has(newKey)) {
    const count = usedNewKeys.get(newKey) + 1;
    usedNewKeys.set(newKey, count);
    newKey = `${newKey}_${count}`;
  } else {
    usedNewKeys.set(newKey, 1);
  }
  mapping.set(oldKey, newKey);
}

const filesToUpdate = [
  path.join(__dirname, "../src/data/rules.js"),
  path.join(__dirname, "../src/data/levels.js"),
  path.join(__dirname, "../src/utils/gameLogic.js"),
  path.join(__dirname, "../src/App.jsx"),
  path.join(__dirname, "../scripts/validateLevels.js"),
];

const updateRulesText = (text, map) => {
  let next = text;
  for (const [oldKey, newKey] of map) {
    const pattern = new RegExp(`(^\\s*)${oldKey}\\s*:`, "gm");
    next = next.replace(pattern, `$1${newKey}:`);
  }
  return next;
};

const updateStringLiterals = (text, map) => {
  for (const [oldKey, newKey] of map) {
    text = text.replace(new RegExp(`"${oldKey}"`, "g"), `"${newKey}"`);
    text = text.replace(new RegExp(`'${oldKey}'`, "g"), `'${newKey}'`);
  }
  return text;
};

const updates = [];

for (const filePath of filesToUpdate) {
  if (!fs.existsSync(filePath)) continue;
  const original = fs.readFileSync(filePath, "utf-8");
  let next = original;

  if (filePath.endsWith("/rules.js")) {
    next = updateRulesText(next, mapping);
  } else {
    next = updateStringLiterals(next, mapping);
  }

  if (next !== original) {
    updates.push({ filePath, original, next });
  }
}

if (!shouldWrite) {
  console.log(`Would rename ${mapping.size} rule keys.`);
  console.log(`Would update ${updates.length} files.`);
  console.log("Run with --write to apply changes.");
  process.exit(0);
}

for (const update of updates) {
  fs.writeFileSync(update.filePath, update.next, "utf-8");
}

console.log(`Renamed ${mapping.size} rule keys.`);
console.log(`Updated ${updates.length} files.`);

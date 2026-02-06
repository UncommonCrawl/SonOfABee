import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { RULES } from "../src/data/rules.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rulesPath = path.join(__dirname, "../src/data/rules.js");
const text = fs.readFileSync(rulesPath, "utf-8");

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
    /[a-z0-9]/i.test(ch)
      ? ch.toUpperCase()
      : `U${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`
  );
  return parts.join("_");
};

const keys = Object.keys(RULES);
const keyInfo = new Map();
const baseCounts = new Map();

for (const key of keys) {
  const rule = RULES[key];
  const phonemeLabel = normalizePhoneme(rule?.soundId ?? null);
  const prefix = `${phonemeLabel}_`;
  let remainder = key.startsWith(prefix) ? key.slice(prefix.length) : key.split("_").slice(1).join("_");
  if (!remainder) remainder = "NONE";
  const baseRemainder = remainder.replace(/_\d+$/, "");
  const baseKey = `${phonemeLabel}_${baseRemainder}`;
  baseCounts.set(baseKey, (baseCounts.get(baseKey) || 0) + 1);
  keyInfo.set(key, { phonemeLabel, remainder, baseRemainder, soundId: rule?.soundId ?? null });
}

const getSpellingForKey = (key) => {
  const info = keyInfo.get(key);
  if (!info) return { spelling: "", name: "", description: "" };
  const { phonemeLabel, remainder, baseRemainder, soundId } = info;
  const baseKey = `${phonemeLabel}_${baseRemainder}`;
  const graphemeCode = baseCounts.get(baseKey) > 1 && /_\d+$/.test(remainder) ? baseRemainder : remainder;
  const spelling = graphemeCode === "NONE" ? "" : graphemeCode;
  const name = soundId == null ? `${spelling} is silent` : `${spelling} = ${soundId}`;
  const description =
    soundId == null
      ? `All silent sounds are spelled ${spelling}`
      : `All '${soundId}' sounds are spelled ${spelling}`;
  return { spelling, name, description };
};

let currentKey = null;
const lines = text.split("\n");
const nextLines = lines.map((line) => {
  const keyMatch = line.match(/^\s*([A-Z0-9_]+)\s*:\s*\{/);
  if (keyMatch) {
    currentKey = keyMatch[1];
  }

  if (currentKey) {
    const { spelling, name, description } = getSpellingForKey(currentKey);
    if (line.match(/^\s*name:\s*/)) {
      return line.replace(/name:\s*".*?"/, `name: "${name}"`);
    }
    if (line.match(/^\s*description:\s*/)) {
      return line.replace(/description:\s*".*?"/, `description: "${description}"`);
    }
    if (line.match(/^\s*spelling:\s*/)) {
      return line.replace(/spelling:\s*".*?"/, `spelling: "${spelling}"`);
    }
  }

  return line;
});

fs.writeFileSync(rulesPath, nextLines.join("\n"), "utf-8");
console.log("Resynced rule spelling/name/description from new keys.");

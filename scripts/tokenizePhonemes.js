import fs from "fs";

const sourcePath = "./src/data/phoneme_data.json";
const outputPath = "./src/data/phoneme_mapping.json";

const IPA_TOKENS = [
  "ʃən",
  "ks",
  "ju",
  "ɜr",
  "ɑr",
  "ɛr",
  "ər",
  "tʃ",
  "dʒ",
  "aɪ",
  "aʊ",
  "ɔɪ",
  "əʊ",
  "oʊ",
  "eɪ",
  "ɪə",
  "eə",
  "ʊə",
  "ɝ",
  "ɚ",
  "ɜ",
  "i",
  "ɪ",
  "e",
  "ɛ",
  "æ",
  "ɑ",
  "ɒ",
  "ɔ",
  "o",
  "ʊ",
  "u",
  "ʌ",
  "ə",
  "ŋ",
  "θ",
  "ð",
  "ʃ",
  "ʒ",
  "j",
  "w",
  "r",
  "l",
  "m",
  "n",
  "p",
  "b",
  "t",
  "d",
  "k",
  "g",
  "f",
  "v",
  "s",
  "z",
  "h"
];

const CLEANUP = /[ˈˌ.\s()]/g;
const COMBINING_MARKS = /[\u0300-\u036f]/g;
const NORMALIZE = [
  ["ɹ", "r"],
  ["ɐ", "ə"],
  ["əʊ", "oʊ"],
  ["ɝ", "ɜr"],
  ["ɚ", "ər"]
];

const GRAPHEME_MAP = {
  ʃən: ["SHUN", "TION", "SION", "CIAN"],
  ks: ["X", "CKS", "KS"],
  ju: ["U", "YOU", "UE", "EW"],
  ɜr: ["UR", "ER", "IR", "OR", "EAR"],
  ər: ["UR", "ER", "IR", "OR", "EAR"],
  ɑr: ["AR", "EAR", "AL"],
  ɛr: ["AIR", "ARE", "EAR", "ERE"],
  f: ["PH", "GH", "F"],
  oʊ: ["OUGH", "O", "OA", "OE", "OW", "OH"],
  n: ["KN", "GN", "PN", "N"],
  æ: ["A"],
  ʃ: ["SH", "CH", "TI", "CI"],
  s: ["SC", "PS", "TS", "S", "C"],
  r: ["WR", "RH", "R"],
  k: ["CK", "CH", "QUE", "K", "C", "Q"],
  t: ["BT", "PT", "T"],
  m: ["MN", "M"],
  dʒ: ["DGE", "J", "G"],
  z: ["X", "Z"],
  h: ["WH", "H"],
  ɪ: ["I", "Y"],
  i: ["EE", "EA", "IE", "I", "E"],
  eɪ: ["AI", "AY", "EI", "EA", "A"],
  ɔ: ["AU", "AW", "A", "O"],
  ʊ: ["OO", "U"],
  u: ["OO", "U", "EW"],
  ʌ: ["OU", "U", "O", "A"],
  ə: ["A", "E", "O", "U"],
  aɪ: ["IGH", "IE", "I", "Y"],
  aʊ: ["OU", "OW"],
  ɔɪ: ["OY", "OI"],
  ɛ: ["EA", "E"],
  θ: ["TH"],
  ð: ["TH"],
  ŋ: ["NG", "N"],
  l: ["L"],
  b: ["B"],
  p: ["P"],
  d: ["D"],
  g: ["G"],
  v: ["V"],
  w: ["W"],
  j: ["Y"],
  ɑ: ["A", "O"],
  ɒ: ["O"],
  ɚ: ["ER", "IR", "UR", "OR", "AR"],
  ɝ: ["ER", "IR", "UR", "OR", "AR"],
  ɜ: ["ER", "IR", "UR", "OR", "AR"],
  ɪə: ["EAR", "EER", "IER"],
  eə: ["AIR", "ARE", "EAR"],
  ʊə: ["URE", "OUR"],
  o: ["O"],
  e: ["E"],
  ʒ: ["GE", "S"],
  ɨ: ["I"]
};

const normalizeIpa = (ipa) => {
  let next = ipa.replace(CLEANUP, "");
  next = next.replace(COMBINING_MARKS, "");
  for (const [from, to] of NORMALIZE) {
    next = next.replace(new RegExp(from, "g"), to);
  }
  return next;
};


const tokenizeIPA = (ipa) => {
  const cleaned = normalizeIpa(ipa);
  const tokens = [];
  let i = 0;
  while (i < cleaned.length) {
    let matched = null;
    for (const token of IPA_TOKENS) {
      if (cleaned.startsWith(token, i)) {
        matched = token;
        break;
      }
    }
    if (!matched) {
      const char = cleaned[i];
      if (char === "ː") {
        i += 1;
        continue;
      }
      matched = cleaned[i];
    }
    tokens.push(matched);
    i += matched.length;
  }
  return tokens;
};

const alignGraphemes = (word, phonemes) => {
  const upper = word.toUpperCase();
  const memo = new Map();

  const getCandidates = (phoneme) => {
    const candidates = GRAPHEME_MAP[phoneme] || [];
    const sorted = [...candidates].sort((a, b) => b.length - a.length);
    sorted.push("");
    return sorted;
  };

  const solve = (phonemeIndex, wordIndex) => {
    const key = `${phonemeIndex}:${wordIndex}`;
    if (memo.has(key)) return memo.get(key);

    if (phonemeIndex >= phonemes.length) {
      return { segments: [], index: wordIndex };
    }

    const phoneme = phonemes[phonemeIndex];
    const candidates = getCandidates(phoneme);

    for (const candidate of candidates) {
      const length = candidate ? candidate.length : 1;
      const slice = upper.slice(wordIndex, wordIndex + length);
      if (candidate && slice !== candidate) continue;

      const nextIndex = wordIndex + length;
      const rest = solve(phonemeIndex + 1, nextIndex);
      if (rest) {
        const segment = candidate || slice || "";
        const result = { segments: [segment, ...rest.segments], index: rest.index };
        memo.set(key, result);
        return result;
      }
    }

    memo.set(key, null);
    return null;
  };

  const result = solve(0, 0);
  if (!result) {
    return { segments: phonemes.map(() => ""), index: 0 };
  }
  return result;
};

const source = JSON.parse(fs.readFileSync(sourcePath, "utf-8"));
const output = {};

for (const [word, ipa] of Object.entries(source)) {
  if (!ipa || ipa === "N/A" || ipa === "ERROR") {
    output[word] = [];
    continue;
  }
  const phonemes = tokenizeIPA(ipa);
  const alignment = alignGraphemes(word, phonemes);
  const graphemes = alignment.segments;
  const entries = phonemes.map((soundId, idx) => ({
    soundId,
    grapheme: graphemes[idx] || ""
  }));
  const remainder = word.toUpperCase().slice(alignment.index);
  if (remainder) {
    entries.push({ soundId: null, grapheme: remainder });
  }
  output[word] = entries;
}

fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Wrote ${Object.keys(output).length} entries to ${outputPath}`);

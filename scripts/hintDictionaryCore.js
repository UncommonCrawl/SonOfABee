import { RULES } from "../src/data/rules.js";
import { levelData } from "../src/data/levels.js";
import { PHONEME_STANDARD_SPELLINGS } from "../src/data/phonemeStandardSpellings.js";
import { PHONEME_STANDARD_RULE_LABELS } from "../src/data/phonemeStandardRuleLabels.js";
import { alignPhonemesToGraphemes, GRAPHEME_COSTS } from "../src/utils/robustAligner.js";

export const CLEANUP = /[ˈˌ.\s()\/\[\]]/g;
export const COMBINING_MARKS = /[\u0300-\u036f]/g;
export const NORMALIZE = [
  ["ɹ", "r"],
  ["ɐ", "ə"],
  ["ᵻ", "ɪ"],
  ["əʊ", "oʊ"],
  ["ɝ", "ɜr"],
  ["ɚ", "ər"],
  ["ɒ", "ɑ"],
  ["a", "ɑ"],
  ["ʉ", "u"],
  ["ɘ", "ə"],
  ["ɨ", "ɪ"],
  ["ɯ", "u"],
  ["ɫ", "l"],
  ["ɾ", "t"],
  ["ʔ", "t"],
  ["ʍ", "w"]
];

export const IPA_TOKENS = [
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
  "ɡ",
  "g",
  "f",
  "v",
  "s",
  "z",
  "h"
];

export const GRAPHEME_MAP = PHONEME_STANDARD_SPELLINGS;

const forceRhotic = (ipa, word) => {
  if (!word) return ipa;
  const hasR = word.toUpperCase().includes("R");
  if (!hasR) return ipa;
  if (/r/.test(ipa)) return ipa;
  let next = ipa;
  next = next.replace(/oʊə/g, "oʊr");
  next = next.replace(/ɪə/g, "ɪr");
  next = next.replace(/eə/g, "ɛr");
  next = next.replace(/ʊə/g, "ʊr");
  next = next.replace(/ə$/g, "ər");
  return next;
};

export const normalizeIpa = (ipa, word = null) => {
  let next = ipa
    .replace(/ɹ̩/g, "ər")
    .replace(/n̩/g, "ən")
    .replace(/l̩/g, "əl")
    .replace(/m̩/g, "əm")
    .replace(/ɫ̩/g, "əl");
  next = forceRhotic(next, word);
  next = next.replace(CLEANUP, "");
  next = next.replace(COMBINING_MARKS, "");
  for (const [from, to] of NORMALIZE) {
    next = next.replace(new RegExp(from, "g"), to);
  }
  return next;
};

export const tokenizeIPA = (ipa, unknownSymbols = null, word = null) => {
  const cleaned = normalizeIpa(ipa, word);
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
      if (unknownSymbols) unknownSymbols.add(char);
      i += 1;
      continue;
    }
    tokens.push(matched);
    i += matched.length;
  }
  return tokens;
};

export const alignGraphemes = (word, phonemes) =>
  alignPhonemesToGraphemes(word, phonemes);

export const getRuleLabel = (soundId) => {
  if (soundId == null) return "SILENT";
  if (PHONEME_STANDARD_RULE_LABELS[soundId]) return PHONEME_STANDARD_RULE_LABELS[soundId];
  if (/^[a-z]+$/i.test(soundId)) return soundId.toUpperCase();
  const parts = Array.from(soundId).map((ch) =>
    /[a-z0-9]/i.test(ch) ? ch.toUpperCase() : `U${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`
  );
  return parts.join("_");
};

export const buildRuleKeyMap = (options = {}) => {
  const minUsage = Number.isFinite(Number(options.minUsage)) ? Number(options.minUsage) : null;
  const exactMap = new Map();
  const soundFallback = new Map();
  for (const [ruleKey, rule] of Object.entries(RULES)) {
    if (!rule) continue;
    if (minUsage != null && (rule.usageCount ?? 0) <= minUsage) continue;
    const spelling = rule.spelling ?? "";
    const soundId = rule.soundId ?? null;
    const key = `${spelling}||${soundId}`;
    if (!exactMap.has(key)) exactMap.set(key, ruleKey);
    const soundKey = `||${soundId}`;
    if (!soundFallback.has(soundKey)) soundFallback.set(soundKey, ruleKey);
  }
  return { exactMap, soundFallback };
};

export const collectHintWords = () => {
  const words = new Set();
  for (const level of levelData) {
    if (!level?.hint) continue;
    const cleaned = String(level.hint).replace(/['’]/g, "");
    const matches = cleaned.match(/[A-Za-z]+/g);
    if (!matches) continue;
    for (const match of matches) {
      const upper = match.toUpperCase();
      if (upper) words.add(upper);
    }
  }
  return Array.from(words);
};

export const buildEntriesFromTokens = (word, phonemes) => {
  if (!phonemes || phonemes.length === 0) return null;
  const alignment = alignGraphemes(word, phonemes);
  if (!alignment || alignment.length === 0) return null;
  const entries = alignment.map((entry) => ({
    soundId: entry.soundId,
    grapheme: entry.grapheme ? entry.grapheme.replace(/_(1|2)$/, "") : ""
  }));
  const graphemes = entries.map((entry) => entry.grapheme);
  return { phonemes, graphemes, entries };
};

export const buildEntries = (word, ipa, unknownSymbols = null) => {
  if (!ipa) return null;
  const phonemes = tokenizeIPA(ipa, unknownSymbols, word);
  return buildEntriesFromTokens(word, phonemes);
};

export const toRuleKeysFromTokens = (word, tokens, ruleMap) => {
  const built = buildEntriesFromTokens(word, tokens);
  if (!built) return null;
  const ruleKeys = [];
  for (const entry of built.entries) {
    const ruleLabel = getRuleLabel(entry.soundId);
    const exactKey = `${entry.grapheme}||${entry.soundId ?? null}`;
    const exactRuleKey = ruleMap.exactMap.get(exactKey);
    if (exactRuleKey && exactRuleKey.startsWith(`${ruleLabel}_`)) {
      ruleKeys.push(exactRuleKey);
      continue;
    }
    return null;
  }
  return ruleKeys;
};

const VOWEL_SOUNDS = new Set([
  "i", "ɪ", "eɪ", "ɛ", "æ", "ɑ", "ɔ", "oʊ", "u", "ʊ", "ʌ", "aɪ", "aʊ", "ɔɪ", "ə", "ju"
]);

const isVowelSound = (soundId) => VOWEL_SOUNDS.has(soundId);

const toRuleKeysHeuristic = (word, tokens, ruleMap) => {
  const upper = word.toUpperCase();
  let index = 0;
  const keys = [];

  const pickGrapheme = (soundId) => {
    const candidates = GRAPHEME_COSTS[soundId] || GRAPHEME_MAP[soundId] || [];
    const sorted = [...candidates].sort((a, b) => b.length - a.length);
    for (const candidate of sorted) {
      if (!candidate) continue;
      if (upper.startsWith(candidate, index)) return candidate;
    }
    return null;
  };

  const buildRuleKey = (ruleLabel, grapheme) => {
    const candidate = `${ruleLabel}_${grapheme}`;
    if (RULES[candidate]) return candidate;
    return null;
  };

  for (let i = 0; i < tokens.length; i += 1) {
    const soundId = tokens[i];
    const ruleLabel = getRuleLabel(soundId);
    let grapheme = pickGrapheme(soundId);

    if (!grapheme) {
      const fallbackChar = upper[index] || "";
      if (fallbackChar) grapheme = fallbackChar;
    }

    if (!grapheme) return null;

    const ruleKey = buildRuleKey(ruleLabel, grapheme);
    if (!ruleKey) return null;
    keys.push(ruleKey);
    index += grapheme.length;

    const nextSound = tokens[i + 1];
    if (upper[index] === "E" && nextSound && !isVowelSound(nextSound)) {
      const silentKey = RULES["SILENT_E"] ? "SILENT_E" : null;
      if (silentKey) {
        keys.push(silentKey);
        index += 1;
      }
    }
  }

  if (index < upper.length) {
    const remainder = upper.slice(index);
    if (remainder === "E") {
      const silentKey = RULES["SILENT_E"] ? "SILENT_E" : null;
      if (silentKey) keys.push(silentKey);
      return keys;
    }
    return null;
  }

  return keys;
};

const splitBySuffix = (word, tokens) => {
  const upper = word.toUpperCase();
  const candidates = [
    { suffix: "ING", tails: [["ɪ", "ŋ"], ["i", "ŋ"]] },
    { suffix: "ED", tails: [["ɪ", "d"]] },
    { suffix: "AGE", tails: [["ɪ", "dʒ"]] },
    { suffix: "ES", tails: [["ɪ", "z"], ["ə", "z"]] },
    { suffix: "S", tails: [["s"], ["z"]] },
    { suffix: "LY", tails: [["l", "i"], ["l", "ɪ"]] }
  ];

  for (const candidate of candidates) {
    if (!upper.endsWith(candidate.suffix)) continue;
    for (const tail of candidate.tails) {
      if (tokens.length < tail.length) continue;
      const tailTokens = tokens.slice(tokens.length - tail.length);
      if (tailTokens.join("|") !== tail.join("|")) continue;
      return {
        baseWord: upper.slice(0, -candidate.suffix.length),
        baseTokens: tokens.slice(0, tokens.length - tail.length),
        suffixWord: candidate.suffix,
        suffixTokens: tailTokens
      };
    }
  }
  return null;
};

export const toRuleKeys = (word, ipa, ruleMap, unknownSymbols = null) => {
  if (!ipa) return null;
  const tokens = tokenizeIPA(ipa, unknownSymbols, word);
  if (!tokens.length) return null;

  const direct = toRuleKeysFromTokens(word, tokens, ruleMap);
  if (direct) return direct;

  const split = splitBySuffix(word, tokens);
  if (split) {
    const baseKeys = toRuleKeysFromTokens(split.baseWord, split.baseTokens, ruleMap);
    if (!baseKeys) return null;
    const suffixKeys = toRuleKeysFromTokens(split.suffixWord, split.suffixTokens, ruleMap);
    if (!suffixKeys) return null;
    return [...baseKeys, ...suffixKeys];
  }

  return toRuleKeysHeuristic(word, tokens, ruleMap);
};

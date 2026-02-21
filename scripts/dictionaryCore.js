import { levelData } from "../src/data/levels.js";
import { PHONEME_STANDARD_RULE_LABELS } from "../src/data/phonemeStandardRuleLabels.js";
import {
  alignPhonemesToGraphemesDetailed,
  GRAPHEME_COSTS
} from "../src/data/robustAligner.js";

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
  ["ɑʊ", "aʊ"],
  ["ɑɪə", "aɪ"],
  ["aɪə", "aɪ"],
  ["ɑɪ", "aɪ"],
  ["ʧ", "tʃ"],
  ["ʤ", "dʒ"],
  ["ʉ", "u"],
  ["ɘ", "ə"],
  ["ɨ", "ɪ"],
  ["ɯ", "u"],
  ["ɫ", "l"],
  ["ɾ", "t"],
  ["ʔ", "t"],
  ["ʍ", "w"]
];

// Final canonicalization pass for composite phonemes so they don't get
// fragmented by earlier symbol-level replacements.
export const COMPOSITE_OVERRIDES = [
  ["ɑʊ", "aʊ"],
  ["ɑɪ", "aɪ"],
  ["ɛɪ", "eɪ"],
  ["oɪ", "ɔɪ"],
  ["jʊ", "ju"]
];

export const IPA_TOKENS = [
  "kw",
  "ʃən",
  "əl",
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

export const GRAPHEME_MAP = {};

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
  for (const [from, to] of COMPOSITE_OVERRIDES) {
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
  alignPhonemesToGraphemesDetailed(word, phonemes);

export const getRuleLabel = (soundId) => {
  if (soundId == null) return "SILENT";
  if (PHONEME_STANDARD_RULE_LABELS[soundId]) return PHONEME_STANDARD_RULE_LABELS[soundId];
  if (/^[a-z]+$/i.test(soundId)) return soundId.toUpperCase();
  const parts = Array.from(soundId).map((ch) =>
    /[a-z0-9]/i.test(ch) ? ch.toUpperCase() : `U${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`
  );
  return parts.join("_");
};

export const RULE_LABEL_GRAPHEME_COSTS = (() => {
  const mapped = new Map();
  for (const [soundId, spellings] of Object.entries(GRAPHEME_COSTS || {})) {
    const ruleLabel = getRuleLabel(soundId);
    if (!mapped.has(ruleLabel)) mapped.set(ruleLabel, new Set());
    for (const spelling of spellings || []) {
      const upper = String(spelling || "").toUpperCase();
      if (upper) mapped.get(ruleLabel).add(upper);
    }
  }
  return mapped;
})();

export const buildRuleKeyMap = (options = {}) => {
  return { exactMap: new Map(), soundFallback: new Map(), options };
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
  const alignmentResult = alignGraphemes(word, phonemes);
  if (!alignmentResult || !alignmentResult.alignment || alignmentResult.alignment.length === 0) return null;
  if (alignmentResult.quality?.isGarbage) return null;
  const alignment = alignmentResult.alignment;
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
  const upper = String(word || "").toUpperCase();
  let graphemeIndex = 0;
  const ruleKeys = [];

  const isAllowedByCosts = (ruleLabel, grapheme, soundId) => {
    const allowed = RULE_LABEL_GRAPHEME_COSTS.get(ruleLabel);
    if (!allowed || allowed.size === 0) return true;
    if (allowed.has(grapheme)) return true;
    if (grapheme.length === 1 && upper[graphemeIndex] === grapheme) return true;
    if ("AEIOUY".includes(grapheme) && VOWEL_SOUNDS.has(soundId)) return true;
    return false;
  };

  for (const entry of built.entries) {
    const ruleLabel = getRuleLabel(entry.soundId);
    const grapheme = String(entry.grapheme || "").toUpperCase();
    if (!grapheme) return null;
    if (!isAllowedByCosts(ruleLabel, grapheme, entry.soundId)) return null;
    ruleKeys.push(`${ruleLabel}_${grapheme}`);
    graphemeIndex += grapheme.length;
  }
  return ruleKeys;
};

const VOWEL_SOUNDS = new Set([
  "i", "ɪ", "eɪ", "ɛ", "æ", "ɑ", "ɔ", "oʊ", "u", "ʊ", "ʌ", "aɪ", "aʊ", "ɔɪ", "ə", "ju"
]);

const isVowelSound = (soundId) => VOWEL_SOUNDS.has(soundId);

const toRuleKeysHeuristic = (word, tokens, ruleMap) => {
  const upper = word.toUpperCase();
  const cache = new Map();

  const buildRuleKey = (ruleLabel, grapheme) => {
    return `${ruleLabel}_${grapheme}`;
  };

  const pickRuleKeyForLabel = (ruleLabel, index) => {
    const prefix = `${ruleLabel}_`;
    const preferredSpellings = RULE_LABEL_GRAPHEME_COSTS.get(ruleLabel) || null;
    const candidates = [];
    const spellings = preferredSpellings ? Array.from(preferredSpellings) : [];
    for (const spelling of spellings) {
      if (!spelling) continue;
      if (!upper.startsWith(spelling, index)) continue;
      candidates.push({
        ruleKey: `${prefix}${spelling}`,
        spelling,
        preferred: Boolean(preferredSpellings && preferredSpellings.has(spelling.toUpperCase())),
        usageCount: 0
      });
    }
    if (!candidates.length) return [];
    candidates.sort((a, b) =>
      Number(b.preferred) - Number(a.preferred) ||
      b.spelling.length - a.spelling.length ||
      b.usageCount - a.usageCount ||
      a.ruleKey.localeCompare(b.ruleKey)
    );
    return candidates;
  };

  const solve = (tokenIndex, index) => {
    const memoKey = `${tokenIndex}|${index}`;
    if (cache.has(memoKey)) return cache.get(memoKey);

    if (tokenIndex >= tokens.length) {
      if (index === upper.length) {
        cache.set(memoKey, []);
        return [];
      }
      const remainder = upper.slice(index);
      if (remainder === "E") {
        cache.set(memoKey, ["SILENT_E"]);
        return ["SILENT_E"];
      }
      cache.set(memoKey, null);
      return null;
    }

    const soundId = tokens[tokenIndex];
    const ruleLabel = getRuleLabel(soundId);
    const nextSound = tokens[tokenIndex + 1];
    const candidates = [];
    const picked = pickRuleKeyForLabel(ruleLabel, index);
    for (const candidate of picked) candidates.push(candidate);

    const fallbackChar = upper[index] || "";
    if (fallbackChar) {
      const fallbackKey = buildRuleKey(ruleLabel, fallbackChar);
      candidates.push({
        ruleKey: fallbackKey,
        spelling: fallbackChar,
        usageCount: 0
      });
    }

    for (const candidate of candidates) {
      let nextIndex = index + candidate.spelling.length;
      const partial = [candidate.ruleKey];
      if (upper[nextIndex] === "E" && nextSound && !isVowelSound(nextSound)) {
        partial.push("SILENT_E");
        nextIndex += 1;
      }
      const remainder = solve(tokenIndex + 1, nextIndex);
      if (remainder) {
        const solved = [...partial, ...remainder];
        cache.set(memoKey, solved);
        return solved;
      }
    }

    cache.set(memoKey, null);
    return null;
  };

  return solve(0, 0);
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
  const alignmentProbe = alignPhonemesToGraphemesDetailed(word, tokens);
  if (!alignmentProbe.alignment?.length) return null;
  if (alignmentProbe.quality?.isGarbage) return null;

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

// src/utils/gameLogic.js

import { getPhonemesForWord } from "../data/phonemeMap";

const isSSound = (word) => {
  if (word.startsWith("S") && !word.startsWith("SH")) return true;
  if (word.startsWith("C") && word.length > 1 && ["E", "I", "Y"].includes(word[1])) return true;
  return false;
};

const replaceAllWithMask = (word, mask, from, to) => {
  let nextWord = "";
  const nextMask = [];
  for (let i = 0; i < word.length; ) {
    if (word.startsWith(from, i)) {
      nextWord += to;
      for (let j = 0; j < to.length; j += 1) nextMask.push(true);
      i += from.length;
    } else {
      nextWord += word[i];
      nextMask.push(mask[i] || false);
      i += 1;
    }
  }
  return { word: nextWord, mask: nextMask };
};

const replaceCharWithMask = (word, mask, fromChar, to, shouldReplace) => {
  let nextWord = "";
  const nextMask = [];
  for (let i = 0; i < word.length; i += 1) {
    const char = word[i];
    if (char === fromChar && (!shouldReplace || shouldReplace(word, i))) {
      nextWord += to;
      for (let j = 0; j < to.length; j += 1) nextMask.push(true);
    } else {
      nextWord += char;
      nextMask.push(mask[i] || false);
    }
  }
  return { word: nextWord, mask: nextMask };
};

const replaceSSoundWithMask = (word, mask, to) => {
  let nextWord = "";
  const nextMask = [];
  for (let i = 0; i < word.length; ) {
    if (word.startsWith("SH", i)) {
      nextWord += "SH";
      nextMask.push(mask[i] || false, mask[i + 1] || false);
      i += 2;
      continue;
    }
    if (word[i] === "S") {
      const prev = word[i - 1];
      if (prev && prev === to[0]) {
        nextWord += "S";
        nextMask.push(mask[i] || false);
        i += 1;
        continue;
      }
      nextWord += to;
      for (let j = 0; j < to.length; j += 1) nextMask.push(true);
      i += 1;
      continue;
    }
    if (word[i] === "C" && i + 1 < word.length && ["E", "I", "Y"].includes(word[i + 1])) {
      const prev = word[i - 1];
      if (prev && prev === "S") {
        nextWord += "C";
        nextMask.push(mask[i] || false);
        i += 1;
        continue;
      }
      nextWord += to;
      for (let j = 0; j < to.length; j += 1) nextMask.push(true);
      i += 1;
      continue;
    }
    nextWord += word[i];
    nextMask.push(mask[i] || false);
    i += 1;
  }
  return { word: nextWord, mask: nextMask };
};

const applyRuleWithMask = (ruleKey, word, mask) => {
  switch (ruleKey) {
    case "F_PH":
      return replaceCharWithMask(word, mask, "F", "F_PH");
    case "F_GH":
      return replaceCharWithMask(word, mask, "F", "F_GH");
    case "K_CK":
      return replaceCharWithMask(word, mask, "K", "K_CK", (w, i) => w[i - 1] !== "C");
    case "K_QUE":
      return replaceCharWithMask(word, mask, "K", "K_QUE");
    case "SH_TI":
      return replaceAllWithMask(word, mask, "SH", "SH_TI");
    case "SH_CI":
      return replaceAllWithMask(word, mask, "SH", "SH_CI");
    case "SH_S":
      return replaceAllWithMask(word, mask, "SH", "S");
    case "S_PS":
      return replaceSSoundWithMask(word, mask, "S_PS");
    case "S_SC":
      return replaceSSoundWithMask(word, mask, "S_SC");
    case "S_TS":
      return replaceSSoundWithMask(word, mask, "S_TS");
    case "R_WR":
      return replaceCharWithMask(word, mask, "R", "R_WR", (w, i) => w[i - 1] !== "W");
    case "R_RH":
      return replaceCharWithMask(word, mask, "R", "R_RH", (w, i) => w[i + 1] !== "H");
    case "R_L":
      return replaceCharWithMask(word, mask, "R", "L");
    case "J_DGE":
      return replaceCharWithMask(word, mask, "H_J", "J_DGE");
    case "J_DJ":
      return replaceCharWithMask(word, mask, "H_J", "J_DJ");
    case "N_KN":
      return replaceCharWithMask(word, mask, "N", "N_KN", (w, i) => w[i - 1] !== "K");
    case "N_GN":
      return replaceCharWithMask(word, mask, "N", "N_GN", (w, i) => w[i - 1] !== "G");
    case "N_PN":
      return replaceCharWithMask(word, mask, "N", "N_PN", (w, i) => w[i - 1] !== "P");
    case "N_GNE":
      return replaceCharWithMask(word, mask, "N", "N_GNE", (w, i) => w[i - 1] !== "G");
    case "T_BT":
      return replaceCharWithMask(word, mask, "T", "T_BT", (w, i) => w[i - 1] !== "B");
    case "M_MN":
      return replaceCharWithMask(word, mask, "M", "M_MN", (w, i) => w[i + 1] !== "N");
    case "M_GM":
      return replaceCharWithMask(word, mask, "M", "M_GM");
    case "K_CH":
      return replaceCharWithMask(word, mask, "K", "K_CH");
    case "KW_CH":
      return replaceAllWithMask(word, mask, "K_QU", "K_CH");
    case "Z_X":
      return replaceCharWithMask(word, mask, "Z", "Z_X");
    case "Z_CZ":
      return replaceCharWithMask(word, mask, "Z", "Z_CZ");
    case "H_WH":
      return replaceCharWithMask(word, mask, "H", "H_WH", (w, i) => w[i - 1] !== "W");
    case "H_J":
      return replaceCharWithMask(word, mask, "H", "H_J", (w, i) => w[i - 1] !== "W");
    case "T_PT":
      return replaceCharWithMask(word, mask, "T", "T_PT", (w, i) => w[i - 1] !== "P");
    case "K_QU":
      return replaceCharWithMask(word, mask, "K", "K_QU");
    case "G_GUE":
      return replaceCharWithMask(word, mask, "G", "G_GUE");
    case "CH_C":
      return replaceAllWithMask(word, mask, "K_CH", "C");
    case "W_O":
      return replaceCharWithMask(word, mask, "W", "O");
    case "P_GH":
      return replaceCharWithMask(word, mask, "P", "F_GH");
    case "TS_ZZ":
      return replaceAllWithMask(word, mask, "S_TS", "TS_ZZ");
    case "V_F":
      return replaceCharWithMask(word, mask, "V", "F");
    case "J_LL":
      return replaceCharWithMask(word, mask, "Y", "J_LL");
    case "NI_GNA":
      return replaceAllWithMask(word, mask, "NI", "NI_GNA");
    default:
      return { word, mask };
  }
};

// 1. CALCULATE THE SPELLING
// Takes the base word and runs it through every active rule.
// Returns the "corrupted" word, a list of rules used, and a hint mask.
export const calculateTargetSpelling = (baseWord, activeRules) => {
  const phonemes = getPhonemesForWord(baseWord) || [
    { soundId: null, defaultSpelling: baseWord }
  ];
  const usedRules = new Set();
  let currentSpelling = "";
  const currentMask = [];

  phonemes.forEach((phoneme) => {
    const matchingRule = activeRules.find((rule) => rule.soundId === phoneme.soundId);
    const nextSpelling = matchingRule
      ? (matchingRule.spelling ?? matchingRule.key)
      : phoneme.defaultSpelling;
    const isAltered = Boolean(matchingRule && nextSpelling !== phoneme.defaultSpelling);

    if (isAltered) usedRules.add(matchingRule.key);
    currentSpelling += nextSpelling;
    for (let i = 0; i < nextSpelling.length; i += 1) currentMask.push(isAltered);
  });

  return {
    targetSpelling: currentSpelling,
    usedRules: Array.from(usedRules),
    hintMask: currentMask
  };
};

// 2. CHECK FOR CONFLICTS
// Returns true if the player already has a rule in this Mutex Group
export const isRuleBlocked = (newRule, activeRules, newRuleKey) => {
  if (!newRule) return false;
  if (activeRules.some((r) => r.key === newRuleKey)) return true;
  const activeGroups = activeRules.map((r) => r.mutexGroup);
  if (activeGroups.includes(newRule.mutexGroup)) return true;
  if (newRule.blocks) {
    if (activeRules.some((r) => newRule.blocks.includes(r.mutexGroup))) return true;
    if (activeRules.some((r) => newRule.blocks.includes(r.key))) return true;
  }
  if (activeRules.some((r) => r.blocks?.includes(newRule.mutexGroup))) return true;
  if (activeRules.some((r) => r.blocks?.includes(newRuleKey))) return true;
  return false;
};

const caseify = (match, replacement) => {
  if (match.toUpperCase() === match && match.length === 1) {
    return replacement[0].toUpperCase() + replacement.slice(1).toLowerCase();
  }
  if (match.toUpperCase() === match) return replacement.toUpperCase();
  if (match[0].toUpperCase() === match[0]) {
    return replacement[0].toUpperCase() + replacement.slice(1).toLowerCase();
  }
  return replacement.toLowerCase();
};

const replaceWithCase = (text, pattern, replacement) =>
  text.replace(pattern, (match) => caseify(match, replacement));

const replaceCharInText = (text, fromChar, to, shouldReplace) => {
  let nextText = "";
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (char.toUpperCase() === fromChar && (!shouldReplace || shouldReplace(text, i))) {
      nextText += caseify(char, to);
    } else {
      nextText += char;
    }
  }
  return nextText;
};

const replaceSSoundInText = (text, to) => {
  let nextText = "";
  for (let i = 0; i < text.length; ) {
    const slice = text.slice(i, i + 2);
    if (slice.toUpperCase() === "SH") {
      nextText += slice;
      i += 2;
      continue;
    }
    const char = text[i];
    if (char.toUpperCase() === "S") {
      const prev = text[i - 1];
      if (prev && prev.toUpperCase() === to[0]) {
        nextText += char;
        i += 1;
        continue;
      }
      nextText += caseify(char, to);
      i += 1;
      continue;
    }
    const next = text[i + 1];
    if (char.toUpperCase() === "C" && next && ["E", "I", "Y"].includes(next.toUpperCase())) {
      const prev = text[i - 1];
      if (prev && prev.toUpperCase() === "S") {
        nextText += char;
        i += 1;
        continue;
      }
      nextText += caseify(char, to);
      i += 1;
      continue;
    }
    nextText += char;
    i += 1;
  }
  return nextText;
};

const applyRuleToText = (ruleKey, text) => {
  switch (ruleKey) {
    case "F_PH":
      return replaceCharInText(text, "F", "F_PH");
    case "F_GH":
      return replaceCharInText(text, "F", "F_GH");
    case "K_CK":
      return replaceCharInText(text, "K", "K_CK", (t, i) => t[i - 1]?.toUpperCase() !== "C");
    case "K_QUE":
      return replaceCharInText(text, "K", "K_QUE");
    case "SH_TI":
      return replaceWithCase(text, /sh/gi, "SH_TI");
    case "SH_CI":
      return replaceWithCase(text, /sh/gi, "SH_CI");
    case "SH_S":
      return replaceWithCase(text, /sh/gi, "S");
    case "S_PS": {
      return replaceSSoundInText(text, "S_PS");
    }
    case "S_SC": {
      return replaceSSoundInText(text, "S_SC");
    }
    case "S_TS": {
      return replaceSSoundInText(text, "S_TS");
    }
    case "R_WR":
      return replaceCharInText(text, "R", "R_WR", (t, i) => t[i - 1]?.toUpperCase() !== "W");
    case "R_RH":
      return replaceCharInText(text, "R", "R_RH", (t, i) => t[i + 1]?.toUpperCase() !== "H");
    case "R_L":
      return replaceCharInText(text, "R", "L");
    case "J_DGE":
      return replaceCharInText(text, "H_J", "J_DGE");
    case "J_DJ":
      return replaceCharInText(text, "H_J", "J_DJ");
    case "N_KN":
      return replaceCharInText(text, "N", "N_KN", (t, i) => t[i - 1]?.toUpperCase() !== "K");
    case "N_GN":
      return replaceCharInText(text, "N", "N_GN", (t, i) => t[i - 1]?.toUpperCase() !== "G");
    case "N_PN":
      return replaceCharInText(text, "N", "N_PN", (t, i) => t[i - 1]?.toUpperCase() !== "P");
    case "N_GNE":
      return replaceCharInText(text, "N", "N_GNE", (t, i) => t[i - 1]?.toUpperCase() !== "G");
    case "T_BT":
      return replaceCharInText(text, "T", "T_BT", (t, i) => t[i - 1]?.toUpperCase() !== "B");
    case "M_MN":
      return replaceCharInText(text, "M", "M_MN", (t, i) => t[i + 1]?.toUpperCase() !== "N");
    case "M_GM":
      return replaceCharInText(text, "M", "M_GM");
    case "K_CH":
      return replaceCharInText(text, "K", "K_CH");
    case "KW_CH":
      return replaceWithCase(text, /qu/gi, "K_CH");
    case "Z_X":
      return replaceCharInText(text, "Z", "Z_X");
    case "Z_CZ":
      return replaceCharInText(text, "Z", "Z_CZ");
    case "H_WH":
      return replaceCharInText(text, "H", "H_WH", (t, i) => t[i - 1]?.toUpperCase() !== "W");
    case "H_J":
      return replaceCharInText(text, "H", "H_J", (t, i) => t[i - 1]?.toUpperCase() !== "W");
    case "T_PT":
      return replaceCharInText(text, "T", "T_PT", (t, i) => t[i - 1]?.toUpperCase() !== "P");
    case "K_QU":
      return replaceCharInText(text, "K", "K_QU");
    case "G_GUE":
      return replaceCharInText(text, "G", "G_GUE");
    case "CH_C":
      return replaceWithCase(text, /ch/gi, "C");
    case "W_O":
      return replaceCharInText(text, "W", "O");
    case "P_GH":
      return replaceCharInText(text, "P", "F_GH");
    case "TS_ZZ":
      return replaceWithCase(text, /ts/gi, "TS_ZZ");
    case "V_F":
      return replaceCharInText(text, "V", "F");
    case "J_LL":
      return replaceCharInText(text, "Y", "J_LL");
    case "NI_GNA":
      return replaceWithCase(text, /ni/gi, "NI_GNA");
    default:
      return text;
  }
};

export const transformTextWithRules = (text, activeRules) =>
  activeRules.reduce((current, rule) => applyRuleToText(rule.key, current), text);

export const corruptText = (text, activeRules) =>
  text
    .split(" ")
    .map((word) => {
      const applyCasing = (original, transformed) => {
        if (original.toUpperCase() === original) return transformed;
        if (original.toLowerCase() === original) return transformed.toLowerCase();
        const isTitleCase =
          original[0] === original[0].toUpperCase() &&
          original.slice(1) === original.slice(1).toLowerCase();
        if (isTitleCase) {
          return transformed[0] + transformed.slice(1).toLowerCase();
        }
        return transformed;
      };

      return word.replace(/[A-Za-z]+/g, (segment) => {
        const cleanWord = segment.toUpperCase();
        const transformed = calculateTargetSpelling(cleanWord, activeRules).targetSpelling;
        return applyCasing(segment, transformed);
      });
    })
    .join(" ");

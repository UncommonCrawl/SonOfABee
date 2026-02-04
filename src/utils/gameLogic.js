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
    case "PH":
      return replaceCharWithMask(word, mask, "F", "PH");
    case "GH":
      return replaceCharWithMask(word, mask, "F", "GH");
    case "CK":
      return replaceCharWithMask(word, mask, "K", "CK", (w, i) => w[i - 1] !== "C");
    case "QUE":
      return replaceCharWithMask(word, mask, "K", "QUE");
    case "TI":
      return replaceAllWithMask(word, mask, "SH", "TI");
    case "CI":
      return replaceAllWithMask(word, mask, "SH", "CI");
    case "PS":
      return replaceSSoundWithMask(word, mask, "PS");
    case "SC":
      return replaceSSoundWithMask(word, mask, "SC");
    case "TS":
      return replaceSSoundWithMask(word, mask, "TS");
    case "WR":
      return replaceCharWithMask(word, mask, "R", "WR", (w, i) => w[i - 1] !== "W");
    case "RH":
      return replaceCharWithMask(word, mask, "R", "RH", (w, i) => w[i + 1] !== "H");
    case "DGE":
      return replaceCharWithMask(word, mask, "J", "DGE");
    case "KN":
      return replaceCharWithMask(word, mask, "N", "KN", (w, i) => w[i - 1] !== "K");
    case "GN":
      return replaceCharWithMask(word, mask, "N", "GN", (w, i) => w[i - 1] !== "G");
    case "PN":
      return replaceCharWithMask(word, mask, "N", "PN", (w, i) => w[i - 1] !== "P");
    case "BT":
      return replaceCharWithMask(word, mask, "T", "BT", (w, i) => w[i - 1] !== "B");
    case "MN":
      return replaceCharWithMask(word, mask, "M", "MN", (w, i) => w[i + 1] !== "N");
    case "CH":
      return replaceCharWithMask(word, mask, "K", "CH");
    case "X":
      return replaceCharWithMask(word, mask, "Z", "X");
    case "WH":
      return replaceCharWithMask(word, mask, "H", "WH", (w, i) => w[i - 1] !== "W");
    case "PT":
      return replaceCharWithMask(word, mask, "T", "PT", (w, i) => w[i - 1] !== "P");
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
    case "PH":
      return replaceCharInText(text, "F", "PH");
    case "GH":
      return replaceCharInText(text, "F", "GH");
    case "CK":
      return replaceCharInText(text, "K", "CK", (t, i) => t[i - 1]?.toUpperCase() !== "C");
    case "QUE":
      return replaceCharInText(text, "K", "QUE");
    case "TI":
      return replaceWithCase(text, /sh/gi, "TI");
    case "CI":
      return replaceWithCase(text, /sh/gi, "CI");
    case "PS": {
      return replaceSSoundInText(text, "PS");
    }
    case "SC": {
      return replaceSSoundInText(text, "SC");
    }
    case "TS": {
      return replaceSSoundInText(text, "TS");
    }
    case "WR":
      return replaceCharInText(text, "R", "WR", (t, i) => t[i - 1]?.toUpperCase() !== "W");
    case "RH":
      return replaceCharInText(text, "R", "RH", (t, i) => t[i + 1]?.toUpperCase() !== "H");
    case "DGE":
      return replaceCharInText(text, "J", "DGE");
    case "KN":
      return replaceCharInText(text, "N", "KN", (t, i) => t[i - 1]?.toUpperCase() !== "K");
    case "GN":
      return replaceCharInText(text, "N", "GN", (t, i) => t[i - 1]?.toUpperCase() !== "G");
    case "PN":
      return replaceCharInText(text, "N", "PN", (t, i) => t[i - 1]?.toUpperCase() !== "P");
    case "BT":
      return replaceCharInText(text, "T", "BT", (t, i) => t[i - 1]?.toUpperCase() !== "B");
    case "MN":
      return replaceCharInText(text, "M", "MN", (t, i) => t[i + 1]?.toUpperCase() !== "N");
    case "CH":
      return replaceCharInText(text, "K", "CH");
    case "X":
      return replaceCharInText(text, "Z", "X");
    case "WH":
      return replaceCharInText(text, "H", "WH", (t, i) => t[i - 1]?.toUpperCase() !== "W");
    case "PT":
      return replaceCharInText(text, "T", "PT", (t, i) => t[i - 1]?.toUpperCase() !== "P");
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

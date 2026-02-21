// src/data/phonemeMap.js
import { RULES } from "./rules.js";
import { getRuleKeysForWord } from "./dictionary.js";

export const getPhonemesForWord = (word) => {
  if (!word) return null;
  const key = word.toUpperCase();
  const ruleKeys = getRuleKeysForWord(key);
  if (!ruleKeys || ruleKeys.length === 0) return null;

  const phonemes = [];
  for (const ruleKey of ruleKeys) {
    const rule = RULES[ruleKey];
    if (!rule) return null;
    phonemes.push({
      soundId: rule.soundId ?? null,
      defaultSpelling: rule.spelling ?? "",
      ruleKey
    });
  }

  return phonemes;
};

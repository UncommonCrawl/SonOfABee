// src/data/phonemeMap.js
import { RULES } from "./rules.js";
import { levelData } from "./levels.js";
import { hintDictionary } from "./hint_dictionary.js";

export const getPhonemesForWord = (word) => {
  if (!word) return null;
  const key = word.toUpperCase();
  const level = levelData.find((entry) => entry?.word?.toUpperCase() === key);
  const ruleKeys = level?.ruleKey
    ? (Array.isArray(level.ruleKey) ? level.ruleKey : [level.ruleKey])
    : (hintDictionary[key] || null);
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

// src/data/phonemeMap.js
import phonemeMapping from "./phoneme_mapping.json";

export const getPhonemesForWord = (word) => {
  if (!word) return null;
  const key = word.toUpperCase();
  const phonemes = phonemeMapping[key];
  if (!phonemes || phonemes.length === 0) return null;
  return phonemes.map((entry) => ({
    soundId: entry.soundId,
    defaultSpelling: entry.grapheme || ""
  }));
};

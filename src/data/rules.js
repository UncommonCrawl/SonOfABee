// --- HELPER FUNCTIONS ---
// We define these outside the rules so they can be reused.

const isSSound = (word) => {
  // 1. Starts with S (but not SH)
  if (word.startsWith("S") && !word.startsWith("SH")) return true;
  // 2. Starts with Soft C (C followed by E, I, or Y)
  if (word.startsWith("C") && word.length > 1 && ["E", "I", "Y"].includes(word[1])) return true;
  return false;
};

// --- RULE DEFINITIONS ---
// This acts as the translation layer between the "Key" in levels.js and the actual logic.

export const RULES = {
  AE_AI: {
    name: "aah → AI",
    description: "All 'aah' sounds are spelled AI",
    soundId: "æ",
    spelling: "AI",
    usageCount: 1,
    mutexGroup: "VOWEL_AE",
    maxDurability: 3,
    transform: (word) => word
  },
  AE_AU: {
    name: "aah → AU",
    description: "All 'aah' sounds are spelled AU",
    soundId: "æ",
    spelling: "AU",
    usageCount: 1,
    mutexGroup: "VOWEL_AE",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_A: {
    name: "ɑh → A",
    description: "All 'ɑh' sounds are spelled A",
    soundId: "ɑ",
    spelling: "A",
    usageCount: 20,
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_ACH: {
    name: "ɑh → ACH",
    description: "All 'ɑh' sounds are spelled ACH",
    soundId: "ɑ",
    spelling: "ACH",
    usageCount: 2,
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_E: {
    name: "ɑh → E",
    description: "All 'ɑh' sounds are spelled E",
    soundId: "ɑ",
    spelling: "E",
    usageCount: 22,
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_O: {
    name: "ɑh → O",
    description: "All 'ɑh' sounds are spelled O",
    soundId: "ɑ",
    spelling: "O",
    usageCount: 125,
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_OW: {
    name: "ah → OW",
    description: "All 'ah' sounds are spelled OW",
    soundId: "oʊ",
    spelling: "OW",
    usageCount: 19,
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_U: {
    name: "ah → U",
    description: "All 'ah' sounds are spelled U",
    soundId: "ɑ",
    spelling: "U",
    usageCount: 7,
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  AIR_AIR: {
    name: "air → AIR",
    description: "All 'air' sounds are spelled AIR",
    soundId: "ɛr",
    spelling: "AIR",
    usageCount: 3,
    mutexGroup: "VOWEL_AIR",
    maxDurability: 3,
    transform: (word) => word
  },
  AIR_AIRE: {
    name: "air → AIRE",
    description: "All 'air' sounds are spelled AIRE",
    soundId: "ɛr",
    spelling: "AIRE",
    usageCount: 1,
    mutexGroup: "VOWEL_AIR",
    maxDurability: 3,
    transform: (word) => word
  },
  AIR_AR: {
    name: "air → AR",
    description: "All 'air' sounds are spelled AR",
    soundId: "ɛr",
    spelling: "AR",
    usageCount: 17,
    mutexGroup: "VOWEL_AIR",
    maxDurability: 3,
    transform: (word) => word
  },
  AK_AC: {
    name: "ak → AC",
    description: "All 'ak' sounds are spelled AC",
    soundId: "æk",
    spelling: "AC",
    usageCount: 7,
    mutexGroup: "SOUND_AK",
    maxDurability: 3,
    transform: (word) => word
  },
  AL_AL: {
    name: "al → AL",
    description: "All 'al' sounds are spelled AL",
    soundId: "æl",
    spelling: "AL",
    usageCount: 15,
    mutexGroup: "SOUND_AL",
    maxDurability: 3,
    transform: (word) => word
  },
  AR_AR: {
    name: "ɑr → AR",
    description: "All 'ɑr' sounds are spelled AR",
    soundId: "ɑr",
    spelling: "AR",
    usageCount: 28,
    mutexGroup: "VOWEL_AR",
    maxDurability: 3,
    transform: (word) => word
  },
  AR_EAR: {
    name: "ɑr → EAR",
    description: "All 'ɑr' sounds are spelled EAR",
    soundId: "ɑr",
    spelling: "EAR",
    usageCount: 6,
    mutexGroup: "VOWEL_AR",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_A: {
    name: "aw → A",
    description: "All 'aw' sounds are spelled A",
    soundId: "ɔ",
    spelling: "A",
    usageCount: 9,
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_AU: {
    name: "aw → AU",
    description: "All 'aw' sounds are spelled AU",
    soundId: "ɔ",
    spelling: "AU",
    usageCount: 6,
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_AW: {
    name: "aw → AW",
    description: "All 'aw' sounds are spelled AW",
    soundId: "ɔ",
    spelling: "AW",
    usageCount: 4,
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_O: {
    name: "aw → O",
    description: "All 'aw' sounds are spelled O",
    soundId: "ɔ",
    spelling: "O",
    usageCount: 20,
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_OA: {
    name: "aw → OA",
    description: "All 'aw' sounds are spelled OA",
    soundId: "ɔ",
    spelling: "OA",
    usageCount: 1,
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_OU: {
    name: "aw → OU",
    description: "All 'aw' sounds are spelled OU",
    soundId: "ɔ",
    spelling: "OU",
    usageCount: 2,
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_A: {
    name: "ay → A",
    description: "All 'ay' sounds are spelled A",
    soundId: "eɪ",
    spelling: "A",
    usageCount: 115,
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_AI: {
    name: "ay → AI",
    description: "All 'ay' sounds are spelled AI",
    soundId: "eɪ",
    spelling: "AI",
    usageCount: 28,
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_AU: {
    name: "ay → AU",
    description: "All 'ay' sounds are spelled AU",
    soundId: "eɪ",
    spelling: "AU",
    usageCount: 1,
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_AY: {
    name: "ay → AY",
    description: "All 'ay' sounds are spelled AY",
    soundId: "eɪ",
    spelling: "AY",
    usageCount: 13,
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_E: {
    name: "ay → E",
    description: "All 'ay' sounds are spelled E",
    soundId: "eɪ",
    spelling: "E",
    usageCount: 5,
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_EA: {
    name: "ay → EA",
    description: "All 'ay' sounds are spelled EA",
    soundId: "eɪ",
    spelling: "EA",
    usageCount: 4,
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_EI: {
    name: "ay → EI",
    description: "All 'ay' sounds are spelled EI",
    soundId: "eɪ",
    spelling: "EI",
    usageCount: 3,
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_ET: {
    name: "ay → ET",
    description: "All 'ay' sounds are spelled ET",
    soundId: "eɪ",
    spelling: "ET",
    usageCount: 9,
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_EY: {
    name: "ay → EY",
    description: "All 'ay' sounds are spelled EY",
    soundId: "eɪ",
    spelling: "EY",
    usageCount: 5,
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_I: {
    name: "ay → I",
    description: "All 'ay' sounds are spelled I",
    soundId: "eɪ",
    spelling: "I",
    usageCount: 58,
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_Y: {
    name: "ay → Y",
    description: "All 'ay' sounds are spelled Y",
    soundId: "eɪ",
    spelling: "Y",
    usageCount: 18,
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AZ_AS: {
    name: "az → AS",
    description: "All 'az' sounds are spelled AS",
    soundId: "æz",
    spelling: "AS",
    usageCount: 6,
    mutexGroup: "SOUND_AZ",
    maxDurability: 3,
    transform: (word) => word
  },
  B_B: {
    name: "b → B",
    description: "All 'b' sounds are spelled B",
    soundId: "b",
    spelling: "B",
    usageCount: 168,
    mutexGroup: "SOUND_B",
    maxDurability: 3,
    transform: (word) => word
  },
  CH_C: {
    name: "ch → C",
    description: "All 'ch' sounds are spelled C",
    soundId: "tʃ",
    spelling: "C",
    usageCount: 28,
    mutexGroup: "CH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/CH/g, "C")
  },
  CH_CC: {
    name: "ch → CC",
    description: "All 'ch' sounds are spelled CC",
    soundId: "tʃ",
    spelling: "CC",
    usageCount: 1,
    mutexGroup: "CH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  CH_CH: {
    name: "ch → CH",
    description: "All 'ch' sounds are spelled CH",
    soundId: "tʃ",
    spelling: "CH",
    usageCount: 26,
    mutexGroup: "CH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  CH_T: {
    name: "ch → T",
    description: "All 'ch' sounds are spelled T",
    soundId: "tʃ",
    spelling: "T",
    usageCount: 15,
    mutexGroup: "CH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  CH_TCH: {
    name: "ch → TCH",
    description: "All 'ch' sounds are spelled TCH",
    soundId: "tʃ",
    spelling: "TCH",
    usageCount: 5,
    mutexGroup: "CH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  }, 
  D_D: {
    name: "d → D",
    description: "All 'd' sounds are spelled D",
    soundId: "d",
    spelling: "D",
    mutexGroup: "SOUND_D",
    maxDurability: 3,
    transform: (word) => word
  },
  D_DD: {
    name: "d → DD",
    description: "All 'd' sounds are spelled DD",
    soundId: "d",
    spelling: "DD",
    usageCount: 5,
    mutexGroup: "SOUND_D",
    maxDurability: 3,
    transform: (word) => word
  },
  D_DE: {
    name: "d → DE",
    description: "All 'd' sounds are spelled DE",
    soundId: "d",
    spelling: "DE",
    usageCount: 20,
    mutexGroup: "SOUND_D",
    maxDurability: 3,
    transform: (word) => word
  },
  D_DG: {
    name: "dʒ → DG",
    description: "All 'dʒ' sounds are spelled DG",
    soundId: "dʒ",
    spelling: "DG",
    usageCount: 1,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  D_ED: {
    name: "d → ED",
    description: "All 'd' sounds are spelled ED",
    soundId: "d",
    spelling: "ED",
    usageCount: 45,
    mutexGroup: "SOUND_D",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_E: {
    name: "ee → E",
    description: "All 'ee' sounds are spelled E",
    soundId: "i",
    spelling: "E",
    usageCount: 30,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EA: {
    name: "ee → EA",
    description: "All 'ee' sounds are spelled EA",
    soundId: "i",
    spelling: "EA",
    usageCount: 21,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EE: {
    name: "ee → EE",
    description: "All 'ee' sounds are spelled EE",
    soundId: "i",
    spelling: "EE",
    usageCount: 31,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EI: {
    name: "ee → EI",
    description: "All 'ee' sounds are spelled EI",
    soundId: "i",
    spelling: "EI",
    usageCount: 2,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EO: {
    name: "ee → EO",
    description: "All 'ee' sounds are spelled EO",
    soundId: "i",
    spelling: "EO",
    usageCount: 2,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EY: {
    name: "ee → EY",
    description: "All 'ee' sounds are spelled EY",
    soundId: "i",
    spelling: "EY",
    usageCount: 5,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_I: {
    name: "ee → I",
    description: "All 'ee' sounds are spelled I",
    soundId: "i",
    spelling: "I",
    usageCount: 40,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_IE: {
    name: "ee → IE",
    description: "All 'ee' sounds are spelled IE",
    soundId: "i",
    spelling: "IE",
    usageCount: 16,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_IS: {
    name: "ee → IS",
    description: "All 'ee' sounds are spelled IS",
    soundId: "i",
    spelling: "IS",
    usageCount: 6,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_Y: {
    name: "ee → Y",
    description: "All 'ee' sounds are spelled Y",
    soundId: "i",
    spelling: "Y",
    usageCount: 108,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_A: {
    name: "ehh → A",
    description: "All 'ehh' sounds are spelled A",
    soundId: "ɛ",
    spelling: "A",
    usageCount: 15,
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_AI: {
    name: "eh → AI",
    description: "All 'eh' sounds are spelled AI",
    soundId: "ɛ",
    spelling: "AI",
    usageCount: 1,
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_E: {
    name: "eh → E",
    description: "All 'eh' sounds are spelled E",
    soundId: "ɛ",
    spelling: "E",
    usageCount: 216,
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_EA: {
    name: "ehh → EA",
    description: "All 'ehh' sounds are spelled EA",
    soundId: "ɛ",
    spelling: "EA",
    usageCount: 10,
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_EH: {
    name: "eh → EH",
    description: "All 'eh' sounds are spelled EH",
    soundId: "ɛ",
    spelling: "EH",
    usageCount: 3,
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_EI: {
    name: "eh → EI",
    description: "All 'eh' sounds are spelled EI",
    soundId: "ɛ",
    spelling: "EI",
    usageCount: 1,
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_EO: {
    name: "ehh → EO",
    description: "All 'ehh' sounds are spelled EO",
    soundId: "ɛ",
    spelling: "EO",
    usageCount: 1,
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_ES: {
    name: "eh → ES",
    description: "All 'eh' sounds are spelled ES",
    soundId: "ɛ",
    spelling: "ES",
    usageCount: 21,
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_IE: {
    name: "ehh → IE",
    description: "All 'ehh' sounds are spelled IE",
    soundId: "ɛ",
    spelling: "IE",
    usageCount: 2,
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_U: {
    name: "ehh → U",
    description: "All 'ehh' sounds are spelled U",
    soundId: "ɛ",
    spelling: "U",
    usageCount: 1,
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EL_LE: {
    name: "el → LE",
    description: "All 'el' sounds are spelled LE",
    soundId: "əl",
    spelling: "LE",
    usageCount: 25,
    mutexGroup: "SOUND_EL",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_R: {
    name: "er → R",
    description: "All 'er' sounds are spelled R",
    soundId: "ər",
    spelling: "R",
    usageCount: 26,
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_RE: {
    name: "er → RE",
    description: "All 'er' sounds are spelled RE",
    soundId: "ər",
    spelling: "RE",
    usageCount: 2,
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_UR: {
    name: "er → UR",
    description: "All 'er' sounds are spelled UR",
    soundId: "ɜr",
    spelling: "UR",
    usageCount: 3,
    mutexGroup: "VOWEL_UR",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_AIS: {
    name: "eye → AIS",
    description: "All 'eye' sounds are spelled AIS",
    soundId: "aɪ",
    spelling: "AIS",
    usageCount: 1,
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_EI: {
    name: "eye → EI",
    description: "All 'eye' sounds are spelled EI",
    soundId: "aɪ",
    spelling: "EI",
    usageCount: 1,
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_EYE: {
    name: "eye → EYE",
    description: "All 'eye' sounds are spelled EYE",
    soundId: "aɪ",
    spelling: "EYE",
    usageCount: 2,
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_I: {
    name: "eye → I",
    description: "All 'eye' sounds are spelled I",
    soundId: "aɪ",
    spelling: "I",
    usageCount: 62,
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_ICT: {
    name: "eye → ICT",
    description: "All 'eye' sounds are spelled ICT",
    soundId: "aɪ",
    spelling: "ICT",
    usageCount: 1,
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_IGH: {
    name: "eye → IGH",
    description: "All 'eye' sounds are spelled IGH",
    soundId: "aɪ",
    spelling: "IGH",
    usageCount: 11,
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_OI: {
    name: "eye → OI",
    description: "All 'eye' sounds are spelled OI",
    soundId: "aɪ",
    spelling: "OI",
    usageCount: 1,
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_UY: {
    name: "eye → UY",
    description: "All 'eye' sounds are spelled UY",
    soundId: "aɪ",
    spelling: "UY",
    usageCount: 1,
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_Y: {
    name: "eye → Y",
    description: "All 'eye' sounds are spelled Y",
    soundId: "aɪ",
    spelling: "Y",
    usageCount: 14,
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  F_F: {
    name: "f → F",
    description: "All 'f' sounds are spelled F",
    soundId: "f",
    spelling: "F",
    usageCount: 138,
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  F_FF: {
    name: "f → FF",
    description: "All 'f' sounds are spelled FF",
    soundId: "f",
    spelling: "FF",
    usageCount: 14,
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  F_GH: {
    name: "f → GH",
    description: "All 'f' sounds are spelled GH",
    soundId: "f",
    spelling: "GH",
    usageCount: 4,
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/F/g, "GH")
  },
  F_PH: {
    name: "f → PH",
    description: "All 'f' sounds are spelled PH",
    soundId: "f",
    spelling: "PH",
    usageCount: 20,
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/F/g, "PH")
  },
  G_G: {
    name: "ɡ → G",
    description: "All 'ɡ' sounds are spelled G",
    soundId: "ɡ",
    spelling: "G",
    usageCount: 73,
    mutexGroup: "G_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  G_GH: {
    name: "ɡ → GH",
    description: "All 'ɡ' sounds are spelled GH",
    soundId: "ɡ",
    spelling: "GH",
    usageCount: 1,
    mutexGroup: "G_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  G_GUE: {
    name: "ɡ → GUE",
    description: "All 'ɡ' sounds are spelled GUE",
    soundId: "ɡ",
    spelling: "GUE",
    usageCount: 3,
    mutexGroup: "G_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/G/g, "GUE")
  },
  H_H: {
    name: "h → H",
    description: "All 'h' sounds are spelled H",
    soundId: "h",
    spelling: "H",
    usageCount: 49,
    mutexGroup: "H",
    maxDurability: 3,
    transform: (word) => word
  },
  H_J: {
    name: "h → J",
    description: "All 'h' sounds are spelled J",
    soundId: "h",
    spelling: "J",
    usageCount: 1,
    mutexGroup: "H",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("H")) return "J" + word.slice(1);
      return word;
    }
  },
  H_WH: {
    name: "h → WH",
    description: "All 'h' sounds are spelled WH",
    soundId: "h",
    spelling: "WH",
    usageCount: 3,
    mutexGroup: "H",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("H")) return "WH" + word.slice(1);
      return word;
    }
  },
  IH_A: {
    name: "ih → A",
    description: "All 'ih' sounds are spelled A",
    soundId: "ɪ",
    spelling: "A",
    usageCount: 7,
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_AI: {
    name: "ih → AI",
    description: "All 'ih' sounds are spelled AI",
    soundId: "ɪ",
    spelling: "AI",
    usageCount: 2,
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_E: {
    name: "ih → E",
    description: "All 'ih' sounds are spelled E",
    soundId: "ɪ",
    spelling: "E",
    usageCount: 89,
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_I: {
    name: "ih → I",
    description: "All 'ih' sounds are spelled I",
    soundId: "ɪ",
    spelling: "I",
    usageCount: 414,
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_IE: {
    name: "ih → IE",
    description: "All 'ih' sounds are spelled IE",
    soundId: "ɪ",
    spelling: "IE",
    usageCount: 1,
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_O: {
    name: "ih → O",
    description: "All 'ih' sounds are spelled O",
    soundId: "ɪ",
    spelling: "O",
    usageCount: 3,
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_U: {
    name: "ih → U",
    description: "All 'ih' sounds are spelled U",
    soundId: "ɪ",
    spelling: "U",
    usageCount: 6,
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_UI: {
    name: "ih → UI",
    description: "All 'ih' sounds are spelled UI",
    soundId: "ɪ",
    spelling: "UI",
    usageCount: 8,
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_Y: {
    name: "ih → Y",
    description: "All 'ih' sounds are spelled Y",
    soundId: "ɪ",
    spelling: "Y",
    usageCount: 19,
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IL_LE: {
    name: "il → LE",
    description: "All 'il' sounds are spelled LE",
    soundId: "ɪl",
    spelling: "LE",
    usageCount: 3,
    mutexGroup: "SOUND_EL",
    maxDurability: 3,
    transform: (word) => word
  },
  J_DGE: {
    name: "dʒ → DGE",
    description: "All 'dʒ' sounds are spelled DGE",
    soundId: "dʒ",
    spelling: "DGE",
    usageCount: 3,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/J/g, "DGE")
  },
  J_G: {
    name: "j → G",
    description: "All 'j' sounds are spelled G",
    soundId: "dʒ",
    spelling: "G",
    usageCount: 8,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  J_J: {
    name: "dʒ → J",
    description: "All 'dʒ' sounds are spelled J",
    soundId: "dʒ",
    spelling: "J",
    usageCount: 6,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  J_LL: {
    name: "y → LL",
    description: "All 'y' sounds are spelled LL",
    soundId: "j",
    spelling: "LL",
    usageCount: 1,
    mutexGroup: "Y_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/Y/g, "LL")
  },
  J_Y: {
    name: "j → Y",
    description: "All 'j' sounds are spelled Y",
    soundId: "j",
    spelling: "Y",
    usageCount: 1,
    mutexGroup: "Y_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_DGE: {
    name: "j → DGE",
    description: "All 'j' sounds are spelled DGE",
    soundId: "dʒ",
    spelling: "DGE",
    usageCount: 2,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_DU: {
    name: "j → DU",
    description: "All 'j' sounds are spelled DU",
    soundId: "dʒ",
    spelling: "DU",
    usageCount: 6,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_G: {
    name: "j → G",
    description: "All 'j' sounds are spelled G",
    soundId: "dʒ",
    spelling: "G",
    usageCount: 5,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_GE: {
    name: "j → GE",
    description: "All 'j' sounds are spelled GE",
    soundId: "dʒ",
    spelling: "GE",
    usageCount: 17,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_GI: {
    name: "j → GI",
    description: "All 'j' sounds are spelled GI",
    soundId: "dʒ",
    spelling: "GI",
    usageCount: 8,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_J: {
    name: "j → J",
    description: "All 'j' sounds are spelled J",
    soundId: "dʒ",
    spelling: "J",
    usageCount: 12,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  K_C: {
    name: "k → C",
    description: "All 'k' sounds are spelled C",
    soundId: "k",
    spelling: "C",
    usageCount: 225,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_CC: {
    name: "k → CC",
    description: "All 'k' sounds are spelled CC",
    soundId: "k",
    spelling: "CC",
    usageCount: 7,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_CCH: {
    name: "k → CCH",
    description: "All 'k' sounds are spelled CCH",
    soundId: "k",
    spelling: "CCH",
    usageCount: 1,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_CH: {
    name: "k → CH",
    description: "All 'k' sounds are spelled CH",
    soundId: "k",
    spelling: "CH",
    usageCount: 9,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => {
      return word.replace(/K/g, "CH");
    }
  },
  K_CK: {
    name: "k → CK",
    description: "All 'k' sounds are spelled CK",
    soundId: "k",
    spelling: "CK",
    usageCount: 26,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => {
      if (word.endsWith("K") && !word.endsWith("CK")) {
        return word.slice(0, -1) + "CK";
      }
      return word;
    }
  },
  K_CQ: {
    name: "k → CQ",
    description: "All 'k' sounds are spelled CQ",
    soundId: "k",
    spelling: "CQ",
    usageCount: 3,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_K: {
    name: "k → K",
    description: "All 'k' sounds are spelled K",
    soundId: "k",
    spelling: "K",
    usageCount: 67,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_KH: {
    name: "k → KH",
    description: "All 'k' sounds are spelled KH",
    soundId: "k",
    spelling: "KH",
    usageCount: 1,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_Q: {
    name: "k → Q",
    description: "All 'k' sounds are spelled Q",
    soundId: "k",
    spelling: "Q",
    usageCount: 9,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_QU: {
    name: "k → QU",
    description: "All 'k' sounds are spelled QU",
    soundId: "k",
    spelling: "QU",
    usageCount: 6,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word.replace(/K/g, "QU")
  },
  K_QUE: {
    name: "k → QUE",
    description: "All 'k' sounds are spelled QUE",
    soundId: "k",
    spelling: "QUE",
    usageCount: 6,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => {
      if (word.endsWith("K_CK")) return word.slice(0, -2) + "QUE";
      if (word.endsWith("K")) return word.slice(0, -1) + "QUE";
      return word;
    }
  },
  K_X: {
    name: "k → X",
    description: "All 'k' sounds are spelled X",
    soundId: "k",
    spelling: "X",
    usageCount: 1,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  KS_X: {
    name: "ks → X",
    description: "All 'ks' sounds are spelled X",
    soundId: "ks",
    spelling: "X",
    usageCount: 24,
    mutexGroup: "SOUND_K_S",
    maxDurability: 3,
    transform: (word) => word
  },
  KW_CH: {
    name: "kw → CH",
    description: "All 'kw' sounds are spelled CH",
    soundId: "kw",
    spelling: "CH",
    usageCount: 1,
    mutexGroup: "KW_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/QU/g, "K_CH")
  },
  KW_QU: {
    name: "kw → QU",
    description: "All 'kw' sounds are spelled QU",
    soundId: "kw",
    spelling: "QU",
    usageCount: 1,
    mutexGroup: "KW_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/QU/g, "QU")
  },
  L_E: {
    name: "l → E",
    description: "All 'l' sounds are spelled E",
    soundId: "l",
    spelling: "E",
    usageCount: 6,
    mutexGroup: "SOUND_L",
    maxDurability: 3,
    transform: (word) => word
  },
  L_L: {
    name: "l → L",
    description: "All 'l' sounds are spelled L",
    soundId: "l",
    spelling: "L",
    usageCount: 328,
    mutexGroup: "SOUND_L",
    maxDurability: 3,
    transform: (word) => word
  },
  L_LL: {
    name: "l → LL",
    description: "All 'l' sounds are spelled LL",
    soundId: "l",
    spelling: "LL",
    usageCount: 38,
    mutexGroup: "SOUND_L",
    maxDurability: 3,
    transform: (word) => word
  },
  M_GM: {
    name: "m → GM",
    description: "All 'm' sounds are spelled GM",
    soundId: "m",
    spelling: "GM",
    usageCount: 2,
    mutexGroup: "M",
    maxDurability: 3,
    transform: (word) => word.replace(/M/g, "GM")
  },
  M_M: {
    name: "m → M",
    description: "All 'm' sounds are spelled M",
    soundId: "m",
    spelling: "M",
    usageCount: 244,
    mutexGroup: "M",
    maxDurability: 3,
    transform: (word) => word
  },
  M_MM: {
    name: "m → MM",
    description: "All 'm' sounds are spelled MM",
    soundId: "m",
    spelling: "MM",
    usageCount: 9,
    mutexGroup: "SOUND_M",
    maxDurability: 3,
    transform: (word) => word
  },
  M_MN: {
    name: "m → MN",
    description: "All 'm' sounds are spelled MN",
    soundId: "m",
    spelling: "MN",
    usageCount: 4,
    mutexGroup: "M",
    maxDurability: 3,
    transform: (word) => {
      if (word.endsWith("M")) return word + "MN";
      return word;
    }
  },
  N_GN: {
    name: "n → GN",
    description: "All 'n' sounds are spelled GN",
    soundId: "n",
    spelling: "GN",
    usageCount: 8,
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("N")) return "GN" + word.slice(1);
      return word;
    }
  },
  N_GNE: {
    name: "n → GNE",
    description: "All 'n' sounds are spelled GNE",
    soundId: "n",
    spelling: "GNE",
    usageCount: 1,
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("N")) return "GNE" + word.slice(1);
      return word;
    }
  },
  N_KN: {
    name: "n → KN",
    description: "All 'n' sounds are spelled KN",
    soundId: "n",
    spelling: "KN",
    usageCount: 8,
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("N")) return "KN" + word.slice(1);
      return word;
    }
  },
  N_N: {
    name: "n → N",
    description: "All 'n' sounds are spelled N",
    soundId: "n",
    spelling: "N",
    usageCount: 563,
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
  },
  N_NE: {
    name: "n → NE",
    description: "All 'n' sounds are spelled NE",
    soundId: "n",
    spelling: "NE",
    usageCount: 36,
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
  },
  N_NN: {
    name: "n → NN",
    description: "All 'n' sounds are spelled NN",
    soundId: "n",
    spelling: "NN",
    usageCount: 12,
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
  },
  N_PN: {
    name: "n → PN",
    description: "All 'n' sounds are spelled PN",
    soundId: "n",
    spelling: "PN",
    usageCount: 1,
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("N")) return "PN" + word.slice(1);
      return word;
    }
  },
  NG_N: {
    name: "ng → N",
    description: "All 'ng' sounds are spelled N",
    soundId: "ŋ",
    spelling: "N",
    usageCount: 10,
    mutexGroup: "SOUND_U014B",
    maxDurability: 3,
    transform: (word) => word
  },
  NG_NG: {
    name: "ng → NG",
    description: "All 'ng' sounds are spelled NG",
    soundId: "ŋ",
    spelling: "NG",
    usageCount: 116,
    mutexGroup: "SOUND_U014B",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_AUX: {
    name: "oh → AUX",
    description: "All 'oh' sounds are spelled AUX",
    soundId: "oʊ",
    spelling: "AUX",
    usageCount: 1,
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_EAU: {
    name: "oh → EAU",
    description: "All 'oh' sounds are spelled EAU",
    soundId: "oʊ",
    spelling: "EAU",
    usageCount: 1,
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_EW: {
    name: "oh → EW",
    description: "All 'oh' sounds are spelled EW",
    soundId: "oʊ",
    spelling: "EW",
    usageCount: 4,
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_O: {
    name: "oh → O",
    description: "All 'oh' sounds are spelled O",
    soundId: "oʊ",
    spelling: "O",
    usageCount: 81,
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OA: {
    name: "oh → OA",
    description: "All 'oh' sounds are spelled OA",
    soundId: "oʊ",
    spelling: "OA",
    usageCount: 14,
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OAH: {
    name: "oh → OAH",
    description: "All 'oh' sounds are spelled OAH",
    soundId: "oʊ",
    spelling: "OAH",
    usageCount: 1,
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OE: {
    name: "oh → OE",
    description: "All 'oh' sounds are spelled OE",
    soundId: "oʊ",
    spelling: "OE",
    usageCount: 1,
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OO: {
    name: "oh → OO",
    description: "All 'oh' sounds are spelled OO",
    soundId: "oʊ",
    spelling: "OO",
    usageCount: 3,
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OUGH: {
    name: "oh → OUGH",
    description: "All 'oh' sounds are spelled OUGH",
    soundId: "oʊ",
    spelling: "OUGH",
    usageCount: 3,
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OW: {
    name: "oh → OW",
    description: "All 'oh' sounds are spelled OW",
    soundId: "oʊ",
    spelling: "OW",
    usageCount: 3,
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_EU: {
    name: "oo → EU",
    description: "All 'oo' sounds are spelled EU",
    soundId: "u",
    spelling: "EU",
    usageCount: 2,
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_EW: {
    name: "oo → EW",
    description: "All 'oo' sounds are spelled EW",
    soundId: "u",
    spelling: "EW",
    usageCount: 6,
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_IEU: {
    name: "oo → IEU",
    description: "All 'oo' sounds are spelled IEU",
    soundId: "u",
    spelling: "IEU",
    usageCount: 1,
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_O: {
    name: "oo → O",
    description: "All 'oo' sounds are spelled O",
    soundId: "u",
    spelling: "O",
    usageCount: 11,
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_OE: {
    name: "oo → OE",
    description: "All 'oo' sounds are spelled OE",
    soundId: "u",
    spelling: "OE",
    usageCount: 2,
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_OO: {
    name: "ooh → OO",
    description: "All 'ooh' sounds are spelled OO",
    soundId: "u",
    spelling: "OO",
    usageCount: 7,
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_OU: {
    name: "oo → OU",
    description: "All 'oo' sounds are spelled OU",
    soundId: "u",
    spelling: "OU",
    usageCount: 6,
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_OUGH: {
    name: "oo → OUGH",
    description: "All 'oo' sounds are spelled OUGH",
    soundId: "u",
    spelling: "OUGH",
    usageCount: 1,
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_OUP: {
    name: "oo → OUP",
    description: "All 'oo' sounds are spelled OUP",
    soundId: "u",
    spelling: "OUP",
    usageCount: 1,
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_U: {
    name: "oo → U",
    description: "All 'oo' sounds are spelled U",
    soundId: "u",
    spelling: "U",
    usageCount: 16,
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_UI: {
    name: "oo → UI",
    description: "All 'oo' sounds are spelled UI",
    soundId: "u",
    spelling: "UI",
    usageCount: 3,
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_UO: {
    name: "oo → UO",
    description: "All 'oo' sounds are spelled UO",
    soundId: "u",
    spelling: "UO",
    usageCount: 1,
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OR_OR: {
    name: "or → OR",
    description: "All 'or' sounds are spelled OR",
    soundId: "ɔr",
    spelling: "OR",
    usageCount: 35,
    mutexGroup: "VOWEL_OR",
    maxDurability: 3,
    transform: (word) => word
  },
  OR_ORE: {
    name: "or → ORE",
    description: "All 'or' sounds are spelled ORE",
    soundId: "ɔr",
    spelling: "ORE",
    usageCount: 2,
    mutexGroup: "VOWEL_OR",
    maxDurability: 3,
    transform: (word) => word
  },
  OR_ORPS: {
    name: "or → ORPS",
    description: "All 'or' sounds are spelled ORPS",
    soundId: "ɔr",
    spelling: "ORPS",
    usageCount: 1,
    mutexGroup: "VOWEL_OR",
    maxDurability: 3,
    transform: (word) => word
  },
  OW_OU: {
    name: "ow → OU",
    description: "All 'ow' sounds are spelled OU",
    soundId: "aʊ",
    spelling: "OU",
    usageCount: 27,
    mutexGroup: "VOWEL_OW",
    maxDurability: 3,
    transform: (word) => word
  },
  OW_OW: {
    name: "ow → OW",
    description: "All 'ow' sounds are spelled OW",
    soundId: "aʊ",
    spelling: "OW",
    usageCount: 4,
    mutexGroup: "VOWEL_OW",
    maxDurability: 3,
    transform: (word) => word
  },
  OY_OI: {
    name: "oi → OI",
    description: "All 'oi' sounds are spelled OI",
    soundId: "ɔɪ",
    spelling: "OI",
    usageCount: 13,
    mutexGroup: "VOWEL_OY",
    maxDurability: 3,
    transform: (word) => word
  },
  OY_OY: {
    name: "oy → OY",
    description: "All 'oy' sounds are spelled OY",
    soundId: "ɔɪ",
    spelling: "OY",
    usageCount: 5,
    mutexGroup: "VOWEL_OY",
    maxDurability: 3,
    transform: (word) => word
  },
  P_P: {
    name: "p → P",
    description: "All 'p' sounds are spelled P",
    soundId: "p",
    spelling: "P",
    usageCount: 257,
    mutexGroup: "P_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  P_PP: {
    name: "p → PP",
    description: "All 'p' sounds are spelled PP",
    soundId: "p",
    spelling: "PP",
    usageCount: 20,
    mutexGroup: "P_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  R_A: {
    name: "r → A",
    description: "All 'r' sounds are spelled A",
    soundId: "r",
    spelling: "A",
    usageCount: 3,
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => word
  },
  R_L: {
    name: "r → L",
    description: "All 'r' sounds are spelled L",
    soundId: "r",
    spelling: "L",
    usageCount: 1,
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => word.replace(/R/g, "L")
  },
  R_R: {
    name: "r → R",
    description: "All 'r' sounds are spelled R",
    soundId: "r",
    spelling: "R",
    usageCount: 408,
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => word
  },
  R_RE: {
    name: "r → RE",
    description: "All 'r' sounds are spelled RE",
    soundId: "r",
    spelling: "RE",
    usageCount: 30,
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => word
  },
  R_RH: {
    name: "r → RH",
    description: "All 'r' sounds are spelled RH",
    soundId: "r",
    spelling: "RH",
    usageCount: 4,
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("R")) return "RH" + word.slice(1);
      return word;
    }
  },
  R_RR: {
    name: "r → RR",
    description: "All 'r' sounds are spelled RR",
    soundId: "r",
    spelling: "RR",
    usageCount: 10,
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => word
  },
  R_WR: {
    name: "r → WR",
    description: "All 'r' sounds are spelled WR",
    soundId: "r",
    spelling: "WR",
    usageCount: 11,
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("R")) return "WR" + word.slice(1);
      return word;
    }
  },
  S_C: {
    name: "s → C",
    description: "All 's' sounds are spelled C",
    soundId: "s",
    spelling: "C",
    usageCount: 28,
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_CE: {
    name: "s → CE",
    description: "All 's' sounds are spelled CE",
    soundId: "s",
    spelling: "CE",
    usageCount: 45,
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_CES: {
    name: "s → CES",
    description: "All 's' sounds are spelled CES",
    soundId: "s",
    spelling: "CES",
    usageCount: 4,
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_PS: {
    name: "s → PS",
    description: "All 's' sounds are spelled PS",
    soundId: "s",
    spelling: "PS",
    usageCount: 2,
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => {
      if (isSSound(word)) return "PS" + word.slice(1);
      return word;
    }
  },
  S_S: {
    name: "s → S",
    description: "All 's' sounds are spelled S",
    soundId: "s",
    spelling: "S",
    usageCount: 341,
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_SC: {
    name: "s → SC",
    description: "All 's' sounds are spelled SC",
    soundId: "s",
    spelling: "SC",
    usageCount: 9,
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => {
      if (isSSound(word)) return "SC" + word.slice(1);
      return word;
    }
  },
  S_SCE: {
    name: "s → SCE",
    description: "All 's' sounds are spelled SCE",
    soundId: "s",
    spelling: "SCE",
    usageCount: 2,
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_SS: {
    name: "s → SS",
    description: "All 's' sounds are spelled SS",
    soundId: "s",
    spelling: "SS",
    usageCount: 29,
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_TS: {
    name: "s → TS",
    description: "All 's' sounds are spelled TS",
    soundId: "s",
    spelling: "TS",
    usageCount: 1,
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => {
      if (isSSound(word)) return "TS" + word.slice(1);
      return word;
    }
  },
  SH_CH: {
    name: "sh → CH",
    description: "All 'sh' sounds are spelled CH",
    soundId: "ʃ",
    spelling: "CH",
    usageCount: 5,
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_CI: {
    name: "sh → CI",
    description: "All 'sh' sounds are spelled CI",
    soundId: "ʃ",
    spelling: "CI",
    usageCount: 12,
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/SH/g, "CI")
  },
  SH_S: {
    name: "sh → S",
    description: "All 'sh' sounds are spelled S",
    soundId: "ʃ",
    spelling: "S",
    usageCount: 1,
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/SH/g, "S")
  },
  SH_SCH: {
    name: "sh → SCH",
    description: "All 'sh' sounds are spelled SCH",
    soundId: "ʃ",
    spelling: "SCH",
    usageCount: 4,
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_SCI: {
    name: "sh → SCI",
    description: "All 'sh' sounds are spelled SCI",
    soundId: "ʃ",
    spelling: "SCI",
    usageCount: 1,
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_SH: {
    name: "sh → SH",
    description: "All 'sh' sounds are spelled SH",
    soundId: "ʃ",
    spelling: "SH",
    usageCount: 37,
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_SS: {
    name: "sh → SS",
    description: "All 'sh' sounds are spelled SS",
    soundId: "ʃ",
    spelling: "SS",
    usageCount: 8,
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_SU: {
    name: "sh → SU",
    description: "All 'sh' sounds are spelled SU",
    soundId: "ʃ",
    spelling: "SU",
    usageCount: 6,
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_TI: {
    name: "sh → TI",
    description: "All 'sh' sounds are spelled TI",
    soundId: "ʃ",
    spelling: "TI",
    usageCount: 95,
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/SH/g, "TI")
  },
  SILENT_E: {
    name: "silent → E",
    description: "All silent sounds are spelled E",
    soundId: null,
    spelling: "E",
    usageCount: 2,
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_M: {
    name: "silent → M",
    description: "All silent sounds are spelled M",
    soundId: null,
    spelling: "M",
    usageCount: 1,
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  T_BT: {
    name: "t → BT",
    description: "All 't' sounds are spelled BT",
    soundId: "t",
    spelling: "BT",
    usageCount: 4,
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => {
      if (word.endsWith("T")) return word.slice(0, -1) + "BT";
      return word;
    }
  },
  T_GHT: {
    name: "t → GHT",
    description: "All 't' sounds are spelled GHT",
    soundId: "t",
    spelling: "GHT",
    usageCount: 4,
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => word
  },
  T_PT: {
    name: "t → PT",
    description: "All 't' sounds are spelled PT",
    soundId: "t",
    spelling: "PT",
    usageCount: 1,
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("T")) return "PT" + word.slice(1);
      return word;
    }
  },
  T_T: {
    name: "t → T",
    description: "All 't' sounds are spelled T",
    soundId: "t",
    spelling: "T",
    usageCount: 498,
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => word
  },
  T_TT: {
    name: "t → TT",
    description: "All 't' sounds are spelled TT",
    soundId: "t",
    spelling: "TT",
    usageCount: 16,
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => word
  },
  TH_TH: {
    name: "th → TH",
    description: "All 'th' sounds are spelled TH",
    soundId: "ð",
    spelling: "TH",
    usageCount: 51,
    mutexGroup: "SOUND_U00F0",
    maxDurability: 3,
    transform: (word) => word
  },
  TH_TH_2: {
    name: "th → TH",
    description: "All 'th' sounds are spelled TH",
    soundId: "θ",
    spelling: "TH",
    usageCount: 1,
    mutexGroup: "SOUND_U03B8",
    maxDurability: 3,
    transform: (word) => word
  },
  TS_ZZ: {
    name: "ts → ZZ",
    description: "All 'ts' sounds are spelled ZZ",
    soundId: "ts",
    spelling: "ZZ",
    usageCount: 1,
    mutexGroup: "TS_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/TS/g, "ZZ")
  },
  UH_A: {
    name: "uh → A",
    description: "All 'uh' sounds are spelled A",
    soundId: "ə",
    spelling: "A",
    usageCount: 178,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_AI: {
    name: "uh → AI",
    description: "All 'uh' sounds are spelled AI",
    soundId: "ə",
    spelling: "AI",
    usageCount: 1,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_AU: {
    name: "uh → AU",
    description: "All 'uh' sounds are spelled AU",
    soundId: "ə",
    spelling: "AU",
    usageCount: 1,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_E: {
    name: "uh → E",
    description: "All 'uh' sounds are spelled E",
    soundId: "ə",
    spelling: "E",
    usageCount: 165,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_I: {
    name: "uh → I",
    description: "All 'uh' sounds are spelled I",
    soundId: "ə",
    spelling: "I",
    usageCount: 13,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_IA: {
    name: "uh → IA",
    description: "All 'uh' sounds are spelled IA",
    soundId: "ə",
    spelling: "IA",
    usageCount: 3,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_L: {
    name: "uh → L",
    description: "All 'uh' sounds are spelled L",
    soundId: "ə",
    spelling: "L",
    usageCount: 7,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_O: {
    name: "uh → O",
    description: "All 'uh' sounds are spelled O",
    soundId: "ə",
    spelling: "O",
    usageCount: 194,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UUH_O: {
    name: "uuh → O",
    description: "All 'uuh' sounds are spelled O",
    soundId: "ʊ",
    spelling: "O",
    usageCount: 1,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_O_W: {
    name: "wuh → O",
    description: "All 'wuh' sounds are spelled O",
    soundId: "wʌ",
    spelling: "O",
    usageCount: 1,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_OO: {
    name: "uuh → OO",
    description: "All 'uuh' sounds are spelled OO",
    soundId: "ʊ",
    spelling: "OO",
    usageCount: 11,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_OU: {
    name: "uh → OU",
    description: "All 'uh' sounds are spelled OU",
    soundId: "ʌ",
    spelling: "OU",
    usageCount: 14,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_U: {
    name: "uh → U",
    description: "All 'uh' sounds are spelled U",
    soundId: "ʌ",
    spelling: "U",
    usageCount: 127,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UR_UR: {
    name: "er → UR",
    description: "All 'er' sounds are spelled UR",
    soundId: "ɜr",
    spelling: "UR",
    usageCount: 3,
    mutexGroup: "VOWEL_UR",
    maxDurability: 3,
    transform: (word) => word
  },
  UUH_U: {
    name: "uuh → U",
    description: "All 'uuh' sounds are spelled U",
    soundId: "ʊ",
    spelling: "U",
    usageCount: 4,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_F: {
    name: "v → F",
    description: "All 'v' sounds are spelled F",
    soundId: "v",
    spelling: "F",
    usageCount: 2,
    mutexGroup: "V_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/V/g, "F")
  },
  V_V: {
    name: "v → V",
    description: "All 'v' sounds are spelled V",
    soundId: "v",
    spelling: "V",
    usageCount: 71,
    mutexGroup: "V_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  V_VE: {
    name: "v → VE",
    description: "All 'v' sounds are spelled VE",
    soundId: "v",
    spelling: "VE",
    usageCount: 36,
    mutexGroup: "V_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  W_O: {
    name: "w → O",
    description: "All 'w' sounds are spelled O",
    soundId: "w",
    spelling: "O",
    usageCount: 3,
    mutexGroup: "W_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/W/g, "O")
  },
  W_OU: {
    name: "w → OU",
    description: "All 'w' sounds are spelled OU",
    soundId: "w",
    spelling: "OU",
    usageCount: 1,
    mutexGroup: "W_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  W_U: {
    name: "w → U",
    description: "All 'w' sounds are spelled U",
    soundId: "w",
    spelling: "U",
    usageCount: 6,
    mutexGroup: "W_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  W_W: {
    name: "w → W",
    description: "All 'w' sounds are spelled W",
    soundId: "w",
    spelling: "W",
    usageCount: 47,
    mutexGroup: "W_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  W_WH: {
    name: "w → WH",
    description: "All 'w' sounds are spelled WH",
    soundId: "w",
    spelling: "WH",
    usageCount: 8,
    mutexGroup: "W_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  WUH_O: {
    name: "wuh → O",
    description: "All 'wuh' sounds are spelled O",
    soundId: "wʌ",
    spelling: "O",
    usageCount: 2,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  Y_J: {
    name: "y → J",
    description: "All 'y' sounds are spelled J",
    soundId: "j",
    spelling: "J",
    usageCount: 1,
    mutexGroup: "Y_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  Y_Y: {
    name: "y → Y",
    description: "All 'y' sounds are spelled Y",
    soundId: "j",
    spelling: "Y",
    usageCount: 7,
    mutexGroup: "Y_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  YOU_EAU: {
    name: "yu → EAU",
    description: "All 'yu' sounds are spelled EAU",
    soundId: "ju",
    spelling: "EAU",
    usageCount: 1,
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
  YOU_U: {
    name: "yu → U",
    description: "All 'yu' sounds are spelled U",
    soundId: "ju",
    spelling: "U",
    usageCount: 30,
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
  YOU_UE: {
    name: "yu → UE",
    description: "All 'yu' sounds are spelled UE",
    soundId: "ju",
    spelling: "UE",
    usageCount: 2,
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
  YOU_UEUE: {
    name: "yu → UEUE",
    description: "All 'yu' sounds are spelled UEUE",
    soundId: "ju",
    spelling: "UEUE",
    usageCount: 1,
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
  YOU_UU: {
    name: "yu → UU",
    description: "All 'yu' sounds are spelled UU",
    soundId: "ju",
    spelling: "UU",
    usageCount: 1,
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_CZ: {
    name: "z → CZ",
    description: "All 'z' sounds are spelled CZ",
    soundId: "z",
    spelling: "CZ",
    usageCount: 1,
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("Z")) return "CZ" + word.slice(1);
      return word;
    }
  },
  Z_S: {
    name: "z → S",
    description: "All 'z' sounds are spelled S",
    soundId: "z",
    spelling: "S",
    usageCount: 88,
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_SI: {
    name: "z → SI",
    description: "All 'z' sounds are spelled SI",
    soundId: "z",
    spelling: "SI",
    usageCount: 21,
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_SS: {
    name: "z → SS",
    description: "All 'z' sounds are spelled SS",
    soundId: "z",
    spelling: "SS",
    usageCount: 1,
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_TS: {
    name: "z → TS",
    description: "All 'z' sounds are spelled TS",
    soundId: "z",
    spelling: "TS",
    usageCount: 1,
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_X: {
    name: "z → X",
    description: "All 'z' sounds are spelled X",
    soundId: "z",
    spelling: "X",
    usageCount: 2,
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("Z")) return "X" + word.slice(1);
      return word;
    }
  },
  Z_Z: {
    name: "z → Z",
    description: "All 'z' sounds are spelled Z",
    soundId: "z",
    spelling: "Z",
    usageCount: 14,
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_ZE: {
    name: "z → ZE",
    description: "All 'z' sounds are spelled ZE",
    soundId: "z",
    spelling: "ZE",
    usageCount: 9,
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_ZZ: {
    name: "z → ZZ",
    description: "All 'z' sounds are spelled ZZ",
    soundId: "z",
    spelling: "ZZ",
    usageCount: 3,
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  ZH_S: {
    name: "zh → S",
    description: "All 'zh' sounds are spelled S",
    soundId: "ʒ",
    spelling: "S",
    usageCount: 5,
    mutexGroup: "SOUND_U0292",
    maxDurability: 3,
    transform: (word) => word
  },

  // Added missing rules (auto-generated)
  AAH_A: {
    name: "aah → A",
    description: "All 'aah' sounds are spelled A",
    soundId: "æ",
    spelling: "A",
    usageCount: 206,
    mutexGroup: "AAH",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_UB: {
    name: "ɑh → UB",
    description: "All 'ɑh' sounds are spelled UB",
    soundId: "ɑ",
    spelling: "UB",
    usageCount: 1,
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_EIGH: {
    name: "ay → EIGH",
    description: "All 'ay' sounds are spelled EIGH",
    soundId: "eɪ",
    spelling: "EIGH",
    usageCount: 1,
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_IGH: {
    name: "ay → IGH",
    description: "All 'ay' sounds are spelled IGH",
    soundId: "eɪ",
    spelling: "IGH",
    usageCount: 1,
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AZ_ASTH: {
    name: "az → ASTH",
    description: "All 'az' sounds are spelled ASTH",
    soundId: "æz",
    spelling: "ASTH",
    usageCount: 1,
    mutexGroup: "SOUND_AZ",
    maxDurability: 3,
    transform: (word) => word
  },
  B_BE: {
    name: "b → BE",
    description: "All 'b' sounds are spelled BE",
    soundId: "b",
    spelling: "BE",
    usageCount: 1,
    mutexGroup: "SOUND_B",
    maxDurability: 3,
    transform: (word) => word
  },
  EE: {
    name: "ee → EE",
    description: "All 'ee' sounds are spelled EE",
    soundId: "i",
    spelling: "EE",
    usageCount: 1,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EIP: {
    name: "ee → EIP",
    description: "All 'ee' sounds are spelled EIP",
    soundId: "i",
    spelling: "EIP",
    usageCount: 1,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  F_FE: {
    name: "f → FE",
    description: "All 'f' sounds are spelled FE",
    soundId: "f",
    spelling: "FE",
    usageCount: 2,
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  K_KE: {
    name: "k → KE",
    description: "All 'k' sounds are spelled KE",
    soundId: "k",
    spelling: "KE",
    usageCount: 9,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  L_LE: {
    name: "l → LE",
    description: "All 'l' sounds are spelled LE",
    soundId: "l",
    spelling: "LE",
    usageCount: 14,
    mutexGroup: "SOUND_L",
    maxDurability: 3,
    transform: (word) => word
  },
  M_ME: {
    name: "m → ME",
    description: "All 'm' sounds are spelled ME",
    soundId: "m",
    spelling: "ME",
    usageCount: 13,
    mutexGroup: "M",
    maxDurability: 3,
    transform: (word) => word
  },
  N_DNE: {
    name: "n → DNE",
    description: "All 'n' sounds are spelled DNE",
    soundId: "n",
    spelling: "DNE",
    usageCount: 1,
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OU: {
    name: "oh → OU",
    description: "All 'oh' sounds are spelled OU",
    soundId: "oʊ",
    spelling: "OU",
    usageCount: 3,
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_OUS: {
    name: "oo → OUS",
    description: "All 'oo' sounds are spelled OUS",
    soundId: "u",
    spelling: "OUS",
    usageCount: 1,
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_UE: {
    name: "oo → UE",
    description: "All 'oo' sounds are spelled UE",
    soundId: "u",
    spelling: "UE",
    usageCount: 2,
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  P_PE: {
    name: "p → PE",
    description: "All 'p' sounds are spelled PE",
    soundId: "p",
    spelling: "PE",
    usageCount: 1,
    mutexGroup: "P_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  P_PPE: {
    name: "p → PPE",
    description: "All 'p' sounds are spelled PPE",
    soundId: "p",
    spelling: "PPE",
    usageCount: 1,
    mutexGroup: "P_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  S: {
    name: "s → S",
    description: "All 's' sounds are spelled S",
    soundId: "s",
    spelling: "S",
    usageCount: 1,
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_SE: {
    name: "s → SE",
    description: "All 's' sounds are spelled SE",
    soundId: "s",
    spelling: "SE",
    usageCount: 10,
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_SI: {
    name: "sh → SI",
    description: "All 'sh' sounds are spelled SI",
    soundId: "ʃ",
    spelling: "SI",
    usageCount: 1,
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  T_TE: {
    name: "t → TE",
    description: "All 't' sounds are spelled TE",
    soundId: "t",
    spelling: "TE",
    usageCount: 16,
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_AH: {
    name: "uh → AH",
    description: "All 'uh' sounds are spelled AH",
    soundId: "ə",
    spelling: "AH",
    usageCount: 2,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_IO: {
    name: "uh → IO",
    description: "All 'uh' sounds are spelled IO",
    soundId: "ə",
    spelling: "IO",
    usageCount: 10,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_OE: {
    name: "uh → OE",
    description: "All 'uh' sounds are spelled OE",
    soundId: "ə",
    spelling: "OE",
    usageCount: 1,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UUH_OO: {
    name: "uuh → OO",
    description: "All 'uuh' sounds are spelled OO",
    soundId: "ʊ",
    spelling: "OO",
    usageCount: 1,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_SE: {
    name: "z → SE",
    description: "All 'z' sounds are spelled SE",
    soundId: "z",
    spelling: "SE",
    usageCount: 11,
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
};

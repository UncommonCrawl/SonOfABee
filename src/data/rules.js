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
export const RULE_SOUND_PREFIXES = [
  "AAH", "AE", "AH", "AIR", "AK", "AL", "AR", "AW", "AY", "AZ",
  "B", "CH", "D", "EE", "EH", "EL", "ER", "EYE", "F", "G",
  "H", "IH", "IL", "J", "JH", "K", "KS", "KW", "L", "M",
  "N", "NG", "OH", "OO", "OR", "OW", "OY", "P", "R", "S",
  "SH", "SILENT", "T", "TH", "TS", "UH", "UR", "UUH", "V", "W",
  "WUH", "Y", "YOU", "Z", "ZH"
];

export const RULES = {
  AAH_A: {
    name: "aah → A",
    description: "All 'aah' sounds are spelled A",
    soundId: "æ",
    spelling: "A",
    usageCount: 210,
    mutexGroup: "AAH",
    maxDurability: 3,
    transform: (word) => word
  },
  AAH_AI: {
    name: "aah → AI",
    description: "All 'aah' sounds are spelled AI",
    soundId: "æ",
    spelling: "AI",
    usageCount: 4,
    mutexGroup: "AAH",
    maxDurability: 3,
    transform: (word) => word
  },
  AAH_AL: {
    name: "aah → AL",
    description: "All 'aah' sounds are spelled AL",
    soundId: "æ",
    spelling: "AL",
    usageCount: 2,
    mutexGroup: "AAH",
    maxDurability: 3,
    transform: (word) => word
  },
  AAH_AU: {
    name: "aah → AU",
    description: "All 'aah' sounds are spelled AU",
    soundId: "æ",
    spelling: "AU",
    usageCount: 1,
    mutexGroup: "AAH",
    maxDurability: 3,
    transform: (word) => word
  },
  AAH_E: {
    name: "aah → E",
    description: "All 'aah' sounds are spelled E",
    soundId: "æ",
    spelling: "E",
    usageCount: 3,
    mutexGroup: "AAH",
    maxDurability: 3,
    transform: (word) => word
  },
  AAH_I: {
    name: "aah → I",
    description: "All 'aah' sounds are spelled I",
    soundId: "æ",
    spelling: "I",
    usageCount: 1,
    mutexGroup: "AAH",
    maxDurability: 3,
    transform: (word) => word
  },
  AAH_O: {
    name: "aah → O",
    description: "All 'aah' sounds are spelled O",
    soundId: "æ",
    spelling: "O",
    usageCount: 2,
    mutexGroup: "AAH",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_A: {
    name: "ɑh → A",
    description: "All 'ɑh' sounds are spelled A",
    soundId: "ɑ",
    spelling: "A",
    usageCount: 24,
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_ACH: {
    name: "ɑh → ACH",
    description: "All 'ɑh' sounds are spelled ACH",
    soundId: "ɑ",
    spelling: "ACH",
    usageCount: 1,
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_AU: {
    name: "ɑh → AU",
    description: "All 'ɑh' sounds are spelled AU",
    soundId: "ɑ",
    spelling: "AU",
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
    usageCount: 4,
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_O: {
    name: "ɑh → O",
    description: "All 'ɑh' sounds are spelled O",
    soundId: "ɑ",
    spelling: "O",
    usageCount: 111,
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_OW: {
    name: "ah → OW",
    description: "All 'ah' sounds are spelled OW",
    soundId: "oʊ",
    spelling: "OW",
    usageCount: 4,
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  AL_AL: {
    name: "al → AL",
    description: "All 'al' sounds are spelled AL",
    soundId: null,
    spelling: "AL",
    usageCount: 2,
    mutexGroup: "AL",
    maxDurability: 3,
    transform: (word) => word
  },
  AR_EAR: {
    name: "ɑr → EAR",
    description: "All 'ɑr' sounds are spelled EAR",
    soundId: "ɑr",
    spelling: "EAR",
    usageCount: 5,
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
    usageCount: 7,
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
  AW_EA: {
    name: "aw → EA",
    description: "All 'aw' sounds are spelled EA",
    soundId: "ɔ",
    spelling: "EA",
    usageCount: 1,
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_O: {
    name: "aw → O",
    description: "All 'aw' sounds are spelled O",
    soundId: "ɔ",
    spelling: "O",
    usageCount: 47,
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_OU: {
    name: "aw → OU",
    description: "All 'aw' sounds are spelled OU",
    soundId: "ɔ",
    spelling: "OU",
    usageCount: 3,
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_OW: {
    name: "aw → OW",
    description: "All 'aw' sounds are spelled OW",
    soundId: "ɔ",
    spelling: "OW",
    usageCount: 1,
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_A: {
    name: "ay → A",
    description: "All 'ay' sounds are spelled A",
    soundId: "eɪ",
    spelling: "A",
    usageCount: 122,
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_AI: {
    name: "ay → AI",
    description: "All 'ay' sounds are spelled AI",
    soundId: "eɪ",
    spelling: "AI",
    usageCount: 30,
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
    usageCount: 4,
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
    usageCount: 2,
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_EIGH: {
    name: "ay → EIGH",
    description: "All 'ay' sounds are spelled EIGH",
    soundId: "eɪ",
    spelling: "EIGH",
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
    usageCount: 6,
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_EY: {
    name: "ay → EY",
    description: "All 'ay' sounds are spelled EY",
    soundId: "eɪ",
    spelling: "EY",
    usageCount: 4,
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_I: {
    name: "ay → I",
    description: "All 'ay' sounds are spelled I",
    soundId: "eɪ",
    spelling: "I",
    usageCount: 20,
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
  AY_Y: {
    name: "ay → Y",
    description: "All 'ay' sounds are spelled Y",
    soundId: "eɪ",
    spelling: "Y",
    usageCount: 2,
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  B_B: {
    name: "b → B",
    description: "All 'b' sounds are spelled B",
    soundId: "b",
    spelling: "B",
    usageCount: 167,
    mutexGroup: "SOUND_B",
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
  B_I: {
    name: "b → I",
    description: "All 'b' sounds are spelled I",
    soundId: "b",
    spelling: "I",
    usageCount: 1,
    mutexGroup: "SOUND_B",
    maxDurability: 3,
    transform: (word) => word
  },
  CH_C: {
    name: "ch → C",
    description: "All 'ch' sounds are spelled C",
    soundId: "tʃ",
    spelling: "C",
    usageCount: 6,
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
    usageCount: 29,
    mutexGroup: "CH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  CH_T: {
    name: "ch → T",
    description: "All 'ch' sounds are spelled T",
    soundId: "tʃ",
    spelling: "T",
    usageCount: 7,
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
  CH_TI: {
    name: "ch → TI",
    description: "All 'ch' sounds are spelled TI",
    soundId: "tʃ",
    spelling: "TI",
    usageCount: 4,
    mutexGroup: "CH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  CH_TU: {
    name: "ch → TU",
    description: "All 'ch' sounds are spelled TU",
    soundId: "tʃ",
    spelling: "TU",
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
    usageCount: 262,
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
    usageCount: 12,
    mutexGroup: "SOUND_D",
    maxDurability: 3,
    transform: (word) => word
  },
  D_ED: {
    name: "d → ED",
    description: "All 'd' sounds are spelled ED",
    soundId: "d",
    spelling: "ED",
    usageCount: 31,
    mutexGroup: "SOUND_D",
    maxDurability: 3,
    transform: (word) => word
  },
  E_E: {
    name: "e → E",
    description: "All 'e' sounds are spelled E",
    soundId: null,
    spelling: "E",
    usageCount: 1,
    mutexGroup: "E",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_A: {
    name: "ee → A",
    description: "All 'ee' sounds are spelled A",
    soundId: "i",
    spelling: "A",
    usageCount: 1,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_B: {
    name: "ee → B",
    description: "All 'ee' sounds are spelled B",
    soundId: "i",
    spelling: "B",
    usageCount: 1,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_E: {
    name: "ee → E",
    description: "All 'ee' sounds are spelled E",
    soundId: "i",
    spelling: "E",
    usageCount: 42,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EA: {
    name: "ee → EA",
    description: "All 'ee' sounds are spelled EA",
    soundId: "i",
    spelling: "EA",
    usageCount: 26,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EE: {
    name: "ee → EE",
    description: "All 'ee' sounds are spelled EE",
    soundId: "i",
    spelling: "EE",
    usageCount: 29,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EI: {
    name: "ee → EI",
    description: "All 'ee' sounds are spelled EI",
    soundId: "i",
    spelling: "EI",
    usageCount: 3,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EO: {
    name: "ee → EO",
    description: "All 'ee' sounds are spelled EO",
    soundId: "i",
    spelling: "EO",
    usageCount: 1,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EY: {
    name: "ee → EY",
    description: "All 'ee' sounds are spelled EY",
    soundId: "i",
    spelling: "EY",
    usageCount: 6,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_H: {
    name: "ee → H",
    description: "All 'ee' sounds are spelled H",
    soundId: "i",
    spelling: "H",
    usageCount: 1,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_I: {
    name: "ee → I",
    description: "All 'ee' sounds are spelled I",
    soundId: "i",
    spelling: "I",
    usageCount: 44,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_IE: {
    name: "ee → IE",
    description: "All 'ee' sounds are spelled IE",
    soundId: "i",
    spelling: "IE",
    usageCount: 17,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_IS: {
    name: "ee → IS",
    description: "All 'ee' sounds are spelled IS",
    soundId: "i",
    spelling: "IS",
    usageCount: 2,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_Y: {
    name: "ee → Y",
    description: "All 'ee' sounds are spelled Y",
    soundId: "i",
    spelling: "Y",
    usageCount: 123,
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_A: {
    name: "ehh → A",
    description: "All 'ehh' sounds are spelled A",
    soundId: "ɛ",
    spelling: "A",
    usageCount: 50,
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_C: {
    name: "ehh → C",
    description: "All 'ehh' sounds are spelled C",
    soundId: "ɛ",
    spelling: "C",
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
    usageCount: 215,
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_EA: {
    name: "ehh → EA",
    description: "All 'ehh' sounds are spelled EA",
    soundId: "ɛ",
    spelling: "EA",
    usageCount: 14,
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_EH: {
    name: "eh → EH",
    description: "All 'eh' sounds are spelled EH",
    soundId: "ɛ",
    spelling: "EH",
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
  EH_IE: {
    name: "ehh → IE",
    description: "All 'ehh' sounds are spelled IE",
    soundId: "ɛ",
    spelling: "IE",
    usageCount: 1,
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_J: {
    name: "ehh → J",
    description: "All 'ehh' sounds are spelled J",
    soundId: "ɛ",
    spelling: "J",
    usageCount: 1,
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_N: {
    name: "ehh → N",
    description: "All 'ehh' sounds are spelled N",
    soundId: "ɛ",
    spelling: "N",
    usageCount: 1,
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
  EH_UE: {
    name: "ehh → UE",
    description: "All 'ehh' sounds are spelled UE",
    soundId: "ɛ",
    spelling: "UE",
    usageCount: 1,
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EL_AL: {
    name: "el → AL",
    description: "All 'el' sounds are spelled AL",
    soundId: "əl",
    spelling: "AL",
    usageCount: 34,
    mutexGroup: "SOUND_EL",
    maxDurability: 3,
    transform: (word) => word
  },
  EL_EL: {
    name: "el → EL",
    description: "All 'el' sounds are spelled EL",
    soundId: "əl",
    spelling: "EL",
    usageCount: 3,
    mutexGroup: "SOUND_EL",
    maxDurability: 3,
    transform: (word) => word
  },
  EL_IL: {
    name: "el → IL",
    description: "All 'el' sounds are spelled IL",
    soundId: "əl",
    spelling: "IL",
    usageCount: 3,
    mutexGroup: "SOUND_EL",
    maxDurability: 3,
    transform: (word) => word
  },
  EL_L: {
    name: "el → L",
    description: "All 'el' sounds are spelled L",
    soundId: "əl",
    spelling: "L",
    usageCount: 3,
    mutexGroup: "SOUND_EL",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_AI: {
    name: "eye → AI",
    description: "All 'eye' sounds are spelled AI",
    soundId: "aɪ",
    spelling: "AI",
    usageCount: 1,
    mutexGroup: "VOWEL_EYE",
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
    usageCount: 2,
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
    usageCount: 83,
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_IE: {
    name: "eye → IE",
    description: "All 'eye' sounds are spelled IE",
    soundId: "aɪ",
    spelling: "IE",
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
    usageCount: 9,
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_IO: {
    name: "eye → IO",
    description: "All 'eye' sounds are spelled IO",
    soundId: "aɪ",
    spelling: "IO",
    usageCount: 2,
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
    usageCount: 15,
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  F_F: {
    name: "f → F",
    description: "All 'f' sounds are spelled F",
    soundId: "f",
    spelling: "F",
    usageCount: 134,
    mutexGroup: "F_SOUND",
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
  F_FF: {
    name: "f → FF",
    description: "All 'f' sounds are spelled FF",
    soundId: "f",
    spelling: "FF",
    usageCount: 13,
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  F_FT: {
    name: "f → FT",
    description: "All 'f' sounds are spelled FT",
    soundId: "f",
    spelling: "FT",
    usageCount: 1,
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
    usageCount: 21,
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/F/g, "PH")
  },
  F_V: {
    name: "f → V",
    description: "All 'f' sounds are spelled V",
    soundId: "f",
    spelling: "V",
    usageCount: 1,
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  G_G: {
    name: "ɡ → G",
    description: "All 'ɡ' sounds are spelled G",
    soundId: "ɡ",
    spelling: "G",
    usageCount: 69,
    mutexGroup: "G_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  G_GG: {
    name: "ɡ → GG",
    description: "All 'ɡ' sounds are spelled GG",
    soundId: "ɡ",
    spelling: "GG",
    usageCount: 3,
    mutexGroup: "G_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  G_GUE: {
    name: "ɡ → GUE",
    description: "All 'ɡ' sounds are spelled GUE",
    soundId: "ɡ",
    spelling: "GUE",
    usageCount: 1,
    mutexGroup: "G_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/G/g, "GUE")
  },
  H_H: {
    name: "h → H",
    description: "All 'h' sounds are spelled H",
    soundId: "h",
    spelling: "H",
    usageCount: 51,
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
    usageCount: 2,
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
    usageCount: 10,
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
  IH_C: {
    name: "ih → C",
    description: "All 'ih' sounds are spelled C",
    soundId: "ɪ",
    spelling: "C",
    usageCount: 1,
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_E: {
    name: "ih → E",
    description: "All 'ih' sounds are spelled E",
    soundId: "ɪ",
    spelling: "E",
    usageCount: 118,
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_EA: {
    name: "ih → EA",
    description: "All 'ih' sounds are spelled EA",
    soundId: "ɪ",
    spelling: "EA",
    usageCount: 1,
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_EE: {
    name: "ih → EE",
    description: "All 'ih' sounds are spelled EE",
    soundId: "ɪ",
    spelling: "EE",
    usageCount: 1,
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_I: {
    name: "ih → I",
    description: "All 'ih' sounds are spelled I",
    soundId: "ɪ",
    spelling: "I",
    usageCount: 435,
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
    usageCount: 4,
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_U: {
    name: "ih → U",
    description: "All 'ih' sounds are spelled U",
    soundId: "ɪ",
    spelling: "U",
    usageCount: 3,
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_UI: {
    name: "ih → UI",
    description: "All 'ih' sounds are spelled UI",
    soundId: "ɪ",
    spelling: "UI",
    usageCount: 4,
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_Y: {
    name: "ih → Y",
    description: "All 'ih' sounds are spelled Y",
    soundId: "ɪ",
    spelling: "Y",
    usageCount: 15,
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IL_LE: {
    name: "il → LE",
    description: "All 'il' sounds are spelled LE",
    soundId: null,
    spelling: "LE",
    usageCount: 1,
    mutexGroup: "IL",
    maxDurability: 3,
    transform: (word) => word
  },
  J_D: {
    name: "dʒ → D",
    description: "All 'dʒ' sounds are spelled D",
    soundId: "dʒ",
    spelling: "D",
    usageCount: 4,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  J_DGE: {
    name: "dʒ → DGE",
    description: "All 'dʒ' sounds are spelled DGE",
    soundId: "dʒ",
    spelling: "DGE",
    usageCount: 5,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/J/g, "DGE")
  },
  J_DI: {
    name: "dʒ → DI",
    description: "All 'dʒ' sounds are spelled DI",
    soundId: "dʒ",
    spelling: "DI",
    usageCount: 1,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  J_G: {
    name: "j → G",
    description: "All 'j' sounds are spelled G",
    soundId: "dʒ",
    spelling: "G",
    usageCount: 25,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  J_GE: {
    name: "dʒ → GE",
    description: "All 'dʒ' sounds are spelled GE",
    soundId: "dʒ",
    spelling: "GE",
    usageCount: 9,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  J_GI: {
    name: "dʒ → GI",
    description: "All 'dʒ' sounds are spelled GI",
    soundId: "dʒ",
    spelling: "GI",
    usageCount: 1,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  J_J: {
    name: "dʒ → J",
    description: "All 'dʒ' sounds are spelled J",
    soundId: "dʒ",
    spelling: "J",
    usageCount: 15,
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
  JH_DU: {
    name: "j → DU",
    description: "All 'j' sounds are spelled DU",
    soundId: "dʒ",
    spelling: "DU",
    usageCount: 3,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_G: {
    name: "j → G",
    description: "All 'j' sounds are spelled G",
    soundId: "dʒ",
    spelling: "G",
    usageCount: 2,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_GE: {
    name: "j → GE",
    description: "All 'j' sounds are spelled GE",
    soundId: "dʒ",
    spelling: "GE",
    usageCount: 1,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_J: {
    name: "j → J",
    description: "All 'j' sounds are spelled J",
    soundId: "dʒ",
    spelling: "J",
    usageCount: 3,
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  K_C: {
    name: "k → C",
    description: "All 'k' sounds are spelled C",
    soundId: "k",
    spelling: "C",
    usageCount: 253,
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
    usageCount: 10,
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
  K_CQU: {
    name: "k → CQU",
    description: "All 'k' sounds are spelled CQU",
    soundId: "k",
    spelling: "CQU",
    usageCount: 1,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_G: {
    name: "k → G",
    description: "All 'k' sounds are spelled G",
    soundId: "k",
    spelling: "G",
    usageCount: 1,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_K: {
    name: "k → K",
    description: "All 'k' sounds are spelled K",
    soundId: "k",
    spelling: "K",
    usageCount: 62,
    mutexGroup: "K",
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
  K_KH: {
    name: "k → KH",
    description: "All 'k' sounds are spelled KH",
    soundId: "k",
    spelling: "KH",
    usageCount: 2,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_LK: {
    name: "k → LK",
    description: "All 'k' sounds are spelled LK",
    soundId: "k",
    spelling: "LK",
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
    usageCount: 3,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_QU: {
    name: "k → QU",
    description: "All 'k' sounds are spelled QU",
    soundId: "k",
    spelling: "QU",
    usageCount: 2,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word.replace(/K/g, "QU")
  },
  K_QUE: {
    name: "k → QUE",
    description: "All 'k' sounds are spelled QUE",
    soundId: "k",
    spelling: "QUE",
    usageCount: 3,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => {
      if (word.endsWith("K_CK")) return word.slice(0, -2) + "QUE";
      if (word.endsWith("K")) return word.slice(0, -1) + "QUE";
      return word;
    }
  },
  K_T: {
    name: "k → T",
    description: "All 'k' sounds are spelled T",
    soundId: "k",
    spelling: "T",
    usageCount: 1,
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  KS_S: {
    name: "ks → S",
    description: "All 'ks' sounds are spelled S",
    soundId: "ks",
    spelling: "S",
    usageCount: 1,
    mutexGroup: "SOUND_K_S",
    maxDurability: 3,
    transform: (word) => word
  },
  KS_X: {
    name: "ks → X",
    description: "All 'ks' sounds are spelled X",
    soundId: "ks",
    spelling: "X",
    usageCount: 25,
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
    usageCount: 12,
    mutexGroup: "KW_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/QU/g, "QU")
  },
  L_E: {
    name: "l → E",
    description: "All 'l' sounds are spelled E",
    soundId: "l",
    spelling: "E",
    usageCount: 1,
    mutexGroup: "SOUND_L",
    maxDurability: 3,
    transform: (word) => word
  },
  L_L: {
    name: "l → L",
    description: "All 'l' sounds are spelled L",
    soundId: "l",
    spelling: "L",
    usageCount: 316,
    mutexGroup: "SOUND_L",
    maxDurability: 3,
    transform: (word) => word
  },
  L_LE: {
    name: "l → LE",
    description: "All 'l' sounds are spelled LE",
    soundId: "l",
    spelling: "LE",
    usageCount: 42,
    mutexGroup: "SOUND_L",
    maxDurability: 3,
    transform: (word) => word
  },
  L_LL: {
    name: "l → LL",
    description: "All 'l' sounds are spelled LL",
    soundId: "l",
    spelling: "LL",
    usageCount: 36,
    mutexGroup: "SOUND_L",
    maxDurability: 3,
    transform: (word) => word
  },
  M_GM: {
    name: "m → GM",
    description: "All 'm' sounds are spelled GM",
    soundId: "m",
    spelling: "GM",
    usageCount: 3,
    mutexGroup: "M",
    maxDurability: 3,
    transform: (word) => word.replace(/M/g, "GM")
  },
  M_M: {
    name: "m → M",
    description: "All 'm' sounds are spelled M",
    soundId: "m",
    spelling: "M",
    usageCount: 242,
    mutexGroup: "M",
    maxDurability: 3,
    transform: (word) => word
  },
  M_ME: {
    name: "m → ME",
    description: "All 'm' sounds are spelled ME",
    soundId: "m",
    spelling: "ME",
    usageCount: 17,
    mutexGroup: "M",
    maxDurability: 3,
    transform: (word) => word
  },
  M_MM: {
    name: "m → MM",
    description: "All 'm' sounds are spelled MM",
    soundId: "m",
    spelling: "MM",
    usageCount: 8,
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
  N_G: {
    name: "n → G",
    description: "All 'n' sounds are spelled G",
    soundId: "n",
    spelling: "G",
    usageCount: 1,
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
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
  N_MN: {
    name: "n → MN",
    description: "All 'n' sounds are spelled MN",
    soundId: "n",
    spelling: "MN",
    usageCount: 1,
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
  },
  N_N: {
    name: "n → N",
    description: "All 'n' sounds are spelled N",
    soundId: "n",
    spelling: "N",
    usageCount: 568,
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
  },
  N_NE: {
    name: "n → NE",
    description: "All 'n' sounds are spelled NE",
    soundId: "n",
    spelling: "NE",
    usageCount: 28,
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
  N_T: {
    name: "n → T",
    description: "All 'n' sounds are spelled T",
    soundId: "n",
    spelling: "T",
    usageCount: 1,
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
  },
  NG_N: {
    name: "ng → N",
    description: "All 'ng' sounds are spelled N",
    soundId: "ŋ",
    spelling: "N",
    usageCount: 13,
    mutexGroup: "SOUND_U014B",
    maxDurability: 3,
    transform: (word) => word
  },
  NG_NG: {
    name: "ng → NG",
    description: "All 'ng' sounds are spelled NG",
    soundId: "ŋ",
    spelling: "NG",
    usageCount: 109,
    mutexGroup: "SOUND_U014B",
    maxDurability: 3,
    transform: (word) => word
  },
  NG_NGUE: {
    name: "ng → NGUE",
    description: "All 'ng' sounds are spelled NGUE",
    soundId: "ŋ",
    spelling: "NGUE",
    usageCount: 1,
    mutexGroup: "SOUND_U014B",
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
  OH_HO: {
    name: "oh → HO",
    description: "All 'oh' sounds are spelled HO",
    soundId: "oʊ",
    spelling: "HO",
    usageCount: 3,
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_O: {
    name: "oh → O",
    description: "All 'oh' sounds are spelled O",
    soundId: "oʊ",
    spelling: "O",
    usageCount: 111,
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OA: {
    name: "oh → OA",
    description: "All 'oh' sounds are spelled OA",
    soundId: "oʊ",
    spelling: "OA",
    usageCount: 18,
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
    usageCount: 2,
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OU: {
    name: "oh → OU",
    description: "All 'oh' sounds are spelled OU",
    soundId: "oʊ",
    spelling: "OU",
    usageCount: 4,
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OUGH: {
    name: "oh → OUGH",
    description: "All 'oh' sounds are spelled OUGH",
    soundId: "oʊ",
    spelling: "OUGH",
    usageCount: 2,
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OW: {
    name: "oh → OW",
    description: "All 'oh' sounds are spelled OW",
    soundId: "oʊ",
    spelling: "OW",
    usageCount: 12,
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
    usageCount: 7,
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
    usageCount: 10,
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
    usageCount: 9,
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_OU: {
    name: "oo → OU",
    description: "All 'oo' sounds are spelled OU",
    soundId: "u",
    spelling: "OU",
    usageCount: 5,
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
  OO_U: {
    name: "oo → U",
    description: "All 'oo' sounds are spelled U",
    soundId: "u",
    spelling: "U",
    usageCount: 22,
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
  OO_UI: {
    name: "oo → UI",
    description: "All 'oo' sounds are spelled UI",
    soundId: "u",
    spelling: "UI",
    usageCount: 2,
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
  OW_OU: {
    name: "ow → OU",
    description: "All 'ow' sounds are spelled OU",
    soundId: "aʊ",
    spelling: "OU",
    usageCount: 23,
    mutexGroup: "VOWEL_OW",
    maxDurability: 3,
    transform: (word) => word
  },
  OW_OW: {
    name: "ow → OW",
    description: "All 'ow' sounds are spelled OW",
    soundId: "aʊ",
    spelling: "OW",
    usageCount: 7,
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
    usageCount: 256,
    mutexGroup: "P_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  P_PE: {
    name: "p → PE",
    description: "All 'p' sounds are spelled PE",
    soundId: "p",
    spelling: "PE",
    usageCount: 3,
    mutexGroup: "P_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  P_PP: {
    name: "p → PP",
    description: "All 'p' sounds are spelled PP",
    soundId: "p",
    spelling: "PP",
    usageCount: 21,
    mutexGroup: "P_SOUND",
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
    usageCount: 580,
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => word
  },
  R_RE: {
    name: "r → RE",
    description: "All 'r' sounds are spelled RE",
    soundId: "r",
    spelling: "RE",
    usageCount: 34,
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
  R_RPS: {
    name: "r → RPS",
    description: "All 'r' sounds are spelled RPS",
    soundId: "r",
    spelling: "RPS",
    usageCount: 1,
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => word
  },
  R_RR: {
    name: "r → RR",
    description: "All 'r' sounds are spelled RR",
    soundId: "r",
    spelling: "RR",
    usageCount: 12,
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => word
  },
  R_WR: {
    name: "r → WR",
    description: "All 'r' sounds are spelled WR",
    soundId: "r",
    spelling: "WR",
    usageCount: 10,
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
    usageCount: 41,
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_CE: {
    name: "s → CE",
    description: "All 's' sounds are spelled CE",
    soundId: "s",
    spelling: "CE",
    usageCount: 38,
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
    usageCount: 355,
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_SC: {
    name: "s → SC",
    description: "All 's' sounds are spelled SC",
    soundId: "s",
    spelling: "SC",
    usageCount: 8,
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
    usageCount: 17,
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
  S_Z: {
    name: "s → Z",
    description: "All 's' sounds are spelled Z",
    soundId: "s",
    spelling: "Z",
    usageCount: 1,
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_C: {
    name: "sh → C",
    description: "All 'sh' sounds are spelled C",
    soundId: "ʃ",
    spelling: "C",
    usageCount: 1,
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
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
    usageCount: 10,
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
    usageCount: 1,
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
    usageCount: 35,
    mutexGroup: "SH_SOUND",
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
  SH_SS: {
    name: "sh → SS",
    description: "All 'sh' sounds are spelled SS",
    soundId: "ʃ",
    spelling: "SS",
    usageCount: 6,
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_SSI: {
    name: "sh → SSI",
    description: "All 'sh' sounds are spelled SSI",
    soundId: "ʃ",
    spelling: "SSI",
    usageCount: 2,
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_SU: {
    name: "sh → SU",
    description: "All 'sh' sounds are spelled SU",
    soundId: "ʃ",
    spelling: "SU",
    usageCount: 2,
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_TI: {
    name: "sh → TI",
    description: "All 'sh' sounds are spelled TI",
    soundId: "ʃ",
    spelling: "TI",
    usageCount: 80,
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/SH/g, "TI")
  },
  SILENT_E: {
    name: "silent → E",
    description: "All silent sounds are spelled E",
    soundId: null,
    spelling: "E",
    usageCount: 5,
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
  T_CT: {
    name: "t → CT",
    description: "All 't' sounds are spelled CT",
    soundId: "t",
    spelling: "CT",
    usageCount: 1,
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => word
  },
  T_ED: {
    name: "t → ED",
    description: "All 't' sounds are spelled ED",
    soundId: "t",
    spelling: "ED",
    usageCount: 12,
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => word
  },
  T_GHT: {
    name: "t → GHT",
    description: "All 't' sounds are spelled GHT",
    soundId: "t",
    spelling: "GHT",
    usageCount: 3,
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => word
  },
  T_PT: {
    name: "t → PT",
    description: "All 't' sounds are spelled PT",
    soundId: "t",
    spelling: "PT",
    usageCount: 2,
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("T")) return "PT" + word.slice(1);
      return word;
    }
  },
  T_S: {
    name: "t → S",
    description: "All 't' sounds are spelled S",
    soundId: "t",
    spelling: "S",
    usageCount: 2,
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => word
  },
  T_T: {
    name: "t → T",
    description: "All 't' sounds are spelled T",
    soundId: "t",
    spelling: "T",
    usageCount: 504,
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => word
  },
  T_TE: {
    name: "t → TE",
    description: "All 't' sounds are spelled TE",
    soundId: "t",
    spelling: "TE",
    usageCount: 22,
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => word
  },
  T_TT: {
    name: "t → TT",
    description: "All 't' sounds are spelled TT",
    soundId: "t",
    spelling: "TT",
    usageCount: 18,
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => word
  },
  T_Z: {
    name: "t → Z",
    description: "All 't' sounds are spelled Z",
    soundId: "t",
    spelling: "Z",
    usageCount: 1,
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => word
  },
  TH_TH: {
    name: "th → TH",
    description: "All 'th' sounds are spelled TH",
    soundId: "ð",
    spelling: "TH",
    usageCount: 48,
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
  TH_THE: {
    name: "th → THE",
    description: "All 'th' sounds are spelled THE",
    soundId: "ð",
    spelling: "THE",
    usageCount: 1,
    mutexGroup: "SOUND_U00F0",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_A: {
    name: "uh → A",
    description: "All 'uh' sounds are spelled A",
    soundId: "ə",
    spelling: "A",
    usageCount: 156,
    mutexGroup: "VOWEL_UH",
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
  UH_E: {
    name: "uh → E",
    description: "All 'uh' sounds are spelled E",
    soundId: "ə",
    spelling: "E",
    usageCount: 207,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_I: {
    name: "uh → I",
    description: "All 'uh' sounds are spelled I",
    soundId: "ə",
    spelling: "I",
    usageCount: 28,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_IA: {
    name: "uh → IA",
    description: "All 'uh' sounds are spelled IA",
    soundId: "ə",
    spelling: "IA",
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
    usageCount: 6,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_L: {
    name: "uh → L",
    description: "All 'uh' sounds are spelled L",
    soundId: "ə",
    spelling: "L",
    usageCount: 1,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_O: {
    name: "uh → O",
    description: "All 'uh' sounds are spelled O",
    soundId: "ə",
    spelling: "O",
    usageCount: 211,
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
  UH_OO: {
    name: "uuh → OO",
    description: "All 'uuh' sounds are spelled OO",
    soundId: "ʊ",
    spelling: "OO",
    usageCount: 10,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_OU: {
    name: "uh → OU",
    description: "All 'uh' sounds are spelled OU",
    soundId: "ʌ",
    spelling: "OU",
    usageCount: 13,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_S: {
    name: "uh → S",
    description: "All 'uh' sounds are spelled S",
    soundId: "ə",
    spelling: "S",
    usageCount: 1,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_U: {
    name: "uh → U",
    description: "All 'uh' sounds are spelled U",
    soundId: "ʌ",
    spelling: "U",
    usageCount: 141,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_Y: {
    name: "uh → Y",
    description: "All 'uh' sounds are spelled Y",
    soundId: "ʌ",
    spelling: "Y",
    usageCount: 2,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UR_U: {
    name: "er → U",
    description: "All 'er' sounds are spelled U",
    soundId: "ɜr",
    spelling: "U",
    usageCount: 5,
    mutexGroup: "VOWEL_UR",
    maxDurability: 3,
    transform: (word) => word
  },
  V_F: {
    name: "v → F",
    description: "All 'v' sounds are spelled F",
    soundId: "v",
    spelling: "F",
    usageCount: 1,
    mutexGroup: "V_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/V/g, "F")
  },
  V_V: {
    name: "v → V",
    description: "All 'v' sounds are spelled V",
    soundId: "v",
    spelling: "V",
    usageCount: 75,
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
    usageCount: 4,
    mutexGroup: "W_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  W_W: {
    name: "w → W",
    description: "All 'w' sounds are spelled W",
    soundId: "w",
    spelling: "W",
    usageCount: 51,
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
    usageCount: 4,
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  Y_I: {
    name: "y → I",
    description: "All 'y' sounds are spelled I",
    soundId: "j",
    spelling: "I",
    usageCount: 5,
    mutexGroup: "Y_SOUND",
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
  Y_N: {
    name: "y → N",
    description: "All 'y' sounds are spelled N",
    soundId: "j",
    spelling: "N",
    usageCount: 1,
    mutexGroup: "Y_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  Y_U: {
    name: "y → U",
    description: "All 'y' sounds are spelled U",
    soundId: "j",
    spelling: "U",
    usageCount: 4,
    mutexGroup: "Y_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  Y_Y: {
    name: "y → Y",
    description: "All 'y' sounds are spelled Y",
    soundId: "j",
    spelling: "Y",
    usageCount: 6,
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
  YOU_IEW: {
    name: "yu → IEW",
    description: "All 'yu' sounds are spelled IEW",
    soundId: "ju",
    spelling: "IEW",
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
    usageCount: 26,
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
  YOU_UE: {
    name: "yu → UE",
    description: "All 'yu' sounds are spelled UE",
    soundId: "ju",
    spelling: "UE",
    usageCount: 1,
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
  Z_ES: {
    name: "z → ES",
    description: "All 'z' sounds are spelled ES",
    soundId: "z",
    spelling: "ES",
    usageCount: 3,
    mutexGroup: "Z",
    maxDurability: 3,
  },
  Z_S: {
    name: "z → S",
    description: "All 'z' sounds are spelled S",
    soundId: "z",
    spelling: "S",
    usageCount: 120,
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_SE: {
    name: "z → SE",
    description: "All 'z' sounds are spelled SE",
    soundId: "z",
    spelling: "SE",
    usageCount: 15,
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_SI: {
    name: "z → SI",
    description: "All 'z' sounds are spelled SI",
    soundId: "z",
    spelling: "SI",
    usageCount: 5,
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
  Z_STH: {
    name: "z → STH",
    description: "All 'z' sounds are spelled STH",
    soundId: "z",
    spelling: "STH",
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
    usageCount: 7,
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
  ZH_G: {
    name: "zh → G",
    description: "All 'zh' sounds are spelled G",
    soundId: "ʒ",
    spelling: "G",
    usageCount: 1,
    mutexGroup: "SOUND_U0292",
    maxDurability: 3,
    transform: (word) => word
  },
  ZH_S: {
    name: "zh → S",
    description: "All 'zh' sounds are spelled S",
    soundId: "ʒ",
    spelling: "S",
    usageCount: 4,
    mutexGroup: "SOUND_U0292",
    maxDurability: 3,
    transform: (word) => word
  },
  ZH_SI: {
    name: "zh → SI",
    description: "All 'zh' sounds are spelled SI",
    soundId: "ʒ",
    spelling: "SI",
    usageCount: 2,
    mutexGroup: "SOUND_U0292",
    maxDurability: 3,
    transform: (word) => word
  },
  ZH_SU: {
    name: "zh → SU",
    description: "All 'zh' sounds are spelled SU",
    soundId: "ʒ",
    spelling: "SU",
    usageCount: 1,
    mutexGroup: "SOUND_U0292",
    maxDurability: 3,
    transform: (word) => word
  },
};

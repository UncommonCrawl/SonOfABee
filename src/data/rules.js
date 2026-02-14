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
  A_A: {
    name: "aah → A",
    description: "All 'aah' sounds are spelled A",
    soundId: "æ",
    spelling: "A",
    mutexGroup: "VOWEL_AE",
    maxDurability: 3,
    transform: (word) => word
  },
  AD_AD: {
    name: "ad → AD",
    description: "All 'ad' sounds are spelled AD",
    soundId: "æd",
    spelling: "AD",
    mutexGroup: "SOUND_AD",
    maxDurability: 3,
    transform: (word) => word
  },
  AE_A: {
    name: "aah → A",
    description: "All 'aah' sounds are spelled A",
    soundId: "æ",
    spelling: "A",
    mutexGroup: "VOWEL_AE",
    maxDurability: 3,
    transform: (word) => word
  },
  AE_AI: {
    name: "aah → AI",
    description: "All 'aah' sounds are spelled AI",
    soundId: "æ",
    spelling: "AI",
    mutexGroup: "VOWEL_AE",
    maxDurability: 3,
    transform: (word) => word
  },
  AE_AU: {
    name: "aah → AU",
    description: "All 'aah' sounds are spelled AU",
    soundId: "æ",
    spelling: "AU",
    mutexGroup: "VOWEL_AE",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_A: {
    name: "ɑh → A",
    description: "All 'ɑh' sounds are spelled A",
    soundId: "ɑ",
    spelling: "A",
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_ACH: {
    name: "ɑh → ACH",
    description: "All 'ɑh' sounds are spelled ACH",
    soundId: "ɑ",
    spelling: "ACH",
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_E: {
    name: "ɑh → E",
    description: "All 'ɑh' sounds are spelled E",
    soundId: "ɑ",
    spelling: "E",
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_O: {
    name: "ɑh → O",
    description: "All 'ɑh' sounds are spelled O",
    soundId: "ɑ",
    spelling: "O",
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_OW: {
    name: "ah → OW",
    description: "All 'ah' sounds are spelled OW",
    soundId: "oʊ",
    spelling: "OW",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_U: {
    name: "ah → U",
    description: "All 'ah' sounds are spelled U",
    soundId: "ɑ",
    spelling: "U",
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  AIR_AIR: {
    name: "air → AIR",
    description: "All 'air' sounds are spelled AIR",
    soundId: "ɛr",
    spelling: "AIR",
    mutexGroup: "VOWEL_AIR",
    maxDurability: 3,
    transform: (word) => word
  },
  AIR_AIRE: {
    name: "air → AIRE",
    description: "All 'air' sounds are spelled AIRE",
    soundId: "ɛr",
    spelling: "AIRE",
    mutexGroup: "VOWEL_AIR",
    maxDurability: 3,
    transform: (word) => word
  },
  AIR_AR: {
    name: "air → AR",
    description: "All 'air' sounds are spelled AR",
    soundId: "ɛr",
    spelling: "AR",
    mutexGroup: "VOWEL_AIR",
    maxDurability: 3,
    transform: (word) => word
  },
  AIR_ARY: {
    name: "air → ARY",
    description: "All 'air' sounds are spelled ARY",
    soundId: "ɛr",
    spelling: "ARY",
    mutexGroup: "VOWEL_AIR",
    maxDurability: 3,
    transform: (word) => word
  },
  AK_AC: {
    name: "ak → AC",
    description: "All 'ak' sounds are spelled AC",
    soundId: "æk",
    spelling: "AC",
    mutexGroup: "SOUND_AK",
    maxDurability: 3,
    transform: (word) => word
  },
  AL_AL: {
    name: "al → AL",
    description: "All 'al' sounds are spelled AL",
    soundId: "æl",
    spelling: "AL",
    mutexGroup: "SOUND_AL",
    maxDurability: 3,
    transform: (word) => word
  },
  AN_AN: {
    name: "an → AN",
    description: "All 'an' sounds are spelled AN",
    soundId: "æn",
    spelling: "AN",
    mutexGroup: "SOUND_AN",
    maxDurability: 3,
    transform: (word) => word
  },
  AP_APP: {
    name: "ap → APP",
    description: "All 'ap' sounds are spelled APP",
    soundId: "æp",
    spelling: "APP",
    mutexGroup: "SOUND_AP",
    maxDurability: 3,
    transform: (word) => word
  },
  AR_AR: {
    name: "ɑr → AR",
    description: "All 'ɑr' sounds are spelled AR",
    soundId: "ɑr",
    spelling: "AR",
    mutexGroup: "VOWEL_AR",
    maxDurability: 3,
    transform: (word) => word
  },
  AR_EAR: {
    name: "ɑr → EAR",
    description: "All 'ɑr' sounds are spelled EAR",
    soundId: "ɑr",
    spelling: "EAR",
    mutexGroup: "VOWEL_AR",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_A: {
    name: "aw → A",
    description: "All 'aw' sounds are spelled A",
    soundId: "ɔ",
    spelling: "A",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_AU: {
    name: "aw → AU",
    description: "All 'aw' sounds are spelled AU",
    soundId: "ɔ",
    spelling: "AU",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_AW: {
    name: "aw → AW",
    description: "All 'aw' sounds are spelled AW",
    soundId: "ɔ",
    spelling: "AW",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_O: {
    name: "aw → O",
    description: "All 'aw' sounds are spelled O",
    soundId: "ɔ",
    spelling: "O",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_OA: {
    name: "aw → OA",
    description: "All 'aw' sounds are spelled OA",
    soundId: "ɔ",
    spelling: "OA",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_OU: {
    name: "aw → OU",
    description: "All 'aw' sounds are spelled OU",
    soundId: "ɔ",
    spelling: "OU",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_A: {
    name: "ay → A",
    description: "All 'ay' sounds are spelled A",
    soundId: "eɪ",
    spelling: "A",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_AI: {
    name: "ay → AI",
    description: "All 'ay' sounds are spelled AI",
    soundId: "eɪ",
    spelling: "AI",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_AIN: {
    name: "ay → AIN",
    description: "All 'ay' sounds are spelled AIN",
    soundId: "eɪ",
    spelling: "AIN",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_AU: {
    name: "ay → AU",
    description: "All 'ay' sounds are spelled AU",
    soundId: "eɪ",
    spelling: "AU",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_AY: {
    name: "ay → AY",
    description: "All 'ay' sounds are spelled AY",
    soundId: "eɪ",
    spelling: "AY",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_E: {
    name: "ay → E",
    description: "All 'ay' sounds are spelled E",
    soundId: "eɪ",
    spelling: "E",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_EA: {
    name: "ay → EA",
    description: "All 'ay' sounds are spelled EA",
    soundId: "eɪ",
    spelling: "EA",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_EI: {
    name: "ay → EI",
    description: "All 'ay' sounds are spelled EI",
    soundId: "eɪ",
    spelling: "EI",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_ET: {
    name: "ay → ET",
    description: "All 'ay' sounds are spelled ET",
    soundId: "eɪ",
    spelling: "ET",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_EY: {
    name: "ay → EY",
    description: "All 'ay' sounds are spelled EY",
    soundId: "eɪ",
    spelling: "EY",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_I: {
    name: "ay → I",
    description: "All 'ay' sounds are spelled I",
    soundId: "eɪ",
    spelling: "I",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_IA: {
    name: "ay → IA",
    description: "All 'ay' sounds are spelled IA",
    soundId: "eɪ",
    spelling: "IA",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_IE: {
    name: "ay → IE",
    description: "All 'ay' sounds are spelled IE",
    soundId: "eɪ",
    spelling: "IE",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_Y: {
    name: "ay → Y",
    description: "All 'ay' sounds are spelled Y",
    soundId: "eɪ",
    spelling: "Y",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_Z: {
    name: "ay → Z",
    description: "All 'ay' sounds are spelled Z",
    soundId: "eɪ",
    spelling: "Z",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AZ_AS: {
    name: "az → AS",
    description: "All 'az' sounds are spelled AS",
    soundId: "æz",
    spelling: "AS",
    mutexGroup: "SOUND_AZ",
    maxDurability: 3,
    transform: (word) => word
  },
  B_B: {
    name: "b → B",
    description: "All 'b' sounds are spelled B",
    soundId: "b",
    spelling: "B",
    mutexGroup: "SOUND_B",
    maxDurability: 3,
    transform: (word) => word
  },
  B_Y: {
    name: "b → Y",
    description: "All 'b' sounds are spelled Y",
    soundId: "b",
    spelling: "Y",
    mutexGroup: "SOUND_B",
    maxDurability: 3,
    transform: (word) => word
  },
  CH_C: {
    name: "ch → C",
    description: "All 'ch' sounds are spelled C",
    soundId: "tʃ",
    spelling: "C",
    mutexGroup: "CH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/CH/g, "C")
  },
  CH_CC: {
    name: "ch → CC",
    description: "All 'ch' sounds are spelled CC",
    soundId: "tʃ",
    spelling: "CC",
    mutexGroup: "CH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  CH_CH: {
    name: "ch → CH",
    description: "All 'ch' sounds are spelled CH",
    soundId: "tʃ",
    spelling: "CH",
    mutexGroup: "CH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  CH_CH_2: {
    name: "ʧ → CH",
    description: "All 'ʧ' sounds are spelled CH",
    soundId: "ʧ",
    spelling: "CH",
    mutexGroup: "SOUND_U02A7",
    maxDurability: 3,
    transform: (word) => word
  },
  CH_T: {
    name: "ch → T",
    description: "All 'ch' sounds are spelled T",
    soundId: "tʃ",
    spelling: "T",
    mutexGroup: "CH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  CH_TCH: {
    name: "ch → TCH",
    description: "All 'ch' sounds are spelled TCH",
    soundId: "tʃ",
    spelling: "TCH",
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
    mutexGroup: "SOUND_D",
    maxDurability: 3,
    transform: (word) => word
  },
  D_DE: {
    name: "d → DE",
    description: "All 'd' sounds are spelled DE",
    soundId: "d",
    spelling: "DE",
    mutexGroup: "SOUND_D",
    maxDurability: 3,
    transform: (word) => word
  },
  D_DG: {
    name: "dʒ → DG",
    description: "All 'dʒ' sounds are spelled DG",
    soundId: "dʒ",
    spelling: "DG",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  D_ED: {
    name: "d → ED",
    description: "All 'd' sounds are spelled ED",
    soundId: "d",
    spelling: "ED",
    mutexGroup: "SOUND_D",
    maxDurability: 3,
    transform: (word) => word
  },
  D_H: {
    name: "d → H",
    description: "All 'd' sounds are spelled H",
    soundId: "d",
    spelling: "H",
    mutexGroup: "SOUND_D",
    maxDurability: 3,
    transform: (word) => word
  },
  DJ_DJ: {
    name: "dʒ → DJ",
    description: "All 'dʒ' sounds are spelled DJ",
    soundId: "dʒ",
    spelling: "DJ",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/J/g, "DJ")
  },
  EE_AY: {
    name: "ee → AY",
    description: "All 'ee' sounds are spelled AY",
    soundId: "i",
    spelling: "AY",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_B: {
    name: "ee → B",
    description: "All 'ee' sounds are spelled B",
    soundId: "i",
    spelling: "B",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_E: {
    name: "ee → E",
    description: "All 'ee' sounds are spelled E",
    soundId: "i",
    spelling: "E",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EA: {
    name: "ee → EA",
    description: "All 'ee' sounds are spelled EA",
    soundId: "i",
    spelling: "EA",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EE: {
    name: "ee → EE",
    description: "All 'ee' sounds are spelled EE",
    soundId: "i",
    spelling: "EE",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EI: {
    name: "ee → EI",
    description: "All 'ee' sounds are spelled EI",
    soundId: "i",
    spelling: "EI",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EO: {
    name: "ee → EO",
    description: "All 'ee' sounds are spelled EO",
    soundId: "i",
    spelling: "EO",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EY: {
    name: "ee → EY",
    description: "All 'ee' sounds are spelled EY",
    soundId: "i",
    spelling: "EY",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_I: {
    name: "ee → I",
    description: "All 'ee' sounds are spelled I",
    soundId: "i",
    spelling: "I",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_IE: {
    name: "ee → IE",
    description: "All 'ee' sounds are spelled IE",
    soundId: "i",
    spelling: "IE",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_IS: {
    name: "ee → IS",
    description: "All 'ee' sounds are spelled IS",
    soundId: "i",
    spelling: "IS",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_Y: {
    name: "ee → Y",
    description: "All 'ee' sounds are spelled Y",
    soundId: "i",
    spelling: "Y",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_A: {
    name: "ehh → A",
    description: "All 'ehh' sounds are spelled A",
    soundId: "ɛ",
    spelling: "A",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_AI: {
    name: "eh → AI",
    description: "All 'eh' sounds are spelled AI",
    soundId: "ɛ",
    spelling: "AI",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_E: {
    name: "eh → E",
    description: "All 'eh' sounds are spelled E",
    soundId: "ɛ",
    spelling: "E",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_EA: {
    name: "ehh → EA",
    description: "All 'ehh' sounds are spelled EA",
    soundId: "ɛ",
    spelling: "EA",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_EH: {
    name: "eh → EH",
    description: "All 'eh' sounds are spelled EH",
    soundId: "ɛ",
    spelling: "EH",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_EI: {
    name: "eh → EI",
    description: "All 'eh' sounds are spelled EI",
    soundId: "ɛ",
    spelling: "EI",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_EK: {
    name: "eh → EK",
    description: "All 'eh' sounds are spelled EK",
    soundId: "ɛ",
    spelling: "EK",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_EO: {
    name: "ehh → EO",
    description: "All 'ehh' sounds are spelled EO",
    soundId: "ɛ",
    spelling: "EO",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_ES: {
    name: "eh → ES",
    description: "All 'eh' sounds are spelled ES",
    soundId: "ɛ",
    spelling: "ES",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_IE: {
    name: "ehh → IE",
    description: "All 'ehh' sounds are spelled IE",
    soundId: "ɛ",
    spelling: "IE",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_L: {
    name: "el → L",
    description: "All 'el' sounds are spelled L",
    soundId: "əl",
    spelling: "L",
    mutexGroup: "SOUND_EL",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_U: {
    name: "ehh → U",
    description: "All 'ehh' sounds are spelled U",
    soundId: "ɛ",
    spelling: "U",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EL_LE: {
    name: "el → LE",
    description: "All 'el' sounds are spelled LE",
    soundId: "əl",
    spelling: "LE",
    mutexGroup: "SOUND_EL",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_AR: {
    name: "er → AR",
    description: "All 'er' sounds are spelled AR",
    soundId: "ər",
    spelling: "AR",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_ER: {
    name: "er → ER",
    description: "All 'er' sounds are spelled ER",
    soundId: "ər",
    spelling: "ER",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_N: {
    name: "er → N",
    description: "All 'er' sounds are spelled N",
    soundId: "ər",
    spelling: "N",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_OR: {
    name: "er → OR",
    description: "All 'er' sounds are spelled OR",
    soundId: "ər",
    spelling: "OR",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_OUR: {
    name: "er → OUR",
    description: "All 'er' sounds are spelled OUR",
    soundId: "ər",
    spelling: "OUR",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_R: {
    name: "er → R",
    description: "All 'er' sounds are spelled R",
    soundId: "ər",
    spelling: "R",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_RE: {
    name: "er → RE",
    description: "All 'er' sounds are spelled RE",
    soundId: "ər",
    spelling: "RE",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_UR: {
    name: "er → UR",
    description: "All 'er' sounds are spelled UR",
    soundId: "ɜr",
    spelling: "UR",
    mutexGroup: "VOWEL_UR",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_URE: {
    name: "er → URE",
    description: "All 'er' sounds are spelled URE",
    soundId: "ər",
    spelling: "URE",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  EY_A: {
    name: "ay → EY",
    description: "All 'ay' sounds are spelled EY",
    soundId: "eɪ",
    spelling: "EY",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_AIS: {
    name: "eye → AIS",
    description: "All 'eye' sounds are spelled AIS",
    soundId: "aɪ",
    spelling: "AIS",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_EI: {
    name: "eye → EI",
    description: "All 'eye' sounds are spelled EI",
    soundId: "aɪ",
    spelling: "EI",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_EYE: {
    name: "eye → EYE",
    description: "All 'eye' sounds are spelled EYE",
    soundId: "aɪ",
    spelling: "EYE",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_I: {
    name: "eye → I",
    description: "All 'eye' sounds are spelled I",
    soundId: "aɪ",
    spelling: "I",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_ICT: {
    name: "eye → ICT",
    description: "All 'eye' sounds are spelled ICT",
    soundId: "aɪ",
    spelling: "ICT",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_IGH: {
    name: "eye → IGH",
    description: "All 'eye' sounds are spelled IGH",
    soundId: "aɪ",
    spelling: "IGH",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_L: {
    name: "eye → L",
    description: "All 'eye' sounds are spelled L",
    soundId: "aɪ",
    spelling: "L",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_OI: {
    name: "eye → OI",
    description: "All 'eye' sounds are spelled OI",
    soundId: "aɪ",
    spelling: "OI",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_UY: {
    name: "eye → UY",
    description: "All 'eye' sounds are spelled UY",
    soundId: "aɪ",
    spelling: "UY",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_Y: {
    name: "eye → Y",
    description: "All 'eye' sounds are spelled Y",
    soundId: "aɪ",
    spelling: "Y",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  F_E: {
    name: "f → E",
    description: "All 'f' sounds are spelled E",
    soundId: "f",
    spelling: "E",
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  F_F: {
    name: "f → F",
    description: "All 'f' sounds are spelled F",
    soundId: "f",
    spelling: "F",
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  F_FF: {
    name: "f → FF",
    description: "All 'f' sounds are spelled FF",
    soundId: "f",
    spelling: "FF",
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  F_GH: {
    name: "f → GH",
    description: "All 'f' sounds are spelled GH",
    soundId: "f",
    spelling: "GH",
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/F/g, "GH")
  },
  F_PH: {
    name: "f → PH",
    description: "All 'f' sounds are spelled PH",
    soundId: "f",
    spelling: "PH",
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/F/g, "PH")
  },
  G_G: {
    name: "ɡ → G",
    description: "All 'ɡ' sounds are spelled G",
    soundId: "ɡ",
    spelling: "G",
    mutexGroup: "G_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  G_GH: {
    name: "ɡ → GH",
    description: "All 'ɡ' sounds are spelled GH",
    soundId: "ɡ",
    spelling: "GH",
    mutexGroup: "G_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  G_GUE: {
    name: "ɡ → GUE",
    description: "All 'ɡ' sounds are spelled GUE",
    soundId: "ɡ",
    spelling: "GUE",
    mutexGroup: "G_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/G/g, "GUE")
  },
  G_X: {
    name: "g → X",
    description: "All 'g' sounds are spelled X",
    soundId: "ɡ",
    spelling: "X",
    mutexGroup: "G_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  H_H: {
    name: "h → H",
    description: "All 'h' sounds are spelled H",
    soundId: "h",
    spelling: "H",
    mutexGroup: "H",
    maxDurability: 3,
    transform: (word) => word
  },
  H_J: {
    name: "h → J",
    description: "All 'h' sounds are spelled J",
    soundId: "h",
    spelling: "J",
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
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_AI: {
    name: "ih → AI",
    description: "All 'ih' sounds are spelled AI",
    soundId: "ɪ",
    spelling: "AI",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_CHI: {
    name: "ih → CHI",
    description: "All 'ih' sounds are spelled CHI",
    soundId: "ɪ",
    spelling: "CHI",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_E: {
    name: "ih → E",
    description: "All 'ih' sounds are spelled E",
    soundId: "ɪ",
    spelling: "E",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_I: {
    name: "ih → I",
    description: "All 'ih' sounds are spelled I",
    soundId: "ɪ",
    spelling: "I",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_IE: {
    name: "ih → IE",
    description: "All 'ih' sounds are spelled IE",
    soundId: "ɪ",
    spelling: "IE",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_O: {
    name: "ih → O",
    description: "All 'ih' sounds are spelled O",
    soundId: "ɪ",
    spelling: "O",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_U: {
    name: "ih → U",
    description: "All 'ih' sounds are spelled U",
    soundId: "ɪ",
    spelling: "U",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_UI: {
    name: "ih → UI",
    description: "All 'ih' sounds are spelled UI",
    soundId: "ɪ",
    spelling: "UI",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_Y: {
    name: "ih → Y",
    description: "All 'ih' sounds are spelled Y",
    soundId: "ɪ",
    spelling: "Y",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IL_LE: {
    name: "il → LE",
    description: "All 'il' sounds are spelled LE",
    soundId: "ɪl",
    spelling: "LE",
    mutexGroup: "SOUND_EL",
    maxDurability: 3,
    transform: (word) => word
  },
  J_DGE: {
    name: "dʒ → DGE",
    description: "All 'dʒ' sounds are spelled DGE",
    soundId: "dʒ",
    spelling: "DGE",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/J/g, "DGE")
  },
  J_G: {
    name: "j → G",
    description: "All 'j' sounds are spelled G",
    soundId: "dʒ",
    spelling: "G",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  J_J: {
    name: "dʒ → J",
    description: "All 'dʒ' sounds are spelled J",
    soundId: "dʒ",
    spelling: "J",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  J_J_2: {
    name: "ʤ → J",
    description: "All 'ʤ' sounds are spelled J",
    soundId: "ʤ",
    spelling: "J",
    mutexGroup: "SOUND_U02A4",
    maxDurability: 3,
    transform: (word) => word
  },
  J_LL: {
    name: "y → LL",
    description: "All 'y' sounds are spelled LL",
    soundId: "j",
    spelling: "LL",
    mutexGroup: "Y_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/Y/g, "LL")
  },
  J_Y: {
    name: "j → Y",
    description: "All 'j' sounds are spelled Y",
    soundId: "j",
    spelling: "Y",
    mutexGroup: "Y_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_DGE: {
    name: "j → DGE",
    description: "All 'j' sounds are spelled DGE",
    soundId: "dʒ",
    spelling: "DGE",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_DU: {
    name: "j → DU",
    description: "All 'j' sounds are spelled DU",
    soundId: "dʒ",
    spelling: "DU",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_G: {
    name: "j → G",
    description: "All 'j' sounds are spelled G",
    soundId: "dʒ",
    spelling: "G",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_GE: {
    name: "j → GE",
    description: "All 'j' sounds are spelled GE",
    soundId: "dʒ",
    spelling: "GE",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_GI: {
    name: "j → GI",
    description: "All 'j' sounds are spelled GI",
    soundId: "dʒ",
    spelling: "GI",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_J: {
    name: "j → J",
    description: "All 'j' sounds are spelled J",
    soundId: "dʒ",
    spelling: "J",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  K_C: {
    name: "k → C",
    description: "All 'k' sounds are spelled C",
    soundId: "k",
    spelling: "C",
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_CC: {
    name: "k → CC",
    description: "All 'k' sounds are spelled CC",
    soundId: "k",
    spelling: "CC",
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_CCH: {
    name: "k → CCH",
    description: "All 'k' sounds are spelled CCH",
    soundId: "k",
    spelling: "CCH",
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_CH: {
    name: "k → CH",
    description: "All 'k' sounds are spelled CH",
    soundId: "k",
    spelling: "CH",
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
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_CQU: {
    name: "k → CQU",
    description: "All 'k' sounds are spelled CQU",
    soundId: "k",
    spelling: "CQU",
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_K: {
    name: "k → K",
    description: "All 'k' sounds are spelled K",
    soundId: "k",
    spelling: "K",
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_KH: {
    name: "k → KH",
    description: "All 'k' sounds are spelled KH",
    soundId: "k",
    spelling: "KH",
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_Q: {
    name: "k → Q",
    description: "All 'k' sounds are spelled Q",
    soundId: "k",
    spelling: "Q",
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_QU: {
    name: "k → QU",
    description: "All 'k' sounds are spelled QU",
    soundId: "k",
    spelling: "QU",
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word.replace(/K/g, "QU")
  },
  K_QUE: {
    name: "k → QUE",
    description: "All 'k' sounds are spelled QUE",
    soundId: "k",
    spelling: "QUE",
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
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  KS_X: {
    name: "ks → X",
    description: "All 'ks' sounds are spelled X",
    soundId: "ks",
    spelling: "X",
    mutexGroup: "SOUND_K_S",
    maxDurability: 3,
    transform: (word) => word
  },
  KW_CH: {
    name: "kw → CH",
    description: "All 'kw' sounds are spelled CH",
    soundId: "kw",
    spelling: "CH",
    mutexGroup: "KW_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/QU/g, "K_CH")
  },
  KW_QU: {
    name: "kw → QU",
    description: "All 'kw' sounds are spelled QU",
    soundId: "kw",
    spelling: "QU",
    mutexGroup: "KW_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/QU/g, "QU")
  },
  L_E: {
    name: "l → E",
    description: "All 'l' sounds are spelled E",
    soundId: "l",
    spelling: "E",
    mutexGroup: "SOUND_L",
    maxDurability: 3,
    transform: (word) => word
  },
  L_F: {
    name: "l → F",
    description: "All 'l' sounds are spelled F",
    soundId: "l",
    spelling: "F",
    mutexGroup: "SOUND_L",
    maxDurability: 3,
    transform: (word) => word
  },
  L_L: {
    name: "l → L",
    description: "All 'l' sounds are spelled L",
    soundId: "l",
    spelling: "L",
    mutexGroup: "SOUND_L",
    maxDurability: 3,
    transform: (word) => word
  },
  L_LL: {
    name: "l → LL",
    description: "All 'l' sounds are spelled LL",
    soundId: "l",
    spelling: "LL",
    mutexGroup: "SOUND_L",
    maxDurability: 3,
    transform: (word) => word
  },
  M_GM: {
    name: "m → GM",
    description: "All 'm' sounds are spelled GM",
    soundId: "m",
    spelling: "GM",
    mutexGroup: "M",
    maxDurability: 3,
    transform: (word) => word.replace(/M/g, "GM")
  },
  M_M: {
    name: "m → M",
    description: "All 'm' sounds are spelled M",
    soundId: "m",
    spelling: "M",
    mutexGroup: "M",
    maxDurability: 3,
    transform: (word) => word
  },
  M_MM: {
    name: "m → MM",
    description: "All 'm' sounds are spelled MM",
    soundId: "m",
    spelling: "MM",
    mutexGroup: "SOUND_M",
    maxDurability: 3,
    transform: (word) => word
  },
  M_MN: {
    name: "m → MN",
    description: "All 'm' sounds are spelled MN",
    soundId: "m",
    spelling: "MN",
    mutexGroup: "M",
    maxDurability: 3,
    transform: (word) => {
      if (word.endsWith("M")) return word + "MN";
      return word;
    }
  },
  N_DN: {
    name: "n → DN",
    description: "All 'n' sounds are spelled DN",
    soundId: "n",
    spelling: "DN",
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
  },
  N_E: {
    name: "n → E",
    description: "All 'n' sounds are spelled E",
    soundId: "n",
    spelling: "E",
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
  },
  N_GN: {
    name: "n → GN",
    description: "All 'n' sounds are spelled GN",
    soundId: "n",
    spelling: "GN",
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
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
  },
  N_NE: {
    name: "n → NE",
    description: "All 'n' sounds are spelled NE",
    soundId: "n",
    spelling: "NE",
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
  },
  N_NN: {
    name: "n → NN",
    description: "All 'n' sounds are spelled NN",
    soundId: "n",
    spelling: "NN",
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
  },
  N_PN: {
    name: "n → PN",
    description: "All 'n' sounds are spelled PN",
    soundId: "n",
    spelling: "PN",
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
    mutexGroup: "SOUND_U014B",
    maxDurability: 3,
    transform: (word) => word
  },
  NG_NG: {
    name: "ng → NG",
    description: "All 'ng' sounds are spelled NG",
    soundId: "ŋ",
    spelling: "NG",
    mutexGroup: "SOUND_U014B",
    maxDurability: 3,
    transform: (word) => word
  },
  NI_GNA: {
    name: "ni → GNA",
    description: "All 'ni' sounds are spelled GNA",
    soundId: "ni",
    spelling: "GNA",
    mutexGroup: "NI_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/NI/g, "GNA")
  },
  NS_N: {
    name: "n → NS",
    description: "All 'n' sounds are spelled NS",
    soundId: "n",
    spelling: "NS",
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_AUX: {
    name: "oh → AUX",
    description: "All 'oh' sounds are spelled AUX",
    soundId: "oʊ",
    spelling: "AUX",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_EAU: {
    name: "oh → EAU",
    description: "All 'oh' sounds are spelled EAU",
    soundId: "oʊ",
    spelling: "EAU",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_EW: {
    name: "oh → EW",
    description: "All 'oh' sounds are spelled EW",
    soundId: "oʊ",
    spelling: "EW",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_O: {
    name: "oh → O",
    description: "All 'oh' sounds are spelled O",
    soundId: "oʊ",
    spelling: "O",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OA: {
    name: "oh → OA",
    description: "All 'oh' sounds are spelled OA",
    soundId: "oʊ",
    spelling: "OA",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OAH: {
    name: "oh → OAH",
    description: "All 'oh' sounds are spelled OAH",
    soundId: "oʊ",
    spelling: "OAH",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OE: {
    name: "oh → OE",
    description: "All 'oh' sounds are spelled OE",
    soundId: "oʊ",
    spelling: "OE",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OO: {
    name: "oh → OO",
    description: "All 'oh' sounds are spelled OO",
    soundId: "oʊ",
    spelling: "OO",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OUGH: {
    name: "oh → OUGH",
    description: "All 'oh' sounds are spelled OUGH",
    soundId: "oʊ",
    spelling: "OUGH",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OW: {
    name: "oh → OW",
    description: "All 'oh' sounds are spelled OW",
    soundId: "oʊ",
    spelling: "OW",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_EU: {
    name: "oo → EU",
    description: "All 'oo' sounds are spelled EU",
    soundId: "u",
    spelling: "EU",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_EW: {
    name: "oo → EW",
    description: "All 'oo' sounds are spelled EW",
    soundId: "u",
    spelling: "EW",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_IEU: {
    name: "oo → IEU",
    description: "All 'oo' sounds are spelled IEU",
    soundId: "u",
    spelling: "IEU",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_O: {
    name: "oo → O",
    description: "All 'oo' sounds are spelled O",
    soundId: "u",
    spelling: "O",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_OE: {
    name: "oo → OE",
    description: "All 'oo' sounds are spelled OE",
    soundId: "u",
    spelling: "OE",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_OO: {
    name: "ooh → OO",
    description: "All 'ooh' sounds are spelled OO",
    soundId: "u",
    spelling: "OO",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_OU: {
    name: "oo → OU",
    description: "All 'oo' sounds are spelled OU",
    soundId: "u",
    spelling: "OU",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_OUGH: {
    name: "oo → OUGH",
    description: "All 'oo' sounds are spelled OUGH",
    soundId: "u",
    spelling: "OUGH",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_OUP: {
    name: "oo → OUP",
    description: "All 'oo' sounds are spelled OUP",
    soundId: "u",
    spelling: "OUP",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_OVE: {
    name: "oo → OVE",
    description: "All 'oo' sounds are spelled OVE",
    soundId: "u",
    spelling: "OVE",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_U: {
    name: "oo → U",
    description: "All 'oo' sounds are spelled U",
    soundId: "u",
    spelling: "U",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_UI: {
    name: "oo → UI",
    description: "All 'oo' sounds are spelled UI",
    soundId: "u",
    spelling: "UI",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_UO: {
    name: "oo → UO",
    description: "All 'oo' sounds are spelled UO",
    soundId: "u",
    spelling: "UO",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OR_OR: {
    name: "or → OR",
    description: "All 'or' sounds are spelled OR",
    soundId: "ɔr",
    spelling: "OR",
    mutexGroup: "VOWEL_OR",
    maxDurability: 3,
    transform: (word) => word
  },
  OR_ORE: {
    name: "or → ORE",
    description: "All 'or' sounds are spelled ORE",
    soundId: "ɔr",
    spelling: "ORE",
    mutexGroup: "VOWEL_OR",
    maxDurability: 3,
    transform: (word) => word
  },
  OR_ORPS: {
    name: "or → ORPS",
    description: "All 'or' sounds are spelled ORPS",
    soundId: "ɔr",
    spelling: "ORPS",
    mutexGroup: "VOWEL_OR",
    maxDurability: 3,
    transform: (word) => word
  },
  OW_OU: {
    name: "ow → OU",
    description: "All 'ow' sounds are spelled OU",
    soundId: "aʊ",
    spelling: "OU",
    mutexGroup: "VOWEL_OW",
    maxDurability: 3,
    transform: (word) => word
  },
  OW_OW: {
    name: "ow → OW",
    description: "All 'ow' sounds are spelled OW",
    soundId: "aʊ",
    spelling: "OW",
    mutexGroup: "VOWEL_OW",
    maxDurability: 3,
    transform: (word) => word
  },
  OY_OI: {
    name: "oi → OI",
    description: "All 'oi' sounds are spelled OI",
    soundId: "ɔɪ",
    spelling: "OI",
    mutexGroup: "VOWEL_OY",
    maxDurability: 3,
    transform: (word) => word
  },
  OY_OY: {
    name: "oy → OY",
    description: "All 'oy' sounds are spelled OY",
    soundId: "ɔɪ",
    spelling: "OY",
    mutexGroup: "VOWEL_OY",
    maxDurability: 3,
    transform: (word) => word
  },
  P_GH: {
    name: "p → GH",
    description: "All 'p' sounds are spelled GH",
    soundId: "p",
    spelling: "GH",
    mutexGroup: "P_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/P/g, "F_GH")
  },
  P_P: {
    name: "p → P",
    description: "All 'p' sounds are spelled P",
    soundId: "p",
    spelling: "P",
    mutexGroup: "P_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  P_PP: {
    name: "p → PP",
    description: "All 'p' sounds are spelled PP",
    soundId: "p",
    spelling: "PP",
    mutexGroup: "P_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  R_A: {
    name: "r → A",
    description: "All 'r' sounds are spelled A",
    soundId: "r",
    spelling: "A",
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => word
  },
  R_L: {
    name: "r → L",
    description: "All 'r' sounds are spelled L",
    soundId: "r",
    spelling: "L",
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => word.replace(/R/g, "L")
  },
  R_R: {
    name: "r → R",
    description: "All 'r' sounds are spelled R",
    soundId: "r",
    spelling: "R",
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => word
  },
  R_RE: {
    name: "r → RE",
    description: "All 'r' sounds are spelled RE",
    soundId: "r",
    spelling: "RE",
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => word
  },
  R_RH: {
    name: "r → RH",
    description: "All 'r' sounds are spelled RH",
    soundId: "r",
    spelling: "RH",
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
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => word
  },
  R_WR: {
    name: "r → WR",
    description: "All 'r' sounds are spelled WR",
    soundId: "r",
    spelling: "WR",
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
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_CE: {
    name: "s → CE",
    description: "All 's' sounds are spelled CE",
    soundId: "s",
    spelling: "CE",
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_CES: {
    name: "s → CES",
    description: "All 's' sounds are spelled CES",
    soundId: "s",
    spelling: "CES",
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_PS: {
    name: "s → PS",
    description: "All 's' sounds are spelled PS",
    soundId: "s",
    spelling: "PS",
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
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_SC: {
    name: "s → SC",
    description: "All 's' sounds are spelled SC",
    soundId: "s",
    spelling: "SC",
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
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_SS: {
    name: "s → SS",
    description: "All 's' sounds are spelled SS",
    soundId: "s",
    spelling: "SS",
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_ST: {
    name: "s → ST",
    description: "All 's' sounds are spelled ST",
    soundId: "s",
    spelling: "ST",
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_TS: {
    name: "s → TS",
    description: "All 's' sounds are spelled TS",
    soundId: "s",
    spelling: "TS",
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => {
      if (isSSound(word)) return "TS" + word.slice(1);
      return word;
    }
  },
  S_X: {
    name: "s → X",
    description: "All 's' sounds are spelled X",
    soundId: "s",
    spelling: "X",
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  SEE_CI: {
    name: "ee → CI",
    description: "All 'ee' sounds are spelled CI",
    soundId: "i",
    spelling: "CI",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_CH: {
    name: "sh → CH",
    description: "All 'sh' sounds are spelled CH",
    soundId: "ʃ",
    spelling: "CH",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_CI: {
    name: "sh → CI",
    description: "All 'sh' sounds are spelled CI",
    soundId: "ʃ",
    spelling: "CI",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/SH/g, "CI")
  },
  SH_S: {
    name: "sh → S",
    description: "All 'sh' sounds are spelled S",
    soundId: "ʃ",
    spelling: "S",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/SH/g, "S")
  },
  SH_SCH: {
    name: "sh → SCH",
    description: "All 'sh' sounds are spelled SCH",
    soundId: "ʃ",
    spelling: "SCH",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_SCI: {
    name: "sh → SCI",
    description: "All 'sh' sounds are spelled SCI",
    soundId: "ʃ",
    spelling: "SCI",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_SH: {
    name: "sh → SH",
    description: "All 'sh' sounds are spelled SH",
    soundId: "ʃ",
    spelling: "SH",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_SS: {
    name: "sh → SS",
    description: "All 'sh' sounds are spelled SS",
    soundId: "ʃ",
    spelling: "SS",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_SU: {
    name: "sh → SU",
    description: "All 'sh' sounds are spelled SU",
    soundId: "ʃ",
    spelling: "SU",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_TI: {
    name: "sh → TI",
    description: "All 'sh' sounds are spelled TI",
    soundId: "ʃ",
    spelling: "TI",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/SH/g, "TI")
  },
  SILENT_B: {
    name: "silent → B",
    description: "All silent sounds are spelled B",
    soundId: null,
    spelling: "B",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_D: {
    name: "silent → D",
    description: "All silent sounds are spelled D",
    soundId: null,
    spelling: "D",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_E: {
    name: "silent → E",
    description: "All silent sounds are spelled E",
    soundId: null,
    spelling: "E",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_EE: {
    name: "silent → EE",
    description: "All silent sounds are spelled EE",
    soundId: null,
    spelling: "EE",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_ER: {
    name: "silent → ER",
    description: "All silent sounds are spelled ER",
    soundId: null,
    spelling: "ER",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_ES: {
    name: "silent → ES",
    description: "All silent sounds are spelled ES",
    soundId: null,
    spelling: "ES",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_G: {
    name: "silent → G",
    description: "All silent sounds are spelled G",
    soundId: null,
    spelling: "G",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_GH: {
    name: "silent → GH",
    description: "All silent sounds are spelled GH",
    soundId: null,
    spelling: "GH",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_H: {
    name: "silent → H",
    description: "All silent sounds are spelled H",
    soundId: null,
    spelling: "H",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_I: {
    name: "silent → I",
    description: "All silent sounds are spelled I",
    soundId: null,
    spelling: "I",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_IONED: {
    name: "silent → IONED",
    description: "All silent sounds are spelled IONED",
    soundId: null,
    spelling: "IONED",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_K: {
    name: "silent → K",
    description: "All silent sounds are spelled K",
    soundId: null,
    spelling: "K",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_M: {
    name: "silent → M",
    description: "All silent sounds are spelled M",
    soundId: null,
    spelling: "M",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_P: {
    name: "silent → P",
    description: "All silent sounds are spelled P",
    soundId: null,
    spelling: "P",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_S: {
    name: "silent → S",
    description: "All silent sounds are spelled S",
    soundId: null,
    spelling: "S",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_TH: {
    name: "silent → TH",
    description: "All silent sounds are spelled TH",
    soundId: null,
    spelling: "TH",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  T_BT: {
    name: "t → BT",
    description: "All 't' sounds are spelled BT",
    soundId: "t",
    spelling: "BT",
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => {
      if (word.endsWith("T")) return word.slice(0, -1) + "BT";
      return word;
    }
  },
  T_ED: {
    name: "t → ED",
    description: "All 't' sounds are spelled ED",
    soundId: "t",
    spelling: "ED",
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => word
  },
  T_GHT: {
    name: "t → GHT",
    description: "All 't' sounds are spelled GHT",
    soundId: "t",
    spelling: "GHT",
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => word
  },
  T_PT: {
    name: "t → PT",
    description: "All 't' sounds are spelled PT",
    soundId: "t",
    spelling: "PT",
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
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => word
  },
  T_TT: {
    name: "t → TT",
    description: "All 't' sounds are spelled TT",
    soundId: "t",
    spelling: "TT",
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => word
  },
  TH_TH: {
    name: "th → TH",
    description: "All 'th' sounds are spelled TH",
    soundId: "ð",
    spelling: "TH",
    mutexGroup: "SOUND_U00F0",
    maxDurability: 3,
    transform: (word) => word
  },
  TH_TH_2: {
    name: "th → TH",
    description: "All 'th' sounds are spelled TH",
    soundId: "θ",
    spelling: "TH",
    mutexGroup: "SOUND_U03B8",
    maxDurability: 3,
    transform: (word) => word
  },
  TS_ZZ: {
    name: "ts → ZZ",
    description: "All 'ts' sounds are spelled ZZ",
    soundId: "ts",
    spelling: "ZZ",
    mutexGroup: "TS_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/TS/g, "ZZ")
  },
  U0283_U0259_N_S: {
    name: "ʃən → S",
    description: "All 'ʃən' sounds are spelled S",
    soundId: "ʃən",
    spelling: "S",
    mutexGroup: "SOUND_U0283_U0259_N",
    maxDurability: 3,
    transform: (word) => word
  },
  U0292_G: {
    name: "zh → G",
    description: "All 'zh' sounds are spelled G",
    soundId: "ʒ",
    spelling: "G",
    mutexGroup: "SOUND_U0292",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_A: {
    name: "uh → A",
    description: "All 'uh' sounds are spelled A",
    soundId: "ə",
    spelling: "A",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_AI: {
    name: "uh → AI",
    description: "All 'uh' sounds are spelled AI",
    soundId: "ə",
    spelling: "AI",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_AU: {
    name: "uh → AU",
    description: "All 'uh' sounds are spelled AU",
    soundId: "ə",
    spelling: "AU",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_C: {
    name: "uh → C",
    description: "All 'uh' sounds are spelled C",
    soundId: "ə",
    spelling: "C",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_E: {
    name: "uh → E",
    description: "All 'uh' sounds are spelled E",
    soundId: "ə",
    spelling: "E",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_I: {
    name: "uh → I",
    description: "All 'uh' sounds are spelled I",
    soundId: "ə",
    spelling: "I",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_IA: {
    name: "uh → IA",
    description: "All 'uh' sounds are spelled IA",
    soundId: "ə",
    spelling: "IA",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_ION: {
    name: "uhn → ION",
    description: "All 'uhn' sounds are spelled ION",
    soundId: "ən",
    spelling: "ION",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_L: {
    name: "uh → L",
    description: "All 'uh' sounds are spelled L",
    soundId: "ə",
    spelling: "L",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_N: {
    name: "uh → N",
    description: "All 'uh' sounds are spelled N",
    soundId: "ʌ",
    spelling: "N",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_O: {
    name: "uh → O",
    description: "All 'uh' sounds are spelled O",
    soundId: "ə",
    spelling: "O",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UUGH_O: {
    name: "uugh → O",
    description: "All 'uugh' sounds are spelled O",
    soundId: "ʊ",
    spelling: "O",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_O_3: {
    name: "uh → O",
    description: "All 'uh' sounds are spelled O",
    soundId: "ʌ",
    spelling: "O",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_O_W: {
    name: "wuh → O",
    description: "All 'wuh' sounds are spelled O",
    soundId: "wʌ",
    spelling: "O",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_OO: {
    name: "uugh → OO",
    description: "All 'uugh' sounds are spelled OO",
    soundId: "ʊ",
    spelling: "OO",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_OO_2: {
    name: "uh → OO",
    description: "All 'uh' sounds are spelled OO",
    soundId: "ʌ",
    spelling: "OO",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_OU: {
    name: "uh → OU",
    description: "All 'uh' sounds are spelled OU",
    soundId: "ʌ",
    spelling: "OU",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_U: {
    name: "uh → U",
    description: "All 'uh' sounds are spelled U",
    soundId: "ʌ",
    spelling: "U",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_U_2: {
    name: "uh → U",
    description: "All 'uh' sounds are spelled U",
    soundId: "ə",
    spelling: "U",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UR_UR: {
    name: "er → UR",
    description: "All 'er' sounds are spelled UR",
    soundId: "ɜr",
    spelling: "UR",
    mutexGroup: "VOWEL_UR",
    maxDurability: 3,
    transform: (word) => word
  },
  UUGH_U: {
    name: "uugh → U",
    description: "All 'uugh' sounds are spelled U",
    soundId: "ʊ",
    spelling: "U",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_F: {
    name: "v → F",
    description: "All 'v' sounds are spelled F",
    soundId: "v",
    spelling: "F",
    mutexGroup: "V_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/V/g, "F")
  },
  V_V: {
    name: "v → V",
    description: "All 'v' sounds are spelled V",
    soundId: "v",
    spelling: "V",
    mutexGroup: "V_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  V_VE: {
    name: "v → VE",
    description: "All 'v' sounds are spelled VE",
    soundId: "v",
    spelling: "VE",
    mutexGroup: "V_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  W_O: {
    name: "w → O",
    description: "All 'w' sounds are spelled O",
    soundId: "w",
    spelling: "O",
    mutexGroup: "W_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/W/g, "O")
  },
  W_OU: {
    name: "w → OU",
    description: "All 'w' sounds are spelled OU",
    soundId: "w",
    spelling: "OU",
    mutexGroup: "W_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  W_U: {
    name: "w → U",
    description: "All 'w' sounds are spelled U",
    soundId: "w",
    spelling: "U",
    mutexGroup: "W_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  W_W: {
    name: "w → W",
    description: "All 'w' sounds are spelled W",
    soundId: "w",
    spelling: "W",
    mutexGroup: "W_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  W_WH: {
    name: "w → WH",
    description: "All 'w' sounds are spelled WH",
    soundId: "w",
    spelling: "WH",
    mutexGroup: "W_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  WUH_O: {
    name: "wuh → O",
    description: "All 'wuh' sounds are spelled O",
    soundId: "wʌ",
    spelling: "O",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  Y_J: {
    name: "y → J",
    description: "All 'y' sounds are spelled J",
    soundId: "j",
    spelling: "J",
    mutexGroup: "Y_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  Y_U: {
    name: "y → U",
    description: "All 'y' sounds are spelled U",
    soundId: "j",
    spelling: "U",
    mutexGroup: "Y_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  Y_Y: {
    name: "y → Y",
    description: "All 'y' sounds are spelled Y",
    soundId: "j",
    spelling: "Y",
    mutexGroup: "Y_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  YOU_EAU: {
    name: "yu → EAU",
    description: "All 'yu' sounds are spelled EAU",
    soundId: "ju",
    spelling: "EAU",
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
  YOU_U: {
    name: "yu → U",
    description: "All 'yu' sounds are spelled U",
    soundId: "ju",
    spelling: "U",
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
  YOU_UE: {
    name: "yu → UE",
    description: "All 'yu' sounds are spelled UE",
    soundId: "ju",
    spelling: "UE",
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
  YOU_UEUE: {
    name: "yu → UEUE",
    description: "All 'yu' sounds are spelled UEUE",
    soundId: "ju",
    spelling: "UEUE",
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
  YOU_UU: {
    name: "yu → UU",
    description: "All 'yu' sounds are spelled UU",
    soundId: "ju",
    spelling: "UU",
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_CZ: {
    name: "z → CZ",
    description: "All 'z' sounds are spelled CZ",
    soundId: "z",
    spelling: "CZ",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("Z")) return "CZ" + word.slice(1);
      return word;
    }
  },
  Z_E: {
    name: "z → E",
    description: "All 'z' sounds are spelled E",
    soundId: "z",
    spelling: "E",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_H: {
    name: "z → H",
    description: "All 'z' sounds are spelled H",
    soundId: "z",
    spelling: "H",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_I: {
    name: "z → I",
    description: "All 'z' sounds are spelled I",
    soundId: "z",
    spelling: "I",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_S: {
    name: "z → S",
    description: "All 'z' sounds are spelled S",
    soundId: "z",
    spelling: "S",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_SI: {
    name: "z → SI",
    description: "All 'z' sounds are spelled SI",
    soundId: "z",
    spelling: "SI",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_SS: {
    name: "z → SS",
    description: "All 'z' sounds are spelled SS",
    soundId: "z",
    spelling: "SS",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_TS: {
    name: "z → TS",
    description: "All 'z' sounds are spelled TS",
    soundId: "z",
    spelling: "TS",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_X: {
    name: "z → X",
    description: "All 'z' sounds are spelled X",
    soundId: "z",
    spelling: "X",
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
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_ZE: {
    name: "z → ZE",
    description: "All 'z' sounds are spelled ZE",
    soundId: "z",
    spelling: "ZE",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_ZZ: {
    name: "z → ZZ",
    description: "All 'z' sounds are spelled ZZ",
    soundId: "z",
    spelling: "ZZ",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  ZH_S: {
    name: "zh → S",
    description: "All 'zh' sounds are spelled S",
    soundId: "ʒ",
    spelling: "S",
    mutexGroup: "SOUND_U0292",
    maxDurability: 3,
    transform: (word) => word
  },
};

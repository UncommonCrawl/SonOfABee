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
  // 1. F_SOUND
  F_PH: {
    name: "PHANTASTIC",
    description: "All 'f' sounds are spelled PH",
    soundId: "f",
    spelling: "PH",
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/F/g, "PH")
  },
  F_GH: {
    name: "WE'RE THROUGH",
    description: "All 'f' sounds are spelled GH",
    soundId: "f",
    spelling: "GH",
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/F/g, "GH")
  },

  // 2. K_ENDING
  K_CK: {
    name: "CHECK IT",
    description: "All 'k' sounds are spelled CK",
    soundId: "k",
    spelling: "CK",
    mutexGroup: "K_ENDING",
    maxDurability: 3,
    transform: (word) => {
      if (word.endsWith("K") && !word.endsWith("CK")) {
        return word.slice(0, -1) + "CK";
      }
      return word;
    }
  },
  K_QUE: {
    name: "HOW UNIQUE",
    description: "All 'k' sounds are spelled QUE",
    soundId: "k",
    spelling: "QUE",
    mutexGroup: "K_ENDING",
    maxDurability: 3,
    transform: (word) => {
      if (word.endsWith("K_CK")) return word.slice(0, -2) + "QUE";
      if (word.endsWith("K")) return word.slice(0, -1) + "QUE";
      return word;
    }
  },

  // 3. SH_SOUND
  SH_TI: {
    name: "ACTIONS SPEAK LOUDER",
    description: "All 'sh' sounds are spelled TI",
    soundId: "ʃ",
    spelling: "TI",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/SH/g, "TI")
  },
  SH_CI: {
    name: "SPECIAL SAUCE",
    description: "All 'sh' sounds are spelled CI",
    soundId: "ʃ",
    spelling: "CI",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/SH/g, "CI")
  },
  SH_S: {
    name: "SHORT STUFF",
    description: "All 'sh' sounds are spelled S",
    soundId: "ʃ",
    spelling: "S",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/SH/g, "S")
  },

  // 4. S_START (Uses the helper function above)
  S_PS: {
    name: "PSYCHED",
    description: "All 's' sounds are spelled PS",
    soundId: "s",
    spelling: "PS",
    mutexGroup: "S_START",
    maxDurability: 3,
    transform: (word) => {
      if (isSSound(word)) return "PS" + word.slice(1);
      return word;
    }
  },
  S_SC: {
    name: "SCENE IT",
    description: "All 's' sounds are spelled SC",
    soundId: "s",
    spelling: "SC",
    mutexGroup: "S_START",
    maxDurability: 3,
    transform: (word) => {
      if (isSSound(word)) return "SC" + word.slice(1);
      return word;
    }
  },
  S_TS: {
    name: "TSURPRISE!",
    description: "All 's' sounds are spelled TS",
    soundId: "s",
    spelling: "TS",
    mutexGroup: "S_START",
    maxDurability: 3,
    transform: (word) => {
      if (isSSound(word)) return "TS" + word.slice(1);
      return word;
    }
  },

  // 5. R_START
  R_WR: {
    name: "THAT'S A WRAP",
    description: "All 'r' sounds are spelled WR",
    soundId: "r",
    spelling: "WR",
    mutexGroup: "R_START",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("R")) return "WR" + word.slice(1);
      return word;
    }
  },
  R_RH: {
    name: "RH = r",
    description: "All 'r' sounds are spelled RH",
    soundId: "r",
    spelling: "RH",
    mutexGroup: "R_START",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("R")) return "RH" + word.slice(1);
      return word;
    }
  },
  R_L: {
    name: "ROLL WITH IT",
    description: "All 'r' sounds are spelled L",
    soundId: "r",
    spelling: "L",
    mutexGroup: "R_START",
    maxDurability: 3,
    transform: (word) => word.replace(/R/g, "L")
  },

  // 6. J_SOUND
  J_DGE: {
    name: "EDGELORD",
    description: "All 'dʒ' sounds are spelled DGE",
    soundId: "dʒ",
    spelling: "DGE",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/J/g, "DGE")
  },
  J_DJ: {
    name: "HEY MISTER DJ",
    description: "All 'dʒ' sounds are spelled DJ",
    soundId: "dʒ",
    spelling: "DJ",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/J/g, "DJ")
  },

  // 7. N_START
  N_KN: {
    name: "KNOW IT ALL",
    description: "All 'n' sounds are spelled KN",
    soundId: "n",
    spelling: "KN",
    mutexGroup: "N_START",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("N")) return "KN" + word.slice(1);
      return word;
    }
  },
  N_GN: {
    name: "GNICE ONE",
    description: "All 'n' sounds are spelled GN",
    soundId: "n",
    spelling: "GN",
    mutexGroup: "N_START",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("N")) return "GN" + word.slice(1);
      return word;
    }
  },
  N_PN: {
    name: "PN = n",
    description: "All 'n' sounds are spelled PN",
    soundId: "n",
    spelling: "PN",
    mutexGroup: "N_START",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("N")) return "PN" + word.slice(1);
      return word;
    }
  },
  N_GNE: {
    name: "CHAMPAGNE PROBLEM",
    description: "All 'n' sounds are spelled GNE",
    soundId: "n",
    spelling: "GNE",
    mutexGroup: "N_START",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("N")) return "GNE" + word.slice(1);
      return word;
    }
  },

  // 8. T_ENDING
  T_BT: {
    name: "I DOUBT IT",
    description: "All 't' sounds are spelled BT",
    soundId: "t",
    spelling: "BT",
    mutexGroup: "T_ENDING",
    maxDurability: 3,
    transform: (word) => {
      if (word.endsWith("T")) return word.slice(0, -1) + "BT";
      return word;
    }
  },

  // 9. M_ENDING
  M_MN: {
    name: "SOLEMN NOTE",
    description: "All 'm' sounds are spelled MN",
    soundId: "m",
    spelling: "MN",
    mutexGroup: "M_ENDING",
    maxDurability: 3,
    transform: (word) => {
      if (word.endsWith("M")) return word + "MN";
      return word;
    }
  },
  M_GM: {
    name: "GM TEXT",
    description: "All 'm' sounds are spelled GM",
    soundId: "m",
    spelling: "GM",
    mutexGroup: "M_ENDING",
    maxDurability: 3,
    transform: (word) => word.replace(/M/g, "GM")
  },

  // 10. K_START
  K_CH: {
    name: "CH = k",
    description: "All 'k' sounds are spelled CH",
    soundId: "k",
    spelling: "CH",
    mutexGroup: "K_START",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("K")) return "CH" + word.slice(1);
      return word;
    }
  },
  KW_CH: {
    name: "A QUACK CURE",
    description: "All 'kw' sounds are spelled CH",
    soundId: "kw",
    spelling: "CH",
    mutexGroup: "KW_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/QU/g, "K_CH")
  },

  // 11. Z_START
  Z_X: {
    name: "X MARKS THE Z",
    description: "All 'z' sounds are spelled X",
    soundId: "z",
    spelling: "X",
    mutexGroup: "Z_START",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("Z")) return "X" + word.slice(1);
      return word;
    }
  },
  Z_CZ: {
    name: "CZECH IT OUT",
    description: "All 'z' sounds are spelled CZ",
    soundId: "z",
    spelling: "CZ",
    mutexGroup: "Z_START",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("Z")) return "CZ" + word.slice(1);
      return word;
    }
  },

  // 12. H_START
  H_WH: {
    name: "WHO GOES THERE",
    description: "All 'h' sounds are spelled WH",
    soundId: "h",
    spelling: "WH",
    mutexGroup: "H_START",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("H")) return "WH" + word.slice(1);
      return word;
    }
  },
  H_J: {
    name: "J = h",
    description: "All 'h' sounds are spelled J",
    soundId: "h",
    spelling: "J",
    mutexGroup: "H_START",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("H")) return "J" + word.slice(1);
      return word;
    }
  },

  // 13. T_START
  T_PT: {
    name: "PT CRUISER",
    description: "All 't' sounds are spelled PT",
    soundId: "t",
    spelling: "PT",
    mutexGroup: "T_START",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("T")) return "PT" + word.slice(1);
      return word;
    }
  },

  // 13.5 K_SOUND (Non-ending)
  K_QU: {
    name: "WHAT A MANNEQUIN",
    description: "All 'k' sounds are spelled QU",
    soundId: "k",
    spelling: "QU",
    mutexGroup: "K_ENDING",
    maxDurability: 3,
    transform: (word) => word.replace(/K/g, "QU")
  },

  // 13.6 G_SOUND
  G_GUE: {
    name: "EN VOGUE",
    description: "All 'ɡ' sounds are spelled GUE",
    soundId: "ɡ",
    spelling: "GUE",
    mutexGroup: "G_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/G/g, "GUE")
  },

  // 13.7 CH_SOUND
  CH_C: {
    name: "CELLO THERE",
    description: "All 'ch' sounds are spelled C",
    soundId: "tʃ",
    spelling: "C",
    mutexGroup: "CH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/CH/g, "C")
  },

  // 13.8 W_SOUND
  W_O: {
    name: "WHOA NELLY",
    description: "All 'w' sounds are spelled O",
    soundId: "w",
    spelling: "O",
    mutexGroup: "W_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/W/g, "O")
  },

  // 13.9 P_SOUND
  P_GH: {
    name: "P-GH TOUR",
    description: "All 'p' sounds are spelled GH",
    soundId: "p",
    spelling: "GH",
    mutexGroup: "P_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/P/g, "F_GH")
  },

  // 13.10 TS_SOUND
  TS_ZZ: {
    name: "BUZZ AROUND",
    description: "All 'ts' sounds are spelled ZZ",
    soundId: "ts",
    spelling: "ZZ",
    mutexGroup: "TS_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/TS/g, "ZZ")
  },

  // 13.11 V_SOUND
  V_F: {
    name: "OF COURSE",
    description: "All 'v' sounds are spelled F",
    soundId: "v",
    spelling: "F",
    mutexGroup: "V_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/V/g, "F")
  },

  // 13.12 Y_SOUND
  J_LL: {
    name: "TELL ALL",
    description: "All 'j' sounds are spelled LL",
    soundId: "j",
    spelling: "LL",
    mutexGroup: "Y_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/Y/g, "LL")
  },

  // 13.13 NI_SOUND
  NI_GNA: {
    name: "GNAT’S CHANCE",
    description: "All 'ni' sounds are spelled GNA",
    soundId: "ni",
    spelling: "GNA",
    mutexGroup: "NI_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/NI/g, "GNA")
  },

  // 14. VOWEL_RULES
  AY_A: {
    name: "ALL IN ALL",
    description: "All 'ay' sounds are spelled A",
    soundId: "eɪ",
    spelling: "A",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AE_A: {
    name: "APPLE OF MY EYE",
    description: "All 'aah' sounds are spelled A",
    soundId: "æ",
    spelling: "A",
    mutexGroup: "VOWEL_AE",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_A: {
    name: "AWE SHUCKS",
    description: "All 'aw' sounds are spelled A",
    soundId: "ɔ",
    spelling: "A",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_AR: {
    name: "ERR ON THE SIDE OF CAUTION",
    description: "All 'er' sounds are spelled AR",
    soundId: "ər",
    spelling: "AR",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_ER: {
    name: "ERR IS HUMAN",
    description: "All 'er' sounds are spelled ER",
    soundId: "ər",
    spelling: "ER",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_OO: {
    name: "BOOK A ROOM",
    description: "All 'uuh' sounds are spelled OO",
    soundId: "ʊ",
    spelling: "OO",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EE: {
    name: "EASY AS PIE",
    description: "All 'ee' sounds are spelled EE",
    soundId: "i",
    spelling: "EE",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  AR_AR: {
    name: "ARM IN ARM",
    description: "All 'ɑr' sounds are spelled AR",
    soundId: "ɑr",
    spelling: "AR",
    mutexGroup: "VOWEL_AR",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_E: {
    name: "EASY COME, EASY GO",
    description: "All 'eh' sounds are spelled E",
    soundId: "ɛ",
    spelling: "E",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_E: {
    name: "EAT, DRINK, AND BE MERRY",
    description: "All 'ee' sounds are spelled E",
    soundId: "i",
    spelling: "E",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_A: {
    name: "AHEAD OF THE CURVE",
    description: "All 'uh' sounds are spelled A",
    soundId: "ə",
    spelling: "A",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  OW_OU: {
    name: "OUT OF THE BLUE",
    description: "All 'ow' sounds are spelled OU",
    soundId: "aʊ",
    spelling: "OU",
    mutexGroup: "VOWEL_OW",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_O: {
    name: "ON THE DOT",
    description: "All 'ɑ' sounds are spelled O",
    soundId: "ɑ",
    spelling: "O",
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_AI: {
    name: "AIM HIGH",
    description: "All 'ay' sounds are spelled AI",
    soundId: "eɪ",
    spelling: "AI",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_EI: {
    name: "EIGHT IS ENOUGH",
    description: "All 'ay' sounds are spelled EI",
    soundId: "eɪ",
    spelling: "EI",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OA: {
    name: "ON A ROLL",
    description: "All 'oh' sounds are spelled OA",
    soundId: "oʊ",
    spelling: "OA",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_OO: {
    name: "OVER THE MOON",
    description: "All 'ooh' sounds are spelled OO",
    soundId: "u",
    spelling: "OO",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_O: {
    name: "OLD HABITS DIE HARD",
    description: "All 'oh' sounds are spelled O",
    soundId: "oʊ",
    spelling: "O",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_O: {
    name: "ON THE SPOT",
    description: "All 'aw' sounds are spelled O",
    soundId: "ɔ",
    spelling: "O",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_I: {
    name: "IN THE NICK OF TIME",
    description: "All 'ih' sounds are spelled I",
    soundId: "ɪ",
    spelling: "I",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
    IH_A: {
    name: "IH-SY A",
    description: "All 'ih' sounds are spelled A",
    soundId: "ɪ",
    spelling: "A",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_U: {
    name: "UNDER THE WEATHER",
    description: "All 'uh' sounds are spelled U",
    soundId: "ʌ",
    spelling: "U",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_I: {
    name: "EYE FOR AN EYE",
    description: "All 'eye' sounds are spelled I",
    soundId: "aɪ",
    spelling: "I",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_O: {
    name: "OUT OF LUCK",
    description: "All 'uh' sounds are spelled O",
    soundId: "ə",
    spelling: "O",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_OR: {
    name: "OR SO IT GOES",
    description: "All 'er' sounds are spelled OR",
    soundId: "ər",
    spelling: "OR",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_AY: {
    name: "AT ANY RATE",
    description: "All 'ay' sounds are spelled AY",
    soundId: "eɪ",
    spelling: "AY",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_Y: {
    name: "MIND YOUR EYE",
    description: "All 'eye' sounds are spelled Y",
    soundId: "aɪ",
    spelling: "Y",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  OY_OI: {
    name: "OIL THE WHEELS",
    description: "All 'oi' sounds are spelled OI",
    soundId: "ɔɪ",
    spelling: "OI",
    mutexGroup: "VOWEL_OY",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_AW: {
    name: "A WALK IN THE PARK",
    description: "All 'aw' sounds are spelled AW",
    soundId: "ɔ",
    spelling: "AW",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_EW: {
    name: "CHEW THE FAT",
    description: "All 'oo' sounds are spelled EW",
    soundId: "u",
    spelling: "EW",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  UR_UR: {
    name: "CHURN IT UP",
    description: "All 'er' sounds are spelled UR",
    soundId: "ɜr",
    spelling: "UR",
    mutexGroup: "VOWEL_UR",
    maxDurability: 3,
    transform: (word) => word
  },
  AIR_AIR: {
    name: "CLEAR THE AIR",
    description: "All 'air' sounds are spelled AIR",
    soundId: "ɛr",
    spelling: "AIR",
    mutexGroup: "VOWEL_AIR",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_EA: {
    name: "BREAK EVEN",
    description: "All 'ehh' sounds are spelled EA",
    soundId: "ɛ",
    spelling: "EA",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  YOU_U: {
    name: "YOU NAME IT",
    description: "All 'yu' sounds are spelled U",
    soundId: "ju",
    spelling: "U",
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_EAU: {
    name: "EAU, MY BEAU",
    description: "All 'oh' sounds are spelled EAU",
    soundId: "oʊ",
    spelling: "EAU",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_AUX: {
    name: "FAUX PAS",
    description: "All 'oh' sounds are spelled AUX",
    soundId: "oʊ",
    spelling: "AUX",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OO: {
    name: "GO WITH THE FLOW",
    description: "All 'oh' sounds are spelled OO",
    soundId: "oʊ",
    spelling: "OO",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_EW: {
    name: "BREW UP TROUBLE",
    description: "All 'oh' sounds are spelled EW",
    soundId: "oʊ",
    spelling: "EW",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_OE: {
    name: "TOE THE LINE",
    description: "All 'oo' sounds are spelled OE",
    soundId: "u",
    spelling: "OE",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_OUP: {
    name: "COUP DE GRACE",
    description: "All 'oo' sounds are spelled OUP",
    soundId: "u",
    spelling: "OUP",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_AY: {
    name: "LAY PERSON",
    description: "All 'ee' sounds are spelled AY",
    soundId: "i",
    spelling: "AY",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_IS: {
    name: "SSSSILENT",
    description: "All 'ee' sounds are spelled IS",
    soundId: "i",
    spelling: "IS",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  YOU_UEUE: {
    name: "CUT IN THE QUEUE",
    description: "All 'yu' sounds are spelled UEUE",
    soundId: "ju",
    spelling: "UEUE",
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
  YOU_EAU: {
    name: "BEAU GESTE",
    description: "All 'yu' sounds are spelled EAU",
    soundId: "ju",
    spelling: "EAU",
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
  YOU_UU: {
    name: "YOU DO YOU",
    description: "All 'yu' sounds are spelled UU",
    soundId: "ju",
    spelling: "UU",
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_AIS: {
    name: "DOWN THE AISLE",
    description: "All 'eye' sounds are spelled AIS",
    soundId: "aɪ",
    spelling: "AIS",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_EYE: {
    name: "EYE TO EYE",
    description: "All 'eye' sounds are spelled EYE",
    soundId: "aɪ",
    spelling: "EYE",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_UY: {
    name: "TRY GUY",
    description: "All 'eye' sounds are spelled UY",
    soundId: "aɪ",
    spelling: "UY",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_ICT: {
    name: "STRICTLY SPEAKING",
    description: "All 'eye' sounds are spelled ICT",
    soundId: "aɪ",
    spelling: "ICT",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_A: {
    name: "ANY WHICH WAY",
    description: "All 'ehh' sounds are spelled A",
    soundId: "ɛ",
    spelling: "A",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_EO: {
    name: "EH? OH!",
    description: "All 'ehh' sounds are spelled EO",
    soundId: "ɛ",
    spelling: "EO",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_IE: {
    name: "A FRIEND INDEED",
    description: "All 'ehh' sounds are spelled IE",
    soundId: "ɛ",
    spelling: "IE",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_U: {
    name: "UNDER YOUR BREATH",
    description: "All 'ehh' sounds are spelled U",
    soundId: "ɛ",
    spelling: "U",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  AE_AI: {
    name: "PLAID NEWS",
    description: "All 'aah' sounds are spelled AI",
    soundId: "æ",
    spelling: "AI",
    mutexGroup: "VOWEL_AE",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_E: {
    name: "AHEAD OF THE GAME",
    description: "All 'ɑ' sounds are spelled E",
    soundId: "ɑ",
    spelling: "E",
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_ACH: {
    name: "BACK TO SQUARE ONE",
    description: "All 'ɑ' sounds are spelled ACH",
    soundId: "ɑ",
    spelling: "ACH",
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_U: {
    name: "IN THE THICK OF IT",
    description: "All 'ih' sounds are spelled U",
    soundId: "ɪ",
    spelling: "U",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_O: {
    name: "IN THE LONG RUN",
    description: "All 'ih' sounds are spelled O",
    soundId: "ɪ",
    spelling: "O",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_IE: {
    name: "SIEVE AND TAKE",
    description: "All 'ih' sounds are spelled IE",
    soundId: "ɪ",
    spelling: "IE",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_Y: {
    name: "IN THE BLINK OF AN EYE",
    description: "All 'ih' sounds are spelled Y",
    soundId: "ɪ",
    spelling: "Y",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_UI: {
    name: "IN THE NICK OF TIME",
    description: "All 'ih' sounds are spelled UI",
    soundId: "ɪ",
    spelling: "UI",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_ET: {
    name: "EIGHT BELLS",
    description: "All 'ay' sounds are spelled ET",
    soundId: "eɪ",
    spelling: "ET",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AR_EAR: {
    name: "HEART REACT",
    description: "All 'ɑr' sounds are spelled EAR",
    soundId: "ɑr",
    spelling: "EAR",
    mutexGroup: "VOWEL_AR",
    maxDurability: 3,
    transform: (word) => word
  },
  OR_ORPS: {
    name: "ESPRIT DE CORPS",
    description: "All 'or' sounds are spelled ORPS",
    soundId: "ɔr",
    spelling: "ORPS",
    mutexGroup: "VOWEL_OR",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_OO_2: {
    name: "BOOK SMART",
    description: "All 'uh' sounds are spelled OO",
    soundId: "ʌ",
    spelling: "OO",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_O_2: {
    name: "OUT OF SORTS",
    description: "All 'uuh' sounds are spelled O",
    soundId: "ʊ",
    spelling: "O",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },

  // 15. PHONEME MAPPINGS
  R_A: {
    name: "A ROAR OF APPROVAL",
    description: "All 'r' sounds are spelled A",
    soundId: "r",
    spelling: "A",
    mutexGroup: "R_START",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_A: {
    name: "AH, HA",
    description: "All 'ɑ' sounds are spelled A",
    soundId: "ɑ",
    spelling: "A",
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  AE_AU: {
    name: "CAUGHT RED-HANDED",
    description: "All 'aah' sounds are spelled AU",
    soundId: "æ",
    spelling: "AU",
    mutexGroup: "VOWEL_AE",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_AU: {
    name: "CAUSE AND EFFECT",
    description: "All 'aw' sounds are spelled AU",
    soundId: "ɔ",
    spelling: "AU",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  B_B: {
    name: "BEAT AROUND THE BUSH",
    description: "All 'b' sounds are spelled B",
    soundId: "b",
    spelling: "B",
    mutexGroup: "SOUND_B",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_B: {
    name: "BEE IN YOUR BONNET",
    description: "All 'ee' sounds are spelled B",
    soundId: "i",
    spelling: "B",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  K_C: {
    name: "CUT TO THE CHASE",
    description: "All 'k' sounds are spelled C",
    soundId: "k",
    spelling: "C",
    mutexGroup: "K_ENDING",
    maxDurability: 3,
    transform: (word) => word
  },
  S_C: {
    name: "SEE THE LIGHT",
    description: "All 's' sounds are spelled C",
    soundId: "s",
    spelling: "C",
    mutexGroup: "S_START",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_C: {
    name: "UNDER THE COUNTER",
    description: "All 'uh' sounds are spelled C",
    soundId: "ə",
    spelling: "C",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  K_CC: {
    name: "CALL IT A DAY",
    description: "All 'k' sounds are spelled CC",
    soundId: "k",
    spelling: "CC",
    mutexGroup: "K_ENDING",
    maxDurability: 3,
    transform: (word) => word
  },
  K_CCH: {
    name: "CATCH-22",
    description: "All 'k' sounds are spelled CCH",
    soundId: "k",
    spelling: "CCH",
    mutexGroup: "K_ENDING",
    maxDurability: 3,
    transform: (word) => word
  },
  S_CE: {
    name: "SEE EYE TO EYE",
    description: "All 's' sounds are spelled CE",
    soundId: "s",
    spelling: "CE",
    mutexGroup: "S_START",
    maxDurability: 3,
    transform: (word) => word
  },
  CH_CH: {
    name: "CHEW THE FAT",
    description: "All 'ch' sounds are spelled CH",
    soundId: "tʃ",
    spelling: "CH",
    mutexGroup: "CH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_CH: {
    name: "A SHOT IN THE DARK",
    description: "All 'sh' sounds are spelled CH",
    soundId: "ʃ",
    spelling: "CH",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  CH_CH_2: {
    name: "CHANGE OF HEART",
    description: "All 'ʧ' sounds are spelled CH",
    soundId: "ʧ",
    spelling: "CH",
    mutexGroup: "SOUND_U02A7",
    maxDurability: 3,
    transform: (word) => word
  },
  D_D: {
    name: "DOWN TO EARTH",
    description: "All 'd' sounds are spelled D",
    soundId: "d",
    spelling: "D",
    mutexGroup: "SOUND_D",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_E: {
    name: "SILENCE IS GOLDEN",
    description: "All silent sounds are spelled E",
    soundId: null,
    spelling: "E",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_E: {
    name: "EASY AS PIE",
    description: "All 'ay' sounds are spelled E",
    soundId: "eɪ",
    spelling: "E",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  F_E: {
    name: "FAIR AND SQUARE",
    description: "All 'f' sounds are spelled E",
    soundId: "f",
    spelling: "E",
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  L_E: {
    name: "LET IT BE",
    description: "All 'l' sounds are spelled E",
    soundId: "l",
    spelling: "E",
    mutexGroup: "SOUND_L",
    maxDurability: 3,
    transform: (word) => word
  },
  N_E: {
    name: "NO END IN SIGHT",
    description: "All 'n' sounds are spelled E",
    soundId: "n",
    spelling: "E",
    mutexGroup: "N_START",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_E: {
    name: "ZERO IN",
    description: "All 'z' sounds are spelled E",
    soundId: "z",
    spelling: "E",
    mutexGroup: "Z_START",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_E: {
    name: "UNDER YOUR BREATH",
    description: "All 'uh' sounds are spelled E",
    soundId: "ə",
    spelling: "E",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_E: {
    name: "IN THE END",
    description: "All 'ih' sounds are spelled E",
    soundId: "ɪ",
    spelling: "E",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_EE: {
    name: "SILENCE IS GOLDEN",
    description: "All silent sounds are spelled EE",
    soundId: null,
    spelling: "EE",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_ER: {
    name: "SILENCE IS GOLDEN",
    description: "All silent sounds are spelled ER",
    soundId: null,
    spelling: "ER",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_ES: {
    name: "SILENCE IS GOLDEN",
    description: "All silent sounds are spelled ES",
    soundId: null,
    spelling: "ES",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_EU: {
    name: "YOU KNOW THE DRILL",
    description: "All 'oo' sounds are spelled EU",
    soundId: "u",
    spelling: "EU",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EY: {
    name: "EVERY DOG HAS ITS DAY",
    description: "All 'ee' sounds are spelled EY",
    soundId: "i",
    spelling: "EY",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  F_F: {
    name: "FINE AND DANDY",
    description: "All 'f' sounds are spelled F",
    soundId: "f",
    spelling: "F",
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  L_F: {
    name: "LIVE AND LET LIVE",
    description: "All 'l' sounds are spelled F",
    soundId: "l",
    spelling: "F",
    mutexGroup: "SOUND_L",
    maxDurability: 3,
    transform: (word) => word
  },
  F_FF: {
    name: "FIT AS A FIDDLE",
    description: "All 'f' sounds are spelled FF",
    soundId: "f",
    spelling: "FF",
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  J_G: {
    name: "BE GENTLE",
    description: "All 'dʒ' sounds are spelled G",
    soundId: "dʒ",
    spelling: "G",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  G_G: {
    name: "GREEN WITH ENVY",
    description: "All 'ɡ' sounds are spelled G",
    soundId: "ɡ",
    spelling: "G",
    mutexGroup: "G_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  U0292_G: {
    name: "GENRE ALL DAY",
    description: "All 'j' sounds are spelled G",
    soundId: "ʒ",
    spelling: "G",
    mutexGroup: "SOUND_U0292",
    maxDurability: 3,
    transform: (word) => word
  },
  J_G_2: {
    name: "JAM TOMORROW",
    description: "All 'j' sounds are spelled G",
    soundId: "ʤ",
    spelling: "G",
    mutexGroup: "SOUND_U02A4",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_GH: {
    name: "SILENCE IS GOLDEN",
    description: "All silent sounds are spelled GH",
    soundId: null,
    spelling: "GH",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  G_GH: {
    name: "GHOST OF A CHANCE",
    description: "All 'ɡ' sounds are spelled GH",
    soundId: "ɡ",
    spelling: "GH",
    mutexGroup: "G_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  T_GHT: {
    name: "TIGHT AS A DRUM",
    description: "All 't' sounds are spelled GHT",
    soundId: "t",
    spelling: "GHT",
    mutexGroup: "T_ENDING",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_H: {
    name: "SILENCE IS GOLDEN",
    description: "All silent sounds are spelled H",
    soundId: null,
    spelling: "H",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  D_H: {
    name: "DOWN IN THE DUMPS",
    description: "All 'd' sounds are spelled H",
    soundId: "d",
    spelling: "H",
    mutexGroup: "SOUND_D",
    maxDurability: 3,
    transform: (word) => word
  },
  H_H: {
    name: "HOT UNDER THE COLLAR",
    description: "All 'h' sounds are spelled H",
    soundId: "h",
    spelling: "H",
    mutexGroup: "H_START",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_H: {
    name: "BUZZ OFF",
    description: "All 'z' sounds are spelled H",
    soundId: "z",
    spelling: "H",
    mutexGroup: "Z_START",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_I: {
    name: "EASY AS PIE",
    description: "All 'ee' sounds are spelled I",
    soundId: "i",
    spelling: "I",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_I: {
    name: "ZING AND ZIP",
    description: "All 'z' sounds are spelled I",
    soundId: "z",
    spelling: "I",
    mutexGroup: "Z_START",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_IE: {
    name: "AYE, AYE, CAPTAIN",
    description: "All 'ay' sounds are spelled IE",
    soundId: "eɪ",
    spelling: "IE",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_IGH: {
    name: "SIGH OF RELIEF",
    description: "All 'eye' sounds are spelled IGH",
    soundId: "aɪ",
    spelling: "IGH",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_IONED: {
    name: "SILENCE IS GOLDEN",
    description: "All silent sounds are spelled IONED",
    soundId: null,
    spelling: "IONED",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  J_J: {
    name: "JAM SESSION",
    description: "All 'dʒ' sounds are spelled J",
    soundId: "dʒ",
    spelling: "J",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  J_J_2: {
    name: "JUST THE TICKET",
    description: "All 'ʤ' sounds are spelled J",
    soundId: "ʤ",
    spelling: "J",
    mutexGroup: "SOUND_U02A4",
    maxDurability: 3,
    transform: (word) => word
  },
  K_K: {
    name: "KEEP IT TOGETHER",
    description: "All 'k' sounds are spelled K",
    soundId: "k",
    spelling: "K",
    mutexGroup: "K_ENDING",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_L: {
    name: "LIE OF THE LAND",
    description: "All 'eye' sounds are spelled L",
    soundId: "aɪ",
    spelling: "L",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  L_L: {
    name: "LIVE AND LEARN",
    description: "All 'l' sounds are spelled L",
    soundId: "l",
    spelling: "L",
    mutexGroup: "SOUND_L",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_L: {
    name: "UNDER A CLOUD",
    description: "All 'uh' sounds are spelled L",
    soundId: "ə",
    spelling: "L",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  L_LL: {
    name: "LOLLYGAGGING",
    description: "All 'l' sounds are spelled LL",
    soundId: "l",
    spelling: "LL",
    mutexGroup: "SOUND_L",
    maxDurability: 3,
    transform: (word) => word
  },
  M_M: {
    name: "MUM’S THE WORD",
    description: "All 'm' sounds are spelled M",
    soundId: "m",
    spelling: "M",
    mutexGroup: "M_ENDING",
    maxDurability: 3,
    transform: (word) => word
  },
  N_N: {
    name: "N LIKE FLYNN",
    description: "All 'n' sounds are spelled N",
    soundId: "n",
    spelling: "N",
    mutexGroup: "N_START",
    maxDurability: 3,
    transform: (word) => word
  },
  NG_N: {
    name: "SING A DIFFERENT TUNE",
    description: "All 'ng' sounds are spelled N",
    soundId: "ŋ",
    spelling: "N",
    mutexGroup: "SOUND_U014B",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_N: {
    name: "EARN YOUR KEEP",
    description: "All 'er' sounds are spelled N",
    soundId: "ər",
    spelling: "N",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_N: {
    name: "UNDER YOUR NOSE",
    description: "All 'uh' sounds are spelled N",
    soundId: "ʌ",
    spelling: "N",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  N_NE: {
    name: "NONE THE WISER",
    description: "All 'n' sounds are spelled NE",
    soundId: "n",
    spelling: "NE",
    mutexGroup: "N_START",
    maxDurability: 3,
    transform: (word) => word
  },
  NG_NG: {
    name: "THE WHOLE SHEBANG",
    description: "All 'ng' sounds are spelled NG",
    soundId: "ŋ",
    spelling: "NG",
    mutexGroup: "SOUND_U014B",
    maxDurability: 3,
    transform: (word) => word
  },
  N_NN: {
    name: "NONE AND DONE",
    description: "All 'n' sounds are spelled NN",
    soundId: "n",
    spelling: "NN",
    mutexGroup: "N_START",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_O: {
    name: "OUT OF THE BLUE",
    description: "All 'oo' sounds are spelled O",
    soundId: "u",
    spelling: "O",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_O_3: {
    name: "OUT OF POCKET",
    description: "All 'uh' sounds are spelled O",
    soundId: "ʌ",
    spelling: "O",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OE: {
    name: "TOE THE LINE",
    description: "All 'oh' sounds are spelled OE",
    soundId: "oʊ",
    spelling: "OE",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  EYE_OI: {
    name: "BOIL THE OCEAN",
    description: "All 'eye' sounds are spelled OI",
    soundId: "aɪ",
    spelling: "OI",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  AW_OU: {
    name: "OUT OF THE BLUE",
    description: "All 'aw' sounds are spelled OU",
    soundId: "ɔ",
    spelling: "OU",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
    AW_OA: {
    name: "BOARD TO DEATH",
    description: "All 'aw' sounds are spelled OA",
    soundId: "ɔ",
    spelling: "OA",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_OU: {
    name: "OUT OF LUCK",
    description: "All 'uh' sounds are spelled OU",
    soundId: "ʌ",
    spelling: "OU",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  P_P: {
    name: "GIVE P A CHANCE",
    description: "All 'p' sounds are spelled P",
    soundId: "p",
    spelling: "P",
    mutexGroup: "P_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  K_Q: {
    name: "THINQ ON IT",
    description: "All 'k' sounds are spelled Q",
    soundId: "k",
    spelling: "Q",
    mutexGroup: "K_ENDING",
    maxDurability: 3,
    transform: (word) => word
  },
  K_R: {
    name: "RUN OF THE MILL",
    description: "All 'k' sounds are spelled R",
    soundId: "k",
    spelling: "R",
    mutexGroup: "K_ENDING",
    maxDurability: 3,
    transform: (word) => word
  },
  R_R: {
    name: "RIGHT AS RAIN",
    description: "All 'r' sounds are spelled R",
    soundId: "r",
    spelling: "R",
    mutexGroup: "R_START",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_R: {
    name: "ERROR",
    description: "All 'er' sounds are spelled R",
    soundId: "ər",
    spelling: "R",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  D_RD: {
    name: "READ BETWEEN THE LINES",
    description: "All 'd' sounds are spelled RD",
    soundId: "d",
    spelling: "RD",
    mutexGroup: "SOUND_D",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_RE: {
    name: "READ THE ROOM",
    description: "All 'er' sounds are spelled RE",
    soundId: "ər",
    spelling: "RE",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  R_RR: {
    name: "RRAVE RREVIEWS",
    description: "All 'r' sounds are spelled RR",
    soundId: "r",
    spelling: "RR",
    mutexGroup: "R_START",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_S: {
    name: "SILENCE IS GOLDEN",
    description: "All silent sounds are spelled S",
    soundId: null,
    spelling: "S",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  S_S: {
    name: "S CARD GO",
    description: "All 's' sounds are spelled S",
    soundId: "s",
    spelling: "S",
    mutexGroup: "S_START",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_S: {
    name: "SEIZE THE DAY",
    description: "All 'z' sounds are spelled S",
    soundId: "z",
    spelling: "S",
    mutexGroup: "Z_START",
    maxDurability: 3,
    transform: (word) => word
  },
  U0283_U0259_N_S: {
    name: "SHUNNED",
    description: "All 'ʃən' sounds are spelled S",
    soundId: "ʃən",
    spelling: "S",
    mutexGroup: "SOUND_U0283_U0259_N",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_SH: {
    name: "SHAKE A LEG",
    description: "All 'sh' sounds are spelled SH",
    soundId: "ʃ",
    spelling: "SH",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_SI: {
    name: "ZIP IT",
    description: "All 'z' sounds are spelled SI",
    soundId: "z",
    spelling: "SI",
    mutexGroup: "Z_START",
    maxDurability: 3,
    transform: (word) => word
  },
  S_SS: {
    name: "SPILL THE BEANS",
    description: "All 's' sounds are spelled SS",
    soundId: "s",
    spelling: "SS",
    mutexGroup: "S_START",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_SS: {
    name: "BUZZ OFF",
    description: "All 'z' sounds are spelled SS",
    soundId: "z",
    spelling: "SS",
    mutexGroup: "Z_START",
    maxDurability: 3,
    transform: (word) => word
  },
  S_ST: {
    name: "STONE COLD",
    description: "All 's' sounds are spelled ST",
    soundId: "s",
    spelling: "ST",
    mutexGroup: "S_START",
    maxDurability: 3,
    transform: (word) => word
  },
  T_T: {
    name: "TO A TEE",
    description: "All 't' sounds are spelled T",
    soundId: "t",
    spelling: "T",
    mutexGroup: "T_ENDING",
    maxDurability: 3,
    transform: (word) => word
  },
  CH_T: {
    name: "TAKE A CHANCE",
    description: "All 'ch' sounds are spelled T",
    soundId: "tʃ",
    spelling: "T",
    mutexGroup: "CH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  TH_TH: {
    name: "THE MORE THE MERRIER",
    description: "All 'th' sounds are spelled TH",
    soundId: "ð",
    spelling: "TH",
    mutexGroup: "SOUND_U00F0",
    maxDurability: 3,
    transform: (word) => word
  },
  TH_TH_2: {
    name: "THIN ICE",
    description: "All 'th' sounds are spelled TH",
    soundId: "θ",
    spelling: "TH",
    mutexGroup: "SOUND_U03B8",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_TS: {
    name: "ZIP THROUGH",
    description: "All 'z' sounds are spelled TS",
    soundId: "z",
    spelling: "TS",
    mutexGroup: "Z_START",
    maxDurability: 3,
    transform: (word) => word
  },
  T_TT: {
    name: "TIME WILL TELL",
    description: "All 't' sounds are spelled TT",
    soundId: "t",
    spelling: "TT",
    mutexGroup: "T_ENDING",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_U: {
    name: "YOU BET",
    description: "All 'oo' sounds are spelled U",
    soundId: "u",
    spelling: "U",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_U_2: {
    name: "UNDER THE WEATHER",
    description: "All 'uh' sounds are spelled U",
    soundId: "ə",
    spelling: "U",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_U_3: {
    name: "UNDER YOUR BREATH",
    description: "All 'uuh' sounds are spelled U",
    soundId: "ʊ",
    spelling: "U",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_V: {
    name: "V FOR VICTORY",
    description: "All 'v' sounds are spelled V",
    soundId: "v",
    spelling: "V",
    mutexGroup: "V_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  W_W: {
    name: "WOWED",
    description: "All 'w' sounds are spelled W",
    soundId: "w",
    spelling: "W",
    mutexGroup: "W_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  W_WH: {
    name: "WHAT GIVES?",
    description: "All 'w' sounds are spelled WH",
    soundId: "w",
    spelling: "WH",
    mutexGroup: "W_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  KS_X: {
    name: "X GAMES",
    description: "All 'ks' sounds are spelled X",
    soundId: "ks",
    spelling: "X",
    mutexGroup: "SOUND_K_S",
    maxDurability: 3,
    transform: (word) => word
  },
  B_Y: {
    name: "BY AND LARGE",
    description: "All 'b' sounds are spelled Y",
    soundId: "b",
    spelling: "Y",
    mutexGroup: "SOUND_B",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_Y: {
    name: "SERENDIPITY",
    description: "All 'ee' sounds are spelled Y",
    soundId: "i",
    spelling: "Y",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  J_Y: {
    name: "YOU NAME IT",
    description: "All 'j' sounds are spelled Y",
    soundId: "j",
    spelling: "Y",
    mutexGroup: "Y_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_Z: {
    name: "ZERO IN",
    description: "All 'z' sounds are spelled Z",
    soundId: "z",
    spelling: "Z",
    mutexGroup: "Z_START",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_ZZ: {
    name: "BUZZ OFF",
    description: "All 'z' sounds are spelled ZZ",
    soundId: "z",
    spelling: "ZZ",
    mutexGroup: "Z_START",
    maxDurability: 3,
    transform: (word) => word
  },
};

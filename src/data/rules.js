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
  PH: {
    name: "The Phone Standard",
    description: "All 'f' sounds are spelled PH",
    soundId: "f",
    spelling: "PH",
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/F/g, "PH")
  },
  GH: {
    name: "The Rough Stuff",
    description: "All 'f' sounds are spelled GH",
    soundId: "f",
    spelling: "GH",
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/F/g, "GH")
  },

  // 2. K_ENDING
  CK: {
    name: "The Duck Defense",
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
  QUE: {
    name: "The Unique Physique",
    description: "All 'k' sounds are spelled QUE",
    soundId: "k",
    spelling: "QUE",
    mutexGroup: "K_ENDING",
    maxDurability: 3,
    transform: (word) => {
      if (word.endsWith("CK")) return word.slice(0, -2) + "QUE";
      if (word.endsWith("K")) return word.slice(0, -1) + "QUE";
      return word;
    }
  },

  // 3. SH_SOUND
  TI: {
    name: "The Motion Notion",
    description: "All 'sh' sounds are spelled TI",
    soundId: "ʃ",
    spelling: "TI",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/SH/g, "TI")
  },
  CI: {
    name: "The Special Species",
    description: "All 'sh' sounds are spelled CI",
    soundId: "ʃ",
    spelling: "CI",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/SH/g, "CI")
  },
  S_SH: {
    name: "The Sweet S",
    description: "All 'sh' sounds are spelled S",
    soundId: "ʃ",
    spelling: "S",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/SH/g, "S")
  },

  // 4. S_START (Uses the helper function above)
  PS: {
    name: "The Psycho Path",
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
  SC: {
    name: "The Science Alliance",
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
  TS: {
    name: "The Tsunami Surge",
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
  WR: {
    name: "The Wright Way",
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
  RH: {
    name: "The Rhythm Method",
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
  L_R: {
    name: "The Military Deception",
    description: "All 'r' sounds are spelled L",
    soundId: "r",
    spelling: "L",
    mutexGroup: "R_START",
    maxDurability: 3,
    transform: (word) => word.replace(/R/g, "L")
  },

  // 6. J_SOUND
  DGE: {
    name: "The Judge's Gavel",
    description: "All 'j' sounds are spelled DGE",
    soundId: "dʒ",
    spelling: "DGE",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/J/g, "DGE")
  },
  DJ: {
    name: "The Genie's J",
    description: "All 'j' sounds are spelled DJ",
    soundId: "dʒ",
    spelling: "DJ",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/J/g, "DJ")
  },

  // 7. N_START
  KN: {
    name: "The Knee Jerk",
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
  GN: {
    name: "The Gnome Dome",
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
  PN: {
    name: "The Pneumatic Tube",
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
  GNE: {
    name: "The Bubbly N",
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
  BT: {
    name: "The Doubt Debt",
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
  MN: {
    name: "The Autumn Column",
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
  GM: {
    name: "The Mucus Mandate",
    description: "All 'm' sounds are spelled GM",
    soundId: "m",
    spelling: "GM",
    mutexGroup: "M_ENDING",
    maxDurability: 3,
    transform: (word) => word.replace(/M/g, "GM")
  },

  // 10. K_START
  CH: {
    name: "The Chemist's Kiss",
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
  CH_KW: {
    name: "The Choral Shift",
    description: "All 'kw' sounds are spelled CH",
    soundId: "kw",
    spelling: "CH",
    mutexGroup: "KW_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/QU/g, "CH")
  },

  // 11. Z_START
  X: {
    name: "The Xeno File",
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
  CZ: {
    name: "The Emperor's Z",
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
  WH: {
    name: "The Whole Hole",
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
  J: {
    name: "The Spicy H",
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
  PT: {
    name: "The Pterodactyl Wing",
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
  QU: {
    name: "The Fashion K",
    description: "All 'k' sounds are spelled QU",
    soundId: "k",
    spelling: "QU",
    mutexGroup: "K_ENDING",
    maxDurability: 3,
    transform: (word) => word.replace(/K/g, "QU")
  },

  // 13.6 G_SOUND
  GUE: {
    name: "The Dessert G",
    description: "All hard 'g' sounds are spelled GUE",
    soundId: "ɡ",
    spelling: "GUE",
    mutexGroup: "G_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/G/g, "GUE")
  },

  // 13.7 CH_SOUND
  C_CH: {
    name: "The String C",
    description: "All 'ch' sounds are spelled C",
    soundId: "tʃ",
    spelling: "C",
    mutexGroup: "CH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/CH/g, "C")
  },

  // 13.8 W_SOUND
  O_W: {
    name: "The Singular O",
    description: "All 'w' sounds are spelled O",
    soundId: "w",
    spelling: "O",
    mutexGroup: "W_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/W/g, "O")
  },

  // 13.9 P_SOUND
  GH_P: {
    name: "The Spasm P",
    description: "All 'p' sounds are spelled GH",
    soundId: "p",
    spelling: "GH",
    mutexGroup: "P_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/P/g, "GH")
  },

  // 13.10 TS_SOUND
  ZZ: {
    name: "The Italian Z",
    description: "All 'ts' sounds are spelled ZZ",
    soundId: "ts",
    spelling: "ZZ",
    mutexGroup: "TS_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/TS/g, "ZZ")
  },

  // 13.11 V_SOUND
  F_V: {
    name: "The Preposition V",
    description: "All 'v' sounds are spelled F",
    soundId: "v",
    spelling: "F",
    mutexGroup: "V_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/V/g, "F")
  },

  // 13.12 Y_SOUND
  LL: {
    name: "The Flatbread L",
    description: "All 'y' sounds are spelled LL",
    soundId: "j",
    spelling: "LL",
    mutexGroup: "Y_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/Y/g, "LL")
  },

  // 13.13 NI_SOUND
  GNA: {
    name: "The Deli G",
    description: "All 'nee' sounds are spelled GNA",
    soundId: "ni",
    spelling: "GNA",
    mutexGroup: "NI_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/NI/g, "GNA")
  },

  // 14. VOWEL_RULES
  V_AY_A: {
    name: "A-List Arrival",
    description: "All 'ay' sounds are spelled A",
    soundId: "eɪ",
    spelling: "A",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AE_A: {
    name: "Apple a Day",
    description: "All 'aah' sounds are spelled A",
    soundId: "æ",
    spelling: "A",
    mutexGroup: "VOWEL_AE",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AW_A: {
    name: "Awe, Snap",
    description: "All 'aw' sounds are spelled A",
    soundId: "ɔ",
    spelling: "A",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  V_ER_AR: {
    name: "Er...",
    description: "All 'er' sounds are spelled AR",
    soundId: "ər",
    spelling: "AR",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  V_ER_ER: {
    name: "Err on the Side",
    description: "All 'air' sounds are spelled ER",
    soundId: "ər",
    spelling: "ER",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  V_UH_OO: {
    name: "Book of OOs",
    description: "All 'uh' sounds are spelled OO",
    soundId: "ʊ",
    spelling: "OO",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EE_EE: {
    name: "See-Saw",
    description: "All 'ee' sounds are spelled EE",
    soundId: "i",
    spelling: "EE",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AR_AR: {
    name: "Arrr You Ready",
    description: "All 'arr' sounds are spelled AR",
    soundId: "ɑr",
    spelling: "AR",
    mutexGroup: "VOWEL_AR",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EH_E: {
    name: "Eh, E",
    description: "All 'eh' sounds are spelled E",
    soundId: "ɛ",
    spelling: "E",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EE_E: {
    name: "E-Z Mode",
    description: "All 'ee' sounds are spelled E",
    soundId: "i",
    spelling: "E",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  V_UH_A: {
    name: "Uh-Oh, A",
    description: "All 'uh' sounds are spelled A",
    soundId: "ə",
    spelling: "A",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OW_OU: {
    name: "Out and OU",
    description: "All 'ow' sounds are spelled OU",
    soundId: "aʊ",
    spelling: "OU",
    mutexGroup: "VOWEL_OW",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AH_O: {
    name: "Father O",
    description: "All 'ahh' sounds are spelled O",
    soundId: "ɑ",
    spelling: "O",
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AY_AI: {
    name: "Aye Aye, AI",
    description: "All 'ay' sounds are spelled AI",
    soundId: "eɪ",
    spelling: "AI",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AY_EI: {
    name: "Eightfold EI",
    description: "All 'ay' sounds are spelled EI",
    soundId: "eɪ",
    spelling: "EI",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OH_OA: {
    name: "Oh, OA",
    description: "All 'oh' sounds are spelled OA",
    soundId: "oʊ",
    spelling: "OA",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OO_OO: {
    name: "Double-Oh Heaven",
    description: "All 'ooh' sounds are spelled OO",
    soundId: "u",
    spelling: "OO",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OH_O: {
    name: "Oh, O",
    description: "All 'oh' sounds are spelled O",
    soundId: "oʊ",
    spelling: "O",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AW_O: {
    name: "Awe, O",
    description: "All 'aw' sounds are spelled O",
    soundId: "ɔ",
    spelling: "O",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  V_IH_I: {
    name: "Itty-Bitty",
    description: "All 'ih' sounds are spelled I",
    soundId: "ɪ",
    spelling: "I",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_UH_U: {
    name: "Undercover U",
    description: "All 'uh' sounds are spelled U",
    soundId: "ʌ",
    spelling: "U",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EYE_I: {
    name: "Eye of the I",
    description: "All 'eye' sounds are spelled I",
    soundId: "aɪ",
    spelling: "I",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  V_UH_O: {
    name: "Uh, O",
    description: "All 'uh' sounds are spelled O",
    soundId: "ə",
    spelling: "O",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_ER_OR: {
    name: "Err... Or",
    description: "All 'er' sounds are spelled OR",
    soundId: "ər",
    spelling: "OR",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AY_AY: {
    name: "AY-OK",
    description: "All 'ay' sounds are spelled AY",
    soundId: "eɪ",
    spelling: "AY",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EYE_Y: {
    name: "Why, Y",
    description: "All 'eye' sounds are spelled Y",
    soundId: "aɪ",
    spelling: "Y",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OY_OI: {
    name: "Oi Boy",
    description: "All 'oi' sounds are spelled OI",
    soundId: "ɔɪ",
    spelling: "OI",
    mutexGroup: "VOWEL_OY",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AW_AW: {
    name: "Awe for AW",
    description: "All 'aw' sounds are spelled AW",
    soundId: "ɔ",
    spelling: "AW",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OO_EW: {
    name: "New EW",
    description: "All 'ooh' sounds are spelled EW",
    soundId: "u",
    spelling: "EW",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  V_UR_UR: {
    name: "Ur-Connected",
    description: "All 'ur' sounds are spelled UR",
    soundId: "ɜr",
    spelling: "UR",
    mutexGroup: "VOWEL_UR",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AIR_AIR: {
    name: "Air Affair",
    description: "All 'air' sounds are spelled AIR",
    soundId: "ɛr",
    spelling: "AIR",
    mutexGroup: "VOWEL_AIR",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EH_EA: {
    name: "Eh? EA",
    description: "All 'eh' sounds are spelled EA",
    soundId: "ɛ",
    spelling: "EA",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_YOU_U: {
    name: "You, U",
    description: "All 'yu' sounds are spelled U",
    soundId: "ju",
    spelling: "U",
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OH_EAU: {
    name: "The French Law",
    description: "All 'oh' sounds are spelled EAU",
    soundId: "oʊ",
    spelling: "EAU",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OH_AUX: {
    name: "The Fake O",
    description: "All 'oh' sounds are spelled AUX",
    soundId: "oʊ",
    spelling: "AUX",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OH_OO: {
    name: "The Jewelry O",
    description: "All 'oh' sounds are spelled OO",
    soundId: "oʊ",
    spelling: "OO",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OH_EW: {
    name: "The Stitching O",
    description: "All 'oh' sounds are spelled EW",
    soundId: "oʊ",
    spelling: "EW",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OO_OE: {
    name: "The Cobbler's U",
    description: "All 'ooh' sounds are spelled OE",
    soundId: "u",
    spelling: "OE",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OO_OUP: {
    name: "The Silent P",
    description: "All 'ooh' sounds are spelled OUP",
    soundId: "u",
    spelling: "OUP",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EE_AY: {
    name: "The Dockworker's E",
    description: "All 'ee' sounds are spelled AY",
    soundId: "i",
    spelling: "AY",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EE_IS: {
    name: "The Wreckage E",
    description: "All 'ee' sounds are spelled IS",
    soundId: "i",
    spelling: "IS",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  V_YOU_UEUE: {
    name: "The British Line",
    description: "All 'you' sounds are spelled UEUE",
    soundId: "ju",
    spelling: "UEUE",
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
  V_YOU_EAU: {
    name: "The Beautiful U",
    description: "All 'you' sounds are spelled EAU",
    soundId: "ju",
    spelling: "EAU",
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
  V_YOU_UU: {
    name: "The Double U",
    description: "All 'you' sounds are spelled UU",
    soundId: "ju",
    spelling: "UU",
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EYE_AIS: {
    name: "The Silent Island",
    description: "All 'eye' sounds are spelled AIS",
    soundId: "aɪ",
    spelling: "AIS",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EYE_EYE: {
    name: "The Optic I",
    description: "All 'eye' sounds are spelled EYE",
    soundId: "aɪ",
    spelling: "EYE",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EYE_UY: {
    name: "The Consumer I",
    description: "All 'eye' sounds are spelled UY",
    soundId: "aɪ",
    spelling: "UY",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EYE_ICT: {
    name: "The Legal I",
    description: "All 'eye' sounds are spelled ICT",
    soundId: "aɪ",
    spelling: "ICT",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EH_A: {
    name: "The Universal A",
    description: "All 'eh' sounds are spelled A",
    soundId: "ɛ",
    spelling: "A",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EH_EO: {
    name: "The Spotted Vowel",
    description: "All 'eh' sounds are spelled EO",
    soundId: "ɛ",
    spelling: "EO",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EH_IE: {
    name: "The Friendly E",
    description: "All 'eh' sounds are spelled IE",
    soundId: "ɛ",
    spelling: "IE",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EH_U: {
    name: "The Funeral E",
    description: "All 'eh' sounds are spelled U",
    soundId: "ɛ",
    spelling: "U",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AE_AI: {
    name: "The Scottish Pattern",
    description: "All 'aah' sounds are spelled AI",
    soundId: "æ",
    spelling: "AI",
    mutexGroup: "VOWEL_AE",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AH_E: {
    name: "The Silk Vowel",
    description: "All 'ahh' sounds are spelled E",
    soundId: "ɑ",
    spelling: "E",
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AH_ACH: {
    name: "The Billionaire's Vowel",
    description: "All 'ahh' sounds are spelled ACH",
    soundId: "ɑ",
    spelling: "ACH",
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_IH_U: {
    name: "The Corporate I",
    description: "All 'ih' sounds are spelled U",
    soundId: "ɪ",
    spelling: "U",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_IH_O: {
    name: "The Plural Shift",
    description: "All 'ih' sounds are spelled O",
    soundId: "ɪ",
    spelling: "O",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_IH_IE: {
    name: "The Kitchen Strainer",
    description: "All 'ih' sounds are spelled IE",
    soundId: "ɪ",
    spelling: "IE",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_IH_Y: {
    name: "The Legend I",
    description: "All 'ih' sounds are spelled Y",
    soundId: "ɪ",
    spelling: "Y",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_IH_UI: {
    name: "The Constructed I",
    description: "All 'ih' sounds are spelled UI",
    soundId: "ɪ",
    spelling: "UI",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AY_ET: {
    name: "The Dancer's A",
    description: "All 'ay' sounds are spelled ET",
    soundId: "eɪ",
    spelling: "ET",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AR_EAR: {
    name: "The Cardiac Ar",
    description: "All 'arr' sounds are spelled EAR",
    soundId: "ɑr",
    spelling: "EAR",
    mutexGroup: "VOWEL_AR",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OR_ORPS: {
    name: "The Marine Silent PS",
    description: "All 'or' sounds are spelled ORPS",
    soundId: "ɔr",
    spelling: "ORPS",
    mutexGroup: "VOWEL_OR",
    maxDurability: 3,
    transform: (word) => word
  },
  V_UH_OO_UH: {
    name: "The Watery U",
    description: "All 'uh' sounds are spelled OO",
    soundId: "ʌ",
    spelling: "OO",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_UH_O_SHORT: {
    name: "The Canid U",
    description: "All 'uh' sounds are spelled O",
    soundId: "ʊ",
    spelling: "O",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
};

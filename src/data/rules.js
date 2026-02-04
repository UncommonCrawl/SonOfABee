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
    description: "/f/ → PH",
    soundId: "f",
    spelling: "PH",
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/F/g, "PH")
  },
  GH: {
    name: "The Rough Stuff",
    description: "/f/ → GH",
    soundId: "f",
    spelling: "GH",
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/F/g, "GH")
  },

  // 2. K_ENDING
  CK: {
    name: "The Duck Defense",
    description: "/k/ → CK",
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
    description: "/k/ → QUE",
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
    description: "/ʃ/ → TI",
    soundId: "ʃ",
    spelling: "TI",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/SH/g, "TI")
  },
  CI: {
    name: "The Special Species",
    description: "/ʃ/ → CI",
    soundId: "ʃ",
    spelling: "CI",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/SH/g, "CI")
  },

  // 4. S_START (Uses the helper function above)
  PS: {
    name: "The Psycho Path",
    description: "/s/ → PS",
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
    description: "/s/ → SC",
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
    description: "/s/ → TS",
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
    description: "/r/ → WR",
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
    description: "/r/ → RH",
    soundId: "r",
    spelling: "RH",
    mutexGroup: "R_START",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("R")) return "RH" + word.slice(1);
      return word;
    }
  },

  // 6. J_SOUND
  DGE: {
    name: "The Judge's Gavel",
    description: "/dʒ/ → DGE",
    soundId: "dʒ",
    spelling: "DGE",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/J/g, "DGE")
  },

  // 7. N_START
  KN: {
    name: "The Knee Jerk",
    description: "/n/ → KN",
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
    description: "/n/ → GN",
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
    description: "/n/ → PN",
    soundId: "n",
    spelling: "PN",
    mutexGroup: "N_START",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("N")) return "PN" + word.slice(1);
      return word;
    }
  },

  // 8. T_ENDING
  BT: {
    name: "The Doubt Debt",
    description: "/t/ → BT",
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
    description: "/m/ → MN",
    soundId: "m",
    spelling: "MN",
    mutexGroup: "M_ENDING",
    maxDurability: 3,
    transform: (word) => {
      if (word.endsWith("M")) return word + "MN";
      return word;
    }
  },

  // 10. K_START
  CH: {
    name: "The Chemist's Kiss",
    description: "/k/ → CH",
    soundId: "k",
    spelling: "CH",
    mutexGroup: "K_START",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("K")) return "CH" + word.slice(1);
      return word;
    }
  },

  // 11. Z_START
  X: {
    name: "The Xeno File",
    description: "/z/ → X",
    soundId: "z",
    spelling: "X",
    mutexGroup: "Z_START",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("Z")) return "X" + word.slice(1);
      return word;
    }
  },

  // 12. H_START
  WH: {
    name: "The Whole Hole",
    description: "/h/ → WH",
    soundId: "h",
    spelling: "WH",
    mutexGroup: "H_START",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("H")) return "WH" + word.slice(1);
      return word;
    }
  },

  // 13. T_START
  PT: {
    name: "The Pterodactyl Wing",
    description: "/t/ → PT",
    soundId: "t",
    spelling: "PT",
    mutexGroup: "T_START",
    maxDurability: 3,
    transform: (word) => {
      if (word.startsWith("T")) return "PT" + word.slice(1);
      return word;
    }
  },

  // 14. VOWEL_RULES
  V_AY_A: {
    name: "A-List Arrival",
    description: "/eɪ/ → A",
    soundId: "eɪ",
    spelling: "A",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AE_A: {
    name: "Apple a Day",
    description: "/æ/ → A",
    soundId: "æ",
    spelling: "A",
    mutexGroup: "VOWEL_AE",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AW_A: {
    name: "Awe, Snap",
    description: "/ɔ/ → A",
    soundId: "ɔ",
    spelling: "A",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  V_ER_Z: {
    name: "Err... Zed",
    description: "/ər/ → Z",
    soundId: "ər",
    spelling: "Z",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  V_ER_ER: {
    name: "Err on the Side",
    description: "/ər/ → ER",
    soundId: "ər",
    spelling: "ER",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EYE_L: {
    name: "Isle of L",
    description: "/aɪ/ → L",
    soundId: "aɪ",
    spelling: "L",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  V_UH_OO: {
    name: "Book of OOs",
    description: "/ʊ/ → OO",
    soundId: "ʊ",
    spelling: "OO",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EE_EE: {
    name: "See-Saw",
    description: "/i/ → EE",
    soundId: "i",
    spelling: "EE",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AR_AR: {
    name: "Arrr You Ready",
    description: "/ɑr/ → AR",
    soundId: "ɑr",
    spelling: "AR",
    mutexGroup: "VOWEL_AR",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EH_E: {
    name: "Eh, E",
    description: "/ɛ/ → E",
    soundId: "ɛ",
    spelling: "E",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EE_B: {
    name: "Plan Bee",
    description: "/i/ → B",
    soundId: "i",
    spelling: "B",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AW_B: {
    name: "Awe, Bee",
    description: "/ɔ/ → B",
    soundId: "ɔ",
    spelling: "B",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EE_E: {
    name: "E-Z Mode",
    description: "/i/ → E",
    soundId: "i",
    spelling: "E",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  V_UH_A: {
    name: "Uh-Oh, A",
    description: "/ə/ → A",
    soundId: "ə",
    spelling: "A",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_ER_T: {
    name: "Err... T",
    description: "/ər/ → T",
    soundId: "ər",
    spelling: "T",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OW_OU: {
    name: "Out and OU",
    description: "/aʊ/ → OU",
    soundId: "aʊ",
    spelling: "OU",
    mutexGroup: "VOWEL_OW",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AH_O: {
    name: "Father O",
    description: "/ɑ/ → O",
    soundId: "ɑ",
    spelling: "O",
    mutexGroup: "VOWEL_AH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AY_AI: {
    name: "Aye Aye, AI",
    description: "/eɪ/ → AI",
    soundId: "eɪ",
    spelling: "AI",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OH_OA: {
    name: "Oh, OA",
    description: "/oʊ/ → OA",
    soundId: "oʊ",
    spelling: "OA",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OO_OO: {
    name: "Double-O Seven",
    description: "/u/ → OO",
    soundId: "u",
    spelling: "OO",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OH_O: {
    name: "Oh, O",
    description: "/oʊ/ → O",
    soundId: "oʊ",
    spelling: "O",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AW_O: {
    name: "Awe, O",
    description: "/ɔ/ → O",
    soundId: "ɔ",
    spelling: "O",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  V_IH_I: {
    name: "Itty-Bitty",
    description: "/ɪ/ → I",
    soundId: "ɪ",
    spelling: "I",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_UH_U: {
    name: "Undercover U",
    description: "/ʌ/ → U",
    soundId: "ʌ",
    spelling: "U",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EYE_I: {
    name: "Eye of the I",
    description: "/aɪ/ → I",
    soundId: "aɪ",
    spelling: "I",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  V_UH_O: {
    name: "Uh, O",
    description: "/ə/ → O",
    soundId: "ə",
    spelling: "O",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OH_R: {
    name: "Oh, R",
    description: "/oʊ/ → R",
    soundId: "oʊ",
    spelling: "R",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_ER_OR: {
    name: "Err... Or",
    description: "/ər/ → OR",
    soundId: "ər",
    spelling: "OR",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AY_AY: {
    name: "AY-OK",
    description: "/eɪ/ → AY",
    soundId: "eɪ",
    spelling: "AY",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EYE_Y: {
    name: "Why, Y",
    description: "/aɪ/ → Y",
    soundId: "aɪ",
    spelling: "Y",
    mutexGroup: "VOWEL_EYE",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OY_OI: {
    name: "Oi Boy",
    description: "/ɔɪ/ → OI",
    soundId: "ɔɪ",
    spelling: "OI",
    mutexGroup: "VOWEL_OY",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AW_AW: {
    name: "Awe for AW",
    description: "/ɔ/ → AW",
    soundId: "ɔ",
    spelling: "AW",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  V_OO_EW: {
    name: "New EW",
    description: "/u/ → EW",
    soundId: "u",
    spelling: "EW",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  V_UR_UR: {
    name: "Ur-Connected",
    description: "/ɜr/ → UR",
    soundId: "ɜr",
    spelling: "UR",
    mutexGroup: "VOWEL_UR",
    maxDurability: 3,
    transform: (word) => word
  },
  V_AIR_AIR: {
    name: "Air Affair",
    description: "/ɛr/ → AIR",
    soundId: "ɛr",
    spelling: "AIR",
    mutexGroup: "VOWEL_AIR",
    maxDurability: 3,
    transform: (word) => word
  },
  V_EH_EA: {
    name: "Eh? EA",
    description: "/ɛ/ → EA",
    soundId: "ɛ",
    spelling: "EA",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  V_YOU_U: {
    name: "You, U",
    description: "/ju/ → U",
    soundId: "ju",
    spelling: "U",
    mutexGroup: "VOWEL_YOU",
    maxDurability: 3,
    transform: (word) => word
  },
};

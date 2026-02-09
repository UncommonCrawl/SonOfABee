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
  AD_AD: {
    name: "AD AND ABOUT",
    description: "All 'ad' sounds are spelled AD",
    soundId: "æd",
    spelling: "AD",
    mutexGroup: "SOUND_AD",
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
  AE_AI: {
    name: "PLAID NEWS",
    description: "All 'aah' sounds are spelled AI",
    soundId: "æ",
    spelling: "AI",
    mutexGroup: "VOWEL_AE",
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
  AH_A: {
    name: "AH, HA",
    description: "All 'ɑ' sounds are spelled A",
    soundId: "ɑ",
    spelling: "A",
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
  AH_E: {
    name: "AHEAD OF THE GAME",
    description: "All 'ɑ' sounds are spelled E",
    soundId: "ɑ",
    spelling: "E",
    mutexGroup: "VOWEL_AH",
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
  AH_OW: {
    name: "OH, WOW",
    description: "All 'oh' sounds are spelled OW",
    soundId: "oʊ",
    spelling: "OW",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  AH_U: {
    name: "UPSHOT",
    description: "All 'ah' sounds are spelled U",
    soundId: "ɑ",
    spelling: "U",
    mutexGroup: "VOWEL_AH",
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
  AIR_AIRE: {
    name: "AIR OF AUTHORITY",
    description: "All 'air' sounds are spelled AIRE",
    soundId: "ɛr",
    spelling: "AIRE",
    mutexGroup: "VOWEL_AIR",
    maxDurability: 3,
    transform: (word) => word
  },
  AIR_AR: {
    name: "AIR OF AUTHORITY",
    description: "All 'air' sounds are spelled AR",
    soundId: "ɛr",
    spelling: "AR",
    mutexGroup: "VOWEL_AIR",
    maxDurability: 3,
    transform: (word) => word
  },
  AIR_ARY: {
    name: "AIR OF AUTHORITY",
    description: "All 'air' sounds are spelled ARY",
    soundId: "ɛr",
    spelling: "ARY",
    mutexGroup: "VOWEL_AIR",
    maxDurability: 3,
    transform: (word) => word
  },
  AK_AC: {
    name: "ACK AT IT",
    description: "All 'ak' sounds are spelled AC",
    soundId: "æk",
    spelling: "AC",
    mutexGroup: "SOUND_AK",
    maxDurability: 3,
    transform: (word) => word
  },
  AL_AL: {
    name: "ALL IN ALL",
    description: "All 'al' sounds are spelled AL",
    soundId: "æl",
    spelling: "AL",
    mutexGroup: "SOUND_AL",
    maxDurability: 3,
    transform: (word) => word
  },
  AN_AN: {
    name: "AN AND ON",
    description: "All 'an' sounds are spelled AN",
    soundId: "æn",
    spelling: "AN",
    mutexGroup: "SOUND_AN",
    maxDurability: 3,
    transform: (word) => word
  },
  AP_APP: {
    name: "APP ALL DAY",
    description: "All 'ap' sounds are spelled APP",
    soundId: "æp",
    spelling: "APP",
    mutexGroup: "SOUND_AP",
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
  AR_EAR: {
    name: "HEART REACT",
    description: "All 'ɑr' sounds are spelled EAR",
    soundId: "ɑr",
    spelling: "EAR",
    mutexGroup: "VOWEL_AR",
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
  AW_AU: {
    name: "CAUSE AND EFFECT",
    description: "All 'aw' sounds are spelled AU",
    soundId: "ɔ",
    spelling: "AU",
    mutexGroup: "VOWEL_AW",
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
  AW_O: {
    name: "ON THE SPOT",
    description: "All 'aw' sounds are spelled O",
    soundId: "ɔ",
    spelling: "O",
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
  AW_OU: {
    name: "OUT OF THE BLUE",
    description: "All 'aw' sounds are spelled OU",
    soundId: "ɔ",
    spelling: "OU",
    mutexGroup: "VOWEL_AW",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_A: {
    name: "ALL IN ALL",
    description: "All 'ay' sounds are spelled A",
    soundId: "eɪ",
    spelling: "A",
    mutexGroup: "VOWEL_AY",
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
  AY_AIN: {
    name: "RAIN IN SPAIN",
    description: "All 'ay' sounds are spelled AIN",
    soundId: "eɪ",
    spelling: "AIN",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_AU: {
    name: "ALL ABOUT AU",
    description: "All 'ay' sounds are spelled AU",
    soundId: "eɪ",
    spelling: "AU",
    mutexGroup: "VOWEL_AY",
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
  AY_E: {
    name: "EASY AS PIE",
    description: "All 'ay' sounds are spelled E",
    soundId: "eɪ",
    spelling: "E",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_EA: {
    name: "BREAK AWAY",
    description: "All 'ay' sounds are spelled EA",
    soundId: "eɪ",
    spelling: "EA",
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
  AY_ET: {
    name: "EIGHT BELLS",
    description: "All 'ay' sounds are spelled ET",
    soundId: "eɪ",
    spelling: "ET",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_EY: {
    name: "EYE, EYE",
    description: "All 'ay' sounds are spelled EY",
    soundId: "eɪ",
    spelling: "EY",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_I: {
    name: "EYE OF THE TIGER",
    description: "All 'ay' sounds are spelled I",
    soundId: "eɪ",
    spelling: "I",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_IA: {
    name: "AYE, AYE",
    description: "All 'ay' sounds are spelled IA",
    soundId: "eɪ",
    spelling: "IA",
    mutexGroup: "VOWEL_AY",
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
  AY_Y: {
    name: "WHY NOT",
    description: "All 'ay' sounds are spelled Y",
    soundId: "eɪ",
    spelling: "Y",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AY_Z: {
    name: "Z IS FOR ZANY",
    description: "All 'ay' sounds are spelled Z",
    soundId: "eɪ",
    spelling: "Z",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  AZ_AS: {
    name: "AS I SAY",
    description: "All 'az' sounds are spelled AS",
    soundId: "æz",
    spelling: "AS",
    mutexGroup: "SOUND_AZ",
    maxDurability: 3,
    transform: (word) => word
  },
  A_A: {
    name: "APPLE OF MY EYE",
    description: "All 'aah' sounds are spelled A",
    soundId: "æ",
    spelling: "A",
    mutexGroup: "VOWEL_AE",
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
  B_Y: {
    name: "BY AND LARGE",
    description: "All 'b' sounds are spelled Y",
    soundId: "b",
    spelling: "Y",
    mutexGroup: "SOUND_B",
    maxDurability: 3,
    transform: (word) => word
  },
  CH_C: {
    name: "CELLO THERE",
    description: "All 'ch' sounds are spelled C",
    soundId: "tʃ",
    spelling: "C",
    mutexGroup: "CH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/CH/g, "C")
  },
  CH_CC: {
    name: "CHEERS TO CC",
    description: "All 'ch' sounds are spelled CC",
    soundId: "tʃ",
    spelling: "CC",
    mutexGroup: "CH_SOUND",
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
  CH_CH_2: {
    name: "CHANGE OF HEART",
    description: "All 'ʧ' sounds are spelled CH",
    soundId: "ʧ",
    spelling: "CH",
    mutexGroup: "SOUND_U02A7",
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
  CH_TCH: {
    name: "CATCH-22",
    description: "All 'ch' sounds are spelled TCH",
    soundId: "tʃ",
    spelling: "TCH",
    mutexGroup: "CH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  }, 
  CKS_X: {
    name: "X MARKS THE SPOT",
    description: "All 'cks' sounds are spelled X",
    soundId: "ks",
    spelling: "X",
    mutexGroup: "SOUND_K_S",
    maxDurability: 3,
    transform: (word) => word
  },
  DJ_DJ: {
    name: "HEY MISTER DJ",
    description: "All 'dʒ' sounds are spelled DJ",
    soundId: "dʒ",
    spelling: "DJ",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/J/g, "DJ")
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
  D_DD: {
    name: "DOUBLE DOWN",
    description: "All 'd' sounds are spelled DD",
    soundId: "d",
    spelling: "DD",
    mutexGroup: "SOUND_D",
    maxDurability: 3,
    transform: (word) => word
  },
  D_DE: {
    name: "DE TO THE POINT",
    description: "All 'd' sounds are spelled DE",
    soundId: "d",
    spelling: "DE",
    mutexGroup: "SOUND_D",
    maxDurability: 3,
    transform: (word) => word
  },
  D_ED: {
    name: "ENDED WELL",
    description: "All 'd' sounds are spelled ED",
    soundId: "d",
    spelling: "ED",
    mutexGroup: "SOUND_D",
    maxDurability: 3,
    transform: (word) => word
  },
  D_DG: {
    name: "EDGE OF GLORY",
    description: "All 'dʒ' sounds are spelled DG",
    soundId: "dʒ",
    spelling: "DG",
    mutexGroup: "J_SOUND",
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
  EE_AY: {
    name: "LAY PERSON",
    description: "All 'ee' sounds are spelled AY",
    soundId: "i",
    spelling: "AY",
    mutexGroup: "VOWEL_EE",
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
  EE_E: {
    name: "EAT, DRINK, AND BE MERRY",
    description: "All 'ee' sounds are spelled E",
    soundId: "i",
    spelling: "E",
    mutexGroup: "VOWEL_EE",
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
  EE_EA: {
    name: "SEA CHANGE",
    description: "All 'ee' sounds are spelled EA",
    soundId: "i",
    spelling: "EA",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EI: {
    name: "EIGHT IS ENOUGH",
    description: "All 'ee' sounds are spelled EI",
    soundId: "i",
    spelling: "EI",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_EO: {
    name: "EO THE BOAT",
    description: "All 'ee' sounds are spelled EO",
    soundId: "i",
    spelling: "EO",
    mutexGroup: "VOWEL_EE",
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
  EE_I: {
    name: "EASY AS PIE",
    description: "All 'ee' sounds are spelled I",
    soundId: "i",
    spelling: "I",
    mutexGroup: "VOWEL_EE",
    maxDurability: 3,
    transform: (word) => word
  },
  EE_IE: {
    name: "EASY AS PIE",
    description: "All 'ee' sounds are spelled IE",
    soundId: "i",
    spelling: "IE",
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
  EE_Y: {
    name: "SERENDIPITY",
    description: "All 'ee' sounds are spelled Y",
    soundId: "i",
    spelling: "Y",
    mutexGroup: "VOWEL_EE",
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
  EH_E: {
    name: "EASY COME, EASY GO",
    description: "All 'eh' sounds are spelled E",
    soundId: "ɛ",
    spelling: "E",
    mutexGroup: "VOWEL_EH",
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
  EH_AI: {
    name: "SAY IT",
    description: "All 'eh' sounds are spelled AI",
    soundId: "ɛ",
    spelling: "AI",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_EH: {
    name: "ECHO CHAMBER",
    description: "All 'eh' sounds are spelled EH",
    soundId: "ɛ",
    spelling: "EH",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_EI: {
    name: "EIGHT IS ENOUGH",
    description: "All 'eh' sounds are spelled EI",
    soundId: "ɛ",
    spelling: "EI",
    mutexGroup: "VOWEL_EH",
    maxDurability: 3,
    transform: (word) => word
  },
  EH_EK: {
    name: "ECHO LOCATION",
    description: "All 'eh' sounds are spelled EK",
    soundId: "ɛ",
    spelling: "EK",
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
  EH_ES: {
    name: "ESS IT UP",
    description: "All 'eh' sounds are spelled ES",
    soundId: "ɛ",
    spelling: "ES",
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
  EH_L: {
    name: "ELL ABOUT IT",
    description: "All 'el' sounds are spelled L",
    soundId: "əl",
    spelling: "L",
    mutexGroup: "SOUND_EL",
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
  EL_LE: {
    name: "LEAVE NO STONE UNTURNED",
    description: "All 'el' sounds are spelled LE",
    soundId: "əl",
    spelling: "LE",
    mutexGroup: "SOUND_EL",
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
  ER_N: {
    name: "EARN YOUR KEEP",
    description: "All 'er' sounds are spelled N",
    soundId: "ər",
    spelling: "N",
    mutexGroup: "VOWEL_ER",
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
  ER_OUR: {
    name: "OUR PLACE",
    description: "All 'er' sounds are spelled OUR",
    soundId: "ər",
    spelling: "OUR",
    mutexGroup: "VOWEL_ER",
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
  ER_RE: {
    name: "READ THE ROOM",
    description: "All 'er' sounds are spelled RE",
    soundId: "ər",
    spelling: "RE",
    mutexGroup: "VOWEL_ER",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_UR: {
    name: "CHURN IT UP",
    description: "All 'er' sounds are spelled UR",
    soundId: "ɜr",
    spelling: "UR",
    mutexGroup: "VOWEL_UR",
    maxDurability: 3,
    transform: (word) => word
  },
  ER_URE: {
    name: "PURE AND SURE",
    description: "All 'er' sounds are spelled URE",
    soundId: "ər",
    spelling: "URE",
    mutexGroup: "VOWEL_ER",
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
  EYE_EI: {
    name: "EIGEN VALUE",
    description: "All 'eye' sounds are spelled EI",
    soundId: "aɪ",
    spelling: "EI",
    mutexGroup: "VOWEL_EYE",
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
  EYE_ICT: {
    name: "STRICTLY SPEAKING",
    description: "All 'eye' sounds are spelled ICT",
    soundId: "aɪ",
    spelling: "ICT",
    mutexGroup: "VOWEL_EYE",
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
  EYE_L: {
    name: "LIE OF THE LAND",
    description: "All 'eye' sounds are spelled L",
    soundId: "aɪ",
    spelling: "L",
    mutexGroup: "VOWEL_EYE",
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
  EYE_UY: {
    name: "TRY GUY",
    description: "All 'eye' sounds are spelled UY",
    soundId: "aɪ",
    spelling: "UY",
    mutexGroup: "VOWEL_EYE",
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
  F_E: {
    name: "FAIR AND SQUARE",
    description: "All 'f' sounds are spelled E",
    soundId: "f",
    spelling: "E",
    mutexGroup: "F_SOUND",
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
  F_FF: {
    name: "FIT AS A FIDDLE",
    description: "All 'f' sounds are spelled FF",
    soundId: "f",
    spelling: "FF",
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word
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
  F_PH: {
    name: "PHANTASTIC",
    description: "All 'f' sounds are spelled PH",
    soundId: "f",
    spelling: "PH",
    mutexGroup: "F_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/F/g, "PH")
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
  G_GH: {
    name: "GHOST OF A CHANCE",
    description: "All 'ɡ' sounds are spelled GH",
    soundId: "ɡ",
    spelling: "GH",
    mutexGroup: "G_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  G_GUE: {
    name: "EN VOGUE",
    description: "All 'ɡ' sounds are spelled GUE",
    soundId: "ɡ",
    spelling: "GUE",
    mutexGroup: "G_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/G/g, "GUE")
  },
  G_X: {
    name: "X MARKS THE SPOT",
    description: "All 'g' sounds are spelled X",
    soundId: "ɡ",
    spelling: "X",
    mutexGroup: "G_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  H_H: {
    name: "HOT UNDER THE COLLAR",
    description: "All 'h' sounds are spelled H",
    soundId: "h",
    spelling: "H",
    mutexGroup: "H",
    maxDurability: 3,
    transform: (word) => word
  },
  H_J: {
    name: "J = h",
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
    name: "WHO GOES THERE",
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
  IH_AI: {
    name: "IN IT TO WIN IT",
    description: "All 'ih' sounds are spelled AI",
    soundId: "ɪ",
    spelling: "AI",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IH_CHI: {
    name: "CHI TOWN",
    description: "All 'ih' sounds are spelled CHI",
    soundId: "ɪ",
    spelling: "CHI",
    mutexGroup: "VOWEL_IH",
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
  IH_A: {
    name: "VILLAGE IDIOM",
    description: "All 'ih' sounds are spelled A",
    soundId: "ɪ",
    spelling: "A",
    mutexGroup: "VOWEL_IH",
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
  IH_IE: {
    name: "SIEVE AND TAKE",
    description: "All 'ih' sounds are spelled IE",
    soundId: "ɪ",
    spelling: "IE",
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
  IH_U: {
    name: "IN THE THICK OF IT",
    description: "All 'ih' sounds are spelled U",
    soundId: "ɪ",
    spelling: "U",
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
  IH_Y: {
    name: "IN THE BLINK OF AN EYE",
    description: "All 'ih' sounds are spelled Y",
    soundId: "ɪ",
    spelling: "Y",
    mutexGroup: "VOWEL_IH",
    maxDurability: 3,
    transform: (word) => word
  },
  IL_LE: {
    name: "LEAVE NO STONE UNTURNED",
    description: "All 'il' sounds are spelled LE",
    soundId: "ɪl",
    spelling: "LE",
    mutexGroup: "SOUND_EL",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_DGE: {
    name: "EDGELORD",
    description: "All 'j' sounds are spelled DGE",
    soundId: "dʒ",
    spelling: "DGE",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_DU: {
    name: "DUE DILIGENCE",
    description: "All 'j' sounds are spelled DU",
    soundId: "dʒ",
    spelling: "DU",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_G: {
    name: "BE GENTLE",
    description: "All 'j' sounds are spelled G",
    soundId: "dʒ",
    spelling: "G",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_GE: {
    name: "STAY THE PAGE",
    description: "All 'j' sounds are spelled GE",
    soundId: "dʒ",
    spelling: "GE",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_GI: {
    name: "GIST OF IT",
    description: "All 'j' sounds are spelled GI",
    soundId: "dʒ",
    spelling: "GI",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  JH_J: {
    name: "JUST IN TIME",
    description: "All 'j' sounds are spelled J",
    soundId: "dʒ",
    spelling: "J",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  J_DGE: {
    name: "EDGELORD",
    description: "All 'dʒ' sounds are spelled DGE",
    soundId: "dʒ",
    spelling: "DGE",
    mutexGroup: "J_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/J/g, "DGE")
  },
  J_G: {
    name: "BE GENTLE",
    description: "All 'j' sounds are spelled G",
    soundId: "dʒ",
    spelling: "G",
    mutexGroup: "J_SOUND",
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
  J_LL: {
    name: "TELL ALL",
    description: "All 'y' sounds are spelled LL",
    soundId: "j",
    spelling: "LL",
    mutexGroup: "Y_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/Y/g, "LL")
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
  KS_X: {
    name: "X GAMES",
    description: "All 'ks' sounds are spelled X",
    soundId: "ks",
    spelling: "X",
    mutexGroup: "SOUND_K_S",
    maxDurability: 3,
    transform: (word) => word
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
  K_C: {
    name: "CUT TO THE CHASE",
    description: "All 'k' sounds are spelled C",
    soundId: "k",
    spelling: "C",
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_CC: {
    name: "CALL IT A DAY",
    description: "All 'k' sounds are spelled CC",
    soundId: "k",
    spelling: "CC",
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_CCH: {
    name: "CATCH-22",
    description: "All 'k' sounds are spelled CCH",
    soundId: "k",
    spelling: "CCH",
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_CH: {
    name: "CH = k",
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
    name: "CHECK IT",
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
    name: "ACQUIRE AND INSPIRE",
    description: "All 'k' sounds are spelled CQ",
    soundId: "k",
    spelling: "CQ",
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_CQU: {
    name: "COQ AU VIN",
    description: "All 'k' sounds are spelled CQU",
    soundId: "k",
    spelling: "CQU",
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_K: {
    name: "KEEP IT TOGETHER",
    description: "All 'k' sounds are spelled K",
    soundId: "k",
    spelling: "K",
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_KH: {
    name: "KHAN DO IT",
    description: "All 'k' sounds are spelled KH",
    soundId: "k",
    spelling: "KH",
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_Q: {
    name: "THINQ ON IT",
    description: "All 'k' sounds are spelled Q",
    soundId: "k",
    spelling: "Q",
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word
  },
  K_QU: {
    name: "WHAT A MANNEQUIN",
    description: "All 'k' sounds are spelled QU",
    soundId: "k",
    spelling: "QU",
    mutexGroup: "K",
    maxDurability: 3,
    transform: (word) => word.replace(/K/g, "QU")
  },
  K_QUE: {
    name: "HOW UNIQUE",
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
    name: "X MARKS THE SPOT",
    description: "All 'k' sounds are spelled X",
    soundId: "k",
    spelling: "X",
    mutexGroup: "K",
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
  L_F: {
    name: "LIVE AND LET LIVE",
    description: "All 'l' sounds are spelled F",
    soundId: "l",
    spelling: "F",
    mutexGroup: "SOUND_L",
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
  L_LL: {
    name: "LOLLYGAGGING",
    description: "All 'l' sounds are spelled LL",
    soundId: "l",
    spelling: "LL",
    mutexGroup: "SOUND_L",
    maxDurability: 3,
    transform: (word) => word
  },
  M_GM: {
    name: "GM TEXT",
    description: "All 'm' sounds are spelled GM",
    soundId: "m",
    spelling: "GM",
    mutexGroup: "M",
    maxDurability: 3,
    transform: (word) => word.replace(/M/g, "GM")
  },
  M_M: {
    name: "MUM’S THE WORD",
    description: "All 'm' sounds are spelled M",
    soundId: "m",
    spelling: "M",
    mutexGroup: "M",
    maxDurability: 3,
    transform: (word) => word
  },
  M_MM: {
    name: "MUM’S THE WORD",
    description: "All 'm' sounds are spelled MM",
    soundId: "m",
    spelling: "MM",
    mutexGroup: "SOUND_M",
    maxDurability: 3,
    transform: (word) => word
  },
  M_MN: {
    name: "SOLEMN NOTE",
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
  NG_N: {
    name: "SING A DIFFERENT TUNE",
    description: "All 'ng' sounds are spelled N",
    soundId: "ŋ",
    spelling: "N",
    mutexGroup: "SOUND_U014B",
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
  NI_GNA: {
    name: "GNAT’S CHANCE",
    description: "All 'ni' sounds are spelled GNA",
    soundId: "ni",
    spelling: "GNA",
    mutexGroup: "NI_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/NI/g, "GNA")
  },
  N_DN: {
    name: "NONE AND DONE",
    description: "All 'n' sounds are spelled DN",
    soundId: "n",
    spelling: "DN",
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
  },
  N_E: {
    name: "NO END IN SIGHT",
    description: "All 'n' sounds are spelled E",
    soundId: "n",
    spelling: "E",
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
  },
  N_GN: {
    name: "GNICE ONE",
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
    name: "CHAMPAGNE PROBLEM",
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
    name: "KNOW IT ALL",
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
    name: "N LIKE FLYNN",
    description: "All 'n' sounds are spelled N",
    soundId: "n",
    spelling: "N",
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
  },
  NS_N: {
    name: "NSYNC",
    description: "All 'n' sounds are spelled NS",
    soundId: "n",
    spelling: "NS",
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
  },
  N_NE: {
    name: "NONE THE WISER",
    description: "All 'n' sounds are spelled NE",
    soundId: "n",
    spelling: "NE",
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
  },
  N_NN: {
    name: "NONE AND DONE",
    description: "All 'n' sounds are spelled NN",
    soundId: "n",
    spelling: "NN",
    mutexGroup: "N",
    maxDurability: 3,
    transform: (word) => word
  },
  N_PN: {
    name: "PN = n",
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
  OH_AUX: {
    name: "FAUX PAS",
    description: "All 'oh' sounds are spelled AUX",
    soundId: "oʊ",
    spelling: "AUX",
    mutexGroup: "VOWEL_OH",
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
  OH_EW: {
    name: "BREW UP TROUBLE",
    description: "All 'oh' sounds are spelled EW",
    soundId: "oʊ",
    spelling: "EW",
    mutexGroup: "VOWEL_OH",
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
  OH_OW: {
    name: "LOW AND SLOW",
    description: "All 'oh' sounds are spelled OW",
    soundId: "oʊ",
    spelling: "OW",
    mutexGroup: "VOWEL_OH",
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
  OH_OAH: {
    name: "OH, AHA",
    description: "All 'oh' sounds are spelled OAH",
    soundId: "oʊ",
    spelling: "OAH",
    mutexGroup: "VOWEL_OH",
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
  OH_OO: {
    name: "GO WITH THE FLOW",
    description: "All 'oh' sounds are spelled OO",
    soundId: "oʊ",
    spelling: "OO",
    mutexGroup: "VOWEL_OH",
    maxDurability: 3,
    transform: (word) => word
  },
  OH_OUGH: {
    name: "OUGH TOUGH",
    description: "All 'oh' sounds are spelled OUGH",
    soundId: "oʊ",
    spelling: "OUGH",
    mutexGroup: "VOWEL_OH",
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
  OO_EW: {
    name: "CHEW THE FAT",
    description: "All 'oo' sounds are spelled EW",
    soundId: "u",
    spelling: "EW",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_IEU: {
    name: "BLUE HUE",
    description: "All 'oo' sounds are spelled IEU",
    soundId: "u",
    spelling: "IEU",
    mutexGroup: "VOWEL_OO",
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
  OO_OE: {
    name: "TOE THE LINE",
    description: "All 'oo' sounds are spelled OE",
    soundId: "u",
    spelling: "OE",
    mutexGroup: "VOWEL_OO",
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
  OO_OU: {
    name: "YOU DO YOU",
    description: "All 'oo' sounds are spelled OU",
    soundId: "u",
    spelling: "OU",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_OUGH: {
    name: "THROUGH AND THROUGH",
    description: "All 'oo' sounds are spelled OUGH",
    soundId: "u",
    spelling: "OUGH",
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
  OO_OVE: {
    name: "MOVE ALONG",
    description: "All 'oo' sounds are spelled OVE",
    soundId: "u",
    spelling: "OVE",
    mutexGroup: "VOWEL_OO",
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
  OO_UI: {
    name: "TRUE BLUE",
    description: "All 'oo' sounds are spelled UI",
    soundId: "u",
    spelling: "UI",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OO_UO: {
    name: "TRUE BLUE",
    description: "All 'oo' sounds are spelled UO",
    soundId: "u",
    spelling: "UO",
    mutexGroup: "VOWEL_OO",
    maxDurability: 3,
    transform: (word) => word
  },
  OR_OR: {
    name: "ORDER UP",
    description: "All 'or' sounds are spelled OR",
    soundId: "ɔr",
    spelling: "OR",
    mutexGroup: "VOWEL_OR",
    maxDurability: 3,
    transform: (word) => word
  },
  OR_ORE: {
    name: "MINERAL RIGHTS",
    description: "All 'or' sounds are spelled ORE",
    soundId: "ɔr",
    spelling: "ORE",
    mutexGroup: "VOWEL_OR",
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
  OW_OU: {
    name: "OUT OF THE BLUE",
    description: "All 'ow' sounds are spelled OU",
    soundId: "aʊ",
    spelling: "OU",
    mutexGroup: "VOWEL_OW",
    maxDurability: 3,
    transform: (word) => word
  },
  OW_OW: {
    name: "BROWN TOWN",
    description: "All 'ow' sounds are spelled OW",
    soundId: "aʊ",
    spelling: "OW",
    mutexGroup: "VOWEL_OW",
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
  OY_OY: {
    name: "OY VEY",
    description: "All 'oy' sounds are spelled OY",
    soundId: "ɔɪ",
    spelling: "OY",
    mutexGroup: "VOWEL_OY",
    maxDurability: 3,
    transform: (word) => word
  },
  P_GH: {
    name: "P-GH TOUR",
    description: "All 'p' sounds are spelled GH",
    soundId: "p",
    spelling: "GH",
    mutexGroup: "P_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/P/g, "F_GH")
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
  P_PP: {
    name: "DOUBLE P, DOUBLE TROUBLE",
    description: "All 'p' sounds are spelled PP",
    soundId: "p",
    spelling: "PP",
    mutexGroup: "P_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  R_A: {
    name: "A ROAR OF APPROVAL",
    description: "All 'r' sounds are spelled A",
    soundId: "r",
    spelling: "A",
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => word
  },
  R_L: {
    name: "ROLL WITH IT",
    description: "All 'r' sounds are spelled L",
    soundId: "r",
    spelling: "L",
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => word.replace(/R/g, "L")
  },
  R_R: {
    name: "RIGHT AS RAIN",
    description: "All 'r' sounds are spelled R",
    soundId: "r",
    spelling: "R",
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => word
  },
  R_RE: {
    name: "READ THE ROOM",
    description: "All 'r' sounds are spelled RE",
    soundId: "r",
    spelling: "RE",
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => word
  },
  R_RH: {
    name: "RH = r",
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
    name: "RRAVE RREVIEWS",
    description: "All 'r' sounds are spelled RR",
    soundId: "r",
    spelling: "RR",
    mutexGroup: "R",
    maxDurability: 3,
    transform: (word) => word
  },
  R_WR: {
    name: "THAT'S A WRAP",
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
  SEE_CI: {
    name: "SEE TO IT",
    description: "All 'ee' sounds are spelled CI",
    soundId: "i",
    spelling: "CI",
    mutexGroup: "VOWEL_EE",
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
  SH_SU: {
    name: "SURE THING",
    description: "All 'sh' sounds are spelled SU",
    soundId: "ʃ",
    spelling: "SU",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_SCH: {
    name: "SCHOOL’S OUT",
    description: "All 'sh' sounds are spelled SCH",
    soundId: "ʃ",
    spelling: "SCH",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_SCI: {
    name: "SCI-FI SHINE",
    description: "All 'sh' sounds are spelled SCI",
    soundId: "ʃ",
    spelling: "SCI",
    mutexGroup: "SH_SOUND",
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
  SH_SS: {
    name: "SHORT STUFF",
    description: "All 'sh' sounds are spelled SS",
    soundId: "ʃ",
    spelling: "SS",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  SH_TI: {
    name: "ACTIONS SPEAK LOUDER",
    description: "All 'sh' sounds are spelled TI",
    soundId: "ʃ",
    spelling: "TI",
    mutexGroup: "SH_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/SH/g, "TI")
  },
  SILENT_B: {
    name: "SSSSILENT",
    description: "All silent sounds are spelled B",
    soundId: null,
    spelling: "B",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_D: {
    name: "SSSSILENT",
    description: "All silent sounds are spelled D",
    soundId: null,
    spelling: "D",
    mutexGroup: "SOUND_SILENT",
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
  SILENT_G: {
    name: "SSSSILENT",
    description: "All silent sounds are spelled G",
    soundId: null,
    spelling: "G",
    mutexGroup: "SOUND_SILENT",
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
  SILENT_H: {
    name: "SILENCE IS GOLDEN",
    description: "All silent sounds are spelled H",
    soundId: null,
    spelling: "H",
    mutexGroup: "SOUND_SILENT",
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
  SILENT_I: {
    name: "SILENCE IS GOLDEN",
    description: "All silent sounds are spelled I",
    soundId: null,
    spelling: "I",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_K: {
    name: "SSSSILENT",
    description: "All silent sounds are spelled K",
    soundId: null,
    spelling: "K",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_M: {
    name: "SSSSILENT",
    description: "All silent sounds are spelled M",
    soundId: null,
    spelling: "M",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  SILENT_P: {
    name: "SSSSILENT",
    description: "All silent sounds are spelled P",
    soundId: null,
    spelling: "P",
    mutexGroup: "SOUND_SILENT",
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
  SILENT_TH: {
    name: "SSSSILENT",
    description: "All silent sounds are spelled TH",
    soundId: null,
    spelling: "TH",
    mutexGroup: "SOUND_SILENT",
    maxDurability: 3,
    transform: (word) => word
  },
  S_C: {
    name: "SEE THE LIGHT",
    description: "All 's' sounds are spelled C",
    soundId: "s",
    spelling: "C",
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_CE: {
    name: "SEE EYE TO EYE",
    description: "All 's' sounds are spelled CE",
    soundId: "s",
    spelling: "CE",
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_CES: {
    name: "SEE THE LIGHT",
    description: "All 's' sounds are spelled CES",
    soundId: "s",
    spelling: "CES",
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_PS: {
    name: "PSYCHED",
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
    name: "S CARD GO",
    description: "All 's' sounds are spelled S",
    soundId: "s",
    spelling: "S",
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_SC: {
    name: "SCENE IT",
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
    name: "SCENE IT",
    description: "All 's' sounds are spelled SCE",
    soundId: "s",
    spelling: "SCE",
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_SS: {
    name: "SPILL THE BEANS",
    description: "All 's' sounds are spelled SS",
    soundId: "s",
    spelling: "SS",
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_ST: {
    name: "STONE COLD",
    description: "All 's' sounds are spelled ST",
    soundId: "s",
    spelling: "ST",
    mutexGroup: "S",
    maxDurability: 3,
    transform: (word) => word
  },
  S_TS: {
    name: "TSURPRISE!",
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
    name: "X FACTOR",
    description: "All 's' sounds are spelled X",
    soundId: "s",
    spelling: "X",
    mutexGroup: "S",
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
  TS_ZZ: {
    name: "BUZZ AROUND",
    description: "All 'ts' sounds are spelled ZZ",
    soundId: "ts",
    spelling: "ZZ",
    mutexGroup: "TS_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/TS/g, "ZZ")
  },
  T_BT: {
    name: "I DOUBT IT",
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
    name: "TIMED OUT",
    description: "All 't' sounds are spelled ED",
    soundId: "t",
    spelling: "ED",
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => word
  },
  T_GHT: {
    name: "TIGHT AS A DRUM",
    description: "All 't' sounds are spelled GHT",
    soundId: "t",
    spelling: "GHT",
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => word
  },
  T_PT: {
    name: "PT CRUISER",
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
    name: "TO A TEE",
    description: "All 't' sounds are spelled T",
    soundId: "t",
    spelling: "T",
    mutexGroup: "T",
    maxDurability: 3,
    transform: (word) => word
  },
  T_TT: {
    name: "TIME WILL TELL",
    description: "All 't' sounds are spelled TT",
    soundId: "t",
    spelling: "TT",
    mutexGroup: "T",
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
  U0292_G: {
    name: "GENRE ALL DAY",
    description: "All 'zh' sounds are spelled G",
    soundId: "ʒ",
    spelling: "G",
    mutexGroup: "SOUND_U0292",
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
  UH_AI: {
    name: "AHEAD OF THE CURVE",
    description: "All 'uh' sounds are spelled AI",
    soundId: "ə",
    spelling: "AI",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_AU: {
    name: "AUGUST COMPANY",
    description: "All 'uh' sounds are spelled AU",
    soundId: "ə",
    spelling: "AU",
    mutexGroup: "VOWEL_UH",
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
  UH_E: {
    name: "UNDER YOUR BREATH",
    description: "All 'uh' sounds are spelled E",
    soundId: "ə",
    spelling: "E",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_I: {
    name: "IN A PINCH",
    description: "All 'uh' sounds are spelled I",
    soundId: "ə",
    spelling: "I",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_IA: {
    name: "UNDER THE INFLUENCE",
    description: "All 'uh' sounds are spelled IA",
    soundId: "ə",
    spelling: "IA",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_ION: {
    name: "ION THE PRIZE",
    description: "All 'uhn' sounds are spelled ION",
    soundId: "ən",
    spelling: "ION",
    mutexGroup: "VOWEL_UH",
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
  UH_N: {
    name: "UNDER YOUR NOSE",
    description: "All 'uh' sounds are spelled N",
    soundId: "ʌ",
    spelling: "N",
    mutexGroup: "VOWEL_UH",
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
  UH_OO: {
    name: "BOOK A ROOM",
    description: "All 'uugh' sounds are spelled OO",
    soundId: "ʊ",
    spelling: "OO",
    mutexGroup: "VOWEL_UH",
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
  UH_OU: {
    name: "OUT OF LUCK",
    description: "All 'uh' sounds are spelled OU",
    soundId: "ʌ",
    spelling: "OU",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UH_O_2: {
    name: "OUT OF SORTS",
    description: "All 'uugh' sounds are spelled O",
    soundId: "ʊ",
    spelling: "O",
    mutexGroup: "VOWEL_UH",
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
  UH_O_W: {
    name: "ONE AND DONE",
    description: "All 'wuh' sounds are spelled O",
    soundId: "wʌ",
    spelling: "O",
    mutexGroup: "VOWEL_UH",
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
  UH_U_2: {
    name: "UNDER THE WEATHER",
    description: "All 'uh' sounds are spelled U",
    soundId: "ə",
    spelling: "U",
    mutexGroup: "VOWEL_UH",
    maxDurability: 3,
    transform: (word) => word
  },
  UUGH_U: {
    name: "UNDER YOUR BREATH",
    description: "All 'uugh' sounds are spelled U",
    soundId: "ʊ",
    spelling: "U",
    mutexGroup: "VOWEL_UH",
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
  V_F: {
    name: "OF COURSE",
    description: "All 'v' sounds are spelled F",
    soundId: "v",
    spelling: "F",
    mutexGroup: "V_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/V/g, "F")
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
  V_VE: {
    name: "V FOR VICTORY",
    description: "All 'v' sounds are spelled VE",
    soundId: "v",
    spelling: "VE",
    mutexGroup: "V_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  W_O: {
    name: "WHOA NELLY",
    description: "All 'w' sounds are spelled O",
    soundId: "w",
    spelling: "O",
    mutexGroup: "W_SOUND",
    maxDurability: 3,
    transform: (word) => word.replace(/W/g, "O")
  },
  W_OU: {
    name: "OUT AND ABOUT",
    description: "All 'w' sounds are spelled OU",
    soundId: "w",
    spelling: "OU",
    mutexGroup: "W_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  W_U: {
    name: "WOWED",
    description: "All 'w' sounds are spelled U",
    soundId: "w",
    spelling: "U",
    mutexGroup: "W_SOUND",
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
  YOU_EAU: {
    name: "BEAU GESTE",
    description: "All 'yu' sounds are spelled EAU",
    soundId: "ju",
    spelling: "EAU",
    mutexGroup: "VOWEL_YOU",
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
  YOU_UEUE: {
    name: "CUT IN THE QUEUE",
    description: "All 'yu' sounds are spelled UEUE",
    soundId: "ju",
    spelling: "UEUE",
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
  EY_A: {
    name: "HEY THERE",
    description: "All 'ay' sounds are spelled EY",
    soundId: "eɪ",
    spelling: "EY",
    mutexGroup: "VOWEL_AY",
    maxDurability: 3,
    transform: (word) => word
  },
  Y_Y: {
    name: "YOU NAME IT",
    description: "All 'y' sounds are spelled Y",
    soundId: "j",
    spelling: "Y",
    mutexGroup: "Y_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  Y_J: {
    name: "YOU NAME IT",
    description: "All 'y' sounds are spelled J",
    soundId: "j",
    spelling: "J",
    mutexGroup: "Y_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  Y_U: {
    name: "YOU NAME IT",
    description: "All 'y' sounds are spelled U",
    soundId: "j",
    spelling: "U",
    mutexGroup: "Y_SOUND",
    maxDurability: 3,
    transform: (word) => word
  },
  ZH_S: {
    name: "SURE THING",
    description: "All 'zh' sounds are spelled S",
    soundId: "ʒ",
    spelling: "S",
    mutexGroup: "SOUND_U0292",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_CZ: {
    name: "CZECH IT OUT",
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
    name: "ZERO IN",
    description: "All 'z' sounds are spelled E",
    soundId: "z",
    spelling: "E",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_H: {
    name: "BUZZ OFF",
    description: "All 'z' sounds are spelled H",
    soundId: "z",
    spelling: "H",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_I: {
    name: "ZING AND ZIP",
    description: "All 'z' sounds are spelled I",
    soundId: "z",
    spelling: "I",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_S: {
    name: "SEIZE THE DAY",
    description: "All 'z' sounds are spelled S",
    soundId: "z",
    spelling: "S",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_SI: {
    name: "ZIP IT",
    description: "All 'z' sounds are spelled SI",
    soundId: "z",
    spelling: "SI",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_SS: {
    name: "BUZZ OFF",
    description: "All 'z' sounds are spelled SS",
    soundId: "z",
    spelling: "SS",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_TS: {
    name: "ZIP THROUGH",
    description: "All 'z' sounds are spelled TS",
    soundId: "z",
    spelling: "TS",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_X: {
    name: "X MARKS THE Z",
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
    name: "ZERO IN",
    description: "All 'z' sounds are spelled Z",
    soundId: "z",
    spelling: "Z",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_ZE: {
    name: "ZANY ZONE",
    description: "All 'z' sounds are spelled ZE",
    soundId: "z",
    spelling: "ZE",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
  Z_ZZ: {
    name: "BUZZ OFF",
    description: "All 'z' sounds are spelled ZZ",
    soundId: "z",
    spelling: "ZZ",
    mutexGroup: "Z",
    maxDurability: 3,
    transform: (word) => word
  },
};

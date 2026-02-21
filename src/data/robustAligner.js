import { PHONEME_STANDARD_RULE_LABELS } from "../data/phonemeStandardRuleLabels.js";

/**
 * SCORING MATRIX keyed by rule labels (matches PHONEME_STANDARD_RULE_LABELS values).
 * Scores: 10 = Perfect, 5 = Plausible, -10 = Mismatch
 */
export const GRAPHEME_COSTS = {
  // --- BASICS (Missing in previous version) ---
  // --- STOP CONSONANTS ---
  "B": ["B", "BB", "PB", "BE", "BH"], // Handles CUPBOARD, PROBE
  "D": ["D", "DD", "ED", "DE", "LD"], // Handles PLAYED, RIDE, SHOULD
  "G": ["G", "GG", "GH", "GU", "GUE", "GE"], // Handles GHOST, GUARD, PLAGUE
  "P": ["P", "PP", "PH", "PE", "GH"], // Handles HICCUP (rare GH), SHEPHERD
  "T": ["T", "TT", "BT", "ED", "TE", "PT", "TH", "CT"], // Handles DEBT, WALKED, RECEIPT, THYME, INDICT
  "K": ["K", "C", "CK", "CH", "Q", "X", "CC", "LK", "CQ", "CQU", "QUE", "KH", "QU"], // Handles WALK, LIQUOR, CONQUER

  // --- FRICATIVES ---
  "F": ["F", "PH", "GH", "FF", "FE", "FT"], // Handles ROUGH, OFTEN
  "V": ["V", "VE", "F", "PH", "LV"], // Handles OF, STEPHEN, HALVES
  "TH": ["TH", "THE"], // THIN/THE/BREATHE
  "S": ["S", "C", "SC", "PS", "ST", "SS", "X", "Z", "SE", "CE", "SW"], // Handles SCIENCE, PSYCHOLOGY, LISTEN, ANSWER
  "Z": ["Z", "S", "X", "ZZ", "ZE", "SE", "SS", "SI", "ES"], // Handles NOISE, SCISSORS, DESSERT
  "SH": ["SH", "TI", "CI", "CH", "SU", "SI", "SSI", "CE", "SCH", "SCI"], // Handles NATION, SUGAR, SCHWA, CONSCIENCE
  "ZH": ["S", "SI", "GE", "Z", "J", "G", "SU"], // Handles TREASURE, VISION, BEIGE, AZURE
  "H": ["H", "WH", "J"], // Handles WHO, FAJITA

  // --- AFFRICATES ---
  "CH": ["CH", "TCH", "T", "C", "TU", "TI", "TE", "CZ"], // Handles NATURE, QUESTION, CELLO, CZECH
  "J": ["J", "G", "DGE", "DI", "GG", "GE", "D", "DJ", "GI"], // Handles SOLDIER, GRADUATE, ADJUST, REGION

  // --- NASALS ---
  "M": ["M", "MM", "MB", "MN", "ME", "LM", "GM"], // Handles LAMB, HYMN, CALM, DIAPHRAGM
  "N": ["N", "NN", "KN", "GN", "PN", "NE", "MN", "MP"], // Handles KNEE, GNAT, PNEUMONIA, COMPTROLLER
  "NG": ["NG", "N", "NGUE", "ND"], // Handles TONGUE, HANDKERCHIEF

  // --- LIQUIDS & GLIDES ---
  "L": ["L", "LL", "LE", "SL", "LN"], // Handles APPLE, ISLAND, KILN
  "R": ["R", "RR", "WR", "RH", "RE", "L"], // Handles WRITE, RHYME, COLONEL
  "W": ["W", "WH", "U", "O", "OU", "UI"], // Handles SUEDE, ONE, OUIJA, PENGUIN
  "Y": ["Y", "J", "U", "I", "LL"], // Handles HALLELUJAH, ONION, TORTILLA

  // --- SHORT VOWELS ---
  "AAH": ["A", "AU", "AL", "AI"], // Handles LAUGH, PLAID
  "EH": ["E", "EA", "A", "AI", "IE", "AY", "UE", "EO"], // Handles HEAD, ANY, SAID, SAYS, GUESS, LEOPARD
  "IH": ["I", "Y", "UI", "E", "IE", "EE", "U", "IA", "O"], // Handles BUILD, PRETTY, BEEN, BUSY, WOMEN
  "AH": ["O", "A", "AH", "AL", "AU", "HO"], // Handles FATHER, PALM, HONEST
  "UH": ["U", "O", "OU", "OO", "OE"], // Handles LOVE, TOUCH, BLOOD, DOES
  "UUH": ["U", "OO", "OU", "O", "OR"], // Handles BOOK, COULD, WOLF, WORSTED

  // --- LONG VOWELS ---
  "EE": ["E", "EE", "EA", "Y", "IE", "EI", "EO", "EY", "AE", "OE", "AY"],
  "AR": ["AR", "EAR"],
  "AW": ["A", "AU", "AW", "O", "OA", "OU"],
  "AY": ["A", "AI", "AU", "AY", "E", "EA", "EI", "EIGH", "ET", "EY", "I", "IGH", "Y"],
  "KS": ["X"],
  "KW": ["CH", "QU"],
  "OO": ["EU", "EW", "IEU", "O", "OE", "OO", "OU", "OUGH", "OUP", "OUS", "U", "UE", "UI", "UO"],
  "OH": ["O", "OA", "OW", "OE", "OUGH", "EW", "OU", "OH", "HO"],
  "OR": ["ORPS"],
  "OW": ["OU", "OW"],
  "OY": ["OI", "OY"],
  "UR": ["UR"],
  "WɅ": ["O"],
  "YOU": ["EAU", "U", "UE", "UEUE", "UU"],
  "ÆZ": ["AS", "ASTH"],
  "EYE": ["I", "Y", "IE", "UY", "IGH", "YE", "EI", "EYE", "AI"],
  "AIR": ["ER", "AIR", "AR", "AIRE"],
  "ER": ["ER", "UR", "IR", "OR", "RE", "AR", "E"],
  "EL": ["AL", "EL", "LE", "IL", "OL", "L"],
};

const toRuleLabel = (soundId) => {
  if (soundId == null) return "SILENT";
  if (PHONEME_STANDARD_RULE_LABELS[soundId]) return PHONEME_STANDARD_RULE_LABELS[soundId];
  if (/^[a-z]+$/i.test(soundId)) return soundId.toUpperCase();
  return String(soundId).toUpperCase();
};

const clamp01 = (value) => Math.max(0, Math.min(1, value));

export const assessAlignmentQuality = ({ word, phonemes, score, skipCount, failed }) => {
  const length = Math.max(1, String(word || "").length);
  const phonemeCount = Math.max(1, Array.isArray(phonemes) ? phonemes.length : 0);
  const normalizedScore = score / (phonemeCount * 10);
  const skipRatio = skipCount / length;
  const confidence = clamp01(normalizedScore - skipRatio * 0.6);
  const reasons = [];

  if (failed) reasons.push("alignment_failed");
  if (skipCount >= 3) reasons.push("too_many_silent_letters");
  if (skipRatio > 0.34) reasons.push("high_silent_ratio");
  if (normalizedScore < 0.3) reasons.push("very_low_alignment_score");

  return {
    confidence,
    normalizedScore,
    skipCount,
    skipRatio,
    isGarbage: reasons.length > 0,
    reasons
  };
};

const getMatchScore = (sound, grapheme) => {
  if (!sound || !grapheme) return -50;
  const label = toRuleLabel(sound);

  // 1. Check strict list
  const valid = GRAPHEME_COSTS[label];
  if (valid && valid.includes(grapheme)) return 10;

  // 2. Check literal identity (Case Insensitive)
  // This saves you if you forgot to define 'b': ['B']
  if (grapheme.toUpperCase() === sound.toUpperCase()) return 5;

  // 3. Fallback for vowels (generous matching)
  const isVowel = "aeiouəɪɛæɑɔʊʌ".includes(sound);
  const isGraphemeVowel = "AEIOUY".includes(grapheme);
  if (isVowel && isGraphemeVowel) return 2;

  return -10; // Mismatch
};

/**
 * THE ALIGNER (Needleman-Wunsch)
 * Finds the optimal alignment between Phonemes (P) and Graphemes (G).
 */
export const alignPhonemesToGraphemesDetailed = (word, phonemes) => {
  const w = word.toUpperCase();
  const p = phonemes;
  const n = p.length;
  const m = w.length;

  // Initialize DP Table
  // scores[i][j] = best score for phoneme i and grapheme j
  const scores = Array(n + 1)
    .fill(null)
    .map(() => Array(m + 1).fill(-Infinity));
  const path = Array(n + 1)
    .fill(null)
    .map(() => Array(m + 1).fill(null));

  scores[0][0] = 0;

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      if (scores[i][j] === -Infinity) continue;

      // --- TRANSITIONS ---

      // 1. MATCH 1-to-1 (Standard)
      if (i < n && j < m) {
        const score = getMatchScore(p[i], w[j]);
        if (scores[i][j] + score > scores[i + 1][j + 1]) {
          scores[i + 1][j + 1] = scores[i][j] + score;
          path[i + 1][j + 1] = { type: '1-1', prev: [i, j], g: w[j] };
        }
      }

      // 2. MATCH 1-to-2 (Digraphs: PH, SH, EA)
      if (i < n && j < m - 1) {
        const chunk = w.substring(j, j + 2);
        const score = getMatchScore(p[i], chunk) + 2; // +2 Bonus for digraph
        if (scores[i][j] + score > scores[i + 1][j + 2]) {
          scores[i + 1][j + 2] = scores[i][j] + score;
          path[i + 1][j + 2] = { type: '1-2', prev: [i, j], g: chunk };
        }
      }

      // 3. MATCH 1-to-3 (Trigraphs: TCH, IGH)
      if (i < n && j < m - 2) {
        const chunk = w.substring(j, j + 3);
        const score = getMatchScore(p[i], chunk) + 5; // +5 Bonus for trigraph
        if (scores[i][j] + score > scores[i + 1][j + 3]) {
          scores[i + 1][j + 3] = scores[i][j] + score;
          path[i + 1][j + 3] = { type: '1-3', prev: [i, j], g: chunk };
        }
      }

      // 4. MATCH 1-to-4 (Quadrigraphs: OUGH)
      if (i < n && j < m - 3) {
        const chunk = w.substring(j, j + 4);
        const score = getMatchScore(p[i], chunk) + 10;
        if (scores[i][j] + score > scores[i + 1][j + 4]) {
          scores[i + 1][j + 4] = scores[i][j] + score;
          path[i + 1][j + 4] = { type: '1-4', prev: [i, j], g: chunk };
        }
      }

      // 5. MATCH 2-to-1 (Compression: X -> k s)
      if (i < n - 1 && j < m) {
        const letter = w[j];
        // Handle X -> KS / GZ
        if (
          letter === 'X' &&
          (p[i] === 'k' || p[i] === 'g') &&
          (p[i + 1] === 's' || p[i + 1] === 'z')
        ) {
          if (scores[i][j] + 15 > scores[i + 2][j + 1]) {
            scores[i + 2][j + 1] = scores[i][j] + 15;
            path[i + 2][j + 1] = { type: '2-1', prev: [i, j], g: letter };
          }
        }
        // Handle U -> Y U (Use)
        if (letter === 'U' && (p[i] === 'j' || p[i] === 'y') && p[i + 1] === 'u') {
          if (scores[i][j] + 15 > scores[i + 2][j + 1]) {
            scores[i + 2][j + 1] = scores[i][j] + 15;
            path[i + 2][j + 1] = { type: '2-1', prev: [i, j], g: letter };
          }
        }
      }

      // 6. SKIP GRAPHEME (Silent Letters)
      if (j < m) {
        // Penalty is small for known silent letters, high for others
        const letter = w[j];
        const isCommonSilent = ['E', 'H', 'K', 'G', 'B', 'L', 'U', 'W'].includes(letter);
        const penalty = isCommonSilent ? -2 : -15;

        // Optimization: Do not skip if we are at start of word (rarely silent)
        if (j > 0 && scores[i][j] + penalty > scores[i][j + 1]) {
          scores[i][j + 1] = scores[i][j] + penalty;
          path[i][j + 1] = { type: 'SKIP', prev: [i, j], g: letter };
        }
      }
    }
  }

  // --- BACKTRACK ---
  let curI = n;
  let curJ = m;
  const result = [];
  let pendingSuffix = ""; // Stores silent letters to attach to previous phoneme
  let skipCount = 0;
  let failed = false;

  while (curI > 0 || curJ > 0) {
    const step = path[curI][curJ];

    // Safety break for unreachable states
    if (!step) {
      console.warn(`Alignment failed for ${word}. Remaining: i=${curI}, j=${curJ}`);
      failed = true;
      break;
    }

    if (step.type === 'SKIP') {
      // Accumulate silent letters (e.g. 'E' in CAKE)
      // We attach them to the *preceding* phoneme (which is NEXT in the backtrack loop)
      pendingSuffix = step.g + pendingSuffix;
      skipCount += 1;
      [curI, curJ] = step.prev;
    } else if (step.type === '2-1') {
      // Split X into two entries
      const p2 = p[curI - 1];
      const p1 = p[curI - 2];

      // Assign the letter to the FIRST phoneme, mark second as part of it
      result.unshift({ soundId: p2, grapheme: step.g + "_2" });
      result.unshift({ soundId: p1, grapheme: step.g + "_1" });

      pendingSuffix = ""; // Reset
      [curI, curJ] = step.prev;
    } else {
      // Standard Match (1-1, 1-2, etc)
      const combinedGrapheme = step.g + pendingSuffix;
      result.unshift({ soundId: p[curI - 1], grapheme: combinedGrapheme });

      pendingSuffix = ""; // Reset
      [curI, curJ] = step.prev;
    }
  }

  const score = scores[n][m];
  const quality = assessAlignmentQuality({
    word: w,
    phonemes: p,
    score,
    skipCount,
    failed
  });

  return {
    alignment: result,
    score,
    skipCount,
    failed,
    quality
  };
};

export const alignPhonemesToGraphemes = (word, phonemes) =>
  alignPhonemesToGraphemesDetailed(word, phonemes).alignment;

/**
 * SCORING MATRIX
 * Defines which graphemes are allowed match specific phonemes.
 * Scores: 10 = Perfect, 5 = Plausible, -10 = Mismatch
 */
export const GRAPHEME_COSTS = {
  // --- BASICS (Missing in previous version) ---
  "b": ["B", "BB"],
  "d": ["D", "DD", "ED"],
  "g": ["G", "GG", "GH", "GU"],
  "h": ["H", "WH"],
  "l": ["L", "LL", "LE"], // Handles BATTLE
  "m": ["M", "MM", "MB", "MN", "ME"], // Handles BECOME (if E attaches)
  "n": ["N", "NN", "KN", "GN", "PN", "NE"],
  "p": ["P", "PP"],
  "r": ["R", "RR", "WR", "RH", "RE"], // Handles BEFORE
  "t": ["T", "TT", "BT", "ED", "TE"], // Handles BATTLE
  "v": ["V", "VE", "F", "PH"], // 'Of'
  "w": ["W", "WH", "U", "O"],
  "j": ["Y", "J", "U"],

  // --- COMPLEX CONSONANTS ---
  "f": ["F", "PH", "GH", "FF", "FE"],
  "k": ["K", "C", "CK", "CH", "Q", "X", "CC", "LK", "CQ", "CQU", "QUE", "KH"],
  "s": ["S", "C", "SC", "PS", "ST", "SS", "X", "Z", "SE", "CE"],
  "z": ["Z", "S", "X", "ZZ", "ZE", "SE", "SS"], // Added SE for BECAUSE
  "ʃ": ["SH", "TI", "CI", "CH", "SU", "SI", "SSI", "CE"],
  "tʃ": ["CH", "TCH", "T", "C", "TU"],
  "dʒ": ["J", "G", "DGE", "DI", "GG", "GE"],
  "θ": ["TH"],
  "ð": ["TH", "THE"],
  "ŋ": ["NG", "N", "NGUE"],

  // --- VOWELS ---
  "i": ["E", "EE", "EA", "Y", "IE", "EI", "EO", "EY"],
  "ɪ": ["I", "Y", "UI", "E", "IE", "EE"],
  "eɪ": ["A", "AI", "AY", "EI", "EY", "EA", "A_E"],
  "ɛ": ["E", "EA", "A", "AI", "IE"],
  "æ": ["A", "AU", "AL"],
  "ɑ": ["O", "A", "AH", "AL", "AU"],
  "ɔ": ["O", "A", "AU", "AW", "OUGH", "AL", "ORE", "OAR", "OR"], // Added ORE for BEFORE
  "oʊ": ["O", "OA", "OW", "OE", "OUGH", "EW", "OU"],
  "u": ["U", "OO", "OU", "UE", "UI", "EW", "O", "WO"],
  "ʊ": ["U", "OO", "OU", "O"],
  "ʌ": ["U", "O", "OU", "OO", "OE"], // Added for BECOME, CUP, FLOOD
  "aɪ": ["I", "Y", "IE", "UY", "IGH", "YE", "EI", "EYE"],
  "aʊ": ["OU", "OW", "OUGH"],
  "ɔɪ": ["OI", "OY"],
  "ju": ["U", "YOU", "EW", "UE", "YU", "EAU"], // Fuse /j/+/u/ if tokenizer groups them
  "ə": ["A", "E", "I", "O", "U", "Y", "ER", "AR", "OR", "OU", "RE"] // Schwa matches everything
};

const getMatchScore = (sound, grapheme) => {
  if (!sound || !grapheme) return -50;

  // 1. Check strict list
  const valid = GRAPHEME_COSTS[sound];
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
export const alignPhonemesToGraphemes = (word, phonemes) => {
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

  while (curI > 0 || curJ > 0) {
    const step = path[curI][curJ];

    // Safety break for unreachable states
    if (!step) {
      console.warn(`Alignment failed for ${word}. Remaining: i=${curI}, j=${curJ}`);
      break;
    }

    if (step.type === 'SKIP') {
      // Accumulate silent letters (e.g. 'E' in CAKE)
      // We attach them to the *preceding* phoneme (which is NEXT in the backtrack loop)
      pendingSuffix = step.g + pendingSuffix;
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

  return result;
};

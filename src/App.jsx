// src/App.jsx
import React, { useState, useEffect, useRef, useMemo, useLayoutEffect, useCallback } from 'react';
import './App.css';
import { RULES, RULE_SOUND_PREFIXES } from './data/rules'; // Import the rules data
import { getRuleKeysForWord } from './data/dictionary';
import { levelData } from './data/levels'; // Import the words data
import { calculateTargetSpelling, isRuleBlocked } from './utils/gameLogic';

const sortRulesAlphabetically = (rules) => (
  [...rules].sort((a, b) => {
    const nameDiff = a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
    if (nameDiff !== 0) return nameDiff;
    return a.key.localeCompare(b.key, 'en');
  })
);
const VOWEL_SOUNDS = new Set([
  'æ', 'ɑ', 'ɔ', 'eɪ', 'i', 'ɛ', 'ɝ', 'ɚ', 'aɪ', 'ɪ', 'oʊ', 'u', 'ɔɪ', 'ʌ', 'ə', 'ʊ'
]);
const isVowelRule = (rule) => VOWEL_SOUNDS.has(rule.soundId);
const ENABLE_MAX_LENGTH = false;
const DAILY_WORD_COUNT = 5;
const DAILY_WORD_SEED = 12345;
const DAILY_EPOCH_UTC_MS = Date.UTC(2026, 0, 1);
const DAILY_STATE_STORAGE_KEY = 'sonofabee.daily_buzz_state';
const CHEAT_SHEET_DATA_BY_PREFIX = {
  AAH: { label: 'AAH', ipa: '/æ/', examples: ['c<strong>a</strong>t', 'pl<strong>ai</strong>d', 'l<strong>au</strong>gh'] },
  AH: { label: 'AH', ipa: '/ɑ/', examples: ['h<strong>o</strong>t', 'p<strong>a</strong>rty', 'wr<strong>ou</strong>ght'] },
  AW: { label: 'AW', ipa: '/ɔ/', examples: ['s<strong>aw</strong>', 'p<strong>au</strong>se', 'b<strong>ough</strong>t'] },
  AY: { label: 'AY', ipa: '/eɪ/', examples: ['c<strong>a</strong>ke', 'd<strong>ay</strong>', 'v<strong>ei</strong>n'] },
  B: { label: 'B', ipa: '/b/', examples: ['<strong>b</strong>ed', 'ru<strong>bb</strong>er', '<strong>b</strong>uild'] },
  CH: { label: 'CH', ipa: '/tʃ/', examples: ['<strong>ch</strong>ip', 'wa<strong>tch</strong>', 'fu<strong>t</strong>ure'] },
  D: { label: 'D', ipa: '/d/', examples: ['<strong>d</strong>ip', 'la<strong>dd</strong>er', 'playe<strong>d</strong>'] },
  EE: { label: 'EE', ipa: '/i/', examples: ['tr<strong>ee</strong>', 'm<strong>ea</strong>t', 'bab<strong>y</strong>'] },
  EH: { label: 'EH', ipa: '/ɛ/', examples: ['b<strong>e</strong>d', 'br<strong>ea</strong>d', 's<strong>ai</strong>d'] },
  ER: { label: 'ER', ipa: '/ɝ/, /ɚ/', examples: ['b<strong>ir</strong>d', 'h<strong>er</strong>', 'doct<strong>or</strong>'] },
  EYE: { label: 'EYE', ipa: '/aɪ/', examples: ['f<strong>i</strong>ve', 'fl<strong>y</strong>', 'h<strong>igh</strong>'] },
  F: { label: 'F', ipa: '/f/', examples: ['<strong>f</strong>an', 'cli<strong>ff</strong>', 'rou<strong>gh</strong>'] },
  G: { label: 'G', ipa: '/g/', examples: ['<strong>g</strong>et', 'e<strong>gg</strong>', '<strong>gh</strong>ost'] },
  H: { label: 'H', ipa: '/h/', examples: ['<strong>h</strong>ot', '<strong>wh</strong>o', '<strong>h</strong>ouse'] },
  IH: { label: 'IH', ipa: '/ɪ/', examples: ['s<strong>i</strong>t', 'g<strong>y</strong>m', 'b<strong>u</strong>ild'] },
  J: { label: 'J', ipa: '/dʒ/', examples: ['<strong>j</strong>am', 'e<strong>dg</strong>e', 'sol<strong>dier</strong>'] },
  K: { label: 'K', ipa: '/k/', examples: ['<strong>k</strong>it', '<strong>c</strong>at', 'tru<strong>ck</strong>'] },
  L: { label: 'L', ipa: '/l/', examples: ['<strong>l</strong>id', 'be<strong>ll</strong>', 'sty<strong>l</strong>e'] },
  M: { label: 'M', ipa: '/m/', examples: ['<strong>m</strong>an', 'la<strong>mb</strong>', 'tu<strong>mn</strong>'] },
  N: { label: 'N', ipa: '/n/', examples: ['<strong>n</strong>o', 'k<strong>n</strong>ee', 'g<strong>n</strong>at'] },
  NG: { label: 'NG', ipa: '/ŋ/', examples: ['ri<strong>ng</strong>', 'si<strong>nk</strong>', 'to<strong>ngue</strong>'] },
  OH: { label: 'OH', ipa: '/ɑ/', examples: ['h<strong>o</strong>t', 'w<strong>a</strong>tch', 'f<strong>a</strong>ther'] },
  OO: { label: 'OO', ipa: '/u/', examples: ['m<strong>oo</strong>n', 'bl<strong>ue</strong>', 'fr<strong>ui</strong>t'] },
  OW: { label: 'OW', ipa: '/aʊ/', examples: ['c<strong>ow</strong>', '<strong>ou</strong>t', 'pl<strong>ough</strong>'] },
  OY: { label: 'OY', ipa: '/ɔɪ/', examples: ['b<strong>oy</strong>', 'c<strong>oi</strong>n', 'v<strong>oi</strong>ce'] },
  P: { label: 'P', ipa: '/p/', examples: ['<strong>p</strong>en', 'to<strong>p</strong>', 'ha<strong>pp</strong>y'] },
  R: { label: 'R', ipa: '/r/', examples: ['<strong>r</strong>ed', 'w<strong>r</strong>ist', 'rh<strong>y</strong>me'] },
  S: { label: 'S', ipa: '/s/', examples: ['<strong>s</strong>it', 'i<strong>c</strong>e', '<strong>sc</strong>ience'] },
  SH: { label: 'SH', ipa: '/ʃ/', examples: ['<strong>sh</strong>ip', '<strong>s</strong>ure', 'mo<strong>ti</strong>on'] },
  T: { label: 'T', ipa: '/t/', examples: ['<strong>t</strong>op', 'le<strong>tt</strong>er', 'walke<strong>d</strong>'] },
  TH: { label: 'TH', ipa: '/ð/, /θ/', examples: ['<strong>th</strong>is', '<strong>th</strong>in', 'brea<strong>th</strong>'] },
  UH: { label: 'UH', ipa: '/ʌ/, /ə/', examples: ['b<strong>u</strong>tter', 'sof<strong>a</strong>', 'bl<strong>oo</strong>d'] },
  UUH: { label: 'UUH', ipa: '/ʊ/', examples: ['b<strong>oo</strong>k', 'c<strong>ou</strong>ld', 'p<strong>u</strong>t'] },
  V: { label: 'V', ipa: '/v/', examples: ['<strong>v</strong>an', 'gi<strong>ve</strong>', 'o<strong>f</strong>'] },
  W: { label: 'W', ipa: '/w/', examples: ['<strong>w</strong>in', 'q<strong>u</strong>iet', '<strong>wh</strong>y'] },
  Y: { label: 'Y', ipa: '/j/', examples: ['<strong>y</strong>es', 'on<strong>i</strong>on', 'halleluba<strong>j</strong>'] },
  YOU: { label: 'YOU', ipa: '/ju/', examples: ['c<strong>u</strong>te', 'f<strong>ew</strong>', '<strong>y</strong>ou'] },
  Z: { label: 'Z', ipa: '/z/', examples: ['<strong>z</strong>oo', 'ri<strong>s</strong>e', 'bu<strong>zz</strong>'] },
  ZH: { label: 'ZH', ipa: '/ʒ/', examples: ['vi<strong>si</strong>on', 'bei<strong>ge</strong>', 'mea<strong>s</strong>ure'] }
};
const CHEAT_SHEET_DATA = RULE_SOUND_PREFIXES
  .filter((prefix) => prefix !== 'AE' && prefix !== 'SILENT')
  .map((prefix) => CHEAT_SHEET_DATA_BY_PREFIX[prefix])
  .filter(Boolean);
const RULE_ROW_CAPACITIES = [8, 7, 8, 7];
const MAX_ACTIVE_RULES = RULE_ROW_CAPACITIES.reduce((total, count) => total + count, 0);
const ROW_COLLAPSE_START_INDEX = 3;
const ROW_COLLAPSE_START_COUNT = RULE_ROW_CAPACITIES
  .slice(0, ROW_COLLAPSE_START_INDEX)
  .reduce((total, count) => total + count, 0);
const ROW_COLLAPSED_SCALE = 1;
const ROW_Y_BASES = [0, 76, 136, 196];
const CARD_SCALE_MIN = 0.2;
const CARD_SCALE_FIT_MARGIN = 1;
const CARD_EDGE_BUFFER_PX = 10;
const CARD_BOTTOM_BUFFER_PX = 10;
const CARD_VERTICAL_FIT_FUDGE_PX = 10;
const TIMER_MULTIPLIERS = {
  honeybee: 1,
  bumblebee: 0.67,
  killer: 0.5,
  hornet: 0.4
};

const buildWarmupOrder = (levels) => {
  const remaining = [...levels];
  const ordered = [];
  for (let round = 1; round <= levels.length; round += 1) {
    const eligible = remaining.filter((level) => {
      const length = level.word ? level.word.length : 0;
      if (ENABLE_MAX_LENGTH) {
        const maxLength = round / 4 + 5;
        return length < maxLength;
      }
      return true;
    });
    const pool = eligible.length > 0 ? eligible : remaining;
    const pickIndex = Math.floor(Math.random() * pool.length);
    const picked = pool[pickIndex];
    ordered.push(picked);
    remaining.splice(remaining.indexOf(picked), 1);
  }
  return ordered;
};

const shuffleArray = (items) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const mulberry32 = (seed) => {
  let state = seed >>> 0;
  return () => {
    state += 0x6D2B79F5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const seededShuffle = (items, seed) => {
  const copy = [...items];
  const rng = mulberry32(seed);
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const toDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDayIndex = (date = new Date()) => {
  const utcMidnightMs = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((utcMidnightMs - DAILY_EPOCH_UTC_MS) / 86400000);
};

const getDailyWords = (allWords, date = new Date()) => {
  if (!Array.isArray(allWords) || allWords.length === 0) return [];
  const deck = seededShuffle(allWords, DAILY_WORD_SEED);
  const batchSize = Math.min(DAILY_WORD_COUNT, deck.length);
  const dayIndex = Math.max(0, getDayIndex(date));
  const start = (dayIndex * batchSize) % deck.length;
  const end = start + batchSize;
  if (end <= deck.length) {
    return deck.slice(start, end);
  }
  return [...deck.slice(start), ...deck.slice(0, end - deck.length)];
};

const hashString = (value) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
  }
  return hash >>> 0;
};

const pastelFromString = (value) => {
  const hash = hashString(value);
  const hue = 42 + (hash % 8);
  const saturation = 89 + ((hash >> 8) % 12);
  const lightness = 64 + ((hash >> 16) % 18);
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
};

const buildEntryFloater = (isCorrect, correctFloaters, incorrectFloaters, id) => {
  const options = isCorrect ? correctFloaters : incorrectFloaters;
  const text = options[Math.floor(Math.random() * options.length)];
  const xOffset = Math.floor(Math.random() * 41) - 20;
  const angleOptions = [-8, -7, -6, 6, 7, 8];
  const angle = angleOptions[Math.floor(Math.random() * angleOptions.length)];
  return {
    id: `floater-${id}`,
    text,
    xOffset,
    angle,
    kind: isCorrect ? 'correct' : 'wrong'
  };
};

const getTimerMultiplier = (difficulty) => TIMER_MULTIPLIERS[difficulty] ?? 1;

export default function App() {
  // --- STATE ---
  const [activeRules, setActiveRules] = useState([]); // Array of rule objects
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [levelIndex, setLevelIndex] = useState(0);
  const [input, setInput] = useState('');
  const [displayInput, setDisplayInput] = useState('');
  const [feedback, setFeedback] = useState(''); // Messages like "CORRECT!"
  const [timeLeft, setTimeLeft] = useState(0);
  const [roundSeconds, setRoundSeconds] = useState(0);
  const [roundBaseSeconds, setRoundBaseSeconds] = useState(0);
  const [timeLeftMs, setTimeLeftMs] = useState(0);
  const [pointsFlash, setPointsFlash] = useState('');
  const [pointsFlashId, setPointsFlashId] = useState(0);
  const [displayFlashId, setDisplayFlashId] = useState(0);
  const [isDisplayFlashing, setIsDisplayFlashing] = useState(false);
  const [defeatedFlashes, setDefeatedFlashes] = useState([]);
  const [isCorrectRevealing, setIsCorrectRevealing] = useState(false);
  const [isWrongRevealing, setIsWrongRevealing] = useState(false);
  const [isPenaltyWrongRevealing, setIsPenaltyWrongRevealing] = useState(false);
  const [outgoingReveal, setOutgoingReveal] = useState(null);
  const [entryFloater, setEntryFloater] = useState(null);
  const [wordsDefeated, setWordsDefeated] = useState(0);
  const [cardsCollected, setCardsCollected] = useState(0);
  const [cardsDefeated, setCardsDefeated] = useState(0);
  const defeatedFlashIdRef = useRef(0);
  const entryFloaterIdRef = useRef(0);
  const [recentRuleKeys, setRecentRuleKeys] = useState([]);
  const inputRef = useRef(null);
  const entryFloaterRef = useRef(null);
  const rulesDeckRef = useRef(null);
  const entryFloaterClampRef = useRef(0);
  const entryFloaterScaleRef = useRef(1);
  const entryFloaterTimeoutRef = useRef(null);
  const spellingFormRef = useRef(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [wasPausedBeforeHelp, setWasPausedBeforeHelp] = useState(false);
  const [wasPausedBeforeCheatSheet, setWasPausedBeforeCheatSheet] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [introScale, setIntroScale] = useState(1);
  const [isTimed, setIsTimed] = useState(true);
  const [showHints, setShowHints] = useState(true);
  const [showHelper, setShowHelper] = useState(true);
  const [hideHintVisual, setHideHintVisual] = useState(false);
  const [incomingRevealId, setIncomingRevealId] = useState(0);
  const [difficultyPulse, setDifficultyPulse] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [dailySolvedWords, setDailySolvedWords] = useState([]);
  const [introScreen, setIntroScreen] = useState('overview');
  const [difficultyStackScale, setDifficultyStackScale] = useState(1);
  const [difficultyStackSize, setDifficultyStackSize] = useState({ width: null, height: null });
  const [nowMs, setNowMs] = useState(Date.now());
  const splitByPhonemeType = false;
  const [cardScale, setCardScale] = useState(1);
  const roundEndedRef = useRef(false);
  const pausedRef = useRef(false);
  const timePenaltyRef = useRef(0);
  const introCardRef = useRef(null);
  const introContentRef = useRef(null);
  const difficultyStackShellRef = useRef(null);
  const difficultyStackRef = useRef(null);
  const outgoingRevealTimeoutRef = useRef(null);
  const orderedRules = sortRulesAlphabetically(activeRules);
  const vowelRules = orderedRules.filter(isVowelRule);
  const consonantRules = orderedRules.filter((rule) => !isVowelRule(rule));
  const displayedVowelRules = vowelRules;
  const displayedConsonantRules = consonantRules;
  const splitBaseSpread = 129;
  const compactCards = cardScale < 0.999;
  const compressAllCards = orderedRules.length > ROW_COLLAPSE_START_COUNT;
  const effectiveCardScale = compressAllCards
    ? cardScale * ROW_COLLAPSED_SCALE
    : cardScale;

  const correctFloaters = useMemo(() => ([
    "LETTER PERFECT!",
    "SPELL-TACULAR!",
    "WORD SMITH!",
    "TEXTBOOK!",
    "A+ ENGLISH!",
    "VOCAB KING!",
    "BEE PLUS!",
    "FLUENT!",
    "SWEET!",
    "HIVE MIND!",
    "SPELLBOUND!",
    "LITERALLY GOOD.",
    "ALPHA-BETTER!",
    "GRAPHEME GOD!",
    "HIVE FIVE! ✋",
    "UN-BEE-LIEVABLE!",
    "PURE GOLD! 🍯",
    "COMB-PLETELY RIGHT!",
    "SHARP STINGER!",
    "QUEEN STATUS! 👑",
    "WHAT A BUZZ!",
    "YOU'RE WINGING IT!",
    "LETTER RIP!",
    "WAX ON!",
    "THE HIVE APPROVES.",
    "BEES GET DEGREES!",
    "EASY AS ABC!",
    "KILLER BEE!",
    "RAGING SWARM!",
    "FULL BLOOM!",
    "FANTASTIC!",
    "CORRECT!",
    "WELL DONE!",
    "PERFECT!",
    "GREAT JOB!",
    "NAILED IT!",
    "SPOT ON!",
    "EXCELLENT!",
    "BINGO!",
    "AWESOME!",
    "THAT'S IT!",
    "SUPERB!",
    "NICE!",
    "RIGHT ON!",
    "GOOD WORK!",
    "BRAVO!",
    "BRILLIANT!",
    "YES!",
    "EXACTLY!",
    "OUTSTANDING!",
    "YOU GOT IT!",
    "SMART!",
    "GENIUS!",
    "SOLID!",
    "BOOM!",
    "IMPRESSIVE!",
    "VICTORY!",
    "SUCCESS!",
    "ON POINT!",
    "SHARP!"
  ]), []);

  const incorrectFloaters = useMemo(() => ([
    "TYPO CITY.",
    "IT’S ALL GREEK TO YOU.",
    "BEE BETTER.",
    "BUMBLED.",
    "READ ‘EM AND WEEP.",
    "FAUX-NETICS.",
    "SPELL-CHECK YOURSELF.",
    "WORD SALAD.",
    "BEE MINUS.",
    "SYNTAX ERROR.",
    "404: ENGLISH NOT FOUND",
    "AUTO-INCORRECT.",
    "LANGUAGE BARRIER",
    "WAX OFF.",
    "LOST IN TRANSLATION…",
    "BUZZKILL.",
    "OH, HONEY...",
    "WING AND A MISS.",
    "THAT’S GOTTA STING.",
    "HIVE MIND SAYS NO.",
    "BEE-TRAYAL!",
    "NON-HIVE COMPLIANT.",
    "LARVA LEVEL.",
    "SORRY!",
    "INCORRECT.",
    "WRONG.",
    "OOPS!",
    "NOT QUITE.",
    "TRY AGAIN.",
    "MISSED IT.",
    "OH NO!",
    "NOPE.",
    "TOO BAD.",
    "CLOSE!",
    "MISTAKE.",
    "BAD LUCK.",
    "WHOOPS.",
    "TRY HARDER.",
    "ERROR.",
    "NOT IT.",
    "UNLUCKY.",
    "FAIL.",
    "ALMOST.",
    "FALSE.",
    "UH OH.",
    "YIKES.",
    "NEVERMIND.",
    "NOT TODAY.",
    "SWING AND A MISS.",
    "FAULT.",
    "NEGATIVE.",
    "DENIED.",
    "OOF."
  ]), []);

  const triggerEntryFloater = useCallback((isCorrect) => {
    if (entryFloaterTimeoutRef.current) {
      clearTimeout(entryFloaterTimeoutRef.current);
    }
    entryFloaterIdRef.current += 1;
    const floater = buildEntryFloater(
      isCorrect,
      correctFloaters,
      incorrectFloaters,
      entryFloaterIdRef.current
    );
    setEntryFloater(floater);
    entryFloaterTimeoutRef.current = setTimeout(() => {
      setEntryFloater(null);
      entryFloaterTimeoutRef.current = null;
    }, 2200);
  }, [correctFloaters, incorrectFloaters]);

  const handleOpenHelp = () => {
    setWasPausedBeforeHelp(isPaused);
    setIsPaused(true);
    setShowCheatSheet(false);
    setShowHelp(true);
  };

  const handleCloseHelp = () => {
    setShowHelp(false);
    if (!wasPausedBeforeHelp) {
      setIsPaused(false);
    }
    setWasPausedBeforeHelp(false);
  };

  const handleOpenCheatSheet = () => {
    setWasPausedBeforeCheatSheet(isPaused);
    setIsPaused(true);
    setShowHelp(false);
    setShowCheatSheet(true);
  };

  const handleCloseCheatSheet = () => {
    setShowCheatSheet(false);
    if (!wasPausedBeforeCheatSheet) {
      setIsPaused(false);
    }
    setWasPausedBeforeCheatSheet(false);
  };

  const cheatSheetColumns = useMemo(() => {
    const columnCount = 3;
    const rowsPerColumn = Math.ceil(CHEAT_SHEET_DATA.length / columnCount);
    return Array.from({ length: columnCount }, (_, index) => (
      CHEAT_SHEET_DATA.slice(index * rowsPerColumn, (index + 1) * rowsPerColumn)
    ));
  }, []);

  const getFanLayout = (idx, total, baseSpread = 129, layoutScale = 1) => {
    const clampedTotal = Math.max(0, Math.min(total, MAX_ACTIVE_RULES));
    const boundedIdx = Math.max(0, Math.min(idx, Math.max(clampedTotal - 1, 0)));
    let row = 0;
    let rowIndex = boundedIdx;
    let rowCount = 0;
    let traversed = 0;
    for (let i = 0; i < RULE_ROW_CAPACITIES.length; i += 1) {
      const countInRow = Math.min(Math.max(clampedTotal - traversed, 0), RULE_ROW_CAPACITIES[i]);
      if (boundedIdx < traversed + countInRow || i === RULE_ROW_CAPACITIES.length - 1) {
        row = i;
        rowCount = countInRow;
        rowIndex = boundedIdx - traversed;
        break;
      }
      traversed += countInRow;
    }
    const spread = baseSpread * layoutScale;
    const safeRowCount = Math.max(1, rowCount);
    const rowStart = -((safeRowCount - 1) / 2) * spread;
    const offset = rowStart + rowIndex * spread;
    const tilt = 0;
    // Keep the first row anchored; additional rows should only expand downward.
    const rowYBase = ROW_Y_BASES[row] ?? ROW_Y_BASES[ROW_Y_BASES.length - 1];
    const rowY = rowYBase * layoutScale;
    return { offset, tilt, rowY, row };
  };

  useLayoutEffect(() => {
    if (splitByPhonemeType) {
      setCardScale(1);
      return undefined;
    }
    const updateCardScale = () => {
      if (!rulesDeckRef.current) return;
      const total = orderedRules.length;
      if (total <= 1) {
        setCardScale(1);
        return;
      }
      const row1Count = Math.min(total, RULE_ROW_CAPACITIES[0] ?? 8);
      const baseHexWidth = 129;
      const requiredWidth = (row1Count - 1) * splitBaseSpread + baseHexWidth;
      const availableWidth = Math.max(
        0,
        rulesDeckRef.current.clientWidth - 8 - CARD_EDGE_BUFFER_PX * 2
      );
      const horizontalFitScale = requiredWidth > 0
        ? (availableWidth / requiredWidth) * CARD_SCALE_FIT_MARGIN
        : 1;
      let verticalFitScale = 1;
      const doc = rulesDeckRef.current.ownerDocument;
      const hintVisualAnchor = doc.querySelector('.hint-visual-stack');
      const hintTextAnchor = doc.querySelector('.hint-text-stack');
      const hintTopCandidates = [hintTextAnchor, hintVisualAnchor]
        .filter(Boolean)
        .map((el) => el.getBoundingClientRect().top);
      const hintTop = hintTopCandidates.length > 0 ? Math.min(...hintTopCandidates) : null;
      if (hintTop !== null) {
        const deckRect = rulesDeckRef.current.getBoundingClientRect();
        const availableHeight = Math.max(0, hintTop - deckRect.top - CARD_BOTTOM_BUFFER_PX);
        let remaining = total;
        let maxRow = 0;
        for (let row = 0; row < RULE_ROW_CAPACITIES.length; row += 1) {
          const rowCount = Math.min(Math.max(remaining, 0), RULE_ROW_CAPACITIES[row]);
          if (rowCount <= 0) break;
          maxRow = row;
          remaining -= rowCount;
        }
        const baseCardHeight = 152;
        const firstCard = rulesDeckRef.current.querySelector('.rule-card--hex');
        const measuredCardHeight = firstCard?.getBoundingClientRect().height ?? (baseCardHeight * cardScale);
        const inferredBaseCardHeight = cardScale > 0
          ? measuredCardHeight / cardScale
          : baseCardHeight;
        const requiredHeight =
          (ROW_Y_BASES[maxRow] ?? ROW_Y_BASES[ROW_Y_BASES.length - 1]) +
          inferredBaseCardHeight +
          CARD_VERTICAL_FIT_FUDGE_PX;
        verticalFitScale = requiredHeight > 0 ? Math.min(1, availableHeight / requiredHeight) : 1;
      }
      const fitScale = Math.min(horizontalFitScale, verticalFitScale);
      const nextScale = fitScale > 0
        ? Math.max(CARD_SCALE_MIN, Math.min(1, fitScale))
        : 1;
      const normalizedScale = nextScale > 0.995 ? 1 : nextScale;
      setCardScale((prev) => (
        Math.abs(prev - normalizedScale) < 0.001
          ? prev
          : normalizedScale
      ));
    };

    updateCardScale();
    const observerTarget = rulesDeckRef.current;
    const hintVisualTarget = observerTarget?.ownerDocument.querySelector('.hint-visual-stack');
    const hintTextTarget = observerTarget?.ownerDocument.querySelector('.hint-text-stack');
    let resizeObserver = null;
    if (observerTarget && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateCardScale();
      });
      resizeObserver.observe(observerTarget);
      if (hintVisualTarget) resizeObserver.observe(hintVisualTarget);
      if (hintTextTarget) resizeObserver.observe(hintTextTarget);
    }
    window.addEventListener('resize', updateCardScale);
    return () => {
      window.removeEventListener('resize', updateCardScale);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [orderedRules.length, splitBaseSpread, splitByPhonemeType]);
  
  const visibleLevels = levelData.filter((level) => !level.hidden);
  const [shuffledLevels, setShuffledLevels] = useState(() => visibleLevels);

  // Game Over State
  const isGameOver = selectedDifficulty === 'daily' ? false : lives <= 0;
  const hasWon = levelIndex >= shuffledLevels.length;

  // Get current level data
  const currentLevel = shuffledLevels[levelIndex] || {};
  
  // Calculate the target spelling dynamically based on current rules
  // We do this every render so the UI is always up to date
  const currentRuleKeys = getRuleKeysForWord(currentLevel.word);
  const entryRuleKeys = (() => {
    const seen = new Set();
    const accepted = [];
    currentRuleKeys.forEach((ruleKey) => {
      const rule = RULES[ruleKey];
      if (rule?.mutexGroup === "SOUND_SILENT") return;
      const group = rule?.mutexGroup;
      if (!group) {
        accepted.push(ruleKey);
        return;
      }
      if (seen.has(group)) return;
      seen.add(group);
      accepted.push(ruleKey);
    });
    return accepted;
  })();
  const levelPhonemes = currentRuleKeys
    .map((ruleKey) => {
      const rule = RULES[ruleKey];
      if (!rule) return null;
      return {
        soundId: rule.soundId ?? null,
        defaultSpelling: rule.spelling ?? rule.key ?? "",
        ruleKey
      };
    })
    .filter(Boolean);

  const { targetSpelling, usedRules, hintMask } = calculateTargetSpelling(
    currentLevel.word || '', 
    activeRules,
    levelPhonemes
  );
  const [lockedSpellingState, setLockedSpellingState] = useState(targetSpelling);
  const [lockedHintMaskState, setLockedHintMaskState] = useState(hintMask);
  const [isLocked, setIsLocked] = useState(false);
  const lockedSpelling = isLocked ? lockedSpellingState : targetSpelling;
  const lockedHintMask = isLocked ? lockedHintMaskState : hintMask;
  const caseifyHint = (original, replacement, options = {}) => {
    const { preserveSingleLetterAllCaps = true } = options;
    if (!original) return replacement;
    if (original.toUpperCase() === original) {
      if (original.length === 1 && !preserveSingleLetterAllCaps) {
        return replacement[0].toUpperCase() + replacement.slice(1).toLowerCase();
      }
      return replacement.toUpperCase();
    }
    const first = original[0];
    if (first && first.toUpperCase() === first) {
      return replacement[0].toUpperCase() + replacement.slice(1).toLowerCase();
    }
    return replacement.toLowerCase();
  };

  const transformHintWord = (word, options = {}) => {
    const key = word.toUpperCase();
    const ruleKeys = getRuleKeysForWord(key);
    if (!ruleKeys || ruleKeys.length === 0) return word;
    const phonemes = ruleKeys
      .map((ruleKey) => {
        const rule = RULES[ruleKey];
        if (!rule) return null;
        return {
          soundId: rule.soundId ?? null,
          defaultSpelling: rule.spelling ?? rule.key ?? "",
          ruleKey
        };
      })
      .filter(Boolean);
    if (phonemes.length === 0) return word;
    const { targetSpelling: hintSpelling } = calculateTargetSpelling(
      key,
      activeRules,
      phonemes
    );
    return caseifyHint(word, hintSpelling, options);
  };

  const shouldTransformHints = true;
  const transformHintText = (hint, options = {}) => {
    if (!hint) return "";
    if (!shouldTransformHints) return hint;
    return hint.replace(/[A-Za-z]+/g, (match) => transformHintWord(match, options));
  };

  const transformedHint = transformHintText(
    currentLevel.hint || "",
    { preserveSingleLetterAllCaps: false }
  );

  const introRuleCards = useMemo(() => ([
    { ...RULES.SH_S, color: pastelFromString('intro-sh-s') },
    { ...RULES.OO_OUP, color: pastelFromString('intro-oo-oup') }
  ]), []);

  const triggerShake = () => {
    setIsShaking(false);
    setTimeout(() => setIsShaking(true), 0);
    setTimeout(() => setIsShaking(false), 350);
  };

  const queueOutgoingReveal = useCallback((kind, hintText, spelling, typedText, options = {}) => {
    const { durationMs = 2000, showUnderscore = true } = options;
    if (outgoingRevealTimeoutRef.current) {
      clearTimeout(outgoingRevealTimeoutRef.current);
    }
    setOutgoingReveal({
      id: Date.now(),
      kind,
      hintText,
      spelling,
      typedText,
      showUnderscore
    });
    outgoingRevealTimeoutRef.current = setTimeout(() => {
      setOutgoingReveal(null);
      outgoingRevealTimeoutRef.current = null;
    }, durationMs);
  }, []);

  const startNewRound = useCallback((nextLevelIndex, levels = shuffledLevels, timedOverride = isTimed, options = {}) => {
    const { clearEntryFloater = true, animateHint = true, difficultyOverride = selectedDifficulty } = options;
    setIsCorrectRevealing(false);
    setIsWrongRevealing(false);
    setIsPenaltyWrongRevealing(false);
    setHideHintVisual(false);
    setDisplayInput('');
    if (clearEntryFloater) {
      setEntryFloater(null);
    }
    setIsLocked(false);
    roundEndedRef.current = false;
    if (animateHint) {
      setIncomingRevealId((prev) => prev + 1);
    }

    if (!timedOverride) {
      timePenaltyRef.current = 0;
      setRoundBaseSeconds(0);
      setRoundSeconds(0);
      setTimeLeft(0);
      setTimeLeftMs(0);
      return;
    }

    const nextWord = levels[nextLevelIndex]?.word || '';
    const baseSeconds = 15 + (nextWord ? nextWord.length * 3 : 0);
    const multiplier = getTimerMultiplier(difficultyOverride);
    const roundTimeSeconds = baseSeconds * multiplier;
    timePenaltyRef.current = 0;
    setRoundBaseSeconds(baseSeconds);
    setRoundSeconds(roundTimeSeconds);
    setTimeLeft(roundTimeSeconds);
    setTimeLeftMs(roundTimeSeconds * 1000);
  }, [isTimed, selectedDifficulty, shuffledLevels]);

  const resetGame = () => {
    if (outgoingRevealTimeoutRef.current) {
      clearTimeout(outgoingRevealTimeoutRef.current);
      outgoingRevealTimeoutRef.current = null;
    }
    setOutgoingReveal(null);
    setActiveRules([]);
    setLives(3);
    setScore(0);
    setLevelIndex(0);
    setInput('');
    setFeedback('');
    setTimeLeft(0);
    setRoundSeconds(0);
    setRoundBaseSeconds(0);
    setTimeLeftMs(0);
    setPointsFlash('');
    setPointsFlashId((prev) => prev + 1);
    setIsCorrectRevealing(false);
    setIsWrongRevealing(false);
    setIsPenaltyWrongRevealing(false);
    setHideHintVisual(false);
    setDisplayInput('');
    setEntryFloater(null);
    setWordsDefeated(0);
    setCardsCollected(0);
    setCardsDefeated(0);
    setSelectedDifficulty(null);
    setDailySolvedWords([]);
    setIsPaused(false);
    setShowHelp(false);
    setIntroScreen('overview');
    setShowIntro(true);
    setHasStarted(false);
    pausedRef.current = false;
    setRecentRuleKeys([]);
    localStorage.removeItem(DAILY_STATE_STORAGE_KEY);
    const nextLevels = buildWarmupOrder(visibleLevels);
    setShuffledLevels(nextLevels);
  };

  const markRuleAdded = (ruleKey) => {
    setRecentRuleKeys((prev) => (prev.includes(ruleKey) ? prev : [...prev, ruleKey]));
    setTimeout(() => {
      setRecentRuleKeys((prev) => prev.filter((key) => key !== ruleKey));
    }, 500);
  };

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => () => {
    if (entryFloaterTimeoutRef.current) {
      clearTimeout(entryFloaterTimeoutRef.current);
    }
    if (outgoingRevealTimeoutRef.current) {
      clearTimeout(outgoingRevealTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    if (!showIntro) return undefined;
    if (introScreen === 'difficulty') {
      setIntroScale(1);
      return undefined;
    }
    const updateScale = () => {
      if (!introCardRef.current || !introContentRef.current) return;
      const naturalHeight = introContentRef.current.scrollHeight;
      const naturalWidth = introContentRef.current.scrollWidth;
      const styles = window.getComputedStyle(introCardRef.current);
      const cardRect = introCardRef.current.getBoundingClientRect();
      const paddingY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
      const paddingX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
      const isOverviewScreen = introScreen === 'overview';
      const availableHeight = Math.max(0, cardRect.height * (isOverviewScreen ? 0.9 : 1));
      const availableWidth = Math.max(0, cardRect.width * (isOverviewScreen ? 0.82 : 1));

      const safetyPad = isOverviewScreen ? 10 : 24;
      const maxContentHeight = Math.max(0, availableHeight - paddingY - safetyPad);
      const maxContentWidth = Math.max(0, availableWidth - paddingX - safetyPad);

      const heightScale = naturalHeight > 0 ? maxContentHeight / naturalHeight : 1;
      const widthScale = naturalWidth > 0 ? maxContentWidth / naturalWidth : 1;
      const nextScale = Math.min(1, heightScale, widthScale);
      const safeScale = Number.isFinite(nextScale) ? nextScale : 1;
      setIntroScale(safeScale);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, [showIntro, introScreen]);

  useLayoutEffect(() => {
    if (!showIntro || introScreen !== 'difficulty') {
      setDifficultyStackScale(1);
      setDifficultyStackSize({ width: null, height: null });
      return undefined;
    }

    const updateDifficultyStackScale = () => {
      const cardEl = introCardRef.current;
      const stackEl = difficultyStackRef.current;
      if (!cardEl || !stackEl) return;

      const styles = window.getComputedStyle(cardEl);
      const cardRect = cardEl.getBoundingClientRect();
      const paddingX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
      const maxContentWidth = Math.max(0, cardRect.width - paddingX);
      const naturalWidth = stackEl.scrollWidth;
      const naturalHeight = stackEl.scrollHeight;
      const nextScale = naturalWidth > maxContentWidth
        ? Math.max(0.5, maxContentWidth / naturalWidth)
        : 1;

      setDifficultyStackScale((prev) => (Math.abs(prev - nextScale) < 0.001 ? prev : nextScale));
      if (nextScale < 1) {
        setDifficultyStackSize({
          width: Math.ceil(naturalWidth * nextScale),
          height: Math.ceil(naturalHeight * nextScale)
        });
      } else {
        setDifficultyStackSize({ width: null, height: null });
      }
    };

    updateDifficultyStackScale();
    window.addEventListener('resize', updateDifficultyStackScale);

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateDifficultyStackScale);
      resizeObserver.observe(difficultyStackRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateDifficultyStackScale);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [showIntro, introScreen]);

  useLayoutEffect(() => {
    if (!entryFloater || !entryFloaterRef.current) return undefined;

    const buffer = 20;
    const anchorRatio = 1.1;
    const maxWidth = 180;
    const clampFloater = () => {
      const el = entryFloaterRef.current;
      const formEl = spellingFormRef.current;
      if (!el || !formEl) return;
      const formRect = formEl.getBoundingClientRect();
      const baseTop = formRect.top + formRect.height * anchorRatio;
      const baseLeft = formRect.left + formRect.width * 0.5;
      el.style.setProperty('--entry-top', `${baseTop}px`);
      el.style.setProperty('--entry-left', `${baseLeft}px`);

      const rect = el.getBoundingClientRect();
      const overflow = rect.bottom - (window.innerHeight - buffer);
      const nextOffset = overflow > 0 ? -overflow : 0;
      if (Math.abs(entryFloaterClampRef.current - nextOffset) < 0.5) return;
      entryFloaterClampRef.current = nextOffset;
      el.style.setProperty('--entry-y', `${nextOffset}px`);

      const prevMaxWidth = el.style.maxWidth;
      el.style.maxWidth = 'none';
      const naturalWidth = el.scrollWidth || rect.width;
      el.style.maxWidth = prevMaxWidth;
      const nextScale = naturalWidth > maxWidth ? maxWidth / naturalWidth : 1;
      if (Math.abs(entryFloaterScaleRef.current - nextScale) >= 0.005) {
        entryFloaterScaleRef.current = nextScale;
        el.style.setProperty('--entry-scale', `${nextScale}`);
        el.style.setProperty('--entry-max-width', `${maxWidth}px`);
      }
    };

    clampFloater();
    window.addEventListener('resize', clampFloater);
    window.addEventListener('scroll', clampFloater, { passive: true });
    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(clampFloater);
      resizeObserver.observe(entryFloaterRef.current);
      if (spellingFormRef.current) {
        resizeObserver.observe(spellingFormRef.current);
      }
    }
    const fontsReady = document.fonts?.ready?.then(clampFloater);

    return () => {
      window.removeEventListener('resize', clampFloater);
      window.removeEventListener('scroll', clampFloater);
      if (resizeObserver) resizeObserver.disconnect();
      if (fontsReady?.cancel) fontsReady.cancel();
    };
  }, [entryFloater]);

  // --- ACTIONS ---
  const handleStartGame = (mode) => {
    if (!mode) return;
    setSelectedDifficulty(mode);
    let nextTimed = true;
    let nextLevels = buildWarmupOrder(visibleLevels);
    let nextLevelIndex = 0;
    let nextRules = [];
    let nextLives = 3;
    let nextScore = 0;
    let nextWordsDefeated = 0;
    let nextCardsCollected = 0;
    let nextCardsDefeated = 0;
    if (mode === 'honeybee') {
      setIsTimed(true);
      setShowHints(true);
      setShowHelper(true);
      setDailySolvedWords([]);
    } else if (mode === 'bumblebee') {
      setIsTimed(true);
      setShowHints(true);
      setShowHelper(true);
      setDailySolvedWords([]);
    } else if (mode === 'hornet') {
      setIsTimed(true);
      setShowHints(true);
      setShowHelper(true);
      setDailySolvedWords([]);
    } else if (mode === 'killer') {
      setIsTimed(true);
      setShowHints(true);
      setShowHelper(true);
      setDailySolvedWords([]);
    } else if (mode === 'daily') {
      nextTimed = false;
      setIsTimed(false);
      setShowHints(true);
      setShowHelper(false);
      const todayKey = toDateKey();
      nextLevels = getDailyWords(visibleLevels);
      let savedState = null;
      try {
        savedState = JSON.parse(localStorage.getItem(DAILY_STATE_STORAGE_KEY) || 'null');
      } catch {
        savedState = null;
      }
      if (savedState?.date !== todayKey) {
        savedState = null;
        localStorage.removeItem(DAILY_STATE_STORAGE_KEY);
      }
      const savedSolvedWords = Array.isArray(savedState?.solvedWords)
        ? savedState.solvedWords.filter((word) => typeof word === 'string')
        : [];
      const savedWordIndexRaw = Number.isInteger(savedState?.currentWordIndex)
        ? savedState.currentWordIndex
        : 0;
      const savedActiveRules = Array.isArray(savedState?.activeRules)
        ? savedState.activeRules.filter((rule) => rule && typeof rule.key === 'string')
        : [];
      const savedLives = Number.isInteger(savedState?.lives) ? savedState.lives : 3;
      const savedScore = Number.isInteger(savedState?.score) ? savedState.score : 0;
      const savedWordsDefeated = Number.isInteger(savedState?.wordsDefeated) ? savedState.wordsDefeated : 0;
      const savedCardsCollected = Number.isInteger(savedState?.cardsCollected) ? savedState.cardsCollected : 0;
      const savedCardsDefeated = Number.isInteger(savedState?.cardsDefeated) ? savedState.cardsDefeated : 0;
      nextLevelIndex = Math.max(0, Math.min(savedWordIndexRaw, nextLevels.length));
      nextRules = savedActiveRules;
      nextLives = Math.max(0, Math.min(3, savedLives));
      nextScore = Math.max(0, savedScore);
      nextWordsDefeated = Math.max(0, savedWordsDefeated);
      nextCardsCollected = Math.max(0, savedCardsCollected);
      nextCardsDefeated = Math.max(0, savedCardsDefeated);
      setDailySolvedWords(savedSolvedWords.slice(0, nextLevelIndex));
      const initialDailyState = {
        date: todayKey,
        solvedWords: savedSolvedWords.slice(0, nextLevelIndex),
        currentWordIndex: nextLevelIndex,
        activeRules: nextRules,
        lives: nextLives,
        score: nextScore,
        wordsDefeated: nextWordsDefeated,
        cardsCollected: nextCardsCollected,
        cardsDefeated: nextCardsDefeated
      };
      localStorage.setItem(DAILY_STATE_STORAGE_KEY, JSON.stringify(initialDailyState));
    } else {
      nextTimed = false;
      setIsTimed(false);
      setShowHints(true);
      setShowHelper(true);
      setDailySolvedWords([]);
    }
    setIntroScreen('overview');
    setShowIntro(false);
    setHasStarted(true);
    setLevelIndex(nextLevelIndex);
    setActiveRules(nextRules);
    setLives(nextLives);
    setScore(nextScore);
    setInput('');
    setDisplayInput('');
    setFeedback('');
    setWordsDefeated(nextWordsDefeated);
    setCardsCollected(nextCardsCollected);
    setCardsDefeated(nextCardsDefeated);
    setRecentRuleKeys([]);
    setEntryFloater(null);
    setOutgoingReveal(null);
    setIsPaused(false);
    setShuffledLevels(nextLevels);
    if (nextLevelIndex < nextLevels.length) {
      startNewRound(nextLevelIndex, nextLevels, nextTimed, { difficultyOverride: mode });
    }
    inputRef.current?.focus();
  };

  const handleResetDailyProgress = () => {
    if (selectedDifficulty !== 'daily') return;
    localStorage.removeItem(DAILY_STATE_STORAGE_KEY);
    handleStartGame('daily');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isGameOver || hasWon || roundEndedRef.current || isPaused) return;

    const guess = input.toUpperCase().trim();

    if (guess === targetSpelling) {
      handleSuccess();
    } else if (selectedDifficulty === 'daily') {
      handleFailure();
    } else {
      handleIncorrectAttempt(guess);
    }
  };

  const handleOpenEndlessSelection = () => {
    setShowIntro(true);
    setIntroScreen('difficulty');
    setSelectedDifficulty(null);
    setHasStarted(false);
    setIsPaused(false);
    setShowHelp(false);
    setActiveRules([]);
    setLives(3);
    setScore(0);
    setLevelIndex(0);
    setInput('');
    setDisplayInput('');
    setFeedback('');
    setPointsFlash('');
    setEntryFloater(null);
    setOutgoingReveal(null);
    setWordsDefeated(0);
    setCardsCollected(0);
    setCardsDefeated(0);
    setRecentRuleKeys([]);
    setDailySolvedWords([]);
    const nextLevels = buildWarmupOrder(visibleLevels);
    setShuffledLevels(nextLevels);
  };

  const handleSuccess = () => {
    roundEndedRef.current = true;
    setLockedSpellingState(targetSpelling);
    setLockedHintMaskState(hintMask);
    setIsLocked(true);
    const timeLeftSeconds = Math.max(0, Math.ceil(timeLeftMs / 1000));
    const pointsEarned = timeLeftSeconds > 0 ? timeLeftSeconds : 1;
    setFeedback('');
    
    // 1. DEGRADE RULES
    // We create a NEW array for rules to update state correctly
    let nextRules = activeRules.map(rule => {
      // If this rule was used in the transformation, lower its health
      if (usedRules.includes(rule.key)) {
        return { ...rule, durability: rule.durability - 1 };
      }
      return rule;
    });

    // 2. REMOVE DEAD RULES
    const defeatedIndices = [];
    nextRules.forEach((rule, idx) => {
      if (rule.durability <= 0) defeatedIndices.push(idx);
    });
    const crumbledCount = defeatedIndices.length;
    const aliveRules = nextRules.filter(r => r.durability > 0);
    
    // Check if we lost any
    if (aliveRules.length < nextRules.length) {
      setFeedback('');
    }

    // 3. ADD NEW RULE(S) (If valid)
    const maxNewRules = selectedDifficulty === 'honeybee'
      ? 1
      : selectedDifficulty === 'bumblebee'
        ? 2
        : selectedDifficulty === 'killer'
          ? 4
          : Infinity;
    const candidateRuleKeys = entryRuleKeys.filter((ruleKey) => {
      const ruleDefinition = RULES[ruleKey];
      return ruleDefinition && !isRuleBlocked(ruleDefinition, aliveRules, ruleKey);
    });
    const shuffledCandidates = shuffleArray(candidateRuleKeys);
    const newRuleKeys = maxNewRules === Infinity
      ? shuffledCandidates
      : shuffledCandidates.slice(0, maxNewRules);

    newRuleKeys.forEach((ruleKey) => {
      const ruleDefinition = RULES[ruleKey];

      // We check if the rule exists AND if it isn't blocked by a mutex group
      if (ruleDefinition && !isRuleBlocked(ruleDefinition, aliveRules, ruleKey)) {
        if (aliveRules.length >= MAX_ACTIVE_RULES) return;
        // Add the new rule with a 'key' property so we can track it
        aliveRules.push({ 
          ...ruleDefinition, 
          key: ruleKey, 
          durability: ruleDefinition.maxDurability,
          color: pastelFromString(ruleKey)
        });
        markRuleAdded(ruleKey);
        setCardsCollected((prev) => prev + 1);
      }
    });

    // Update State
    const totalPoints = pointsEarned + crumbledCount * 10;
    if (crumbledCount > 0) {
      setCardsDefeated((prev) => prev + crumbledCount);
    }
    setWordsDefeated((prev) => prev + 1);
    if (selectedDifficulty === 'daily' && currentLevel.word) {
      setDailySolvedWords((prev) => [...prev, currentLevel.word]);
    }
    if (crumbledCount > 0) {
      const sortedNextRules = sortRulesAlphabetically(nextRules);
      const sortedVowels = sortedNextRules.filter(isVowelRule);
      const sortedConsonants = sortedNextRules.filter((rule) => !isVowelRule(rule));
      const newFlashes = defeatedIndices.map((idx) => {
        const defeatedRule = nextRules[idx];
        const isVowel = isVowelRule(defeatedRule);
        const groupRules = splitByPhonemeType
          ? (isVowel ? sortedVowels : sortedConsonants)
          : sortedNextRules;
        const displayIndex = groupRules.indexOf(defeatedRule);
        const count = groupRules.length;
        if (displayIndex === -1) return null;
        defeatedFlashIdRef.current += 1;
        const { offset, tilt, rowY } = getFanLayout(
          displayIndex,
          count,
          splitBaseSpread,
          cardScale
        );
        return { id: defeatedFlashIdRef.current, offset, tilt, rowY, group: isVowel ? 'vowel' : 'consonant' };
      });
      const filteredFlashes = newFlashes.filter(Boolean);
      setDefeatedFlashes((prev) => [...prev, ...filteredFlashes]);
      filteredFlashes.forEach((flash) => {
        setTimeout(() => {
          setDefeatedFlashes((prev) => prev.filter((item) => item.id !== flash.id));
        }, 900);
      });
    }
    setActiveRules(aliveRules);
    setScore((prev) => prev + totalPoints);
    setPointsFlash(`+${totalPoints}`);
    setPointsFlashId((prev) => prev + 1);
    setTimeout(() => setPointsFlash(''), 1200);
    setDisplayFlashId((prev) => prev + 1);
    setIsDisplayFlashing(false);
    triggerEntryFloater(true);
    queueOutgoingReveal('correct', transformedHint, lockedSpelling, input);
    setInput('');
    setDisplayInput('');
    setIsCorrectRevealing(false);
    setFeedback('');
    const nextLevelIndex = levelIndex + 1;
    if (nextLevelIndex < shuffledLevels.length) {
      startNewRound(nextLevelIndex, shuffledLevels, isTimed, { clearEntryFloater: false });
    }
    setLevelIndex(nextLevelIndex);
  };

  const handleFailure = () => {
    if (outgoingRevealTimeoutRef.current) {
      clearTimeout(outgoingRevealTimeoutRef.current);
      outgoingRevealTimeoutRef.current = null;
    }
    setOutgoingReveal(null);
    roundEndedRef.current = true;
    setLockedSpellingState(targetSpelling);
    setLockedHintMaskState(hintMask);
    setIsLocked(true);
    triggerShake();
    triggerEntryFloater(false);
    if (selectedDifficulty === 'daily') {
      setOutgoingReveal(null);
      setHideHintVisual(false);
    } else {
      queueOutgoingReveal('wrong', transformedHint, targetSpelling, targetSpelling);
      setHideHintVisual(true);
    }
    setFeedback('');
    setDisplayInput('');
    setIsWrongRevealing(false);
    setInput('');
    setTimeout(() => {
      setFeedback('');
      setDisplayInput('');
      if (selectedDifficulty === 'daily') {
        startNewRound(levelIndex, shuffledLevels, isTimed, { clearEntryFloater: false, animateHint: false });
        return;
      }
      const nextLives = lives - 1;
      setLives(nextLives);
      if (nextLives > 0) {
        const nextLevelIndex = levelIndex + 1;
        if (nextLevelIndex < shuffledLevels.length) {
          startNewRound(nextLevelIndex, shuffledLevels, isTimed, { clearEntryFloater: false });
        }
        setLevelIndex(nextLevelIndex);
      }
    }, 1200);
  };

  const handleTimeoutFailure = useCallback(() => {
    roundEndedRef.current = true;
    triggerShake();
    triggerEntryFloater(false);
    queueOutgoingReveal('correct', transformedHint, targetSpelling, targetSpelling);
    setHideHintVisual(true);
    setFeedback('');
    setDisplayInput('');
    setIsWrongRevealing(false);
    const nextLives = lives - 1;
    setLives(nextLives);
    setInput('');
    setTimeout(() => {
      setFeedback('');
      setIsWrongRevealing(false);
      setDisplayInput('');
      if (nextLives > 0) {
        const nextLevelIndex = levelIndex + 1;
        if (nextLevelIndex < shuffledLevels.length) {
          startNewRound(nextLevelIndex, shuffledLevels, isTimed, { clearEntryFloater: false });
        }
        setLevelIndex(nextLevelIndex);
      }
    }, 1200);
  }, [
    lives,
    levelIndex,
    isTimed,
    shuffledLevels,
    targetSpelling,
    transformedHint,
    triggerEntryFloater,
    queueOutgoingReveal,
    startNewRound
  ]);


  const handleIncorrectAttempt = (guess) => {
    const penaltyMs = isTimed ? Math.round(roundBaseSeconds * 1000 * 0.1) : 0;
    if (penaltyMs > 0) {
      if (timeLeftMs <= penaltyMs) {
        setTimeLeftMs(0);
        setTimeLeft(0);
        handleTimeoutFailure();
        return;
      }
      timePenaltyRef.current += penaltyMs;
      const nextMs = Math.max(0, timeLeftMs - penaltyMs);
      setTimeLeftMs(nextMs);
      setTimeLeft(Math.max(0, Math.floor(nextMs / 1000)));
    }
    triggerShake();
    triggerEntryFloater(false);
    setFeedback('');
    setDisplayInput(guess);
    setIsPenaltyWrongRevealing(true);
    setInput('');
    setTimeout(() => {
      setIsPenaltyWrongRevealing(false);
      setDisplayInput('');
    }, 500);
  };

  useEffect(() => {
    if (!hasStarted) return undefined;
    if (isGameOver || hasWon) return undefined;
    if (!isTimed || roundSeconds <= 0) return undefined;
    let elapsedMs = 0;
    let lastTick = 0;
    const roundDurationMs = roundSeconds * 1000;
    const timer = setInterval(() => {
      const now = performance.now();
      if (lastTick === 0) {
        lastTick = now;
        return;
      }
      if (pausedRef.current || roundEndedRef.current) {
        lastTick = now;
        return;
      }
      elapsedMs += now - lastTick;
      lastTick = now;
      const remainingMs = Math.max(0, roundDurationMs - elapsedMs - timePenaltyRef.current);
      const remainingSeconds = Math.max(0, Math.floor(remainingMs / 1000));
      setTimeLeftMs(remainingMs);
      setTimeLeft(remainingSeconds);
      if (remainingMs <= 0) {
        roundEndedRef.current = true;
        clearInterval(timer);
        handleTimeoutFailure();
      }
    }, 50);
    return () => {
      clearInterval(timer);
    };
  }, [levelIndex, isGameOver, hasWon, hasStarted, isTimed, roundSeconds, handleTimeoutFailure]);

  useEffect(() => {
    if (selectedDifficulty !== 'daily' || !hasStarted) return;
    const todayKey = toDateKey();
    const dailyState = {
      date: todayKey,
      solvedWords: dailySolvedWords,
      currentWordIndex: Math.max(0, Math.min(levelIndex, shuffledLevels.length)),
      activeRules,
      lives,
      score,
      wordsDefeated,
      cardsCollected,
      cardsDefeated
    };
    localStorage.setItem(DAILY_STATE_STORAGE_KEY, JSON.stringify(dailyState));
  }, [
    selectedDifficulty,
    hasStarted,
    dailySolvedWords,
    levelIndex,
    shuffledLevels.length,
    activeRules,
    lives,
    score,
    wordsDefeated,
    cardsCollected,
    cardsDefeated
  ]);

  useEffect(() => {
    if (selectedDifficulty !== 'daily' || !isGameOver) return undefined;
    const timer = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedDifficulty, isGameOver]);

  // --- RENDER ---

  const dailyWordProgress = Math.max(1, Math.min(levelIndex + 1, DAILY_WORD_COUNT));
  const nextMidnight = new Date(nowMs);
  nextMidnight.setHours(24, 0, 0, 0);
  const nextBeeMs = Math.max(0, nextMidnight.getTime() - nowMs);
  const nextBeeHours = Math.floor(nextBeeMs / 3600000);
  const nextBeeMinutes = Math.floor((nextBeeMs % 3600000) / 60000);
  const nextBeeSeconds = Math.floor((nextBeeMs % 60000) / 1000);
  const nextBeeIn = `${String(nextBeeHours).padStart(2, '0')}:${String(nextBeeMinutes).padStart(2, '0')}:${String(nextBeeSeconds).padStart(2, '0')}`;

  return (
    <div
      className="app-shell min-h-screen font-mono flex flex-col items-center"
      onClick={() => inputRef.current?.focus()}
    >
      {showIntro && (
        <div
          className="intro-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => {
            setDifficultyPulse(true);
            setTimeout(() => setDifficultyPulse(false), 200);
          }}
        >
          <div
            className={`intro-card hex-popup ${introScreen === 'difficulty' ? 'intro-card--difficulty' : 'intro-card--overview'}`}
            ref={introCardRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`intro-card__content ${introScreen === 'difficulty' ? 'intro-card__content--difficulty' : ''}`}
              ref={introContentRef}
              style={{ transform: `scale(${introScale})` }}
            >
              {introScreen === 'overview' ? (
                <>
                  <div className="intro-title header-title" aria-label="Son of a Bee">
                    <span className="header-title__top">{transformHintText("SON OF A")}</span>
                    <span className="header-title__bottom">{transformHintText("BEE")}</span>
                  </div>
                  <div className="intro-subtitle intro-subtitle--lower">
                    English makes no sense. <span className="intro-green">Let's make it worse.</span>
                  </div>
                  <div className="intro-steps">
                    <div className="intro-step">
                      <span className="intro-step__number">1.</span>
                      <span className="intro-step__text"><strong>SPELL</strong> out the word based on the hint.</span>
                    </div>
                    <div className="intro-underline intro-underline--spaced">
                      <span className="intro-example-word">
                        <span className="intro-example-text">SUGAR</span>
                        <span className="intro-example-underscores">_____</span>
                      </span>
                      <span className="intro-example-word">
                        <span className="intro-example-text">COUP</span>
                        <span className="intro-example-underscores">____</span>
                      </span>
                    </div>
                    <div className="intro-step">
                      <span className="intro-step__number">2.</span>
                      <span className="intro-step__text"><strong>CHANGE</strong> the English language based on your answers.</span>
                    </div>
                    <div className="intro-cards">
                      {introRuleCards.map((rule, idx) => (
                        <div
                          key={rule.name}
                          className={`rule-card rule-card--hex intro-rule-card intro-rule-card--${idx === 0 ? 'left' : 'right'}`}
                          style={{ backgroundColor: rule.color }}
                        >
                          <div className="rule-main">
                            <div className="rule-title">{rule.name}</div>
                            <div className="rule-desc">{rule.description}</div>
                          </div>
                          <div className="rule-health-dots">
                            {[0, 1, 2].map((dot) => (
                              <span
                                key={`intro-health-${rule.name}-${dot}`}
                                className="health-dot health-dot--on"
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="intro-step">
                      <span className="intro-step__number">3.</span>
                      <span className="intro-step__text"><strong>ADAPT</strong> your spelling to match the new rules.</span>
                    </div>
                    <div className="intro-underline intro-underline--arrow">
                      <span className="intro-example-word">
                        <span className="intro-example-text">SHOE</span>
                        <span className="intro-example-underscores">____</span>
                      </span>
                      <span className="intro-arrow">→</span>
                      <span className="intro-example-word intro-green">
                        <span className="intro-example-text">SOUP</span>
                        <span className="intro-example-underscores">____</span>
                      </span>
                    </div>
                  </div>
                  <div className="intro-subtitle intro-subtitle--spacious">READY TO BEE-GIN?</div>
                  <div className="intro-mode-grid">
                    <button
                      className={`mode-option ${difficultyPulse ? 'mode-option--pulse' : ''}`}
                      onClick={() => handleStartGame('daily')}
                      aria-label="Daily Bee mode"
                    >
                      <span className="difficulty-hex endless-hex" aria-hidden="true" />
                      <span className="mode-label">DAILY BEE</span>
                                            <span className="mode-meta mode-meta">INFINITE LIVES</span>
                      <span className="mode-meta mode-meta--red">NO VISUAL HINTS</span>
                                            <span className="mode-meta mode-meta">UNTIMED</span>
                    </button>
                    <button
                      className={`mode-option ${difficultyPulse ? 'mode-option--pulse' : ''}`}
                      onClick={() => setIntroScreen('difficulty')}
                      aria-label="Endless mode"
                    >
                      <span className="difficulty-hex endless-hex" aria-hidden="true" />
                      <span className="mode-label">ENDLESS</span>
                                            <span className="mode-meta mode-meta--red">LIMITED LIVES</span>
                      <span className="mode-meta mode-meta">VISUAL HINTS</span>
                                            <span className="mode-meta mode-meta--red">TIMED</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="difficulty-stack-shell"
                    ref={difficultyStackShellRef}
                    style={difficultyStackScale < 1 && difficultyStackSize.width && difficultyStackSize.height
                      ? {
                          width: `${difficultyStackSize.width}px`,
                          height: `${difficultyStackSize.height}px`
                        }
                      : undefined}
                  >
                    <div
                      className="difficulty-stack"
                      ref={difficultyStackRef}
                      style={{ transform: `scale(${difficultyStackScale})` }}
                    >
                      <div className="difficulty-screen-header">ENDLESS MODE</div>
                      <div className={`difficulty-grid ${difficultyPulse ? 'difficulty-grid--pulse' : ''}`}>
                        <button
                          className="difficulty-option"
                          onClick={() => handleStartGame('honeybee')}
                          aria-label="Honeybee difficulty"
                        >
                          <span className="difficulty-hex" aria-hidden="true" />
                          <div className="difficulty-name">HONEY BEE</div>
                          <div className="difficulty-desc">NORMAL SPEED</div>
                          <div className="difficulty-desc">1 NEW RULE PER ROUND</div>
                        </button>
                        <button
                          className="difficulty-option"
                          onClick={() => handleStartGame('bumblebee')}
                          aria-label="Bumblebee difficulty"
                        >
                          <span className="difficulty-hex difficulty-hex--warn" aria-hidden="true">
                            <span className="difficulty-mark">!</span>
                          </span>
                          <div className="difficulty-name">BUMBLE BEE</div>
                          <div className="difficulty-desc">1.5X SPEED</div>
                          <div className="difficulty-desc">UP TO 2 NEW RULES PER ROUND</div>
                        </button>
                        <button
                          className="difficulty-option"
                          onClick={() => handleStartGame('killer')}
                          aria-label="Killer Bee difficulty"
                        >
                          <span className="difficulty-hex difficulty-hex--danger" aria-hidden="true">
                            <span className="difficulty-mark">!!</span>
                          </span>
                          <div className="difficulty-name">KILLER BEE</div>
                          <div className="difficulty-desc">2X SPEED</div>
                          <div className="difficulty-desc">UP TO 4 NEW RULES PER ROUND</div>
                        </button>
                        <button
                          className="difficulty-option"
                          onClick={() => handleStartGame('hornet')}
                          aria-label="Hornet difficulty"
                        >
                          <span className="difficulty-hex difficulty-hex--danger" aria-hidden="true">
                            <span className="difficulty-mark">!!!</span>
                          </span>
                          <div className="difficulty-name">HORNET</div>
                          <div className="difficulty-desc">2.5X SPEED</div>
                          <div className="difficulty-desc">UNLIMITED NEW RULES PER ROUND</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {isPaused && !showHelp && !showCheatSheet && (
        <div className="pause-overlay" role="dialog" aria-modal="true">
          <div className="pause-modal status-modal hex-popup">
            <div className="pause-title">PAUSED</div>
            <button className="pause-button" onClick={() => setIsPaused(false)}>
              <span className="pause-button__icon">▶</span>
            </button>
          </div>
        </div>
      )}
      <div className="hexagon-field" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      
      {/* HEADER */}
      <div className="w-full flex justify-between mb-8 header-bar">
        <div className="header-side" />
        <div className="header-title" aria-label="Son of a Bee">
          <span className="header-title__top">{transformHintText("SON OF A")}</span>
          <span className="header-title__bottom">{transformHintText("BEE")}</span>
        </div>
        <div className="header-side" />
      </div>
      <button className="help-button" onClick={handleOpenHelp} aria-label="Show rules">
        ?
      </button>
      <button className="cheat-sheet-button" onClick={handleOpenCheatSheet} aria-label="Show phoneme cheat sheet">
        ⌕
      </button>
      {selectedDifficulty !== 'daily' && (
        <button
          className={`pause-toggle ${isPaused ? "pause-toggle--active" : "pause-toggle--inactive"}`}
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={isPaused ? "Resume game" : "Pause game"}
        >
          <span className="pause-toggle__icon">{isPaused ? "▶" : "⏸︎"}</span>
        </button>
      )}
      {selectedDifficulty === 'daily' && (
        <button
          className="pause-toggle pause-toggle--daily"
          onClick={handleResetDailyProgress}
          aria-label="Reset daily progress"
        >
          <span className="pause-toggle__icon--daily">⟳</span>
        </button>
      )}
      {showHelp && (
        <div className="help-overlay" role="dialog" aria-modal="true" onClick={handleCloseHelp}>
          <div className="help-card hex-popup" onClick={(event) => event.stopPropagation()}>
            <div className="help-content">
              <div className="help-column">
                <div className="help-title"><strong>HOW TO PLAY</strong></div>
                <div className="help-item">
                  <div className="help-item__title"><strong>GUESS THE WORD</strong></div>
                  <div className="help-item__text">Use the hint to find the answer. Standard English spelling applies... at first.</div>
                </div>
                <div className="help-item">
                  <div className="help-item__title"><strong>UNLOCK MUTATIONS</strong></div>
                  <div className="help-item__text">Correct answers unlock Mutation Cards that change the rules of English (e.g., PH becomes F).</div>
                </div>
                <div className="help-item">
                  <div className="help-item__title"><strong>OBEY THE HIVE</strong></div>
                  <div className="help-item__text">Active Mutations are law. You must apply them to all future answers. Example: If "PH = F" is active, you must type FOTO, not PHOTO.</div>
                </div>
                <div className="help-item">
                  <div className="help-item__title"><strong>SCORING</strong></div>
                  <div className="help-item__text">Points are awarded based on word length and time remaining (when timer is enabled). Rule cards are "broken" after three uses, earning you additional points.</div>
                </div>
              </div>
              <div className="help-divider" aria-hidden="true" />
              <div className="help-column">
                <div className="help-item">
                  <div className="help-item__title"><strong>SPELLING STANDARDS</strong></div>
                  <div className="help-item__text">This game uses American spelling conventions (as defined by Merriam-Webster).</div>
                </div>
                <div className="help-item">
                  <div className="help-item__title"><strong>PRONUNCIATION STANDARDS</strong></div>
                  <div className="help-item__text">All phonetic logic is based on standard General American pronunciation.</div>
                </div>
                <div className="help-item">
                  <div className="help-item__title"><strong>COT = CAUGHT</strong></div>
                  <div className="help-item__text">The unrounded [/ɑ/] (as in bot) and rounded [/ɔ/] (as in bought) are pronounced the same.</div>
                </div>
                <div className="help-item">
                  <div className="help-item__title"><strong>MARY = MARRY = MERRY</strong></div>
                  <div className="help-item__text">The vowels [/e/], [/æ/], and [/ɛ/] are merged before the /r/ consonant.</div>
                </div>
                <div className="help-item">
                  <div className="help-item__title"><strong>WHINE = WINE</strong></div>
                  <div className="help-item__text">The voiced [/w/] and voiceless [/hw/] are merged.</div>
                </div>
                <div className="help-item">
                  <div className="help-item__title"><strong>HORSE = HOARSE</strong></div>
                  <div className="help-item__text">The vowels [/ɔ/] and [/oʊ/] are merged before /r/.</div>
                </div>
                <div className="help-item">
                  <div className="help-item__title"><strong>PIN ≠ PEN</strong></div>
                  <div className="help-item__text">The vowels [/ɪ/] (as in kit) and [/ɛ/] (as in dress) remain distinct before nasal consonants.</div>
                </div>
                <div className="help-item">
                  <div className="help-item__title"><strong>RHOTICITY</strong></div>
                  <div className="help-item__text">The [/r/] sound is always pronounced after vowels.</div>
                </div>
              </div>
            </div>
            <button className="help-close" onClick={handleCloseHelp} aria-label="Close help">×</button>
          </div>
        </div>
      )}
      {showCheatSheet && (
        <div className="help-overlay" role="dialog" aria-modal="true" onClick={handleCloseCheatSheet}>
          <div className="cheat-sheet-card" onClick={(event) => event.stopPropagation()}>
            <div className="cheat-sheet-title"><strong>CHEAT SHEET</strong></div>
            <div className="cheat-sheet-grid">
              {cheatSheetColumns.map((column, columnIndex) => (
                <table className="cheat-sheet-table" key={`cheat-sheet-column-${columnIndex}`}>
                  <thead>
                    <tr>
                      <th>SOUND</th>
                      <th>IPA</th>
                      <th>EXAMPLES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {column.map((entry) => (
                      <tr key={entry.label}>
                        <td>{entry.label}</td>
                        <td>{entry.ipa}</td>
                        <td>
                          {entry.examples.map((example, exampleIndex) => (
                            <span key={`${entry.label}-${exampleIndex}`}>
                              <span dangerouslySetInnerHTML={{ __html: example }} />
                              {exampleIndex < entry.examples.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
            </div>
            <button className="help-close" onClick={handleCloseCheatSheet} aria-label="Close cheat sheet">×</button>
          </div>
        </div>
      )}
      {isGameOver && (
        <div className="pause-overlay" role="dialog" aria-modal="true">
          <div className="game-over-modal status-modal hex-popup">
            <div className="game-over-title">GAME OVER</div>
            <div className="game-over-score">CORRECT WORD: {targetSpelling}</div>
            <div className="game-over-stat">Words Defeated: {wordsDefeated}</div>
            {selectedDifficulty === 'daily' ? (
              <div className="game-over-stat">Next Bee In: {nextBeeIn}</div>
            ) : (
              <>
                <div className="game-over-stat">Your Score: {score}</div>
                <div className="game-over-stat">Cards Collected: {cardsCollected}</div>
                <div className="game-over-stat">Cards Defeated: {cardsDefeated}</div>
              </>
            )}
            <button className="game-over-button" onClick={resetGame}>Try Again?</button>
          </div>
        </div>
      )}
      {hasWon && selectedDifficulty !== 'daily' && (
        <div className="pause-overlay" role="dialog" aria-modal="true">
          <div className="game-over-modal status-modal victory-modal hex-popup">
            <div className="victory-title">YOU SURVIVED</div>
            <div className="victory-score">Final Score: {score}</div>
            <div className="game-over-stat">Words Defeated: {wordsDefeated}</div>
            <div className="game-over-stat">Cards Collected: {cardsCollected}</div>
            <div className="game-over-stat">Cards Defeated: {cardsDefeated}</div>
            <button className="game-over-button" onClick={resetGame}>Play Again?</button>
          </div>
        </div>
      )}
      {hasWon && selectedDifficulty === 'daily' && (
        <div className="pause-overlay" role="dialog" aria-modal="true">
          <div className="game-over-modal status-modal daily-win-modal hex-popup">
            <div className="daily-win-title">CONGRATS!</div>
            <button className="game-over-button daily-win-button" onClick={handleOpenEndlessSelection}>
              PLAY ENDLESS MODE
            </button>
          </div>
        </div>
      )}

      {/* MAIN GAME AREA */}
      <div className="w-full text-center">
        <div className={`bonus-bar ${!isTimed ? 'bonus-bar--hidden' : ''}`}>
          <div 
            className="bonus-fill" 
            style={{
              width: `${
                roundSeconds > 0
                  ? Math.max(0, Math.min(100, (timeLeftMs / (roundSeconds * 1000)) * 100))
                  : 0
              }%`
            }} 
          />
        </div>
        <div className="rules-title rules-title--score">
          {selectedDifficulty !== 'daily' && (
            <div className="rules-title__stack">
              <span className="rules-title__label">{transformHintText("SCORE")}</span>
              <span className="rules-title__score">{score}</span>
              <span key={pointsFlashId} className="score-bonus">
                {pointsFlash}
              </span>
            </div>
          )}
          {selectedDifficulty === 'daily' && (
            <div className="rules-title__stack">
              <span className="rules-title__label">{transformHintText("WORD")}</span>
              <span className="rules-title__score">{dailyWordProgress}/{DAILY_WORD_COUNT}</span>
            </div>
          )}
          {selectedDifficulty !== 'daily' && (
            <div className="rules-title__stack">
              <span className="rules-title__label">{transformHintText("LIVES")}</span>
              <span className="rules-title__lives">
                <span className="life-icons" aria-label={`${lives} lives`}>
                  {Array.from({ length: lives }).map((_, idx) => (
                    <span key={`life-${idx}`} className="life-hex" />
                  ))}
                </span>
              </span>
            </div>
          )}
        </div>
        <div className={`rules-section ${splitByPhonemeType ? 'rules-section--split' : ''}`}>
          {/* ACTIVE RULES LIST */}
          {!splitByPhonemeType && (
            <div
              ref={rulesDeckRef}
              className={`rules-deck ${compactCards ? 'rules-deck--compact' : ''}`}
            >
              {defeatedFlashes.map((flash) => (
                <div
                  key={`defeated-${flash.id}`}
                  className="rule-defeated-floater"
                  style={{
                    left: '50%',
                    transform: `translateX(calc(-50% + ${flash.offset}px)) translateY(${flash.rowY}px) rotate(${flash.tilt}deg)`
                  }}
                >
                  <span className="rule-defeated-floater__text">CARD DEFEATED! +10</span>
                </div>
              ))}
              {orderedRules.map((rule, idx) => {
                const count = orderedRules.length;
                const { offset, tilt, rowY } = getFanLayout(idx, count, splitBaseSpread, effectiveCardScale);
                const collapseCard = compactCards || compressAllCards;
                return (
                <div 
                  key={rule.key} 
                  className={`rule-card rule-card--hex ${recentRuleKeys.includes(rule.key) ? 'rule-card--new' : ''} ${collapseCard ? 'rule-card--collapsed' : ''}`}
                  style={{ 
                    backgroundColor: rule.color || pastelFromString(rule.key),
                    '--fan-x': `${offset}px`,
                    '--fan-rot': `${tilt}deg`,
                    '--fan-y': `${rowY}px`,
                    '--card-z': idx + 1,
                    '--card-delay': `${idx * 40}ms`,
                    '--card-scale': `${effectiveCardScale}`
                  }}
                >
                  <div className="rule-main">
                    <div className="rule-title">{rule.name}</div>
                    <div className="rule-desc">{rule.description}</div>
                  </div>
                  {selectedDifficulty !== 'daily' && (
                    <div className="rule-health-dots">
                      {[0, 1, 2].map((dot) => {
                        const dotActive = rule.durability > dot;
                        return (
                          <span
                            key={`health-${rule.key}-${idx}-${dot}`}
                            className={`health-dot ${dotActive ? 'health-dot--on' : ''}`}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
              {activeRules.length === 0 && (
                <div className="rules-empty">No active laws... yet.</div>
              )}
            </div>
          )}
          {splitByPhonemeType && (
            <div className="rules-deck-columns">
              <div className="rules-deck-column">
                <div className="rules-subtitle">{transformHintText("VOWEL RULES")}</div>
                <div className="rules-deck rules-deck--split">
                {defeatedFlashes
                  .filter((flash) => flash.group === 'vowel')
                  .map((flash) => (
                    <div
                      key={`defeated-${flash.id}`}
                      className="rule-defeated-floater"
                      style={{
                        left: '50%',
                        transform: `translateX(calc(-50% + ${flash.offset}px)) translateY(${flash.rowY}px) rotate(${flash.tilt}deg)`
                      }}
                    >
                      <span className="rule-defeated-floater__text">CARD DEFEATED! +10</span>
                    </div>
                  ))}
                {displayedVowelRules.map((rule, idx) => {
                  const count = displayedVowelRules.length;
                  const { offset, tilt, rowY } = getFanLayout(idx, count, splitBaseSpread, effectiveCardScale);
                  const collapseCard = compactCards || compressAllCards;
                  return (
                    <div
                      key={rule.key}
                      className={`rule-card rule-card--hex ${recentRuleKeys.includes(rule.key) ? 'rule-card--new' : ''} ${collapseCard ? 'rule-card--collapsed' : ''}`}
                      style={{
                        backgroundColor: rule.color || pastelFromString(rule.key),
                        '--fan-x': `${offset}px`,
                        '--fan-rot': `${tilt}deg`,
                        '--fan-y': `${rowY}px`,
                        '--card-z': idx + 1,
                        '--card-delay': `${idx * 40}ms`,
                        '--card-scale': `${effectiveCardScale}`
                      }}
                    >
                      <div className="rule-main">
                        <div className="rule-title">{rule.name}</div>
                        <div className="rule-desc">{rule.description}</div>
                      </div>
                      {selectedDifficulty !== 'daily' && (
                        <div className="rule-health-dots">
                          {[0, 1, 2].map((dot) => {
                            const dotActive = rule.durability > dot;
                            return (
                              <span
                                key={`health-${rule.key}-${idx}-${dot}`}
                                className={`health-dot ${dotActive ? 'health-dot--on' : ''}`}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
                {displayedVowelRules.length === 0 && (
                  <div className="rules-empty">No vowel cards yet.</div>
                )}
                </div>
              </div>
              <div className="rules-deck-column">
                <div className="rules-subtitle">{transformHintText("CONSONANT RULES")}</div>
                <div className="rules-deck rules-deck--split">
                {defeatedFlashes
                  .filter((flash) => flash.group === 'consonant')
                  .map((flash) => (
                    <div
                      key={`defeated-${flash.id}`}
                      className="rule-defeated-floater"
                      style={{
                        left: '50%',
                        transform: `translateX(calc(-50% + ${flash.offset}px)) translateY(${flash.rowY}px) rotate(${flash.tilt}deg)`
                      }}
                    >
                      <span className="rule-defeated-floater__text">CARD DEFEATED! +10</span>
                    </div>
                  ))}
                {displayedConsonantRules.map((rule, idx) => {
                  const count = displayedConsonantRules.length;
                  const { offset, tilt, rowY } = getFanLayout(idx, count, splitBaseSpread, effectiveCardScale);
                  const collapseCard = compactCards || compressAllCards;
                  return (
                    <div
                      key={rule.key}
                      className={`rule-card rule-card--hex ${recentRuleKeys.includes(rule.key) ? 'rule-card--new' : ''} ${collapseCard ? 'rule-card--collapsed' : ''}`}
                      style={{
                        backgroundColor: rule.color || pastelFromString(rule.key),
                        '--fan-x': `${offset}px`,
                        '--fan-rot': `${tilt}deg`,
                        '--fan-y': `${rowY}px`,
                        '--card-z': idx + 1,
                        '--card-delay': `${idx * 40}ms`,
                        '--card-scale': `${effectiveCardScale}`
                      }}
                    >
                      <div className="rule-main">
                        <div className="rule-title">{rule.name}</div>
                        <div className="rule-desc">{rule.description}</div>
                      </div>
                      {selectedDifficulty !== 'daily' && (
                        <div className="rule-health-dots">
                          {[0, 1, 2].map((dot) => {
                            const dotActive = rule.durability > dot;
                            return (
                              <span
                                key={`health-${rule.key}-${idx}-${dot}`}
                                className={`health-dot ${dotActive ? 'health-dot--on' : ''}`}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
                {displayedConsonantRules.length === 0 && (
                  <div className="rules-empty">No consonant cards yet.</div>
                )}
                </div>
              </div>
            </div>
          )}
        </div>

        {showHints && (
          <div className="hint-text-stack">
            <p key={`hint-text-${incomingRevealId}`} className="hint-text hint-incoming--fade">{transformedHint}</p>
            {outgoingReveal && (
              <p className="hint-text hint-text--fade hint-text--overlay" aria-hidden="true">
                {outgoingReveal.hintText}
              </p>
            )}
          </div>
        )}
        <div className="hint-visual-stack">
          <div
            key={`${displayFlashId}-${incomingRevealId}`}
            className={`hint-visual ${isDisplayFlashing && !isWrongRevealing ? 'hint-visual--flash' : ''} ${isWrongRevealing ? 'hint-visual--wrong' : ''} ${isPenaltyWrongRevealing ? 'hint-visual--penalty-wrong' : ''} ${isShaking ? 'hint-visual--shake' : ''} ${hideHintVisual ? 'hint-visual--hidden' : ''}`}
            aria-label={`Word length ${lockedSpelling.length}`}
            onClick={() => inputRef.current?.focus()}
          >
            {lockedSpelling.split('').map((_, idx) => {
              const typedChar = (displayInput || input).toUpperCase()[idx];
              return (
              <span 
                key={`hint-${idx}`} 
                className={`hint-underscore hint-underscore--incoming ${typedChar ? 'hint-underscore--typed' : ''} ${isPenaltyWrongRevealing && typedChar ? 'hint-underscore--penalty-fade' : ''} ${showHelper && lockedHintMask[idx] ? 'hint-underscore--changed' : ''}`}
              >
                <span className="hint-underscore__base">_</span>
                {typedChar && <span className="hint-underscore__typed-char">{typedChar}</span>}
              </span>
            );
            })}
          </div>
          {outgoingReveal && (
            <div
              className={`hint-visual hint-visual--overlay ${outgoingReveal.kind === 'wrong' ? 'hint-visual--wrong' : 'hint-visual--correct'}`}
              aria-hidden="true"
            >
              {outgoingReveal.spelling.split('').map((_, idx) => {
                const typedChar = (outgoingReveal.typedText || '').toUpperCase()[idx];
                return (
                  <span key={`outgoing-hint-${outgoingReveal.id}-${idx}`} className={`hint-underscore ${typedChar ? 'hint-underscore--typed' : ''}`}>
                    {outgoingReveal.showUnderscore && <span className="hint-underscore__base">_</span>}
                    {typedChar && <span className="hint-underscore__typed-char">{typedChar}</span>}
                  </span>
                );
              })}
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="spelling-form" ref={spellingFormRef}>
          {entryFloater && (
            <div
              key={entryFloater.id}
              className={`entry-floater entry-floater--${entryFloater.kind}`}
              ref={entryFloaterRef}
              style={{
                '--entry-tilt': `${entryFloater.angle}deg`,
                '--entry-x': `${entryFloater.xOffset}px`,
                '--entry-y': '0px'
              }}
              aria-hidden="true"
            >
              {entryFloater.text}
            </div>
          )}
          <input 
            ref={inputRef}
            autoFocus
            type="text" 
            value={input}
            onChange={(e) => {
              const next = e.target.value;
              if (isCorrectRevealing) return;
              if (ENABLE_MAX_LENGTH && next.length > lockedSpelling.length) return;
              setInput(next);
              setDisplayInput(next);
            }}
            className={`spelling-input spelling-input--ghost ${isShaking ? 'spelling-input--shake' : ''}`}
            aria-label="Type spelling"
            disabled={isGameOver || isPaused}
            maxLength={ENABLE_MAX_LENGTH ? lockedSpelling.length : undefined}
          />
          <button type="submit" className="hidden">Submit</button>
        </form>

        {!isGameOver && (
          <div className={`feedback-text ${feedback.includes('CORRECT WORD') ? 'feedback-wrong' : 'feedback-right'}`}>
            {feedback}
          </div>
        )}
      </div>

    </div>
  );
}

// src/App.jsx
import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react';
import './App.css';
import { RULES } from './data/rules'; // Import the rules data
import { hintDictionary } from './data/hint_dictionary';
import { levelData } from './data/levels'; // Import the words data
import { calculateTargetSpelling, isRuleBlocked, corruptText } from './utils/gameLogic';

const SOUND_ORDER = [
  'æ', 'ɑ', 'ɔ', 'eɪ', 'b', 'tʃ', 'd', 'i', 'ɛ', 'ɝ', 'ɚ', 'aɪ', 'f', 'g', 'h', 'ɪ',
  'dʒ', 'k', 'l', 'm', 'ŋ', 'n', 'oʊ', 'u', 'ɔɪ', 'p', 'r', 'ʃ', 's', 'θ', 'ð', 't',
  'ʌ', 'ə', 'ʊ', 'v', 'w', 'j', 'ʒ', 'z'
];
const SOUND_RANK = new Map(SOUND_ORDER.map((sound, index) => [sound, index]));
const getSoundRank = (soundId) => (SOUND_RANK.has(soundId) ? SOUND_RANK.get(soundId) : SOUND_ORDER.length + 100);
const sortRulesBySound = (rules) => (
  [...rules].sort((a, b) => {
    const rankDiff = getSoundRank(a.soundId) - getSoundRank(b.soundId);
    if (rankDiff !== 0) return rankDiff;
    return a.name.localeCompare(b.name, 'en');
  })
);
const VOWEL_SOUNDS = new Set([
  'æ', 'ɑ', 'ɔ', 'eɪ', 'i', 'ɛ', 'ɝ', 'ɚ', 'aɪ', 'ɪ', 'oʊ', 'u', 'ɔɪ', 'ʌ', 'ə', 'ʊ'
]);
const isVowelRule = (rule) => VOWEL_SOUNDS.has(rule.soundId);
const ENABLE_MAX_LENGTH = false;

const shuffleLevels = (levels) => {
  const copy = [...levels];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
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
  const [timeLeftMs, setTimeLeftMs] = useState(0);
  const [pointsFlash, setPointsFlash] = useState('');
  const [pointsFlashId, setPointsFlashId] = useState(0);
  const [displayFlashId, setDisplayFlashId] = useState(0);
  const [isDisplayFlashing, setIsDisplayFlashing] = useState(false);
  const [defeatedFlashes, setDefeatedFlashes] = useState([]);
  const [isCorrectRevealing, setIsCorrectRevealing] = useState(false);
  const [isWrongRevealing, setIsWrongRevealing] = useState(false);
  const [entryFloater, setEntryFloater] = useState(null);
  const [wordsDefeated, setWordsDefeated] = useState(0);
  const [cardsCollected, setCardsCollected] = useState(0);
  const [cardsDefeated, setCardsDefeated] = useState(0);
  const defeatedFlashIdRef = useRef(0);
  const [recentRuleKeys, setRecentRuleKeys] = useState([]);
  const inputRef = useRef(null);
  const entryFloaterRef = useRef(null);
  const entryFloaterClampRef = useRef(0);
  const entryFloaterScaleRef = useRef(1);
  const spellingFormRef = useRef(null);
  const [showHelp, setShowHelp] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [wasPausedBeforeHelp, setWasPausedBeforeHelp] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [introScale, setIntroScale] = useState(1);
  const [isTimed, setIsTimed] = useState(true);
  const [showHints, setShowHints] = useState(true);
  const [showHelper, setShowHelper] = useState(true);
  const [difficultyPulse, setDifficultyPulse] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [splitByPhonemeType, setSplitByPhonemeType] = useState(true);
  const roundEndedRef = useRef(false);
  const pausedRef = useRef(false);
  const timePenaltyRef = useRef(0);
  const introCardRef = useRef(null);
  const introContentRef = useRef(null);
  const orderedRules = sortRulesBySound(activeRules);
  const vowelRules = orderedRules.filter(isVowelRule);
  const consonantRules = orderedRules.filter((rule) => !isVowelRule(rule));
  const displayedVowelRules = vowelRules.slice(0, 10);
  const displayedConsonantRules = consonantRules.slice(0, 10);
  const splitBaseSpread = 110;

  const correctFloaters = [
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
  ];

  const incorrectFloaters = [
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
  ];

  const triggerEntryFloater = (isCorrect) => {
    const options = isCorrect ? correctFloaters : incorrectFloaters;
    const text = options[Math.floor(Math.random() * options.length)];
    const xOffset = Math.floor(Math.random() * 41) - 20;
    const angleOptions = [-8, -7, -6, 6, 7, 8];
    const angle = angleOptions[Math.floor(Math.random() * angleOptions.length)];
    setEntryFloater({
      id: `${Date.now()}-${Math.random()}`,
      text,
      xOffset,
      angle,
      kind: isCorrect ? 'correct' : 'wrong'
    });
    setTimeout(() => setEntryFloater(null), 2000);
  };

  const handleOpenHelp = () => {
    setWasPausedBeforeHelp(isPaused);
    setIsPaused(true);
    setShowHelp(true);
  };

  const handleCloseHelp = () => {
    setShowHelp(false);
    if (!wasPausedBeforeHelp) {
      setIsPaused(false);
    }
    setWasPausedBeforeHelp(false);
  };

  const getFanLayout = (idx, total, baseSpread = 150, baseTilt = 3, rowThreshold = 10) => {
    const hasSecondRow = total > rowThreshold;
    const row = hasSecondRow && idx >= rowThreshold ? 1 : 0;
    const rowCount = hasSecondRow ? (row === 0 ? rowThreshold : total - rowThreshold) : total;
    const rowIndex = row === 0 ? idx : idx - rowThreshold;
    const spread = rowCount <= 5 ? baseSpread : baseSpread * (5 / rowCount);
    const offset = (rowIndex - (rowCount - 1) / 2) * spread;
    const tilt = (rowIndex - (rowCount - 1) / 2) * baseTilt;
    const rowY = row === 0 ? 0 : 90;
    return { offset, tilt, rowY };
  };
  
  const visibleLevels = levelData.filter((level) => !level.hidden);
  const [shuffledLevels, setShuffledLevels] = useState(() => buildWarmupOrder(visibleLevels));

  // Game Over State
  const isGameOver = lives <= 0;
  const hasWon = levelIndex >= shuffledLevels.length;

  // Get current level data
  const currentLevel = shuffledLevels[levelIndex] || {};
  
  // Calculate the target spelling dynamically based on current rules
  // We do this every render so the UI is always up to date
  const currentRuleKeys = Array.isArray(currentLevel.ruleKey)
    ? currentLevel.ruleKey
    : (currentLevel.ruleKey ? [currentLevel.ruleKey] : []);
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
  const [lockedSpelling, setLockedSpelling] = useState(targetSpelling);
  const lockedSpellingRef = useRef(targetSpelling);
  const [lockedHintMask, setLockedHintMask] = useState(hintMask);
  const lastLevelIndexRef = useRef(levelIndex);

  useEffect(() => {
    const levelChanged = levelIndex !== lastLevelIndexRef.current;
    if (!roundEndedRef.current || levelChanged) {
      setLockedSpelling(targetSpelling);
      lockedSpellingRef.current = targetSpelling;
      setLockedHintMask(hintMask);
    }
    if (levelChanged) lastLevelIndexRef.current = levelIndex;
  }, [targetSpelling, hintMask, levelIndex]);
  const caseifyHint = (original, replacement) => {
    if (!original) return replacement;
    if (original.toUpperCase() === original) return replacement.toUpperCase();
    const first = original[0];
    if (first && first.toUpperCase() === first) {
      return replacement[0].toUpperCase() + replacement.slice(1).toLowerCase();
    }
    return replacement.toLowerCase();
  };

  const transformHintWord = (word) => {
    const key = word.toUpperCase();
    const ruleKeys = hintDictionary[key];
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
    return caseifyHint(word, hintSpelling);
  };

  const shouldTransformHints = true;
  const transformHintText = (hint) => {
    if (!hint) return "";
    if (!shouldTransformHints) return hint;
    return hint.replace(/[A-Za-z]+/g, (match) => transformHintWord(match));
  };

  const transformedHint = transformHintText(currentLevel.hint || "");

  const generatePastelHex = () => {
    const channel = () => Math.floor(170 + Math.random() * 70).toString(16).padStart(2, '0');
    return `#${channel()}${channel()}${channel()}`;
  };

  const introRuleCards = useMemo(() => ([
    { ...RULES.SH_S, color: generatePastelHex() },
    { ...RULES.OO_OUP, color: generatePastelHex() }
  ]), []);

  const triggerShake = () => {
    setIsShaking(false);
    setTimeout(() => setIsShaking(true), 0);
    setTimeout(() => setIsShaking(false), 350);
  };

  const resetGame = () => {
    setActiveRules([]);
    setLives(3);
    setScore(0);
    setLevelIndex(0);
    setInput('');
    setFeedback('');
    setTimeLeft(0);
    setRoundSeconds(0);
    setTimeLeftMs(0);
    setPointsFlash('');
    setPointsFlashId((prev) => prev + 1);
    setIsCorrectRevealing(false);
    setIsWrongRevealing(false);
    setDisplayInput('');
    setEntryFloater(null);
    setWordsDefeated(0);
    setCardsCollected(0);
    setCardsDefeated(0);
    setIsPaused(false);
    setShowIntro(false);
    setHasStarted(true);
    pausedRef.current = false;
    roundEndedRef.current = false;
    timePenaltyRef.current = 0;
    setRecentRuleKeys([]);
    setShuffledLevels(buildWarmupOrder(visibleLevels));
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

  useEffect(() => {
    if (!hasStarted) return undefined;
    if (isGameOver || hasWon) return undefined;
    setIsCorrectRevealing(false);
    setIsWrongRevealing(false);
    setDisplayInput('');
    setEntryFloater(null);
    roundEndedRef.current = false;
    if (!isTimed) {
      setRoundSeconds(0);
      setTimeLeft(0);
      setTimeLeftMs(0);
      timePenaltyRef.current = 0;
      return undefined;
    }
    const baseSeconds = 4 + (currentLevel.word ? currentLevel.word.length * 2 : 0);
    setRoundSeconds(baseSeconds);
    setTimeLeft(baseSeconds);
    setTimeLeftMs(baseSeconds * 1000);
    timePenaltyRef.current = 0;
    let elapsedMs = 0;
    let lastTick = performance.now();
    const roundDurationMs = baseSeconds * 1000;
    const timer = setInterval(() => {
      const now = performance.now();
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
        handleFailure();
      }
    }, 50);
    return () => {
      clearInterval(timer);
    };
  }, [levelIndex, isGameOver, hasWon, currentLevel.word, hasStarted, isTimed]);

  useEffect(() => {
    if (!showIntro) return undefined;
    const updateScale = () => {
      if (!introCardRef.current || !introContentRef.current) return;
      const naturalHeight = introContentRef.current.scrollHeight;
      const naturalWidth = introContentRef.current.scrollWidth;
      const styles = window.getComputedStyle(introCardRef.current);
      const paddingY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
      const paddingX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);

      const availableHeight = Math.max(0, window.innerHeight - 120);
      const availableWidth = Math.min(560, Math.max(0, window.innerWidth - 40));

      const safetyPad = 24;
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
  }, [showIntro]);

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
    if (mode === 'honeybee') {
      setIsTimed(true);
      setShowHints(true);
      setShowHelper(true);
    } else if (mode === 'bumblebee') {
      setIsTimed(true);
      setShowHints(true);
      setShowHelper(true);
    } else if (mode === 'hornet') {
      setIsTimed(true);
      setShowHints(true);
      setShowHelper(false);
    } else if (mode === 'killer') {
      setIsTimed(true);
      setShowHints(true);
      setShowHelper(true);
    } else {
      setIsTimed(false);
      setShowHints(true);
      setShowHelper(true);
    }
    setShowIntro(false);
    setHasStarted(true);
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isGameOver || hasWon || roundEndedRef.current || isPaused) return;

    const guess = input.toUpperCase().trim();

    if (guess === targetSpelling) {
      handleSuccess();
    } else {
      if (selectedDifficulty === 'hornet') {
        handleFailure();
      } else {
        handleIncorrectAttempt(guess);
      }
    }
  };

  const handleSuccess = () => {
    roundEndedRef.current = true;
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
      ? 2
      : selectedDifficulty === 'bumblebee'
        ? 4
        : Infinity;
    const candidateRuleKeys = entryRuleKeys.filter((ruleKey) => {
      const ruleDefinition = RULES[ruleKey];
      return ruleDefinition && !isRuleBlocked(ruleDefinition, aliveRules, ruleKey);
    });
    const shuffledCandidates = [...candidateRuleKeys];
    for (let i = shuffledCandidates.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCandidates[i], shuffledCandidates[j]] = [shuffledCandidates[j], shuffledCandidates[i]];
    }
    const newRuleKeys = maxNewRules === Infinity
      ? shuffledCandidates
      : shuffledCandidates.slice(0, maxNewRules);

    newRuleKeys.forEach((ruleKey) => {
      const ruleDefinition = RULES[ruleKey];

      // We check if the rule exists AND if it isn't blocked by a mutex group
      if (ruleDefinition && !isRuleBlocked(ruleDefinition, aliveRules, ruleKey)) {
        const isVowel = isVowelRule(ruleDefinition);
        const vowelCount = aliveRules.filter(isVowelRule).length;
        const consonantCount = aliveRules.length - vowelCount;
        const withinCap = isVowel ? vowelCount < 10 : consonantCount < 10;
        if (!withinCap) return;
        // Add the new rule with a 'key' property so we can track it
        aliveRules.push({ 
          ...ruleDefinition, 
          key: ruleKey, 
          durability: ruleDefinition.maxDurability,
          color: generatePastelHex()
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
    if (crumbledCount > 0) {
      const sortedNextRules = sortRulesBySound(nextRules);
      const sortedVowels = sortedNextRules.filter(isVowelRule);
      const sortedConsonants = sortedNextRules.filter((rule) => !isVowelRule(rule));
      const newFlashes = defeatedIndices.map((idx) => {
        const defeatedRule = nextRules[idx];
        const isVowel = isVowelRule(defeatedRule);
        const groupRules = splitByPhonemeType
          ? (isVowel ? sortedVowels.slice(0, 10) : sortedConsonants.slice(0, 10))
          : sortedNextRules;
        const displayIndex = groupRules.indexOf(defeatedRule);
        const count = groupRules.length;
        if (displayIndex === -1) return null;
        defeatedFlashIdRef.current += 1;
        const { offset, tilt, rowY } = getFanLayout(
          displayIndex,
          count,
          splitBaseSpread,
          3,
          splitByPhonemeType ? 5 : 10
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
    setInput('');
    setDisplayInput(input);
    setIsCorrectRevealing(true);
    
    // Move to next level after a short delay
    setTimeout(() => {
      setFeedback('');
      setIsCorrectRevealing(false);
      setDisplayInput('');
      setLevelIndex(levelIndex + 1);
    }, 1000);
  };

  const handleFailure = () => {
    roundEndedRef.current = true;
    triggerShake();
    triggerEntryFloater(false);
    setFeedback('');
    setDisplayInput(lockedSpellingRef.current);
    setIsWrongRevealing(true);
    const nextLives = lives - 1;
    setLives(nextLives);
    setInput('');
    setTimeout(() => {
      setFeedback('');
      setIsWrongRevealing(false);
      setDisplayInput('');
      if (nextLives > 0) {
        setLevelIndex(levelIndex + 1);
      }
    }, 1200);
  };


  const handleIncorrectAttempt = (guess) => {
    const penaltyMs = selectedDifficulty === 'honeybee'
      ? 2000
      : selectedDifficulty === 'bumblebee'
        ? 4000
        : selectedDifficulty === 'killer'
          ? 8000
          : 0;
    if (penaltyMs > 0 && isTimed) {
      if (timeLeftMs <= penaltyMs) {
        handleFailure();
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
    setIsWrongRevealing(true);
    setInput('');
    setTimeout(() => {
      setIsWrongRevealing(false);
      setDisplayInput('');
    }, 500);
  };

  // --- RENDER ---

  if (hasWon) return <div className="p-10 text-4xl font-mono text-center" style={{ color: '#00cc33' }}>YOU SURVIVED<br/>Final Score: {score}</div>;

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
          <div className="intro-card" ref={introCardRef} onClick={(e) => e.stopPropagation()}>
            <div
              className="intro-card__content"
              ref={introContentRef}
              style={{ transform: `scale(${introScale})` }}
            >
              <div className="intro-title header-title" aria-label="Son of a Bee">
                <span className="header-title__top">{transformHintText("SON OF A")}</span>
                <span className="header-title__bottom">{transformHintText("BEE")}</span>
              </div>
              <div className="intro-subtitle">
                English makes no sense. <span className="intro-green">Let's make it worse.</span>
              </div>
              <div className="intro-subtitle-break" />
              <div className="intro-steps">
                <div className="intro-step">
                  <span className="intro-step__number">1.</span>
                  <span className="intro-step__text"><strong>SPELL</strong> out the word based on the hint.</span>
                </div>
                <div className="intro-step-spacer intro-step-spacer--tight" />
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
                      className={`rule-card intro-rule-card intro-rule-card--${idx === 0 ? 'left' : 'right'}`}
                      style={{ backgroundColor: rule.color }}
                    >
                      <div className="rule-main">
                        <div className="rule-title">{rule.name}</div>
                        <div className="rule-desc">{rule.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="intro-step">
                  <span className="intro-step__number">3.</span>
                  <span className="intro-step__text"><strong>ADAPT</strong> your spelling to match the new rules.</span>
                </div>
                <div className="intro-step-spacer intro-step-spacer--tight" />
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
              <div className="intro-subtitle intro-subtitle--spacious">CHOOSE YOUR DIFFICULTY:</div>
              <div className={`difficulty-grid ${difficultyPulse ? 'difficulty-grid--pulse' : ''}`}>
                <button
                  className={`difficulty-option ${selectedDifficulty === 'honeybee' ? 'difficulty-option--selected' : ''}`}
                  onClick={() => setSelectedDifficulty('honeybee')}
                  aria-label="Honeybee difficulty"
                  aria-pressed={selectedDifficulty === 'honeybee'}
                >
                  <span className="difficulty-hex" aria-hidden="true" />
                  <div className="difficulty-name">HONEY BEE</div>
                  <div className="difficulty-desc">2s PENALTY PER WRONG ANSWER</div>
                  <div className="difficulty-desc">UP TO 2 NEW RULES PER ROUND</div>
                </button>
                <button
                  className={`difficulty-option ${selectedDifficulty === 'bumblebee' ? 'difficulty-option--selected' : ''}`}
                  onClick={() => setSelectedDifficulty('bumblebee')}
                  aria-label="Bumblebee difficulty"
                  aria-pressed={selectedDifficulty === 'bumblebee'}
                >
                  <span className="difficulty-hex difficulty-hex--warn" aria-hidden="true">
                    <span className="difficulty-mark">!</span>
                  </span>
                  <div className="difficulty-name">BUMBLE BEE</div>
                  <div className="difficulty-desc">4s PENALTY PER WRONG ANSWER</div>
                  <div className="difficulty-desc">UP TO 4 NEW RULES PER ROUND</div>
                </button>
                <button
                  className={`difficulty-option ${selectedDifficulty === 'killer' ? 'difficulty-option--selected' : ''}`}
                  onClick={() => setSelectedDifficulty('killer')}
                  aria-label="Killer Bee difficulty"
                  aria-pressed={selectedDifficulty === 'killer'}
                >
                  <span className="difficulty-hex difficulty-hex--danger" aria-hidden="true">
                    <span className="difficulty-mark">!!</span>
                  </span>
                  <div className="difficulty-name">KILLER BEE</div>
                  <div className="difficulty-desc">8s PENALTY PER WRONG ANSWER</div>
                  <div className="difficulty-desc">UNLIMITED NEW RULES PER ROUND</div>
                </button>
                <button
                  className={`difficulty-option ${selectedDifficulty === 'hornet' ? 'difficulty-option--selected' : ''}`}
                  onClick={() => setSelectedDifficulty('hornet')}
                  aria-label="Hornet difficulty"
                  aria-pressed={selectedDifficulty === 'hornet'}
                >
                  <span className="difficulty-hex difficulty-hex--danger" aria-hidden="true">
                    <span className="difficulty-mark">!!!</span>
                  </span>
                  <div className="difficulty-name">HORNET</div>
                  <div className="difficulty-desc">WRONG ANSWER = LOST LIFE</div>
                  <div className="difficulty-desc">NO HINTS FOR CHANGED LETTERS</div>
                </button>
              </div>
              <button
                className="intro-button"
                onClick={() => handleStartGame(selectedDifficulty)}
                disabled={!selectedDifficulty}
              >
                LET'S BEE-GIN
              </button>
            </div>
          </div>
        </div>
      )}
      {isPaused && !showHelp && (
        <div className="pause-overlay" role="dialog" aria-modal="true">
          <button className="pause-button" onClick={() => setIsPaused(false)}>
            <span className="pause-button__icon">▶</span>
          </button>
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
      <button
        className={`pause-toggle ${isPaused ? "pause-toggle--active" : "pause-toggle--inactive"}`}
        onClick={() => setIsPaused((prev) => !prev)}
        aria-label={isPaused ? "Resume game" : "Pause game"}
      >
        {isPaused ? "▶" : "⏸︎"}
      </button>
      {showHelp && (
        <div className="help-overlay" role="dialog" aria-modal="true" onClick={handleCloseHelp}>
          <div className="help-card" onClick={(event) => event.stopPropagation()}>
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
            <button className="help-close" onClick={handleCloseHelp}>Close</button>
          </div>
        </div>
      )}
      {isGameOver && (
        <div className="pause-overlay" role="dialog" aria-modal="true">
          <div className="game-over-modal">
            <div className="game-over-title">GAME OVER</div>
            <div className="game-over-score">CORRECT WORD: {targetSpelling}</div>
            <div className="game-over-stat">Your Score: {score}</div>
            <div className="game-over-stat">Words Defeated: {wordsDefeated}</div>
            <div className="game-over-stat">Cards Collected: {cardsCollected}</div>
            <div className="game-over-stat">Cards Defeated: {cardsDefeated}</div>
            <button className="game-over-button" onClick={resetGame}>Try Again?</button>
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
          <div className="rules-title__stack">
            <span className="rules-title__label">{transformHintText("SCORE")}</span>
            <span className="rules-title__score">{score}</span>
            <span key={pointsFlashId} className="score-bonus">
              {pointsFlash}
            </span>
          </div>
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
        </div>
        <div className={`rules-section ${splitByPhonemeType ? 'rules-section--split' : ''}`}>
          {/* ACTIVE RULES LIST */}
          {!splitByPhonemeType && (
            <div className={`rules-deck ${activeRules.length > 10 ? 'rules-deck--two-rows' : ''}`}>
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
                const { offset, tilt, rowY } = getFanLayout(idx, count);
                const healthPercent = Math.max(
                  0,
                  Math.min(100, Math.round((rule.durability / rule.maxDurability) * 100))
                );
                return (
                <div 
                  key={rule.key} 
                  className={`rule-card ${recentRuleKeys.includes(rule.key) ? 'rule-card--new' : ''}`}
                  style={{ 
                    backgroundColor: rule.color || generatePastelHex(),
                    '--fan-x': `${offset}px`,
                    '--fan-rot': `${tilt}deg`,
                    '--fan-y': `${rowY}px`,
                    '--card-z': idx + 1,
                    '--card-delay': `${idx * 40}ms`
                  }}
                >
                    <div className="rule-main">
                      <div className="rule-title">{rule.name}</div>
                      <div className="rule-desc">{rule.description}</div>
                    </div>
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
                  const { offset, tilt, rowY } = getFanLayout(idx, count, splitBaseSpread, 3, 5);
                  const healthPercent = Math.max(
                    0,
                    Math.min(100, Math.round((rule.durability / rule.maxDurability) * 100))
                  );
                  return (
                    <div
                      key={rule.key}
                      className={`rule-card ${recentRuleKeys.includes(rule.key) ? 'rule-card--new' : ''}`}
                      style={{
                        backgroundColor: rule.color || generatePastelHex(),
                        '--fan-x': `${offset}px`,
                        '--fan-rot': `${tilt}deg`,
                        '--fan-y': `${rowY}px`,
                        '--card-z': idx + 1,
                        '--card-delay': `${idx * 40}ms`
                      }}
                    >
                      <div className="rule-main">
                        <div className="rule-title">{rule.name}</div>
                        <div className="rule-desc">{rule.description}</div>
                      </div>
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
                  const { offset, tilt, rowY } = getFanLayout(idx, count, splitBaseSpread, 3, 5);
                  const healthPercent = Math.max(
                    0,
                    Math.min(100, Math.round((rule.durability / rule.maxDurability) * 100))
                  );
                  return (
                    <div
                      key={rule.key}
                      className={`rule-card ${recentRuleKeys.includes(rule.key) ? 'rule-card--new' : ''}`}
                      style={{
                        backgroundColor: rule.color || generatePastelHex(),
                        '--fan-x': `${offset}px`,
                        '--fan-rot': `${tilt}deg`,
                        '--fan-y': `${rowY}px`,
                        '--card-z': idx + 1,
                        '--card-delay': `${idx * 40}ms`
                      }}
                    >
                      <div className="rule-main">
                        <div className="rule-title">{rule.name}</div>
                        <div className="rule-desc">{rule.description}</div>
                      </div>
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
          <>
            <h2 className={`hint-label ${isCorrectRevealing ? 'hint-label--fade' : ''}`}>{transformHintText("CLUE")}</h2>
            <p className={`hint-text ${isCorrectRevealing ? 'hint-text--fade' : ''}`}>{transformedHint}</p>
          </>
        )}
        <div
          key={displayFlashId}
          className={`hint-visual ${isDisplayFlashing && !isCorrectRevealing && !isWrongRevealing ? 'hint-visual--flash' : ''} ${isCorrectRevealing ? 'hint-visual--correct' : ''} ${isWrongRevealing ? 'hint-visual--wrong' : ''} ${isShaking ? 'hint-visual--shake' : ''}`}
          aria-label={`Word length ${lockedSpelling.length}`}
          onClick={() => inputRef.current?.focus()}
        >
          {lockedSpelling.split('').map((_, idx) => {
            const typedChar = (displayInput || input).toUpperCase()[idx];
            return (
            <span 
              key={`hint-${idx}`} 
              className={`hint-underscore ${typedChar ? 'hint-underscore--typed' : ''} ${showHelper && lockedHintMask[idx] ? 'hint-underscore--changed' : ''}`}
            >
              {typedChar || '_'}
            </span>
          );
          })}
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

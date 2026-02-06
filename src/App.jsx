// src/App.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';
import { RULES } from './data/rules'; // Import the rules data
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
const MIN_WORD_LENGTH = 8;

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
      return length >= MIN_WORD_LENGTH;
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
  const [showHelp, setShowHelp] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [wasPausedBeforeHelp, setWasPausedBeforeHelp] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [introScale, setIntroScale] = useState(1);
  const [splitByPhonemeType, setSplitByPhonemeType] = useState(true);
  const roundEndedRef = useRef(false);
  const pausedRef = useRef(false);
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
    "BUZZ KILL. ☠️",
    "OH, HONEY...",
    "WING AND A MISS.",
    "THAT’S GOTTA STING.",
    "HIVE MIND SAYS NO.",
    "DRONE BEHAVIOR. 🤖",
    "BEE-TRAYAL!",
    "NON-HIVE COMPLIANT.",
    "LARVA LEVEL. 🐛",
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
    const angle = Math.floor(Math.random() * 31) - 15;
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
  const { targetSpelling, usedRules, hintMask } = calculateTargetSpelling(
    currentLevel.word || '', 
    activeRules
  );
  const transformedHint = currentLevel.hint || "";

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
    const baseSeconds = 4 + (currentLevel.word ? currentLevel.word.length * 2 : 0);
    setRoundSeconds(baseSeconds);
    setTimeLeft(baseSeconds);
    setTimeLeftMs(baseSeconds * 1000);
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
      const remainingMs = Math.max(0, roundDurationMs - elapsedMs);
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
  }, [levelIndex, isGameOver, hasWon, currentLevel.word, hasStarted]);

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

  // --- ACTIONS ---
  const handleStartGame = () => {
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
      handleFailure();
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
    const newRuleKeys = Array.isArray(currentLevel.ruleKey)
      ? currentLevel.ruleKey
      : (currentLevel.ruleKey ? [currentLevel.ruleKey] : []);

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
    setDisplayInput(targetSpelling);
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

  // --- RENDER ---

  if (hasWon) return <div className="p-10 text-4xl font-mono text-center" style={{ color: '#00cc33' }}>YOU SURVIVED<br/>Final Score: {score}</div>;

  return (
    <div
      className="app-shell min-h-screen font-mono flex flex-col items-center"
      onClick={() => inputRef.current?.focus()}
    >
      {showIntro && (
        <div className="intro-overlay" role="dialog" aria-modal="true">
          <div className="intro-card" ref={introCardRef}>
            <div
              className="intro-card__content"
              ref={introContentRef}
              style={{ transform: `scale(${introScale})` }}
            >
              <div className="intro-title header-title" aria-label="Son of a Bee">
                <span className="header-title__top">SON OF A</span>
                <span className="header-title__bottom">BEE</span>
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
                <div className="intro-step-spacer" />
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
                  {introRuleCards.map((rule) => (
                    <div
                      key={rule.name}
                      className="rule-card intro-rule-card"
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
                <div className="intro-step-spacer" />
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
              <button className="intro-button" onClick={handleStartGame}>LET'S BEE-GIN</button>
            </div>
          </div>
        </div>
      )}
      {isPaused && !showHelp && (
        <div className="pause-overlay" role="dialog" aria-modal="true">
          <div className="pause-title">Paused</div>
          <button className="pause-button" onClick={() => setIsPaused(false)}>Resume</button>
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
          <span className="header-title__top">SON OF A</span>
          <span className="header-title__bottom">BEE</span>
        </div>
        <div className="header-side" />
      </div>
      <button className="help-button" onClick={handleOpenHelp} aria-label="Show rules">
        ?
      </button>
      <button
        className="pause-toggle"
        onClick={() => setIsPaused((prev) => !prev)}
        aria-label={isPaused ? "Resume game" : "Pause game"}
      >
        {isPaused ? "Resume" : "Pause"}
      </button>
      {showHelp && (
        <div className="help-overlay" role="dialog" aria-modal="true" onClick={handleCloseHelp}>
          <div className="help-card" onClick={(event) => event.stopPropagation()}>
            <h3>How It Works</h3>
            <ul>
              <li>Active rules change the spelling you must type.</li>
              <li>Underscores show word length; green marks altered letters.</li>
              <li>Bonus points count down only in the last 10 seconds.</li>
              <li>Correct answers score remaining seconds; wrong answers lose a life.</li>
              <li>Breaking a rule card grants +10 points.</li>
            </ul>
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
        <div className="bonus-bar">
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
          <span className="rules-title__score">SCORE: {score}</span>
          <span key={pointsFlashId} className="score-bonus">
            {pointsFlash}
          </span>
          <span className="rules-title__lives">LIVES: {'♥ '.repeat(lives)}</span>
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
                <div className="rules-subtitle">VOWEL RULES</div>
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
                <div className="rules-subtitle">CONSONANT RULES</div>
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

        <h2 className={`hint-label ${isCorrectRevealing ? 'hint-label--fade' : ''}`}>HINT</h2>
        <p className={`hint-text ${isCorrectRevealing ? 'hint-text--fade' : ''}`}>{transformedHint}</p>
        <div
          key={displayFlashId}
          className={`hint-visual ${isDisplayFlashing && !isCorrectRevealing && !isWrongRevealing ? 'hint-visual--flash' : ''} ${isCorrectRevealing ? 'hint-visual--correct' : ''} ${isWrongRevealing ? 'hint-visual--wrong' : ''} ${isShaking ? 'hint-visual--shake' : ''}`}
          aria-label={`Word length ${targetSpelling.length}`}
          onClick={() => inputRef.current?.focus()}
        >
          {targetSpelling.split('').map((_, idx) => {
            const typedChar = (displayInput || input).toUpperCase()[idx];
            return (
            <span 
              key={`hint-${idx}`} 
              className={`hint-underscore ${typedChar ? 'hint-underscore--typed' : ''} ${hintMask[idx] ? 'hint-underscore--changed' : ''}`}
            >
              {typedChar || '_'}
            </span>
          );
          })}
        </div>
        
        <form onSubmit={handleSubmit} className="spelling-form">
          {entryFloater && (
            <div
              key={entryFloater.id}
              className={`entry-floater entry-floater--${entryFloater.kind}`}
              style={{
                '--entry-tilt': `${entryFloater.angle}deg`,
                '--entry-x': `${entryFloater.xOffset}px`
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
              if (ENABLE_MAX_LENGTH && next.length > targetSpelling.length) return;
              setInput(next);
              setDisplayInput(next);
            }}
            className={`spelling-input spelling-input--ghost ${isShaking ? 'spelling-input--shake' : ''}`}
            aria-label="Type spelling"
            disabled={isGameOver || isPaused}
            maxLength={ENABLE_MAX_LENGTH ? targetSpelling.length : undefined}
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

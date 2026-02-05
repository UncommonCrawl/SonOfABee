// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { RULES } from './data/rules'; // Import the rules data
import { levelData } from './data/levels'; // Import the words data
import { calculateTargetSpelling, isRuleBlocked, corruptText } from './utils/gameLogic';

const shuffleLevels = (levels) => {
  const copy = [...levels];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export default function App() {
  // --- STATE ---
  const [activeRules, setActiveRules] = useState([]); // Array of rule objects
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [levelIndex, setLevelIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(''); // Messages like "CORRECT!"
  const [timeLeft, setTimeLeft] = useState(0);
  const [roundSeconds, setRoundSeconds] = useState(0);
  const [timeLeftMs, setTimeLeftMs] = useState(0);
  const [pointsFlash, setPointsFlash] = useState('');
  const [pointsFlashId, setPointsFlashId] = useState(0);
  const [displayFlashId, setDisplayFlashId] = useState(0);
  const [isDisplayFlashing, setIsDisplayFlashing] = useState(false);
  const [defeatedFlashes, setDefeatedFlashes] = useState([]);
  const [wordsDefeated, setWordsDefeated] = useState(0);
  const [cardsCollected, setCardsCollected] = useState(0);
  const [cardsDefeated, setCardsDefeated] = useState(0);
  const defeatedFlashIdRef = useRef(0);
  const [showHelp, setShowHelp] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const roundEndedRef = useRef(false);
  const pausedRef = useRef(false);

  const getFanLayout = (idx, total, baseSpread = 150, baseTilt = 3, rowThreshold = 10) => {
    const hasSecondRow = total > rowThreshold;
    const row = hasSecondRow && idx >= rowThreshold ? 1 : 0;
    const rowCount = hasSecondRow ? (row === 0 ? rowThreshold : total - rowThreshold) : total;
    const rowIndex = row === 0 ? idx : idx - rowThreshold;
    const spread = rowCount <= 5 ? baseSpread : baseSpread * (5 / rowCount);
    const offset = (rowIndex - (rowCount - 1) / 2) * spread;
    const tilt = (rowIndex - (rowCount - 1) / 2) * baseTilt;
    const rowY = row === 0 ? 0 : 150;
    return { offset, tilt, rowY };
  };
  
  const visibleLevels = levelData.filter((level) => !level.hidden);
  const [shuffledLevels, setShuffledLevels] = useState(() => shuffleLevels(visibleLevels));

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
    setWordsDefeated(0);
    setCardsCollected(0);
    setCardsDefeated(0);
    setIsPaused(false);
    pausedRef.current = false;
    roundEndedRef.current = false;
    setShuffledLevels(shuffleLevels(visibleLevels));
  };

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (isGameOver || hasWon) return undefined;
    roundEndedRef.current = false;
    const baseSeconds = 10 + (currentLevel.word ? currentLevel.word.length : 0);
    setRoundSeconds(baseSeconds);
    setTimeLeft(baseSeconds);
    setTimeLeftMs(baseSeconds * 1000);
    let elapsed = 0;
    const timer = setInterval(() => {
      if (pausedRef.current) return;
      if (roundEndedRef.current) return;
      elapsed += 1;
      const remaining = baseSeconds - elapsed;
      if (remaining <= 0) {
        roundEndedRef.current = true;
        setTimeLeft(0);
        setTimeLeftMs(0);
        clearInterval(timer);
        clearInterval(smoothTimer);
        handleFailure();
        return;
      }
      setTimeLeft(remaining);
    }, 1000);
    const smoothTimer = setInterval(() => {
      setTimeLeftMs((prev) => {
        if (roundEndedRef.current || pausedRef.current) return prev;
        return Math.max(0, prev - 50);
      });
    }, 50);
    return () => {
      clearInterval(timer);
      clearInterval(smoothTimer);
    };
  }, [levelIndex, isGameOver, hasWon, currentLevel.word]);

  // --- ACTIONS ---

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
      if (
        ruleDefinition &&
        !isRuleBlocked(ruleDefinition, aliveRules, ruleKey) &&
        aliveRules.length < 20
      ) {
        // Add the new rule with a 'key' property so we can track it
        aliveRules.push({ 
          ...ruleDefinition, 
          key: ruleKey, 
          durability: ruleDefinition.maxDurability,
          color: generatePastelHex()
        });
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
      const count = nextRules.length;
      const newFlashes = defeatedIndices.map((idx) => {
        defeatedFlashIdRef.current += 1;
        const { offset, tilt, rowY } = getFanLayout(idx, count);
        return { id: defeatedFlashIdRef.current, offset, tilt, rowY };
      });
      setDefeatedFlashes((prev) => [...prev, ...newFlashes]);
      newFlashes.forEach((flash) => {
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
    setIsDisplayFlashing(true);
    setTimeout(() => setIsDisplayFlashing(false), 450);
    setInput('');
    
    // Move to next level after a short delay
    setTimeout(() => {
      setFeedback('');
      setLevelIndex(levelIndex + 1);
    }, 1500);
  };

  const handleFailure = () => {
    roundEndedRef.current = true;
    triggerShake();
    setFeedback(`CORRECT WORD: ${targetSpelling}`);
    const nextLives = lives - 1;
    setLives(nextLives);
    setInput('');
    setTimeout(() => {
      setFeedback('');
      if (nextLives > 0) {
        setLevelIndex(levelIndex + 1);
      }
    }, 1200);
  };

  // --- RENDER ---

  if (hasWon) return <div className="p-10 text-green-500 text-4xl font-mono text-center">YOU SURVIVED<br/>Final Score: {score}</div>;

  return (
    <div className="app-shell min-h-screen font-mono flex flex-col items-center">
      {isPaused && (
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
      <div className="w-full max-w-2xl flex justify-between mb-8 header-bar">
        <div className="header-side">LIVES: {'♥ '.repeat(lives)}</div>
        <div className="header-title">BEE PLUS</div>
        <div className="header-side">
          SCORE: {score}
          <span key={pointsFlashId} className="score-bonus">
            {pointsFlash}
          </span>
        </div>
      </div>
      <button className="help-button" onClick={() => setShowHelp(true)} aria-label="Show rules">
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
        <div className="help-overlay" role="dialog" aria-modal="true">
          <div className="help-card">
            <h3>How It Works</h3>
            <ul>
              <li>Active rules change the spelling you must type.</li>
              <li>Underscores show word length; green marks altered letters.</li>
              <li>Bonus points count down only in the last 10 seconds.</li>
              <li>Correct answers score remaining seconds; wrong answers lose a life.</li>
              <li>Breaking a rule card grants +10 points.</li>
            </ul>
            <button className="help-close" onClick={() => setShowHelp(false)}>Close</button>
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
      <div className="w-full max-w-2xl text-center">
        <div className="bonus-bar">
          <div 
            className="bonus-fill" 
            style={{ width: `${Math.max(0, Math.min(100, (timeLeftMs / 10000) * 100))}%` }} 
          />
        </div>
        {activeRules.length > 0 && <div className="rules-title">ACTIVE RULES</div>}
        <div className="rules-section">
          {/* ACTIVE RULES LIST */}
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
            {activeRules.map((rule, idx) => {
              const count = activeRules.length;
              const { offset, tilt, rowY } = getFanLayout(idx, count);
              const healthPercent = Math.max(
                0, 
                Math.min(100, Math.round((rule.durability / rule.maxDurability) * 100))
              );
              return (
                <div 
                  key={`${rule.key}-${idx}`} 
                  className="rule-card"
                  style={{ 
                    backgroundColor: rule.color || generatePastelHex(),
                    '--fan-x': `${offset}px`,
                    '--fan-rot': `${tilt}deg`,
                    '--fan-y': `${rowY}px`,
                    '--card-z': idx + 1
                  }}
                >
                  <div className="rule-main">
                    <div className="rule-title">{rule.name}</div>
                    <div className="rule-desc">{rule.description}</div>
                  </div>
                  <div className="rule-health">
                    <div className="rule-health-label">HEALTH</div>
                    <div className="health-bar">
                      <div className="health-fill" style={{ width: `${healthPercent}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
            {activeRules.length === 0 && (
              <div className="rules-empty">No active laws... yet.</div>
            )}
          </div>
        </div>

        <h2 className="hint-label">HINT</h2>
        <p className="hint-text">{transformedHint}</p>
        <div
          key={displayFlashId}
          className={`hint-visual ${isDisplayFlashing ? 'hint-visual--flash' : ''}`}
          aria-label={`Word length ${targetSpelling.length}`}
        >
          {targetSpelling.split('').map((_, idx) => {
            const typedChar = input.toUpperCase()[idx];
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
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mt-6">
          <input 
            autoFocus
            type="text" 
            value={input}
            onChange={(e) => {
              const next = e.target.value;
              if (next.length <= targetSpelling.length) {
                setInput(next);
              }
            }}
            className={`spelling-input ${isShaking ? 'spelling-input--shake' : ''}`}
            placeholder="TYPE HERE"
            disabled={isGameOver || isPaused}
            maxLength={targetSpelling.length}
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

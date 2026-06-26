'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, RotateCcw, GitBranch, TrendingDown, TrendingUp,
  Clock, DollarSign, Heart, Brain, Users, Globe, Zap, Check, X,
  Sparkles, Compass, AlertTriangle, Lock, Unlock
} from 'lucide-react';
import { ExploreAnotherFuture, SectionHeading } from '../Shared';

// ═══════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════
type PathType = 'traditional' | 'artemis';

interface Decision {
  id: string;
  age: string;
  phase: string;
  prompt: string;
  question: string;
  options: {
    label: string;
    path: PathType;
    consequence: string;
    statChanges: Partial<Stats>;
  }[];
  icon: React.ElementType;
}

interface Stats {
  curiosity: number;
  freedom: number;
  mastery: number;
  purpose: number;
  debt: number;
  fulfillment: number;
}

interface PathOutcome {
  path: PathType;
  title: string;
  tagline: string;
  description: string;
  stats: Stats;
  color: string;
  icon: React.ElementType;
}

// ═══════════════════════════════════════════════════════════
// DECISION TREE — 7 key life moments
// ═══════════════════════════════════════════════════════════
const DECISIONS: Decision[] = [
  {
    id: 'childhood',
    age: 'Age 7',
    phase: 'The First Question',
    prompt: 'A child asks "Why is the sky blue?"',
    question: 'How does the system respond to a child\'s curiosity?',
    icon: Sparkles,
    options: [
      {
        label: 'Give the answer, move to the next topic',
        path: 'traditional',
        consequence: 'Curiosity is treated as a question to be answered, not a thread to be pulled. The child learns that questions have endpoints.',
        statChanges: { curiosity: -10, mastery: -5 },
      },
      {
        label: 'Ask the child: "What do you think? Let\'s find out together."',
        path: 'artemis',
        consequence: 'Curiosity becomes a method of inquiry. The child learns that questions are doorways, not destinations.',
        statChanges: { curiosity: +15, mastery: +5 },
      },
    ],
  },
  {
    id: 'progress',
    age: 'Age 14',
    phase: 'The Clock',
    prompt: 'A student has mastered algebra in 6 weeks. The semester has 12 weeks left.',
    question: 'What happens next?',
    icon: Clock,
    options: [
      {
        label: 'They wait. The class moves on together in 12 weeks.',
        path: 'traditional',
        consequence: 'Mastery is punished by boredom. The student learns that the clock matters more than understanding.',
        statChanges: { mastery: -15, curiosity: -10, fulfillment: -10 },
      },
      {
        label: 'They move on. The next challenge is waiting.',
        path: 'artemis',
        consequence: 'Mastery is rewarded with forward motion. The student learns that understanding unlocks the next door.',
        statChanges: { mastery: +15, curiosity: +10 },
      },
    ],
  },
  {
    id: 'choice',
    age: 'Age 18',
    phase: 'The Declaration',
    prompt: 'A young person is asked: "What will you study?"',
    question: 'What are they choosing?',
    icon: GitBranch,
    options: [
      {
        label: 'A major. A department. A 4-year curriculum.',
        path: 'traditional',
        consequence: 'They choose a box before they know what\'s inside the building. The major shapes them; they don\'t shape the major.',
        statChanges: { purpose: -15, freedom: -10 },
      },
      {
        label: 'A mission. A problem they commit to advancing.',
        path: 'artemis',
        consequence: 'They choose a direction, not a destination. The mission shapes their learning; the learning serves the mission.',
        statChanges: { purpose: +20, freedom: +10 },
      },
    ],
  },
  {
    id: 'classroom',
    age: 'Year 1',
    phase: 'The Room',
    prompt: 'It\'s Tuesday morning. 300 students sit in a lecture hall.',
    question: 'What is happening in this room?',
    icon: Users,
    options: [
      {
        label: 'One professor talks. 300 students take notes. Some are awake.',
        path: 'traditional',
        consequence: 'Learning is broadcast, not built. The student is an audience member, not a participant.',
        statChanges: { mastery: -10, fulfillment: -15 },
      },
      {
        label: '3 students and 1 professor sit together. 75 minutes of Socratic inquiry.',
        path: 'artemis',
        consequence: 'Learning is forged in dialogue. The student is accountable, visible, and pushed to think out loud.',
        statChanges: { mastery: +15, fulfillment: +10, curiosity: +5 },
      },
    ],
  },
  {
    id: 'assessment',
    age: 'Year 3',
    phase: 'The Metric',
    prompt: 'A student helps a classmate understand a difficult concept.',
    question: 'How is this act measured?',
    icon: TrendingDown,
    options: [
      {
        label: 'It hurts them. The curve means helping others lowers your rank.',
        path: 'traditional',
        consequence: 'Collaboration is punished. The student learns that success is a zero-sum game played against peers.',
        statChanges: { purpose: -10, fulfillment: -15, mastery: -5 },
      },
      {
        label: 'It\'s noted in their portfolio. Mastery is demonstrated, not ranked.',
        path: 'artemis',
        consequence: 'Collaboration is recognized. The student learns that helping others deepens everyone\'s understanding, including their own.',
        statChanges: { purpose: +10, fulfillment: +15, mastery: +10 },
      },
    ],
  },
  {
    id: 'world',
    age: 'Year 3–4',
    phase: 'The Map',
    prompt: 'A student has spent 3 years in one city, one campus, one culture.',
    question: 'Where do they go next?',
    icon: Globe,
    options: [
      {
        label: 'Nowhere. The campus is the world. The world is a textbook.',
        path: 'traditional',
        consequence: 'Global understanding is theoretical. The student reads about other cultures but never lives them.',
        statChanges: { curiosity: -10, purpose: -5, freedom: -5 },
      },
      {
        label: 'Six cities, four continents. The world is the campus.',
        path: 'artemis',
        consequence: 'Global understanding is embodied. The student lives in six countries, speaks multiple languages, sees the world from multiple vantages.',
        statChanges: { curiosity: +15, purpose: +10, freedom: +15 },
      },
    ],
  },
  {
    id: 'graduation',
    age: 'Age 22',
    phase: 'The Exit',
    prompt: 'The degree is conferred. The ceremony ends.',
    question: 'What does the graduate carry with them?',
    icon: Compass,
    options: [
      {
        label: 'A diploma, a GPA, and $37,000 in debt.',
        path: 'traditional',
        consequence: 'A credential, a number, and a chain. The graduate enters the world defined by what they owe and how they ranked.',
        statChanges: { debt: +40, freedom: -25, purpose: -10, fulfillment: -15 },
      },
      {
        label: 'A mission advanced, a portfolio of mastery, and a network across six cities.',
        path: 'artemis',
        consequence: 'A direction, a demonstration of capability, and a global community. The graduate enters the world defined by what they can do and who they\'ve become.',
        statChanges: { debt: -10, freedom: +20, purpose: +15, fulfillment: +20, mastery: +10 },
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// PATH OUTCOMES
// ═══════════════════════════════════════════════════════════
const PATH_OUTCOMES: Record<PathType, PathOutcome> = {
  traditional: {
    path: 'traditional',
    title: 'The Traditional Path',
    tagline: 'A system designed for the industrial age',
    description: 'You chose the path of conformity, ranking, and debt. This is the path most traveled — not because it leads somewhere worth going, but because it is the only path most people can see. The factory model processed you efficiently. The question is: what did it produce?',
    stats: { curiosity: 50, freedom: 25, mastery: 40, purpose: 35, debt: 80, fulfillment: 30 },
    color: 'gray',
    icon: Lock,
  },
  artemis: {
    path: 'artemis',
    title: 'The Artemis Path',
    tagline: 'A system designed for the planetary century',
    description: 'You chose the path of curiosity, mastery, and purpose. This is the path less traveled — not because it is harder, but because it requires imagination to see. The Artemis model treated you as a learner, not a product. The question is: what did you become?',
    stats: { curiosity: 85, freedom: 80, mastery: 80, purpose: 85, debt: 10, fulfillment: 85 },
    color: 'gold',
    icon: Unlock,
  },
};

// ═══════════════════════════════════════════════════════════
// STAT CONFIG
// ═══════════════════════════════════════════════════════════
const STAT_CONFIG: { key: keyof Stats; label: string; icon: React.ElementType; inverted?: boolean }[] = [
  { key: 'curiosity', label: 'Curiosity', icon: Sparkles },
  { key: 'freedom', label: 'Freedom', icon: Unlock },
  { key: 'mastery', label: 'Mastery', icon: Check },
  { key: 'purpose', label: 'Purpose', icon: Compass },
  { key: 'fulfillment', label: 'Fulfillment', icon: Heart },
  { key: 'debt', label: 'Debt Burden', icon: DollarSign, inverted: true },
];

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
export default function JourneyV2Page({ goTo }: { goTo: (page: string) => void }) {
  const [currentDecision, setCurrentDecision] = useState(0);
  const [choices, setChoices] = useState<PathType[]>([]);
  const [phase, setPhase] = useState<'intro' | 'journey' | 'outcome'>('intro');
  const [showComparison, setShowComparison] = useState(false);

  const handleChoose = (path: PathType) => {
    const newChoices = [...choices, path];
    setChoices(newChoices);
    if (currentDecision < DECISIONS.length - 1) {
      setCurrentDecision(currentDecision + 1);
    } else {
      setPhase('outcome');
    }
  };

  const handleRestart = () => {
    setChoices([]);
    setCurrentDecision(0);
    setPhase('intro');
    setShowComparison(false);
  };

  // Calculate dominant path from choices
  const dominantPath: PathType = choices.filter(c => c === 'artemis').length >= choices.filter(c => c === 'traditional').length ? 'artemis' : 'traditional';

  return (
    <div className="w-full bg-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Intro onStart={() => setPhase('journey')} goTo={goTo} />
          </motion.div>
        )}
        {phase === 'journey' && (
          <motion.div
            key="journey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DecisionJourney
              decision={DECISIONS[currentDecision]}
              index={currentDecision}
              total={DECISIONS.length}
              choices={choices}
              onChoose={handleChoose}
              onBack={() => {
                if (currentDecision > 0) {
                  setChoices(choices.slice(0, -1));
                  setCurrentDecision(currentDecision - 1);
                } else {
                  setPhase('intro');
                }
              }}
            />
          </motion.div>
        )}
        {phase === 'outcome' && (
          <motion.div
            key="outcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Outcome
              choices={choices}
              dominantPath={dominantPath}
              onRestart={handleRestart}
              onCompare={() => setShowComparison(true)}
              goTo={goTo}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Modal */}
      <AnimatePresence>
        {showComparison && (
          <ComparisonModal choices={choices} onClose={() => setShowComparison(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// INTRO
// ═══════════════════════════════════════════════════════════
function Intro({ onStart, goTo }: { onStart: () => void; goTo: (p: string) => void }) {
  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] bg-[#0a0a0a] text-white flex flex-col overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a0a0a] to-[#0a0a0a]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#8A0000]/20 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-5 sm:px-8 lg:px-20 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="text-[10px] font-mono text-[#D4A853] uppercase tracking-[0.4em]">Journey v2 — Choose Your Path</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[36px] sm:text-[52px] md:text-[72px] font-black leading-[0.95] tracking-tighter mb-6 max-w-4xl"
        >
          Every life is a series of <span className="text-[#D4A853]">forks in the road.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[16px] sm:text-[18px] text-white/60 max-w-2xl leading-relaxed mb-12"
        >
          You will face 7 decisions — the same decisions every learner faces. At each fork, you choose: the Traditional Way or the Artemis Way. Your choices will shape a life. See where your instincts take you.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          onClick={onStart}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-[#D4A853] text-[#0a0a0a] text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
        >
          <span>Begin the Journey</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-white/30"
        >
          <button onClick={() => goTo('journey')} className="hover:text-white/60 transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3 h-3" /> View Journey v1
          </button>
          <span className="text-white/10">|</span>
          <span>7 decisions · ~5 minutes</span>
        </motion.div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// DECISION JOURNEY
// ═══════════════════════════════════════════════════════════
function DecisionJourney({
  decision,
  index,
  total,
  choices,
  onChoose,
  onBack,
}: {
  decision: Decision;
  index: number;
  total: number;
  choices: PathType[];
  onChoose: (p: PathType) => void;
  onBack: () => void;
}) {
  const Icon = decision.icon;
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Reset selection when decision changes
  useEffect(() => {
    setSelectedOption(null);
  }, [decision.id]);

  const handleSelect = (optionIndex: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);
    setTimeout(() => {
      onChoose(decision.options[optionIndex].path);
    }, 1800);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-white flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-14 left-0 right-0 z-30 bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400">
              Decision {index + 1} of {total}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8A0000]">
              {decision.age} · {decision.phase}
            </span>
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#8A0000]"
              initial={{ width: `${(index / total) * 100}%` }}
              animate={{ width: `${((index + 1) / total) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Decision content */}
      <div className="flex-1 flex items-center justify-center px-5 sm:px-8 lg:px-20 pt-20 pb-12">
        <div className="max-w-4xl w-full">
          {/* Icon + prompt */}
          <motion.div
            key={decision.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 border-2 border-[#8A0000] text-[#8A0000]">
              <Icon className="w-7 h-7" />
            </div>
            <p className="text-[14px] font-mono text-gray-400 uppercase tracking-[0.2em] mb-4">
              {decision.prompt}
            </p>
            <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-black leading-[1.05] tracking-tighter text-gray-900 max-w-2xl mx-auto">
              {decision.question}
            </h2>
          </motion.div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {decision.options.map((option, i) => {
              const isSelected = selectedOption === i;
              const isDimmed = selectedOption !== null && !isSelected;
              const isTraditional = option.path === 'traditional';
              const OptionIcon = isTraditional ? Lock : Unlock;

              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isDimmed ? 0.3 : 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  onClick={() => handleSelect(i)}
                  disabled={selectedOption !== null}
                  className={`group relative text-left p-7 border-2 transition-all overflow-hidden ${
                    isSelected
                      ? isTraditional
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-[#8A0000] bg-[#8A0000] text-white'
                      : 'border-gray-200 hover:border-gray-900 bg-white'
                  }`}
                >
                  {/* Path badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <OptionIcon className={`w-4 h-4 ${isSelected ? 'text-white' : isTraditional ? 'text-gray-400' : 'text-[#8A0000]'}`} />
                      <span className={`text-[9px] font-mono uppercase tracking-[0.2em] ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>
                        {isTraditional ? 'The Traditional Way' : 'The Artemis Way'}
                      </span>
                    </div>
                    <span className={`text-[9px] font-mono ${isSelected ? 'text-white/50' : 'text-gray-300'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Option label */}
                  <p className={`text-[16px] font-bold leading-snug mb-4 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                    {option.label}
                  </p>

                  {/* Consequence (revealed on selection) */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-[13px] text-white/80 leading-relaxed mb-4 pt-4 border-t border-white/20">
                          {option.consequence}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] font-mono text-white/60">
                          <span>Stats changing:</span>
                          {Object.entries(option.statChanges).map(([key, val]) => (
                            <span key={key} className={val > 0 ? 'text-emerald-400' : 'text-red-400'}>
                              {key} {val > 0 ? '+' : ''}{val}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hover hint */}
                  {selectedOption === null && (
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className={`w-4 h-4 ${isTraditional ? 'text-gray-400' : 'text-[#8A0000]'}`} />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Back button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              {index === 0 ? 'Back to intro' : 'Previous decision'}
            </button>
          </div>
        </div>
      </div>

      {/* Live stats tracker */}
      <LiveStatsTracker choices={choices} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// LIVE STATS TRACKER (fixed at bottom)
// ═══════════════════════════════════════════════════════════
function LiveStatsTracker({ choices }: { choices: PathType[] }) {
  // Calculate running stats from choices made so far
  const stats: Stats = { curiosity: 50, freedom: 50, mastery: 50, purpose: 50, debt: 0, fulfillment: 50 };

  choices.forEach((path, i) => {
    const decision = DECISIONS[i];
    if (decision) {
      const option = decision.options.find(o => o.path === path);
      if (option) {
        Object.entries(option.statChanges).forEach(([key, val]) => {
          const k = key as keyof Stats;
          stats[k] = Math.max(0, Math.min(100, stats[k] + val));
        });
      }
    }
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 py-3">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-gray-400 hidden sm:block shrink-0">
            Your Path So Far
          </span>
          <div className="flex-1 grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4">
            {STAT_CONFIG.map(({ key, label, icon: Icon, inverted }) => {
              const value = stats[key];
              const isGood = inverted ? value < 30 : value > 60;
              const isBad = inverted ? value > 60 : value < 30;
              return (
                <div key={key} className="flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isGood ? 'text-emerald-600' : isBad ? 'text-red-500' : 'text-gray-400'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] font-mono uppercase tracking-wider text-gray-400 truncate">{label}</div>
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden mt-0.5">
                      <motion.div
                        className={`h-full rounded-full ${isGood ? 'bg-emerald-500' : isBad ? 'bg-red-400' : 'bg-gray-400'}`}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// OUTCOME
// ═══════════════════════════════════════════════════════════
function Outcome({
  choices,
  dominantPath,
  onRestart,
  onCompare,
  goTo,
}: {
  choices: PathType[];
  dominantPath: PathType;
  onRestart: () => void;
  onCompare: () => void;
  goTo: (p: string) => void;
}) {
  const outcome = PATH_OUTCOMES[dominantPath];
  const OutcomeIcon = outcome.icon;
  const artemisCount = choices.filter(c => c === 'artemis').length;
  const traditionalCount = choices.filter(c => c === 'traditional').length;

  return (
    <div className={`min-h-[calc(100vh-3.5rem)] ${dominantPath === 'traditional' ? 'bg-gray-50' : 'bg-[#0a0a0a] text-white'} flex flex-col`}>
      {/* Hero */}
      <div className="relative flex-1 flex items-center justify-center px-5 sm:px-8 lg:px-20 py-20 overflow-hidden">
        {dominantPath === 'artemis' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4A853]/15 rounded-full blur-[100px]" />
        )}
        <div className="relative z-10 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center w-20 h-20 mb-8 border-2"
            style={{ borderColor: dominantPath === 'artemis' ? '#D4A853' : '#141414', color: dominantPath === 'artemis' ? '#D4A853' : '#141414' }}
          >
            <OutcomeIcon className="w-9 h-9" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[11px] font-mono uppercase tracking-[0.3em] mb-4"
            style={{ color: dominantPath === 'artemis' ? '#D4A853' : '#8A0000' }}
          >
            Your Path: {outcome.tagline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[36px] sm:text-[52px] md:text-[64px] font-black leading-[0.95] tracking-tighter mb-6"
          >
            {outcome.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[16px] sm:text-[18px] leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: dominantPath === 'artemis' ? 'rgba(255,255,255,0.6)' : '#666' }}
          >
            {outcome.description}
          </motion.p>

          {/* Choice breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="inline-flex items-center gap-6 mb-10 px-6 py-3 border"
            style={{ borderColor: dominantPath === 'artemis' ? 'rgba(212,168,83,0.3)' : '#e5e5e5' }}
          >
            <div className="text-center">
              <div className="text-[24px] font-black" style={{ color: dominantPath === 'artemis' ? '#D4A853' : '#141414' }}>{artemisCount}</div>
              <div className="text-[9px] font-mono uppercase tracking-wider opacity-50">Artemis Choices</div>
            </div>
            <div className="w-px h-8 bg-current opacity-20" />
            <div className="text-center">
              <div className="text-[24px] font-black" style={{ color: dominantPath === 'artemis' ? '#fff' : '#141414' }}>{traditionalCount}</div>
              <div className="text-[9px] font-mono uppercase tracking-wider opacity-50">Traditional Choices</div>
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10"
          >
            {STAT_CONFIG.map(({ key, label, icon: Icon, inverted }) => {
              const value = outcome.stats[key];
              const isGood = inverted ? value < 30 : value > 60;
              return (
                <div
                  key={key}
                  className="p-4 border text-left"
                  style={{ borderColor: dominantPath === 'artemis' ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}
                >
                  <Icon className={`w-4 h-4 mb-2 ${isGood ? 'text-emerald-500' : 'text-red-400'}`} />
                  <div className="text-[20px] font-black mb-1">{value}</div>
                  <div className="text-[9px] font-mono uppercase tracking-wider opacity-50">{label}</div>
                </div>
              );
            })}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={onCompare}
              className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] border transition-colors"
              style={{
                borderColor: dominantPath === 'artemis' ? '#D4A853' : '#141414',
                color: dominantPath === 'artemis' ? '#D4A853' : '#141414',
              }}
            >
              <GitBranch className="w-4 h-4" />
              See Your Full Journey
            </button>
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors"
              style={{
                background: dominantPath === 'artemis' ? '#D4A853' : '#141414',
                color: dominantPath === 'artemis' ? '#0a0a0a' : '#fff',
              }}
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
          </motion.div>
        </div>
      </div>

      {/* Explore dimensions */}
      <ExploreAnotherFuture currentPage="journey" goTo={goTo} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// COMPARISON MODAL — shows all 7 decisions and what you chose
// ═══════════════════════════════════════════════════════════
function ComparisonModal({ choices, onClose }: { choices: PathType[]; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white max-w-3xl w-full max-h-[85vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 z-10">
          <X className="w-4 h-4" />
        </button>

        <div className="p-8">
          <h2 className="text-[28px] font-black tracking-tighter text-gray-900 mb-2">Your Journey</h2>
          <p className="text-[14px] text-gray-500 mb-8">Every decision you made, and what it meant.</p>

          <div className="space-y-4">
            {DECISIONS.map((decision, i) => {
              const choice = choices[i];
              if (!choice) return null;
              const option = decision.options.find(o => o.path === choice)!;
              const Icon = decision.icon;
              const isTraditional = choice === 'traditional';

              return (
                <div key={decision.id} className="flex gap-4 p-5 border border-gray-200 rounded-xl">
                  <div className={`shrink-0 w-10 h-10 flex items-center justify-center ${isTraditional ? 'bg-gray-100 text-gray-600' : 'bg-[#8A0000]/10 text-[#8A0000]'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">{decision.age}</span>
                      <span className="text-[10px] font-mono text-gray-300">·</span>
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">{decision.phase}</span>
                    </div>
                    <p className="text-[14px] font-bold text-gray-900 mb-2">{option.label}</p>
                    <p className="text-[12px] text-gray-500 leading-relaxed">{option.consequence}</p>
                  </div>
                  <div className="shrink-0">
                    <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-1 ${isTraditional ? 'bg-gray-100 text-gray-600' : 'bg-[#8A0000]/10 text-[#8A0000]'}`}>
                      {isTraditional ? 'Traditional' : 'Artemis'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

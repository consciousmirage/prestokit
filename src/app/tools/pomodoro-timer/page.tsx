"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import PromoBar from "@/components/PromoBar";

/* ------------------------------------------------------------------ */
/*  FAQ Accordion                                                      */
/* ------------------------------------------------------------------ */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#1e1e2e] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#1a1a26]/60 transition-colors"
      >
        <span className="text-[#e0e0ea] font-medium text-sm sm:text-base pr-4">
          {question}
        </span>
        <svg
          className={`w-5 h-5 shrink-0 text-[#7c6cf0] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-[#a0a0b8] leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Breadcrumb                                                         */
/* ------------------------------------------------------------------ */

function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-sm text-[#8888a0] mb-8">
      <a href="/" className="hover:text-[#7c6cf0] transition-colors">
        PrestoKit
      </a>
      <span>/</span>
      <a href="/tools" className="hover:text-[#7c6cf0] transition-colors">
        Tools
      </a>
      <span>/</span>
      <span className="text-[#f0f0f5]">Pomodoro Timer</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Audio Helper (Web Audio API)                                       */
/* ------------------------------------------------------------------ */

function playBeep() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 830;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.8);

    // Second beep
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.frequency.value = 1000;
    osc2.type = "sine";
    gain2.gain.setValueAtTime(0.3, ctx.currentTime + 0.3);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.1);
    osc2.start(ctx.currentTime + 0.3);
    osc2.stop(ctx.currentTime + 1.1);

    // Third beep
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.connect(gain3);
    gain3.connect(ctx.destination);
    osc3.frequency.value = 1200;
    osc3.type = "sine";
    gain3.gain.setValueAtTime(0.4, ctx.currentTime + 0.6);
    gain3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);
    osc3.start(ctx.currentTime + 0.6);
    osc3.stop(ctx.currentTime + 1.6);
  } catch {
    // Web Audio API not available
  }
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What is the Pomodoro Technique?",
    answer:
      "The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals (traditionally 25 minutes) called \"pomodoros,\" separated by short breaks. After four pomodoros, you take a longer break. The technique helps maintain focus and prevent burnout.",
  },
  {
    question: "Why are the work sessions 25 minutes?",
    answer:
      "Francesco Cirillo found that 25 minutes is long enough to make meaningful progress on a task but short enough to maintain intense focus without fatigue. However, the Pomodoro Technique is flexible — some people prefer 30, 45, or even 50-minute work sessions. Use the custom settings to find what works best for you.",
  },
  {
    question: "How many Pomodoros should I do per day?",
    answer:
      "Most practitioners aim for 8-12 Pomodoros per day (roughly 4-6 hours of focused work). The actual productive time in a typical workday is usually less than people think. Tracking your Pomodoros helps you understand your true capacity and plan your days more realistically.",
  },
  {
    question: "What should I do during breaks?",
    answer:
      "During short breaks (5 minutes), step away from your screen. Stretch, walk around, grab water, or look out a window. Avoid checking email or social media as these can pull you into new tasks. During long breaks (15-30 minutes), you can have a snack, take a short walk, do light exercise, or simply relax.",
  },
  {
    question: "What if I get interrupted during a Pomodoro?",
    answer:
      "The official technique says an interrupted Pomodoro doesn't count — you should restart it. For external interruptions, try the \"inform, negotiate, schedule, call back\" strategy: acknowledge the interruption, tell the person you'll get back to them, and return to your task. For internal distractions, jot the thought down on a notepad and return to work.",
  },
  {
    question: "Does the Pomodoro Technique actually work?",
    answer:
      "Research supports that time-boxing (working in defined intervals) improves focus and reduces procrastination. The technique works because it makes large tasks feel manageable, creates urgency, provides regular rest for your brain, and helps you track how you spend your time. It's particularly effective for tasks that require deep concentration.",
  },
];

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type TimerMode = "work" | "shortBreak" | "longBreak";

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PomodoroTimerPage() {
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // Custom durations (in minutes)
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getDuration = useCallback(
    (m: TimerMode) => {
      switch (m) {
        case "work":
          return workDuration * 60;
        case "shortBreak":
          return shortBreakDuration * 60;
        case "longBreak":
          return longBreakDuration * 60;
      }
    },
    [workDuration, shortBreakDuration, longBreakDuration]
  );

  // Timer tick
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (soundEnabled) playBeep();

            // Auto-advance
            if (mode === "work") {
              const newSessions = sessions + 1;
              setSessions(newSessions);
              // Every 4 sessions, take a long break
              if (newSessions % 4 === 0) {
                setMode("longBreak");
                return longBreakDuration * 60;
              } else {
                setMode("shortBreak");
                return shortBreakDuration * 60;
              }
            } else {
              setMode("work");
              return workDuration * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, mode, sessions, soundEnabled, workDuration, shortBreakDuration, longBreakDuration]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(getDuration(mode));
  };

  const switchMode = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(getDuration(newMode));
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Circular progress
  const totalDuration = getDuration(mode);
  const progress = totalDuration > 0 ? (totalDuration - timeLeft) / totalDuration : 0;
  const circumference = 2 * Math.PI * 140;
  const strokeDashoffset = circumference * (1 - progress);

  // Mode colors
  const modeColors: Record<TimerMode, { primary: string; glow: string }> = {
    work: { primary: "#7c6cf0", glow: "#7c6cf0" },
    shortBreak: { primary: "#00e676", glow: "#00e676" },
    longBreak: { primary: "#40c4ff", glow: "#40c4ff" },
  };
  const currentColor = modeColors[mode];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Pomodoro Timer",
    description:
      "Boost your productivity with the Pomodoro Technique. 25-minute work sessions, 5-minute breaks, session tracking, and customizable intervals.",
    url: "https://prestokit.com/tools/pomodoro-timer",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-[#0a0a0f] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Pomodoro{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Timer
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Stay focused with the Pomodoro Technique. Work in focused
              sprints, take regular breaks, and track your sessions.
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center gap-2 mb-8 justify-center">
            {(
              [
                { key: "work" as TimerMode, label: "Work" },
                { key: "shortBreak" as TimerMode, label: "Short Break" },
                { key: "longBreak" as TimerMode, label: "Long Break" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => switchMode(tab.key)}
                className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                  mode === tab.key
                    ? "text-white shadow-lg"
                    : "border border-[#1e1e2e] bg-[#12121a]/60 text-[#8888a0] hover:border-[#7c6cf0]/40"
                }`}
                style={
                  mode === tab.key
                    ? {
                        backgroundColor: currentColor.primary,
                        boxShadow: `0 4px 20px ${currentColor.glow}33`,
                      }
                    : undefined
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Timer Circle */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-[320px] h-[320px] sm:w-[360px] sm:h-[360px]">
              <svg
                className="w-full h-full -rotate-90"
                viewBox="0 0 300 300"
              >
                {/* Background circle */}
                <circle
                  cx="150"
                  cy="150"
                  r="140"
                  fill="none"
                  stroke="#1e1e2e"
                  strokeWidth="6"
                />
                {/* Progress circle */}
                <circle
                  cx="150"
                  cy="150"
                  r="140"
                  fill="none"
                  stroke={currentColor.primary}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-linear"
                  style={{
                    filter: `drop-shadow(0 0 8px ${currentColor.glow}66)`,
                  }}
                />
              </svg>
              {/* Time Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-6xl sm:text-7xl font-bold tracking-tight tabular-nums">
                  {minutes.toString().padStart(2, "0")}:
                  {seconds.toString().padStart(2, "0")}
                </div>
                <div
                  className="text-sm font-semibold uppercase tracking-widest mt-2"
                  style={{ color: currentColor.primary }}
                >
                  {mode === "work"
                    ? "Focus"
                    : mode === "shortBreak"
                    ? "Short Break"
                    : "Long Break"}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold text-white transition-all shadow-lg"
                style={{
                  backgroundColor: currentColor.primary,
                  boxShadow: `0 4px 20px ${currentColor.glow}33`,
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Start
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold text-white transition-all shadow-lg"
                style={{
                  backgroundColor: currentColor.primary,
                  boxShadow: `0 4px 20px ${currentColor.glow}33`,
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
                Pause
              </button>
            )}
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-[#1e1e2e] bg-[#12121a]/60 px-6 py-3.5 text-base font-semibold text-[#8888a0] hover:text-white hover:border-[#7c6cf0]/40 transition-all"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
                />
              </svg>
              Reset
            </button>
          </div>

          {/* Session Counter & Sound Toggle */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a]/60 px-5 py-3 flex items-center gap-3">
              <span className="text-sm text-[#8888a0]">Sessions:</span>
              <span className="text-lg font-bold text-white">{sessions}</span>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`rounded-xl border px-5 py-3 flex items-center gap-2 text-sm font-semibold transition-all ${
                soundEnabled
                  ? "border-[#00e676]/30 bg-[#00e676]/10 text-[#00e676]"
                  : "border-[#1e1e2e] bg-[#12121a]/60 text-[#555566]"
              }`}
            >
              {soundEnabled ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
                  />
                </svg>
              )}
              Sound {soundEnabled ? "On" : "Off"}
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="rounded-xl border border-[#1e1e2e] bg-[#12121a]/60 px-5 py-3 flex items-center gap-2 text-sm font-semibold text-[#8888a0] hover:text-white hover:border-[#7c6cf0]/40 transition-all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </button>
          </div>

          {/* Custom Settings Panel */}
          {showSettings && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-8 max-w-lg mx-auto">
              <h3 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                Custom Durations (minutes)
              </h3>
              <div className="space-y-4">
                {[
                  {
                    label: "Work Session",
                    value: workDuration,
                    setter: setWorkDuration,
                  },
                  {
                    label: "Short Break",
                    value: shortBreakDuration,
                    setter: setShortBreakDuration,
                  },
                  {
                    label: "Long Break",
                    value: longBreakDuration,
                    setter: setLongBreakDuration,
                  },
                ].map((setting) => (
                  <div
                    key={setting.label}
                    className="flex items-center justify-between"
                  >
                    <label className="text-sm text-[#c0c0d0]">
                      {setting.label}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={setting.value}
                      onChange={(e) => {
                        const val = Math.max(1, Math.min(120, parseInt(e.target.value) || 1));
                        setting.setter(val);
                        if (!isRunning) {
                          if (
                            (setting.label === "Work Session" && mode === "work") ||
                            (setting.label === "Short Break" && mode === "shortBreak") ||
                            (setting.label === "Long Break" && mode === "longBreak")
                          ) {
                            setTimeLeft(val * 60);
                          }
                        }
                      }}
                      className="w-20 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-2 px-3 text-center text-white text-sm focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setWorkDuration(25);
                  setShortBreakDuration(5);
                  setLongBreakDuration(15);
                  if (!isRunning) {
                    if (mode === "work") setTimeLeft(25 * 60);
                    else if (mode === "shortBreak") setTimeLeft(5 * 60);
                    else setTimeLeft(15 * 60);
                  }
                }}
                className="mt-4 text-xs text-[#7c6cf0] hover:text-[#9d90f5] transition-colors"
              >
                Reset to defaults
              </button>
            </div>
          )}

          {/* PromoBar */}
          <PromoBar type="pro" dismissKey="pomodoro-timer-pro" />

          {/* How It Works */}
          <div className="mb-16 mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Focus (25 min)",
                  description:
                    "Start the timer and work with full concentration on a single task. No distractions allowed.",
                },
                {
                  step: "2",
                  title: "Short Break (5 min)",
                  description:
                    "Take a brief break to rest your mind. Stand up, stretch, or grab some water.",
                },
                {
                  step: "3",
                  title: "Repeat",
                  description:
                    "Complete 4 work sessions. The timer auto-advances between work and break periods.",
                },
                {
                  step: "4",
                  title: "Long Break (15 min)",
                  description:
                    "After 4 sessions, enjoy a longer break to recharge before the next cycle.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-6 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-[#7c6cf0]/20 text-[#7c6cf0] font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#8888a0] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 max-w-3xl mx-auto">
              {FAQ_DATA.map((item, i) => (
                <FAQItem
                  key={i}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>

          {/* Related Tools */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Related Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Typing Speed Test",
                  description:
                    "Test your typing speed and accuracy with real-time WPM tracking.",
                  href: "/tools/typing-speed-test",
                },
                {
                  title: "Date Calculator",
                  description:
                    "Calculate the difference between dates or add/subtract days from any date.",
                  href: "/tools/date-calculator",
                },
                {
                  title: "Readability Checker",
                  description:
                    "Check the readability score and grade level of your writing.",
                  href: "/tools/readability-checker",
                },
              ].map((tool) => (
                <a
                  key={tool.title}
                  href={tool.href}
                  className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-6 hover:border-[#7c6cf0]/40 transition-all group"
                >
                  <h3 className="text-white font-semibold mb-2 group-hover:text-[#7c6cf0] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-[#8888a0]">
                    {tool.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

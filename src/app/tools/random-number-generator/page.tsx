"use client";

import { useState, useCallback, useRef } from "react";

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
      <span className="text-[#f0f0f5]">Random Number Generator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

type RNGMode = "number" | "list" | "dice" | "coin" | "picker";

const MODES: { key: RNGMode; label: string; description: string }[] = [
  { key: "number", label: "Random Number", description: "Generate a number between min and max" },
  { key: "list", label: "Number List", description: "Generate multiple random numbers" },
  { key: "dice", label: "Dice Roller", description: "Roll virtual dice (D4-D20)" },
  { key: "coin", label: "Coin Flip", description: "Flip a virtual coin" },
  { key: "picker", label: "Random Picker", description: "Pick random items from a list" },
];

const DICE_TYPES = [4, 6, 8, 10, 12, 20];

const FAQ_DATA = [
  {
    question: "Is this random number generator truly random?",
    answer:
      "This generator uses the browser's built-in Math.random() function, which produces pseudorandom numbers. For most purposes -- games, giveaways, decisions, and casual use -- this is more than sufficient. For cryptographic security, a different method would be needed.",
  },
  {
    question: "Can I generate random numbers without duplicates?",
    answer:
      "Yes. In the Number List mode, enable the 'No Duplicates' option. The generator will ensure every number in your list is unique. Note that the count cannot exceed the range of possible values (max - min + 1).",
  },
  {
    question: "How does the dice roller work?",
    answer:
      "Select the number of dice (1-10) and the number of sides (D4, D6, D8, D10, D12, or D20). Each die is rolled independently, giving a random result from 1 to the number of sides. The total of all dice is shown alongside each individual result.",
  },
  {
    question: "Can I use this for giveaways or raffles?",
    answer:
      "Yes. The Random Picker mode is perfect for giveaways. Paste a list of names or items (one per line), and the tool will randomly select a winner. The selection is fair and unbiased using standard random number generation.",
  },
  {
    question: "Is there a history of my results?",
    answer:
      "Yes, the tool keeps a history of your last 20 results across all modes. You can see what was generated, when, and copy any result. The history is stored only in your browser session and is cleared when you close the page.",
  },
  {
    question: "Is this random number generator free?",
    answer:
      "Yes, completely free with no signup required. All generation happens instantly in your browser. No data is sent to any server. Use it as many times as you need for games, decisions, giveaways, or any other purpose.",
  },
];

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface HistoryEntry {
  id: number;
  mode: string;
  result: string;
  timestamp: Date;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function parseNum(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) ? 0 : n;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {
    // fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  });
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function RandomNumberGeneratorPage() {
  const [mode, setMode] = useState<RNGMode>("number");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const nextId = useRef(1);
  const [copied, setCopied] = useState<number | null>(null);

  // Mode 1: Random Number
  const [rnMin, setRnMin] = useState("1");
  const [rnMax, setRnMax] = useState("100");
  const [rnResult, setRnResult] = useState<number | null>(null);

  // Mode 2: Number List
  const [listMin, setListMin] = useState("1");
  const [listMax, setListMax] = useState("100");
  const [listCount, setListCount] = useState("10");
  const [listNoDupes, setListNoDupes] = useState(false);
  const [listResult, setListResult] = useState<number[]>([]);

  // Mode 3: Dice
  const [diceCount, setDiceCount] = useState(2);
  const [diceSides, setDiceSides] = useState(6);
  const [diceResult, setDiceResult] = useState<number[]>([]);
  const [diceRolling, setDiceRolling] = useState(false);

  // Mode 4: Coin
  const [coinResult, setCoinResult] = useState<"heads" | "tails" | null>(null);
  const [coinFlipping, setCoinFlipping] = useState(false);

  // Mode 5: Picker
  const [pickerList, setPickerList] = useState("");
  const [pickerResult, setPickerResult] = useState<string | null>(null);

  const addHistory = useCallback(
    (modeLabel: string, result: string) => {
      const entry: HistoryEntry = {
        id: nextId.current++,
        mode: modeLabel,
        result,
        timestamp: new Date(),
      };
      setHistory((prev) => [entry, ...prev].slice(0, 20));
    },
    []
  );

  const handleCopy = useCallback(
    (id: number, text: string) => {
      copyToClipboard(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    },
    []
  );

  /* Generators */

  function generateNumber() {
    const min = Math.round(parseNum(rnMin));
    const max = Math.round(parseNum(rnMax));
    if (min > max) return;
    const result = randomInt(min, max);
    setRnResult(result);
    addHistory("Number", String(result));
  }

  function generateList() {
    const min = Math.round(parseNum(listMin));
    const max = Math.round(parseNum(listMax));
    const count = Math.round(parseNum(listCount));
    if (min > max || count <= 0) return;

    if (listNoDupes) {
      const range = max - min + 1;
      const actualCount = Math.min(count, range);
      const pool: number[] = [];
      for (let i = min; i <= max; i++) pool.push(i);
      // Fisher-Yates shuffle
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      const result = pool.slice(0, actualCount);
      setListResult(result);
      addHistory("List", result.join(", "));
    } else {
      const result: number[] = [];
      for (let i = 0; i < count; i++) {
        result.push(randomInt(min, max));
      }
      setListResult(result);
      addHistory("List", result.join(", "));
    }
  }

  function rollDice() {
    setDiceRolling(true);
    // Brief animation delay
    setTimeout(() => {
      const results: number[] = [];
      for (let i = 0; i < diceCount; i++) {
        results.push(randomInt(1, diceSides));
      }
      setDiceResult(results);
      setDiceRolling(false);
      const total = results.reduce((a, b) => a + b, 0);
      addHistory(
        `Dice (${diceCount}d${diceSides})`,
        `[${results.join(", ")}] = ${total}`
      );
    }, 300);
  }

  function flipCoin() {
    setCoinFlipping(true);
    setTimeout(() => {
      const result = Math.random() < 0.5 ? "heads" : "tails";
      setCoinResult(result);
      setCoinFlipping(false);
      addHistory("Coin", result.charAt(0).toUpperCase() + result.slice(1));
    }, 400);
  }

  function pickRandom() {
    const items = pickerList
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    if (items.length === 0) return;
    const picked = items[randomInt(0, items.length - 1)];
    setPickerResult(picked);
    addHistory("Picker", picked);
  }

  const sectionClasses =
    "rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8";

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-[#0a0a0f] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Random Number{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Generate random numbers, roll dice, flip coins, and pick random
              items from a list. Five modes with a full history of results.
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
            {MODES.map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  mode === m.key
                    ? "border-[#7c6cf0] bg-[#7c6cf0]/10 shadow-[0_0_20px_rgba(124,108,240,0.1)]"
                    : "border-[#1e1e2e] bg-[#12121a] hover:border-[#7c6cf0]/40"
                }`}
              >
                <div
                  className={`text-sm font-semibold mb-0.5 ${
                    mode === m.key ? "text-[#9d90f5]" : "text-white"
                  }`}
                >
                  {m.label}
                </div>
                <div className="text-xs text-[#8888a0] hidden sm:block">{m.description}</div>
              </button>
            ))}
          </div>

          {/* ==================== MODE 1: Random Number ==================== */}
          {mode === "number" && (
            <div className={sectionClasses}>
              <h2 className="text-lg font-semibold text-white mb-1">
                Random Number
              </h2>
              <p className="text-sm text-[#8888a0] mb-6">
                Generate a random integer between a minimum and maximum value.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Minimum
                  </label>
                  <input
                    type="number"
                    value={rnMin}
                    onChange={(e) => setRnMin(e.target.value)}
                    placeholder="1"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Maximum
                  </label>
                  <input
                    type="number"
                    value={rnMax}
                    onChange={(e) => setRnMax(e.target.value)}
                    placeholder="100"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>
              <button
                onClick={generateNumber}
                className="w-full sm:w-auto rounded-xl bg-[#7c6cf0] hover:bg-[#6b5ce0] px-8 py-3 text-sm font-semibold text-white transition-colors"
              >
                Generate
              </button>
              {rnResult !== null && (
                <div className="mt-6 rounded-xl border border-[#1e1e2e] bg-[#12121a] p-8 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-3">
                    Result
                  </div>
                  <div className="text-5xl sm:text-6xl font-bold text-[#00e676] animate-pulse">
                    {rnResult}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== MODE 2: Number List ==================== */}
          {mode === "list" && (
            <div className={sectionClasses}>
              <h2 className="text-lg font-semibold text-white mb-1">
                Random Number List
              </h2>
              <p className="text-sm text-[#8888a0] mb-6">
                Generate multiple random numbers at once.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Minimum
                  </label>
                  <input
                    type="number"
                    value={listMin}
                    onChange={(e) => setListMin(e.target.value)}
                    placeholder="1"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Maximum
                  </label>
                  <input
                    type="number"
                    value={listMax}
                    onChange={(e) => setListMax(e.target.value)}
                    placeholder="100"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Count
                  </label>
                  <input
                    type="number"
                    value={listCount}
                    onChange={(e) => setListCount(e.target.value)}
                    placeholder="10"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setListNoDupes(!listNoDupes)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${
                    listNoDupes ? "bg-[#7c6cf0]" : "bg-[#1e1e2e]"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      listNoDupes ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="text-sm text-[#c0c0d0]">No Duplicates</span>
              </div>
              <button
                onClick={generateList}
                className="w-full sm:w-auto rounded-xl bg-[#7c6cf0] hover:bg-[#6b5ce0] px-8 py-3 text-sm font-semibold text-white transition-colors"
              >
                Generate List
              </button>
              {listResult.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-[#8888a0] uppercase tracking-wide">
                      Results ({listResult.length} numbers)
                    </span>
                    <button
                      onClick={() => handleCopy(-1, listResult.join(", "))}
                      className="text-xs text-[#7c6cf0] hover:text-[#9d90f5] transition-colors"
                    >
                      {copied === -1 ? "Copied!" : "Copy All"}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {listResult.map((n, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-[#0a0a0f] border border-[#1e1e2e] px-3 py-2 text-sm text-white font-mono"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== MODE 3: Dice Roller ==================== */}
          {mode === "dice" && (
            <div className={sectionClasses}>
              <h2 className="text-lg font-semibold text-white mb-1">
                Dice Roller
              </h2>
              <p className="text-sm text-[#8888a0] mb-6">
                Roll virtual dice with customizable count and sides.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Number of Dice (1-10)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <button
                        key={n}
                        onClick={() => setDiceCount(n)}
                        className={`w-10 h-10 rounded-lg border text-sm font-medium transition-all ${
                          diceCount === n
                            ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                            : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Sides
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DICE_TYPES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setDiceSides(s)}
                        className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                          diceSides === s
                            ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                            : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                        }`}
                      >
                        D{s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={rollDice}
                disabled={diceRolling}
                className="w-full sm:w-auto rounded-xl bg-[#7c6cf0] hover:bg-[#6b5ce0] px-8 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-50"
              >
                {diceRolling ? "Rolling..." : `Roll ${diceCount}d${diceSides}`}
              </button>
              {diceResult.length > 0 && !diceRolling && (
                <div className="mt-6">
                  <div className="flex flex-wrap gap-3 justify-center mb-4">
                    {diceResult.map((val, i) => (
                      <div
                        key={i}
                        className="w-16 h-16 rounded-xl border-2 border-[#7c6cf0] bg-[#0a0a0f] flex items-center justify-center"
                      >
                        <span className="text-2xl font-bold text-white">{val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-4 text-center">
                    <span className="text-xs text-[#8888a0] uppercase tracking-wide">Total: </span>
                    <span className="text-2xl font-bold text-[#00e676] ml-2">
                      {diceResult.reduce((a, b) => a + b, 0)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== MODE 4: Coin Flip ==================== */}
          {mode === "coin" && (
            <div className={sectionClasses}>
              <h2 className="text-lg font-semibold text-white mb-1">
                Coin Flipper
              </h2>
              <p className="text-sm text-[#8888a0] mb-6">
                Flip a virtual coin for a 50/50 decision.
              </p>
              <button
                onClick={flipCoin}
                disabled={coinFlipping}
                className="w-full sm:w-auto rounded-xl bg-[#7c6cf0] hover:bg-[#6b5ce0] px-8 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-50"
              >
                {coinFlipping ? "Flipping..." : "Flip Coin"}
              </button>
              {(coinResult || coinFlipping) && (
                <div className="mt-8 flex flex-col items-center">
                  {/* Coin visual */}
                  <div
                    className={`w-32 h-32 rounded-full border-4 flex items-center justify-center mb-4 transition-all duration-300 ${
                      coinFlipping
                        ? "animate-spin border-[#7c6cf0] bg-[#7c6cf0]/20"
                        : coinResult === "heads"
                        ? "border-[#00e676] bg-[#00e676]/10"
                        : "border-[#9d90f5] bg-[#9d90f5]/10"
                    }`}
                  >
                    {!coinFlipping && (
                      <span
                        className={`text-3xl font-bold ${
                          coinResult === "heads" ? "text-[#00e676]" : "text-[#9d90f5]"
                        }`}
                      >
                        {coinResult === "heads" ? "H" : "T"}
                      </span>
                    )}
                  </div>
                  {!coinFlipping && coinResult && (
                    <div className="text-2xl font-bold text-white capitalize">
                      {coinResult}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ==================== MODE 5: Random Picker ==================== */}
          {mode === "picker" && (
            <div className={sectionClasses}>
              <h2 className="text-lg font-semibold text-white mb-1">
                Random Picker
              </h2>
              <p className="text-sm text-[#8888a0] mb-6">
                Paste a list of items (one per line) and pick a random winner. Great for giveaways and raffles.
              </p>
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Items (one per line)
                </label>
                <textarea
                  value={pickerList}
                  onChange={(e) => setPickerList(e.target.value)}
                  placeholder={"Alice\nBob\nCharlie\nDiana\nEve"}
                  rows={8}
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors resize-y font-mono"
                />
                <div className="text-xs text-[#555566] mt-1">
                  {pickerList.split("\n").filter((s) => s.trim().length > 0).length} items
                </div>
              </div>
              <button
                onClick={pickRandom}
                className="w-full sm:w-auto rounded-xl bg-[#7c6cf0] hover:bg-[#6b5ce0] px-8 py-3 text-sm font-semibold text-white transition-colors"
              >
                Pick Random
              </button>
              {pickerResult && (
                <div className="mt-6 rounded-xl border border-[#00e676]/30 bg-[#00e676]/5 p-8 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-3">
                    Winner
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-[#00e676]">
                    {pickerResult}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* History */}
          {history.length > 0 && (
            <div className={`${sectionClasses} mt-8`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">
                  History (Last 20)
                </h2>
                <button
                  onClick={() => setHistory([])}
                  className="text-xs text-[#8888a0] hover:text-red-400 transition-colors"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {history.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between rounded-lg bg-[#0a0a0f] border border-[#1e1e2e] px-4 py-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs text-[#7c6cf0] font-semibold uppercase whitespace-nowrap">
                        {entry.mode}
                      </span>
                      <span className="text-sm text-white truncate font-mono">
                        {entry.result}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(entry.id, entry.result)}
                      className="text-xs text-[#8888a0] hover:text-[#7c6cf0] transition-colors shrink-0 ml-3"
                    >
                      {copied === entry.id ? "Copied!" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How It Works */}
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Choose a Mode",
                  description:
                    "Select from five modes: random number, number list, dice roller, coin flipper, or random picker. Each mode has its own settings and controls.",
                },
                {
                  step: "2",
                  title: "Set Parameters",
                  description:
                    "Configure min/max values, number of dice, list items, or any other settings. Each mode is designed for a specific use case.",
                },
                {
                  step: "3",
                  title: "Generate & Copy",
                  description:
                    "Click the button to generate your result. View it instantly, copy it to your clipboard, and check the history for past results.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-6 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-[#7c6cf0]/20 text-[#7c6cf0] font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
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
                <FAQItem key={i} question={item.question} answer={item.answer} />
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
                  title: "Password Generator",
                  description: "Create strong, secure random passwords instantly.",
                  href: "/tools/password-generator",
                },
                {
                  title: "Lorem Ipsum Generator",
                  description: "Generate placeholder text for designs and layouts.",
                  href: "/tools/lorem-ipsum-generator",
                },
                {
                  title: "Percentage Calculator",
                  description: "Calculate percentages, percentage change, increase and decrease.",
                  href: "/tools/percentage-calculator",
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
                  <p className="text-sm text-[#8888a0]">{tool.description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

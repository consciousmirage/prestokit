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
      <span className="text-[#f0f0f5]">Typing Speed Test</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Text Passages                                                      */
/* ------------------------------------------------------------------ */

const PASSAGES = [
  "The quick brown fox jumps over the lazy dog near the river bank. Every morning, the fox trots through the meadow searching for food while the birds sing their cheerful songs above the treetops. Life in the countryside moves at a peaceful, steady pace that calms the soul.",
  "Technology has transformed the way we communicate, work, and live our daily lives. From smartphones to artificial intelligence, innovations continue to reshape every industry. Those who adapt quickly to new tools and workflows tend to find greater success in the modern workplace.",
  "A well-designed user interface can make the difference between a product that people love and one they abandon. Good design is invisible because it feels natural and intuitive. The best designers spend countless hours testing and refining every detail to create seamless experiences.",
  "The ocean covers more than seventy percent of the Earth's surface and remains largely unexplored. Deep beneath the waves, strange creatures thrive in complete darkness near volcanic vents. Marine biologists continue to discover new species every year in these mysterious depths.",
  "Learning to code is like learning a new language that lets you talk to computers. Each programming language has its own syntax and rules, but the fundamental concepts remain the same across all of them. Practice and persistence are the keys to becoming a proficient developer.",
  "Small businesses are the backbone of the global economy, creating jobs and driving innovation in communities worldwide. Entrepreneurs face unique challenges including limited budgets, fierce competition, and the constant need to adapt to changing market conditions and customer expectations.",
  "Regular exercise has been shown to improve both physical and mental health in people of all ages. Even a thirty-minute walk each day can reduce the risk of heart disease, lower stress levels, and boost your mood significantly. The hardest part is simply getting started.",
  "The art of writing clearly is one of the most valuable skills anyone can develop. Whether you are composing an email, drafting a report, or writing a novel, the ability to express your ideas in a concise and engaging manner will serve you well throughout your entire career.",
  "Coffee shops have become the unofficial offices for freelancers and remote workers around the world. The ambient noise, comfortable seating, and steady supply of caffeine create an environment that many people find conducive to focused work and creative thinking.",
  "Space exploration continues to captivate the human imagination as we push further into the cosmos. Private companies are now launching rockets alongside government agencies, making space more accessible than ever before. The dream of colonizing Mars grows closer to reality with each passing year.",
  "Music has the remarkable ability to evoke powerful emotions and bring people together across cultures and languages. A single melody can transport you back to a specific moment in time, triggering vivid memories and feelings you thought you had forgotten long ago.",
  "The kitchen is often called the heart of the home, where families gather to share meals and stories. Cooking from scratch with fresh ingredients not only tastes better but also gives you complete control over what goes into your body. Start with simple recipes and build your confidence gradually.",
];

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What is a good typing speed?",
    answer:
      "The average typing speed is about 40 WPM (words per minute). A speed of 65-75 WPM is considered above average and good for most office jobs. Professional typists and programmers often type at 80-100+ WPM. Touch typists who have practiced extensively can reach 120+ WPM.",
  },
  {
    question: "How is WPM (words per minute) calculated?",
    answer:
      "WPM is calculated by dividing the total number of characters typed (including spaces) by 5 to get the number of \"standard words,\" then dividing by the elapsed time in minutes. A \"standard word\" is defined as 5 characters, which is an industry-standard measurement used across all typing tests.",
  },
  {
    question: "How can I improve my typing speed?",
    answer:
      "Focus on accuracy first, then speed. Use proper finger placement on the home row (ASDF JKL;). Practice regularly with typing tests and exercises. Avoid looking at the keyboard (touch typing). Start with slower, accurate typing and gradually increase your speed. Consistency is more important than marathon practice sessions.",
  },
  {
    question: "What is touch typing?",
    answer:
      "Touch typing is the ability to type without looking at the keyboard. Each finger is assigned specific keys based on the home row position. Your index fingers rest on F and J (which have small bumps for reference). Touch typing is significantly faster than hunt-and-peck typing and is worth learning for anyone who uses a computer regularly.",
  },
  {
    question: "Does typing speed matter for jobs?",
    answer:
      "Yes, typing speed matters for many jobs, especially those involving data entry, customer service, transcription, programming, and content writing. Most employers expect at least 40 WPM. Faster typing speed means you can complete tasks more quickly, respond to emails faster, and be generally more productive throughout the workday.",
  },
  {
    question: "How accurate should my typing be?",
    answer:
      "Aim for at least 95% accuracy. Professional typists maintain 97-99% accuracy even at high speeds. High accuracy is actually more important than raw speed because fixing errors takes time and breaks your flow. Focus on accuracy first and speed will naturally follow with practice.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TypingSpeedTestPage() {
  const [passageIndex, setPassageIndex] = useState(0);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const passage = PASSAGES[passageIndex];

  // Timer tick
  useEffect(() => {
    if (started && !finished && startTime) {
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const secs = (now - startTime) / 1000;
        setElapsed(secs);

        // Live WPM
        const charCount = input.length;
        const words = charCount / 5;
        const mins = secs / 60;
        if (mins > 0) {
          setWpm(Math.round(words / mins));
        }
      }, 200);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [started, finished, startTime, input.length]);

  // Calculate accuracy
  const calcAccuracy = useCallback(
    (typed: string) => {
      if (typed.length === 0) return 100;
      let correct = 0;
      for (let i = 0; i < typed.length; i++) {
        if (typed[i] === passage[i]) correct++;
      }
      return Math.round((correct / typed.length) * 100);
    },
    [passage]
  );

  const handleInput = (val: string) => {
    if (finished) return;

    // Start timer on first keystroke
    if (!started) {
      setStarted(true);
      setStartTime(Date.now());
    }

    setInput(val);
    setAccuracy(calcAccuracy(val));

    // Check if done
    if (val.length >= passage.length) {
      setFinished(true);
      if (timerRef.current) clearInterval(timerRef.current);
      const finalElapsed = startTime ? (Date.now() - startTime) / 1000 : 0;
      setElapsed(finalElapsed);
      const finalWords = val.length / 5;
      const finalMins = finalElapsed / 60;
      setWpm(finalMins > 0 ? Math.round(finalWords / finalMins) : 0);
      setAccuracy(calcAccuracy(val));
    }
  };

  const handleReset = () => {
    setInput("");
    setStarted(false);
    setFinished(false);
    setStartTime(null);
    setElapsed(0);
    setWpm(0);
    setAccuracy(100);
    if (timerRef.current) clearInterval(timerRef.current);
    // Pick a different passage
    let newIndex: number;
    do {
      newIndex = Math.floor(Math.random() * PASSAGES.length);
    } while (newIndex === passageIndex && PASSAGES.length > 1);
    setPassageIndex(newIndex);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // WPM rating
  const getWpmRating = (w: number) => {
    if (w >= 100) return { label: "Blazing Fast", color: "#00e676" };
    if (w >= 70) return { label: "Above Average", color: "#7c6cf0" };
    if (w >= 40) return { label: "Average", color: "#f0c040" };
    if (w >= 20) return { label: "Below Average", color: "#ff9800" };
    return { label: "Beginner", color: "#ff5252" };
  };

  // Render passage with color-coded characters
  const renderPassage = () => {
    return passage.split("").map((char, i) => {
      let color = "#555566"; // untyped
      if (i < input.length) {
        color = input[i] === char ? "#00e676" : "#ff5252";
      }
      // Current character highlight
      const isCurrent = i === input.length && !finished;
      return (
        <span
          key={i}
          style={{ color }}
          className={isCurrent ? "bg-[#7c6cf0]/30 rounded-sm" : ""}
        >
          {char}
        </span>
      );
    });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Typing Speed Test",
    description:
      "Test your typing speed and accuracy. Measure your WPM (words per minute) with real-time stats and multiple text passages.",
    url: "https://prestokit.com/tools/typing-speed-test",
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

  const rating = getWpmRating(wpm);

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
              Typing Speed{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Test
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Test your typing speed and accuracy. Start typing the passage
              below and see your WPM in real time.
            </p>
          </div>

          {/* Live Stats Bar */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-5 text-center">
              <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                WPM
              </div>
              <div
                className="text-3xl font-bold"
                style={{ color: started ? rating.color : "#555566" }}
              >
                {wpm}
              </div>
            </div>
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-5 text-center">
              <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                Accuracy
              </div>
              <div
                className="text-3xl font-bold"
                style={{
                  color: accuracy >= 95 ? "#00e676" : accuracy >= 80 ? "#f0c040" : "#ff5252",
                }}
              >
                {accuracy}%
              </div>
            </div>
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-5 text-center">
              <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                Time
              </div>
              <div className="text-3xl font-bold text-white">
                {formatTime(elapsed)}
              </div>
            </div>
          </div>

          {/* Passage Display */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <div className="text-sm font-medium text-[#c0c0d0] mb-4">
              Type this passage:
            </div>
            <div className="text-lg sm:text-xl leading-relaxed font-mono tracking-wide select-none mb-6">
              {renderPassage()}
            </div>

            {/* Input Area */}
            {!finished ? (
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => handleInput(e.target.value)}
                onPaste={(e) => e.preventDefault()}
                placeholder="Start typing here..."
                className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 px-5 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors resize-none font-mono"
                rows={4}
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
            ) : (
              /* Results Card */
              <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-6">
                <div className="text-center mb-6">
                  <div className="text-sm text-[#8888a0] uppercase tracking-wide mb-2">
                    Your Result
                  </div>
                  <div
                    className="text-5xl font-bold mb-1"
                    style={{ color: rating.color }}
                  >
                    {wpm} WPM
                  </div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: rating.color }}
                  >
                    {rating.label}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 text-center">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Accuracy
                    </div>
                    <div className="text-xl font-bold text-white">
                      {accuracy}%
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 text-center">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Time
                    </div>
                    <div className="text-xl font-bold text-white">
                      {formatTime(elapsed)}
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 text-center">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Characters
                    </div>
                    <div className="text-xl font-bold text-white">
                      {input.length}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Try Again */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-xl bg-[#7c6cf0] hover:bg-[#6b5ce0] px-6 py-3 text-sm font-semibold text-white transition-all shadow-lg shadow-[#7c6cf0]/20"
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
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
                  />
                </svg>
                {finished ? "Try Again" : "New Passage"}
              </button>
            </div>
          </div>

          {/* PromoBar */}
          <PromoBar type="pro" dismissKey="typing-speed-test-pro" />

          {/* How It Works */}
          <div className="mb-16 mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Read the Passage",
                  description:
                    "A random paragraph is displayed for you to type. Each test uses a different passage to keep things fresh.",
                },
                {
                  step: "2",
                  title: "Start Typing",
                  description:
                    "Begin typing in the text area. The timer starts automatically with your first keystroke. Characters turn green or red in real time.",
                },
                {
                  step: "3",
                  title: "See Your Results",
                  description:
                    "When you finish, see your WPM, accuracy percentage, and time. Hit 'Try Again' for a new passage and track your improvement.",
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
                  title: "Word Counter",
                  description:
                    "Count words, characters, sentences, and paragraphs in your text instantly.",
                  href: "/tools/word-counter",
                },
                {
                  title: "Readability Checker",
                  description:
                    "Check the readability score and grade level of your writing.",
                  href: "/tools/readability-checker",
                },
                {
                  title: "Pomodoro Timer",
                  description:
                    "Stay focused with the Pomodoro technique — 25-minute work sessions with timed breaks.",
                  href: "/tools/pomodoro-timer",
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

"use client";

import { useState, useMemo } from "react";
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
      <span className="text-[#f0f0f5]">Readability Checker</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Readability Helpers                                                */
/* ------------------------------------------------------------------ */

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length <= 2) return 1;

  // Remove trailing silent e
  word = word.replace(/e$/, "");

  // Count vowel groups
  const vowelGroups = word.match(/[aeiouy]+/g);
  const count = vowelGroups ? vowelGroups.length : 1;

  return Math.max(1, count);
}

function getSentences(text: string): string[] {
  // Split on sentence-ending punctuation followed by space or end of string
  return text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function getWords(text: string): string[] {
  return text
    .split(/\s+/)
    .map((w) => w.replace(/[^a-zA-Z0-9'-]/g, ""))
    .filter((w) => w.length > 0);
}

interface ReadabilityResult {
  wordCount: number;
  sentenceCount: number;
  syllableCount: number;
  avgWordsPerSentence: number;
  avgSyllablesPerWord: number;
  fleschReadingEase: number;
  fleschKincaidGrade: number;
  gradeLabel: string;
  easeLabel: string;
  easeColor: string;
  suggestions: string[];
}

function analyzeReadability(text: string): ReadabilityResult | null {
  const words = getWords(text);
  const sentences = getSentences(text);

  if (words.length === 0 || sentences.length === 0) return null;

  const wordCount = words.length;
  const sentenceCount = sentences.length;
  const syllableCount = words.reduce((sum, w) => sum + countSyllables(w), 0);
  const avgWordsPerSentence = wordCount / sentenceCount;
  const avgSyllablesPerWord = syllableCount / wordCount;

  // Flesch Reading Ease = 206.835 - 1.015 * (words/sentences) - 84.6 * (syllables/words)
  const fleschReadingEase =
    206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;

  // Flesch-Kincaid Grade Level = 0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59
  const fleschKincaidGrade =
    0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;

  // Clamp values
  const clampedEase = Math.max(0, Math.min(100, fleschReadingEase));
  const clampedGrade = Math.max(0, fleschKincaidGrade);

  // Grade label
  let gradeLabel: string;
  if (clampedGrade <= 5) gradeLabel = "Elementary school level";
  else if (clampedGrade <= 8) gradeLabel = "Middle school level";
  else if (clampedGrade <= 12) gradeLabel = "High school level";
  else if (clampedGrade <= 16) gradeLabel = "College level";
  else gradeLabel = "Graduate / professional level";

  // Ease label & color
  let easeLabel: string;
  let easeColor: string;
  if (clampedEase >= 90) {
    easeLabel = "Very Easy";
    easeColor = "#00e676";
  } else if (clampedEase >= 80) {
    easeLabel = "Easy";
    easeColor = "#66ff99";
  } else if (clampedEase >= 70) {
    easeLabel = "Fairly Easy";
    easeColor = "#88cc44";
  } else if (clampedEase >= 60) {
    easeLabel = "Standard";
    easeColor = "#f0c040";
  } else if (clampedEase >= 50) {
    easeLabel = "Fairly Difficult";
    easeColor = "#ff9800";
  } else if (clampedEase >= 30) {
    easeLabel = "Difficult";
    easeColor = "#ff5252";
  } else {
    easeLabel = "Very Difficult";
    easeColor = "#d50000";
  }

  // Suggestions
  const suggestions: string[] = [];
  if (avgWordsPerSentence > 20) {
    suggestions.push(
      `Your average sentence length is ${avgWordsPerSentence.toFixed(1)} words. Try to keep sentences under 20 words for better readability.`
    );
  }
  if (avgSyllablesPerWord > 1.7) {
    suggestions.push(
      "Your text uses many complex (multi-syllable) words. Consider replacing them with simpler alternatives where possible."
    );
  }
  if (clampedEase < 60) {
    suggestions.push(
      "Your text is harder to read than average. Try shorter sentences and simpler vocabulary to make it more accessible."
    );
  }
  if (clampedEase >= 60 && clampedEase < 70) {
    suggestions.push(
      "Your text is at a standard readability level. To make it easier to skim, consider breaking up longer paragraphs."
    );
  }
  if (clampedGrade > 12) {
    suggestions.push(
      "The grade level is above high school. If your audience is general readers, aim for Grade 8 or lower."
    );
  }
  if (wordCount < 100) {
    suggestions.push(
      "Your text is quite short. Readability scores are more reliable with 100+ words."
    );
  }
  if (suggestions.length === 0) {
    suggestions.push(
      "Your text has great readability! It should be easy for most readers to understand."
    );
  }

  return {
    wordCount,
    sentenceCount,
    syllableCount,
    avgWordsPerSentence: parseFloat(avgWordsPerSentence.toFixed(1)),
    avgSyllablesPerWord: parseFloat(avgSyllablesPerWord.toFixed(2)),
    fleschReadingEase: parseFloat(clampedEase.toFixed(1)),
    fleschKincaidGrade: parseFloat(clampedGrade.toFixed(1)),
    gradeLabel,
    easeLabel,
    easeColor,
    suggestions,
  };
}

/* ------------------------------------------------------------------ */
/*  Gauge Component                                                    */
/* ------------------------------------------------------------------ */

function ReadabilityGauge({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  // Arc from -135deg to +135deg (270 degrees total)
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const arcLength = (270 / 360) * circumference;
  const progress = Math.max(0, Math.min(100, value)) / 100;
  const dashOffset = arcLength * (1 - progress);

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="140" viewBox="0 0 200 140">
        {/* Background arc */}
        <circle
          cx="100"
          cy="110"
          r={radius}
          fill="none"
          stroke="#1e1e2e"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference}`}
          transform="rotate(-225, 100, 110)"
        />
        {/* Progress arc */}
        <circle
          cx="100"
          cy="110"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={dashOffset}
          transform="rotate(-225, 100, 110)"
          className="transition-all duration-700 ease-out"
          style={{ filter: `drop-shadow(0 0 6px ${color}66)` }}
        />
        {/* Value text */}
        <text
          x="100"
          y="100"
          textAnchor="middle"
          className="text-3xl font-bold"
          fill="white"
          style={{ fontSize: "32px", fontWeight: 700 }}
        >
          {value.toFixed(1)}
        </text>
        <text
          x="100"
          y="125"
          textAnchor="middle"
          fill={color}
          style={{ fontSize: "12px", fontWeight: 600 }}
        >
          {label}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What is the Flesch Reading Ease score?",
    answer:
      "The Flesch Reading Ease score rates text on a scale from 0 to 100, with higher scores indicating easier-to-read text. A score of 60-70 is considered standard (plain English), while scores above 80 are easy enough for most audiences. The formula considers average sentence length and average syllables per word.",
  },
  {
    question: "What is the Flesch-Kincaid Grade Level?",
    answer:
      "The Flesch-Kincaid Grade Level converts the readability of text into a U.S. school grade level. For example, a score of 8.0 means an eighth grader can understand the text. Most popular content targets Grade 7-8. Technical or academic writing may score Grade 12 or higher.",
  },
  {
    question: "What readability score should I aim for?",
    answer:
      "For general audiences, aim for a Flesch Reading Ease score of 60-70 (plain English) and a Grade Level of 7-8. Web content, marketing copy, and journalism typically target even easier reading levels (Grade 6-8). Technical documentation and academic papers naturally have higher grade levels.",
  },
  {
    question: "How can I improve my readability score?",
    answer:
      "Use shorter sentences (under 20 words on average). Choose simple, everyday words over complex alternatives (\"use\" instead of \"utilize\"). Break up long paragraphs. Use active voice instead of passive voice. Avoid jargon unless writing for a specialized audience. Read your text aloud to catch awkward phrasing.",
  },
  {
    question: "How accurate is this readability checker?",
    answer:
      "The Flesch-Kincaid formulas are well-established and widely used in education, government, and publishing. However, they measure mechanical aspects of text (sentence length, syllable count) and don't evaluate meaning, coherence, or engagement. Use these scores as guidelines alongside your own judgment about your audience.",
  },
  {
    question: "What readability level do popular publications use?",
    answer:
      "Most newspapers target Grade 6-8. USA Today averages around Grade 7, while The New York Times averages around Grade 10. Best-selling fiction typically scores Grade 4-7. Legal documents and academic papers often score Grade 14+. Aim for the level that matches your audience's expectations.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ReadabilityCheckerPage() {
  const [text, setText] = useState("");

  const result = useMemo(() => analyzeReadability(text), [text]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Readability Score Checker",
    description:
      "Check the readability of your text with Flesch-Kincaid Grade Level, Flesch Reading Ease, and detailed writing analysis.",
    url: "https://prestokit.com/tools/readability-checker",
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
              Readability{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Checker
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Paste your text below to check its readability. Get Flesch-Kincaid
              scores, grade level analysis, and suggestions to improve your writing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
                Your Text
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste or type your text here to check its readability score..."
                className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 px-5 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors resize-none leading-relaxed"
                rows={14}
                spellCheck={false}
              />
              <div className="flex items-center justify-between mt-3 text-xs text-[#555566]">
                <span>{result ? `${result.wordCount} words` : "0 words"}</span>
                <button
                  onClick={() => setText("")}
                  className="text-[#7c6cf0] hover:text-[#9d90f5] transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {result ? (
                <>
                  {/* Score Gauges */}
                  <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                    <h2 className="text-sm font-semibold text-[#c0c0d0] mb-4">
                      Readability Scores
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center">
                        <ReadabilityGauge
                          value={result.fleschReadingEase}
                          label={result.easeLabel}
                          color={result.easeColor}
                        />
                        <div className="text-xs text-[#8888a0] mt-1">
                          Flesch Reading Ease
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-6 text-center w-full">
                          <div className="text-4xl font-bold text-white mb-1">
                            {result.fleschKincaidGrade}
                          </div>
                          <div className="text-xs text-[#9d90f5] font-semibold">
                            Grade Level
                          </div>
                          <div className="text-xs text-[#8888a0] mt-2">
                            {result.gradeLabel}
                          </div>
                        </div>
                        <div className="text-xs text-[#8888a0] mt-3">
                          Flesch-Kincaid Grade
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { label: "Words", value: result.wordCount.toString() },
                      { label: "Sentences", value: result.sentenceCount.toString() },
                      { label: "Syllables", value: result.syllableCount.toString() },
                      {
                        label: "Avg Words/Sentence",
                        value: result.avgWordsPerSentence.toString(),
                      },
                      {
                        label: "Avg Syllables/Word",
                        value: result.avgSyllablesPerWord.toString(),
                      },
                      {
                        label: "Characters",
                        value: text.length.toString(),
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 text-center"
                      >
                        <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                          {stat.label}
                        </div>
                        <div className="text-xl font-bold text-white">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Suggestions */}
                  <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
                    <h3 className="text-sm font-semibold text-[#c0c0d0] mb-4">
                      Suggestions
                    </h3>
                    <div className="space-y-3">
                      {result.suggestions.map((suggestion, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#7c6cf0]/20 flex items-center justify-center mt-0.5">
                            <svg
                              className="w-3 h-3 text-[#7c6cf0]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                              />
                            </svg>
                          </div>
                          <p className="text-sm text-[#a0a0b8] leading-relaxed">
                            {suggestion}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#7c6cf0]/10 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-[#7c6cf0]/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </div>
                  <p className="text-[#555566] text-sm">
                    Paste or type your text on the left to see readability scores
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Reading Ease Scale */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <h2 className="text-lg font-semibold text-white mb-6">
              Flesch Reading Ease Scale
            </h2>
            <div className="space-y-2">
              {[
                { range: "90-100", label: "Very Easy", desc: "5th grade — easily understood by 11-year-olds", color: "#00e676" },
                { range: "80-89", label: "Easy", desc: "6th grade — conversational English", color: "#66ff99" },
                { range: "70-79", label: "Fairly Easy", desc: "7th grade — easy for most adults", color: "#88cc44" },
                { range: "60-69", label: "Standard", desc: "8th-9th grade — plain English", color: "#f0c040" },
                { range: "50-59", label: "Fairly Difficult", desc: "10th-12th grade — high school level", color: "#ff9800" },
                { range: "30-49", label: "Difficult", desc: "College level — academic or technical", color: "#ff5252" },
                { range: "0-29", label: "Very Difficult", desc: "Graduate level — professional or scholarly", color: "#d50000" },
              ].map((item) => (
                <div
                  key={item.range}
                  className="flex items-center gap-4 rounded-xl border border-[#1e1e2e]/60 bg-[#0a0a0f]/50 px-4 py-3"
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="w-16 text-sm font-semibold text-white">
                    {item.range}
                  </div>
                  <div className="w-32 text-sm font-medium" style={{ color: item.color }}>
                    {item.label}
                  </div>
                  <div className="text-sm text-[#8888a0]">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* PromoBar */}
          <PromoBar type="pro" dismissKey="readability-checker-pro" />

          {/* How It Works */}
          <div className="mb-16 mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Paste Your Text",
                  description:
                    "Copy and paste any text — blog posts, emails, essays, marketing copy — into the input area.",
                },
                {
                  step: "2",
                  title: "Get Instant Scores",
                  description:
                    "See your Flesch Reading Ease, Flesch-Kincaid Grade Level, word count, sentence count, and more in real time.",
                },
                {
                  step: "3",
                  title: "Improve Your Writing",
                  description:
                    "Follow the personalized suggestions to make your text more readable and accessible to your target audience.",
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
                    "Count words, characters, sentences, and paragraphs in your text.",
                  href: "/tools/word-counter",
                },
                {
                  title: "Text Case Converter",
                  description:
                    "Convert text between uppercase, lowercase, title case, and more.",
                  href: "/tools/text-case-converter",
                },
                {
                  title: "Typing Speed Test",
                  description:
                    "Test your typing speed and accuracy with real-time WPM tracking.",
                  href: "/tools/typing-speed-test",
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

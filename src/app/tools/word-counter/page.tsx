"use client";

import { useState, useMemo } from "react";

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
      <span className="text-[#f0f0f5]">Word Counter</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const STOP_WORDS = new Set([
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her",
  "she", "or", "an", "will", "my", "one", "all", "would", "there",
  "their", "what", "so", "up", "out", "if", "about", "who", "get",
  "which", "go", "me", "when", "make", "can", "like", "time", "no",
  "just", "him", "know", "take", "people", "into", "year", "your",
  "good", "some", "could", "them", "see", "other", "than", "then",
  "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first",
  "well", "way", "even", "new", "want", "because", "any", "these",
  "give", "day", "most", "us", "is", "are", "was", "were", "been",
  "has", "had", "am",
]);

const FAQ_DATA = [
  {
    question: "How does the word counter work?",
    answer:
      "Simply paste or type your text into the textarea above, and all statistics update instantly in real time. Words are counted by splitting on whitespace, sentences by counting period/exclamation/question marks, and paragraphs by counting groups of text separated by blank lines.",
  },
  {
    question: "What is the reading time estimate based on?",
    answer:
      "The reading time is calculated using the average adult reading speed of 200 words per minute (WPM). This is a widely accepted benchmark for non-technical content. Technical or academic text may take longer to read.",
  },
  {
    question: "What is the speaking time estimate based on?",
    answer:
      "Speaking time uses 130 words per minute, which is the average pace for presentations and public speaking. Conversational speech is slightly faster at around 150 WPM, while formal presentations tend to be slower.",
  },
  {
    question: "How is keyword density calculated?",
    answer:
      "Keyword density shows the top 10 most frequently used words (excluding common stop words like 'the', 'and', 'is'). The percentage is calculated as: (word count / total words) x 100. This is useful for SEO content optimization.",
  },
  {
    question: "Does this tool count characters with and without spaces?",
    answer:
      "Yes. We show both counts: total characters (including spaces and line breaks) and characters without spaces. This is helpful for social media posts (Twitter/X has a 280-character limit) and other character-limited contexts.",
  },
  {
    question: "Is my text stored or sent anywhere?",
    answer:
      "No. All processing happens entirely in your browser. Your text is never transmitted to any server, never stored, and never logged. You can use this tool with complete confidence for sensitive or confidential content.",
  },
];

/* ------------------------------------------------------------------ */
/*  Stat Card                                                          */
/* ------------------------------------------------------------------ */

function StatCard({ label, value, color = "white" }: { label: string; value: string | number; color?: "white" | "purple" | "green" }) {
  const colorMap = {
    white: "text-white",
    purple: "text-[#9d90f5]",
    green: "text-[#00e676]",
  };

  return (
    <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-4 text-center">
      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
        {label}
      </div>
      <div className={`text-xl sm:text-2xl font-bold ${colorMap[color]}`}>
        {value}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function WordCounterPage() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        avgWordLength: 0,
        readingTime: "0 sec",
        speakingTime: "0 sec",
        keywords: [] as { word: string; count: number; percent: string }[],
      };
    }

    const wordsArray = trimmed.split(/\s+/).filter((w) => w.length > 0);
    const wordCount = wordsArray.length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;

    // Sentences: count sentence-ending punctuation
    const sentenceMatches = trimmed.match(/[.!?]+/g);
    const sentences = sentenceMatches ? sentenceMatches.length : (wordCount > 0 ? 1 : 0);

    // Paragraphs: split by double newlines or count non-empty blocks
    const paragraphs = trimmed
      .split(/\n\s*\n/)
      .filter((p) => p.trim().length > 0).length || (wordCount > 0 ? 1 : 0);

    // Average word length
    const totalChars = wordsArray.reduce((sum, w) => sum + w.replace(/[^a-zA-Z0-9]/g, "").length, 0);
    const avgWordLength = wordCount > 0 ? totalChars / wordCount : 0;

    // Reading time (200 WPM)
    const readingMinutes = wordCount / 200;
    let readingTime: string;
    if (readingMinutes < 1) {
      readingTime = `${Math.max(1, Math.round(readingMinutes * 60))} sec`;
    } else {
      readingTime = `${Math.round(readingMinutes)} min`;
    }

    // Speaking time (130 WPM)
    const speakingMinutes = wordCount / 130;
    let speakingTime: string;
    if (speakingMinutes < 1) {
      speakingTime = `${Math.max(1, Math.round(speakingMinutes * 60))} sec`;
    } else {
      speakingTime = `${Math.round(speakingMinutes)} min`;
    }

    // Keyword density (top 10, excluding stop words)
    const freq: Record<string, number> = {};
    wordsArray.forEach((w) => {
      const clean = w.toLowerCase().replace(/[^a-z0-9'-]/g, "");
      if (clean.length > 1 && !STOP_WORDS.has(clean)) {
        freq[clean] = (freq[clean] || 0) + 1;
      }
    });

    const keywords = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({
        word,
        count,
        percent: ((count / wordCount) * 100).toFixed(1),
      }));

    return {
      words: wordCount,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      avgWordLength,
      readingTime,
      speakingTime,
      keywords,
    };
  }, [text]);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  const handleClear = () => {
    setText("");
    setCopied(false);
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-[#0a0a0f] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Word &amp; Character{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Counter
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Count words, characters, sentences, and paragraphs in real time.
              Get reading time, speaking time, and keyword density analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Textarea */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-[#c0c0d0]">
                    Your Text
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={handleClear}
                      disabled={!text}
                      className="text-xs text-[#8888a0] hover:text-white border border-[#1e1e2e] hover:border-[#7c6cf0]/40 rounded-lg px-3 py-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleCopy}
                      disabled={!text}
                      className="text-xs text-[#7c6cf0] hover:text-[#9d90f5] border border-[#7c6cf0]/30 hover:border-[#7c6cf0] rounded-lg px-3 py-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste or type your text here..."
                  rows={16}
                  className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-4 text-white text-sm placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Right: Stats Panel */}
            <div className="space-y-6">
              {/* Main Stats */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-4">
                  Statistics
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <StatCard label="Words" value={stats.words.toLocaleString()} color="purple" />
                  <StatCard label="Characters" value={stats.characters.toLocaleString()} />
                  <StatCard label="No Spaces" value={stats.charactersNoSpaces.toLocaleString()} />
                  <StatCard label="Sentences" value={stats.sentences.toLocaleString()} />
                  <StatCard label="Paragraphs" value={stats.paragraphs.toLocaleString()} />
                  <StatCard label="Avg Word Len" value={stats.avgWordLength.toFixed(1)} />
                </div>
              </div>

              {/* Time Estimates */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-4">
                  Time Estimates
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#7c6cf0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span className="text-sm text-[#8888a0]">Reading</span>
                    </div>
                    <span className="text-sm font-semibold text-[#00e676]">
                      {stats.readingTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#7c6cf0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                      <span className="text-sm text-[#8888a0]">Speaking</span>
                    </div>
                    <span className="text-sm font-semibold text-[#00e676]">
                      {stats.speakingTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Keyword Density */}
          {stats.keywords.length > 0 && (
            <div className="mt-6 rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              <h2 className="text-sm font-semibold text-[#c0c0d0] mb-4">
                Keyword Density (Top 10)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1e1e2e]">
                      <th className="text-left text-[#8888a0] font-medium pb-3 pr-4">Keyword</th>
                      <th className="text-center text-[#8888a0] font-medium pb-3 px-4">Count</th>
                      <th className="text-center text-[#8888a0] font-medium pb-3 px-4">Density</th>
                      <th className="text-left text-[#8888a0] font-medium pb-3 pl-4 w-1/3">Bar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.keywords.map((kw) => (
                      <tr key={kw.word} className="border-b border-[#1e1e2e]/60">
                        <td className="py-3 pr-4 text-white font-medium">{kw.word}</td>
                        <td className="py-3 px-4 text-center text-[#9d90f5]">{kw.count}</td>
                        <td className="py-3 px-4 text-center text-[#8888a0]">{kw.percent}%</td>
                        <td className="py-3 pl-4">
                          <div className="w-full h-2 rounded-full bg-[#0a0a0f] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#7c6cf0] transition-all"
                              style={{ width: `${Math.min(parseFloat(kw.percent) * 5, 100)}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                  title: "Paste Your Text",
                  description:
                    "Type or paste your content into the text area. There is no character limit -- paste entire articles, essays, or books.",
                },
                {
                  step: "2",
                  title: "View Real-Time Stats",
                  description:
                    "As you type, instantly see word count, character count, sentences, paragraphs, average word length, reading time, and speaking time.",
                },
                {
                  step: "3",
                  title: "Analyze Keywords",
                  description:
                    "Review the keyword density table to see your most-used words with counts and percentages. Great for SEO content optimization.",
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
                  title: "Lorem Ipsum Generator",
                  description: "Generate placeholder text for your designs and mockups.",
                  href: "/tools/lorem-ipsum-generator",
                },
                {
                  title: "Password Generator",
                  description: "Create strong, secure random passwords instantly.",
                  href: "/tools/password-generator",
                },
                {
                  title: "Invoice Generator",
                  description: "Create professional invoices for your business.",
                  href: "/tools/invoice-generator",
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

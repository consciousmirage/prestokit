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
      <span className="text-[#f0f0f5]">Character Counter</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Social Media Limits                                                */
/* ------------------------------------------------------------------ */

interface PlatformLimit {
  name: string;
  field: string;
  limit: number;
  color: string;
}

const PLATFORM_LIMITS: PlatformLimit[] = [
  { name: "Twitter/X", field: "Post", limit: 280, color: "#1DA1F2" },
  { name: "Twitter/X", field: "Bio", limit: 160, color: "#1DA1F2" },
  { name: "Instagram", field: "Caption", limit: 2200, color: "#E1306C" },
  { name: "Instagram", field: "Bio", limit: 150, color: "#E1306C" },
  { name: "Facebook", field: "Post", limit: 63206, color: "#1877F2" },
  { name: "LinkedIn", field: "Post", limit: 3000, color: "#0A66C2" },
  { name: "LinkedIn", field: "About", limit: 2600, color: "#0A66C2" },
  { name: "TikTok", field: "Caption", limit: 4000, color: "#FE2C55" },
  { name: "YouTube", field: "Title", limit: 100, color: "#FF0000" },
  { name: "YouTube", field: "Description", limit: 5000, color: "#FF0000" },
  { name: "Pinterest", field: "Description", limit: 500, color: "#E60023" },
  { name: "Google Ads", field: "Headline", limit: 30, color: "#4285F4" },
  { name: "Google Ads", field: "Description", limit: 90, color: "#4285F4" },
  { name: "Meta Title", field: "SEO", limit: 60, color: "#00e676" },
  { name: "Meta Description", field: "SEO", limit: 160, color: "#00e676" },
  { name: "SMS", field: "Message", limit: 160, color: "#8888a0" },
];

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What is the Twitter/X character limit?",
    answer:
      "Twitter/X has a 280-character limit for standard posts. This includes letters, numbers, spaces, punctuation, and emojis. URLs count as 23 characters regardless of their actual length. Twitter Blue/Premium subscribers can post up to 25,000 characters. The bio limit is 160 characters.",
  },
  {
    question: "What is the Instagram character limit?",
    answer:
      "Instagram captions have a 2,200-character limit. However, only the first 125 characters are visible before users tap 'more,' so put the most important content first. Instagram bio is limited to 150 characters. Comments have a 2,200-character limit as well, and hashtags count toward the character count.",
  },
  {
    question: "Do spaces and emojis count as characters?",
    answer:
      "Yes, spaces count as one character each. Emojis are more complex — most emojis count as 2 characters (they use 2 Unicode code points), though some complex emojis like flags or skin-tone variations can count as 4-7 characters. This counter shows the exact character count including spaces and properly counts Unicode characters.",
  },
  {
    question: "What is the difference between characters and bytes?",
    answer:
      "Characters are individual symbols (letters, numbers, spaces, etc.), while bytes measure storage size. In ASCII, one character = one byte. But in UTF-8 (the standard for web text), characters can use 1-4 bytes. For example, the letter 'A' uses 1 byte, an accented 'e' uses 2 bytes, and many emojis use 4 bytes. Social media limits count characters, not bytes.",
  },
  {
    question: "How is reading time calculated?",
    answer:
      "Reading time is estimated using the average adult reading speed of approximately 200-250 words per minute. This counter uses 225 words per minute as the baseline. Speaking time (for presentations or videos) uses about 130 words per minute. These are averages and actual speed varies by person and content complexity.",
  },
  {
    question: "What character limits does YouTube have?",
    answer:
      "YouTube video titles are limited to 100 characters, though only about 70 are visible in search results. Video descriptions can be up to 5,000 characters. Channel names are limited to 100 characters, and comments can be up to 10,000 characters. Tags have a combined limit of 500 characters.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CharacterCounterPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const sentences = text.trim() === "" ? 0 : (text.match(/[.!?]+/g) || []).length || (text.trim().length > 0 ? 1 : 0);
    const paragraphs = text.trim() === "" ? 0 : text.split(/\n\n+/).filter((p) => p.trim()).length;
    const lines = text.trim() === "" ? 0 : text.split(/\n/).length;
    const readingTime = Math.max(1, Math.ceil(words / 225));
    const speakingTime = Math.max(1, Math.ceil(words / 130));

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      readingTime,
      speakingTime,
    };
  }, [text]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Character Counter",
    description:
      "Count characters, words, sentences, and paragraphs in real time. See social media character limits for Twitter, Instagram, YouTube, LinkedIn, and more.",
    url: "https://prestokit.com/tools/character-counter",
    applicationCategory: "UtilityApplication",
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
              Character{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Counter
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Count characters, words, sentences, and paragraphs in real time. See
              how your text fits within character limits for Twitter, Instagram,
              YouTube, LinkedIn, and other platforms.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Characters", value: stats.characters.toLocaleString(), highlight: true },
              { label: "Words", value: stats.words.toLocaleString(), highlight: false },
              { label: "Sentences", value: stats.sentences.toLocaleString(), highlight: false },
              { label: "Paragraphs", value: stats.paragraphs.toLocaleString(), highlight: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-xl border p-4 text-center ${
                  item.highlight
                    ? "border-[#7c6cf0]/30 bg-[#7c6cf0]/5"
                    : "border-[#1e1e2e] bg-[#12121a]/60"
                }`}
              >
                <div className="text-2xl font-bold text-white">{item.value}</div>
                <div className="text-xs text-[#8888a0] uppercase tracking-wide mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Text Area */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-[#c0c0d0]">
                    Your Text
                  </label>
                  {text.length > 0 && (
                    <button
                      onClick={() => setText("")}
                      className="text-xs text-[#8888a0] hover:text-[#ff5252] transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Start typing or paste your text here..."
                  rows={14}
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 px-4 text-base text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors resize-y leading-relaxed"
                />

                {/* Extra stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  {[
                    { label: "No Spaces", value: stats.charactersNoSpaces.toLocaleString() },
                    { label: "Lines", value: stats.lines.toLocaleString() },
                    { label: "Reading Time", value: `~${stats.readingTime} min` },
                    { label: "Speaking Time", value: `~${stats.speakingTime} min` },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] p-3 text-center"
                    >
                      <div className="text-lg font-bold text-white">{item.value}</div>
                      <div className="text-[10px] text-[#8888a0] uppercase tracking-wide mt-0.5">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Platform Limits */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              <h2 className="text-sm font-semibold text-[#c0c0d0] mb-4">
                Platform Limits
              </h2>
              <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
                {PLATFORM_LIMITS.map((platform, i) => {
                  const percent = Math.min((stats.characters / platform.limit) * 100, 100);
                  const isOver = stats.characters > platform.limit;
                  const remaining = platform.limit - stats.characters;

                  return (
                    <div key={i} className="rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="text-xs font-medium text-[#c0c0d0]">
                          {platform.name}{" "}
                          <span className="text-[#555566]">{platform.field}</span>
                        </div>
                        <div
                          className={`text-xs font-semibold ${
                            isOver ? "text-[#ff5252]" : "text-[#8888a0]"
                          }`}
                        >
                          {stats.characters}/{platform.limit.toLocaleString()}
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-[#1e1e2e] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${percent}%`,
                            backgroundColor: isOver ? "#ff5252" : platform.color,
                          }}
                        />
                      </div>
                      <div className="mt-1 text-[10px]">
                        {isOver ? (
                          <span className="text-[#ff5252]">
                            {Math.abs(remaining).toLocaleString()} over limit
                          </span>
                        ) : (
                          <span className="text-[#555566]">
                            {remaining.toLocaleString()} remaining
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16 mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Type or Paste Text",
                  description:
                    "Enter your text in the editor. You can type directly, paste from another source, or drag and drop. Counts update in real time.",
                },
                {
                  step: "2",
                  title: "Check Your Counts",
                  description:
                    "See character count, word count, sentences, paragraphs, lines, reading time, and speaking time — all calculated instantly.",
                },
                {
                  step: "3",
                  title: "Check Platform Limits",
                  description:
                    "See progress bars for 16 social media and SEO limits. Know instantly if your text fits Twitter, Instagram, YouTube, LinkedIn, and more.",
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
                  <p className="text-sm text-[#8888a0] leading-relaxed">{item.description}</p>
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
                  title: "Word Counter",
                  description:
                    "Count words, characters, sentences, and get reading time estimates.",
                  href: "/tools/word-counter",
                },
                {
                  title: "Text Case Converter",
                  description:
                    "Convert text between UPPER, lower, Title, camelCase, snake_case, and more.",
                  href: "/tools/text-case-converter",
                },
                {
                  title: "Lorem Ipsum Generator",
                  description:
                    "Generate placeholder text for your designs and mockups instantly.",
                  href: "/tools/lorem-ipsum-generator",
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

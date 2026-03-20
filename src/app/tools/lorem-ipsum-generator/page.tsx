"use client";

import { useState, useCallback, useMemo } from "react";

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
      <span className="text-[#f0f0f5]">Lorem Ipsum Generator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Lorem Ipsum Data                                                   */
/* ------------------------------------------------------------------ */

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "pellentesque", "habitant",
  "morbi", "tristique", "senectus", "netus", "malesuada", "fames", "ac", "turpis",
  "egestas", "vestibulum", "tortor", "quam", "feugiat", "vitae", "ultricies",
  "eget", "tempus", "porta", "nibh", "venenatis", "cras", "viverra", "maecenas",
  "accumsan", "lacus", "vel", "facilisis", "volutpat", "donec", "pretium",
  "vulputate", "sapien", "nec", "sagittis", "aliquam", "metus", "blandit",
  "massa", "eros", "cursus", "proin", "gravida", "hendrerit", "lectus",
  "pharetra", "dapibus", "odio", "elementum", "pulvinar", "etiam", "neque",
  "libero", "faucibus", "ornare", "suspendisse", "potenti", "nullam", "porttitor",
  "urna", "iaculis", "justo", "tincidunt", "praesent", "semper", "felis",
  "imperdiet", "mattis", "scelerisque", "mauris", "condimentum", "auctor",
  "augue", "risus", "bibendum", "placerat", "orci", "nunc", "interdum",
  "posuere", "purus", "sodales", "dignissim", "convallis", "rhoncus", "luctus",
  "sollicitudin", "diam", "dictum", "arcu", "euismod", "integer", "hac",
  "habitasse", "platea", "dictumst", "quisque", "ligula", "suscipit", "leo",
  "mi", "dui", "at", "ante", "nam", "nisl", "fusce", "fermentum",
];

const CLASSIC_START = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";

type GenerateType = "paragraphs" | "sentences" | "words";

const FAQ_DATA = [
  {
    question: "What is Lorem Ipsum?",
    answer:
      "Lorem Ipsum is dummy placeholder text that has been the industry standard since the 1500s. It originates from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' by Cicero, written in 45 BC. It is used by designers and developers to fill layouts with realistic-looking text before final content is available.",
  },
  {
    question: "Why use Lorem Ipsum instead of real text?",
    answer:
      "Lorem Ipsum provides a natural-looking distribution of letters and word lengths that mimics real English text. Using readable English content as placeholder can distract viewers from focusing on the design, layout, and typography. Lorem Ipsum keeps the focus on visual presentation.",
  },
  {
    question: "Can I use this generated text for free?",
    answer:
      "Yes, absolutely. Lorem Ipsum is not copyrighted and is free to use for any purpose -- commercial or personal. The text has been in the public domain for centuries. Generate as much as you need for your projects.",
  },
  {
    question: "What is the difference between paragraphs, sentences, and words mode?",
    answer:
      "Paragraphs mode generates full paragraphs of 4-8 sentences each, perfect for filling large content areas. Sentences mode generates individual sentences, ideal for captions or short descriptions. Words mode generates a specific number of individual words, useful when you need exact word counts.",
  },
  {
    question: "Does this tool work offline?",
    answer:
      "Yes. Once the page loads, all text generation happens locally in your browser with no server calls. You can disconnect from the internet and continue generating Lorem Ipsum text.",
  },
  {
    question: "How is the text generated?",
    answer:
      "The generator uses a curated vocabulary of Latin words commonly found in Lorem Ipsum text. It randomly selects words to form sentences and paragraphs. When the 'Start with Lorem ipsum...' option is enabled, the first sentence begins with the classic opening phrase.",
  },
];

/* ------------------------------------------------------------------ */
/*  Generator Logic                                                    */
/* ------------------------------------------------------------------ */

function randomWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function generateSentence(minWords = 6, maxWords = 16): string {
  const count = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    words.push(randomWord());
  }
  // Add a comma sometimes for natural flow
  if (count > 8) {
    const commaPos = Math.floor(Math.random() * (count - 4)) + 3;
    words[commaPos] = words[commaPos] + ",";
  }
  return capitalize(words.join(" ")) + ".";
}

function generateParagraph(minSentences = 4, maxSentences = 8): string {
  const count = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
  const sentences: string[] = [];
  for (let i = 0; i < count; i++) {
    sentences.push(generateSentence());
  }
  return sentences.join(" ");
}

function generateText(
  type: GenerateType,
  amount: number,
  startClassic: boolean
): string {
  if (amount <= 0) return "";

  if (type === "words") {
    const words: string[] = [];
    if (startClassic) {
      const classicWords = "lorem ipsum dolor sit amet consectetur adipiscing elit".split(" ");
      for (let i = 0; i < Math.min(amount, classicWords.length); i++) {
        words.push(i === 0 ? capitalize(classicWords[i]) : classicWords[i]);
      }
    }
    while (words.length < amount) {
      words.push(randomWord());
    }
    return words.slice(0, amount).join(" ");
  }

  if (type === "sentences") {
    const sentences: string[] = [];
    for (let i = 0; i < amount; i++) {
      if (i === 0 && startClassic) {
        sentences.push(CLASSIC_START.trim());
      } else {
        sentences.push(generateSentence());
      }
    }
    return sentences.join(" ");
  }

  // paragraphs
  const paragraphs: string[] = [];
  for (let i = 0; i < amount; i++) {
    if (i === 0 && startClassic) {
      paragraphs.push(CLASSIC_START + generateParagraph(3, 6));
    } else {
      paragraphs.push(generateParagraph());
    }
  }
  return paragraphs.join("\n\n");
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function LoremIpsumGeneratorPage() {
  const [type, setType] = useState<GenerateType>("paragraphs");
  const [amount, setAmount] = useState(5);
  const [startClassic, setStartClassic] = useState(true);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(() => {
    const text = generateText(type, amount, startClassic);
    setOutput(text);
    setCopied(false);
  }, [type, amount, startClassic]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  const outputStats = useMemo(() => {
    if (!output) return { words: 0, characters: 0 };
    const words = output.split(/\s+/).filter((w) => w.length > 0).length;
    const characters = output.length;
    return { words, characters };
  }, [output]);

  const typeOptions: { key: GenerateType; label: string }[] = [
    { key: "paragraphs", label: "Paragraphs" },
    { key: "sentences", label: "Sentences" },
    { key: "words", label: "Words" },
  ];

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
              Lorem Ipsum{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Generate placeholder text for your designs, mockups, and layouts.
              Choose paragraphs, sentences, or words.
            </p>
          </div>

          {/* Controls */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              {/* Type Selector */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
                  Type
                </label>
                <div className="flex gap-2">
                  {typeOptions.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setType(opt.key)}
                      className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                        type === opt.key
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                          : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
                  Amount
                </label>
                <input
                  type="number"
                  min={1}
                  max={type === "words" ? 5000 : type === "sentences" ? 200 : 100}
                  value={amount}
                  onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] px-4 py-2.5 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
              </div>

              {/* Start with classic */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
                  Options
                </label>
                <button
                  onClick={() => setStartClassic(!startClassic)}
                  className={`w-full flex items-center gap-3 rounded-xl border p-3 transition-all ${
                    startClassic
                      ? "border-[#7c6cf0] bg-[#7c6cf0]/10"
                      : "border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#7c6cf0]/40"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${
                      startClassic
                        ? "border-[#7c6cf0] bg-[#7c6cf0]"
                        : "border-[#555566]"
                    }`}
                  >
                    {startClassic && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm ${startClassic ? "text-white" : "text-[#8888a0]"}`}>
                    Start with &quot;Lorem ipsum...&quot;
                  </span>
                </button>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="w-full flex items-center justify-center gap-2 bg-[#7c6cf0] hover:bg-[#6b5ce0] text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-[#7c6cf0]/20"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Generate Lorem Ipsum
            </button>
          </div>

          {/* Output */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-[#c0c0d0]">
                Generated Text
              </label>
              <div className="flex items-center gap-4">
                {output && (
                  <div className="flex items-center gap-3 text-xs text-[#8888a0]">
                    <span>{outputStats.words.toLocaleString()} words</span>
                    <span className="text-[#1e1e2e]">|</span>
                    <span>{outputStats.characters.toLocaleString()} characters</span>
                  </div>
                )}
                <button
                  onClick={handleCopy}
                  disabled={!output}
                  className="flex items-center gap-1.5 text-xs text-[#7c6cf0] hover:text-[#9d90f5] border border-[#7c6cf0]/30 hover:border-[#7c6cf0] rounded-lg px-3 py-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              rows={12}
              placeholder="Click 'Generate Lorem Ipsum' to create placeholder text..."
              className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-4 text-[#c0c0d0] text-sm placeholder-[#555566] focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* What is Lorem Ipsum */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-16">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#7c6cf0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              What is Lorem Ipsum?
            </h2>
            <div className="text-sm text-[#a0a0b8] leading-relaxed space-y-3">
              <p>
                <strong className="text-white">Lorem Ipsum</strong> is placeholder text commonly used in the printing and typesetting
                industry. It has been the industry&apos;s standard dummy text since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
              <p>
                The text is derived from sections 1.10.32 and 1.10.33 of <em>&quot;de Finibus Bonorum et Malorum&quot;</em> (The Extremes
                of Good and Evil) by <strong className="text-white">Cicero</strong>, written in 45 BC. This makes it over 2,000 years old.
              </p>
              <p>
                Designers and developers use Lorem Ipsum because it provides a natural distribution of letters and words that closely
                resembles real English text. This allows reviewers to focus on the layout and visual design rather than being distracted
                by readable content.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Choose Your Format",
                  description:
                    "Select whether you need paragraphs, sentences, or individual words. Set the amount you need and toggle the classic opening.",
                },
                {
                  step: "2",
                  title: "Generate Text",
                  description:
                    "Click Generate to instantly create placeholder text. The generator uses authentic Latin vocabulary for realistic-looking results.",
                },
                {
                  step: "3",
                  title: "Copy & Paste",
                  description:
                    "Copy the generated text to your clipboard and paste it into your design tool, mockup, or code. Check the word and character counts.",
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
                  title: "Word Counter",
                  description: "Count words, characters, sentences, and get reading time estimates.",
                  href: "/tools/word-counter",
                },
                {
                  title: "Password Generator",
                  description: "Create strong, secure random passwords instantly.",
                  href: "/tools/password-generator",
                },
                {
                  title: "Business Name Generator",
                  description: "Generate creative business name ideas for your startup.",
                  href: "/tools/business-name-generator",
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

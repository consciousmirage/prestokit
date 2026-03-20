"use client";

import { useState, useCallback, useEffect } from "react";

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
      <span className="text-[#f0f0f5]">Password Generator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SPECIAL = "!@#$%^&*()_+-=[]{}|;:',.<>?/`~";

const FAQ_DATA = [
  {
    question: "How does this password generator work?",
    answer:
      "Our password generator uses your browser's built-in cryptographic random number generator (crypto.getRandomValues) to create truly random passwords. You choose the length and character types, and the tool assembles a password from those character sets using secure randomness. Everything runs locally in your browser -- no passwords are sent to any server.",
  },
  {
    question: "What makes a password strong?",
    answer:
      "A strong password is long (16+ characters), uses a mix of uppercase and lowercase letters, numbers, and special characters, and is not based on dictionary words or personal information. The more character types and length you use, the exponentially harder it becomes to crack.",
  },
  {
    question: "Is this password generator safe to use?",
    answer:
      "Yes. All password generation happens entirely in your browser using the Web Crypto API. No passwords are transmitted over the internet, stored on our servers, or logged in any way. You can even use this tool offline after the page loads.",
  },
  {
    question: "How long should my password be?",
    answer:
      "We recommend at least 16 characters for important accounts. For maximum security, use 20+ characters. An 8-character password can be cracked in hours by modern hardware, while a 16-character password with mixed character types would take millions of years.",
  },
  {
    question: "Should I use a different password for every account?",
    answer:
      "Absolutely. Reusing passwords is one of the biggest security risks. If one service is breached, attackers will try that same password on all your other accounts. Use a unique password for every account and store them in a password manager.",
  },
  {
    question: "What is a password manager and should I use one?",
    answer:
      "A password manager is software that securely stores all your passwords behind one master password. Popular options include Bitwarden, 1Password, and LastPass. They let you use long, unique passwords for every account without having to memorize them all.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getStrength(
  password: string,
  length: number,
  options: { upper: boolean; lower: boolean; numbers: boolean; special: boolean }
): { label: string; color: string; percent: number } {
  if (!password) return { label: "None", color: "#555566", percent: 0 };

  let score = 0;
  const activeTypes = [options.upper, options.lower, options.numbers, options.special].filter(Boolean).length;

  // Length scoring
  if (length >= 8) score += 1;
  if (length >= 12) score += 1;
  if (length >= 16) score += 1;
  if (length >= 24) score += 1;

  // Character variety scoring
  score += activeTypes;

  if (score <= 2) return { label: "Weak", color: "#ef4444", percent: 25 };
  if (score <= 4) return { label: "Fair", color: "#f59e0b", percent: 50 };
  if (score <= 6) return { label: "Strong", color: "#00e676", percent: 75 };
  return { label: "Very Strong", color: "#00e676", percent: 100 };
}

function generatePassword(
  length: number,
  options: { upper: boolean; lower: boolean; numbers: boolean; special: boolean }
): string {
  let charset = "";
  if (options.upper) charset += UPPERCASE;
  if (options.lower) charset += LOWERCASE;
  if (options.numbers) charset += NUMBERS;
  if (options.special) charset += SPECIAL;

  if (charset.length === 0) charset = LOWERCASE;

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }
  return password;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [special, setSpecial] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const options = { upper, lower, numbers, special };

  const handleGenerate = useCallback(() => {
    const pw = generatePassword(length, options);
    setPassword(pw);
    setCopied(false);
    setHistory((prev) => [pw, ...prev].slice(0, 5));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, upper, lower, numbers, special]);

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  const strength = getStrength(password, length, options);

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
              Password{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Generate strong, secure random passwords instantly. Everything runs
              locally in your browser — nothing is sent to any server.
            </p>
          </div>

          {/* Password Output */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
              Your Password
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-4 font-mono text-lg sm:text-xl text-white break-all select-all tracking-wide">
                {password || "Click Generate"}
              </div>
            </div>

            {/* Strength Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#8888a0]">Password Strength</span>
                <span style={{ color: strength.color }} className="font-semibold">
                  {strength.label}
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[#0a0a0f] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${strength.percent}%`,
                    backgroundColor: strength.color,
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={handleGenerate}
                className="flex-1 flex items-center justify-center gap-2 bg-[#7c6cf0] hover:bg-[#6b5ce0] text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-[#7c6cf0]/20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Generate Password
              </button>
              <button
                onClick={() => handleCopy(password)}
                disabled={!password}
                className="flex-1 flex items-center justify-center gap-2 bg-[#00e676] hover:bg-[#66ffa6] text-[#0a0a0f] font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-[#00e676]/20 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
            </div>
          </div>

          {/* Settings */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
              Password Settings
            </h2>

            {/* Length Slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm text-[#8888a0]">Password Length</label>
                <span className="text-lg font-bold text-[#7c6cf0]">{length}</span>
              </div>
              <input
                type="range"
                min={8}
                max={128}
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #7c6cf0 ${((length - 8) / 120) * 100}%, #1e1e2e ${((length - 8) / 120) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-xs text-[#555566] mt-1">
                <span>8</span>
                <span>128</span>
              </div>
            </div>

            {/* Toggle Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Uppercase (A-Z)", checked: upper, onChange: setUpper },
                { label: "Lowercase (a-z)", checked: lower, onChange: setLower },
                { label: "Numbers (0-9)", checked: numbers, onChange: setNumbers },
                { label: "Special (!@#$%...)", checked: special, onChange: setSpecial },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => opt.onChange(!opt.checked)}
                  className={`flex items-center gap-3 rounded-xl border p-4 transition-all ${
                    opt.checked
                      ? "border-[#7c6cf0] bg-[#7c6cf0]/10"
                      : "border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#7c6cf0]/40"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      opt.checked
                        ? "border-[#7c6cf0] bg-[#7c6cf0]"
                        : "border-[#555566]"
                    }`}
                  >
                    {opt.checked && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${opt.checked ? "text-white" : "text-[#8888a0]"}`}>
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Password History */}
          {history.length > 1 && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
              <h2 className="text-sm font-semibold text-[#c0c0d0] mb-4">
                Recent Passwords
              </h2>
              <div className="space-y-2">
                {history.slice(1).map((pw, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] px-4 py-3"
                  >
                    <span className="flex-1 font-mono text-sm text-[#8888a0] truncate">
                      {pw}
                    </span>
                    <button
                      onClick={() => handleCopy(pw)}
                      className="shrink-0 text-xs text-[#7c6cf0] hover:text-[#9d90f5] font-medium transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tips */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-16">
            <h2 className="text-sm font-semibold text-[#c0c0d0] mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#7c6cf0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Password Security Tips
            </h2>
            <ul className="space-y-2 text-sm text-[#a0a0b8]">
              <li className="flex items-start gap-2">
                <span className="text-[#00e676] mt-0.5 shrink-0">&#8226;</span>
                Use at least 16 characters for important accounts
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00e676] mt-0.5 shrink-0">&#8226;</span>
                Never reuse passwords across different accounts
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00e676] mt-0.5 shrink-0">&#8226;</span>
                Use a password manager to store your passwords securely
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00e676] mt-0.5 shrink-0">&#8226;</span>
                Enable two-factor authentication (2FA) whenever possible
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00e676] mt-0.5 shrink-0">&#8226;</span>
                Avoid using personal information in your passwords
              </li>
            </ul>
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
                  title: "Customize Settings",
                  description:
                    "Choose your password length (8-128 characters) and select which character types to include: uppercase, lowercase, numbers, and special characters.",
                },
                {
                  step: "2",
                  title: "Generate Password",
                  description:
                    "Click Generate to create a cryptographically secure random password using your browser's built-in Web Crypto API. No data leaves your device.",
                },
                {
                  step: "3",
                  title: "Copy & Use",
                  description:
                    "Copy your new password to the clipboard and paste it into your account. Check the strength indicator to make sure it meets your security needs.",
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
                  title: "QR Code Generator",
                  description: "Create custom QR codes for URLs, text, email, and WiFi.",
                  href: "/tools/qr-code-generator",
                },
                {
                  title: "Lorem Ipsum Generator",
                  description: "Generate placeholder text for your designs and mockups.",
                  href: "/tools/lorem-ipsum-generator",
                },
                {
                  title: "Word Counter",
                  description: "Count words, characters, sentences, and get reading time.",
                  href: "/tools/word-counter",
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

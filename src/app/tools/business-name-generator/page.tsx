"use client";

import { useState, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const BIZ_NAME_FAQS = [
  {
    q: "How do I choose a good business name?",
    a: "A good business name is memorable, easy to spell and pronounce, and gives some sense of what your business does or stands for. Start by brainstorming keywords related to your industry, values, and target audience. Test your top choices with friends and potential customers. Check that the name is not already trademarked or in use by another business in your industry. Finally, make sure a matching domain name and social media handles are available.",
  },
  {
    q: "Should I check if the domain is available for my business name?",
    a: "Absolutely. In today's digital world, your domain name is your online storefront. Before committing to a business name, check if the .com domain (and relevant extensions like .io or .co) is available. Our generator includes a \"Domain\" button on each name card that checks availability on Namecheap instantly. If the exact .com is taken, consider adding a word like \"get,\" \"try,\" or \"hello\" before your name, or explore alternative extensions.",
  },
  {
    q: "Can I trademark a business name?",
    a: "Yes, you can and should trademark your business name to protect your brand. In the United States, you can register a trademark with the USPTO (United States Patent and Trademark Office). Before filing, search the USPTO trademark database (TESS) to make sure your desired name is not already registered in your industry. Trademark registration gives you legal protection nationwide and the exclusive right to use the name in your business category. The process typically costs $250-$350 per class of goods or services.",
  },
  {
    q: "What makes a business name memorable?",
    a: "Memorable business names tend to share several traits: they are short (ideally 1-2 words), they have a pleasant sound or rhythm, they evoke an emotion or image, and they are unique enough to stand out. Think of names like Spotify, Airbnb, Canva, or Stripe — they are all easy to say, easy to remember, and distinctive. Alliteration (PayPal), made-up words (Kodak), and unexpected combinations (YouTube) are all effective techniques for creating sticky names.",
  },
  {
    q: "Should my business name describe what I do?",
    a: "It depends on your strategy. Descriptive names (like General Motors or The Home Depot) immediately communicate what the business does, which can help with initial marketing. Abstract or invented names (like Apple, Nike, or Google) are more unique and versatile — they allow your brand to evolve without being limited by the name. For startups, a slightly descriptive name can help with early SEO and customer understanding, while an abstract name gives you more long-term flexibility.",
  },
  {
    q: "How long should a business name be?",
    a: "Shorter is generally better. The ideal business name is 1-2 words and under 10 characters total. Short names are easier to remember, spell, type into a browser, and fit on business cards and signage. However, some successful businesses have longer names (Berkshire Hathaway, Under Armour) that work because they have strong brand recognition. Our generator lets you choose between Short (1 word), Medium (1-2 words), and Long (2-3 words) to match your preference.",
  },
  {
    q: "How do I check if a business name is already taken?",
    a: "There are several things to check: (1) Search your state's Secretary of State business registry to see if the name is registered. (2) Search the USPTO trademark database for federal trademarks. (3) Do a Google search to see if anyone else is using the name. (4) Check domain availability for the .com and other relevant extensions. (5) Search social media platforms for existing accounts with that name. Our generator helps with domain checking, but make sure to complete all five steps before finalizing your choice.",
  },
  {
    q: "Is this business name generator free?",
    a: "Yes, the PrestoKit Business Name Generator is 100% free with no limits, no account required, and no hidden fees. Generate as many names as you want, save your favorites, check domain availability, and copy names to your clipboard — all at no cost. The generator runs entirely in your browser, so your ideas and keywords stay private.",
  },
];

const RELATED_TOOLS_BIZ = [
  {
    name: "Invoice Generator",
    description: "Create and download professional PDF invoices for free.",
    href: "/tools/invoice-generator",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    name: "Email Signature Creator",
    description: "Design professional HTML email signatures for Gmail and Outlook.",
    href: "/tools/email-signature-creator",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    name: "QR Code Generator",
    description: "Create custom QR codes for URLs, WiFi, email, and more.",
    href: "/tools/qr-code-generator",
    icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z",
  },
  {
    name: "Profit Margin Calculator",
    description: "Calculate profit margins, markups, and break-even points.",
    href: "/tools/profit-margin-calculator",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const INDUSTRIES = [
  "Technology",
  "Food & Beverage",
  "Health & Wellness",
  "Fashion",
  "Finance",
  "Creative",
  "Education",
  "Other",
] as const;

const STYLES = [
  "Modern",
  "Classic",
  "Playful",
  "Professional",
  "Bold",
  "Minimal",
] as const;

const LENGTH_PREFS = [
  { label: "Short (1 word)", value: "short" },
  { label: "Medium (1-2 words)", value: "medium" },
  { label: "Long (2-3 words)", value: "long" },
] as const;

type LengthPref = (typeof LENGTH_PREFS)[number]["value"];

/* ---- word banks ---- */

const SUFFIXES: Record<string, string[]> = {
  Modern: ["io", "ly", "ify", "fy", "ai", "up", "go", "os"],
  Classic: ["& Co", "Group", "Partners", "Associates", "& Sons", "Holdings"],
  Playful: ["Buddy", "Pop", "Dash", "Snap", "Zing", "Boom", "Pixel"],
  Professional: ["Solutions", "Systems", "Dynamics", "Global", "Pro", "Corp"],
  Bold: ["Force", "Strike", "Prime", "Alpha", "Titan", "Apex", "Edge"],
  Minimal: ["", ".", "one", "x", "o"],
};

const PREFIXES: Record<string, string[]> = {
  Technology: ["Tech", "Cyber", "Digi", "Net", "Code", "Data", "Byte", "Cloud"],
  "Food & Beverage": ["Fresh", "Savory", "Golden", "Harvest", "Taste", "Nourish"],
  "Health & Wellness": ["Vita", "Zen", "Pure", "Glow", "Thrive", "Bloom", "Well"],
  Fashion: ["Luxe", "Vogue", "Thread", "Stitch", "Velvet", "Aura", "Noir"],
  Finance: ["Capital", "Vault", "Mint", "Trust", "Pinnacle", "Summit", "Ledger"],
  Creative: ["Muse", "Canvas", "Prism", "Ink", "Spark", "Dream", "Vision"],
  Education: ["Scholar", "Learn", "Academy", "Bright", "Sage", "Mind", "Quest"],
  Other: ["Nova", "Atlas", "Core", "Element", "Nexus", "Origin", "Pulse"],
};

const GENERIC_SUFFIXES = [
  "Hub",
  "Lab",
  "Co",
  "Studio",
  "Works",
  "Forge",
  "Stack",
  "Base",
  "Hive",
  "Nest",
  "Collective",
  "Craft",
  "Zone",
  "Spot",
  "Way",
];

const SYLLABLES = [
  "va","lo","ri","nu","ze","ka","mo","ti","pe","lu","ra","si","do","ne",
  "ba","fi","ko","mi","ta","vo","li","re","su","da","no","pi","gu","be",
  "xa","zo","vi","la","ro","se","tu","ma","ni","po","fe","ku","ja","wi",
];

/* ------------------------------------------------------------------ */
/*  Generator helpers                                                  */
/* ------------------------------------------------------------------ */

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function portmanteau(a: string, b: string): string {
  const cutA = Math.max(2, Math.ceil(a.length * 0.6));
  const cutB = Math.max(2, Math.floor(b.length * 0.5));
  return capitalize(a.slice(0, cutA).toLowerCase() + b.slice(b.length - cutB).toLowerCase());
}

function madeUpWord(syllableCount: number): string {
  let word = "";
  for (let i = 0; i < syllableCount; i++) {
    word += pick(SYLLABLES);
  }
  return capitalize(word);
}

function generateNames(
  keywords: string[],
  industry: string,
  style: string,
  lengthPref: LengthPref
): string[] {
  const names = new Set<string>();
  const styleSuffixes = SUFFIXES[style] || SUFFIXES["Modern"];
  const industryPrefixes = PREFIXES[industry] || PREFIXES["Other"];

  const maxWords = lengthPref === "short" ? 1 : lengthPref === "medium" ? 2 : 3;

  const cleaned = keywords.map((k) => k.trim()).filter(Boolean);
  if (cleaned.length === 0) cleaned.push("biz");

  // Strategy 1: Keyword + generic suffix
  for (const kw of cleaned) {
    for (const suf of GENERIC_SUFFIXES) {
      const name = maxWords === 1
        ? capitalize(kw) + suf
        : capitalize(kw) + " " + suf;
      names.add(name.trim());
    }
  }

  // Strategy 2: Keyword + style suffix
  for (const kw of cleaned) {
    for (const suf of styleSuffixes) {
      const combined = suf
        ? maxWords === 1
          ? capitalize(kw) + capitalize(suf)
          : capitalize(kw) + " " + capitalize(suf)
        : capitalize(kw);
      names.add(combined.trim());
    }
  }

  // Strategy 3: Industry prefix + keyword
  for (const kw of cleaned) {
    for (const pre of industryPrefixes) {
      const name = maxWords === 1
        ? capitalize(pre) + capitalize(kw)
        : capitalize(pre) + " " + capitalize(kw);
      names.add(name.trim());
    }
  }

  // Strategy 4: Portmanteau blends
  for (let i = 0; i < cleaned.length; i++) {
    for (let j = 0; j < cleaned.length; j++) {
      if (i !== j) {
        names.add(portmanteau(cleaned[i], cleaned[j]));
      }
    }
    // Blend keyword with industry prefix
    for (const pre of industryPrefixes) {
      names.add(portmanteau(cleaned[i], pre));
      names.add(portmanteau(pre, cleaned[i]));
    }
  }

  // Strategy 5: Made-up words inspired by keywords
  for (let i = 0; i < 8; i++) {
    const syllCount = maxWords === 1 ? pick([2, 3]) : pick([2, 3]);
    const word = madeUpWord(syllCount);
    names.add(word);

    // Combine with a keyword
    if (maxWords >= 2 && cleaned.length > 0) {
      names.add(capitalize(pick(cleaned)) + " " + word);
    }
    if (maxWords >= 3 && cleaned.length > 0) {
      names.add(capitalize(pick(cleaned)) + " " + word + " " + capitalize(pick(GENERIC_SUFFIXES)));
    }
  }

  // Strategy 6: Two keywords combined
  if (cleaned.length >= 2) {
    for (let i = 0; i < cleaned.length; i++) {
      for (let j = i + 1; j < cleaned.length; j++) {
        if (maxWords >= 2) {
          names.add(capitalize(cleaned[i]) + " " + capitalize(cleaned[j]));
          names.add(capitalize(cleaned[j]) + " " + capitalize(cleaned[i]));
        } else {
          names.add(capitalize(cleaned[i]) + capitalize(cleaned[j]));
          names.add(capitalize(cleaned[j]) + capitalize(cleaned[i]));
        }
      }
    }
  }

  // Strategy 7: Keyword + "er" / "ity" / "ical"
  const wordEndings = ["er", "ity", "ical", "ium", "eon", "ora", "ive", "ant"];
  for (const kw of cleaned) {
    for (const ending of wordEndings) {
      names.add(capitalize(kw) + ending);
    }
  }

  // Shuffle & trim to 25
  const arr = Array.from(names)
    .filter((n) => n.length >= 3 && n.length <= 30)
    .sort(() => Math.random() - 0.5)
    .slice(0, 25);

  return arr;
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
      <span className="text-[#f0f0f5]">Business Name Generator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Name Card                                                          */
/* ------------------------------------------------------------------ */

function NameCard({
  name,
  isFav,
  onToggleFav,
}: {
  name: string;
  isFav: boolean;
  onToggleFav: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* fallback */
    }
  };

  const domainSlug = name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  return (
    <div className="group relative rounded-xl border border-[#1e1e2e] bg-[#1a1a26] p-5 hover:border-[#7c6cf0]/40 transition-all duration-200 hover:shadow-[0_0_30px_rgba(124,108,240,0.08)]">
      <h3 className="text-lg font-semibold text-white mb-4 tracking-wide">
        {name}
      </h3>

      <div className="flex items-center gap-2">
        {/* Copy */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg bg-[#12121a] border border-[#1e1e2e] px-3 py-1.5 text-xs font-medium text-[#8888a0] hover:text-white hover:border-[#7c6cf0]/50 transition-all"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-[#00e676]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Copied
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              Copy
            </>
          )}
        </button>

        {/* Check Domain */}
        <a
          href={`https://www.namecheap.com/domains/registration/results/?domain=${domainSlug}.com`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg bg-[#12121a] border border-[#1e1e2e] px-3 py-1.5 text-xs font-medium text-[#8888a0] hover:text-white hover:border-[#7c6cf0]/50 transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
          Domain
        </a>

        {/* Favorite */}
        <button
          onClick={onToggleFav}
          className={`ml-auto flex items-center justify-center w-8 h-8 rounded-lg border transition-all ${
            isFav
              ? "bg-[#7c6cf0]/20 border-[#7c6cf0]/50 text-[#7c6cf0]"
              : "bg-[#12121a] border-[#1e1e2e] text-[#8888a0] hover:text-[#7c6cf0] hover:border-[#7c6cf0]/50"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill={isFav ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function BusinessNameGeneratorPage() {
  const [keywords, setKeywords] = useState("");
  const [industry, setIndustry] = useState<string>("Technology");
  const [style, setStyle] = useState<string>("Modern");
  const [lengthPref, setLengthPref] = useState<LengthPref>("medium");
  const [names, setNames] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  const generate = useCallback(() => {
    const kws = keywords
      .split(",")
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);
    const result = generateNames(kws, industry, style, lengthPref);
    setNames(result);
    setHasGenerated(true);
  }, [keywords, industry, style, lengthPref]);

  const generateMore = useCallback(() => {
    const kws = keywords
      .split(",")
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);
    const result = generateNames(kws, industry, style, lengthPref);
    setNames((prev) => {
      const combined = [...prev, ...result];
      // deduplicate
      return Array.from(new Set(combined));
    });
  }, [keywords, industry, style, lengthPref]);

  const toggleFav = (name: string) => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const selectClasses =
    "w-full rounded-xl border border-[#1e1e2e] bg-[#12121a] px-4 py-3 text-sm text-white placeholder-[#8888a0] focus:outline-none focus:border-[#7c6cf0] transition-colors appearance-none cursor-pointer";
  const labelClasses = "block text-sm font-medium text-[#c0c0d0] mb-2";

  return (
    <>
      <head>
        <title>Free Business Name Generator — PrestoKit</title>
        <meta
          name="description"
          content="Generate creative business name ideas for free. Enter keywords, pick your industry and style, and get dozens of name suggestions instantly."
        />
      </head>

      <main className="min-h-screen bg-[#0a0a0f] text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              <span className="text-gradient-primary">Business Name</span>{" "}
              Generator
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Enter a few keywords about your business and we will generate
              creative name ideas you can use. Completely free, no sign-up
              required.
            </p>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Keywords */}
              <div className="sm:col-span-2">
                <label className={labelClasses}>
                  Keywords{" "}
                  <span className="text-[#8888a0] font-normal">
                    (comma-separated)
                  </span>
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder='e.g. "tech, fast, cloud"'
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
              </div>

              {/* Industry */}
              <div>
                <label className={labelClasses}>Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className={selectClasses}
                >
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              {/* Style */}
              <div>
                <label className={labelClasses}>Style Preference</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className={selectClasses}
                >
                  {STYLES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Length */}
              <div className="sm:col-span-2">
                <label className={labelClasses}>Name Length Preference</label>
                <div className="flex flex-wrap gap-3">
                  {LENGTH_PREFS.map((lp) => (
                    <button
                      key={lp.value}
                      onClick={() => setLengthPref(lp.value)}
                      className={`rounded-xl border px-5 py-2.5 text-sm font-medium transition-all ${
                        lengthPref === lp.value
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/15 text-[#9d90f5]"
                          : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40 hover:text-white"
                      }`}
                    >
                      {lp.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generate}
              disabled={!keywords.trim()}
              className="w-full sm:w-auto rounded-xl bg-[#00e676] hover:bg-[#00c853] disabled:opacity-40 disabled:cursor-not-allowed px-8 py-3 text-sm font-semibold text-[#0a0a0f] transition-all shadow-[0_0_20px_rgba(0,230,118,0.2)] hover:shadow-[0_0_30px_rgba(0,230,118,0.35)]"
            >
              Generate Names
            </button>
          </div>

          {/* Results */}
          {hasGenerated && names.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  Generated Names{" "}
                  <span className="text-[#8888a0] text-sm font-normal">
                    ({names.length} ideas)
                  </span>
                </h2>
                <button
                  onClick={generateMore}
                  className="rounded-xl border border-[#7c6cf0]/50 bg-[#7c6cf0]/10 px-5 py-2 text-sm font-medium text-[#9d90f5] hover:bg-[#7c6cf0]/20 transition-all"
                >
                  + Generate More
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {names.map((name) => (
                  <NameCard
                    key={name}
                    name={name}
                    isFav={favorites.includes(name)}
                    onToggleFav={() => toggleFav(name)}
                  />
                ))}
              </div>
            </section>
          )}

          {hasGenerated && names.length === 0 && (
            <div className="text-center py-16 text-[#8888a0]">
              <p className="text-lg mb-2">No names generated.</p>
              <p className="text-sm">
                Try different keywords or settings.
              </p>
            </div>
          )}

          {/* Favorites */}
          {favorites.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#7c6cf0]" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0}><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                Your Favorites{" "}
                <span className="text-[#8888a0] text-sm font-normal">
                  ({favorites.length})
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.map((name) => (
                  <NameCard
                    key={`fav-${name}`}
                    name={name}
                    isFav={true}
                    onToggleFav={() => toggleFav(name)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ============================== HOW IT WORKS ============================== */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-center mb-2">How It Works</h2>
          <p className="text-[#8888a0] text-center mb-12 max-w-xl mx-auto">
            Find the perfect business name in three simple steps.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Enter Keywords",
                desc: "Type in words that describe your business, product, or brand personality. Separate multiple keywords with commas for more diverse results.",
              },
              {
                step: "2",
                title: "Set Preferences",
                desc: "Choose your industry, preferred naming style (Modern, Classic, Playful, etc.), and desired name length to fine-tune the generated names.",
              },
              {
                step: "3",
                title: "Pick Your Favorite",
                desc: "Browse the generated names, save your favorites with the heart icon, check domain availability, and copy the winner to your clipboard.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-[#1e1e2e] bg-[#1a1a26] p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#7c6cf0]/15 text-[#7c6cf0] text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-[#8888a0] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================== FAQ SECTION ============================== */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-center mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-[#8888a0] text-center mb-10 max-w-xl mx-auto">
            Everything you need to know about naming your business.
          </p>
          <div className="space-y-3">
            {BIZ_NAME_FAQS.map((faq, i) => (
              <BizFAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        {/* ============================== RELATED TOOLS ============================== */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 border-t border-[#1e1e2e]">
          <h2 className="text-2xl font-bold text-center mb-2">
            Related Tools
          </h2>
          <p className="text-[#8888a0] text-center mb-10">
            More free business tools to help you get things done.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RELATED_TOOLS_BIZ.map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                className="group rounded-2xl border border-[#1e1e2e] bg-[#1a1a26] p-5 hover:border-[#7c6cf0]/40 transition-all duration-200 hover:shadow-[0_0_30px_rgba(124,108,240,0.08)]"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c6cf0]/10">
                  <svg
                    className="h-5 w-5 text-[#7c6cf0]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={tool.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-[#7c6cf0] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-[#555566] mt-1">{tool.description}</p>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* ============================== FAQ SCHEMA (JSON-LD) ============================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: BIZ_NAME_FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Accordion Item                                                 */
/* ------------------------------------------------------------------ */

function BizFAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-[#1e1e2e] bg-[#1a1a26] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[#1e1e2e] transition-colors"
      >
        <span className="text-sm font-medium text-[#c0c0d0] pr-4">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-[#555566] flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-[#8888a0] leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

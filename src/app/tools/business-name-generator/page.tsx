"use client";

import { useState, useCallback } from "react";

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
      </main>
    </>
  );
}

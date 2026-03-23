"use client";

import { useState, useCallback } from "react";

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
      <span className="text-[#f0f0f5]">Hashtag Generator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Hashtag Database                                                   */
/* ------------------------------------------------------------------ */

type Platform = "instagram" | "tiktok" | "twitter";

const HASHTAG_DB: Record<string, string[]> = {
  // General / Lifestyle
  lifestyle: ["lifestyle", "dailylife", "livingmybest", "goodvibes", "vibes", "mood", "aesthetic", "inspo", "lifestyleblogger", "lifegoals", "positivevibes", "mindset", "selfcare", "wellbeing", "lifeisgood"],
  fitness: ["fitness", "fitnessmotivation", "gym", "workout", "fitfam", "gymlife", "training", "fit", "exercise", "healthylifestyle", "gains", "bodybuilding", "fitnessjourney", "personaltrainer", "homeworkout"],
  food: ["food", "foodie", "foodporn", "instafood", "foodphotography", "cooking", "recipe", "homemade", "foodstagram", "yummy", "delicious", "healthyfood", "foodblogger", "chef", "easyrecipe"],
  travel: ["travel", "travelgram", "wanderlust", "vacation", "explore", "adventure", "travelphotography", "instatravel", "traveltheworld", "roadtrip", "bucketlist", "travelblogger", "tourism", "getaway", "backpacking"],
  fashion: ["fashion", "style", "ootd", "fashionblogger", "outfitoftheday", "streetstyle", "fashionista", "instafashion", "lookoftheday", "trendy", "fashionstyle", "outfitinspo", "styleinspo", "whatiwore", "fashiontrends"],
  photography: ["photography", "photooftheday", "photo", "photographer", "naturephotography", "streetphotography", "portrait", "landscape", "picoftheday", "instagood", "photographylovers", "canon", "nikon", "shotoniphone", "goldenhour"],
  business: ["business", "entrepreneur", "smallbusiness", "startup", "marketing", "success", "branding", "hustle", "businessowner", "digitalmarketing", "socialmediamarketing", "growthmindset", "businesstips", "sidehustle", "ecommerce"],
  music: ["music", "musician", "newmusic", "producer", "dj", "hiphop", "rap", "edm", "singer", "songwriter", "beats", "musicproducer", "spotifyplaylist", "livemusic", "musicislife"],
  art: ["art", "artist", "artwork", "drawing", "painting", "illustration", "digitalart", "artistsoninstagram", "creative", "sketch", "design", "contemporaryart", "artoftheday", "artgallery", "fanart"],
  tech: ["technology", "tech", "coding", "programming", "developer", "webdevelopment", "software", "ai", "machinelearning", "startup", "innovation", "javascript", "python", "techlife", "devlife"],
  beauty: ["beauty", "makeup", "skincare", "beautyblogger", "cosmetics", "beautytips", "glam", "makeupartist", "mua", "skincareroutine", "beautycare", "naturalskincare", "beautyhacks", "lips", "eyes"],
  nature: ["nature", "naturephotography", "landscape", "outdoors", "wildlife", "hiking", "mountains", "sunset", "ocean", "forest", "earth", "naturelovers", "getoutside", "camping", "wilderness"],
  pet: ["pet", "dog", "cat", "dogsofinstagram", "catsofinstagram", "puppy", "kitten", "petsofinstagram", "doglover", "catlover", "cute", "adorable", "petlife", "furbaby", "rescue"],
  motivation: ["motivation", "inspiration", "motivationalquotes", "mindset", "success", "goals", "grind", "hustle", "nevergiveup", "believe", "positivity", "growth", "discipline", "ambition", "focused"],
  realestate: ["realestate", "realtor", "property", "homeforsale", "dreamhome", "househunting", "listing", "homebuyer", "investment", "luxuryhomes", "openhouse", "firsttimebuyer", "sold", "realestateagent", "mortgage"],
};

const PLATFORM_LIMITS: Record<Platform, number> = {
  instagram: 30,
  tiktok: 15,
  twitter: 10,
};

const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  twitter: "Twitter / X",
};

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "How many hashtags should I use on Instagram?",
    answer:
      "Instagram allows up to 30 hashtags per post. However, studies suggest 5-15 well-chosen hashtags often perform better than stuffing all 30. Focus on a mix of popular, niche, and branded hashtags relevant to your content for maximum reach.",
  },
  {
    question: "What are the best hashtags for TikTok?",
    answer:
      "The best TikTok hashtags are a mix of trending and niche-specific tags. Use 3-5 highly relevant hashtags plus 1-2 trending ones. TikTok's algorithm favors content relevance, so overly generic hashtags like #fyp may not help as much as topic-specific ones.",
  },
  {
    question: "Do hashtags still work on Twitter/X?",
    answer:
      "Yes, hashtags still help with discoverability on Twitter/X, but use them sparingly. Research shows 1-2 hashtags per tweet is optimal. Too many hashtags can actually decrease engagement. Focus on trending and highly specific hashtags.",
  },
  {
    question: "Should I use the same hashtags on every post?",
    answer:
      "No, using the exact same set of hashtags repeatedly can signal spam to algorithms, especially on Instagram. Rotate your hashtags and create different sets for different content themes. This generator helps you create varied sets each time.",
  },
  {
    question: "What is the difference between niche and popular hashtags?",
    answer:
      "Popular hashtags (millions of posts) give broad exposure but your content gets buried quickly. Niche hashtags (thousands of posts) have less competition, so your content stays visible longer. The best strategy is mixing both: a few popular hashtags for reach and several niche hashtags for sustained visibility.",
  },
  {
    question: "How do I find trending hashtags?",
    answer:
      "Check each platform's explore or trending section for current trends. Use tools like this hashtag generator to get topic-relevant suggestions. Also look at what hashtags top creators in your niche are using, and monitor industry events or holidays for timely hashtags.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HashtagGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [generated, setGenerated] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateHashtags = useCallback(() => {
    const input = topic.toLowerCase().trim();
    if (!input) return;

    const limit = PLATFORM_LIMITS[platform];
    const matchedTags: string[] = [];

    // Find matching categories
    for (const [category, tags] of Object.entries(HASHTAG_DB)) {
      if (input.includes(category) || category.includes(input)) {
        matchedTags.push(...tags);
      }
    }

    // If no exact match, find partial matches
    if (matchedTags.length === 0) {
      const words = input.split(/\s+/);
      for (const word of words) {
        for (const [category, tags] of Object.entries(HASHTAG_DB)) {
          if (category.includes(word) || word.includes(category)) {
            matchedTags.push(...tags);
          }
        }
      }
    }

    // Fallback: generate from input words
    if (matchedTags.length === 0) {
      const words = input.split(/\s+/).filter(Boolean);
      matchedTags.push(
        ...words,
        ...words.map((w) => w + "life"),
        ...words.map((w) => w + "lover"),
        ...words.map((w) => w + "daily"),
        ...words.map((w) => "love" + w),
        ...words.map((w) => w + "community"),
        ...words.map((w) => w + "vibes"),
        ...words.map((w) => w + "tips"),
        ...words.map((w) => w + "inspo"),
        ...words.map((w) => w + "goals"),
        "trending", "viral", "explore", "followme", "instagood"
      );
    }

    // Deduplicate, shuffle, limit
    const unique = Array.from(new Set(matchedTags.map((t) => t.replace(/[^a-zA-Z0-9]/g, ""))));
    const shuffled = unique.sort(() => Math.random() - 0.5);
    setGenerated(shuffled.slice(0, limit));
    setCopied(false);
  }, [topic, platform]);

  const copyAll = useCallback(() => {
    const text = generated.map((t) => "#" + t).join(" ");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generated]);

  const removeTag = (tag: string) => {
    setGenerated((prev) => prev.filter((t) => t !== tag));
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Hashtag Generator",
    description:
      "Generate trending hashtags for Instagram, TikTok, and Twitter by topic. Get relevant, high-engagement hashtags instantly.",
    url: "https://prestokit.com/tools/hashtag-generator",
    applicationCategory: "SocialNetworkingApplication",
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
              Hashtag{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Generate relevant, high-engagement hashtags for Instagram, TikTok,
              and Twitter. Enter a topic and get ready-to-copy hashtag sets
              instantly.
            </p>
          </div>

          {/* Platform Selector */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {(["instagram", "tiktok", "twitter"] as Platform[]).map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`rounded-xl border py-4 px-4 text-center transition-all ${
                  platform === p
                    ? "border-[#7c6cf0] bg-[#7c6cf0]/10"
                    : "border-[#1e1e2e] bg-[#12121a]/60 hover:border-[#7c6cf0]/40"
                }`}
              >
                <div className={`text-sm font-semibold ${platform === p ? "text-[#9d90f5]" : "text-[#c0c0d0]"}`}>
                  {PLATFORM_LABELS[p]}
                </div>
                <div className="text-xs text-[#8888a0] mt-1">
                  Up to {PLATFORM_LIMITS[p]} hashtags
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                Enter a Topic or Keyword
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && generateHashtags()}
                placeholder="e.g. fitness, food, travel, photography..."
                className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 px-4 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors mb-4"
              />

              {/* Quick Topics */}
              <div className="mb-5">
                <div className="text-xs text-[#8888a0] mb-2">Quick topics:</div>
                <div className="flex flex-wrap gap-2">
                  {["fitness", "food", "travel", "fashion", "business", "music", "photography", "tech", "beauty", "nature", "motivation", "art"].map((t) => (
                    <button
                      key={t}
                      onClick={() => { setTopic(t); }}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                        topic === t
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                          : "border-[#1e1e2e] text-[#8888a0] hover:border-[#7c6cf0]/40"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateHashtags}
                disabled={!topic.trim()}
                className="w-full rounded-xl bg-[#7c6cf0] py-3.5 text-base font-semibold text-white transition-all hover:bg-[#6b5ce0] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Generate Hashtags
              </button>
            </div>

            {/* Results */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-[#c0c0d0]">
                  Generated Hashtags ({generated.length}/{PLATFORM_LIMITS[platform]})
                </h2>
                {generated.length > 0 && (
                  <button
                    onClick={copyAll}
                    className="rounded-lg border border-[#7c6cf0]/40 bg-[#7c6cf0]/10 px-4 py-1.5 text-xs font-semibold text-[#9d90f5] hover:bg-[#7c6cf0]/20 transition-all"
                  >
                    {copied ? "Copied!" : "Copy All"}
                  </button>
                )}
              </div>

              {generated.length === 0 ? (
                <div className="text-center py-12 text-[#555566]">
                  <div className="text-4xl mb-3">#</div>
                  <p className="text-sm">Enter a topic and click generate to get hashtags</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {generated.map((tag) => (
                    <span
                      key={tag}
                      className="group inline-flex items-center gap-1 rounded-lg border border-[#7c6cf0]/20 bg-[#7c6cf0]/5 px-3 py-2 text-sm text-[#9d90f5] hover:bg-[#7c6cf0]/10 transition-all cursor-default"
                    >
                      #{tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-[#555566] hover:text-[#ff5252] transition-colors opacity-0 group-hover:opacity-100"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
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
                  title: "Pick a Platform",
                  description:
                    "Select Instagram, TikTok, or Twitter to get the right number of hashtags optimized for that platform's algorithm.",
                },
                {
                  step: "2",
                  title: "Enter Your Topic",
                  description:
                    "Type a topic, keyword, or niche. Use the quick-topic buttons for instant inspiration or type your own.",
                },
                {
                  step: "3",
                  title: "Copy & Post",
                  description:
                    "Click 'Copy All' to copy your hashtag set to the clipboard. Remove any you don't want, then paste into your post.",
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
                  title: "Character Counter",
                  description:
                    "Count characters with limits for Twitter, Instagram, YouTube, and more.",
                  href: "/tools/character-counter",
                },
                {
                  title: "Word Counter",
                  description:
                    "Count words, characters, sentences, and get reading time estimates.",
                  href: "/tools/word-counter",
                },
                {
                  title: "Text Case Converter",
                  description:
                    "Convert text between UPPER, lower, Title, camelCase, and more.",
                  href: "/tools/text-case-converter",
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

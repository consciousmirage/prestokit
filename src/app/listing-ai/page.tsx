"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ─── Constants ─── */
const FREE_LIMIT = 3;
const STORAGE_KEY = "listingai_uses";
const SESSION_KEY = "listingai_session";

const PROPERTY_TYPES = [
  "Single Family Home",
  "Condo / Townhome",
  "Luxury Estate",
  "Multi-Family",
  "New Construction",
  "Land / Lot",
  "Commercial Property",
];

const TONES = [
  "Professional & Traditional",
  "Warm & Inviting",
  "Luxury & Upscale",
  "Modern & Minimalist",
  "Conversational & Friendly",
];

const FEATURE_OPTIONS = [
  "Updated Kitchen",
  "Renovated Bathrooms",
  "Hardwood Floors",
  "Primary Suite",
  "Walk-in Closet(s)",
  "Open Floor Plan",
  "Vaulted Ceilings",
  "Fireplace",
  "Smart Home Features",
  "New Roof",
  "New HVAC",
  "In-ground Pool",
  "Spa / Hot Tub",
  "2+ Car Garage",
  "Finished Basement",
  "Home Office",
  "Gourmet Kitchen",
  "Wine Cellar",
  "Outdoor Kitchen / Patio",
  "Scenic Views",
  "Cul-de-sac / Corner Lot",
  "Solar Panels",
  "EV Charger",
  "In-law Suite",
];

/* ─── Types ─── */
interface GeneratedListing {
  description: string;
  headline: string;
  social: string;
}

/* ─── Copy Button ─── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all"
      style={{ background: copied ? "#10b98122" : "#ffffff12", color: copied ? "#10b981" : "#a0a0b8" }}
    >
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
          Copied!
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
          Copy
        </>
      )}
    </button>
  );
}

/* ─── Paywall Modal ─── */
function PaywallModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/listing-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)" }}>
      <div className="relative w-full max-w-md rounded-2xl border p-8" style={{ background: "#0f0f1a", borderColor: "#10b98130" }}>
        <button onClick={onClose} className="absolute right-4 top-4 text-[#606078] hover:text-white transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>

        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "#10b98120" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-white">You used your 3 free listings</h2>
        <p className="mb-6 text-sm leading-relaxed" style={{ color: "#8888a8" }}>
          Upgrade to <strong className="text-white">ListingAI Pro</strong> for unlimited listings, headlines & social captions. Cancel anytime.
        </p>

        <div className="mb-6 rounded-xl border p-4" style={{ background: "#10b98108", borderColor: "#10b98122" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">ListingAI Pro</p>
              <p className="text-xs" style={{ color: "#8888a8" }}>Unlimited listings · Cancel anytime</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">$39</p>
              <p className="text-xs" style={{ color: "#8888a8" }}>/month</p>
            </div>
          </div>
        </div>

        <ul className="mb-6 space-y-2">
          {[
            "Unlimited MLS descriptions",
            "Unlimited headlines & taglines",
            "Unlimited social media captions",
            "All property types & tones",
            "Cancel anytime, no questions",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "#c0c0d8" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
              {f}
            </li>
          ))}
        </ul>

        <input
          type="email"
          placeholder="Your email (for receipt)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 w-full rounded-lg border px-4 py-2.5 text-sm text-white outline-none transition-colors"
          style={{ background: "#ffffff0a", borderColor: "#ffffff18", }}
          onFocus={(e) => (e.target.style.borderColor = "#10b981")}
          onBlur={(e) => (e.target.style.borderColor = "#ffffff18")}
        />

        <button
          onClick={handleUpgrade}
          disabled={loading}
          className="w-full rounded-xl py-3.5 text-base font-semibold text-white transition-all"
          style={{ background: loading ? "#0d9368" : "linear-gradient(135deg, #10b981, #059669)" }}
        >
          {loading ? "Loading…" : "Upgrade to Pro — $39/mo"}
        </button>

        <p className="mt-3 text-center text-xs" style={{ color: "#606078" }}>
          Secured by Stripe · Cancel anytime from your email
        </p>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function ListingAIPage() {
  const toolRef = useRef<HTMLDivElement>(null);

  // Form state
  const [propertyType, setPropertyType] = useState("Single Family Home");
  const [beds, setBeds] = useState("3");
  const [baths, setBaths] = useState("2");
  const [sqft, setSqft] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [customFeatures, setCustomFeatures] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [tone, setTone] = useState("Professional & Traditional");

  // App state
  const [result, setResult] = useState<GeneratedListing | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usesLeft, setUsesLeft] = useState(FREE_LIMIT);
  const [isPaid, setIsPaid] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const uses = parseInt(localStorage.getItem(STORAGE_KEY) || "0");
    setUsesLeft(Math.max(0, FREE_LIMIT - uses));
    const sid = localStorage.getItem(SESSION_KEY) || "";
    setSessionId(sid);
    if (sid) setIsPaid(true);
  }, []);

  const toggleFeature = (f: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const handleGenerate = async () => {
    if (!isPaid && usesLeft <= 0) {
      setShowPaywall(true);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/generate-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyType,
          beds,
          baths,
          sqft,
          features: selectedFeatures,
          customFeatures,
          neighborhood,
          tone,
          sessionId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Generation failed. Please try again.");
        return;
      }

      setResult(data);

      if (!isPaid) {
        const uses = parseInt(localStorage.getItem(STORAGE_KEY) || "0") + 1;
        localStorage.setItem(STORAGE_KEY, uses.toString());
        setUsesLeft(Math.max(0, FREE_LIMIT - uses));
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const tealGradient = "linear-gradient(135deg, #10b981, #059669)";

  return (
    <div className="min-h-screen" style={{ background: "#0a0a14" }}>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden px-6 py-20 text-center">
        {/* Glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, #10b98118 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
            style={{ background: "#10b98115", color: "#10b981", border: "1px solid #10b98130" }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="#10b981"><circle cx="5" cy="5" r="5" /></svg>
            Built for Real Estate Agents
          </div>

          <h1 className="mb-4 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
            Write MLS Listings
            <br />
            <span style={{ background: tealGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              in 30 Seconds
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed" style={{ color: "#9090b0" }}>
            Enter your property details. Get a professional MLS description, a compelling headline,
            and a social media caption — instantly. No prompts to write. No ChatGPT fumbling.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => toolRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-xl px-8 py-3.5 text-base font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: tealGradient }}
            >
              Try Free — 3 Listings
            </button>
            <div className="text-sm" style={{ color: "#606078" }}>
              No signup · No credit card · Instant results
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {[
              { n: "30s", label: "Average generation time" },
              { n: "3", label: "Free listings to try" },
              { n: "$0", label: "To get started today" },
            ].map(({ n, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-white">{n}</div>
                <div className="text-xs" style={{ color: "#606078" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tool ─── */}
      <section ref={toolRef} className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2">

            {/* ─── Form Panel ─── */}
            <div className="rounded-2xl border p-6" style={{ background: "#0f0f1a", borderColor: "#1e1e2e" }}>
              <h2 className="mb-6 text-xl font-semibold text-white">Property Details</h2>

              {/* Property Type */}
              <div className="mb-5">
                <label className="mb-1.5 block text-sm font-medium" style={{ color: "#a0a0b8" }}>Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full rounded-lg border px-4 py-2.5 text-sm text-white outline-none"
                  style={{ background: "#ffffff08", borderColor: "#ffffff15" }}
                >
                  {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Beds / Baths / Sqft */}
              <div className="mb-5 grid grid-cols-3 gap-3">
                {[
                  { label: "Bedrooms", value: beds, set: setBeds, placeholder: "3" },
                  { label: "Bathrooms", value: baths, set: setBaths, placeholder: "2" },
                  { label: "Sq Ft", value: sqft, set: setSqft, placeholder: "1,850" },
                ].map(({ label, value, set, placeholder }) => (
                  <div key={label}>
                    <label className="mb-1.5 block text-sm font-medium" style={{ color: "#a0a0b8" }}>{label}</label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => set(e.target.value)}
                      placeholder={placeholder}
                      className="w-full rounded-lg border px-3 py-2.5 text-sm text-white outline-none transition-colors"
                      style={{ background: "#ffffff08", borderColor: "#ffffff15" }}
                      onFocus={(e) => (e.target.style.borderColor = "#10b981")}
                      onBlur={(e) => (e.target.style.borderColor = "#ffffff15")}
                    />
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium" style={{ color: "#a0a0b8" }}>
                  Key Features <span style={{ color: "#606078" }}>(select all that apply)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {FEATURE_OPTIONS.map((f) => {
                    const active = selectedFeatures.includes(f);
                    return (
                      <button
                        key={f}
                        onClick={() => toggleFeature(f)}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
                        style={{
                          background: active ? "#10b98120" : "#ffffff08",
                          color: active ? "#10b981" : "#8888a8",
                          border: `1px solid ${active ? "#10b98140" : "#ffffff10"}`,
                        }}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>
                <textarea
                  value={customFeatures}
                  onChange={(e) => setCustomFeatures(e.target.value)}
                  placeholder="Any other features? (e.g., chef's kitchen with Viking appliances, wraparound deck)"
                  rows={2}
                  className="mt-3 w-full rounded-lg border px-4 py-2.5 text-sm text-white outline-none transition-colors resize-none"
                  style={{ background: "#ffffff08", borderColor: "#ffffff15" }}
                  onFocus={(e) => (e.target.style.borderColor = "#10b981")}
                  onBlur={(e) => (e.target.style.borderColor = "#ffffff15")}
                />
              </div>

              {/* Neighborhood */}
              <div className="mb-5">
                <label className="mb-1.5 block text-sm font-medium" style={{ color: "#a0a0b8" }}>
                  Neighborhood / Location Highlights <span style={{ color: "#606078" }}>(optional)</span>
                </label>
                <textarea
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="e.g., Top-rated school district, walkable to downtown, backs to nature preserve, cul-de-sac in gated community"
                  rows={2}
                  className="w-full rounded-lg border px-4 py-2.5 text-sm text-white outline-none transition-colors resize-none"
                  style={{ background: "#ffffff08", borderColor: "#ffffff15" }}
                  onFocus={(e) => (e.target.style.borderColor = "#10b981")}
                  onBlur={(e) => (e.target.style.borderColor = "#ffffff15")}
                />
              </div>

              {/* Tone */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium" style={{ color: "#a0a0b8" }}>Writing Tone</label>
                <div className="flex flex-wrap gap-2">
                  {TONES.map((t) => {
                    const active = tone === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
                        style={{
                          background: active ? "#10b98120" : "#ffffff08",
                          color: active ? "#10b981" : "#8888a8",
                          border: `1px solid ${active ? "#10b98140" : "#ffffff10"}`,
                        }}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full rounded-xl py-4 text-base font-semibold text-white transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
                style={{ background: loading ? "#0d9368" : tealGradient }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25" /><path d="M21 12a9 9 0 01-9-9" />
                    </svg>
                    Generating…
                  </span>
                ) : (
                  `Generate Listing${!isPaid ? ` — ${usesLeft} free ${usesLeft === 1 ? "use" : "uses"} left` : ""}`
                )}
              </button>

              {error && (
                <p className="mt-3 text-sm text-red-400">{error}</p>
              )}
            </div>

            {/* ─── Output Panel ─── */}
            <div className="flex flex-col gap-4">
              {!result ? (
                <div
                  className="flex flex-1 flex-col items-center justify-center rounded-2xl border p-12 text-center"
                  style={{ background: "#0f0f1a", borderColor: "#1e1e2e", minHeight: "400px" }}
                >
                  <div
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{ background: "#10b98112" }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-white">Your listing will appear here</p>
                  <p className="mt-2 max-w-xs text-sm" style={{ color: "#606078" }}>
                    Fill in your property details and click Generate
                  </p>
                </div>
              ) : (
                <>
                  {/* MLS Description */}
                  <div className="rounded-2xl border p-5" style={{ background: "#0f0f1a", borderColor: "#1e1e2e" }}>
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ background: "#10b981" }} />
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#10b981" }}>MLS Description</span>
                      </div>
                      <CopyButton text={result.description} />
                    </div>
                    <p className="text-sm leading-relaxed text-white">{result.description}</p>
                  </div>

                  {/* Headline */}
                  {result.headline && (
                    <div className="rounded-2xl border p-5" style={{ background: "#0f0f1a", borderColor: "#1e1e2e" }}>
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full" style={{ background: "#f59e0b" }} />
                          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#f59e0b" }}>Headline / Tagline</span>
                        </div>
                        <CopyButton text={result.headline} />
                      </div>
                      <p className="text-base font-semibold text-white">{result.headline}</p>
                    </div>
                  )}

                  {/* Social Caption */}
                  {result.social && (
                    <div className="rounded-2xl border p-5" style={{ background: "#0f0f1a", borderColor: "#1e1e2e" }}>
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full" style={{ background: "#a78bfa" }} />
                          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#a78bfa" }}>Social Media Caption</span>
                        </div>
                        <CopyButton text={result.social} />
                      </div>
                      <p className="text-sm leading-relaxed text-white whitespace-pre-wrap">{result.social}</p>
                    </div>
                  )}

                  {/* Generate Again */}
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="rounded-xl border py-3 text-sm font-medium transition-all hover:border-[#10b981] hover:text-[#10b981]"
                    style={{ borderColor: "#ffffff15", color: "#8888a8" }}
                  >
                    Regenerate with different wording
                  </button>
                </>
              )}

              {/* Upgrade CTA (if free and uses remaining < 2) */}
              {!isPaid && usesLeft <= 1 && (
                <div
                  className="rounded-2xl border p-5 text-center"
                  style={{ background: "#10b98108", borderColor: "#10b98130" }}
                >
                  <p className="mb-3 text-sm font-medium text-white">
                    {usesLeft === 0 ? "You've used all 3 free listings." : `Only ${usesLeft} free listing left.`}
                  </p>
                  <button
                    onClick={() => setShowPaywall(true)}
                    className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: tealGradient }}
                  >
                    Upgrade to Pro — $39/mo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="border-t px-6 py-20" style={{ borderColor: "#1e1e2e" }}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">How it works</h2>
          <p className="mb-12 text-base" style={{ color: "#8888a8" }}>
            From blank page to polished listing in under a minute.
          </p>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { n: "1", title: "Enter property details", desc: "Type in beds, baths, sqft, and select the features that make this property special." },
              { n: "2", title: "Choose your tone", desc: "Professional, luxury, warm — pick the writing style that matches the property and your brand." },
              { n: "3", title: "Copy & publish", desc: "Instantly get your MLS description, headline, and social caption. Copy with one click." },
            ].map(({ n, title, desc }) => (
              <div key={n} className="rounded-2xl border p-6 text-left" style={{ background: "#0f0f1a", borderColor: "#1e1e2e" }}>
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
                  style={{ background: "#10b98120", color: "#10b981" }}
                >
                  {n}
                </div>
                <h3 className="mb-2 font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7070a0" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section className="border-t px-6 py-20" style={{ borderColor: "#1e1e2e" }}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Simple pricing</h2>
          <p className="mb-12" style={{ color: "#8888a8" }}>Start free. Upgrade when you're hooked.</p>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Free */}
            <div className="rounded-2xl border p-8 text-left" style={{ background: "#0f0f1a", borderColor: "#1e1e2e" }}>
              <p className="mb-1 text-sm font-medium" style={{ color: "#8888a8" }}>Free</p>
              <p className="mb-6 text-4xl font-bold text-white">$0</p>
              <ul className="space-y-3">
                {["3 listing generations", "All property types", "All tone styles", "MLS description + headline + social"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "#c0c0d8" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => toolRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="mt-8 w-full rounded-xl border py-3 text-sm font-medium transition-all hover:border-[#10b981] hover:text-[#10b981]"
                style={{ borderColor: "#ffffff15", color: "#8888a8" }}
              >
                Start Free
              </button>
            </div>

            {/* Pro */}
            <div className="relative rounded-2xl border p-8 text-left" style={{ background: "#10b98108", borderColor: "#10b98140" }}>
              <div
                className="absolute -top-3 right-6 rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ background: tealGradient }}
              >
                Most Popular
              </div>
              <p className="mb-1 text-sm font-medium" style={{ color: "#10b981" }}>Pro</p>
              <p className="mb-1 text-4xl font-bold text-white">$39<span className="text-lg font-normal" style={{ color: "#8888a8" }}>/mo</span></p>
              <p className="mb-6 text-xs" style={{ color: "#606078" }}>Cancel anytime</p>
              <ul className="space-y-3">
                {[
                  "Unlimited listing generations",
                  "All property types",
                  "All tone styles",
                  "MLS description + headline + social",
                  "Priority support",
                  "New features included",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "#c0c0d8" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowPaywall(true)}
                className="mt-8 w-full rounded-xl py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: tealGradient }}
              >
                Get Pro — $39/mo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="border-t px-6 py-20" style={{ borderColor: "#1e1e2e" }}>
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-white">Common questions</h2>
          <div className="space-y-4">
            {[
              { q: "Do I need an account to use the free tier?", a: "No. Just enter your property details and generate. No email, no password, nothing." },
              { q: "How is this different from ChatGPT?", a: "ChatGPT requires you to know how to prompt it. ListingAI is purpose-built for real estate — structured inputs, tested outputs, real estate language. Same AI quality, zero prompt-writing required." },
              { q: "Can I cancel my subscription anytime?", a: "Yes, anytime. You'll keep access until the end of your billing period. No hoops, no retention tactics." },
              { q: "What if the listing isn't quite right?", a: "Hit 'Regenerate' for a fresh version with different wording. You can also adjust the tone or add more specific details for better results." },
              { q: "Is this compliant with MLS rules?", a: "Always review generated content before publishing. ListingAI produces professional, factual descriptions based on what you enter — you're responsible for accuracy and MLS compliance." },
            ].map(({ q, a }) => (
              <FAQItem key={q} question={q} answer={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="border-t px-6 py-16 text-center" style={{ borderColor: "#1e1e2e" }}>
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-3 text-3xl font-bold text-white">Stop spending 40 minutes on a listing.</h2>
          <p className="mb-8 text-base" style={{ color: "#8888a8" }}>
            Your first 3 are free. No signup, no credit card.
          </p>
          <button
            onClick={() => toolRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-xl px-10 py-4 text-base font-semibold text-white transition-all hover:opacity-90"
            style={{ background: tealGradient }}
          >
            Try ListingAI Free →
          </button>
          <p className="mt-4 text-sm" style={{ color: "#4a4a6a" }}>
            A{" "}
            <Link href="/" className="underline transition-colors hover:text-[#10b981]">
              PrestoKit
            </Link>{" "}
            product
          </p>
        </div>
      </section>

      {/* Paywall */}
      {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}
    </div>
  );
}

/* ─── FAQ Item ─── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border" style={{ borderColor: "#1e1e2e" }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors"
        style={{ background: open ? "#10b98106" : "transparent" }}
      >
        <span className="pr-4 text-sm font-medium text-white">{question}</span>
        <svg
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#9090b0" }}>
          {answer}
        </div>
      )}
    </div>
  );
}

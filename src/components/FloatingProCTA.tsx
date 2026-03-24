"use client";

import { useState } from "react";

export default function FloatingProCTA() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded panel */}
      {expanded && (
        <div className="animate-slide-up w-[320px] rounded-2xl border border-primary/30 bg-brand-dark/95 backdrop-blur-xl p-6 shadow-2xl shadow-primary/10">
          {/* Close */}
          <button
            onClick={() => setExpanded(false)}
            className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full text-muted hover:text-white hover:bg-white/10 transition-all"
            aria-label="Close"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Badge */}
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary-light">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Launch Special
          </div>

          <h3 className="text-lg font-bold text-white mb-1">
            Upgrade to Pro
          </h3>
          <p className="text-sm text-muted-light mb-4 leading-relaxed">
            Premium templates, ad-free experience, exclusive tools, and new content monthly.
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-sm text-muted line-through">$19/mo</span>
            <span className="text-3xl font-extrabold text-white">$9</span>
            <span className="text-sm text-muted">/mo</span>
            <span className="ml-1 rounded-full bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent">
              53% OFF
            </span>
          </div>

          {/* Features */}
          <ul className="space-y-2 mb-5">
            {[
              "Premium downloadable templates",
              "100 ChatGPT business prompts",
              "50 email templates included",
              "Ad-free, clean experience",
              "New premium content monthly",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-muted-light">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 text-accent" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="https://buy.stripe.com/eVq6oIgtm9HF96c9Mm0x200"
            className="block w-full rounded-xl bg-primary py-3 text-center text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-light hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5"
          >
            Get Pro — $9/mo
          </a>
          <p className="mt-2 text-center text-[11px] text-muted">
            Cancel anytime. 7-day money-back guarantee.
          </p>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="group flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-primary/30 transition-all hover:bg-primary-light hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 hover:scale-105"
        aria-label="Upgrade to Pro"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/90">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span className="hidden sm:inline">Upgrade to Pro</span>
        <span className="sm:hidden">Pro</span>
        <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-bold">
          53% OFF
        </span>
      </button>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface GumroadProduct {
  name: string;
  price: string;
  description: string;
  url: string;
}

interface PromoBarProps {
  /** Which type of promo to show */
  type: "gumroad" | "pro";
  /** Required when type is "gumroad" */
  product?: GumroadProduct;
  /** Unique key for localStorage dismiss state (e.g. "invoice-gumroad") */
  dismissKey: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PromoBar({ type, product, dismissKey }: PromoBarProps) {
  const storageKey = `prestokit-promo-dismissed-${dismissKey}`;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user previously dismissed this promo
    try {
      const dismissed = localStorage.getItem(storageKey);
      if (!dismissed) {
        // Small delay so it animates in nicely after page load
        const timer = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage not available, show anyway
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, [storageKey]);

  const handleDismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      // ignore
    }
  };

  if (!visible) return null;

  /* ------ Gumroad product promo ------ */
  if (type === "gumroad" && product) {
    return (
      <div
        className="mx-auto max-w-5xl px-4 py-4 animate-slide-up"
        role="complementary"
        aria-label="Product recommendation"
      >
        <div className="relative rounded-2xl border border-[#7c6cf0]/20 bg-gradient-to-r from-[#12121a] via-[#16162a] to-[#12121a] p-5 sm:p-6 overflow-hidden">
          {/* Subtle gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#7c6cf0]/5 via-transparent to-[#7c6cf0]/5 pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Icon */}
            <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c6cf0]/15">
              <svg className="h-5 w-5 text-[#7c6cf0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-white truncate">{product.name}</h3>
                <span className="flex-shrink-0 rounded-full bg-[#00e676]/15 px-2.5 py-0.5 text-xs font-semibold text-[#00e676]">
                  {product.price}
                </span>
              </div>
              <p className="text-xs text-[#8888a0] leading-relaxed line-clamp-2">
                {product.description}
              </p>
            </div>

            {/* CTA */}
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-[#7c6cf0] hover:bg-[#6b5ce0] px-5 py-2.5 text-sm font-semibold text-white transition-all shadow-lg shadow-[#7c6cf0]/20 hover:shadow-[#7c6cf0]/30"
            >
              Get It
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>

            {/* Dismiss */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full text-[#555566] hover:text-white hover:bg-white/10 transition-all"
              aria-label="Dismiss"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ------ Pro subscription promo ------ */
  return (
    <div
      className="mx-auto max-w-5xl px-4 py-4 animate-slide-up"
      role="complementary"
      aria-label="PrestoKit Pro"
    >
      <div className="relative rounded-2xl border border-[#00e676]/20 bg-gradient-to-r from-[#12121a] via-[#0f1a14] to-[#12121a] p-5 sm:p-6 overflow-hidden">
        {/* Subtle gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00e676]/5 via-transparent to-[#00e676]/5 pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-[#00e676]/15">
            <svg className="h-5 w-5 text-[#00e676]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold text-white">PrestoKit Pro</h3>
              <span className="flex-shrink-0 rounded-full bg-[#00e676]/15 px-2.5 py-0.5 text-xs font-semibold text-[#00e676]">
                Upgrade
              </span>
            </div>
            <p className="text-xs text-[#8888a0] leading-relaxed">
              Unlock premium templates, remove branding, export in more formats, and get priority access to new tools.
            </p>
          </div>

          {/* CTA */}
          <a
            href="/pro"
            className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-[#00e676] hover:bg-[#00c853] px-5 py-2.5 text-sm font-semibold text-[#0a0a0f] transition-all shadow-lg shadow-[#00e676]/20 hover:shadow-[#00e676]/30"
          >
            Learn More
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>

          {/* Dismiss */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full text-[#555566] hover:text-white hover:bg-white/10 transition-all"
            aria-label="Dismiss"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";

/* ──────────────── Types ──────────────── */

interface CustomerInfo {
  id: string;
  email: string | null;
  name: string | null;
}

interface SubscriptionInfo {
  id: string;
  status: string;
  plan: string;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
}

interface LookupResponse {
  found: boolean;
  customer?: CustomerInfo;
  subscription?: SubscriptionInfo;
  error?: string;
}

/* ──────────────── Pro Resources Data ──────────────── */

const proResources = [
  {
    name: "100 ChatGPT Business Prompts",
    description: "AI prompts for marketing, sales, operations, and more",
    href: "/products/100-chatgpt-prompts.html",
    icon: "chat",
  },
  {
    name: "50 Email Templates",
    description: "Cold outreach, follow-ups, client communication, and more",
    href: "/products/email-templates-bundle.html",
    icon: "email",
  },
  {
    name: "Business Launch Checklist",
    description: "Step-by-step guide to launching your business the right way",
    href: "/products/business-launch-checklist.html",
    icon: "rocket",
  },
  {
    name: "Freelancer Pricing Calculator",
    description: "Calculate your ideal rates and project pricing",
    href: "/products/freelancer-pricing-calculator.html",
    icon: "calculator",
  },
  {
    name: "Social Media Planner",
    description: "30-day content calendar with post ideas and scheduling",
    href: "/products/social-media-planner.html",
    icon: "calendar",
  },
];

/* ──────────────── Helper Components ──────────────── */

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function StatusBadge({ status, cancelAtPeriodEnd }: { status: string; cancelAtPeriodEnd: boolean }) {
  if (cancelAtPeriodEnd) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-400">
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        Canceling
      </span>
    );
  }

  switch (status) {
    case "active":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Active
        </span>
      );
    case "past_due":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-sm font-medium text-red-400">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          Past Due
        </span>
      );
    case "canceled":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-muted-dark/50 bg-muted-dark/10 px-3 py-1 text-sm font-medium text-muted">
          <span className="h-2 w-2 rounded-full bg-muted" />
          Canceled
        </span>
      );
    case "trialing":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary-light">
          <span className="h-2 w-2 rounded-full bg-primary-light" />
          Trial
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-muted-dark/50 bg-muted-dark/10 px-3 py-1 text-sm font-medium text-muted">
          <span className="h-2 w-2 rounded-full bg-muted" />
          {status}
        </span>
      );
  }
}

function ResourceIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "chat":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      );
    case "email":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      );
    case "rocket":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      );
    case "calculator":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008H15.75v-.008zm0 2.25h.008v.008H15.75V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
        </svg>
      );
    case "calendar":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
  }
}

/* ──────────────── Main Page ──────────────── */

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lookupResult, setLookupResult] = useState<LookupResponse | null>(null);

  /* ── Look up account ── */
  async function handleLookup(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setLookupResult(null);

    try {
      const res = await fetch("/api/account/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data: LookupResponse = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setLookupResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  /* ── Open Stripe portal ── */
  async function handlePortal() {
    if (!lookupResult?.customer?.id) return;
    setPortalLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/account/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId: lookupResult.customer.id }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setPortalLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Could not open subscription portal. Please try again.");
      setPortalLoading(false);
    }
  }

  /* ── Reset state ── */
  function handleReset() {
    setEmail("");
    setLookupResult(null);
    setError(null);
  }

  /* ── Format date from Unix timestamp ── */
  function formatDate(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const isActive =
    lookupResult?.subscription?.status === "active" ||
    lookupResult?.subscription?.status === "trialing";

  /* ══════════════════════════════════════════ */
  /* RENDER                                     */
  /* ══════════════════════════════════════════ */

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124, 108, 240, 0.06), transparent)",
        }}
      />

      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        {/* ─────────── STATE 1: Email Lookup Form ─────────── */}
        {!lookupResult && (
          <div className="animate-fade-in">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                <svg
                  className="w-7 h-7 text-primary-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Your Account
              </h1>
              <p className="mt-3 text-muted-light">
                Enter your email to access your PrestoKit Pro account.
              </p>
            </div>

            {/* Lookup form */}
            <div className="rounded-2xl border border-brand-border bg-brand-card/60 p-6 sm:p-8 backdrop-blur-sm">
              <form onSubmit={handleLookup} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-muted-light mb-2"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-brand-border bg-brand-dark px-4 py-3 text-white placeholder:text-muted-dark outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <p className="mt-2 text-xs text-muted">
                    Use the email you subscribed with.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <Spinner />
                      Looking up...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                      Look Up Account
                    </>
                  )}
                </button>
              </form>

              {/* Error display */}
              {error && (
                <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Not subscribed yet? */}
              <div className="mt-6 pt-5 border-t border-brand-border text-center">
                <p className="text-sm text-muted">
                  Don&apos;t have a Pro subscription yet?
                </p>
                <Link
                  href="/pro"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-light transition-colors hover:text-white"
                >
                  Learn about PrestoKit Pro
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ─────────── STATE 3: Email Not Found ─────────── */}
        {lookupResult && !lookupResult.found && (
          <div className="animate-fade-in text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted-dark/20 border border-brand-border">
              <svg
                className="w-8 h-8 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              No account found
            </h1>
            <p className="mt-3 text-muted-light">
              We couldn&apos;t find a PrestoKit Pro account for{" "}
              <span className="font-medium text-white">{email}</span>.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/pro"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Subscribe to Pro
              </Link>
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-brand-card px-6 py-3 text-sm font-medium text-muted-light transition-all hover:border-brand-border-hover hover:text-white"
              >
                Try a different email
              </button>
            </div>
          </div>
        )}

        {/* ─────────── STATE 2: Account Found ─────────── */}
        {lookupResult?.found && lookupResult.customer && (
          <div className="animate-fade-in space-y-6">
            {/* Welcome header */}
            <div className="rounded-2xl border border-brand-border bg-brand-card/60 p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-primary-light">
                    Welcome back
                  </p>
                  <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                    {lookupResult.customer.name || "PrestoKit Pro Member"}
                  </h1>
                  <p className="mt-1 text-sm text-muted">
                    {lookupResult.customer.email}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {lookupResult.subscription && (
                    <StatusBadge
                      status={lookupResult.subscription.status}
                      cancelAtPeriodEnd={lookupResult.subscription.cancelAtPeriodEnd}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Subscription Status Card */}
            {lookupResult.subscription ? (
              <div className="rounded-2xl border border-brand-border bg-brand-card/60 p-6 sm:p-8 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-white mb-5">
                  Subscription Details
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Plan */}
                  <div className="rounded-xl bg-brand-dark/50 border border-brand-border p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-dark mb-1">
                      Plan
                    </p>
                    <p className="text-lg font-semibold text-white">
                      PrestoKit Pro
                    </p>
                  </div>

                  {/* Price */}
                  <div className="rounded-xl bg-brand-dark/50 border border-brand-border p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-dark mb-1">
                      Price
                    </p>
                    <p className="text-lg font-semibold text-white">
                      $9<span className="text-sm font-normal text-muted">/month</span>
                    </p>
                  </div>

                  {/* Next billing / Cancel date */}
                  <div className="rounded-xl bg-brand-dark/50 border border-brand-border p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-dark mb-1">
                      {lookupResult.subscription.cancelAtPeriodEnd
                        ? "Cancels on"
                        : "Next billing date"}
                    </p>
                    <p
                      className={`text-lg font-semibold ${
                        lookupResult.subscription.cancelAtPeriodEnd
                          ? "text-amber-400"
                          : "text-white"
                      }`}
                    >
                      {formatDate(lookupResult.subscription.currentPeriodEnd)}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="rounded-xl bg-brand-dark/50 border border-brand-border p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-dark mb-1">
                      Status
                    </p>
                    <div className="mt-1">
                      <StatusBadge
                        status={lookupResult.subscription.status}
                        cancelAtPeriodEnd={lookupResult.subscription.cancelAtPeriodEnd}
                      />
                    </div>
                  </div>
                </div>

                {/* Canceling notice */}
                {lookupResult.subscription.cancelAtPeriodEnd && (
                  <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
                    <div className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                        />
                      </svg>
                      <span>
                        Your subscription is set to cancel on{" "}
                        <strong>
                          {formatDate(lookupResult.subscription.currentPeriodEnd)}
                        </strong>
                        . You will retain access until then. You can reactivate
                        anytime from the subscription portal below.
                      </span>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={handlePortal}
                    disabled={portalLoading}
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {portalLoading ? (
                      <>
                        <Spinner />
                        Opening...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Manage Subscription
                      </>
                    )}
                  </button>

                  <button
                    onClick={handlePortal}
                    disabled={portalLoading}
                    className="flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-brand-card px-5 py-3 text-sm font-medium text-muted-light transition-all hover:border-brand-border-hover hover:text-white hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    Update Payment Method
                  </button>

                  <button
                    onClick={handlePortal}
                    disabled={portalLoading}
                    className="flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-brand-card px-5 py-3 text-sm font-medium text-muted-light transition-all hover:border-brand-border-hover hover:text-white hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    View Invoices
                  </button>

                  <button
                    onClick={handlePortal}
                    disabled={portalLoading}
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-3 text-sm font-medium text-red-400 transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Cancel Subscription
                  </button>
                </div>

                {/* Portal error */}
                {error && (
                  <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    <div className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                      <span>{error}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* No subscription found for this customer */
              <div className="rounded-2xl border border-brand-border bg-brand-card/60 p-6 sm:p-8 backdrop-blur-sm text-center">
                <p className="text-muted-light">
                  Your account exists but you don&apos;t have an active subscription.
                </p>
                <Link
                  href="/pro"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                >
                  Subscribe to Pro
                </Link>
              </div>
            )}

            {/* ── Pro Resources ── */}
            {isActive && (
              <div className="rounded-2xl border border-brand-border bg-brand-card/60 p-6 sm:p-8 backdrop-blur-sm">
                <div className="mb-6">
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                    Pro Resources
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-white">
                    Your Premium Content
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    Access all your included resources below.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {proResources.map((resource) => (
                    <a
                      key={resource.name}
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 rounded-xl border border-brand-border bg-brand-dark/50 p-4 transition-all hover:border-brand-border-hover hover:bg-brand-card-hover hover:-translate-y-0.5"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-light transition-transform group-hover:scale-110">
                        <ResourceIcon icon={resource.icon} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                          {resource.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-muted leading-relaxed">
                          {resource.description}
                        </p>
                      </div>
                      <svg
                        className="w-4 h-4 flex-shrink-0 text-muted-dark mt-1 transition-colors group-hover:text-primary-light"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Not your account? */}
            <div className="text-center pt-2">
              <button
                onClick={handleReset}
                className="text-sm text-muted transition-colors hover:text-primary-light"
              >
                Not your account? Sign in with a different email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

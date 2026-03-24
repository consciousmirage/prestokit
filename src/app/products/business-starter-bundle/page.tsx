"use client";

import { useState } from "react";
import Link from "next/link";

const INCLUDED_TEMPLATES = [
  { category: "Invoicing & Billing", items: ["Professional Invoice Pack (5 designs)", "Recurring Invoice Template", "Late Payment Reminder Sequences", "Receipt Templates (3 styles)"] },
  { category: "Contracts & Legal", items: ["Freelance Service Agreement", "Non-Disclosure Agreement (NDA)", "Scope of Work Template", "Terms of Service Template"] },
  { category: "Financial Tracking", items: ["Cash Flow Tracker (12-month)", "Profit & Loss Statement", "Break-Even Analysis Sheet", "Expense Tracking Dashboard"] },
  { category: "Client Management", items: ["Client Onboarding Checklist", "Project Proposal Template", "Meeting Notes Template", "Client Feedback Form"] },
  { category: "Marketing & Content", items: ["12-Month Content Calendar", "Social Media Post Templates (50+)", "Email Newsletter Templates (10)", "Blog Post Outline Framework"] },
  { category: "Operations", items: ["Employee Onboarding Checklist", "Standard Operating Procedure Template", "Inventory Tracking Sheet", "Business Launch Checklist (155 steps)"] },
];

const BENEFITS = [
  { title: "Saves 40+ hours", desc: "Stop building templates from scratch. Fill in your details and go." },
  { title: "Professional quality", desc: "Every template is designed to impress clients and look enterprise-grade." },
  { title: "Commercial license", desc: "Use for your business, client work, or team. No restrictions." },
  { title: "One-time purchase", desc: "Pay once, keep forever. No subscriptions. No recurring charges." },
];

export default function BusinessStarterBundlePage() {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: "business-starter-bundle" }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 pt-12 pb-8">
          <nav className="flex items-center gap-2 text-sm text-muted mb-8">
            <Link href="/" className="hover:text-primary transition-colors">PrestoKit</Link>
            <span className="text-muted-dark">/</span>
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <span className="text-muted-dark">/</span>
            <span className="text-white">Business Starter Bundle</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/30 px-4 py-1.5 text-sm font-semibold text-accent">
              30+ Templates Included
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Business Starter{" "}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Bundle
              </span>
            </h1>

            <p className="text-lg text-muted-light max-w-2xl mx-auto mb-8">
              Everything you need to run a professional business — invoices, contracts,
              financial trackers, email templates, content calendars, and more.
              One purchase. Yours forever.
            </p>

            {/* Price + CTA */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-baseline gap-3">
                <span className="text-xl text-muted line-through">$59</span>
                <span className="text-5xl font-extrabold text-white">$29</span>
                <span className="rounded-full bg-accent/15 px-3 py-1 text-sm font-bold text-accent">
                  SAVE 50%
                </span>
              </div>

              <button
                onClick={handleBuy}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-10 py-4 text-lg font-bold text-white shadow-xl shadow-primary/25 transition-all hover:bg-primary-light hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>Processing...</>
                ) : (
                  <>
                    Get the Bundle — $29
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

              <p className="text-sm text-muted">
                One-time payment. Instant download. 30-day money-back guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t border-brand-border bg-brand-darker/50">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-2xl border border-brand-border bg-brand-card/40 p-6">
                <h3 className="text-base font-semibold text-white mb-2">{b.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="border-t border-brand-border">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">What&apos;s included</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">30+ Professional Templates</h2>
            <p className="mt-3 max-w-xl mx-auto text-muted-light">
              Every template is professionally designed, easy to customize, and ready to use immediately.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED_TEMPLATES.map((cat) => (
              <div key={cat.category} className="rounded-2xl border border-brand-border bg-brand-card/40 p-6">
                <h3 className="text-base font-semibold text-white mb-4">{cat.category}</h3>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-light">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-shrink-0 text-accent" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Trust */}
      <section className="border-t border-brand-border bg-brand-darker/50">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-accent" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">30-Day Money-Back Guarantee</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-light leading-relaxed">
              If the templates don&apos;t save you time and make your business look more professional,
              email us for a full refund. No questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-brand-border">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Stop building templates from scratch
          </h2>
          <p className="mt-4 text-lg text-muted-light">
            Get 30+ professional templates for less than the cost of a single hour with a designer.
          </p>
          <div className="mt-8">
            <button
              onClick={handleBuy}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-10 py-4 text-lg font-bold text-white shadow-xl shadow-primary/25 transition-all hover:bg-primary-light hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-0.5 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Get the Bundle — $29"}
            </button>
            <p className="mt-3 text-sm text-muted">One-time payment. Instant download.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

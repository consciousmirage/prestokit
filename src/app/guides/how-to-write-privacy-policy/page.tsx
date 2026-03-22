import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Write a Privacy Policy for Your Website (2026 Guide)",
  description:
    "Learn how to write a privacy policy that protects your business and complies with GDPR, CCPA, and other regulations. Step-by-step instructions with free generator tool.",
  keywords: [
    "how to write a privacy policy",
    "privacy policy template",
    "privacy policy generator",
    "GDPR privacy policy",
    "CCPA privacy policy",
    "website privacy policy",
    "privacy policy requirements",
    "data protection policy",
    "online privacy compliance",
    "free privacy policy",
  ],
  openGraph: {
    title: "How to Write a Privacy Policy for Your Website (2026 Guide)",
    description:
      "Step-by-step guide to creating a compliant privacy policy for your website or app. Covers GDPR, CCPA, and more.",
    type: "article",
    url: "https://prestokit.com/guides/how-to-write-privacy-policy",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write a Privacy Policy | PrestoKit",
    description:
      "Complete guide to writing a privacy policy that protects your business and keeps you compliant.",
  },
  alternates: {
    canonical: "https://prestokit.com/guides/how-to-write-privacy-policy",
  },
};

const tocItems = [
  { id: "why-you-need-one", label: "Why You Need a Privacy Policy" },
  { id: "legal-requirements", label: "Legal Requirements (GDPR, CCPA & More)" },
  { id: "what-to-include", label: "What to Include in Your Privacy Policy" },
  { id: "step-by-step", label: "Step-by-Step: Writing Your Policy" },
  { id: "common-mistakes", label: "Common Mistakes to Avoid" },
  { id: "where-to-display", label: "Where to Display Your Privacy Policy" },
  { id: "keeping-it-updated", label: "Keeping Your Policy Updated" },
  { id: "tools", label: "Generate Your Policy Now" },
];

export default function HowToWritePrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Write a Privacy Policy for Your Website (2026 Guide)",
    description:
      "Learn how to write a privacy policy that protects your business and complies with GDPR, CCPA, and other regulations.",
    author: { "@type": "Organization", name: "PrestoKit" },
    publisher: { "@type": "Organization", name: "PrestoKit", url: "https://prestokit.com" },
    datePublished: "2026-03-22",
    dateModified: "2026-03-22",
    mainEntityOfPage: "https://prestokit.com/guides/how-to-write-privacy-policy",
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="relative border-b border-brand-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow"
        />
        <div className="mx-auto max-w-[720px] px-6 pb-10 pt-12 sm:pt-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-white">
              PrestoKit
            </Link>
            <span className="text-muted-dark">/</span>
            <Link href="/guides" className="transition-colors hover:text-white">
              Guides
            </Link>
            <span className="text-muted-dark">/</span>
            <span className="text-muted-light">Privacy Policy</span>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            How to Write a Privacy Policy for Your Website
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-light">
            Every website that collects any user data needs a privacy policy. This guide explains what to include, which laws apply, and how to write one that actually protects your business.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span>By PrestoKit Team</span>
            <span className="text-muted-dark">|</span>
            <span>Last updated: March 2026</span>
            <span className="text-muted-dark">|</span>
            <span>10 min read</span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="mx-auto max-w-[720px] px-6 py-12">
        <nav className="mb-12 rounded-2xl border border-brand-border bg-brand-card/40 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-dark">
            Table of Contents
          </h2>
          <ol className="space-y-2">
            {tocItems.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex items-start gap-3 text-sm text-muted-light transition-colors hover:text-primary-light"
                >
                  <span className="mt-px font-mono text-xs text-muted-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="prose-custom">
          <section id="why-you-need-one" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Why You Need a Privacy Policy
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              If your website uses cookies, collects email addresses, processes payments, uses analytics (like Google Analytics), or has a contact form, you are collecting personal data. And if you collect personal data, you are legally required to have a privacy policy in most jurisdictions worldwide.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              Beyond the legal requirement, a privacy policy builds trust with your visitors. It tells them exactly what data you collect, why you collect it, and what you do with it. In an era of data breaches and privacy scandals, transparency is a competitive advantage.
            </p>
            <p className="text-muted-light leading-relaxed">
              Third-party services also require it. Google AdSense, Apple App Store, Google Play, Stripe, and most advertising platforms require you to have a published privacy policy before you can use their services. Without one, you risk account suspension or removal from these platforms.
            </p>
          </section>

          <section id="legal-requirements" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Legal Requirements: GDPR, CCPA, and More
            </h2>

            <h3 className="text-lg font-semibold text-white mb-3">GDPR (European Union)</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              The General Data Protection Regulation applies if you have any users in the EU, regardless of where your business is located. GDPR requires you to explain your legal basis for processing data, provide a way for users to request data deletion, disclose any data transfers outside the EU, and appoint a data protection officer if you process data at scale. Fines for non-compliance can reach 4% of annual global revenue.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">CCPA / CPRA (California)</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              The California Consumer Privacy Act and its amendment (CPRA) give California residents the right to know what data you collect, the right to delete it, the right to opt out of data sales, and protection against discrimination for exercising privacy rights. If you have California users and meet certain revenue or data thresholds, CCPA applies to you.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Other Regulations</h3>
            <p className="text-muted-light leading-relaxed">
              Canada has PIPEDA, Brazil has LGPD, Australia has the Privacy Act, and many US states are enacting their own privacy laws (Virginia, Colorado, Connecticut, and others). The safest approach is to write your privacy policy to the highest standard, which typically means GDPR compliance. If you satisfy GDPR requirements, you will generally meet the requirements of other regulations as well.
            </p>
          </section>

          <section id="what-to-include" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              What to Include in Your Privacy Policy
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              A comprehensive privacy policy should cover these core sections:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">What data you collect.</strong> List every type of personal information: names, emails, IP addresses, cookies, payment information, browsing behavior, device data, and location data.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">How you collect it.</strong> Explain whether data comes from forms, cookies, analytics tools, third-party integrations, or user-generated content.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Why you collect it.</strong> State the purpose for each type of data: service delivery, communication, analytics, marketing, legal compliance.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Who you share it with.</strong> Disclose any third parties that receive user data: payment processors, analytics providers, email services, advertising networks.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">How you protect it.</strong> Describe your security measures: encryption, access controls, secure servers, regular audits.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">User rights.</strong> Explain how users can access, correct, delete, or export their data. Include opt-out instructions for marketing communications.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Contact information.</strong> Provide a way for users to reach you with privacy questions or data requests.</span>
              </li>
            </ul>
          </section>

          {/* Mid-article CTA */}
          <div className="my-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Generate a privacy policy in minutes.
            </h3>
            <p className="text-sm text-muted-light mb-5">
              PrestoKit&rsquo;s free Privacy Policy Generator creates a customized, compliant policy based on your business details. No legal jargon to wade through.
            </p>
            <Link
              href="/tools/privacy-policy-generator"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
            >
              Generate Privacy Policy
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <section id="step-by-step" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Step-by-Step: Writing Your Policy
            </h2>

            <div className="space-y-6">
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  Step 1: Audit Your Data Collection
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Before writing a single word, map out every piece of personal data your website touches. Check your forms, analytics tools, payment processors, email marketing platform, and any third-party scripts. You cannot write an accurate policy without knowing what data you actually collect.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  Step 2: Use Plain Language
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Write for a regular person, not a lawyer. GDPR explicitly requires policies to be written in &ldquo;clear and plain language.&rdquo; Avoid legal jargon. Instead of &ldquo;We may process your personally identifiable information pursuant to our legitimate interests,&rdquo; write &ldquo;We use your email address to send you order updates and occasional newsletters.&rdquo;
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  Step 3: Be Specific About Third Parties
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Name the third-party services you use. Instead of &ldquo;We may share data with analytics providers,&rdquo; say &ldquo;We use Google Analytics to track page views and user behavior.&rdquo; Specificity shows you actually understand your own data practices and builds user trust.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  Step 4: Explain User Rights Clearly
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Tell users exactly how to exercise their rights. Provide a dedicated email address for data requests, explain the process for requesting data deletion, and state your response timeframe (GDPR requires a response within 30 days).
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  Step 5: Add a Cookie Policy Section
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  If your site uses cookies (and almost every website does), explain what cookies are, which ones you use (essential, analytics, marketing), and how users can manage their cookie preferences. Many businesses include this as a separate section within the privacy policy.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  Step 6: Include an Effective Date
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Always date your privacy policy and note when it was last updated. This helps users understand which version applies to them and demonstrates that you actively maintain the document.
                </p>
              </div>
            </div>
          </section>

          <section id="common-mistakes" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Common Mistakes to Avoid
            </h2>
            <div className="space-y-4">
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Copying someone else&rsquo;s policy</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Your privacy policy must reflect your actual data practices. Copying a policy from another website will almost certainly be inaccurate and could expose you to legal liability.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Being too vague</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Phrases like &ldquo;We may collect certain information&rdquo; or &ldquo;We may share data with partners&rdquo; do not satisfy GDPR or CCPA requirements. Be specific about what, why, and with whom.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Forgetting to update it</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  When you add a new analytics tool, payment processor, or marketing platform, your privacy policy needs to reflect that change. Schedule a quarterly review.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Hiding it from users</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  A privacy policy buried three clicks deep is practically nonexistent. Link to it prominently in your footer, during signup, and at checkout.
                </p>
              </div>
            </div>
          </section>

          <section id="where-to-display" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Where to Display Your Privacy Policy
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Your privacy policy should be accessible from every page on your website. The standard locations include your website footer, signup and registration forms, checkout pages, cookie consent banners, and app store listings if you have a mobile app. The key principle is that users should never have to search for your privacy policy. It should be one click away at all times.
            </p>
          </section>

          <section id="keeping-it-updated" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Keeping Your Policy Updated
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              A privacy policy is not a set-it-and-forget-it document. Review and update it whenever you add new features that collect data, start using new third-party services, change how you process or store data, expand to new geographic markets, or when privacy laws change. Notify your users of material changes via email or a banner on your website. Under GDPR, significant changes may require renewed consent from users.
            </p>
          </section>

          <section id="tools" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Generate Your Privacy Policy Now
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              Writing a privacy policy from scratch takes hours. PrestoKit&rsquo;s free Privacy Policy Generator asks you a few questions about your business and generates a customized, compliant policy you can publish immediately.
            </p>

            <Link
              href="/tools/privacy-policy-generator"
              className="group flex items-start gap-5 rounded-2xl border border-brand-border bg-brand-card/40 p-6 transition-all hover:bg-brand-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-3xl" style={{ backgroundColor: "#7c4dff15" }}>
                {"\uD83D\uDD12"}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-primary-light transition-colors">
                  Free Privacy Policy Generator
                </h3>
                <p className="mt-1 text-sm text-muted-light">
                  Answer a few simple questions and get a ready-to-publish privacy policy tailored to your website. Covers GDPR, CCPA, and more. Completely free.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-light opacity-0 group-hover:opacity-100 transition-opacity">
                  Open tool
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
          </section>
        </div>

        {/* Related Guides */}
        <section className="mt-16 border-t border-brand-border pt-12">
          <h2 className="text-xl font-bold text-white mb-6">Related Guides</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/guides/how-to-start-business"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                How to Start a Small Business
              </h3>
              <p className="mt-1 text-sm text-muted">
                Complete guide from idea to launch, including registration and first customers.
              </p>
            </Link>
            <Link
              href="/guides/freelancing-guide"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                Freelancing 101
              </h3>
              <p className="mt-1 text-sm text-muted">
                Everything you need to know about starting and growing a freelance career.
              </p>
            </Link>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mt-12 border-t border-brand-border pt-12">
          <h2 className="text-xl font-bold text-white mb-6">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/tools/privacy-policy-generator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Privacy Policy Generator
              </h3>
            </Link>
            <Link
              href="/tools/contract-generator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Contract Generator
              </h3>
            </Link>
            <Link
              href="/tools/invoice-generator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Invoice Generator
              </h3>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}

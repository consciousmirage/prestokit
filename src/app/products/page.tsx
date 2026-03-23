"use client";

import Link from "next/link";

const products = [
  {
    name: "100 ChatGPT Prompts for Small Business",
    originalPrice: "$14",
    price: "$7",
    buttonText: "Get for $7",
    gumroadUrl: "https://miragecraft7.gumroad.com/l/ztftb",
    description:
      "Ready-to-use prompts for emails, marketing copy, social media, customer service, and more. Save hours every week with AI-powered shortcuts.",
    previewUrl: "/products/100-chatgpt-prompts.html",
    gradient: "from-violet-500/20 to-purple-600/20",
    borderHover: "hover:border-violet-500/40",
    icon: (
      <svg
        className="w-8 h-8 text-violet-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
        />
      </svg>
    ),
  },
  {
    name: "Business Launch Checklist (155 Steps)",
    originalPrice: "$10",
    price: "$5",
    buttonText: "Get for $5",
    gumroadUrl: "https://miragecraft7.gumroad.com/l/sfznf",
    description:
      "Step-by-step checklist covering LLC formation, branding, domain setup, social media, and everything you need to launch your business the right way.",
    previewUrl: "/products/business-launch-checklist.html",
    gradient: "from-emerald-500/20 to-green-600/20",
    borderHover: "hover:border-emerald-500/40",
    icon: (
      <svg
        className="w-8 h-8 text-emerald-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    name: "50 Email Templates for Business",
    originalPrice: "$24",
    price: "$12",
    buttonText: "Get for $12",
    gumroadUrl: "https://miragecraft7.gumroad.com/l/nopzpi",
    description:
      "Professional email templates for invoicing, follow-ups, payment reminders, client communication, cold outreach, and more. Copy, paste, and send.",
    previewUrl: "/products/email-templates-bundle.html",
    gradient: "from-blue-500/20 to-cyan-600/20",
    borderHover: "hover:border-blue-500/40",
    icon: (
      <svg
        className="w-8 h-8 text-blue-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  {
    name: "Freelancer Pricing Calculator & Guide",
    originalPrice: "$18",
    price: "$9",
    buttonText: "Get for $9",
    gumroadUrl: "https://miragecraft7.gumroad.com/l/chegc",
    description:
      "Spreadsheet tool that calculates your ideal hourly rate, project pricing, and profit margins based on your expenses and income goals.",
    previewUrl: "/products/freelancer-pricing-calculator.html",
    gradient: "from-amber-500/20 to-orange-600/20",
    borderHover: "hover:border-amber-500/40",
    icon: (
      <svg
        className="w-8 h-8 text-amber-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008H15.75v-.008zm0 2.25h.008v.008H15.75V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
        />
      </svg>
    ),
  },
  {
    name: "Social Media Content Planner",
    originalPrice: "$14",
    price: "$7",
    buttonText: "Get for $7",
    gumroadUrl: "https://miragecraft7.gumroad.com/l/oaroqo",
    description:
      "Plan, organize, and schedule your social media content across all platforms. Includes content calendar, post templates, and hashtag strategy guide.",
    previewUrl: "/products/social-media-planner.html",
    gradient: "from-pink-500/20 to-rose-600/20",
    borderHover: "hover:border-pink-500/40",
    icon: (
      <svg
        className="w-8 h-8 text-pink-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
        />
      </svg>
    ),
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-brand-dark text-white">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-12 pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-8">
            <Link
              href="/"
              className="hover:text-primary transition-colors"
            >
              PrestoKit
            </Link>
            <svg
              className="w-3 h-3 text-muted-dark"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-white">Resources</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Business{" "}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Resources
              </span>
            </h1>
            <p className="text-lg text-muted-light max-w-2xl mx-auto">
              Premium digital products to help you launch, grow, and run your
              business. Affordable tools that deliver real results.
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.name}
              className={`group relative rounded-2xl border border-brand-border bg-brand-card overflow-hidden transition-all duration-300 ${product.borderHover} hover:shadow-[0_0_40px_rgba(124,108,240,0.08)]`}
            >
              {/* Gradient accent top */}
              <div
                className={`h-1.5 bg-gradient-to-r ${product.gradient}`}
              />

              <div className="p-6">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${product.gradient} mb-4`}
                >
                  {product.icon}
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-light transition-colors">
                  {product.name}
                </h2>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-muted-dark line-through text-sm">
                    {product.originalPrice}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-primary/15 px-2.5 py-0.5 text-sm font-bold text-primary-light">
                    {product.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <a
                    href={product.gumroadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-accent hover:bg-accent-light text-brand-dark font-semibold py-2.5 px-4 text-sm transition-all shadow-lg shadow-accent/20 hover:shadow-accent/30"
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
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                    {product.buttonText}
                  </a>
                  <a
                    href={product.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-brand-card-hover hover:border-brand-border-hover text-muted hover:text-white py-2.5 px-4 text-sm font-medium transition-all"
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
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Preview
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="rounded-2xl border border-brand-border bg-brand-card p-8 sm:p-12 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-3">
              Need more business tools?
            </h2>
            <p className="text-muted mb-6">
              Check out our free online tools — invoice generators, profit
              calculators, email signature creators, and more.
            </p>
            <Link
              href="/#tools"
              className="inline-flex items-center gap-2 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold py-3 px-6 text-sm transition-all shadow-lg shadow-primary/20"
            >
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Explore Free Tools
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

const tools = [
  { name: "Invoice Generator", href: "/tools/invoice-generator" },
  { name: "QR Code Generator", href: "/tools/qr-code-generator" },
  { name: "Email Signature Creator", href: "/tools/email-signature-creator" },
  { name: "Business Name Generator", href: "/tools/business-name-generator" },
  { name: "Profit Margin Calculator", href: "/tools/profit-margin-calculator" },
  { name: "Receipt Maker", href: "/tools/receipt-maker" },
  { name: "Estimate Builder", href: "/tools/estimate-builder" },
  { name: "Pay Stub Creator", href: "/tools/pay-stub-creator" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center px-6 py-24">
      {/* Glowing orb background effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* 404 number */}
        <div className="mb-6 text-8xl font-extrabold tracking-tighter sm:text-9xl">
          <span className="bg-gradient-to-b from-white to-muted bg-clip-text text-transparent">
            404
          </span>
        </div>

        {/* Heading */}
        <h1 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
          Page not found
        </h1>
        <p className="mb-10 text-base leading-relaxed text-muted sm:text-lg">
          Looks like this page doesn&apos;t exist. No worries — check out our
          free tools below.
        </p>

        {/* CTA buttons */}
        <div className="mb-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/#tools"
            className="inline-flex items-center gap-2 rounded-lg border border-brand-border px-6 py-3 text-sm font-medium text-muted transition-all hover:border-brand-border-hover hover:text-white"
          >
            Browse All Tools
          </Link>
        </div>

        {/* Quick links to tools */}
        <div className="rounded-xl border border-brand-border bg-brand-card p-6 text-left">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-dark">
            Popular Tools
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-white"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary-light opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <path
                    d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    fill="currentColor"
                  />
                </svg>
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

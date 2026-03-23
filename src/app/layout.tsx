import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prestokit.com"),
  title: {
    template: "%s | PrestoKit",
    default: "PrestoKit — Free Business Tools That Just Work",
  },
  description:
    "Free instant business tools — no signup, no credit card. Invoice generator, QR codes, email signatures, profit calculators, and more. Professional results in seconds.",
  keywords: [
    "free business tools",
    "invoice generator",
    "QR code generator",
    "email signature creator",
    "business name generator",
    "profit margin calculator",
    "receipt maker",
    "estimate builder",
    "pay stub creator",
    "free tools",
    "no signup",
    "small business",
    "freelancer tools",
    "online tools",
  ],
  openGraph: {
    title: "PrestoKit — Free Business Tools That Just Work",
    description:
      "Free instant business tools — no signup, no credit card. Professional results in seconds.",
    url: "https://prestokit.com",
    siteName: "PrestoKit",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PrestoKit — Free Business Tools That Just Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PrestoKit — Free Business Tools That Just Work",
    description:
      "Free instant business tools — no signup, no credit card. Professional results in seconds.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://prestokit.com",
  },
  verification: {
    google: "",
  },
};

const navLinks = [
  { label: "Tools", href: "/#tools" },
  { label: "Resources", href: "/products" },
  { label: "Why PrestoKit?", href: "/#why" },
  { label: "Pro", href: "/pro" },
  { label: "Account", href: "/account" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6072801414494256"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        {/* ─── Header ─── */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-brand-border bg-brand-dark/80 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 transition-colors group-hover:bg-primary/30">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary-light"
                >
                  <path
                    d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Presto<span className="text-primary-light">Kit</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#tools"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border text-muted transition-colors hover:border-brand-border-hover hover:text-white md:hidden"
              aria-label="Open menu"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </nav>
        </header>

        {/* ─── Promo Banner ─── */}
        <div className="fixed top-[73px] left-0 right-0 z-40" style={{ background: "linear-gradient(to right, #FF6B4A, #E5543A, #F59E0B)" }}>
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-3 px-4 py-2 text-sm text-white/90">
            <span className="font-semibold text-white">NEW:</span>
            <span className="hidden sm:inline">Get our</span>
            <a
              href="https://miragecraft7.gumroad.com/l/nopzpi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline underline-offset-2 decoration-white/40 hover:decoration-white transition-colors"
            >
              50 Email Templates Bundle
            </a>
            <span className="hidden sm:inline">— professional copy-paste templates for $7</span>
            <a
              href="https://miragecraft7.gumroad.com/l/nopzpi"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 rounded-md bg-white/20 px-3 py-0.5 text-xs font-bold text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              Get It Now
            </a>
            <span className="text-white/60 hidden md:inline">or</span>
            <Link
              href="/pro"
              className="hidden md:inline font-medium text-white/80 underline underline-offset-2 decoration-white/30 hover:text-white hover:decoration-white/60 transition-colors"
            >
              go Pro for $9/mo
            </Link>
          </div>
        </div>

        {/* ─── Main ─── */}
        <main className="pt-[113px]">{children}</main>

        {/* ─── Footer ─── */}
        <footer className="border-t border-brand-border bg-brand-darker">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {/* Brand */}
              <div className="sm:col-span-2 lg:col-span-1">
                <Link href="/" className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/20">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-primary-light"
                    >
                      <path
                        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span className="text-base font-bold text-white">
                    Presto<span className="text-primary-light">Kit</span>
                  </span>
                </Link>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Free business tools that just work. No signup. No BS.
                </p>
              </div>

              {/* Tools — Column 1 */}
              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-dark">
                  Tools
                </h4>
                <ul className="space-y-2">
                  {[
                    ["Invoice Generator", "/tools/invoice-generator"],
                    ["QR Code Generator", "/tools/qr-code-generator"],
                    ["Email Signature", "/tools/email-signature-creator"],
                    ["Business Name Gen", "/tools/business-name-generator"],
                  ].map(([name, href]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-sm text-muted transition-colors hover:text-white"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools — Column 2 */}
              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-dark">
                  More Tools
                </h4>
                <ul className="space-y-2">
                  {[
                    ["Profit Calculator", "/tools/profit-margin-calculator"],
                    ["Receipt Maker", "/tools/receipt-maker"],
                    ["Estimate Builder", "/tools/estimate-builder"],
                    ["Pay Stub Creator", "/tools/pay-stub-creator"],
                    ["Password Generator", "/tools/password-generator"],
                    ["Word Counter", "/tools/word-counter"],
                    ["Lorem Ipsum", "/tools/lorem-ipsum-generator"],
                    ["Percentage Calc", "/tools/percentage-calculator"],
                  ].map(([name, href]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-sm text-muted transition-colors hover:text-white"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-dark">
                  Company
                </h4>
                <ul className="space-y-2">
                  {[
                    ["About", "/#why"],
                    ["Pro", "/pro"],
                    ["Request a Tool", "mailto:hello@prestokit.com?subject=Tool%20Request"],
                    ["Contact", "mailto:hello@prestokit.com"],
                  ].map(([name, href]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-sm text-muted transition-colors hover:text-white"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-dark">
                  Legal
                </h4>
                <ul className="space-y-2">
                  {[
                    ["Privacy Policy", "/privacy"],
                    ["Terms of Service", "/terms"],
                  ].map(([name, href]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-sm text-muted transition-colors hover:text-white"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-brand-border pt-6 sm:flex-row">
              <p className="text-xs text-muted-dark">
                &copy; {new Date().getFullYear()} PrestoKit. All rights
                reserved.
              </p>
              <p className="text-xs text-muted-dark">
                Built by{" "}
                <span className="text-muted transition-colors hover:text-white">
                  Conscious Mirage
                </span>
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://twitter.com/prestokit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-dark transition-colors hover:text-white"
                  aria-label="Twitter"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

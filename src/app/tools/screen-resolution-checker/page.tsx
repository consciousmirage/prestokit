"use client";

import { useState, useEffect } from "react";

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
      <span className="text-[#f0f0f5]">Screen Resolution Checker</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What is screen resolution?",
    answer:
      "Screen resolution refers to the number of pixels displayed on your screen, expressed as width x height (e.g., 1920x1080). Higher resolution means more pixels, which results in sharper images and text. Common resolutions include 1080p (Full HD), 1440p (QHD), and 2160p (4K UHD).",
  },
  {
    question: "What is the difference between screen resolution and viewport size?",
    answer:
      "Screen resolution is the physical pixel count of your display hardware. Viewport size is the area your browser uses to render web content, which is typically smaller than the full screen (accounting for toolbars, taskbar, etc.). On high-DPI (Retina) displays, the viewport in CSS pixels may be smaller than the physical resolution.",
  },
  {
    question: "What is Device Pixel Ratio (DPR)?",
    answer:
      "Device Pixel Ratio (DPR) is the ratio between physical pixels and CSS pixels. A DPR of 2 (common on Retina displays) means each CSS pixel is rendered using 2x2 physical pixels, resulting in sharper text and images. Standard displays have a DPR of 1.",
  },
  {
    question: "What is aspect ratio?",
    answer:
      "Aspect ratio is the proportional relationship between the width and height of your screen. Common aspect ratios include 16:9 (widescreen, most common for monitors and TVs), 16:10 (common for laptops), 21:9 (ultrawide monitors), and 4:3 (older monitors and iPads).",
  },
  {
    question: "What is DPI and why does it matter?",
    answer:
      "DPI (Dots Per Inch) or PPI (Pixels Per Inch) measures pixel density. Higher DPI means more pixels packed into each inch, resulting in sharper visuals. For reference, standard monitors are 72-96 DPI, Retina MacBooks are around 220 DPI, and modern phones can exceed 400 DPI.",
  },
  {
    question: "Why does my screen resolution look different than what I set?",
    answer:
      "Your operating system may use display scaling to make text and UI elements more readable on high-resolution screens. For example, a 4K (3840x2160) monitor at 200% scaling will report a viewport of 1920x1080 CSS pixels. The physical resolution hasn't changed — the OS is using more physical pixels per UI element.",
  },
];

/* ------------------------------------------------------------------ */
/*  Common Resolutions Reference                                       */
/* ------------------------------------------------------------------ */

const COMMON_RESOLUTIONS = [
  { name: "HD (720p)", width: 1280, height: 720 },
  { name: "Full HD (1080p)", width: 1920, height: 1080 },
  { name: "QHD (1440p)", width: 2560, height: 1440 },
  { name: "4K UHD", width: 3840, height: 2160 },
  { name: "5K", width: 5120, height: 2880 },
  { name: "MacBook Air 13\"", width: 2560, height: 1600 },
  { name: "MacBook Pro 14\"", width: 3024, height: 1964 },
  { name: "iPad Pro 12.9\"", width: 2048, height: 2732 },
  { name: "iPhone 15 Pro", width: 1179, height: 2556 },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function getAspectRatio(w: number, h: number): string {
  if (w === 0 || h === 0) return "N/A";
  const d = gcd(w, h);
  return `${w / d}:${h / d}`;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

interface ScreenInfo {
  screenWidth: number;
  screenHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  dpr: number;
  colorDepth: number;
  orientation: string;
}

export default function ScreenResolutionCheckerPage() {
  const [info, setInfo] = useState<ScreenInfo | null>(null);

  useEffect(() => {
    const update = () => {
      setInfo({
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        dpr: window.devicePixelRatio || 1,
        colorDepth: window.screen.colorDepth || 24,
        orientation:
          typeof window.screen.orientation !== "undefined"
            ? window.screen.orientation.type.replace("-primary", "").replace("-secondary", "")
            : window.innerWidth > window.innerHeight
            ? "landscape"
            : "portrait",
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const physicalWidth = info ? info.screenWidth * info.dpr : 0;
  const physicalHeight = info ? info.screenHeight * info.dpr : 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Screen Resolution Checker",
    description:
      "Check your screen resolution, DPI, aspect ratio, color depth, and device pixel ratio instantly.",
    url: "https://prestokit.com/tools/screen-resolution-checker",
    applicationCategory: "DeveloperApplication",
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
              Screen Resolution{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Checker
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Instantly check your screen resolution, viewport size, device pixel
              ratio, aspect ratio, color depth, and orientation. Updates live as
              you resize.
            </p>
          </div>

          {info && (
            <>
              {/* Main Resolution Display */}
              <div className="rounded-2xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-8 sm:p-10 text-center mb-6">
                <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                  Your Screen Resolution
                </div>
                <div className="text-5xl sm:text-6xl font-bold text-white mb-2">
                  {info.screenWidth} <span className="text-[#7c6cf0]">&times;</span> {info.screenHeight}
                </div>
                <div className="text-[#8888a0] text-sm">
                  CSS Pixels &bull; Aspect Ratio: {getAspectRatio(info.screenWidth, info.screenHeight)}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-5">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">Viewport Size</div>
                  <div className="text-xl font-bold text-white">{info.viewportWidth} &times; {info.viewportHeight}</div>
                </div>
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-5">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">Physical Pixels</div>
                  <div className="text-xl font-bold text-white">{physicalWidth} &times; {physicalHeight}</div>
                </div>
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-5">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">Device Pixel Ratio</div>
                  <div className="text-xl font-bold text-[#9d90f5]">{info.dpr}x</div>
                </div>
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-5">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">Color Depth</div>
                  <div className="text-xl font-bold text-white">{info.colorDepth}-bit</div>
                </div>
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-5">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">Aspect Ratio</div>
                  <div className="text-xl font-bold text-white">{getAspectRatio(info.screenWidth, info.screenHeight)}</div>
                </div>
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-5">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">Orientation</div>
                  <div className="text-xl font-bold text-white capitalize">{info.orientation}</div>
                </div>
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-5">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">Total Pixels</div>
                  <div className="text-xl font-bold text-white">{(physicalWidth * physicalHeight / 1_000_000).toFixed(1)}MP</div>
                </div>
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-5">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">Browser Zoom</div>
                  <div className="text-xl font-bold text-white">{Math.round(info.dpr * 100 / (window?.devicePixelRatio || 1)) || 100}%</div>
                </div>
              </div>

              {/* Common Resolutions Comparison */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  Common Resolutions Reference
                </h2>
                <div className="space-y-2">
                  {COMMON_RESOLUTIONS.map((res) => {
                    const isMatch = info.screenWidth === res.width && info.screenHeight === res.height;
                    return (
                      <div
                        key={res.name}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${
                          isMatch
                            ? "border border-[#7c6cf0]/40 bg-[#7c6cf0]/10 text-[#9d90f5]"
                            : "border border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0]"
                        }`}
                      >
                        <span className={isMatch ? "text-white font-semibold" : ""}>
                          {res.name} {isMatch && "(Your screen)"}
                        </span>
                        <span className="font-mono">
                          {res.width} &times; {res.height}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {!info && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-12 text-center mb-6">
              <div className="text-[#555566] text-lg">Detecting your screen...</div>
            </div>
          )}

          {/* How It Works */}
          <div className="mb-16 mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Auto-Detection",
                  description:
                    "The tool automatically reads your screen properties using browser APIs. No plugins or software needed.",
                },
                {
                  step: "2",
                  title: "Live Updates",
                  description:
                    "Resize your browser window or rotate your device and watch all values update in real time.",
                },
                {
                  step: "3",
                  title: "Compare & Reference",
                  description:
                    "See how your display compares to common screen resolutions. Your matching resolution is highlighted.",
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
                  title: "Color Palette Generator",
                  description:
                    "Generate beautiful color palettes with harmony modes and CSS export.",
                  href: "/tools/color-palette-generator",
                },
                {
                  title: "Image Compressor",
                  description:
                    "Compress images in your browser. No upload needed, 100% private.",
                  href: "/tools/image-compressor",
                },
                {
                  title: "JSON Formatter",
                  description:
                    "Format, validate, and minify JSON with syntax highlighting.",
                  href: "/tools/json-formatter",
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

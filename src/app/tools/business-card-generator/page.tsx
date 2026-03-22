"use client";

import { useState, useRef, useCallback } from "react";

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
      <span className="text-[#f0f0f5]">Business Card Generator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type CardStyle = "modern" | "classic" | "bold" | "minimal" | "gradient";

interface CardData {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
}

interface StyleConfig {
  name: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  secondaryText: string;
  description: string;
}

const STYLES: Record<CardStyle, StyleConfig> = {
  modern: {
    name: "Modern",
    bgColor: "#ffffff",
    textColor: "#1a1a2e",
    accentColor: "#7c6cf0",
    secondaryText: "#666680",
    description: "Clean white with purple accent",
  },
  classic: {
    name: "Classic",
    bgColor: "#faf8f5",
    textColor: "#2c2c2c",
    accentColor: "#8b6f47",
    secondaryText: "#706050",
    description: "Warm cream with gold accent",
  },
  bold: {
    name: "Bold Dark",
    bgColor: "#0f0f1a",
    textColor: "#ffffff",
    accentColor: "#00e676",
    secondaryText: "#a0a0b8",
    description: "Dark background with green accent",
  },
  minimal: {
    name: "Minimal",
    bgColor: "#ffffff",
    textColor: "#111111",
    accentColor: "#111111",
    secondaryText: "#888888",
    description: "Black and white simplicity",
  },
  gradient: {
    name: "Gradient",
    bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    textColor: "#ffffff",
    accentColor: "#ffd740",
    secondaryText: "rgba(255,255,255,0.75)",
    description: "Vibrant gradient background",
  },
};

/* ------------------------------------------------------------------ */
/*  Card Preview Component                                             */
/* ------------------------------------------------------------------ */

function CardPreview({
  data,
  style,
  customAccent,
}: {
  data: CardData;
  style: CardStyle;
  customAccent: string;
}) {
  const config = STYLES[style];
  const accent = customAccent || config.accentColor;
  const isGradient = style === "gradient";

  return (
    <div
      className="w-full aspect-[1.75/1] rounded-xl shadow-2xl overflow-hidden relative flex flex-col justify-between p-6 sm:p-8"
      style={{
        background: isGradient ? config.bgColor : config.bgColor,
        color: config.textColor,
        maxWidth: 500,
      }}
    >
      {/* Accent stripe */}
      {!isGradient && (
        <div
          className="absolute top-0 left-0 w-full h-1.5"
          style={{ backgroundColor: accent }}
        />
      )}

      {/* Top section: name and title */}
      <div>
        <div
          className="text-xl sm:text-2xl font-bold tracking-tight leading-tight"
          style={{ color: config.textColor }}
        >
          {data.name || "Your Name"}
        </div>
        <div
          className="text-sm sm:text-base font-medium mt-1"
          style={{ color: accent }}
        >
          {data.title || "Job Title"}
        </div>
        {data.company && (
          <div
            className="text-sm mt-0.5"
            style={{ color: config.secondaryText }}
          >
            {data.company}
          </div>
        )}
      </div>

      {/* Bottom section: contact info */}
      <div className="space-y-0.5">
        {data.email && (
          <div
            className="text-xs sm:text-sm"
            style={{ color: config.secondaryText }}
          >
            {data.email}
          </div>
        )}
        {data.phone && (
          <div
            className="text-xs sm:text-sm"
            style={{ color: config.secondaryText }}
          >
            {data.phone}
          </div>
        )}
        {data.website && (
          <div className="text-xs sm:text-sm font-medium" style={{ color: accent }}>
            {data.website}
          </div>
        )}
        {data.address && (
          <div
            className="text-xs"
            style={{ color: config.secondaryText }}
          >
            {data.address}
          </div>
        )}
      </div>

      {/* Decorative element */}
      {style === "modern" && (
        <div
          className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-10"
          style={{ backgroundColor: accent }}
        />
      )}
      {style === "bold" && (
        <div
          className="absolute top-4 right-6 w-2 h-16 rounded-full opacity-60"
          style={{ backgroundColor: accent }}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What is the standard business card size?",
    answer:
      "The standard business card size in the US and Canada is 3.5 x 2 inches (89 x 51 mm). In Europe, the standard is 85 x 55 mm (3.346 x 2.165 inches). In Japan, it is 91 x 55 mm. Our generator creates cards at the US standard ratio, which is widely accepted worldwide.",
  },
  {
    question: "What information should be on a business card?",
    answer:
      "Essential information includes: your full name, job title or role, company name, phone number, and email address. Optional but recommended: website URL, physical address (especially for brick-and-mortar businesses), and social media handles relevant to your profession. Keep it clean — less is more. The card should be easy to read at a glance.",
  },
  {
    question: "What makes a good business card design?",
    answer:
      "A good business card is clean, legible, and memorable. Use no more than 2 fonts, ensure text is large enough to read easily (minimum 8pt for print), use high contrast between text and background, and include plenty of white space. A subtle accent color can make your card stand out without being overwhelming. Avoid clutter — you have a small space.",
  },
  {
    question: "Can I print the business cards I create here?",
    answer:
      "Yes. Download your card as a high-resolution PNG image and upload it to any printing service. Popular options include Vistaprint, Moo, Canva Print, and local print shops. For best results, request 300 DPI printing and choose a quality cardstock (at least 14pt or 350gsm). Some printers may require vector formats — in that case, our PNG can serve as a design reference.",
  },
  {
    question: "Should I include social media on my business card?",
    answer:
      "Only include social media handles that are relevant to your professional brand. For most professionals, LinkedIn is the safest choice. Creatives might include Instagram or Behance. Avoid personal social media unless your brand is built around it. Including too many handles clutters the card. Consider adding a QR code that links to your online profile instead.",
  },
  {
    question: "Is this business card generator really free?",
    answer:
      "Yes, 100% free with no watermarks, no signup, and no hidden fees. Your data never leaves your browser — the card is generated and downloaded entirely on your device. You can create as many cards as you like.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function BusinessCardGeneratorPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardData, setCardData] = useState<CardData>({
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    address: "",
  });
  const [cardStyle, setCardStyle] = useState<CardStyle>("modern");
  const [customAccent, setCustomAccent] = useState("");
  const [downloading, setDownloading] = useState(false);

  const updateField = (field: keyof CardData, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);

    try {
      // Use canvas to capture the card
      const card = cardRef.current;
      const canvas = document.createElement("canvas");
      const scale = 3; // High resolution
      const rect = card.getBoundingClientRect();
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.scale(scale, scale);

      // Draw background
      const config = STYLES[cardStyle];
      if (cardStyle === "gradient") {
        const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
        gradient.addColorStop(0, "#667eea");
        gradient.addColorStop(1, "#764ba2");
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = config.bgColor;
      }

      // Rounded rectangle
      const radius = 12;
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(rect.width - radius, 0);
      ctx.quadraticCurveTo(rect.width, 0, rect.width, radius);
      ctx.lineTo(rect.width, rect.height - radius);
      ctx.quadraticCurveTo(rect.width, rect.height, rect.width - radius, rect.height);
      ctx.lineTo(radius, rect.height);
      ctx.quadraticCurveTo(0, rect.height, 0, rect.height - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();
      ctx.fill();

      // Accent stripe
      const accent = customAccent || config.accentColor;
      if (cardStyle !== "gradient") {
        ctx.fillStyle = accent;
        ctx.fillRect(0, 0, rect.width, 6);
      }

      // Decorative elements
      if (cardStyle === "modern") {
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.1;
        ctx.beginPath();
        ctx.arc(rect.width, rect.height, 96, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      if (cardStyle === "bold") {
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.roundRect(rect.width - 32, 16, 8, 64, 4);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      const padX = 32;
      let y = 40;

      // Name
      ctx.fillStyle = config.textColor;
      ctx.font = "bold 22px system-ui, -apple-system, sans-serif";
      ctx.fillText(cardData.name || "Your Name", padX, y);
      y += 26;

      // Title
      ctx.fillStyle = accent;
      ctx.font = "500 14px system-ui, -apple-system, sans-serif";
      ctx.fillText(cardData.title || "Job Title", padX, y);
      y += 20;

      // Company
      if (cardData.company) {
        ctx.fillStyle = config.secondaryText;
        ctx.font = "400 13px system-ui, -apple-system, sans-serif";
        ctx.fillText(cardData.company, padX, y);
      }

      // Bottom section - contact info
      let bottomY = rect.height - 20;
      const contactLines: { text: string; color: string; bold?: boolean }[] = [];
      if (cardData.address) contactLines.push({ text: cardData.address, color: config.secondaryText });
      if (cardData.website) contactLines.push({ text: cardData.website, color: accent, bold: true });
      if (cardData.phone) contactLines.push({ text: cardData.phone, color: config.secondaryText });
      if (cardData.email) contactLines.push({ text: cardData.email, color: config.secondaryText });

      contactLines.reverse().forEach((line) => {
        ctx.fillStyle = line.color;
        ctx.font = `${line.bold ? "500" : "400"} 12px system-ui, -apple-system, sans-serif`;
        ctx.fillText(line.text, padX, bottomY);
        bottomY -= 18;
      });

      // Download
      const link = document.createElement("a");
      link.download = `business-card-${cardData.name.replace(/\s+/g, "-").toLowerCase() || "card"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      // Fallback: open print dialog
      window.print();
    } finally {
      setDownloading(false);
    }
  }, [cardData, cardStyle, customAccent]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Business Card Generator",
    description:
      "Design professional business cards online and download as PNG. Multiple styles and customization options.",
    url: "https://prestokit.com/tools/business-card-generator",
    applicationCategory: "DesignApplication",
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
              Business Card{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Design professional business cards in seconds. Choose a style,
              fill in your details, and download as a high-resolution PNG.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 space-y-4">
              <h2 className="text-sm font-semibold text-[#c0c0d0] mb-2">
                Your Details
              </h2>

              {[
                { field: "name" as keyof CardData, label: "Full Name", placeholder: "John Doe" },
                { field: "title" as keyof CardData, label: "Job Title", placeholder: "Founder & CEO" },
                { field: "company" as keyof CardData, label: "Company", placeholder: "Acme Inc." },
                { field: "email" as keyof CardData, label: "Email", placeholder: "john@acme.com" },
                { field: "phone" as keyof CardData, label: "Phone", placeholder: "(555) 123-4567" },
                { field: "website" as keyof CardData, label: "Website", placeholder: "www.acme.com" },
                { field: "address" as keyof CardData, label: "Address (optional)", placeholder: "123 Main St, New York, NY" },
              ].map((input) => (
                <div key={input.field}>
                  <label className="block text-xs font-medium text-[#8888a0] mb-1.5">
                    {input.label}
                  </label>
                  <input
                    type="text"
                    value={cardData[input.field]}
                    onChange={(e) => updateField(input.field, e.target.value)}
                    placeholder={input.placeholder}
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-2.5 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              ))}

              {/* Style */}
              <div className="pt-2">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
                  Card Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(Object.entries(STYLES) as [CardStyle, StyleConfig][]).map(
                    ([key, config]) => (
                      <button
                        key={key}
                        onClick={() => setCardStyle(key)}
                        className={`rounded-xl border py-3 px-3 text-left transition-all ${
                          cardStyle === key
                            ? "border-[#7c6cf0] bg-[#7c6cf0]/10"
                            : "border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#7c6cf0]/40"
                        }`}
                      >
                        <div className="text-sm font-semibold text-white">
                          {config.name}
                        </div>
                        <div className="text-[10px] text-[#8888a0] mt-0.5">
                          {config.description}
                        </div>
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Custom Accent Color */}
              <div>
                <label className="block text-xs font-medium text-[#8888a0] mb-1.5">
                  Custom Accent Color (optional)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customAccent || STYLES[cardStyle].accentColor}
                    onChange={(e) => setCustomAccent(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-[#1e1e2e] bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customAccent}
                    onChange={(e) => setCustomAccent(e.target.value)}
                    placeholder={STYLES[cardStyle].accentColor}
                    className="flex-1 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-2 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                  {customAccent && (
                    <button
                      onClick={() => setCustomAccent("")}
                      className="text-xs text-[#8888a0] hover:text-white transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Preview & Download */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  Preview
                </h2>

                <div className="flex justify-center" ref={cardRef}>
                  <CardPreview
                    data={cardData}
                    style={cardStyle}
                    customAccent={customAccent}
                  />
                </div>

                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-[#7c6cf0] hover:bg-[#6b5ce0] disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3.5 text-sm font-semibold text-white transition-all shadow-lg shadow-[#7c6cf0]/20"
                >
                  {downloading ? (
                    "Generating..."
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download as PNG
                    </>
                  )}
                </button>
              </div>

              {/* Tips */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
                <h3 className="text-sm font-semibold text-[#c0c0d0] mb-3">
                  Quick Tips
                </h3>
                <ul className="space-y-2 text-xs text-[#8888a0]">
                  <li className="flex gap-2">
                    <span className="text-[#00e676]">&#8226;</span>
                    Standard US business card size is 3.5 x 2 inches
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#00e676]">&#8226;</span>
                    Keep your card clean — less information is more effective
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#00e676]">&#8226;</span>
                    Use high-contrast colors for maximum readability
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#00e676]">&#8226;</span>
                    Upload the PNG to Vistaprint, Moo, or your local printer
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16 mt-10">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Your Details",
                  description:
                    "Fill in your name, title, company, and contact information. Only include the fields that are relevant to your profession.",
                },
                {
                  step: "2",
                  title: "Choose a Style",
                  description:
                    "Pick from 5 professional card styles. Customize the accent color to match your brand identity.",
                },
                {
                  step: "3",
                  title: "Download & Print",
                  description:
                    "Download your card as a high-resolution PNG. Upload to any printing service or share digitally via email.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-6 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-[#7c6cf0]/20 text-[#7c6cf0] font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#8888a0] leading-relaxed">
                    {item.description}
                  </p>
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
                <FAQItem
                  key={i}
                  question={item.question}
                  answer={item.answer}
                />
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
                  title: "Email Signature Creator",
                  description:
                    "Build beautiful HTML email signatures for Gmail and Outlook.",
                  href: "/tools/email-signature-creator",
                },
                {
                  title: "QR Code Generator",
                  description:
                    "Generate QR codes for URLs, text, WiFi, and contacts.",
                  href: "/tools/qr-code-generator",
                },
                {
                  title: "Invoice Generator",
                  description:
                    "Create professional invoices in seconds, download as PDF.",
                  href: "/tools/invoice-generator",
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
                  <p className="text-sm text-[#8888a0]">
                    {tool.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

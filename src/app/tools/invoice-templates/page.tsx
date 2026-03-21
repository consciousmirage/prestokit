"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQS = [
  {
    q: "Are these invoice templates really free?",
    a: "Yes, every invoice template on PrestoKit is 100% free to use. There are no hidden fees, no watermarks, and no account required. Browse the gallery, preview any template, and use it with our invoice generator at no cost.",
  },
  {
    q: "Can I customize these invoice templates?",
    a: "Absolutely. When you click \"Use This Template\" on any design, it opens our invoice generator pre-styled with that template's look and feel. From there you can fill in your business details, client information, line items, taxes, discounts, and notes. The preview updates in real time as you type.",
  },
  {
    q: "What file format do the invoices download as?",
    a: "All invoices download as PDF files through your browser's built-in print dialog. PDFs are universally accepted, maintain their formatting on every device, and are the professional standard for sending invoices to clients.",
  },
  {
    q: "Which invoice template style is best for my business?",
    a: "It depends on your brand and industry. Freelancers and creatives often prefer Minimal or Modern styles. Agencies and consulting firms tend to go with Corporate or Professional templates. If you want to stand out, try Creative or Bold. The Elegant template works great for luxury services, while Classic is a safe choice for any industry.",
  },
  {
    q: "Do I need to create an account to use these templates?",
    a: "No account or signup is needed. Simply browse the template gallery, click a template to preview it, and start customizing immediately. Everything runs in your browser — your data never leaves your device.",
  },
  {
    q: "Can I use these templates for recurring invoices?",
    a: "Yes. Each time you use a template, you can fill in different client details and line items. While PrestoKit doesn't store your data between sessions (for privacy), you can bookmark the invoice generator page and quickly recreate invoices using the same template style whenever you need.",
  },
];

const RELATED_TOOLS = [
  {
    name: "Invoice Generator",
    description: "Create and download professional invoices as PDF instantly.",
    href: "/tools/invoice-generator",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    name: "Receipt Maker",
    description: "Generate professional receipts for completed transactions.",
    href: "/tools/receipt-maker",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    name: "Estimate Builder",
    description: "Create detailed project estimates and proposals for clients.",
    href: "/tools/estimate-builder",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    name: "Contract Generator",
    description: "Generate business contracts from professional templates.",
    href: "/tools/contract-generator",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
];

/* ------------------------------------------------------------------ */
/*  Template Data                                                      */
/* ------------------------------------------------------------------ */

type StyleTag = "All" | "Minimal" | "Professional" | "Creative" | "Bold";

interface Template {
  id: string;
  name: string;
  tags: StyleTag[];
  accent: string;
  headerBg: string;
  headerText: string;
  bodyBg: string;
  titleStyle: string;
  fontFamily: string;
  description: string;
}

const TEMPLATES: Template[] = [
  {
    id: "minimal",
    name: "Minimal",
    tags: ["Minimal"],
    accent: "#333333",
    headerBg: "#ffffff",
    headerText: "#111111",
    bodyBg: "#ffffff",
    titleStyle: "uppercase tracking-[0.3em] text-sm font-light",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    description: "Clean lines, generous whitespace. Lets your work speak for itself.",
  },
  {
    id: "corporate",
    name: "Corporate",
    tags: ["Professional"],
    accent: "#1a365d",
    headerBg: "#1a365d",
    headerText: "#ffffff",
    bodyBg: "#ffffff",
    titleStyle: "text-2xl font-bold",
    fontFamily: "Georgia, 'Times New Roman', serif",
    description: "Traditional and trustworthy. Perfect for consulting and finance.",
  },
  {
    id: "creative",
    name: "Creative",
    tags: ["Creative"],
    accent: "#e53e3e",
    headerBg: "#1a1a2e",
    headerText: "#ffffff",
    bodyBg: "#f7f7fb",
    titleStyle: "text-3xl font-black italic",
    fontFamily: "'Arial Black', Arial, sans-serif",
    description: "Eye-catching design for designers, photographers, and artists.",
  },
  {
    id: "bold",
    name: "Bold",
    tags: ["Bold"],
    accent: "#ff6b00",
    headerBg: "#ff6b00",
    headerText: "#ffffff",
    bodyBg: "#ffffff",
    titleStyle: "text-3xl font-black uppercase",
    fontFamily: "Impact, 'Arial Black', sans-serif",
    description: "Make a statement. High contrast, impossible to ignore.",
  },
  {
    id: "elegant",
    name: "Elegant",
    tags: ["Professional", "Minimal"],
    accent: "#8b6914",
    headerBg: "#faf8f4",
    headerText: "#2d2d2d",
    bodyBg: "#faf8f4",
    titleStyle: "text-2xl font-light tracking-widest uppercase",
    fontFamily: "'Palatino Linotype', Palatino, Georgia, serif",
    description: "Refined and sophisticated. Ideal for luxury and premium services.",
  },
  {
    id: "modern",
    name: "Modern",
    tags: ["Professional", "Minimal"],
    accent: "#7c6cf0",
    headerBg: "#ffffff",
    headerText: "#1a1a2e",
    bodyBg: "#ffffff",
    titleStyle: "text-2xl font-semibold",
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    description: "Contemporary and clean. The go-to for tech and startups.",
  },
  {
    id: "classic",
    name: "Classic",
    tags: ["Professional"],
    accent: "#2c5f2d",
    headerBg: "#ffffff",
    headerText: "#2c5f2d",
    bodyBg: "#ffffff",
    titleStyle: "text-2xl font-bold",
    fontFamily: "'Times New Roman', Times, serif",
    description: "Time-tested design that never goes out of style.",
  },
  {
    id: "colorful",
    name: "Colorful",
    tags: ["Creative", "Bold"],
    accent: "#6c5ce7",
    headerBg: "linear-gradient(135deg, #6c5ce7 0%, #a855f7 50%, #ec4899 100%)",
    headerText: "#ffffff",
    bodyBg: "#ffffff",
    titleStyle: "text-2xl font-bold",
    fontFamily: "'Trebuchet MS', 'Lucida Sans', Arial, sans-serif",
    description: "Vibrant gradient header that showcases your personality.",
  },
  {
    id: "dark",
    name: "Dark Mode",
    tags: ["Creative", "Bold"],
    accent: "#00e676",
    headerBg: "#0a0a0f",
    headerText: "#ffffff",
    bodyBg: "#121218",
    titleStyle: "text-2xl font-semibold",
    fontFamily: "'SF Mono', 'Fira Code', monospace",
    description: "Sleek dark theme. Stands out in any inbox.",
  },
  {
    id: "stripe",
    name: "Stripe-Inspired",
    tags: ["Minimal", "Professional"],
    accent: "#635bff",
    headerBg: "#ffffff",
    headerText: "#0a2540",
    bodyBg: "#ffffff",
    titleStyle: "text-xl font-semibold",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    description: "Inspired by modern SaaS billing. Ultra-clean and professional.",
  },
];

const STYLE_FILTERS: StyleTag[] = ["All", "Minimal", "Professional", "Creative", "Bold"];

/* ------------------------------------------------------------------ */
/*  Sample Data for Previews                                           */
/* ------------------------------------------------------------------ */

const SAMPLE = {
  businessName: "Acme Design Studio",
  businessAddress: "123 Creative Ave, Suite 100",
  clientName: "Blue Sky Corp",
  invoiceNumber: "INV-2025-0042",
  date: "Jan 15, 2025",
  dueDate: "Feb 14, 2025",
  items: [
    { desc: "Brand Identity Design", qty: 1, rate: 3500 },
    { desc: "Website UI/UX Design", qty: 1, rate: 5200 },
    { desc: "Social Media Kit", qty: 1, rate: 1800 },
  ],
  subtotal: 10500,
  tax: 866.25,
  total: 11366.25,
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function InvoiceTemplatesPage() {
  const [activeFilter, setActiveFilter] = useState<StyleTag>("All");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filtered =
    activeFilter === "All"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.tags.includes(activeFilter));

  return (
    <>
      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />

      <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-[family-name:var(--font-geist-sans)]">
        {/* Breadcrumb */}
        <nav className="border-b border-white/5 bg-[#0e0e18]">
          <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
            <a href="/" className="hover:text-[#7c6cf0] transition">PrestoKit</a>
            <span>/</span>
            <a href="/tools" className="hover:text-[#7c6cf0] transition">Tools</a>
            <span>/</span>
            <span className="text-gray-300">Invoice Templates</span>
          </div>
        </nav>

        {/* Header */}
        <header className="mx-auto max-w-7xl px-4 pt-10 pb-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Invoice Templates
          </h1>
          <p className="mt-2 text-gray-400 max-w-2xl">
            Browse 10 professionally designed invoice templates. Preview each style, then use it with our free invoice generator to create and download your invoice as PDF.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="mx-auto max-w-7xl px-4 pb-8">
          <div className="flex flex-wrap gap-2">
            {STYLE_FILTERS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeFilter === tag
                    ? "bg-[#7c6cf0]/20 text-[#7c6cf0] border border-[#7c6cf0]/40"
                    : "bg-transparent text-gray-500 border border-[#1e1e2e] hover:border-white/10 hover:text-gray-300"
                }`}
              >
                {tag}
                {activeFilter === tag && tag !== "All" && (
                  <span className="ml-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#7c6cf0]/30 px-1 text-xs font-bold text-[#7c6cf0]">
                    {TEMPLATES.filter((t) => t.tags.includes(tag)).length}
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Showing {filtered.length} of {TEMPLATES.length} templates
          </p>
        </div>

        {/* Template Grid */}
        <main className="mx-auto max-w-7xl px-4 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className="group text-left rounded-2xl border border-white/5 bg-[#1a1a26] overflow-hidden hover:border-[#7c6cf0]/40 transition-all duration-200 hover:shadow-[0_0_30px_rgba(124,108,240,0.08)] hover:-translate-y-0.5"
              >
                {/* Mini Invoice Preview */}
                <div className="relative h-48 overflow-hidden">
                  <MiniPreview template={template} />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="bg-[#7c6cf0] text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-lg">
                      Preview Template
                    </span>
                  </div>
                </div>
                {/* Card Info */}
                <div className="p-4">
                  <h3 className="text-base font-semibold text-white">{template.name}</h3>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium bg-[#7c6cf0]/12 text-[#7c6cf0]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-gray-500 leading-relaxed">{template.description}</p>
                </div>
              </button>
            ))}
          </div>
        </main>

        {/* Template Preview Modal */}
        {selectedTemplate && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedTemplate(null)}
          >
            <div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#12121c] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-[#12121c] px-6 py-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">{selectedTemplate.name} Template</h2>
                  <p className="text-sm text-gray-500">{selectedTemplate.description}</p>
                </div>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18" /><path d="M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Full Invoice Preview */}
              <div className="p-6">
                <FullPreview template={selectedTemplate} />
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 flex items-center justify-between border-t border-white/5 bg-[#12121c] px-6 py-4">
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="rounded-xl border border-white/10 bg-[#1a1a26] px-5 py-2.5 text-sm font-medium text-gray-300 hover:border-white/20 hover:text-white transition"
                >
                  Back to Gallery
                </button>
                <a
                  href="/tools/invoice-generator"
                  className="flex items-center gap-2 rounded-xl bg-[#00e676] px-6 py-2.5 text-sm font-semibold text-black hover:bg-[#00c864] transition shadow-lg shadow-[#00e676]/20"
                >
                  Use This Template
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* How It Works */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-2">How It Works</h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            Pick a template, customize it, and download your invoice in minutes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Browse Templates",
                desc: "Explore 10 professionally designed invoice templates. Filter by style — Minimal, Professional, Creative, or Bold — to find the perfect fit for your brand.",
              },
              {
                step: "2",
                title: "Preview & Select",
                desc: "Click any template to see a full-size preview with sample data. Get a feel for how the design looks with real invoice content before committing.",
              },
              {
                step: "3",
                title: "Customize & Download",
                desc: "Hit \"Use This Template\" to open the invoice generator pre-styled with your chosen design. Fill in your details and download as PDF.",
              },
            ].map((item) => (
              <div key={item.step} className="relative rounded-2xl border border-white/5 bg-[#1a1a26] p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#7c6cf0]/15 text-[#7c6cf0] text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto">
            Everything you need to know about our free invoice templates.
          </p>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <section className="mx-auto max-w-7xl px-4 py-16 border-t border-white/5">
          <h2 className="text-2xl font-bold text-center mb-2">Related Tools</h2>
          <p className="text-gray-400 text-center mb-10">More free business tools to help you get things done.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RELATED_TOOLS.map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                className="group rounded-2xl border border-white/5 bg-[#1a1a26] p-5 hover:border-[#7c6cf0]/40 transition-all duration-200 hover:shadow-[0_0_30px_rgba(124,108,240,0.08)]"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c6cf0]/10">
                  <svg className="h-5 w-5 text-[#7c6cf0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-[#7c6cf0] transition-colors">{tool.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Mini Preview Component (Card Thumbnail)                            */
/* ------------------------------------------------------------------ */

function MiniPreview({ template }: { template: Template }) {
  const isGradient = template.headerBg.includes("gradient");
  const isDark = template.id === "dark";

  return (
    <div
      className="h-full w-full p-3"
      style={{
        backgroundColor: isDark ? template.bodyBg : "#f8f8fc",
        fontFamily: template.fontFamily,
      }}
    >
      {/* Mini header */}
      <div
        className="rounded-t-md px-3 py-2 mb-2"
        style={
          isGradient
            ? { background: template.headerBg, color: template.headerText }
            : { backgroundColor: template.headerBg, color: template.headerText }
        }
      >
        <div className={template.titleStyle} style={{ fontSize: "10px", lineHeight: "1.2" }}>
          INVOICE
        </div>
        <div style={{ fontSize: "6px", opacity: 0.7, marginTop: "2px" }}>#INV-2025-0042</div>
      </div>

      {/* Mini body */}
      <div
        className="rounded-b-md px-3 py-2 space-y-1.5"
        style={{ backgroundColor: template.bodyBg, color: isDark ? "#e0e0e0" : "#333" }}
      >
        {/* From / To */}
        <div className="flex justify-between" style={{ fontSize: "5px" }}>
          <div>
            <div style={{ fontWeight: 600, color: template.accent, fontSize: "5px" }}>FROM</div>
            <div>Acme Design Studio</div>
          </div>
          <div className="text-right">
            <div style={{ fontWeight: 600, color: template.accent, fontSize: "5px" }}>BILL TO</div>
            <div>Blue Sky Corp</div>
          </div>
        </div>

        {/* Mini table */}
        <div style={{ fontSize: "5px" }}>
          <div className="flex justify-between font-semibold py-0.5" style={{ borderBottom: `1px solid ${template.accent}40` }}>
            <span>Item</span><span>Amount</span>
          </div>
          <div className="flex justify-between py-0.5" style={{ opacity: 0.7 }}>
            <span>Brand Identity Design</span><span>$3,500</span>
          </div>
          <div className="flex justify-between py-0.5" style={{ opacity: 0.7 }}>
            <span>Website UI/UX Design</span><span>$5,200</span>
          </div>
          <div className="flex justify-between py-0.5" style={{ opacity: 0.7 }}>
            <span>Social Media Kit</span><span>$1,800</span>
          </div>
        </div>

        {/* Total */}
        <div
          className="flex justify-between font-bold pt-1"
          style={{ borderTop: `1.5px solid ${template.accent}`, fontSize: "7px" }}
        >
          <span>Total</span>
          <span style={{ color: template.accent }}>$11,366.25</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Full Preview Component (Modal)                                     */
/* ------------------------------------------------------------------ */

function FullPreview({ template }: { template: Template }) {
  const isGradient = template.headerBg.includes("gradient");
  const isDark = template.id === "dark";

  return (
    <div
      className="rounded-xl overflow-hidden shadow-2xl shadow-black/40"
      style={{ fontFamily: template.fontFamily }}
    >
      {/* Header */}
      <div
        className="px-8 py-6"
        style={
          isGradient
            ? { background: template.headerBg, color: template.headerText }
            : { backgroundColor: template.headerBg, color: template.headerText }
        }
      >
        <div className="flex justify-between items-start">
          <div>
            <div className={template.titleStyle}>INVOICE</div>
            <p style={{ opacity: 0.7, fontSize: "13px", marginTop: "4px" }}>{SAMPLE.invoiceNumber}</p>
          </div>
          <div className="text-right text-sm" style={{ opacity: 0.8 }}>
            <p><span style={{ fontWeight: 600 }}>Date:</span> {SAMPLE.date}</p>
            <p><span style={{ fontWeight: 600 }}>Due:</span> {SAMPLE.dueDate}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        className="px-8 py-6"
        style={{ backgroundColor: template.bodyBg, color: isDark ? "#e0e0ea" : "#333" }}
      >
        {/* From / To */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: template.accent, fontWeight: 600 }}>
              From
            </p>
            <p className="font-semibold" style={{ color: isDark ? "#fff" : "#111" }}>{SAMPLE.businessName}</p>
            <p className="text-sm" style={{ opacity: 0.6 }}>{SAMPLE.businessAddress}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: template.accent, fontWeight: 600 }}>
              Bill To
            </p>
            <p className="font-semibold" style={{ color: isDark ? "#fff" : "#111" }}>{SAMPLE.clientName}</p>
            <p className="text-sm" style={{ opacity: 0.6 }}>456 Business Blvd, Floor 12</p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full text-sm mb-8">
          <thead>
            <tr style={{ borderBottom: `2px solid ${template.accent}` }}>
              <th className="pb-2 text-left font-semibold" style={{ color: isDark ? "#fff" : "#333" }}>Description</th>
              <th className="pb-2 text-center font-semibold w-16" style={{ color: isDark ? "#fff" : "#333" }}>Qty</th>
              <th className="pb-2 text-right font-semibold w-24" style={{ color: isDark ? "#fff" : "#333" }}>Rate</th>
              <th className="pb-2 text-right font-semibold w-24" style={{ color: isDark ? "#fff" : "#333" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE.items.map((item, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor:
                    isDark
                      ? i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent"
                      : i % 2 === 0 ? `${template.accent}08` : "transparent",
                }}
              >
                <td className="py-2.5 px-1">{item.desc}</td>
                <td className="py-2.5 text-center" style={{ opacity: 0.7 }}>{item.qty}</td>
                <td className="py-2.5 text-right" style={{ opacity: 0.7 }}>${item.rate.toLocaleString()}.00</td>
                <td className="py-2.5 text-right font-medium">${(item.qty * item.rate).toLocaleString()}.00</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-6">
          <div className="w-60 text-sm space-y-1.5">
            <div className="flex justify-between" style={{ opacity: 0.7 }}>
              <span>Subtotal</span>
              <span>${SAMPLE.subtotal.toLocaleString()}.00</span>
            </div>
            <div className="flex justify-between" style={{ opacity: 0.7 }}>
              <span>Tax (8.25%)</span>
              <span>${SAMPLE.tax.toLocaleString()}</span>
            </div>
            <div
              className="flex justify-between font-bold text-lg pt-2 mt-2"
              style={{ borderTop: `2px solid ${template.accent}`, color: template.accent }}
            >
              <span>Total</span>
              <span>${SAMPLE.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e0e0e0"}`, paddingTop: "16px" }}>
          <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: template.accent, fontWeight: 600 }}>
            Notes / Terms
          </p>
          <p className="text-sm" style={{ opacity: 0.6 }}>
            Payment is due within 30 days. Please include the invoice number with your payment. Thank you for your business!
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] mt-8" style={{ opacity: 0.3 }}>
          Generated with PrestoKit — free business tools
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Accordion Item                                                 */
/* ------------------------------------------------------------------ */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/5 bg-[#1a1a26] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[#1e1e2e] transition-colors"
      >
        <span className="text-sm font-medium text-gray-200 pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">{answer}</div>
      )}
    </div>
  );
}

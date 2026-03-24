import Link from "next/link";
import Script from "next/script";

/* ──────────────────── Data ──────────────────── */

interface Tool {
  name: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  comingSoon?: boolean;
}

const tools: Tool[] = [
  {
    name: "Invoice Generator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="16" y2="17" />
        <line x1="8" y1="9" x2="10" y2="9" />
      </svg>
    ),
    description:
      "Create professional invoices in seconds. Download as PDF instantly.",
    href: "/tools/invoice-generator",
    color: "#448aff",
  },
  {
    name: "QR Code Generator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="2" width="8" height="8" rx="1" />
        <rect x="14" y="2" width="8" height="8" rx="1" />
        <rect x="2" y="14" width="8" height="8" rx="1" />
        <rect x="14" y="14" width="4" height="4" rx="0.5" />
        <line x1="22" y1="14" x2="22" y2="18" />
        <line x1="18" y1="22" x2="22" y2="22" />
        <rect x="5" y="5" width="2" height="2" />
        <rect x="17" y="5" width="2" height="2" />
        <rect x="5" y="17" width="2" height="2" />
      </svg>
    ),
    description:
      "Generate QR codes for URLs, text, WiFi, contacts, and more.",
    href: "/tools/qr-code-generator",
    color: "#00e676",
  },
  {
    name: "Email Signature Creator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="22 7 12 13 2 7" />
      </svg>
    ),
    description:
      "Build beautiful HTML email signatures for Gmail, Outlook, and Apple Mail.",
    href: "/tools/email-signature-creator",
    color: "#7c6cf0",
  },
  {
    name: "Business Name Generator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
      </svg>
    ),
    description:
      "AI-powered business name ideas with instant domain availability checks.",
    href: "/tools/business-name-generator",
    color: "#ff9100",
  },
  {
    name: "Profit Margin Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <polyline points="4 10 12 4 20 8" />
      </svg>
    ),
    description:
      "Calculate profit margins, markups, and break-even points instantly.",
    href: "/tools/profit-margin-calculator",
    color: "#18ffff",
  },
  {
    name: "Receipt Maker",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2-3-2z" />
        <line x1="8" y1="8" x2="16" y2="8" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="16" x2="12" y2="16" />
      </svg>
    ),
    description:
      "Generate professional receipts for transactions and record-keeping.",
    href: "/tools/receipt-maker",
    color: "#ff4081",
  },
  {
    name: "Estimate Builder",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="M9 12l2 2 4-4" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    ),
    description:
      "Build detailed project estimates and quotes for your clients.",
    href: "/tools/estimate-builder",
    color: "#ffd740",
  },
  {
    name: "Pay Stub Creator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="6" y1="14" x2="10" y2="14" />
        <line x1="14" y1="14" x2="18" y2="14" />
      </svg>
    ),
    description:
      "Create pay stubs for employees and contractors in minutes.",
    href: "/tools/pay-stub-creator",
    color: "#26a69a",
  },
  {
    name: "Password Generator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" />
      </svg>
    ),
    description:
      "Generate secure random passwords with custom length and complexity.",
    href: "/tools/password-generator",
    color: "#e040fb",
  },
  {
    name: "Word Counter",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4 7h16" />
        <path d="M4 11h16" />
        <path d="M4 15h10" />
        <path d="M4 19h7" />
        <path d="M18 14l2 2 2-2" />
        <path d="M20 16v4" />
      </svg>
    ),
    description:
      "Count words, characters, sentences, and get reading time estimates.",
    href: "/tools/word-counter",
    color: "#64ffda",
  },
  {
    name: "Lorem Ipsum Generator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 0 0-2-2H3" />
        <path d="M19 17V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2h12v2" />
        <line x1="8" y1="7" x2="14" y2="7" />
        <line x1="12" y1="11" x2="18" y2="11" />
        <line x1="12" y1="15" x2="18" y2="15" />
      </svg>
    ),
    description:
      "Generate placeholder text for your designs and mockups instantly.",
    href: "/tools/lorem-ipsum-generator",
    color: "#ffab91",
  },
  {
    name: "Percentage Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <line x1="19" y1="5" x2="5" y2="19" />
        <circle cx="6.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    ),
    description:
      "Calculate percentages, percentage change, increase, and decrease.",
    href: "/tools/percentage-calculator",
    color: "#80d8ff",
  },
  {
    name: "Text Case Converter",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
    description:
      "Convert text between UPPER, lower, Title, camelCase, snake_case, and more.",
    href: "/tools/text-case-converter",
    color: "#b388ff",
  },
  {
    name: "Color Palette Generator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2 0-.53-.21-1.01-.55-1.36-.33-.35-.55-.83-.55-1.36 0-1.1.9-2 2-2h2.34C19.88 15.28 22 13.12 22 10.28 22 5.62 17.52 2 12 2z" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
        <circle cx="12" cy="6" r="1.5" fill="currentColor" />
        <circle cx="16" cy="8" r="1.5" fill="currentColor" />
        <circle cx="7" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    description:
      "Generate beautiful color palettes with harmony modes and CSS export.",
    href: "/tools/color-palette-generator",
    color: "#ff6e40",
  },
  {
    name: "JSON Formatter",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
    description:
      "Format, validate, and minify JSON with syntax highlighting.",
    href: "/tools/json-formatter",
    color: "#40c4ff",
  },
  {
    name: "Markdown to HTML",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M7 8v8l2.5-3 2.5 3V8" />
        <path d="M17 12l-2-2v4l2-2z" fill="currentColor" />
      </svg>
    ),
    description:
      "Convert Markdown to HTML with live preview and instant copy.",
    href: "/tools/markdown-to-html",
    color: "#69f0ae",
  },
  {
    name: "Image Compressor",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    description:
      "Compress images in your browser. No upload needed, 100% private.",
    href: "/tools/image-compressor",
    color: "#ff7043",
  },
  {
    name: "Unit Converter",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 5h18" />
        <polyline points="7 15 3 19 7 23" />
        <path d="M21 19H3" />
      </svg>
    ),
    description:
      "Convert between units of length, weight, temperature, volume, and more.",
    href: "/tools/unit-converter",
    color: "#7986cb",
  },
  {
    name: "Tip Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="8" cy="18" r="3" />
        <circle cx="16" cy="18" r="3" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <path d="M9 6h6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    description:
      "Calculate tips and split bills between any number of people.",
    href: "/tools/tip-calculator",
    color: "#4db6ac",
  },
  {
    name: "Date Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <rect x="7" y="14" width="3" height="3" rx="0.5" />
      </svg>
    ),
    description:
      "Calculate days between dates, add/subtract days, and countdown timers.",
    href: "/tools/date-calculator",
    color: "#f06292",
  },
  {
    name: "Mortgage Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    description:
      "Calculate monthly mortgage payments with amortization schedule.",
    href: "/tools/mortgage-calculator",
    color: "#aed581",
  },
  {
    name: "BMI Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M16 2v4M8 2v4" />
        <rect x="3" y="6" width="18" height="4" rx="1" />
        <path d="M12 14v4" />
        <path d="M8 22h8" />
        <path d="M12 18h0" />
      </svg>
    ),
    description:
      "Calculate your Body Mass Index with Imperial or Metric units.",
    href: "/tools/bmi-calculator",
    color: "#4fc3f7",
  },
  {
    name: "Salary Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="6" width="20" height="14" rx="2" />
        <path d="M22 10H2" />
        <path d="M17 14h2" />
        <path d="M12 4v2" />
        <circle cx="12" cy="16" r="0" />
      </svg>
    ),
    description:
      "Convert between salary, hourly, daily, and monthly rates with tax estimates.",
    href: "/tools/salary-calculator",
    color: "#fff176",
  },
  {
    name: "Random Number Generator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <circle cx="7.5" cy="7.5" r="1" />
        <circle cx="16.5" cy="7.5" r="1" />
        <circle cx="7.5" cy="16.5" r="1" />
        <circle cx="16.5" cy="16.5" r="1" />
        <circle cx="12" cy="12" r="1" />
      </svg>
    ),
    description:
      "Generate random numbers, roll dice, flip coins, and pick from lists.",
    href: "/tools/random-number-generator",
    color: "#ce93d8",
  },
  {
    name: "Invoice Templates",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="6" y="4" width="14" height="17" rx="2" />
        <rect x="4" y="2" width="14" height="17" rx="2" />
        <path d="M8 8h6" />
        <path d="M8 12h8" />
        <path d="M8 16h4" />
      </svg>
    ),
    description:
      "Browse 10 professional invoice template designs. Pick your style.",
    href: "/tools/invoice-templates",
    color: "#90a4ae",
  },
  {
    name: "Contract Generator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M12 18v-6" />
        <path d="M9.5 15.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5" />
        <line x1="8" y1="13" x2="16" y2="13" />
      </svg>
    ),
    description:
      "Generate freelance contracts, NDAs, and service agreements instantly.",
    href: "/tools/contract-generator",
    color: "#a1887f",
  },
  {
    name: "Time Zone Converter",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    description:
      "Convert times between 22 time zones. Compare up to 4 zones at once.",
    href: "/tools/timezone-converter",
    color: "#4dd0e1",
  },
  {
    name: "ROI Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    description:
      "Calculate return on investment, compound growth, and marketing ROI.",
    href: "/tools/roi-calculator",
    color: "#81c784",
  },
  {
    name: "Tax Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-4h6v4" />
        <line x1="9" y1="10" x2="9" y2="10.01" />
        <line x1="15" y1="10" x2="15" y2="10.01" />
        <line x1="9" y1="14" x2="9" y2="14.01" />
        <line x1="15" y1="14" x2="15" y2="14.01" />
      </svg>
    ),
    description:
      "Estimate federal income tax by bracket. See effective and marginal tax rates.",
    href: "/tools/tax-calculator",
    color: "#ef5350",
  },
  {
    name: "Compound Interest Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-6 4 3 5-7" />
      </svg>
    ),
    description:
      "Calculate compound interest with contributions and visualize growth over time.",
    href: "/tools/compound-interest-calculator",
    color: "#ff9100",
  },
  {
    name: "Paycheck Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
        <line x1="5" y1="15" x2="9" y2="15" />
        <line x1="13" y1="15" x2="15" y2="15" />
      </svg>
    ),
    description:
      "Estimate take-home pay after federal, state, Social Security, and Medicare taxes.",
    href: "/tools/paycheck-calculator",
    color: "#26c6da",
  },
  {
    name: "Business Card Generator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <circle cx="8" cy="11" r="2" />
        <path d="M14 10h4" />
        <path d="M14 14h4" />
        <path d="M5 16c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2" />
      </svg>
    ),
    description:
      "Design professional business cards and download as high-resolution PNG.",
    href: "/tools/business-card-generator",
    color: "#ab47bc",
  },
  {
    name: "Privacy Policy Generator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    description:
      "Generate a privacy policy for your website covering GDPR, CCPA, and cookies.",
    href: "/tools/privacy-policy-generator",
    color: "#5c6bc0",
  },
  {
    name: "Age Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M8 2v2" />
        <path d="M12 2v2" />
        <path d="M16 2v2" />
        <rect x="4" y="6" width="16" height="16" rx="3" />
        <path d="M8 14h.01" />
        <path d="M12 14h.01" />
        <path d="M16 14h.01" />
        <path d="M8 10h8" />
      </svg>
    ),
    description:
      "Calculate your exact age in years, months, days, hours. Birthday countdown included.",
    href: "/tools/age-calculator",
    color: "#f48fb1",
  },
  {
    name: "GPA Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
      </svg>
    ),
    description:
      "Calculate weighted and unweighted GPA with multiple grading scales.",
    href: "/tools/gpa-calculator",
    color: "#9575cd",
  },
  {
    name: "Discount Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
    description:
      "Calculate sale prices, savings, and percent off. Stack discounts and add tax.",
    href: "/tools/discount-calculator",
    color: "#e57373",
  },
  {
    name: "Loan Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 21h18" />
        <path d="M3 7V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
        <line x1="3" y1="7" x2="21" y2="7" />
        <path d="M6 7v14" />
        <path d="M18 7v14" />
        <path d="M10 11v2" />
        <path d="M14 11v2" />
      </svg>
    ),
    description:
      "Calculate monthly loan payments, total interest, and view amortization schedule.",
    href: "/tools/loan-calculator",
    color: "#4db6ac",
  },
  {
    name: "Character Counter",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <line x1="4" y1="9" x2="20" y2="9" />
        <line x1="4" y1="15" x2="20" y2="15" />
        <line x1="10" y1="3" x2="8" y2="21" />
        <line x1="16" y1="3" x2="14" y2="21" />
      </svg>
    ),
    description:
      "Count characters with limits for Twitter, Instagram, YouTube, LinkedIn, and more.",
    href: "/tools/character-counter",
    color: "#7986cb",
  },
  {
    name: "Hashtag Generator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M10 3L6 21" />
        <path d="M18 3l-4 18" />
        <path d="M4 9h18" />
        <path d="M2 15h18" />
        <circle cx="20" cy="5" r="2" fill="currentColor" />
      </svg>
    ),
    description:
      "Generate trending hashtags for Instagram, TikTok, and Twitter by topic.",
    href: "/tools/hashtag-generator",
    color: "#e040fb",
  },
  {
    name: "Resume Builder",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <circle cx="12" cy="13" r="2" />
        <path d="M8 18c0-1.66 1.79-3 4-3s4 1.34 4 3" />
      </svg>
    ),
    description:
      "Build a professional resume with live preview. Print or save as PDF instantly.",
    href: "/tools/resume-builder",
    color: "#42a5f5",
  },
  {
    name: "Fuel Cost Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 22V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
        <path d="M15 10h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2v0" />
        <path d="M21 7l-2 2" />
        <rect x="5" y="8" width="8" height="5" rx="1" />
        <line x1="3" y1="22" x2="15" y2="22" />
      </svg>
    ),
    description:
      "Calculate gas cost for any trip by distance, MPG, and fuel price.",
    href: "/tools/fuel-cost-calculator",
    color: "#66bb6a",
  },
  {
    name: "Screen Resolution Checker",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    description:
      "Check your screen resolution, DPI, aspect ratio, and device pixel ratio.",
    href: "/tools/screen-resolution-checker",
    color: "#29b6f6",
  },
  {
    name: "Regex Tester",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    description:
      "Test regular expressions with live matching, highlighting, and capture groups.",
    href: "/tools/regex-tester",
    color: "#ff7043",
  },
  {
    name: "Sales Tax Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4 7V4h16v3" />
        <path d="M9 20h6" />
        <path d="M12 4v16" />
        <path d="M5 11h3l2 2 4-4 2 2h3" />
      </svg>
    ),
    description:
      "Calculate sales tax by state. 50 US state presets with quick comparison table.",
    href: "/tools/sales-tax-calculator",
    color: "#ef5350",
  },
  {
    name: "Self-Employment Tax Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M17 11l2 2 4-4" />
      </svg>
    ),
    description:
      "Calculate self-employment tax for freelancers and 1099 workers with quarterly estimates.",
    href: "/tools/self-employment-tax-calculator",
    color: "#ff9800",
  },
  {
    name: "Hourly to Salary Converter",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    description:
      "Convert hourly rate to annual salary, monthly, biweekly, and weekly pay instantly.",
    href: "/tools/hourly-to-salary",
    color: "#66bb6a",
  },
  {
    name: "Currency Converter",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9.354a4 4 0 1 0 0 5.292" />
        <path d="M9.5 7.5h5" /><path d="M9.5 16.5h5" />
      </svg>
    ),
    description:
      "Convert between 15 major world currencies with live approximate exchange rates.",
    href: "/tools/currency-converter",
    color: "#ffd740",
  },
  {
    name: "Square Footage Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <path d="M3 9h18" /><path d="M9 3v18" />
        <path d="M14 14h3v3" />
      </svg>
    ),
    description:
      "Calculate area for any shape — rectangle, triangle, circle, trapezoid. Convert to sq meters and acres.",
    href: "/tools/square-footage-calculator",
    color: "#a1887f",
  },
  {
    name: "Base64 Encoder / Decoder",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
    description:
      "Encode and decode Base64 strings instantly. Real-time conversion with copy button.",
    href: "/tools/base64-encoder",
    color: "#80cbc4",
  },
  {
    name: "Break Even Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 3v18h18" />
        <path d="M3 17l7-7 4 4 7-10" />
        <circle cx="21" cy="4" r="2" />
      </svg>
    ),
    description:
      "Calculate your break-even point in units and revenue. Visualize profit at different volumes.",
    href: "/tools/break-even-calculator",
    color: "#81c784",
  },
  {
    name: "Meta Tag Generator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <path d="M12 2v4" /><path d="M12 18v4" />
      </svg>
    ),
    description:
      "Generate HTML meta tags, Open Graph, and Twitter Card tags. Preview your Google search result.",
    href: "/tools/meta-tag-generator",
    color: "#42a5f5",
  },
  {
    name: "Color Contrast Checker",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20" />
        <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    description:
      "Check WCAG color contrast ratios. Pass/fail for AA and AAA accessibility standards.",
    href: "/tools/color-contrast-checker",
    color: "#7e57c2",
  },
  {
    name: "Electricity Cost Calculator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    description:
      "Calculate electricity costs by wattage and usage. Compare appliance costs daily, monthly, yearly.",
    href: "/tools/electricity-cost-calculator",
    color: "#ffc107",
  },
  {
    name: "URL Encoder / Decoder",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    description:
      "Encode and decode URLs with percent-encoding. Real-time conversion with copy button.",
    href: "/tools/url-encoder",
    color: "#26a69a",
  },
  {
    name: "HTML Entity Encoder",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    description:
      "Encode and decode HTML entities. Handle &amp; &lt; &gt; and all special characters.",
    href: "/tools/html-entity-encoder",
    color: "#ef6c00",
  },
  {
    name: "Unix Timestamp Converter",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
        <path d="M2 12h2" /><path d="M20 12h2" />
      </svg>
    ),
    description:
      "Convert Unix timestamps to dates and back. Live current timestamp with auto-update.",
    href: "/tools/timestamp-converter",
    color: "#78909c",
  },
  {
    name: "CSS Gradient Generator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 3l18 18" />
        <path d="M21 3L3 21" />
      </svg>
    ),
    description:
      "Create beautiful CSS gradients with color pickers, direction control, and preset gallery.",
    href: "/tools/gradient-generator",
    color: "#ec407a",
  },
  {
    name: "Business Slogan Generator",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M13 8H7" /><path d="M17 12H7" />
      </svg>
    ),
    description:
      "Generate catchy slogans and taglines for your business. 24 variations per click.",
    href: "/tools/slogan-generator",
    color: "#ab47bc",
  },
];

const valueProps = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Instant. No Signup.",
    description:
      "Every tool works immediately. No accounts, no email gates, no friction.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12l2 2 4-4" />
      </svg>
    ),
    title: "100% Free Forever",
    description:
      'No hidden fees. No "free trials" that auto-charge. Core tools are free, period.',
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Professional Quality",
    description:
      "Every output looks like it came from expensive software. Impress your clients.",
  },
];

/* ──────────────────── JSON-LD Structured Data ──────────────────── */

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PrestoKit",
  url: "https://prestokit.com",
  description:
    "Free instant business tools — invoice generator, QR code generator, email signature creator, and more. No signup required.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://prestokit.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const toolsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Business Tools",
  numberOfItems: tools.length,
  itemListElement: tools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.name,
    url: `https://prestokit.com${tool.href}`,
  })),
};

/* ──────────────────── Page ──────────────────── */

export default function Home() {
  return (
    <>
      {/* Structured Data */}
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="tools-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsSchema) }}
        strategy="afterInteractive"
      />

      <div role="main">
        {/* ─── Hero ─── */}
        <section className="relative isolate overflow-hidden">
          {/* Animated background glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full blur-[120px] animate-hero-glow"
            style={{ background: "radial-gradient(circle, rgba(255, 107, 74, 0.10) 0%, rgba(245, 158, 11, 0.05) 50%, transparent 100%)" }}
          />
          {/* Secondary glow orb */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-1/4 top-1/3 -z-10 h-[300px] w-[300px] rounded-full blur-[100px] animate-hero-glow-alt"
            style={{ background: "radial-gradient(circle, rgba(45, 212, 191, 0.06) 0%, transparent 70%)" }}
          />

          <div className="mx-auto max-w-5xl px-6 pb-8 pt-10 text-center sm:pt-12 lg:pt-14">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-card/60 px-4 py-1.5 text-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-muted-light">
                <span className="font-semibold text-white">58</span> free tools
                &mdash; zero signup
              </span>
            </div>

            <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
              Free Business Tools
              <br />
              <span className="text-gradient-primary">That Just Work</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-muted-light sm:text-lg">
              Invoice Generator, QR Code Creator, Email Signatures, Profit
              Calculator, and more &mdash; all free, instant, no signup
              required.
            </p>

            {/* Single CTA */}
            <div className="mt-7">
              <Link
                href="/#tools"
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Browse Tools
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Tools Grid ─── */}
        <section
          id="tools"
          className="scroll-mt-20 border-t border-brand-border bg-brand-darker/50"
        >
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
            {/* Section header */}
            <div className="text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
                <span>{tools.length} Tools</span>
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                58 Free Tools, Zero Signup
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-light">
                Professional-grade business tools, completely free. Pick one and
                get started in seconds.
              </p>
            </div>

            <div className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {tools.map((tool) => (
                <ToolCard key={tool.href} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Why PrestoKit ─── */}
        <section
          id="why"
          className="scroll-mt-20 border-t border-brand-border"
        >
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Why PrestoKit?
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Built different, on purpose
              </h2>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {valueProps.map((prop) => (
                <article
                  key={prop.title}
                  className="group rounded-2xl border border-brand-border bg-brand-card/40 p-6 transition-all hover:border-brand-border-hover hover:bg-brand-card"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary-light transition-colors group-hover:bg-primary/20">
                    {prop.icon}
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    {prop.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {prop.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Pro Teaser ─── */}
        <section
          id="pro"
          className="scroll-mt-20 border-t border-brand-border bg-brand-darker/50"
        >
          <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
            <div className="relative overflow-hidden rounded-3xl border border-brand-border bg-brand-card/60 p-8 sm:p-12">
              {/* Background accent glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/10 blur-[80px]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent/5 blur-[80px]"
              />

              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Launch Special — 53% Off
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  PrestoKit{" "}
                  <span className="text-gradient-primary">Pro</span>
                </h2>

                <p className="mt-4 max-w-xl text-lg text-muted-light">
                  Supercharge your workflow with AI-powered tools, saved
                  templates, and premium features.
                </p>

                <ul className="mt-8 space-y-3">
                  {[
                    "AI-powered invoice writing and auto-fill",
                    "Save and reuse templates across all tools",
                    "Custom branding: your logo, colors, and fonts on every document",
                    "Bulk generation: create 100 QR codes or invoices at once",
                    "Priority access to new tools before everyone else",
                    "Export in every format: PDF, PNG, SVG, CSV",
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-muted-light"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="mt-0.5 flex-shrink-0 text-accent"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-muted line-through">
                      $19
                    </span>
                    <span className="text-4xl font-extrabold text-white">
                      $9
                    </span>
                    <span className="text-muted">/mo</span>
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent">
                      53% OFF
                    </span>
                  </div>
                  <Link
                    href="/pro"
                    className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                  >
                    Get Pro — Launch Special $9/mo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Request a Tool CTA ─── */}
        <section className="border-t border-brand-border">
          <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20 text-center">
            <div className="relative overflow-hidden rounded-3xl border border-brand-border bg-brand-card/40 p-8 sm:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 -z-10 h-40 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[80px]"
              />

              <div className="relative">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Need a specific tool?
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-muted-light">
                  We build new tools every week based on what you need. Tell us
                  what&apos;s missing and we&apos;ll build it.
                </p>

                <a
                  href="mailto:hello@prestokit.com?subject=Tool%20Request"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-brand-dark shadow-xl shadow-accent/20 transition-all hover:bg-accent-light hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-0.5"
                >
                  Request a Tool
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

/* ──────────────────── Components ──────────────────── */

function ToolCard({ tool }: { tool: Tool }) {
  const cardContent = (
    <>
      {/* Colored top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl transition-all duration-300 group-hover:h-[4px]"
        style={{ backgroundColor: tool.color }}
      />

      {/* Icon with colored background */}
      <div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${tool.color}15`, color: tool.color }}
      >
        {tool.icon}
      </div>

      <div className="flex items-center gap-2">
        <h3 className="text-base font-semibold text-white">{tool.name}</h3>
        {tool.comingSoon && (
          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-light">
            Soon
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {tool.description}
      </p>
      {!tool.comingSoon && (
        <div
          className="mt-4 flex items-center gap-1 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100"
          style={{ color: tool.color }}
        >
          Open tool
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </>
  );

  if (tool.comingSoon) {
    return (
      <div className="group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-card/40 p-6 opacity-60">
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      href={tool.href}
      className="group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-card/40 p-6 transition-all duration-300 hover:bg-brand-card hover:-translate-y-0.5"
      style={
        {
          "--card-color": tool.color,
        } as React.CSSProperties
      }
      onMouseEnter={undefined}
    >
      {/* Hover glow effect via CSS custom property */}
      <style>{`
        a[href="${tool.href}"]:hover {
          border-color: ${tool.color}40;
          box-shadow: 0 0 20px ${tool.color}15, 0 8px 32px ${tool.color}10;
        }
      `}</style>
      {cardContent}
    </Link>
  );
}

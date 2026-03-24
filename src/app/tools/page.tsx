"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Script from "next/script";

/* ──────────────────── Data ──────────────────── */

type Category =
  | "All"
  | "Business Documents"
  | "Generators"
  | "Calculators"
  | "Developer Tools"
  | "Text Tools";

interface Tool {
  name: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  category: Category;
  tags: string[];
}

const categories: Category[] = [
  "All",
  "Business Documents",
  "Generators",
  "Calculators",
  "Developer Tools",
  "Text Tools",
];

const categoryColors: Record<Category, string> = {
  All: "#7c6cf0",
  "Business Documents": "#448aff",
  Generators: "#00e676",
  Calculators: "#18ffff",
  "Developer Tools": "#40c4ff",
  "Text Tools": "#64ffda",
};

const tools: Tool[] = [
  {
    name: "Invoice Generator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h8" />
        <path d="M8 9h2" />
      </svg>
    ),
    description:
      "Create professional invoices in seconds. Add line items, tax, discounts, and download as PDF instantly.",
    href: "/tools/invoice-generator",
    color: "#448aff",
    category: "Business Documents",
    tags: ["invoice", "pdf", "billing", "freelance"],
  },
  {
    name: "Receipt Maker",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2-3-2Z" />
        <path d="M7 8h10" />
        <path d="M7 12h10" />
        <path d="M7 16h6" />
      </svg>
    ),
    description:
      "Generate professional receipts for transactions and record-keeping. Download as PDF.",
    href: "/tools/receipt-maker",
    color: "#ff4081",
    category: "Business Documents",
    tags: ["receipt", "transaction", "payment", "record"],
  },
  {
    name: "Estimate Builder",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 7h8" />
        <path d="M8 11h8" />
        <path d="M8 15h5" />
      </svg>
    ),
    description:
      "Build detailed project estimates and quotes for your clients. Professional formatting included.",
    href: "/tools/estimate-builder",
    color: "#ffd740",
    category: "Business Documents",
    tags: ["estimate", "quote", "proposal", "project"],
  },
  {
    name: "Pay Stub Creator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M12 12h.01" />
        <path d="M17 12h.01" />
        <path d="M7 12h.01" />
        <path d="M2 10h20" />
      </svg>
    ),
    description:
      "Create pay stubs for employees and contractors in minutes. All deductions calculated.",
    href: "/tools/pay-stub-creator",
    color: "#26a69a",
    category: "Business Documents",
    tags: ["paystub", "payroll", "salary", "employee"],
  },
  {
    name: "QR Code Generator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="3" height="3" />
        <rect x="18" y="14" width="3" height="3" />
        <rect x="14" y="18" width="3" height="3" />
        <rect x="18" y="18" width="3" height="3" />
      </svg>
    ),
    description:
      "Generate QR codes for URLs, text, WiFi, contacts, and more. Download as PNG or SVG.",
    href: "/tools/qr-code-generator",
    color: "#00e676",
    category: "Generators",
    tags: ["qr", "barcode", "url", "wifi", "contact"],
  },
  {
    name: "Business Name Generator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7Z" />
      </svg>
    ),
    description:
      "AI-powered business name ideas with instant domain availability checks.",
    href: "/tools/business-name-generator",
    color: "#ff9100",
    category: "Generators",
    tags: ["business name", "brand", "startup", "domain"],
  },
  {
    name: "Password Generator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" />
      </svg>
    ),
    description:
      "Generate secure random passwords with custom length, complexity, and special characters.",
    href: "/tools/password-generator",
    color: "#e040fb",
    category: "Generators",
    tags: ["password", "security", "random", "strong"],
  },
  {
    name: "Lorem Ipsum Generator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
        <path d="M19 17V5a2 2 0 0 0-2-2H4" />
      </svg>
    ),
    description:
      "Generate placeholder text for your designs and mockups. Paragraphs, sentences, or words.",
    href: "/tools/lorem-ipsum-generator",
    color: "#ffab91",
    category: "Generators",
    tags: ["lorem ipsum", "placeholder", "dummy text", "design"],
  },
  {
    name: "Color Palette Generator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="2.5" />
        <circle cx="6.5" cy="12" r="2.5" />
        <circle cx="8" cy="21" r="2" />
        <circle cx="19" cy="12" r="2.5" />
        <circle cx="15" cy="19" r="2.5" />
        <path d="M12 2a10 10 0 0 1 0 20 2 2 0 0 1 0-4 6 6 0 0 0 0-12 2 2 0 0 1 0-4Z" />
      </svg>
    ),
    description:
      "Generate beautiful color palettes with harmony modes, contrast checks, and CSS export.",
    href: "/tools/color-palette-generator",
    color: "#ff6e40",
    category: "Generators",
    tags: ["color", "palette", "design", "css", "hex"],
  },
  {
    name: "Email Signature Creator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    description:
      "Build beautiful HTML email signatures for Gmail, Outlook, and Apple Mail. One-click copy.",
    href: "/tools/email-signature-creator",
    color: "#7c6cf0",
    category: "Generators",
    tags: ["email", "signature", "html", "gmail", "outlook"],
  },
  {
    name: "Profit Margin Calculator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 5-9" />
      </svg>
    ),
    description:
      "Calculate profit margins, markups, and break-even points instantly. Visual charts included.",
    href: "/tools/profit-margin-calculator",
    color: "#18ffff",
    category: "Calculators",
    tags: ["profit", "margin", "markup", "break-even", "business"],
  },
  {
    name: "Percentage Calculator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="5" x2="5" y2="19" />
        <circle cx="6.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    ),
    description:
      "Calculate percentages, percentage change, increase, and decrease. Multiple calculation modes.",
    href: "/tools/percentage-calculator",
    color: "#80d8ff",
    category: "Calculators",
    tags: ["percentage", "percent", "math", "calculate"],
  },
  {
    name: "JSON Formatter",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 18l6-6-6-6" />
        <path d="M8 6l-6 6 6 6" />
      </svg>
    ),
    description:
      "Format, validate, and minify JSON with syntax highlighting. Detect errors instantly.",
    href: "/tools/json-formatter",
    color: "#40c4ff",
    category: "Developer Tools",
    tags: ["json", "format", "validate", "minify", "developer"],
  },
  {
    name: "Markdown to HTML",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
        <path d="m9 16 3-3 3 3" />
      </svg>
    ),
    description:
      "Convert Markdown to clean HTML with live preview and instant copy. Supports GFM.",
    href: "/tools/markdown-to-html",
    color: "#69f0ae",
    category: "Developer Tools",
    tags: ["markdown", "html", "convert", "preview", "developer"],
  },
  {
    name: "Text Case Converter",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18h5l2-7 2 7h5" />
        <path d="M5.5 12h5" />
        <path d="M17 6v12" />
        <path d="M14 6h6" />
      </svg>
    ),
    description:
      "Convert text between UPPER, lower, Title, camelCase, snake_case, kebab-case, and more.",
    href: "/tools/text-case-converter",
    color: "#b388ff",
    category: "Developer Tools",
    tags: ["text", "case", "convert", "camelCase", "snake_case"],
  },
  {
    name: "Word Counter",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7V4h16v3" />
        <path d="M9 20h6" />
        <path d="M12 4v16" />
      </svg>
    ),
    description:
      "Count words, characters, sentences, paragraphs, and get reading time estimates instantly.",
    href: "/tools/word-counter",
    color: "#64ffda",
    category: "Text Tools",
    tags: ["word count", "character count", "reading time", "writing"],
  },
  {
    name: "Invoice Templates",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
        <path d="M4 6h1" />
        <path d="M4 10h1" />
        <path d="M4 14h1" />
        <path d="M19 6h1" />
        <path d="M19 10h1" />
        <path d="M19 14h1" />
        <path d="M9 6h6" />
        <path d="M9 10h6" />
        <path d="M9 14h4" />
      </svg>
    ),
    description:
      "Browse 10 professionally designed invoice templates. Preview, customize, and download as PDF.",
    href: "/tools/invoice-templates",
    color: "#448aff",
    category: "Business Documents",
    tags: ["invoice template", "invoice design", "PDF template", "billing"],
  },
  {
    name: "Contract Generator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M12 18c1.5-2 3-2 4-1" />
        <path d="M8 18c1.5-2 3-2 4-1" />
      </svg>
    ),
    description:
      "Generate business contracts from professional templates. Freelance, NDA, contractor, and service agreements.",
    href: "/tools/contract-generator",
    color: "#ff6e40",
    category: "Business Documents",
    tags: ["contract", "agreement", "NDA", "freelance", "legal"],
  },
  {
    name: "Time Zone Converter",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
      </svg>
    ),
    description:
      "Convert times between time zones instantly. Compare up to 4 zones at once with DST support.",
    href: "/tools/timezone-converter",
    color: "#40c4ff",
    category: "Calculators",
    tags: ["timezone", "time zone", "convert", "world clock", "international"],
  },
  {
    name: "ROI Calculator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    description:
      "Calculate return on investment. Simple ROI, compound growth, and marketing ROI with ROAS.",
    href: "/tools/roi-calculator",
    color: "#00e676",
    category: "Calculators",
    tags: ["ROI", "return on investment", "ROAS", "marketing", "investment"],
  },
  {
    name: "Tax Calculator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    category: "Calculators",
    tags: ["tax", "income tax", "federal tax", "tax bracket", "IRS"],
  },
  {
    name: "Compound Interest Calculator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-6 4 3 5-7" />
      </svg>
    ),
    description:
      "Calculate compound interest with contributions and visualize growth over time.",
    href: "/tools/compound-interest-calculator",
    color: "#ff9100",
    category: "Calculators",
    tags: ["compound interest", "investment", "savings", "growth", "finance"],
  },
  {
    name: "Paycheck Calculator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    category: "Calculators",
    tags: ["paycheck", "take-home pay", "net pay", "withholding", "taxes"],
  },
  {
    name: "Tip Calculator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    category: "Calculators",
    tags: ["tip", "gratuity", "bill split", "restaurant", "dining"],
  },
  {
    name: "Date Calculator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    category: "Calculators",
    tags: ["date", "days between", "countdown", "calendar", "duration"],
  },
  {
    name: "Mortgage Calculator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    description:
      "Calculate monthly mortgage payments with amortization schedule.",
    href: "/tools/mortgage-calculator",
    color: "#aed581",
    category: "Calculators",
    tags: ["mortgage", "home loan", "amortization", "monthly payment", "housing"],
  },
  {
    name: "BMI Calculator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    category: "Calculators",
    tags: ["BMI", "body mass index", "health", "weight", "fitness"],
  },
  {
    name: "Salary Calculator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    category: "Calculators",
    tags: ["salary", "hourly rate", "annual pay", "wage", "compensation"],
  },
  {
    name: "Loan Calculator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    category: "Calculators",
    tags: ["loan", "interest", "amortization", "monthly payment", "debt"],
  },
  {
    name: "Discount Calculator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
    description:
      "Calculate sale prices, savings, and percent off. Stack discounts and add tax.",
    href: "/tools/discount-calculator",
    color: "#e57373",
    category: "Calculators",
    tags: ["discount", "sale", "percent off", "savings", "coupon"],
  },
  {
    name: "Age Calculator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    category: "Calculators",
    tags: ["age", "birthday", "countdown", "years old", "date of birth"],
  },
  {
    name: "GPA Calculator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
      </svg>
    ),
    description:
      "Calculate weighted and unweighted GPA with multiple grading scales.",
    href: "/tools/gpa-calculator",
    color: "#9575cd",
    category: "Calculators",
    tags: ["GPA", "grade point average", "college", "school", "grades"],
  },
  {
    name: "Fuel Cost Calculator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    category: "Calculators",
    tags: ["fuel", "gas", "trip cost", "MPG", "mileage"],
  },
  {
    name: "Sales Tax Calculator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    category: "Calculators",
    tags: ["sales tax", "state tax", "tax rate", "purchase tax", "US tax"],
  },
  {
    name: "Self-Employment Tax Calculator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M17 11l2 2 4-4" />
      </svg>
    ),
    description:
      "Calculate self-employment tax for freelancers and 1099 workers with quarterly estimates.",
    href: "/tools/self-employment-tax-calculator",
    color: "#ff9800",
    category: "Calculators",
    tags: ["self-employment", "freelance tax", "1099", "quarterly tax", "SE tax"],
  },
  {
    name: "Random Number Generator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    category: "Generators",
    tags: ["random", "dice", "coin flip", "number", "lottery"],
  },
  {
    name: "Business Card Generator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    category: "Generators",
    tags: ["business card", "card design", "networking", "print", "contact card"],
  },
  {
    name: "Privacy Policy Generator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    description:
      "Generate a privacy policy for your website covering GDPR, CCPA, and cookies.",
    href: "/tools/privacy-policy-generator",
    color: "#5c6bc0",
    category: "Generators",
    tags: ["privacy policy", "GDPR", "CCPA", "legal", "website policy"],
  },
  {
    name: "Hashtag Generator",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    category: "Generators",
    tags: ["hashtag", "Instagram", "TikTok", "Twitter", "social media"],
  },
  {
    name: "Resume Builder",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    category: "Generators",
    tags: ["resume", "CV", "job application", "career", "PDF resume"],
  },
  {
    name: "Hourly to Salary Converter",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    description:
      "Convert hourly rate to annual salary, monthly, biweekly, and weekly pay instantly.",
    href: "/tools/hourly-to-salary",
    color: "#66bb6a",
    category: "Generators",
    tags: ["hourly to salary", "wage converter", "pay rate", "annual salary", "income"],
  },
  {
    name: "Regex Tester",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    description:
      "Test regular expressions with live matching, highlighting, and capture groups.",
    href: "/tools/regex-tester",
    color: "#ff7043",
    category: "Developer Tools",
    tags: ["regex", "regular expression", "pattern matching", "developer", "testing"],
  },
  {
    name: "Screen Resolution Checker",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    description:
      "Check your screen resolution, DPI, aspect ratio, and device pixel ratio.",
    href: "/tools/screen-resolution-checker",
    color: "#29b6f6",
    category: "Developer Tools",
    tags: ["screen resolution", "DPI", "aspect ratio", "pixel ratio", "display"],
  },
  {
    name: "Character Counter",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    category: "Text Tools",
    tags: ["character count", "Twitter limit", "social media", "text length", "writing"],
  },
  {
    name: "Image Compressor",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    description:
      "Compress images in your browser. No upload needed, 100% private.",
    href: "/tools/image-compressor",
    color: "#ff7043",
    category: "Generators",
    tags: ["image compress", "optimize", "reduce size", "JPEG", "PNG"],
  },
  {
    name: "Unit Converter",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    category: "Calculators",
    tags: ["unit converter", "length", "weight", "temperature", "volume"],
  },
];

/* ──────────────────── JSON-LD ──────────────────── */

const toolsItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Online Business Tools",
  description:
    "A comprehensive collection of free online business tools — no signup required.",
  numberOfItems: tools.length,
  itemListElement: tools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.name,
    url: `https://prestokit.com${tool.href}`,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "PrestoKit",
      item: "https://prestokit.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: "https://prestokit.com/tools",
    },
  ],
};

/* ──────────────────── Page ──────────────────── */

export default function ToolsIndexPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "All" || tool.category === activeCategory;
      const query = search.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const toolCount = filteredTools.length;
  const totalCount = tools.length;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="tools-index-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsItemList) }}
        strategy="afterInteractive"
      />
      <Script
        id="tools-index-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="afterInteractive"
      />

      <div role="main">
        {/* ─── Hero Section ─── */}
        <section className="relative isolate overflow-hidden">
          {/* Animated background glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/5 blur-[120px] animate-hero-glow"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-1/4 top-1/3 -z-10 h-[300px] w-[300px] rounded-full bg-accent/5 blur-[100px] animate-hero-glow-alt"
          />

          <div className="mx-auto max-w-5xl px-6 pb-6 pt-10 sm:pt-12 lg:pt-14">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-2 text-sm text-muted"
            >
              <Link
                href="/"
                className="transition-colors hover:text-white"
              >
                PrestoKit
              </Link>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-dark"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
              <span className="text-white font-medium">Tools</span>
            </nav>

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-card/60 px-4 py-1.5 text-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-muted-light">
                <span className="font-semibold text-white">{totalCount}</span>{" "}
                free tools &mdash; zero signup
              </span>
            </div>

            <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
              Free Online{" "}
              <span className="text-gradient-primary">Business Tools</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-muted-light sm:text-lg">
              Every tool is 100% free, works instantly in your browser, and
              requires no signup or credit card. Professional results in
              seconds.
            </p>
          </div>
        </section>

        {/* ─── Search & Filter ─── */}
        <section className="border-t border-brand-border bg-brand-darker/50">
          <div className="mx-auto max-w-7xl px-6 pt-8 pb-2">
            {/* Search bar */}
            <div className="relative mx-auto max-w-xl">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search tools... (e.g. invoice, QR code, password)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-brand-border bg-brand-card/60 py-3.5 pl-11 pr-4 text-sm text-white placeholder-muted outline-none backdrop-blur-sm transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted transition-colors hover:text-white"
                  aria-label="Clear search"
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
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Category filter buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const catColor = categoryColors[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
                    style={
                      isActive
                        ? {
                            backgroundColor: `${catColor}20`,
                            color: catColor,
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: `${catColor}40`,
                            boxShadow: `0 0 12px ${catColor}15`,
                          }
                        : {
                            backgroundColor: "transparent",
                            color: "#8888a0",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "#1e1e2e",
                          }
                    }
                  >
                    {cat}
                    {isActive && cat !== "All" && (
                      <span
                        className="ml-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-xs font-bold"
                        style={{
                          backgroundColor: `${catColor}30`,
                          color: catColor,
                        }}
                      >
                        {tools.filter((t) => t.category === cat).length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Result count */}
            <div className="mt-5 text-center text-sm text-muted">
              {search || activeCategory !== "All" ? (
                <span>
                  Showing{" "}
                  <span className="font-semibold text-white">{toolCount}</span>{" "}
                  of {totalCount} tools
                  {search && (
                    <span>
                      {" "}
                      for &ldquo;
                      <span className="text-primary-light">{search}</span>
                      &rdquo;
                    </span>
                  )}
                </span>
              ) : (
                <span>
                  Showing all{" "}
                  <span className="font-semibold text-white">{totalCount}</span>{" "}
                  tools
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ─── Tools Grid ─── */}
        <section className="bg-brand-darker/50">
          <div className="mx-auto max-w-7xl px-6 pb-16 pt-6 sm:pb-20">
            {filteredTools.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.href} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-card border border-brand-border">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                    <path d="M8 11h6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  No tools found
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Try a different search term or category.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary-light transition-colors hover:bg-primary/20"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ─── CTA Section ─── */}
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
  return (
    <Link
      href={tool.href}
      className="group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-card/40 p-6 transition-all duration-300 hover:bg-brand-card hover:-translate-y-0.5"
    >
      {/* Colored top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl transition-all duration-300 group-hover:h-[4px]"
        style={{ backgroundColor: tool.color }}
      />

      {/* Hover glow effect */}
      <style>{`
        a[href="${tool.href}"]:hover {
          border-color: ${tool.color}40;
          box-shadow: 0 0 20px ${tool.color}15, 0 8px 32px ${tool.color}10;
        }
      `}</style>

      {/* Icon with colored background */}
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${tool.color}15`, color: tool.color }}
      >
        {tool.icon}
      </div>

      {/* Tool name */}
      <h3 className="text-base font-semibold text-white">{tool.name}</h3>

      {/* Category badge */}
      <div
        className="mt-1.5 inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium"
        style={{
          backgroundColor: `${tool.color}12`,
          color: `${tool.color}`,
        }}
      >
        {tool.category}
      </div>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {tool.description}
      </p>

      {/* Open tool CTA */}
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
    </Link>
  );
}

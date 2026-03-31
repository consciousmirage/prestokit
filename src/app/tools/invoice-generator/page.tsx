"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import PromoBar from "@/components/PromoBar";

/* ------------------------------------------------------------------ */
/*  FAQ Data for SEO section                                           */
/* ------------------------------------------------------------------ */

const INVOICE_FAQS = [
  {
    q: "What should be included on a professional invoice?",
    a: "A professional invoice should include your business name and contact information, the client's name and address, a unique invoice number, the invoice date and due date, an itemized list of products or services with quantities and rates, subtotal, any applicable taxes and discounts, the total amount due, accepted payment methods, and payment terms. Including all of these details reduces confusion and helps ensure you get paid on time.",
  },
  {
    q: "How do I calculate sales tax on an invoice?",
    a: "To calculate sales tax, multiply the taxable subtotal by your local tax rate. For example, if your subtotal is $1,000 and your sales tax rate is 8.25%, the tax amount is $1,000 x 0.0825 = $82.50. Different states, counties, and cities may have different tax rates, and some products or services may be tax-exempt. Our invoice generator lets you enter your tax rate and automatically calculates the amount for you.",
  },
  {
    q: "What is the difference between an invoice and a receipt?",
    a: "An invoice is a request for payment sent before or at the time of delivery, while a receipt is a confirmation of payment already made. Invoices include payment terms and due dates, while receipts confirm the transaction amount and date of payment. In short: an invoice says \"please pay this amount,\" and a receipt says \"thank you, payment received.\" Both are important financial documents for bookkeeping.",
  },
  {
    q: "Is this invoice generator really free?",
    a: "Yes, the PrestoKit invoice generator is 100% free with no hidden fees, no watermarks, and no account required. Everything runs directly in your browser, which means your data never touches our servers. You can create and download as many invoices as you need at no cost.",
  },
  {
    q: "Can I customize the invoice with my logo?",
    a: "Yes! The PrestoKit invoice generator supports logo upload directly in the tool. Simply click the logo upload area in the Your Business section, select a JPG or PNG file, and your logo will appear in the invoice preview and PDF download immediately. No third-party tools needed.",
  },
  {
    q: "What file format does the invoice download as?",
    a: "When you click \"Download PDF,\" the invoice is rendered and exported as a high-quality PDF using html2pdf.js, entirely in your browser. The PDF maintains all formatting, colors, and your uploaded logo. This is the most universally accepted format for invoices because PDFs maintain their formatting across all devices and operating systems.",
  },
  {
    q: "How do I send an invoice to a client?",
    a: "After downloading your invoice as a PDF, you can send it via email as an attachment with a professional message summarizing the amount due and payment deadline. You can also share it through cloud storage links (Google Drive, Dropbox), messaging apps, or even print and mail a physical copy. Most clients prefer receiving invoices via email for quick processing.",
  },
  {
    q: "What payment terms should I include on my invoice?",
    a: "Common payment terms include Net 30 (payment due within 30 days), Net 15 (within 15 days), and Due on Receipt (immediate payment). For new clients, shorter payment terms reduce risk. You might also consider offering a small early-payment discount (e.g., 2% off if paid within 10 days) to encourage faster payment. Always clearly state your accepted payment methods, such as bank transfer, credit card, or PayPal.",
  },
];

const RELATED_TOOLS_INVOICE = [
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
    name: "Pay Stub Creator",
    description: "Generate professional pay stubs for employees and contractors.",
    href: "/tools/pay-stub-creator",
    icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    name: "Profit Margin Calculator",
    description: "Calculate profit margins, markups, and break-even points.",
    href: "/tools/profit-margin-calculator",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

/* ------------------------------------------------------------------ */
/*  Currency Options                                                   */
/* ------------------------------------------------------------------ */

const CURRENCIES = [
  { code: "USD", symbol: "$", label: "USD ($)" },
  { code: "EUR", symbol: "€", label: "EUR (€)" },
  { code: "GBP", symbol: "£", label: "GBP (£)" },
  { code: "CAD", symbol: "C$", label: "CAD (C$)" },
  { code: "AUD", symbol: "A$", label: "AUD (A$)" },
];

/* ------------------------------------------------------------------ */
/*  Template Options                                                   */
/* ------------------------------------------------------------------ */

type TemplateId = "classic" | "modern" | "minimal";

const TEMPLATES: { id: TemplateId; label: string; desc: string }[] = [
  { id: "classic", label: "Classic", desc: "Clean lines, purple accent" },
  { id: "modern", label: "Modern", desc: "Bold header bar, strong type" },
  { id: "minimal", label: "Minimal", desc: "No borders, typography-first" },
];

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

interface InvoiceData {
  /* Sender */
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  businessPhone: string;
  /* Client */
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  /* Invoice meta */
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
  /* Line items */
  lineItems: LineItem[];
  /* Financials */
  taxRate: number;
  discount: number;
  /* Notes */
  notes: string;
}

const LS_BIZ_KEY = "prestokit_invoice_biz";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateInvoiceNumber(): string {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `INV-${y}${m}${d}-${rand}`;
}

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

function thirtyDaysISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function fmt(n: number): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${m}/${d}/${y}`;
}

/* ------------------------------------------------------------------ */
/*  Defaults                                                           */
/* ------------------------------------------------------------------ */

function defaultData(saved?: Partial<InvoiceData>): InvoiceData {
  return {
    businessName: saved?.businessName ?? "",
    businessAddress: saved?.businessAddress ?? "",
    businessEmail: saved?.businessEmail ?? "",
    businessPhone: saved?.businessPhone ?? "",
    clientName: "",
    clientAddress: "",
    clientEmail: "",
    invoiceNumber: generateInvoiceNumber(),
    invoiceDate: todayISO(),
    dueDate: thirtyDaysISO(),
    paymentTerms: "Net 30",
    lineItems: [{ id: uid(), description: "", quantity: 1, rate: 0 }],
    taxRate: 0,
    discount: 0,
    notes: "",
  };
}

/* ------------------------------------------------------------------ */
/*  Invoice Preview Components (per template)                         */
/* ------------------------------------------------------------------ */

interface PreviewProps {
  data: InvoiceData;
  logo: string | null;
  currencySymbol: string;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
}

/* --- Classic Template --- */
function ClassicPreview({
  data,
  logo,
  currencySymbol,
  subtotal,
  taxAmount,
  discountAmount,
  total,
}: PreviewProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        background: "#ffffff",
        padding: "40px",
        color: "#1a1a1a",
        fontSize: "13px",
        lineHeight: "1.6",
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {logo ? (
            <img
              src={logo}
              alt="Business Logo"
              style={{ maxHeight: "64px", maxWidth: "160px", objectFit: "contain" }}
            />
          ) : (
            <div style={{
              width: "56px", height: "56px", borderRadius: "8px",
              background: "#f0effe", display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7c6cf0" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
            </div>
          )}
          <div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "#7c6cf0", letterSpacing: "-0.5px" }}>INVOICE</div>
            <div style={{ color: "#9ca3af", fontSize: "11px", marginTop: "2px" }}>{data.invoiceNumber}</div>
          </div>
        </div>
        <div style={{ textAlign: "right", fontSize: "12px", color: "#6b7280" }}>
          <div><span style={{ fontWeight: "600", color: "#374151" }}>Date:</span> {formatDate(data.invoiceDate)}</div>
          <div><span style={{ fontWeight: "600", color: "#374151" }}>Due:</span> {formatDate(data.dueDate)}</div>
          <div><span style={{ fontWeight: "600", color: "#374151" }}>Terms:</span> {data.paymentTerms}</div>
        </div>
      </div>

      {/* From / To */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "32px" }}>
        <div>
          <div style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "2px", color: "#9ca3af", marginBottom: "6px" }}>From</div>
          <div style={{ fontWeight: "700", color: "#111827", fontSize: "14px" }}>{data.businessName || "Your Business"}</div>
          {data.businessAddress && <div style={{ color: "#6b7280", fontSize: "12px" }}>{data.businessAddress}</div>}
          {data.businessEmail && <div style={{ color: "#6b7280", fontSize: "12px" }}>{data.businessEmail}</div>}
          {data.businessPhone && <div style={{ color: "#6b7280", fontSize: "12px" }}>{data.businessPhone}</div>}
        </div>
        <div>
          <div style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "2px", color: "#9ca3af", marginBottom: "6px" }}>Bill To</div>
          <div style={{ fontWeight: "700", color: "#111827", fontSize: "14px" }}>{data.clientName || "Client Name"}</div>
          {data.clientAddress && <div style={{ color: "#6b7280", fontSize: "12px" }}>{data.clientAddress}</div>}
          {data.clientEmail && <div style={{ color: "#6b7280", fontSize: "12px" }}>{data.clientEmail}</div>}
        </div>
      </div>

      {/* Line Items */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px", fontSize: "12px" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #7c6cf0" }}>
            <th style={{ padding: "8px 4px", textAlign: "left", fontWeight: "600", color: "#374151" }}>Description</th>
            <th style={{ padding: "8px 4px", textAlign: "center", fontWeight: "600", color: "#374151", width: "60px" }}>Qty</th>
            <th style={{ padding: "8px 4px", textAlign: "right", fontWeight: "600", color: "#374151", width: "90px" }}>Rate</th>
            <th style={{ padding: "8px 4px", textAlign: "right", fontWeight: "600", color: "#374151", width: "90px" }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.lineItems.map((li, i) => (
            <tr key={li.id} style={{ background: i % 2 === 0 ? "#f9fafb" : "#ffffff" }}>
              <td style={{ padding: "9px 4px", color: "#374151" }}>{li.description || "—"}</td>
              <td style={{ padding: "9px 4px", textAlign: "center", color: "#6b7280" }}>{li.quantity}</td>
              <td style={{ padding: "9px 4px", textAlign: "right", color: "#6b7280" }}>{currencySymbol}{fmt(li.rate)}</td>
              <td style={{ padding: "9px 4px", textAlign: "right", fontWeight: "600", color: "#111827" }}>{currencySymbol}{fmt(li.quantity * li.rate)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "32px" }}>
        <div style={{ width: "220px", fontSize: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: "#6b7280" }}>
            <span>Subtotal</span><span>{currencySymbol}{fmt(subtotal)}</span>
          </div>
          {data.taxRate > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: "#6b7280" }}>
              <span>Tax ({data.taxRate}%)</span><span>{currencySymbol}{fmt(taxAmount)}</span>
            </div>
          )}
          {discountAmount > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: "#6b7280" }}>
              <span>Discount</span><span>-{currencySymbol}{fmt(discountAmount)}</span>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 4px", borderTop: "2px solid #7c6cf0", fontWeight: "800", fontSize: "16px", color: "#111827" }}>
            <span>Total</span><span>{currencySymbol}{fmt(total)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {data.notes && (
        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "16px" }}>
          <div style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "2px", color: "#9ca3af", marginBottom: "4px" }}>Notes / Terms</div>
          <div style={{ color: "#6b7280", fontSize: "12px", whiteSpace: "pre-wrap" }}>{data.notes}</div>
        </div>
      )}

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: "40px", fontSize: "10px", color: "#d1d5db" }}>
        Generated with PrestoKit &mdash; free business tools
      </div>
    </div>
  );
}

/* --- Modern Template --- */
function ModernPreview({
  data,
  logo,
  currencySymbol,
  subtotal,
  taxAmount,
  discountAmount,
  total,
}: PreviewProps) {
  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: "#ffffff", color: "#1a1a1a", fontSize: "13px", lineHeight: "1.6" }}>
      {/* Header bar */}
      <div style={{ background: "linear-gradient(135deg, #4f3fce 0%, #7c6cf0 60%, #9b8ff5 100%)", padding: "32px 40px", marginBottom: "0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {logo ? (
              <img
                src={logo}
                alt="Business Logo"
                style={{ maxHeight: "56px", maxWidth: "140px", objectFit: "contain", filter: "brightness(0) invert(1)" }}
              />
            ) : (
              <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
            )}
            <div>
              <div style={{ color: "#fff", fontSize: "20px", fontWeight: "800", letterSpacing: "1px" }}>{data.businessName || "YOUR BUSINESS"}</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", marginTop: "2px" }}>{data.businessEmail}</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "28px", fontWeight: "900", letterSpacing: "2px" }}>INVOICE</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "11px" }}>{data.invoiceNumber}</div>
          </div>
        </div>
      </div>

      {/* Sub-header band */}
      <div style={{ background: "#1e1a3c", padding: "12px 40px", display: "flex", gap: "40px" }}>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px" }}>
          DATE <span style={{ color: "#fff", fontWeight: "600", marginLeft: "6px" }}>{formatDate(data.invoiceDate)}</span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px" }}>
          DUE <span style={{ color: "#00e676", fontWeight: "700", marginLeft: "6px" }}>{formatDate(data.dueDate)}</span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px" }}>
          TERMS <span style={{ color: "#fff", fontWeight: "600", marginLeft: "6px" }}>{data.paymentTerms}</span>
        </div>
      </div>

      <div style={{ padding: "32px 40px" }}>
        {/* From / To */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "32px" }}>
          <div>
            <div style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "2px", color: "#7c6cf0", fontWeight: "700", marginBottom: "6px" }}>From</div>
            <div style={{ fontWeight: "800", color: "#111827", fontSize: "15px" }}>{data.businessName || "Your Business"}</div>
            {data.businessAddress && <div style={{ color: "#6b7280", fontSize: "12px" }}>{data.businessAddress}</div>}
            {data.businessEmail && <div style={{ color: "#6b7280", fontSize: "12px" }}>{data.businessEmail}</div>}
            {data.businessPhone && <div style={{ color: "#6b7280", fontSize: "12px" }}>{data.businessPhone}</div>}
          </div>
          <div>
            <div style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "2px", color: "#7c6cf0", fontWeight: "700", marginBottom: "6px" }}>Bill To</div>
            <div style={{ fontWeight: "800", color: "#111827", fontSize: "15px" }}>{data.clientName || "Client Name"}</div>
            {data.clientAddress && <div style={{ color: "#6b7280", fontSize: "12px" }}>{data.clientAddress}</div>}
            {data.clientEmail && <div style={{ color: "#6b7280", fontSize: "12px" }}>{data.clientEmail}</div>}
          </div>
        </div>

        {/* Line Items */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px", fontSize: "12px" }}>
          <thead>
            <tr style={{ background: "#f5f3ff" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: "700", color: "#4f3fce", textTransform: "uppercase", fontSize: "10px", letterSpacing: "1px" }}>Description</th>
              <th style={{ padding: "10px 12px", textAlign: "center", fontWeight: "700", color: "#4f3fce", textTransform: "uppercase", fontSize: "10px", letterSpacing: "1px", width: "60px" }}>Qty</th>
              <th style={{ padding: "10px 12px", textAlign: "right", fontWeight: "700", color: "#4f3fce", textTransform: "uppercase", fontSize: "10px", letterSpacing: "1px", width: "90px" }}>Rate</th>
              <th style={{ padding: "10px 12px", textAlign: "right", fontWeight: "700", color: "#4f3fce", textTransform: "uppercase", fontSize: "10px", letterSpacing: "1px", width: "90px" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.lineItems.map((li, i) => (
              <tr key={li.id} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{li.description || "—"}</td>
                <td style={{ padding: "10px 12px", textAlign: "center", color: "#6b7280" }}>{li.quantity}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", color: "#6b7280" }}>{currencySymbol}{fmt(li.rate)}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: "700", color: "#111827" }}>{currencySymbol}{fmt(li.quantity * li.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "32px" }}>
          <div style={{ width: "240px" }}>
            <div style={{ background: "#f9f7ff", borderRadius: "8px", padding: "16px", fontSize: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", color: "#6b7280" }}>
                <span>Subtotal</span><span>{currencySymbol}{fmt(subtotal)}</span>
              </div>
              {data.taxRate > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", color: "#6b7280" }}>
                  <span>Tax ({data.taxRate}%)</span><span>{currencySymbol}{fmt(taxAmount)}</span>
                </div>
              )}
              {discountAmount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", color: "#6b7280" }}>
                  <span>Discount</span><span>-{currencySymbol}{fmt(discountAmount)}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0", marginTop: "8px", borderTop: "2px solid #7c6cf0", fontWeight: "900", fontSize: "18px", color: "#4f3fce" }}>
                <span>TOTAL</span><span>{currencySymbol}{fmt(total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {data.notes && (
          <div style={{ background: "#f9f7ff", borderLeft: "4px solid #7c6cf0", borderRadius: "0 8px 8px 0", padding: "12px 16px" }}>
            <div style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "2px", color: "#7c6cf0", fontWeight: "700", marginBottom: "4px" }}>Notes / Terms</div>
            <div style={{ color: "#6b7280", fontSize: "12px", whiteSpace: "pre-wrap" }}>{data.notes}</div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "40px", fontSize: "10px", color: "#d1d5db" }}>
          Generated with PrestoKit &mdash; free business tools
        </div>
      </div>
    </div>
  );
}

/* --- Minimal Template --- */
function MinimalPreview({
  data,
  logo,
  currencySymbol,
  subtotal,
  taxAmount,
  discountAmount,
  total,
}: PreviewProps) {
  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: "#ffffff", padding: "48px 52px", color: "#1a1a1a", fontSize: "13px", lineHeight: "1.7" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "48px", borderBottom: "1px solid #1a1a1a", paddingBottom: "24px" }}>
        <div>
          {logo ? (
            <img
              src={logo}
              alt="Business Logo"
              style={{ maxHeight: "52px", maxWidth: "140px", objectFit: "contain", marginBottom: "8px", display: "block" }}
            />
          ) : null}
          <div style={{ fontSize: "22px", fontWeight: "700", color: "#1a1a1a", letterSpacing: "-0.5px" }}>{data.businessName || "Your Business"}</div>
          {data.businessAddress && <div style={{ color: "#555", fontSize: "11px" }}>{data.businessAddress}</div>}
          {data.businessEmail && <div style={{ color: "#555", fontSize: "11px" }}>{data.businessEmail}</div>}
          {data.businessPhone && <div style={{ color: "#555", fontSize: "11px" }}>{data.businessPhone}</div>}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "32px", fontWeight: "300", letterSpacing: "4px", color: "#111", textTransform: "uppercase" }}>Invoice</div>
          <div style={{ color: "#888", fontSize: "12px", marginTop: "4px" }}>{data.invoiceNumber}</div>
        </div>
      </div>

      {/* Meta + Bill To row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", marginBottom: "48px" }}>
        <div>
          <div style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "2px", color: "#aaa", marginBottom: "6px" }}>Bill To</div>
          <div style={{ fontWeight: "600", color: "#111", fontSize: "14px" }}>{data.clientName || "Client Name"}</div>
          {data.clientAddress && <div style={{ color: "#555", fontSize: "12px" }}>{data.clientAddress}</div>}
          {data.clientEmail && <div style={{ color: "#555", fontSize: "12px" }}>{data.clientEmail}</div>}
        </div>
        <div>
          <div style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "2px", color: "#aaa", marginBottom: "6px" }}>Invoice Date</div>
          <div style={{ fontWeight: "600", color: "#111" }}>{formatDate(data.invoiceDate)}</div>
          <div style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "2px", color: "#aaa", marginBottom: "6px", marginTop: "12px" }}>Due Date</div>
          <div style={{ fontWeight: "600", color: "#111" }}>{formatDate(data.dueDate)}</div>
        </div>
        <div>
          <div style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "2px", color: "#aaa", marginBottom: "6px" }}>Payment Terms</div>
          <div style={{ fontWeight: "600", color: "#111" }}>{data.paymentTerms}</div>
        </div>
      </div>

      {/* Line Items */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "32px", fontSize: "12px" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #1a1a1a", borderTop: "1px solid #1a1a1a" }}>
            <th style={{ padding: "10px 0", textAlign: "left", fontWeight: "400", color: "#888", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1.5px" }}>Description</th>
            <th style={{ padding: "10px 0", textAlign: "center", fontWeight: "400", color: "#888", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1.5px", width: "60px" }}>Qty</th>
            <th style={{ padding: "10px 0", textAlign: "right", fontWeight: "400", color: "#888", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1.5px", width: "90px" }}>Rate</th>
            <th style={{ padding: "10px 0", textAlign: "right", fontWeight: "400", color: "#888", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1.5px", width: "90px" }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.lineItems.map((li) => (
            <tr key={li.id} style={{ borderBottom: "1px solid #e5e5e5" }}>
              <td style={{ padding: "12px 0", color: "#333" }}>{li.description || "—"}</td>
              <td style={{ padding: "12px 0", textAlign: "center", color: "#777" }}>{li.quantity}</td>
              <td style={{ padding: "12px 0", textAlign: "right", color: "#777" }}>{currencySymbol}{fmt(li.rate)}</td>
              <td style={{ padding: "12px 0", textAlign: "right", fontWeight: "600", color: "#111" }}>{currencySymbol}{fmt(li.quantity * li.rate)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "40px" }}>
        <div style={{ width: "200px", fontSize: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: "#888" }}>
            <span>Subtotal</span><span>{currencySymbol}{fmt(subtotal)}</span>
          </div>
          {data.taxRate > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: "#888" }}>
              <span>Tax ({data.taxRate}%)</span><span>{currencySymbol}{fmt(taxAmount)}</span>
            </div>
          )}
          {discountAmount > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: "#888" }}>
              <span>Discount</span><span>-{currencySymbol}{fmt(discountAmount)}</span>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0", marginTop: "8px", borderTop: "1px solid #1a1a1a", fontWeight: "700", fontSize: "16px", color: "#111" }}>
            <span>Total</span><span>{currencySymbol}{fmt(total)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {data.notes && (
        <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "16px" }}>
          <div style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "2px", color: "#aaa", marginBottom: "4px" }}>Notes / Terms</div>
          <div style={{ color: "#555", fontSize: "12px", whiteSpace: "pre-wrap" }}>{data.notes}</div>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "48px", fontSize: "10px", color: "#ccc", letterSpacing: "1px" }}>
        Generated with PrestoKit &mdash; free business tools
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function InvoiceGeneratorPage() {
  const [data, setData] = useState<InvoiceData>(() => {
    if (typeof window === "undefined") return defaultData();
    try {
      const saved = localStorage.getItem(LS_BIZ_KEY);
      return defaultData(saved ? JSON.parse(saved) : undefined);
    } catch {
      return defaultData();
    }
  });

  const [logo, setLogo] = useState<string | null>(null);
  const [template, setTemplate] = useState<TemplateId>("classic");
  const [currency, setCurrency] = useState("USD");
  const [savedIndicator, setSavedIndicator] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const currencySymbol = CURRENCIES.find((c) => c.code === currency)?.symbol ?? "$";

  /* ------ derived values ------ */
  const subtotal = data.lineItems.reduce(
    (sum, li) => sum + li.quantity * li.rate,
    0
  );
  const taxAmount = subtotal * (data.taxRate / 100);
  const discountAmount = data.discount;
  const total = subtotal + taxAmount - discountAmount;

  /* ------ auto-save biz info ------ */
  useEffect(() => {
    const bizInfo = {
      businessName: data.businessName,
      businessAddress: data.businessAddress,
      businessEmail: data.businessEmail,
      businessPhone: data.businessPhone,
    };
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(LS_BIZ_KEY, JSON.stringify(bizInfo));
        if (
          data.businessName ||
          data.businessEmail ||
          data.businessPhone ||
          data.businessAddress
        ) {
          setSavedIndicator(true);
          setTimeout(() => setSavedIndicator(false), 2000);
        }
      } catch {
        // localStorage may be unavailable
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [
    data.businessName,
    data.businessAddress,
    data.businessEmail,
    data.businessPhone,
  ]);

  /* ------ logo upload ------ */
  const handleLogoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        setLogo(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
    []
  );

  /* ------ updaters ------ */
  const set = useCallback(
    <K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const updateLineItem = useCallback(
    (id: string, field: keyof LineItem, value: string | number) => {
      setData((prev) => ({
        ...prev,
        lineItems: prev.lineItems.map((li) =>
          li.id === id ? { ...li, [field]: value } : li
        ),
      }));
    },
    []
  );

  const addLineItem = useCallback(() => {
    setData((prev) => ({
      ...prev,
      lineItems: [
        ...prev.lineItems,
        { id: uid(), description: "", quantity: 1, rate: 0 },
      ],
    }));
  }, []);

  const removeLineItem = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      lineItems:
        prev.lineItems.length === 1
          ? prev.lineItems
          : prev.lineItems.filter((li) => li.id !== id),
    }));
  }, []);

  const resetForm = useCallback(() => {
    setData(defaultData());
    setLogo(null);
  }, []);

  /* ------ download PDF ------ */
  const handlePrint = useCallback(async () => {
    const element = document.getElementById("invoice-print-area");
    if (!element) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const html2pdf = (await import("html2pdf.js" as any)).default;
    const invoiceNum = data.invoiceNumber || "invoice";
    html2pdf()
      .set({
        margin: [12, 12, 12, 12],
        filename: `${invoiceNum}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, allowTaint: true, logging: false },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  }, [data.invoiceNumber]);

  /* ------ shared input classes ------ */
  const inputCls =
    "w-full rounded-lg border border-white/10 bg-[#12121c] px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-[#7c6cf0]/60 focus:ring-1 focus:ring-[#7c6cf0]/40 transition";
  const labelCls = "block text-xs font-medium text-gray-400 mb-1";

  const previewProps: PreviewProps = {
    data,
    logo,
    currencySymbol,
    subtotal,
    taxAmount,
    discountAmount,
    total,
  };

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <>
      {/* ---------- SEO head ---------- */}
      <title>Free Invoice Generator &mdash; PrestoKit</title>
      <meta
        name="description"
        content="Create professional invoices for free. Upload your logo, choose a template, and download a PDF invoice instantly — 100% in your browser. No sign-up required."
      />

      {/* ============================== PRINT STYLES ============================== */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #invoice-print-area, #invoice-print-area * { visibility: visible !important; }
          #invoice-print-area {
            position: absolute; left: 0; top: 0;
            width: 100%; padding: 0; margin: 0;
          }
          @page { margin: 0.5in; size: letter; }
        }
      `}</style>

      <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-[family-name:var(--font-geist-sans)] print:hidden">
        {/* ---------- breadcrumb ---------- */}
        <nav className="border-b border-white/5 bg-[#0e0e18]">
          <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
            <a href="/" className="hover:text-[#7c6cf0] transition">
              PrestoKit
            </a>
            <span>/</span>
            <a href="/tools" className="hover:text-[#7c6cf0] transition">
              Tools
            </a>
            <span>/</span>
            <span className="text-gray-300">Invoice Generator</span>
          </div>
        </nav>

        {/* ---------- header ---------- */}
        <header className="mx-auto max-w-7xl px-4 pt-10 pb-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Invoice Generator
          </h1>
          <p className="mt-2 text-gray-400 max-w-xl">
            Create professional invoices in seconds. Upload your logo, pick a
            template, and download a polished PDF — everything runs in your
            browser.
          </p>
        </header>

        {/* ---------- template + currency bar ---------- */}
        <div className="mx-auto max-w-7xl px-4 pb-6">
          <div className="rounded-2xl border border-white/5 bg-[#1a1a26] p-4 flex flex-wrap gap-6 items-center justify-between">
            {/* Template selector */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-medium text-gray-400 shrink-0">Template:</span>
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`group relative rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                    template === t.id
                      ? "bg-[#7c6cf0] text-white shadow-lg shadow-[#7c6cf0]/30"
                      : "border border-white/10 text-gray-400 hover:border-[#7c6cf0]/40 hover:text-gray-200"
                  }`}
                >
                  <span>{t.label}</span>
                  <span
                    className={`ml-1.5 text-[10px] hidden sm:inline ${
                      template === t.id ? "text-white/70" : "text-gray-600 group-hover:text-gray-500"
                    }`}
                  >
                    {t.desc}
                  </span>
                </button>
              ))}
            </div>

            {/* Currency selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-400 shrink-0">Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="rounded-lg border border-white/10 bg-[#12121c] px-3 py-2 text-sm text-gray-100 outline-none focus:border-[#7c6cf0]/60 focus:ring-1 focus:ring-[#7c6cf0]/40 transition"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ---------- main grid ---------- */}
        <main className="mx-auto max-w-7xl px-4 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ======================== LEFT: FORM ======================== */}
          <div className="space-y-6">
            {/* --- Your Business --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-200">Your Business</h2>
                {savedIndicator && (
                  <span className="text-[11px] text-[#00e676] font-medium flex items-center gap-1 animate-pulse">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Info saved
                  </span>
                )}
              </div>

              {/* Logo Upload */}
              <div className="mb-5">
                <label className={labelCls}>Business Logo</label>
                <div
                  onClick={() => logoInputRef.current?.click()}
                  className="flex items-center gap-4 rounded-xl border border-dashed border-white/15 bg-[#12121c] px-4 py-4 cursor-pointer hover:border-[#7c6cf0]/50 hover:bg-[#16162a] transition group"
                >
                  {logo ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logo}
                        alt="Logo preview"
                        className="h-12 max-w-[120px] object-contain rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-200 font-medium">Logo uploaded</p>
                        <p className="text-xs text-gray-500 mt-0.5">Click to replace</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLogo(null);
                          if (logoInputRef.current) logoInputRef.current.value = "";
                        }}
                        className="text-gray-600 hover:text-red-400 transition p-1"
                        title="Remove logo"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="h-12 w-12 rounded-lg bg-[#7c6cf0]/10 flex items-center justify-center shrink-0 group-hover:bg-[#7c6cf0]/20 transition">
                        <svg className="h-6 w-6 text-[#7c6cf0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300 font-medium">Upload your logo</p>
                        <p className="text-xs text-gray-500 mt-0.5">JPG or PNG, shown in invoice & PDF</p>
                      </div>
                    </>
                  )}
                </div>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Business Name</label>
                  <input
                    className={inputCls}
                    placeholder="Acme Corp"
                    value={data.businessName}
                    onChange={(e) => set("businessName", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input
                    className={inputCls}
                    type="email"
                    placeholder="you@business.com"
                    value={data.businessEmail}
                    onChange={(e) => set("businessEmail", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Phone</label>
                  <input
                    className={inputCls}
                    placeholder="(555) 123-4567"
                    value={data.businessPhone}
                    onChange={(e) => set("businessPhone", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Address</label>
                  <input
                    className={inputCls}
                    placeholder="123 Main St, City, ST 00000"
                    value={data.businessAddress}
                    onChange={(e) => set("businessAddress", e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* --- Client --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">
                Client
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Client Name</label>
                  <input
                    className={inputCls}
                    placeholder="Client or Company"
                    value={data.clientName}
                    onChange={(e) => set("clientName", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Client Email</label>
                  <input
                    className={inputCls}
                    type="email"
                    placeholder="client@email.com"
                    value={data.clientEmail}
                    onChange={(e) => set("clientEmail", e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Client Address</label>
                  <input
                    className={inputCls}
                    placeholder="456 Oak Ave, Town, ST 11111"
                    value={data.clientAddress}
                    onChange={(e) => set("clientAddress", e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* --- Invoice Details --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">
                Invoice Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Invoice Number</label>
                  <input
                    className={inputCls}
                    value={data.invoiceNumber}
                    onChange={(e) => set("invoiceNumber", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Payment Terms</label>
                  <select
                    className={inputCls}
                    value={data.paymentTerms}
                    onChange={(e) => set("paymentTerms", e.target.value)}
                  >
                    <option value="Due on Receipt">Due on Receipt</option>
                    <option value="Net 15">Net 15</option>
                    <option value="Net 30">Net 30</option>
                    <option value="Net 60">Net 60</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Invoice Date</label>
                  <input
                    className={inputCls}
                    type="date"
                    value={data.invoiceDate}
                    onChange={(e) => set("invoiceDate", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Due Date</label>
                  <input
                    className={inputCls}
                    type="date"
                    value={data.dueDate}
                    onChange={(e) => set("dueDate", e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* --- Line Items --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">
                Line Items
              </h2>

              {/* header row */}
              <div className="hidden sm:grid sm:grid-cols-[1fr_80px_100px_100px_40px] gap-2 text-xs font-medium text-gray-500 mb-2 px-1">
                <span>Description</span>
                <span>Qty</span>
                <span>Rate ({currencySymbol})</span>
                <span>Total</span>
                <span />
              </div>

              {data.lineItems.map((li) => (
                <div
                  key={li.id}
                  className="grid grid-cols-1 sm:grid-cols-[1fr_80px_100px_100px_40px] gap-2 mb-2 items-center"
                >
                  <input
                    className={inputCls}
                    placeholder="Description"
                    value={li.description}
                    onChange={(e) =>
                      updateLineItem(li.id, "description", e.target.value)
                    }
                  />
                  <input
                    className={inputCls + " text-center"}
                    type="number"
                    min={0}
                    value={li.quantity}
                    onChange={(e) =>
                      updateLineItem(
                        li.id,
                        "quantity",
                        Math.max(0, Number(e.target.value))
                      )
                    }
                  />
                  <input
                    className={inputCls + " text-center"}
                    type="number"
                    min={0}
                    step="0.01"
                    value={li.rate}
                    onChange={(e) =>
                      updateLineItem(
                        li.id,
                        "rate",
                        Math.max(0, Number(e.target.value))
                      )
                    }
                  />
                  <div className="flex items-center justify-center text-sm text-gray-300 bg-[#12121c] rounded-lg border border-white/10 py-2">
                    {currencySymbol}{fmt(li.quantity * li.rate)}
                  </div>
                  <button
                    onClick={() => removeLineItem(li.id)}
                    className="flex items-center justify-center text-gray-500 hover:text-red-400 transition h-9"
                    title="Remove"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}

              <button
                onClick={addLineItem}
                className="mt-2 flex items-center gap-1 text-sm text-[#7c6cf0] hover:text-[#9b8ff5] transition font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Line Item
              </button>
            </section>

            {/* --- Tax / Discount / Notes --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">
                Tax, Discount &amp; Notes
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Tax Rate (%)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    step="0.01"
                    value={data.taxRate}
                    onChange={(e) =>
                      set("taxRate", Math.max(0, Number(e.target.value)))
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Discount ({currencySymbol})</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    step="0.01"
                    value={data.discount}
                    onChange={(e) =>
                      set("discount", Math.max(0, Number(e.target.value)))
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Notes / Terms</label>
                  <textarea
                    className={inputCls + " min-h-[80px] resize-y"}
                    placeholder="Payment is due within 30 days. Thank you for your business!"
                    value={data.notes}
                    onChange={(e) => set("notes", e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* --- Action buttons --- */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 rounded-xl bg-[#00e676] px-6 py-3 text-sm font-semibold text-black hover:bg-[#00c864] transition shadow-lg shadow-[#00e676]/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3"
                  />
                </svg>
                Download PDF
              </button>
              <button
                onClick={resetForm}
                className="rounded-xl border border-white/10 bg-[#1a1a26] px-6 py-3 text-sm font-medium text-gray-300 hover:border-white/20 hover:text-white transition"
              >
                Reset
              </button>
            </div>
          </div>

          {/* ======================== RIGHT: LIVE PREVIEW ======================== */}
          <div className="sticky top-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-400">Live Preview</h2>
              <span className="text-xs text-gray-600 capitalize">{template} template</span>
            </div>
            <div className="rounded-2xl border border-white/5 overflow-hidden shadow-2xl shadow-black/40">
              <div
                id="invoice-print-area"
                ref={printRef}
              >
                {template === "classic" && <ClassicPreview {...previewProps} />}
                {template === "modern" && <ModernPreview {...previewProps} />}
                {template === "minimal" && <MinimalPreview {...previewProps} />}
              </div>
            </div>
          </div>
        </main>

        {/* ============================== PROMO BANNERS ============================== */}
        <PromoBar
          type="gumroad"
          dismissKey="invoice-gumroad"
          product={{
            name: "50 Email Templates Bundle",
            price: "$12",
            description: "Professional email templates for invoicing, follow-ups, payment reminders, and client communication. Copy, paste, and send.",
            url: "/products/email-templates-bundle.html",
          }}
        />
        <PromoBar
          type="pro"
          dismissKey="invoice-pro"
        />

        {/* ============================== HOW IT WORKS ============================== */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-2">How It Works</h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            Create a professional invoice in three simple steps — no account needed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Enter Your Details",
                desc: "Fill in your business info, upload your logo, and choose a template. Your business info is auto-saved for next time.",
              },
              {
                step: "2",
                title: "Add Line Items",
                desc: "List your products or services with quantities and rates. Add tax and discounts as needed — totals calculate automatically.",
              },
              {
                step: "3",
                title: "Download Your Invoice",
                desc: "Preview your invoice in real-time with live template switching, then click Download PDF to save it.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-white/5 bg-[#1a1a26] p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#7c6cf0]/15 text-[#7c6cf0] text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================== FAQ SECTION ============================== */}
        <section className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto">
            Everything you need to know about creating invoices with PrestoKit.
          </p>
          <div className="space-y-3">
            {INVOICE_FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        {/* ============================== RELATED TOOLS ============================== */}
        <section className="mx-auto max-w-7xl px-4 py-16 border-t border-white/5">
          <h2 className="text-2xl font-bold text-center mb-2">
            Related Tools
          </h2>
          <p className="text-gray-400 text-center mb-10">
            More free business tools to help you get things done.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RELATED_TOOLS_INVOICE.map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                className="group rounded-2xl border border-white/5 bg-[#1a1a26] p-5 hover:border-[#7c6cf0]/40 transition-all duration-200 hover:shadow-[0_0_30px_rgba(124,108,240,0.08)]"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c6cf0]/10">
                  <svg
                    className="h-5 w-5 text-[#7c6cf0]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={tool.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-[#7c6cf0] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* ==================== RECOMMENDED TOOLS ==================== */}
        <section className="mx-auto max-w-7xl px-4 py-16 border-t border-white/5">
          <h2 className="text-2xl font-bold text-center mb-2">
            Level Up Your <span className="text-[#7c6cf0]">Workflow</span>
          </h2>
          <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto">
            Ready to automate your invoicing? These tools can help you save time and get paid faster.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              {
                name: "QuickBooks",
                desc: "Automate invoicing, track expenses, and manage your books in one place.",
                href: "https://quickbooks.intuit.com",
              },
              {
                name: "FreshBooks",
                desc: "Simple, intuitive invoicing and accounting built for small business owners.",
                href: "https://www.freshbooks.com",
              },
              {
                name: "Wave",
                desc: "Free accounting and invoicing software — perfect for freelancers and small businesses.",
                href: "https://www.waveapps.com",
              },
            ].map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="group rounded-2xl border border-white/5 bg-[#1a1a26] p-6 hover:border-[#7c6cf0]/40 hover:shadow-[0_0_24px_rgba(124,108,240,0.08)] transition-all"
              >
                <h3 className="text-white font-semibold text-base mb-2 group-hover:text-[#9d90f5] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {tool.desc}
                </p>
                <span className="inline-block mt-3 text-xs text-[#7c6cf0] font-medium">
                  Learn more &rarr;
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* ============================== FAQ SCHEMA (JSON-LD) ============================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: INVOICE_FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </>
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
        <span className="text-sm font-medium text-gray-200 pr-4">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

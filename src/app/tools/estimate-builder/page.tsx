"use client";

import { useState, useCallback, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  FAQ Accordion Item                                                 */
/* ------------------------------------------------------------------ */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/5 rounded-xl overflow-hidden">
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
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

type EstimateStatus = "Draft" | "Sent" | "Accepted" | "Declined";
type TemplateStyle = "Classic" | "Modern" | "Minimal";

interface EstimateData {
  /* Sender */
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  businessPhone: string;
  /* Client */
  clientName: string;
  clientCompany: string;
  clientAddress: string;
  clientEmail: string;
  /* Estimate meta */
  estimateNumber: string;
  estimateDate: string;
  validUntil: string;
  status: EstimateStatus;
  /* Project */
  projectTitle: string;
  projectDescription: string;
  /* Line items */
  lineItems: LineItem[];
  /* Financials */
  taxRate: number;
  discount: number;
  /* Text blocks */
  terms: string;
  notes: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateEstimateNumber(): string {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `EST-${y}${m}${d}-${rand}`;
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

const DEFAULT_TERMS =
  "Payment is due within 30 days of invoice date. A 1.5% monthly late fee applies to overdue balances. This estimate is subject to change if project scope changes.";

const STATUS_COLORS: Record<EstimateStatus, { bg: string; text: string; dot: string }> = {
  Draft: { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" },
  Sent: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  Accepted: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  Declined: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
};

const STATUS_COLORS_DARK: Record<EstimateStatus, string> = {
  Draft: "border-gray-500/40 bg-gray-500/10 text-gray-400",
  Sent: "border-blue-500/40 bg-blue-500/10 text-blue-400",
  Accepted: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  Declined: "border-red-500/40 bg-red-500/10 text-red-400",
};

/* ------------------------------------------------------------------ */
/*  Defaults                                                           */
/* ------------------------------------------------------------------ */

function defaultData(): EstimateData {
  return {
    businessName: "",
    businessAddress: "",
    businessEmail: "",
    businessPhone: "",
    clientName: "",
    clientCompany: "",
    clientAddress: "",
    clientEmail: "",
    estimateNumber: generateEstimateNumber(),
    estimateDate: todayISO(),
    validUntil: thirtyDaysISO(),
    status: "Draft",
    projectTitle: "",
    projectDescription: "",
    lineItems: [{ id: uid(), description: "", quantity: 1, rate: 0 }],
    taxRate: 0,
    discount: 0,
    terms: DEFAULT_TERMS,
    notes: "",
  };
}

/* ------------------------------------------------------------------ */
/*  Preview Components per Template                                    */
/* ------------------------------------------------------------------ */

interface PreviewProps {
  data: EstimateData;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
}

function ClassicPreview({ data, subtotal, taxAmount, discountAmount, total }: PreviewProps) {
  const statusStyle = STATUS_COLORS[data.status];
  return (
    <div
      id="estimate-print-area"
      className="p-8 sm:p-10 text-gray-900 text-sm leading-relaxed bg-white"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      {/* top row */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#7c6cf0" }}>
            ESTIMATE
          </h2>
          <p className="text-gray-500 mt-1 text-xs">{data.estimateNumber}</p>
        </div>
        <div className="text-right space-y-1">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
            {data.status}
          </span>
          <div className="text-xs text-gray-500 space-y-0.5 mt-1">
            <p><span className="font-medium text-gray-700">Date:</span> {formatDate(data.estimateDate)}</p>
            <p><span className="font-medium text-gray-700">Valid Until:</span> {formatDate(data.validUntil)}</p>
          </div>
        </div>
      </div>

      {/* from / to */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">From</p>
          <p className="font-semibold text-gray-900">{data.businessName || "Your Business"}</p>
          {data.businessAddress && <p className="text-gray-600 text-xs">{data.businessAddress}</p>}
          {data.businessEmail && <p className="text-gray-600 text-xs">{data.businessEmail}</p>}
          {data.businessPhone && <p className="text-gray-600 text-xs">{data.businessPhone}</p>}
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Prepared For</p>
          <p className="font-semibold text-gray-900">{data.clientName || "Client Name"}</p>
          {data.clientCompany && <p className="text-gray-600 text-xs font-medium">{data.clientCompany}</p>}
          {data.clientAddress && <p className="text-gray-600 text-xs">{data.clientAddress}</p>}
          {data.clientEmail && <p className="text-gray-600 text-xs">{data.clientEmail}</p>}
        </div>
      </div>

      {/* project info */}
      {(data.projectTitle || data.projectDescription) && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Project</p>
          {data.projectTitle && <p className="font-semibold text-gray-900 text-sm">{data.projectTitle}</p>}
          {data.projectDescription && <p className="text-gray-600 text-xs mt-1 whitespace-pre-wrap">{data.projectDescription}</p>}
        </div>
      )}

      {/* line items table */}
      <table className="w-full text-xs mb-6">
        <thead>
          <tr className="text-left" style={{ borderBottom: "2px solid #7c6cf0" }}>
            <th className="pb-2 font-semibold text-gray-700">Description</th>
            <th className="pb-2 font-semibold text-gray-700 text-center w-16">Qty</th>
            <th className="pb-2 font-semibold text-gray-700 text-right w-24">Rate</th>
            <th className="pb-2 font-semibold text-gray-700 text-right w-24">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.lineItems.map((li, i) => (
            <tr key={li.id} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="py-2 px-1 text-gray-800">{li.description || "\u2014"}</td>
              <td className="py-2 text-center text-gray-600">{li.quantity}</td>
              <td className="py-2 text-right text-gray-600">${fmt(li.rate)}</td>
              <td className="py-2 text-right font-medium text-gray-900">${fmt(li.quantity * li.rate)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* totals */}
      <div className="flex justify-end mb-4">
        <div className="w-56 text-xs space-y-1">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span><span>${fmt(subtotal)}</span>
          </div>
          {data.taxRate > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Tax ({data.taxRate}%)</span><span>${fmt(taxAmount)}</span>
            </div>
          )}
          {discountAmount > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Discount</span><span>-${fmt(discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-base pt-2 mt-2" style={{ borderTop: "2px solid #7c6cf0" }}>
            <span>Estimated Total</span><span>${fmt(total)}</span>
          </div>
        </div>
      </div>

      {/* validity note */}
      {data.validUntil && (
        <p className="text-[10px] text-gray-400 text-right mb-6 italic">
          This estimate is valid until {formatDate(data.validUntil)}
        </p>
      )}

      {/* terms */}
      {data.terms && (
        <div className="border-t border-gray-200 pt-4 mb-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Terms &amp; Conditions</p>
          <p className="text-gray-600 text-xs whitespace-pre-wrap">{data.terms}</p>
        </div>
      )}

      {/* notes */}
      {data.notes && (
        <div className="border-t border-gray-200 pt-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Notes</p>
          <p className="text-gray-600 text-xs whitespace-pre-wrap">{data.notes}</p>
        </div>
      )}

      <p className="text-center text-[10px] text-gray-300 mt-10">Generated with PrestoKit &mdash; free business tools</p>
    </div>
  );
}

function ModernPreview({ data, subtotal, taxAmount, discountAmount, total }: PreviewProps) {
  const statusStyle = STATUS_COLORS[data.status];
  return (
    <div
      id="estimate-print-area"
      className="text-gray-900 text-sm leading-relaxed bg-white"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      {/* colored header bar */}
      <div style={{ background: "linear-gradient(135deg, #7c6cf0 0%, #5b4dd4 100%)" }} className="px-10 py-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-white uppercase">Estimate</h2>
            <p className="text-purple-200 mt-1 text-xs font-medium">{data.estimateNumber}</p>
          </div>
          <div className="text-right">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold bg-white/20 text-white border border-white/30`}>
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              {data.status}
            </span>
            <div className="text-purple-200 text-xs space-y-0.5 mt-2">
              <p>Date: {formatDate(data.estimateDate)}</p>
              <p>Valid Until: {formatDate(data.validUntil)}</p>
            </div>
          </div>
        </div>
        {/* business name in header */}
        {data.businessName && (
          <p className="text-white font-bold text-lg mt-4">{data.businessName}</p>
        )}
      </div>

      <div className="px-10 py-8">
        {/* from / to */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: "#7c6cf0" }}>From</p>
            <p className="font-bold text-gray-900">{data.businessName || "Your Business"}</p>
            {data.businessAddress && <p className="text-gray-600 text-xs">{data.businessAddress}</p>}
            {data.businessEmail && <p className="text-gray-600 text-xs">{data.businessEmail}</p>}
            {data.businessPhone && <p className="text-gray-600 text-xs">{data.businessPhone}</p>}
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: "#7c6cf0" }}>Prepared For</p>
            <p className="font-bold text-gray-900">{data.clientName || "Client Name"}</p>
            {data.clientCompany && <p className="text-gray-600 text-xs font-semibold">{data.clientCompany}</p>}
            {data.clientAddress && <p className="text-gray-600 text-xs">{data.clientAddress}</p>}
            {data.clientEmail && <p className="text-gray-600 text-xs">{data.clientEmail}</p>}
          </div>
        </div>

        {/* project info */}
        {(data.projectTitle || data.projectDescription) && (
          <div className="mb-6 rounded-xl p-4" style={{ background: "#f5f3ff", border: "1px solid #e0dbff" }}>
            <p className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: "#7c6cf0" }}>Project</p>
            {data.projectTitle && <p className="font-bold text-gray-900 text-sm">{data.projectTitle}</p>}
            {data.projectDescription && <p className="text-gray-600 text-xs mt-1 whitespace-pre-wrap">{data.projectDescription}</p>}
          </div>
        )}

        {/* line items table */}
        <table className="w-full text-xs mb-6">
          <thead>
            <tr style={{ background: "#7c6cf0" }}>
              <th className="py-2.5 px-3 text-left font-bold text-white rounded-tl">Description</th>
              <th className="py-2.5 px-3 font-bold text-white text-center w-16">Qty</th>
              <th className="py-2.5 px-3 font-bold text-white text-right w-24">Rate</th>
              <th className="py-2.5 px-3 font-bold text-white text-right w-24 rounded-tr">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.lineItems.map((li, i) => (
              <tr key={li.id} style={{ background: i % 2 === 0 ? "#faf9ff" : "#fff" }}>
                <td className="py-2.5 px-3 text-gray-800">{li.description || "\u2014"}</td>
                <td className="py-2.5 px-3 text-center text-gray-600">{li.quantity}</td>
                <td className="py-2.5 px-3 text-right text-gray-600">${fmt(li.rate)}</td>
                <td className="py-2.5 px-3 text-right font-bold text-gray-900">${fmt(li.quantity * li.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* totals */}
        <div className="flex justify-end mb-4">
          <div className="w-64 text-xs space-y-1">
            <div className="flex justify-between text-gray-600 py-1">
              <span>Subtotal</span><span>${fmt(subtotal)}</span>
            </div>
            {data.taxRate > 0 && (
              <div className="flex justify-between text-gray-600 py-1">
                <span>Tax ({data.taxRate}%)</span><span>${fmt(taxAmount)}</span>
              </div>
            )}
            {discountAmount > 0 && (
              <div className="flex justify-between text-gray-600 py-1">
                <span>Discount</span><span>-${fmt(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-black text-base rounded-lg px-3 py-2.5 mt-1 text-white" style={{ background: "linear-gradient(135deg, #7c6cf0 0%, #5b4dd4 100%)" }}>
              <span>Estimated Total</span><span>${fmt(total)}</span>
            </div>
          </div>
        </div>

        {/* validity note */}
        {data.validUntil && (
          <p className="text-[10px] text-right mb-6 italic" style={{ color: "#7c6cf0" }}>
            This estimate is valid until {formatDate(data.validUntil)}
          </p>
        )}

        {/* terms */}
        {data.terms && (
          <div className="pt-4 mb-4" style={{ borderTop: "2px solid #ede9fe" }}>
            <p className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: "#7c6cf0" }}>Terms &amp; Conditions</p>
            <p className="text-gray-600 text-xs whitespace-pre-wrap">{data.terms}</p>
          </div>
        )}

        {/* notes */}
        {data.notes && (
          <div className="pt-4" style={{ borderTop: "2px solid #ede9fe" }}>
            <p className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: "#7c6cf0" }}>Notes</p>
            <p className="text-gray-600 text-xs whitespace-pre-wrap">{data.notes}</p>
          </div>
        )}

        <p className="text-center text-[10px] text-gray-300 mt-10">Generated with PrestoKit &mdash; free business tools</p>
      </div>
    </div>
  );
}

function MinimalPreview({ data, subtotal, taxAmount, discountAmount, total }: PreviewProps) {
  const statusStyle = STATUS_COLORS[data.status];
  return (
    <div
      id="estimate-print-area"
      className="p-10 text-gray-900 text-sm leading-relaxed bg-white"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      {/* top row */}
      <div className="flex justify-between items-end mb-10" style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "1.5rem" }}>
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-1">Estimate</p>
          <p className="text-2xl font-bold text-gray-900">{data.businessName || "Your Business"}</p>
          <p className="text-xs text-gray-400 mt-1">{data.estimateNumber}</p>
        </div>
        <div className="text-right">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
            {data.status}
          </span>
          <p className="text-xs text-gray-400 mt-2">{formatDate(data.estimateDate)}</p>
        </div>
      </div>

      {/* from / to */}
      <div className="grid grid-cols-2 gap-12 mb-10">
        <div>
          <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-2">From</p>
          <p className="font-semibold text-gray-900">{data.businessName || "Your Business"}</p>
          {data.businessAddress && <p className="text-gray-500 text-xs mt-0.5">{data.businessAddress}</p>}
          {data.businessEmail && <p className="text-gray-500 text-xs">{data.businessEmail}</p>}
          {data.businessPhone && <p className="text-gray-500 text-xs">{data.businessPhone}</p>}
        </div>
        <div>
          <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-2">Prepared For</p>
          <p className="font-semibold text-gray-900">{data.clientName || "Client Name"}</p>
          {data.clientCompany && <p className="text-gray-500 text-xs mt-0.5 italic">{data.clientCompany}</p>}
          {data.clientAddress && <p className="text-gray-500 text-xs">{data.clientAddress}</p>}
          {data.clientEmail && <p className="text-gray-500 text-xs">{data.clientEmail}</p>}
        </div>
      </div>

      {/* project info */}
      {(data.projectTitle || data.projectDescription) && (
        <div className="mb-8" style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "1.5rem" }}>
          {data.projectTitle && <p className="font-semibold text-gray-900 text-sm">{data.projectTitle}</p>}
          {data.projectDescription && <p className="text-gray-500 text-xs mt-1 whitespace-pre-wrap">{data.projectDescription}</p>}
        </div>
      )}

      {/* line items — no box, just clean rows */}
      <div className="mb-8">
        <div className="grid grid-cols-[1fr_48px_80px_80px] gap-2 text-[10px] tracking-[0.15em] uppercase text-gray-400 pb-2 mb-2" style={{ borderBottom: "1px solid #e5e7eb" }}>
          <span>Description</span>
          <span className="text-center">Qty</span>
          <span className="text-right">Rate</span>
          <span className="text-right">Total</span>
        </div>
        {data.lineItems.map((li, i) => (
          <div key={li.id} className={`grid grid-cols-[1fr_48px_80px_80px] gap-2 py-2 text-xs ${i < data.lineItems.length - 1 ? "border-b border-gray-100" : ""}`}>
            <span className="text-gray-800">{li.description || "\u2014"}</span>
            <span className="text-center text-gray-500">{li.quantity}</span>
            <span className="text-right text-gray-500">${fmt(li.rate)}</span>
            <span className="text-right text-gray-900 font-medium">${fmt(li.quantity * li.rate)}</span>
          </div>
        ))}
      </div>

      {/* totals */}
      <div className="flex justify-end mb-4">
        <div className="w-52 text-xs space-y-1.5">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span><span>${fmt(subtotal)}</span>
          </div>
          {data.taxRate > 0 && (
            <div className="flex justify-between text-gray-500">
              <span>Tax ({data.taxRate}%)</span><span>${fmt(taxAmount)}</span>
            </div>
          )}
          {discountAmount > 0 && (
            <div className="flex justify-between text-gray-500">
              <span>Discount</span><span>-${fmt(discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-sm pt-2" style={{ borderTop: "1px solid #374151" }}>
            <span className="text-gray-900">Estimated Total</span>
            <span className="text-gray-900">${fmt(total)}</span>
          </div>
        </div>
      </div>

      {/* validity note */}
      {data.validUntil && (
        <p className="text-[10px] text-gray-400 text-right mb-8 italic">
          This estimate is valid until {formatDate(data.validUntil)}
        </p>
      )}

      {/* terms */}
      {data.terms && (
        <div className="pt-5 mb-4" style={{ borderTop: "1px solid #e5e7eb" }}>
          <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-1.5">Terms &amp; Conditions</p>
          <p className="text-gray-500 text-xs whitespace-pre-wrap leading-relaxed">{data.terms}</p>
        </div>
      )}

      {/* notes */}
      {data.notes && (
        <div className="pt-5" style={{ borderTop: "1px solid #e5e7eb" }}>
          <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-1.5">Notes</p>
          <p className="text-gray-500 text-xs whitespace-pre-wrap leading-relaxed">{data.notes}</p>
        </div>
      )}

      <p className="text-center text-[10px] text-gray-300 mt-10">Generated with PrestoKit &mdash; free business tools</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Toast                                                              */
/* ------------------------------------------------------------------ */

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-xl bg-[#7c6cf0] px-5 py-3 text-sm font-medium text-white shadow-xl shadow-[#7c6cf0]/30 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {message}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function EstimateBuilderPage() {
  const [data, setData] = useState<EstimateData>(defaultData);
  const [template, setTemplate] = useState<TemplateStyle>("Classic");
  const [termsOpen, setTermsOpen] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  /* ------ derived values ------ */
  const subtotal = data.lineItems.reduce((sum, li) => sum + li.quantity * li.rate, 0);
  const taxAmount = subtotal * (data.taxRate / 100);
  const discountAmount = data.discount;
  const total = subtotal + taxAmount - discountAmount;

  /* ------ updaters ------ */
  const set = useCallback(
    <K extends keyof EstimateData>(key: K, value: EstimateData[K]) => {
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
      lineItems: [...prev.lineItems, { id: uid(), description: "", quantity: 1, rate: 0 }],
    }));
  }, []);

  const removeLineItem = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      lineItems: prev.lineItems.length === 1 ? prev.lineItems : prev.lineItems.filter((li) => li.id !== id),
    }));
  }, []);

  const resetForm = useCallback(() => {
    setData(defaultData());
  }, []);

  /* ------ toast helper ------ */
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }, []);

  /* ------ print ------ */
  const handlePrint = useCallback(async () => {
    const element = document.getElementById("estimate-print-area");
    if (!element) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const html2pdf = (await import("html2pdf.js" as any)).default;
    html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: `estimate-${data.estimateNumber}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  }, [data.estimateNumber]);

  /* ------ convert to invoice ------ */
  const handleConvertToInvoice = useCallback(() => {
    window.open("/tools/invoice-generator", "_blank");
    showToast("Open the Invoice Generator to continue");
  }, [showToast]);

  /* ------ shared input classes ------ */
  const inputCls =
    "w-full rounded-lg border border-white/10 bg-[#12121c] px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-[#7c6cf0]/60 focus:ring-1 focus:ring-[#7c6cf0]/40 transition";
  const labelCls = "block text-xs font-medium text-gray-400 mb-1";

  const previewProps: PreviewProps = { data, subtotal, taxAmount, discountAmount, total };

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <>
      {/* ---------- SEO head ---------- */}
      <title>Free Estimate &amp; Quote Builder &mdash; Create Professional Estimates | PrestoKit</title>
      <meta
        name="description"
        content="Create professional project estimates and quotes for free. No sign-up required. Fill in your details and download a PDF estimate instantly — 100% in your browser."
      />

      {/* ============================== PRINT STYLES ============================== */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #estimate-print-area, #estimate-print-area * { visibility: visible !important; }
          #estimate-print-area {
            position: absolute; left: 0; top: 0;
            width: 100%; padding: 0; margin: 0;
          }
          @page { margin: 0.5in; size: letter; }
        }
      `}</style>

      <Toast message={toastMessage} visible={toastVisible} />

      <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-[family-name:var(--font-geist-sans)] print:hidden">
        {/* ---------- breadcrumb ---------- */}
        <nav className="border-b border-white/5 bg-[#0e0e18]">
          <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
            <a href="/" className="hover:text-[#7c6cf0] transition">PrestoKit</a>
            <span>/</span>
            <a href="/tools" className="hover:text-[#7c6cf0] transition">Tools</a>
            <span>/</span>
            <span className="text-gray-300">Estimate Builder</span>
          </div>
        </nav>

        {/* ---------- header ---------- */}
        <header className="mx-auto max-w-7xl px-4 pt-10 pb-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Estimate &amp; Quote Builder
          </h1>
          <p className="mt-2 text-gray-400 max-w-xl">
            Create professional project estimates and quotes in seconds.
            Everything runs in your browser &mdash; nothing is uploaded.
          </p>
        </header>

        {/* ---------- main grid ---------- */}
        <main className="mx-auto max-w-7xl px-4 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ======================== LEFT: FORM ======================== */}
          <div className="space-y-6">

            {/* --- Template Selector --- */}
            <section className="rounded-2xl border border-[#7c6cf0]/30 bg-[#0f0f1c] p-5">
              <h2 className="text-lg font-semibold mb-1 text-gray-200">Template Style</h2>
              <p className="text-xs text-gray-500 mb-4">Choose how your estimate looks to your client.</p>
              <div className="grid grid-cols-3 gap-3">
                {(["Classic", "Modern", "Minimal"] as TemplateStyle[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTemplate(t)}
                    className={`relative rounded-xl border-2 p-3 text-sm font-semibold transition-all ${
                      template === t
                        ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                        : "border-white/10 bg-[#12121c] text-gray-400 hover:border-white/20 hover:text-gray-200"
                    }`}
                  >
                    {/* miniature visual hint */}
                    <div className={`w-full h-10 rounded mb-2 overflow-hidden flex flex-col gap-0.5 ${template === t ? "opacity-100" : "opacity-60"}`}>
                      {t === "Classic" && (
                        <>
                          <div className="h-2 w-10 rounded-sm bg-[#7c6cf0]/60" />
                          <div className="h-1 w-full rounded-sm bg-gray-300/30" />
                          <div className="h-1 w-3/4 rounded-sm bg-gray-300/20" />
                          <div className="h-1 w-full rounded-sm bg-gray-200/20 mt-1" />
                          <div className="h-1 w-full rounded-sm bg-gray-200/20" />
                        </>
                      )}
                      {t === "Modern" && (
                        <>
                          <div className="h-4 w-full rounded-sm bg-[#7c6cf0]/70" />
                          <div className="h-1 w-full rounded-sm bg-gray-300/20 mt-0.5" />
                          <div className="h-1 w-3/4 rounded-sm bg-gray-300/20" />
                          <div className="h-1.5 w-1/2 rounded-sm bg-[#7c6cf0]/50 mt-0.5" />
                        </>
                      )}
                      {t === "Minimal" && (
                        <>
                          <div className="h-1 w-full rounded-sm bg-gray-400/30" />
                          <div className="h-1 w-full rounded-sm bg-gray-400/15 mt-1" />
                          <div className="h-1 w-3/4 rounded-sm bg-gray-400/15" />
                          <div className="h-px w-full bg-gray-400/30 mt-1" />
                          <div className="h-1 w-full rounded-sm bg-gray-400/15 mt-1" />
                        </>
                      )}
                    </div>
                    {t}
                    {template === t && (
                      <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#7c6cf0]" />
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* --- Your Business --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">Your Business</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Business Name</label>
                  <input className={inputCls} placeholder="Acme Corp" value={data.businessName} onChange={(e) => set("businessName", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input className={inputCls} type="email" placeholder="you@business.com" value={data.businessEmail} onChange={(e) => set("businessEmail", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Phone</label>
                  <input className={inputCls} placeholder="(555) 123-4567" value={data.businessPhone} onChange={(e) => set("businessPhone", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Address</label>
                  <input className={inputCls} placeholder="123 Main St, City, ST 00000" value={data.businessAddress} onChange={(e) => set("businessAddress", e.target.value)} />
                </div>
              </div>
            </section>

            {/* --- Client --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">Client</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Client Name</label>
                  <input className={inputCls} placeholder="John Smith" value={data.clientName} onChange={(e) => set("clientName", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Company</label>
                  <input className={inputCls} placeholder="Client Company LLC" value={data.clientCompany} onChange={(e) => set("clientCompany", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Client Email</label>
                  <input className={inputCls} type="email" placeholder="client@email.com" value={data.clientEmail} onChange={(e) => set("clientEmail", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Client Address</label>
                  <input className={inputCls} placeholder="456 Oak Ave, Town, ST 11111" value={data.clientAddress} onChange={(e) => set("clientAddress", e.target.value)} />
                </div>
              </div>
            </section>

            {/* --- Estimate Details --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">Estimate Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Estimate Number</label>
                  <input className={inputCls} value={data.estimateNumber} onChange={(e) => set("estimateNumber", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <div className="flex items-center gap-2">
                    <select
                      className={inputCls}
                      value={data.status}
                      onChange={(e) => set("status", e.target.value as EstimateStatus)}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Sent">Sent</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Declined">Declined</option>
                    </select>
                    <span className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS_DARK[data.status]}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {data.status}
                    </span>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Estimate Date</label>
                  <input className={inputCls} type="date" value={data.estimateDate} onChange={(e) => set("estimateDate", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Estimate Valid Until</label>
                  <input className={inputCls} type="date" value={data.validUntil} onChange={(e) => set("validUntil", e.target.value)} />
                </div>
              </div>
            </section>

            {/* --- Project --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">Project</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Project Title</label>
                  <input className={inputCls} placeholder="Website Redesign" value={data.projectTitle} onChange={(e) => set("projectTitle", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Project Description</label>
                  <textarea
                    className={inputCls + " min-h-[60px] resize-y"}
                    placeholder="Brief description of the project scope and deliverables..."
                    value={data.projectDescription}
                    onChange={(e) => set("projectDescription", e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* --- Line Items --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">Line Items</h2>

              {/* header row */}
              <div className="hidden sm:grid sm:grid-cols-[1fr_80px_100px_100px_40px] gap-2 text-xs font-medium text-gray-500 mb-2 px-1">
                <span>Description</span>
                <span>Qty</span>
                <span>Rate ($)</span>
                <span>Total</span>
                <span />
              </div>

              {data.lineItems.map((li) => (
                <div key={li.id} className="grid grid-cols-1 sm:grid-cols-[1fr_80px_100px_100px_40px] gap-2 mb-2 items-center">
                  <input
                    className={inputCls}
                    placeholder="Description"
                    value={li.description}
                    onChange={(e) => updateLineItem(li.id, "description", e.target.value)}
                  />
                  <input
                    className={inputCls + " text-center"}
                    type="number"
                    min={0}
                    value={li.quantity}
                    onChange={(e) => updateLineItem(li.id, "quantity", Math.max(0, Number(e.target.value)))}
                  />
                  <input
                    className={inputCls + " text-center"}
                    type="number"
                    min={0}
                    step="0.01"
                    value={li.rate}
                    onChange={(e) => updateLineItem(li.id, "rate", Math.max(0, Number(e.target.value)))}
                  />
                  <div className="flex items-center justify-center text-sm text-gray-300 bg-[#12121c] rounded-lg border border-white/10 py-2">
                    ${fmt(li.quantity * li.rate)}
                  </div>
                  <button
                    onClick={() => removeLineItem(li.id)}
                    className="flex items-center justify-center text-gray-500 hover:text-red-400 transition h-9"
                    title="Remove"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}

              <button
                onClick={addLineItem}
                className="mt-2 flex items-center gap-1 text-sm text-[#7c6cf0] hover:text-[#9b8ff5] transition font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Line Item
              </button>
            </section>

            {/* --- Tax / Discount --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">Tax &amp; Discount</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Tax Rate (%)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    step="0.01"
                    value={data.taxRate}
                    onChange={(e) => set("taxRate", Math.max(0, Number(e.target.value)))}
                  />
                </div>
                <div>
                  <label className={labelCls}>Discount ($)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    step="0.01"
                    value={data.discount}
                    onChange={(e) => set("discount", Math.max(0, Number(e.target.value)))}
                  />
                </div>
              </div>
            </section>

            {/* --- Notes --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">Notes</h2>
              <textarea
                className={inputCls + " min-h-[60px] resize-y"}
                placeholder="Thank you for considering our services!"
                value={data.notes}
                onChange={(e) => set("notes", e.target.value)}
              />
            </section>

            {/* --- Terms & Conditions (collapsible) --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] overflow-hidden">
              <button
                onClick={() => setTermsOpen(!termsOpen)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#1e1e2e]/60 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-200">Terms &amp; Conditions</h2>
                  <span className="text-xs rounded-full bg-[#7c6cf0]/20 text-[#9d90f5] px-2 py-0.5 font-medium">Pre-filled</span>
                </div>
                <svg
                  className={`w-5 h-5 shrink-0 text-[#7c6cf0] transition-transform duration-200 ${termsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {termsOpen && (
                <div className="px-5 pb-5">
                  <p className="text-xs text-gray-500 mb-3">Standard freelancer terms are pre-filled. Edit to match your needs.</p>
                  <textarea
                    className={inputCls + " min-h-[100px] resize-y"}
                    value={data.terms}
                    onChange={(e) => set("terms", e.target.value)}
                  />
                </div>
              )}
            </section>

            {/* --- Action buttons --- */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 rounded-xl bg-[#00e676] px-6 py-3 text-sm font-semibold text-black hover:bg-[#00c864] transition shadow-lg shadow-[#00e676]/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
                </svg>
                Download PDF
              </button>
              <button
                onClick={handleConvertToInvoice}
                className="flex items-center gap-2 rounded-xl bg-[#7c6cf0] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6b5ce0] transition shadow-lg shadow-[#7c6cf0]/25"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Convert to Invoice
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
            {/* template label + preview header */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-400">Live Preview</h2>
              <span className="text-xs rounded-full border border-[#7c6cf0]/40 bg-[#7c6cf0]/10 text-[#9d90f5] px-2.5 py-0.5 font-medium">
                {template}
              </span>
            </div>
            <div className="rounded-2xl border border-white/5 overflow-hidden shadow-2xl shadow-black/40">
              {template === "Classic" && <ClassicPreview {...previewProps} />}
              {template === "Modern" && <ModernPreview {...previewProps} />}
              {template === "Minimal" && <MinimalPreview {...previewProps} />}
            </div>
          </div>
        </main>

        {/* ==================== HOW IT WORKS ==================== */}
        <section className="mx-auto max-w-7xl px-4 pt-16 pb-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            How It <span className="text-[#7c6cf0]">Works</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Add Business & Client Info",
                desc: "Enter your business details and your client's information. Set the estimate number, date, and validity period for a professional, trackable document.",
              },
              {
                step: "2",
                title: "Build Your Line Items",
                desc: "Add each service or deliverable with a description, quantity, and rate. Include tax, discounts, terms, and project scope to create a comprehensive estimate.",
              },
              {
                step: "3",
                title: "Preview & Download",
                desc: "Watch your estimate come together in the live preview. When it looks right, download as a PDF to email to your client or print for your records.",
              },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border border-white/5 bg-[#1a1a26] p-6 text-center">
                <div className="w-10 h-10 rounded-full bg-[#7c6cf0]/20 border border-[#7c6cf0]/40 flex items-center justify-center text-[#9d90f5] font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== FAQ SECTION ==================== */}
        <section className="mx-auto max-w-7xl px-4 pt-16 pb-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked <span className="text-[#7c6cf0]">Questions</span>
          </h2>
          <div className="space-y-3 max-w-3xl mx-auto">
            <FAQItem
              question="What's the difference between an estimate and a quote?"
              answer="An estimate is an approximate calculation of the expected cost of a project or service. It is understood that the final price may vary based on actual work performed, materials used, or unforeseen circumstances. A quote (or quotation) is a fixed price offer that the provider agrees to honor for a specified period. Once a client accepts a quote, the price is typically locked in and cannot change unless the scope of work changes. Use an estimate when the full scope is uncertain, and a quote when you can confidently predict the total cost. Many businesses start with an estimate and convert it to a formal quote once the project details are finalized."
            />
            <FAQItem
              question="How do I write a professional project estimate?"
              answer="A professional estimate should include several key components: your business name and contact information, the client's details, a unique estimate number, the date of issue and expiration date, a clear project title and description, a detailed breakdown of line items with quantities and rates, subtotals, applicable taxes and discounts, the total estimated cost, payment terms and conditions, and any assumptions or exclusions. The more specific and transparent your estimate is, the more trust you build with the client. Avoid vague descriptions like 'design work' -- instead, break it down into specific deliverables like 'homepage design,' 'mobile responsive layout,' and 'two rounds of revisions.' This clarity protects both you and your client."
            />
            <FAQItem
              question="Should estimates include tax?"
              answer="Yes, it is best practice to include tax in your estimates so clients know the full expected cost upfront. If you are required to collect sales tax on your services or products, show it as a separate line item below the subtotal. This transparency helps avoid surprises when the final invoice arrives. If you are unsure whether your service is taxable, consult with an accountant or check your state's tax authority guidelines. Some services like professional consulting may be exempt from sales tax in certain states, while tangible goods are almost always taxable. Including tax on estimates also helps you budget and forecast revenue more accurately."
            />
            <FAQItem
              question="How long should an estimate be valid?"
              answer="Most business estimates are valid for 30 days, though this can vary depending on the industry and project type. For projects with volatile material costs (like construction), a shorter validity of 14-15 days may be appropriate. For stable service-based projects, 30-60 days is common. Always clearly state the expiration date on your estimate. After the validity period expires, you reserve the right to adjust pricing based on current costs. Including a validity period creates urgency for the client to make a decision and protects you from being locked into prices that may have changed. Our estimate builder includes a 'Valid Until' field that defaults to 30 days from the creation date."
            />
            <FAQItem
              question="What happens if the project costs more than the estimate?"
              answer="Since an estimate is an approximation (not a fixed price), the final cost may differ from the estimated amount. If you realize during a project that costs will exceed the estimate, the professional approach is to notify the client as soon as possible, explain the reasons for the increase (additional scope, unforeseen complications, material price changes), provide a revised estimate for their approval before proceeding, and document the changes in writing. Most clients understand that estimates can change, especially for complex projects. The key is communication -- surprises at the end of a project damage trust and relationships. To protect yourself, include a clause in your terms stating that the estimate is subject to change and that significant variations will be communicated promptly."
            />
            <FAQItem
              question="How detailed should a project estimate be?"
              answer="The level of detail in your estimate should match the complexity and value of the project. For smaller projects under $1,000, a simple estimate with a few line items may suffice. For larger projects, a more detailed breakdown is expected and beneficial. As a rule of thumb, break your estimate into enough line items that the client can understand what they are paying for, but not so many that the document becomes overwhelming. Group related tasks into logical categories (like 'Design Phase,' 'Development Phase,' 'Testing Phase') and provide brief descriptions for each line item. Include assumptions and exclusions to set clear boundaries. A well-detailed estimate demonstrates professionalism, sets expectations, and reduces the likelihood of scope creep and disputes later in the project."
            />
          </div>
        </section>

        {/* ==================== RELATED TOOLS ==================== */}
        <section className="mx-auto max-w-7xl px-4 pt-16 pb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Related <span className="text-[#7c6cf0]">Tools</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Invoice Generator",
                desc: "Convert your estimates into professional invoices. Add payment terms and send to clients instantly.",
                href: "/tools/invoice-generator",
              },
              {
                title: "Profit Margin Calculator",
                desc: "Make sure your estimates are profitable. Calculate margins, markups, and break-even points.",
                href: "/tools/profit-margin-calculator",
              },
              {
                title: "Receipt Maker",
                desc: "Generate receipts for completed projects and payments received from your clients.",
                href: "/tools/receipt-maker",
              },
            ].map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl border border-white/5 bg-[#1a1a26] p-6 hover:border-[#7c6cf0]/40 hover:shadow-[0_0_24px_rgba(124,108,240,0.08)] transition-all"
              >
                <h3 className="text-white font-semibold text-base mb-2 group-hover:text-[#9d90f5] transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{tool.desc}</p>
                <span className="inline-block mt-3 text-xs text-[#7c6cf0] font-medium">
                  Try it free &rarr;
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ==================== FAQ SCHEMA (JSON-LD) ==================== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What's the difference between an estimate and a quote?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "An estimate is an approximate cost calculation where the final price may vary. A quote is a fixed price offer that the provider agrees to honor for a specified period. Use an estimate when scope is uncertain, and a quote when you can confidently predict the total cost.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I write a professional project estimate?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Include your business and client details, a unique estimate number, date and expiration, project description, detailed line items with quantities and rates, taxes and discounts, total cost, payment terms, and assumptions or exclusions. Break deliverables into specific items for clarity.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Should estimates include tax?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, include tax as a separate line item so clients know the full expected cost upfront. This avoids surprises on the final invoice. Check your state's tax authority guidelines for whether your specific services are taxable.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How long should an estimate be valid?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Most estimates are valid for 30 days. For projects with volatile material costs, 14-15 days may be appropriate. For stable services, 30-60 days is common. Always clearly state the expiration date to create urgency and protect against price changes.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What happens if the project costs more than the estimate?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Notify the client as soon as possible, explain the reasons for the increase, provide a revised estimate for approval, and document changes in writing. Include a clause in your terms stating the estimate is subject to change.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How detailed should a project estimate be?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Detail should match project complexity. For projects under $1,000, a few line items may suffice. For larger projects, group tasks into categories with descriptions. Include assumptions and exclusions to set clear boundaries and prevent scope creep.",
                  },
                },
              ],
            }),
          }}
        />
      </div>
    </>
  );
}

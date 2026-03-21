"use client";

import { useState, useCallback, useRef } from "react";
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
    a: "The current version of our invoice generator creates clean, professional invoices with your business details. We are actively working on adding logo upload and additional template customization features. In the meantime, you can download the PDF and add your logo using any PDF editor or by pasting it into a document editor before sending.",
  },
  {
    q: "What file format does the invoice download as?",
    a: "When you click \"Download PDF,\" the invoice opens your browser's print dialog, which lets you save it as a PDF file. This is the most universally accepted format for invoices because PDFs maintain their formatting across all devices and operating systems. You can then email the PDF directly to your client or upload it to your invoicing system.",
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

function defaultData(): InvoiceData {
  return {
    businessName: "",
    businessAddress: "",
    businessEmail: "",
    businessPhone: "",
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
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function InvoiceGeneratorPage() {
  const [data, setData] = useState<InvoiceData>(defaultData);
  const printRef = useRef<HTMLDivElement>(null);

  /* ------ derived values ------ */
  const subtotal = data.lineItems.reduce(
    (sum, li) => sum + li.quantity * li.rate,
    0
  );
  const taxAmount = subtotal * (data.taxRate / 100);
  const discountAmount = data.discount;
  const total = subtotal + taxAmount - discountAmount;

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
  }, []);

  /* ------ print ------ */
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  /* ------ shared input classes ------ */
  const inputCls =
    "w-full rounded-lg border border-white/10 bg-[#12121c] px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-[#7c6cf0]/60 focus:ring-1 focus:ring-[#7c6cf0]/40 transition";
  const labelCls = "block text-xs font-medium text-gray-400 mb-1";

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <>
      {/* ---------- SEO head ---------- */}
      <title>Free Invoice Generator &mdash; PrestoKit</title>
      <meta
        name="description"
        content="Create professional invoices for free. No sign-up required. Fill in your details and download a PDF invoice instantly — 100% in your browser."
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
            Create professional invoices in seconds. Everything runs in your
            browser — nothing is uploaded.
          </p>
        </header>

        {/* ---------- main grid ---------- */}
        <main className="mx-auto max-w-7xl px-4 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ======================== LEFT: FORM ======================== */}
          <div className="space-y-6">
            {/* --- Your Business --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">
                Your Business
              </h2>
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
                <span>Rate ($)</span>
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
                    ${fmt(li.quantity * li.rate)}
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
                  <label className={labelCls}>Discount ($)</label>
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
            <h2 className="text-sm font-medium text-gray-400 mb-3">
              Live Preview
            </h2>
            <div className="rounded-2xl border border-white/5 bg-white overflow-hidden shadow-2xl shadow-black/40">
              {/* This inner div IS the preview and also the print target */}
              <div
                id="invoice-print-area"
                ref={printRef}
                className="p-8 sm:p-10 text-gray-900 text-sm leading-relaxed"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                {/* top row: title + invoice meta */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2
                      className="text-2xl font-bold tracking-tight"
                      style={{ color: "#7c6cf0" }}
                    >
                      INVOICE
                    </h2>
                    <p className="text-gray-500 mt-1 text-xs">
                      {data.invoiceNumber}
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-500 space-y-0.5">
                    <p>
                      <span className="font-medium text-gray-700">Date:</span>{" "}
                      {formatDate(data.invoiceDate)}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Due:</span>{" "}
                      {formatDate(data.dueDate)}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Terms:</span>{" "}
                      {data.paymentTerms}
                    </p>
                  </div>
                </div>

                {/* from / to */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                      From
                    </p>
                    <p className="font-semibold text-gray-900">
                      {data.businessName || "Your Business"}
                    </p>
                    {data.businessAddress && (
                      <p className="text-gray-600 text-xs">
                        {data.businessAddress}
                      </p>
                    )}
                    {data.businessEmail && (
                      <p className="text-gray-600 text-xs">
                        {data.businessEmail}
                      </p>
                    )}
                    {data.businessPhone && (
                      <p className="text-gray-600 text-xs">
                        {data.businessPhone}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                      Bill To
                    </p>
                    <p className="font-semibold text-gray-900">
                      {data.clientName || "Client Name"}
                    </p>
                    {data.clientAddress && (
                      <p className="text-gray-600 text-xs">
                        {data.clientAddress}
                      </p>
                    )}
                    {data.clientEmail && (
                      <p className="text-gray-600 text-xs">
                        {data.clientEmail}
                      </p>
                    )}
                  </div>
                </div>

                {/* line items table */}
                <table className="w-full text-xs mb-6">
                  <thead>
                    <tr
                      className="text-left"
                      style={{ borderBottom: "2px solid #7c6cf0" }}
                    >
                      <th className="pb-2 font-semibold text-gray-700">
                        Description
                      </th>
                      <th className="pb-2 font-semibold text-gray-700 text-center w-16">
                        Qty
                      </th>
                      <th className="pb-2 font-semibold text-gray-700 text-right w-24">
                        Rate
                      </th>
                      <th className="pb-2 font-semibold text-gray-700 text-right w-24">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.lineItems.map((li, i) => (
                      <tr
                        key={li.id}
                        className={
                          i % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }
                      >
                        <td className="py-2 px-1 text-gray-800">
                          {li.description || "—"}
                        </td>
                        <td className="py-2 text-center text-gray-600">
                          {li.quantity}
                        </td>
                        <td className="py-2 text-right text-gray-600">
                          ${fmt(li.rate)}
                        </td>
                        <td className="py-2 text-right font-medium text-gray-900">
                          ${fmt(li.quantity * li.rate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* totals */}
                <div className="flex justify-end mb-8">
                  <div className="w-56 text-xs space-y-1">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${fmt(subtotal)}</span>
                    </div>
                    {data.taxRate > 0 && (
                      <div className="flex justify-between text-gray-600">
                        <span>Tax ({data.taxRate}%)</span>
                        <span>${fmt(taxAmount)}</span>
                      </div>
                    )}
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-gray-600">
                        <span>Discount</span>
                        <span>-${fmt(discountAmount)}</span>
                      </div>
                    )}
                    <div
                      className="flex justify-between font-bold text-base pt-2 mt-2"
                      style={{ borderTop: "2px solid #7c6cf0" }}
                    >
                      <span>Total</span>
                      <span>${fmt(total)}</span>
                    </div>
                  </div>
                </div>

                {/* notes */}
                {data.notes && (
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                      Notes / Terms
                    </p>
                    <p className="text-gray-600 text-xs whitespace-pre-wrap">
                      {data.notes}
                    </p>
                  </div>
                )}

                {/* footer */}
                <p className="text-center text-[10px] text-gray-300 mt-10">
                  Generated with PrestoKit &mdash; free business tools
                </p>
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
            url: "https://consciousmirage.gumroad.com/l/email-templates-bundle",
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
                desc: "Fill in your business information, client details, and invoice specifics like date and payment terms.",
              },
              {
                step: "2",
                title: "Add Line Items",
                desc: "List your products or services with quantities and rates. Add tax and discounts as needed — totals calculate automatically.",
              },
              {
                step: "3",
                title: "Download Your Invoice",
                desc: "Preview your invoice in real-time, then click Download PDF to save it. Send it to your client via email or print it.",
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

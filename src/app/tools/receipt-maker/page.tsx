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
  price: number;
}

interface ReceiptData {
  /* Business */
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  /* Receipt meta */
  receiptNumber: string;
  receiptDate: string;
  paymentMethod: string;
  /* Line items */
  lineItems: LineItem[];
  /* Financials */
  taxRate: number;
  tip: number;
  /* Notes */
  notes: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateReceiptNumber(): string {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `RCT-${y}${m}${d}-${rand}`;
}

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
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

function defaultData(): ReceiptData {
  return {
    businessName: "",
    businessAddress: "",
    businessPhone: "",
    businessEmail: "",
    receiptNumber: generateReceiptNumber(),
    receiptDate: todayISO(),
    paymentMethod: "Cash",
    lineItems: [{ id: uid(), description: "", quantity: 1, price: 0 }],
    taxRate: 0,
    tip: 0,
    notes: "",
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ReceiptMakerPage() {
  const [data, setData] = useState<ReceiptData>(defaultData);
  const printRef = useRef<HTMLDivElement>(null);

  /* ------ derived values ------ */
  const subtotal = data.lineItems.reduce(
    (sum, li) => sum + li.quantity * li.price,
    0
  );
  const taxAmount = subtotal * (data.taxRate / 100);
  const tipAmount = data.tip;
  const total = subtotal + taxAmount + tipAmount;

  /* ------ updaters ------ */
  const set = useCallback(
    <K extends keyof ReceiptData>(key: K, value: ReceiptData[K]) => {
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
        { id: uid(), description: "", quantity: 1, price: 0 },
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
      <title>Free Receipt Maker &mdash; Create &amp; Download Receipts | PrestoKit</title>
      <meta
        name="description"
        content="Create professional receipts for free. No sign-up required. Fill in your details and download a PDF receipt instantly — 100% in your browser."
      />

      {/* ============================== PRINT STYLES ============================== */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #receipt-print-area, #receipt-print-area * { visibility: visible !important; }
          #receipt-print-area {
            position: absolute; left: 50%; top: 0;
            transform: translateX(-50%);
            width: 340px; padding: 0; margin: 0;
          }
          @page { margin: 0.4in; size: letter; }
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
            <span className="text-gray-300">Receipt Maker</span>
          </div>
        </nav>

        {/* ---------- header ---------- */}
        <header className="mx-auto max-w-7xl px-4 pt-10 pb-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Receipt Maker
          </h1>
          <p className="mt-2 text-gray-400 max-w-xl">
            Generate professional receipts in seconds. Everything runs in your
            browser &mdash; nothing is uploaded.
          </p>
        </header>

        {/* ---------- main grid ---------- */}
        <main className="mx-auto max-w-7xl px-4 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ======================== LEFT: FORM ======================== */}
          <div className="space-y-6">
            {/* --- Business Info --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">
                Business Information
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

            {/* --- Receipt Details --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">
                Receipt Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Receipt Number</label>
                  <input
                    className={inputCls}
                    value={data.receiptNumber}
                    onChange={(e) => set("receiptNumber", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Date</label>
                  <input
                    className={inputCls}
                    type="date"
                    value={data.receiptDate}
                    onChange={(e) => set("receiptDate", e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Payment Method</label>
                  <select
                    className={inputCls}
                    value={data.paymentMethod}
                    onChange={(e) => set("paymentMethod", e.target.value)}
                  >
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Check">Check</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Other">Other</option>
                  </select>
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
                <span>Price ($)</span>
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
                    value={li.price}
                    onChange={(e) =>
                      updateLineItem(
                        li.id,
                        "price",
                        Math.max(0, Number(e.target.value))
                      )
                    }
                  />
                  <div className="flex items-center justify-center text-sm text-gray-300 bg-[#12121c] rounded-lg border border-white/10 py-2">
                    ${fmt(li.quantity * li.price)}
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

            {/* --- Tax, Tip & Notes --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">
                Tax, Tip &amp; Notes
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
                  <label className={labelCls}>Tip / Gratuity ($)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    step="0.01"
                    value={data.tip}
                    onChange={(e) =>
                      set("tip", Math.max(0, Number(e.target.value)))
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Notes</label>
                  <textarea
                    className={inputCls + " min-h-[80px] resize-y"}
                    placeholder="Thank you for your purchase!"
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
            <div className="rounded-2xl border border-white/5 bg-white overflow-hidden shadow-2xl shadow-black/40 flex justify-center">
              {/* Receipt wrapper — narrow, centered, like a real receipt */}
              <div
                id="receipt-print-area"
                ref={printRef}
                className="w-full max-w-[340px] py-10 px-8 text-gray-900 text-sm leading-relaxed"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                {/* Business header */}
                <div className="text-center mb-6">
                  <h2 className="text-lg font-bold tracking-tight text-gray-900">
                    {data.businessName || "Business Name"}
                  </h2>
                  {data.businessAddress && (
                    <p className="text-gray-500 text-xs mt-1">
                      {data.businessAddress}
                    </p>
                  )}
                  {data.businessPhone && (
                    <p className="text-gray-500 text-xs">
                      {data.businessPhone}
                    </p>
                  )}
                  {data.businessEmail && (
                    <p className="text-gray-500 text-xs">
                      {data.businessEmail}
                    </p>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t-2 border-dashed border-gray-300 mb-4" />

                {/* Receipt meta */}
                <div className="text-xs text-gray-600 space-y-1 mb-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Receipt #</span>
                    <span>{data.receiptNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Date</span>
                    <span>{formatDate(data.receiptDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Payment</span>
                    <span>{data.paymentMethod}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 mb-4" />

                {/* Line items */}
                <div className="mb-4">
                  {/* Column headers */}
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400 mb-2 pb-1 border-b border-gray-200">
                    <span className="flex-1">Item</span>
                    <span className="w-10 text-center">Qty</span>
                    <span className="w-16 text-right">Price</span>
                    <span className="w-16 text-right">Total</span>
                  </div>
                  {data.lineItems.map((li) => (
                    <div
                      key={li.id}
                      className="flex justify-between text-xs py-1.5"
                    >
                      <span className="flex-1 text-gray-800 truncate pr-2">
                        {li.description || "\u2014"}
                      </span>
                      <span className="w-10 text-center text-gray-600">
                        {li.quantity}
                      </span>
                      <span className="w-16 text-right text-gray-600">
                        ${fmt(li.price)}
                      </span>
                      <span className="w-16 text-right font-medium text-gray-900">
                        ${fmt(li.quantity * li.price)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-dashed border-gray-300 mb-3" />

                {/* Totals */}
                <div className="text-xs space-y-1.5 mb-4">
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
                  {tipAmount > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span>Tip</span>
                      <span>${fmt(tipAmount)}</span>
                    </div>
                  )}
                  <div className="border-t-2 border-gray-800 pt-2 mt-2">
                    <div className="flex justify-between font-bold text-base text-gray-900">
                      <span>Total</span>
                      <span>${fmt(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {data.notes && (
                  <>
                    <div className="border-t border-dashed border-gray-300 mb-3" />
                    <div className="text-xs text-gray-500 whitespace-pre-wrap">
                      {data.notes}
                    </div>
                  </>
                )}

                {/* Footer */}
                <div className="border-t border-dashed border-gray-300 mt-6 pt-4">
                  <p className="text-center text-[10px] text-gray-400">
                    Thank you for your business!
                  </p>
                  <p className="text-center text-[10px] text-gray-300 mt-2">
                    Generated with PrestoKit &mdash; free business tools
                  </p>
                </div>
              </div>
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
                title: "Enter Your Details",
                desc: "Fill in your business name, address, and contact information. Add the receipt date, number, and payment method for a complete record.",
              },
              {
                step: "2",
                title: "Add Line Items",
                desc: "List each product or service with its description, quantity, and price. Add as many items as you need -- the totals calculate automatically.",
              },
              {
                step: "3",
                title: "Download Your Receipt",
                desc: "Preview your receipt in real time on the right side. When it looks good, click Download PDF to save a professional receipt instantly.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-white/5 bg-[#1a1a26] p-6 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#7c6cf0]/20 border border-[#7c6cf0]/40 flex items-center justify-center text-[#9d90f5] font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-semibold text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
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
              question="What information is required on a receipt?"
              answer="A complete receipt should include the business name and contact information, the date of the transaction, a unique receipt number, a description of each item or service purchased, the quantity and price of each item, the subtotal, any applicable tax, the total amount paid, and the payment method used. While requirements vary by jurisdiction, including all of these elements ensures your receipt is professional, legally compliant, and useful for both your records and your customer's. Some states also require the business address and tax identification number to be printed on receipts."
            />
            <FAQItem
              question="What's the difference between a receipt and an invoice?"
              answer="A receipt and an invoice serve different purposes in a transaction. An invoice is sent before or at the time of a transaction to request payment -- it says 'you owe this amount.' A receipt is issued after payment has been received -- it says 'payment was received for this amount.' Invoices typically include payment terms, due dates, and payment instructions, while receipts confirm that the transaction is complete. In short, an invoice requests money, and a receipt confirms it was paid. Both are important business documents, but they are used at different stages of the payment process."
            />
            <FAQItem
              question="Do I need to provide receipts for my business?"
              answer="In most jurisdictions, businesses are legally required to provide receipts for transactions, especially those involving sales tax. Even where it is not strictly mandatory, providing receipts is considered best practice for several reasons: it builds customer trust, creates a paper trail for accounting and tax purposes, helps resolve disputes, and demonstrates professionalism. For tax deductions, both you and your customers need receipts as proof of business expenses. The IRS and most tax authorities require documentation for any business expense deduction. Digital receipts are generally accepted and are becoming the standard in modern business."
            />
            <FAQItem
              question="Can I create a receipt for a cash payment?"
              answer="Yes, you can and should create receipts for cash payments. In fact, cash transactions are where receipts are most important because there is no automatic digital record like there is with credit card or bank transfer payments. A cash receipt serves as the only proof that the transaction occurred. When creating a receipt for a cash payment, simply select 'Cash' as the payment method. Make sure to include the date, amount, and a description of what was purchased. Both you and the customer should keep a copy. This is especially important for your bookkeeping and tax records."
            />
            <FAQItem
              question="How long should I keep business receipts?"
              answer="The IRS recommends keeping business receipts and financial records for at least three years from the date you file your tax return, though some situations require longer retention. If you file a claim for a loss from worthless securities or bad debt deduction, keep records for seven years. If you underreport income by more than 25%, the IRS has six years to audit. For property records, keep documentation until the period of limitations expires for the year you dispose of the property. As a practical rule of thumb, many accountants recommend keeping all business receipts for at least seven years to be safe. Digital storage makes this much easier than physical filing."
            />
            <FAQItem
              question="Is a digital receipt legally valid?"
              answer="Yes, digital receipts are legally valid in the United States and most countries worldwide. The Electronic Signatures in Global and National Commerce (ESIGN) Act and the Uniform Electronic Transactions Act (UETA) establish that electronic records and signatures carry the same legal weight as their paper counterparts. Digital receipts are accepted by the IRS for tax documentation purposes, by courts as evidence of transactions, and by banks and financial institutions. In fact, digital receipts offer advantages over paper receipts: they do not fade over time (unlike thermal paper receipts), they are easier to organize and search, and they can be backed up to prevent loss."
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
                desc: "Create and download professional invoices with line items, taxes, and payment terms.",
                href: "/tools/invoice-generator",
              },
              {
                title: "Estimate Builder",
                desc: "Build detailed project estimates and quotes to win more clients and close more deals.",
                href: "/tools/estimate-builder",
              },
              {
                title: "Profit Margin Calculator",
                desc: "Calculate profit margins, markups, and break-even points to price your products right.",
                href: "/tools/profit-margin-calculator",
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
                <p className="text-gray-400 text-sm leading-relaxed">
                  {tool.desc}
                </p>
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
                  name: "What information is required on a receipt?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A complete receipt should include the business name and contact information, the date of the transaction, a unique receipt number, a description of each item or service, quantity and price, subtotal, tax, total amount paid, and payment method. Some states also require the business address and tax identification number.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What's the difference between a receipt and an invoice?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "An invoice is sent before or at the time of a transaction to request payment. A receipt is issued after payment has been received to confirm the transaction is complete. An invoice requests money; a receipt confirms it was paid.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need to provide receipts for my business?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "In most jurisdictions, businesses are legally required to provide receipts, especially for transactions involving sales tax. Receipts build customer trust, create a paper trail for accounting, help resolve disputes, and are required by the IRS for business expense deductions.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I create a receipt for a cash payment?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, you can and should create receipts for cash payments. Cash transactions are where receipts are most important because there is no automatic digital record. A cash receipt serves as the only proof the transaction occurred.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How long should I keep business receipts?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The IRS recommends keeping business receipts for at least three years from your tax filing date. Some situations require seven years. Many accountants recommend keeping all receipts for seven years to be safe. Digital storage makes this much easier.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is a digital receipt legally valid?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, digital receipts are legally valid under the ESIGN Act and UETA. They are accepted by the IRS, courts, and financial institutions. Digital receipts offer advantages: they don't fade, are easier to organize, and can be backed up.",
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

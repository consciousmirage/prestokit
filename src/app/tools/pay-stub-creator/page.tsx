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

interface PayStubData {
  /* Employer */
  employerName: string;
  employerAddress: string;
  employerEIN: string;
  /* Employee */
  employeeName: string;
  employeeAddress: string;
  employeeSSNLast4: string;
  employeeId: string;
  /* Pay period */
  payPeriodStart: string;
  payPeriodEnd: string;
  payDate: string;
  /* Earnings */
  payType: "hourly" | "salary";
  regularHours: number;
  hourlyRate: number;
  salaryAmount: number;
  overtimeHours: number;
  overtimeRate: number;
  bonus: number;
  commission: number;
  /* Deductions */
  federalTaxPct: number;
  stateTaxPct: number;
  socialSecurityPct: number;
  medicarePct: number;
  healthInsurance: number;
  retirement401kPct: number;
  otherDeductions: number;
  otherDeductionsLabel: string;
  /* YTD (optional manual) */
  ytdGross: string;
  ytdDeductions: string;
  ytdNet: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

function periodStartISO(): string {
  const d = new Date();
  d.setDate(1);
  return d.toISOString().split("T")[0];
}

function periodEndISO(): string {
  const d = new Date();
  d.setDate(15);
  return d.toISOString().split("T")[0];
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

function defaultData(): PayStubData {
  return {
    employerName: "",
    employerAddress: "",
    employerEIN: "",
    employeeName: "",
    employeeAddress: "",
    employeeSSNLast4: "",
    employeeId: "",
    payPeriodStart: periodStartISO(),
    payPeriodEnd: periodEndISO(),
    payDate: todayISO(),
    payType: "hourly",
    regularHours: 80,
    hourlyRate: 0,
    salaryAmount: 0,
    overtimeHours: 0,
    overtimeRate: 0,
    bonus: 0,
    commission: 0,
    federalTaxPct: 22,
    stateTaxPct: 5,
    socialSecurityPct: 6.2,
    medicarePct: 1.45,
    healthInsurance: 0,
    retirement401kPct: 0,
    otherDeductions: 0,
    otherDeductionsLabel: "",
    ytdGross: "",
    ytdDeductions: "",
    ytdNet: "",
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PayStubCreatorPage() {
  const [data, setData] = useState<PayStubData>(defaultData);
  const printRef = useRef<HTMLDivElement>(null);

  /* ------ derived values ------ */
  const regularPay =
    data.payType === "hourly"
      ? data.regularHours * data.hourlyRate
      : data.salaryAmount;

  const overtimePay = data.overtimeHours * data.overtimeRate;
  const grossPay = regularPay + overtimePay + data.bonus + data.commission;

  const federalTax = grossPay * (data.federalTaxPct / 100);
  const stateTax = grossPay * (data.stateTaxPct / 100);
  const socialSecurity = grossPay * (data.socialSecurityPct / 100);
  const medicare = grossPay * (data.medicarePct / 100);
  const retirement401k = grossPay * (data.retirement401kPct / 100);
  const totalDeductions =
    federalTax +
    stateTax +
    socialSecurity +
    medicare +
    data.healthInsurance +
    retirement401k +
    data.otherDeductions;
  const netPay = grossPay - totalDeductions;

  /* ------ updaters ------ */
  const set = useCallback(
    <K extends keyof PayStubData>(key: K, value: PayStubData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setData(defaultData());
  }, []);

  /* ------ print ------ */
  const handlePrint = useCallback(async () => {
    const element = document.getElementById("paystub-print-area");
    if (!element) return;
    // @ts-expect-error html2pdf.js has no types
    const html2pdf = (await import("html2pdf.js")).default;
    html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: `paystub.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
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
      <title>
        Free Pay Stub Creator &mdash; Generate Pay Stubs Online | PrestoKit
      </title>
      <meta
        name="description"
        content="Create professional pay stubs for free. No sign-up required. Fill in employer and employee details, earnings, and deductions — download a PDF instantly. 100% in your browser."
      />

      {/* ============================== PRINT STYLES ============================== */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #paystub-print-area, #paystub-print-area * { visibility: visible !important; }
          #paystub-print-area {
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
            <span className="text-gray-300">Pay Stub Creator</span>
          </div>
        </nav>

        {/* ---------- header ---------- */}
        <header className="mx-auto max-w-7xl px-4 pt-10 pb-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pay Stub Creator
          </h1>
          <p className="mt-2 text-gray-400 max-w-xl">
            Create professional pay stubs for employees and contractors.
            Everything runs in your browser &mdash; nothing is uploaded.
          </p>
        </header>

        {/* ---------- main grid ---------- */}
        <main className="mx-auto max-w-7xl px-4 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ======================== LEFT: FORM ======================== */}
          <div className="space-y-6">
            {/* --- Employer --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">
                Employer Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Company Name</label>
                  <input
                    className={inputCls}
                    placeholder="Acme Corp"
                    value={data.employerName}
                    onChange={(e) => set("employerName", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>EIN (optional)</label>
                  <input
                    className={inputCls}
                    placeholder="XX-XXXXXXX"
                    value={data.employerEIN}
                    onChange={(e) => set("employerEIN", e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Company Address</label>
                  <input
                    className={inputCls}
                    placeholder="123 Main St, City, ST 00000"
                    value={data.employerAddress}
                    onChange={(e) => set("employerAddress", e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* --- Employee --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">
                Employee Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Employee Name</label>
                  <input
                    className={inputCls}
                    placeholder="John Doe"
                    value={data.employeeName}
                    onChange={(e) => set("employeeName", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Employee ID (optional)</label>
                  <input
                    className={inputCls}
                    placeholder="EMP-001"
                    value={data.employeeId}
                    onChange={(e) => set("employeeId", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>SSN Last 4 (optional)</label>
                  <input
                    className={inputCls}
                    placeholder="XXXX"
                    maxLength={4}
                    value={data.employeeSSNLast4}
                    onChange={(e) =>
                      set(
                        "employeeSSNLast4",
                        e.target.value.replace(/\D/g, "").slice(0, 4)
                      )
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Employee Address</label>
                  <input
                    className={inputCls}
                    placeholder="456 Oak Ave, Town, ST 11111"
                    value={data.employeeAddress}
                    onChange={(e) => set("employeeAddress", e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* --- Pay Period --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">
                Pay Period
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Period Start</label>
                  <input
                    className={inputCls}
                    type="date"
                    value={data.payPeriodStart}
                    onChange={(e) => set("payPeriodStart", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Period End</label>
                  <input
                    className={inputCls}
                    type="date"
                    value={data.payPeriodEnd}
                    onChange={(e) => set("payPeriodEnd", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Pay Date</label>
                  <input
                    className={inputCls}
                    type="date"
                    value={data.payDate}
                    onChange={(e) => set("payDate", e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* --- Earnings --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">
                Earnings
              </h2>

              {/* Pay type toggle */}
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => set("payType", "hourly")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    data.payType === "hourly"
                      ? "bg-[#7c6cf0] text-white"
                      : "bg-[#12121c] text-gray-400 border border-white/10 hover:border-white/20"
                  }`}
                >
                  Hourly
                </button>
                <button
                  onClick={() => set("payType", "salary")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    data.payType === "salary"
                      ? "bg-[#7c6cf0] text-white"
                      : "bg-[#12121c] text-gray-400 border border-white/10 hover:border-white/20"
                  }`}
                >
                  Salary
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {data.payType === "hourly" ? (
                  <>
                    <div>
                      <label className={labelCls}>Regular Hours</label>
                      <input
                        className={inputCls}
                        type="number"
                        min={0}
                        step="0.01"
                        value={data.regularHours}
                        onChange={(e) =>
                          set(
                            "regularHours",
                            Math.max(0, Number(e.target.value))
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Hourly Rate ($)</label>
                      <input
                        className={inputCls}
                        type="number"
                        min={0}
                        step="0.01"
                        value={data.hourlyRate}
                        onChange={(e) =>
                          set("hourlyRate", Math.max(0, Number(e.target.value)))
                        }
                      />
                    </div>
                  </>
                ) : (
                  <div className="sm:col-span-2">
                    <label className={labelCls}>
                      Salary Amount (this period)
                    </label>
                    <input
                      className={inputCls}
                      type="number"
                      min={0}
                      step="0.01"
                      value={data.salaryAmount}
                      onChange={(e) =>
                        set(
                          "salaryAmount",
                          Math.max(0, Number(e.target.value))
                        )
                      }
                    />
                  </div>
                )}
                <div>
                  <label className={labelCls}>Overtime Hours (optional)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    step="0.01"
                    value={data.overtimeHours}
                    onChange={(e) =>
                      set("overtimeHours", Math.max(0, Number(e.target.value)))
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>OT Rate ($/hr)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    step="0.01"
                    value={data.overtimeRate}
                    onChange={(e) =>
                      set("overtimeRate", Math.max(0, Number(e.target.value)))
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Bonus ($, optional)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    step="0.01"
                    value={data.bonus}
                    onChange={(e) =>
                      set("bonus", Math.max(0, Number(e.target.value)))
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Commission ($, optional)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    step="0.01"
                    value={data.commission}
                    onChange={(e) =>
                      set("commission", Math.max(0, Number(e.target.value)))
                    }
                  />
                </div>
              </div>

              {/* Gross pay display */}
              <div className="mt-4 flex items-center justify-between rounded-lg bg-[#12121c] border border-white/10 px-4 py-3">
                <span className="text-sm font-medium text-gray-400">
                  Gross Pay
                </span>
                <span className="text-lg font-bold text-[#00e676]">
                  ${fmt(grossPay)}
                </span>
              </div>
            </section>

            {/* --- Deductions --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">
                Deductions
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Federal Tax (%)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    max={100}
                    step="0.01"
                    value={data.federalTaxPct}
                    onChange={(e) =>
                      set("federalTaxPct", Math.max(0, Number(e.target.value)))
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>State Tax (%)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    max={100}
                    step="0.01"
                    value={data.stateTaxPct}
                    onChange={(e) =>
                      set("stateTaxPct", Math.max(0, Number(e.target.value)))
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Social Security (%)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    max={100}
                    step="0.01"
                    value={data.socialSecurityPct}
                    onChange={(e) =>
                      set(
                        "socialSecurityPct",
                        Math.max(0, Number(e.target.value))
                      )
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Medicare (%)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    max={100}
                    step="0.01"
                    value={data.medicarePct}
                    onChange={(e) =>
                      set("medicarePct", Math.max(0, Number(e.target.value)))
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    Health Insurance ($ flat, optional)
                  </label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    step="0.01"
                    value={data.healthInsurance}
                    onChange={(e) =>
                      set(
                        "healthInsurance",
                        Math.max(0, Number(e.target.value))
                      )
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    401(k) Contribution (%, optional)
                  </label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    max={100}
                    step="0.01"
                    value={data.retirement401kPct}
                    onChange={(e) =>
                      set(
                        "retirement401kPct",
                        Math.max(0, Number(e.target.value))
                      )
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Other Deductions Label</label>
                  <input
                    className={inputCls}
                    placeholder="e.g. Union Dues"
                    value={data.otherDeductionsLabel}
                    onChange={(e) =>
                      set("otherDeductionsLabel", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Other Deductions ($)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    step="0.01"
                    value={data.otherDeductions}
                    onChange={(e) =>
                      set(
                        "otherDeductions",
                        Math.max(0, Number(e.target.value))
                      )
                    }
                  />
                </div>
              </div>

              {/* Totals display */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-[#12121c] border border-white/10 px-4 py-2">
                  <span className="text-sm text-gray-400">
                    Total Deductions
                  </span>
                  <span className="text-base font-semibold text-red-400">
                    -${fmt(totalDeductions)}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#12121c] border border-[#00e676]/30 px-4 py-3">
                  <span className="text-sm font-medium text-gray-300">
                    Net Pay
                  </span>
                  <span className="text-lg font-bold text-[#00e676]">
                    ${fmt(netPay)}
                  </span>
                </div>
              </div>
            </section>

            {/* --- YTD (optional) --- */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-1 text-gray-200">
                Year-to-Date Totals
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                Optional &mdash; manually enter if you want YTD totals on the
                stub.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>YTD Gross ($)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="0.00"
                    value={data.ytdGross}
                    onChange={(e) => set("ytdGross", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>YTD Deductions ($)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="0.00"
                    value={data.ytdDeductions}
                    onChange={(e) => set("ytdDeductions", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>YTD Net ($)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="0.00"
                    value={data.ytdNet}
                    onChange={(e) => set("ytdNet", e.target.value)}
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
                id="paystub-print-area"
                ref={printRef}
                className="p-6 sm:p-8 text-gray-900 text-sm leading-relaxed"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                {/* top header bar */}
                <div
                  className="flex justify-between items-start pb-4 mb-4"
                  style={{ borderBottom: "3px solid #7c6cf0" }}
                >
                  <div>
                    <h2
                      className="text-xl font-bold tracking-tight"
                      style={{ color: "#7c6cf0" }}
                    >
                      PAY STUB
                    </h2>
                    <p className="font-semibold text-gray-900 mt-1">
                      {data.employerName || "Company Name"}
                    </p>
                    {data.employerAddress && (
                      <p className="text-gray-600 text-xs">
                        {data.employerAddress}
                      </p>
                    )}
                    {data.employerEIN && (
                      <p className="text-gray-600 text-xs">
                        EIN: {data.employerEIN}
                      </p>
                    )}
                  </div>
                  <div className="text-right text-xs text-gray-500 space-y-0.5">
                    <p>
                      <span className="font-medium text-gray-700">
                        Pay Date:
                      </span>{" "}
                      {formatDate(data.payDate)}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">
                        Period:
                      </span>{" "}
                      {formatDate(data.payPeriodStart)} &ndash;{" "}
                      {formatDate(data.payPeriodEnd)}
                    </p>
                  </div>
                </div>

                {/* Employee info row */}
                <div className="grid grid-cols-2 gap-6 mb-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                      Employee
                    </p>
                    <p className="font-semibold text-gray-900">
                      {data.employeeName || "Employee Name"}
                    </p>
                    {data.employeeAddress && (
                      <p className="text-gray-600 text-xs">
                        {data.employeeAddress}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    {data.employeeId && (
                      <p className="text-xs text-gray-500">
                        <span className="font-medium text-gray-700">ID:</span>{" "}
                        {data.employeeId}
                      </p>
                    )}
                    {data.employeeSSNLast4 && (
                      <p className="text-xs text-gray-500">
                        <span className="font-medium text-gray-700">SSN:</span>{" "}
                        ***-**-{data.employeeSSNLast4}
                      </p>
                    )}
                  </div>
                </div>

                {/* Earnings & Deductions — side by side */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  {/* Earnings table */}
                  <div>
                    <table className="w-full text-xs">
                      <thead>
                        <tr
                          style={{ borderBottom: "2px solid #7c6cf0" }}
                          className="text-left"
                        >
                          <th className="pb-1.5 font-semibold text-gray-700">
                            Earnings
                          </th>
                          <th className="pb-1.5 font-semibold text-gray-700 text-center w-14">
                            Hours
                          </th>
                          <th className="pb-1.5 font-semibold text-gray-700 text-right w-16">
                            Rate
                          </th>
                          <th className="pb-1.5 font-semibold text-gray-700 text-right w-20">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Regular */}
                        <tr className="bg-gray-50">
                          <td className="py-1.5 px-1 text-gray-800">
                            {data.payType === "hourly"
                              ? "Regular"
                              : "Salary"}
                          </td>
                          <td className="py-1.5 text-center text-gray-600">
                            {data.payType === "hourly"
                              ? data.regularHours
                              : "—"}
                          </td>
                          <td className="py-1.5 text-right text-gray-600">
                            {data.payType === "hourly"
                              ? `$${fmt(data.hourlyRate)}`
                              : "—"}
                          </td>
                          <td className="py-1.5 text-right font-medium text-gray-900">
                            ${fmt(regularPay)}
                          </td>
                        </tr>
                        {/* Overtime */}
                        {overtimePay > 0 && (
                          <tr>
                            <td className="py-1.5 px-1 text-gray-800">
                              Overtime
                            </td>
                            <td className="py-1.5 text-center text-gray-600">
                              {data.overtimeHours}
                            </td>
                            <td className="py-1.5 text-right text-gray-600">
                              ${fmt(data.overtimeRate)}
                            </td>
                            <td className="py-1.5 text-right font-medium text-gray-900">
                              ${fmt(overtimePay)}
                            </td>
                          </tr>
                        )}
                        {/* Bonus */}
                        {data.bonus > 0 && (
                          <tr className="bg-gray-50">
                            <td className="py-1.5 px-1 text-gray-800">
                              Bonus
                            </td>
                            <td className="py-1.5 text-center text-gray-600">
                              —
                            </td>
                            <td className="py-1.5 text-right text-gray-600">
                              —
                            </td>
                            <td className="py-1.5 text-right font-medium text-gray-900">
                              ${fmt(data.bonus)}
                            </td>
                          </tr>
                        )}
                        {/* Commission */}
                        {data.commission > 0 && (
                          <tr>
                            <td className="py-1.5 px-1 text-gray-800">
                              Commission
                            </td>
                            <td className="py-1.5 text-center text-gray-600">
                              —
                            </td>
                            <td className="py-1.5 text-right text-gray-600">
                              —
                            </td>
                            <td className="py-1.5 text-right font-medium text-gray-900">
                              ${fmt(data.commission)}
                            </td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot>
                        <tr
                          style={{ borderTop: "2px solid #7c6cf0" }}
                        >
                          <td
                            colSpan={3}
                            className="pt-2 font-bold text-gray-900"
                          >
                            Gross Pay
                          </td>
                          <td className="pt-2 text-right font-bold text-gray-900">
                            ${fmt(grossPay)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {/* Deductions table */}
                  <div>
                    <table className="w-full text-xs">
                      <thead>
                        <tr
                          style={{ borderBottom: "2px solid #7c6cf0" }}
                          className="text-left"
                        >
                          <th className="pb-1.5 font-semibold text-gray-700">
                            Deductions
                          </th>
                          <th className="pb-1.5 font-semibold text-gray-700 text-right w-20">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {federalTax > 0 && (
                          <tr className="bg-gray-50">
                            <td className="py-1.5 px-1 text-gray-800">
                              Federal Tax ({data.federalTaxPct}%)
                            </td>
                            <td className="py-1.5 text-right font-medium text-gray-900">
                              ${fmt(federalTax)}
                            </td>
                          </tr>
                        )}
                        {stateTax > 0 && (
                          <tr>
                            <td className="py-1.5 px-1 text-gray-800">
                              State Tax ({data.stateTaxPct}%)
                            </td>
                            <td className="py-1.5 text-right font-medium text-gray-900">
                              ${fmt(stateTax)}
                            </td>
                          </tr>
                        )}
                        {socialSecurity > 0 && (
                          <tr className="bg-gray-50">
                            <td className="py-1.5 px-1 text-gray-800">
                              Social Security ({data.socialSecurityPct}%)
                            </td>
                            <td className="py-1.5 text-right font-medium text-gray-900">
                              ${fmt(socialSecurity)}
                            </td>
                          </tr>
                        )}
                        {medicare > 0 && (
                          <tr>
                            <td className="py-1.5 px-1 text-gray-800">
                              Medicare ({data.medicarePct}%)
                            </td>
                            <td className="py-1.5 text-right font-medium text-gray-900">
                              ${fmt(medicare)}
                            </td>
                          </tr>
                        )}
                        {data.healthInsurance > 0 && (
                          <tr className="bg-gray-50">
                            <td className="py-1.5 px-1 text-gray-800">
                              Health Insurance
                            </td>
                            <td className="py-1.5 text-right font-medium text-gray-900">
                              ${fmt(data.healthInsurance)}
                            </td>
                          </tr>
                        )}
                        {retirement401k > 0 && (
                          <tr>
                            <td className="py-1.5 px-1 text-gray-800">
                              401(k) ({data.retirement401kPct}%)
                            </td>
                            <td className="py-1.5 text-right font-medium text-gray-900">
                              ${fmt(retirement401k)}
                            </td>
                          </tr>
                        )}
                        {data.otherDeductions > 0 && (
                          <tr className="bg-gray-50">
                            <td className="py-1.5 px-1 text-gray-800">
                              {data.otherDeductionsLabel || "Other"}
                            </td>
                            <td className="py-1.5 text-right font-medium text-gray-900">
                              ${fmt(data.otherDeductions)}
                            </td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot>
                        <tr
                          style={{ borderTop: "2px solid #7c6cf0" }}
                        >
                          <td className="pt-2 font-bold text-gray-900">
                            Total Deductions
                          </td>
                          <td className="pt-2 text-right font-bold text-gray-900">
                            ${fmt(totalDeductions)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Net pay banner */}
                <div
                  className="flex justify-between items-center rounded-lg px-4 py-3 mb-5"
                  style={{ backgroundColor: "#f0fdf4", border: "2px solid #22c55e" }}
                >
                  <span className="font-bold text-gray-900 text-sm">
                    NET PAY
                  </span>
                  <span className="font-bold text-lg" style={{ color: "#16a34a" }}>
                    ${fmt(netPay)}
                  </span>
                </div>

                {/* YTD section */}
                {(data.ytdGross || data.ytdDeductions || data.ytdNet) && (
                  <div className="mb-5">
                    <table className="w-full text-xs">
                      <thead>
                        <tr
                          style={{ borderBottom: "2px solid #7c6cf0" }}
                          className="text-left"
                        >
                          <th className="pb-1.5 font-semibold text-gray-700">
                            Year-to-Date
                          </th>
                          <th className="pb-1.5 font-semibold text-gray-700 text-right w-24">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.ytdGross && (
                          <tr className="bg-gray-50">
                            <td className="py-1.5 px-1 text-gray-800">
                              YTD Gross Earnings
                            </td>
                            <td className="py-1.5 text-right font-medium text-gray-900">
                              ${fmt(Number(data.ytdGross))}
                            </td>
                          </tr>
                        )}
                        {data.ytdDeductions && (
                          <tr>
                            <td className="py-1.5 px-1 text-gray-800">
                              YTD Deductions
                            </td>
                            <td className="py-1.5 text-right font-medium text-gray-900">
                              ${fmt(Number(data.ytdDeductions))}
                            </td>
                          </tr>
                        )}
                        {data.ytdNet && (
                          <tr className="bg-gray-50">
                            <td className="py-1.5 px-1 text-gray-800">
                              YTD Net Pay
                            </td>
                            <td className="py-1.5 text-right font-medium text-gray-900">
                              ${fmt(Number(data.ytdNet))}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* footer */}
                <div
                  className="border-t border-gray-200 pt-3 flex justify-between items-center"
                >
                  <p className="text-[10px] text-gray-400">
                    This is a computer-generated pay stub.
                  </p>
                  <p className="text-[10px] text-gray-300">
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
                title: "Enter Employer & Employee Info",
                desc: "Fill in the company name, address, and EIN alongside the employee's name, ID, and address. Set the pay period dates and pay date.",
              },
              {
                step: "2",
                title: "Add Earnings & Deductions",
                desc: "Choose hourly or salary pay, enter regular and overtime hours, bonuses, and commissions. Set federal, state, Social Security, Medicare, and other deduction rates.",
              },
              {
                step: "3",
                title: "Download Your Pay Stub",
                desc: "Review the live preview showing gross pay, itemized deductions, and net pay. Download as a PDF to distribute to employees or keep for your records.",
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
              question="What information must be on a pay stub?"
              answer="A pay stub should include the employer's name, address, and EIN (Employer Identification Number), the employee's name and identifying information, the pay period start and end dates, the pay date, a breakdown of gross earnings (regular pay, overtime, bonuses, commissions), an itemized list of all deductions (federal tax, state tax, Social Security, Medicare, health insurance, retirement contributions), the net pay amount, and year-to-date totals. While federal law does not mandate pay stubs, most states require employers to provide a written or electronic statement of earnings and deductions each pay period. Requirements vary by state, so check your local labor laws."
            />
            <FAQItem
              question="Is it legal to create my own pay stubs?"
              answer="Yes, it is legal to create your own pay stubs as a business owner or employer, provided the information on them is accurate and truthful. Many small businesses, sole proprietors, and self-employed individuals generate their own pay stubs for record-keeping, loan applications, and rental agreements. However, creating fake or fraudulent pay stubs with false information -- such as inflated income or fictitious employers -- is illegal and constitutes fraud. This can result in criminal charges, fines, and imprisonment. Always ensure your pay stubs accurately reflect actual earnings, deductions, and employment information. Our tool is designed to help legitimate businesses create accurate, professional pay stubs."
            />
            <FAQItem
              question="What's the difference between gross and net pay?"
              answer="Gross pay is the total amount of money an employee earns before any deductions are taken out. It includes regular wages or salary, overtime pay, bonuses, commissions, and any other compensation. Net pay (also called 'take-home pay') is the amount the employee actually receives after all deductions have been subtracted from gross pay. Deductions include federal income tax, state income tax, Social Security (FICA), Medicare, health insurance premiums, retirement contributions (like 401k), and any other withholdings. For example, if an employee's gross pay is $5,000 and total deductions are $1,500, their net pay is $3,500. Understanding both numbers is essential for budgeting, tax planning, and ensuring payroll accuracy."
            />
            <FAQItem
              question="What are standard payroll deductions?"
              answer="Standard payroll deductions fall into two categories: mandatory and voluntary. Mandatory deductions include federal income tax (varies by tax bracket, typically 10-37%), state income tax (varies by state, 0-13.3%), Social Security tax (6.2% of wages up to the annual wage base), Medicare tax (1.45%, plus an additional 0.9% on wages over $200,000), and any local or city taxes. Voluntary deductions may include health, dental, and vision insurance premiums, 401(k) or other retirement plan contributions, Health Savings Account (HSA) contributions, life insurance premiums, union dues, and flexible spending account (FSA) contributions. Employers also pay a matching portion of Social Security and Medicare taxes, which do not appear on the employee's stub."
            />
            <FAQItem
              question="How do I calculate overtime pay?"
              answer="Under the Fair Labor Standards Act (FLSA), overtime pay is calculated at 1.5 times the employee's regular hourly rate for all hours worked over 40 in a single workweek. This is commonly called 'time and a half.' For example, if an employee earns $20 per hour and works 48 hours in a week, they receive $20/hour for the first 40 hours ($800) and $30/hour (1.5 times $20) for the 8 overtime hours ($240), for a total of $1,040. Some states have additional overtime rules -- California, for instance, requires overtime pay for hours worked over 8 in a single day. Certain employees may be exempt from overtime requirements based on their job duties and salary level. Our pay stub creator has separate fields for regular and overtime hours and rates to make this calculation easy."
            />
            <FAQItem
              question="Do independent contractors need pay stubs?"
              answer="Independent contractors (1099 workers) are not legally required to receive pay stubs because they are not employees. They are paid for their services, typically via invoices, and do not have taxes withheld from their payments. However, many independent contractors choose to create pay stubs or earnings statements for their own records. This documentation can be useful for tracking income, applying for loans or mortgages (lenders often require proof of income), renting apartments, and organizing tax filing. If you are a freelancer or self-employed, creating your own pay stubs can help you stay organized and present income documentation when needed."
            />
            <FAQItem
              question="What is year-to-date (YTD) on a pay stub?"
              answer="Year-to-date (YTD) on a pay stub shows the cumulative totals of your earnings and deductions from January 1st of the current year through the current pay period. YTD figures typically include YTD gross earnings (total income earned so far this year), YTD deductions (total taxes and other withholdings paid so far), and YTD net pay (total take-home pay received so far). YTD information is important for several reasons: it helps you track progress toward tax bracket thresholds, monitor Social Security wage base limits ($168,600 for 2024), verify W-2 accuracy at year-end, and plan financially throughout the year. If your last pay stub of the year shows different YTD numbers than your W-2, you should contact your employer's payroll department to resolve the discrepancy."
            />
          </div>
        </section>

        {/* ==================== RELATED TOOLS ==================== */}
        <section className="mx-auto max-w-7xl px-4 pt-16 pb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Related <span className="text-[#7c6cf0]">Tools</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Invoice Generator",
                desc: "Create professional invoices for clients with itemized charges, payment terms, and tax.",
                href: "/tools/invoice-generator",
              },
              {
                title: "Profit Margin Calculator",
                desc: "Calculate margins, markups, and break-even points to ensure your business stays profitable.",
                href: "/tools/profit-margin-calculator",
              },
              {
                title: "Receipt Maker",
                desc: "Generate receipts for transactions and payments. Perfect for cash sales and record-keeping.",
                href: "/tools/receipt-maker",
              },
              {
                title: "Estimate Builder",
                desc: "Build professional project estimates and quotes to send to prospective clients.",
                href: "/tools/estimate-builder",
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
                  name: "What information must be on a pay stub?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A pay stub should include employer name, address, and EIN, employee name and ID, pay period dates, pay date, gross earnings breakdown, itemized deductions (federal tax, state tax, Social Security, Medicare, insurance, retirement), net pay, and year-to-date totals. Most states require employers to provide these statements each pay period.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is it legal to create my own pay stubs?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, it is legal for business owners and self-employed individuals to create pay stubs with accurate information. However, creating fake or fraudulent pay stubs with false information is illegal and constitutes fraud, which can result in criminal charges.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What's the difference between gross and net pay?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Gross pay is total earnings before deductions (wages, overtime, bonuses, commissions). Net pay is take-home pay after all deductions (taxes, insurance, retirement). For example, $5,000 gross pay minus $1,500 in deductions equals $3,500 net pay.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are standard payroll deductions?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Mandatory deductions include federal income tax (10-37%), state income tax (0-13.3%), Social Security (6.2%), and Medicare (1.45%). Voluntary deductions may include health insurance, 401(k) contributions, HSA, life insurance, union dues, and FSA contributions.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I calculate overtime pay?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Under the FLSA, overtime is 1.5 times the regular hourly rate for hours over 40 per week. If someone earns $20/hour and works 48 hours, they get $20 for the first 40 hours and $30/hour for the 8 overtime hours. Some states like California also require daily overtime.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do independent contractors need pay stubs?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Independent contractors are not legally required to receive pay stubs since they are not employees. However, many contractors create their own earnings statements for income tracking, loan applications, rental agreements, and tax filing organization.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is year-to-date (YTD) on a pay stub?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "YTD shows cumulative earnings and deductions from January 1st through the current pay period. It includes YTD gross earnings, YTD deductions, and YTD net pay. YTD helps track tax brackets, Social Security limits, and verify W-2 accuracy at year-end.",
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

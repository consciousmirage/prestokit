"use client";

import { useState, useMemo } from "react";
import PromoBar from "@/components/PromoBar";

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
      <span className="text-[#f0f0f5]">Grade Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Mode = "final" | "weighted";

interface Assignment {
  id: number;
  name: string;
  grade: string;
  weight: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function letterGrade(pct: number): string {
  if (pct >= 97) return "A+";
  if (pct >= 93) return "A";
  if (pct >= 90) return "A-";
  if (pct >= 87) return "B+";
  if (pct >= 83) return "B";
  if (pct >= 80) return "B-";
  if (pct >= 77) return "C+";
  if (pct >= 73) return "C";
  if (pct >= 70) return "C-";
  if (pct >= 67) return "D+";
  if (pct >= 63) return "D";
  if (pct >= 60) return "D-";
  return "F";
}

function gradeColor(pct: number): string {
  if (pct >= 90) return "text-[#00e676]";
  if (pct >= 80) return "text-[#7c6cf0]";
  if (pct >= 70) return "text-[#9d90f5]";
  if (pct >= 60) return "text-[#f59e0b]";
  return "text-[#ef4444]";
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "How do I calculate what grade I need on my final exam?",
    answer:
      "Use the formula: Required score = (Desired grade − Current grade × (1 − Final weight)) ÷ Final weight. For example, if you have an 82% and want a 90% final grade, and the final is worth 30%, you need at least a 108.7% — which means it's not mathematically possible to reach 90%.",
  },
  {
    question: "What is a weighted grade average?",
    answer:
      "A weighted average means each assignment counts differently toward your final grade based on its weight (percentage of the total grade). For example, if homework is 20%, midterm is 30%, and the final is 50%, a perfect homework score matters less than a perfect final exam score.",
  },
  {
    question: "How do I calculate a weighted grade?",
    answer:
      "Multiply each assignment grade by its weight (as a decimal), then add all those values together. Divide by the sum of all weights. For example: (85 × 0.20) + (78 × 0.30) + (92 × 0.50) = 17 + 23.4 + 46 = 86.4%. This calculator does this automatically.",
  },
  {
    question: "What happens if my weights don't add up to 100%?",
    answer:
      "The weighted grade calculator normalizes the weights automatically. So if you enter weights of 20, 30, and 40 (totaling 90%), the calculator divides by the total weight sum (90) rather than 100 to give you an accurate result.",
  },
  {
    question: "What grade do I need to pass?",
    answer:
      "Passing typically means earning a 60% (D-) or higher for most college courses, but requirements vary by school, program, and course. Graduate programs often require a 70% (C) or better. Check your course syllabus for the specific grading scale used.",
  },
  {
    question: "Can I use this to calculate my GPA?",
    answer:
      "This tool calculates weighted percentage averages, not GPA directly. To convert a percentage to a GPA, a common scale is: 90-100% = 4.0, 80-89% = 3.0, 70-79% = 2.0, 60-69% = 1.0, below 60% = 0.0. Use PrestoKit's GPA Calculator for a dedicated GPA tool.",
  },
  {
    question: "What if the required final exam score is above 100%?",
    answer:
      "If the calculator shows a required score above 100%, it is mathematically impossible to reach your desired grade given your current standing. You would need to aim for a lower target grade or check if extra credit is available.",
  },
  {
    question: "Is this grade calculator free to use?",
    answer:
      "Yes, PrestoKit's grade calculator is completely free with no signup, no account, and no limits. Use it as many times as you need.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

let nextId = 3;

const DEFAULT_ASSIGNMENTS: Assignment[] = [
  { id: 1, name: "Homework", grade: "88", weight: "20" },
  { id: 2, name: "Midterm Exam", grade: "76", weight: "30" },
];

export default function GradeCalculatorPage() {
  const [mode, setMode] = useState<Mode>("final");

  // Final grade mode state
  const [currentGrade, setCurrentGrade] = useState("");
  const [desiredGrade, setDesiredGrade] = useState("");
  const [finalWeight, setFinalWeight] = useState("");

  // Weighted mode state
  const [assignments, setAssignments] = useState<Assignment[]>(DEFAULT_ASSIGNMENTS);

  /* ---- Final grade logic ---- */
  const finalResult = useMemo(() => {
    const curr = parseFloat(currentGrade);
    const desired = parseFloat(desiredGrade);
    const weight = parseFloat(finalWeight);
    if (isNaN(curr) || isNaN(desired) || isNaN(weight) || weight <= 0 || weight > 100) return null;

    const w = weight / 100;
    const needed = (desired - curr * (1 - w)) / w;
    return { needed, possible: needed <= 100, letter: letterGrade(desired) };
  }, [currentGrade, desiredGrade, finalWeight]);

  /* ---- Weighted average logic ---- */
  const weightedResult = useMemo(() => {
    const valid = assignments.filter((a) => a.grade !== "" && a.weight !== "");
    if (valid.length === 0) return null;
    const totalWeight = valid.reduce((s, a) => s + (parseFloat(a.weight) || 0), 0);
    if (totalWeight === 0) return null;
    const weightedSum = valid.reduce((s, a) => s + (parseFloat(a.grade) || 0) * (parseFloat(a.weight) || 0), 0);
    const average = weightedSum / totalWeight;
    return { average, totalWeight, letter: letterGrade(average) };
  }, [assignments]);

  const addAssignment = () => {
    setAssignments((prev) => [...prev, { id: nextId++, name: "", grade: "", weight: "" }]);
  };

  const updateAssignment = (id: number, field: keyof Assignment, value: string) => {
    setAssignments((prev) => prev.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const removeAssignment = (id: number) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PromoBar type="pro" dismissKey="grade-calculator-pro" />

      <main className="min-h-screen bg-[#0a0a0f] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Grade{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Find out what score you need on your final exam, or calculate your weighted course grade from assignments and tests.
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex gap-2 mb-6">
            {(["final", "weighted"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  mode === m
                    ? "bg-[#7c6cf0] text-white"
                    : "border border-[#1e1e2e] bg-[#12121a]/60 text-[#8888a0] hover:border-[#7c6cf0]/40"
                }`}
              >
                {m === "final" ? "Final Exam Calculator" : "Weighted Grade Calculator"}
              </button>
            ))}
          </div>

          {/* Final Grade Mode */}
          {mode === "final" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">Final Exam Grade Needed</h2>
                <p className="text-xs text-[#8888a0] mb-5">
                  Enter your current grade, the grade you want to finish with, and how much the final exam is worth.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#c0c0d0] mb-2">Current Grade (%)</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        value={currentGrade}
                        onChange={(e) => setCurrentGrade(e.target.value)}
                        placeholder="e.g. 82"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 pr-10 text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0]">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#c0c0d0] mb-2">Desired Final Grade (%)</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        value={desiredGrade}
                        onChange={(e) => setDesiredGrade(e.target.value)}
                        placeholder="e.g. 90"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 pr-10 text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0]">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#c0c0d0] mb-2">Final Exam Weight (%)</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="1"
                        min="1"
                        max="100"
                        value={finalWeight}
                        onChange={(e) => setFinalWeight(e.target.value)}
                        placeholder="e.g. 30"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 pr-10 text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0]">%</span>
                    </div>
                    <p className="text-xs text-[#555566] mt-1">e.g. 30 if the final is worth 30% of your course grade</p>
                  </div>
                </div>
              </div>

              {/* Final result */}
              <div className="space-y-4">
                {finalResult ? (
                  <>
                    <div className={`rounded-2xl border p-6 sm:p-8 ${finalResult.possible ? "border-[#7c6cf0]/30 bg-[#7c6cf0]/5" : "border-[#ef4444]/30 bg-[#ef4444]/5"}`}>
                      <div className="text-sm font-semibold text-[#c0c0d0] mb-4">
                        {finalResult.possible ? "You Need on Your Final" : "Not Achievable"}
                      </div>
                      <div className={`text-5xl font-bold mb-2 ${finalResult.possible ? "text-[#9d90f5]" : "text-[#ef4444]"}`}>
                        {finalResult.needed.toFixed(1)}%
                      </div>
                      {!finalResult.possible && (
                        <p className="text-sm text-[#ef4444]/80 mt-2">
                          A score above 100% is not possible. Consider aiming for a lower target grade.
                        </p>
                      )}
                      {finalResult.possible && finalResult.needed < 0 && (
                        <p className="text-sm text-[#00e676] mt-2">
                          You already have the grade locked in — even a 0 on the final gets you there!
                        </p>
                      )}
                    </div>

                    {/* Grade breakdown */}
                    <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-5 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#8888a0]">Current grade</span>
                        <span className="text-white font-medium">{currentGrade}% ({letterGrade(parseFloat(currentGrade))})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8888a0]">Target grade</span>
                        <span className="text-white font-medium">{desiredGrade}% ({finalResult.letter})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8888a0]">Final weight</span>
                        <span className="text-white font-medium">{finalWeight}%</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-8 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
                    <div className="text-4xl mb-3">📊</div>
                    <p className="text-[#8888a0] text-sm">Fill in all three fields to see what score you need on your final exam.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Weighted Mode */}
          {mode === "weighted" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2 rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-sm font-semibold text-[#c0c0d0]">Assignments & Grades</h2>
                  <button
                    onClick={addAssignment}
                    className="flex items-center gap-2 rounded-xl bg-[#7c6cf0]/10 border border-[#7c6cf0]/30 text-[#9d90f5] px-4 py-2 text-sm font-medium hover:bg-[#7c6cf0]/20 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Row
                  </button>
                </div>

                {/* Header */}
                <div className="grid grid-cols-[1fr_100px_100px_40px] gap-3 mb-2 text-xs text-[#8888a0] font-medium uppercase tracking-wide px-1">
                  <span>Assignment / Category</span>
                  <span className="text-center">Grade (%)</span>
                  <span className="text-center">Weight (%)</span>
                  <span></span>
                </div>

                <div className="space-y-2">
                  {assignments.map((a) => (
                    <div key={a.id} className="grid grid-cols-[1fr_100px_100px_40px] gap-3 items-center">
                      <input
                        type="text"
                        value={a.name}
                        onChange={(e) => updateAssignment(a.id, "name", e.target.value)}
                        placeholder="e.g. Homework"
                        className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-2.5 px-3 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                      />
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="100"
                          value={a.grade}
                          onChange={(e) => updateAssignment(a.id, "grade", e.target.value)}
                          placeholder="0"
                          className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-2.5 px-3 pr-7 text-sm text-white text-center placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                        />
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#555566] text-xs">%</span>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          step="1"
                          min="0"
                          max="100"
                          value={a.weight}
                          onChange={(e) => updateAssignment(a.id, "weight", e.target.value)}
                          placeholder="0"
                          className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-2.5 px-3 pr-7 text-sm text-white text-center placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                        />
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#555566] text-xs">%</span>
                      </div>
                      <button
                        onClick={() => removeAssignment(a.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-[#555566] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                {weightedResult && (
                  <div className="mt-4 pt-4 border-t border-[#1e1e2e] text-xs text-[#555566]">
                    Total weight entered: {weightedResult.totalWeight.toFixed(0)}%
                    {weightedResult.totalWeight !== 100 && (
                      <span className="ml-2 text-[#f59e0b]">(normalized automatically)</span>
                    )}
                  </div>
                )}
              </div>

              {/* Weighted result */}
              <div className="space-y-4">
                {weightedResult ? (
                  <>
                    <div className="rounded-2xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-6">
                      <div className="text-sm font-semibold text-[#c0c0d0] mb-3">Weighted Average</div>
                      <div className={`text-5xl font-bold mb-1 ${gradeColor(weightedResult.average)}`}>
                        {weightedResult.average.toFixed(1)}%
                      </div>
                      <div className={`text-2xl font-bold ${gradeColor(weightedResult.average)}`}>
                        {weightedResult.letter}
                      </div>
                    </div>

                    {/* Individual grades */}
                    <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-5">
                      <div className="text-xs text-[#8888a0] font-semibold uppercase tracking-wide mb-3">Breakdown</div>
                      <div className="space-y-2">
                        {assignments.filter((a) => a.grade !== "" && a.weight !== "").map((a) => {
                          const g = parseFloat(a.grade) || 0;
                          const w = parseFloat(a.weight) || 0;
                          const pct = weightedResult.totalWeight > 0 ? (w / weightedResult.totalWeight) * 100 : 0;
                          return (
                            <div key={a.id} className="flex items-center justify-between text-xs">
                              <span className="text-[#8888a0] truncate max-w-[100px]">{a.name || "—"}</span>
                              <div className="flex items-center gap-2">
                                <span className={`font-medium ${gradeColor(g)}`}>{g.toFixed(0)}%</span>
                                <span className="text-[#555566]">({pct.toFixed(0)}%)</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-8 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
                    <div className="text-4xl mb-3">📝</div>
                    <p className="text-[#8888a0] text-sm">Add assignments with grades and weights to see your weighted average.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Choose Your Mode",
                  description: "Use the Final Exam Calculator to find out what score you need on your final. Use the Weighted Calculator to find your overall course average.",
                },
                {
                  step: "2",
                  title: "Enter Your Grades",
                  description: "For the final exam mode, enter your current grade, target grade, and final weight. For weighted mode, add each assignment with its grade and weight percentage.",
                },
                {
                  step: "3",
                  title: "Instant Results",
                  description: "Results update in real time. See required final exam scores with a feasibility indicator, or see your weighted average with letter grade.",
                },
              ].map((item) => (
                <div key={item.step} className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-6 text-center">
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
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-3 max-w-3xl mx-auto">
              {FAQ_DATA.map((item, i) => (
                <FAQItem key={i} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>

          {/* Related Tools */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: "GPA Calculator",
                  description: "Calculate your semester or cumulative GPA from letter grades and credit hours.",
                  href: "/tools/gpa-calculator",
                },
                {
                  title: "Percentage Calculator",
                  description: "Calculate percentages, percentage of a total, and percentage change.",
                  href: "/tools/percentage-calculator",
                },
                {
                  title: "Tip Calculator",
                  description: "Calculate tips and split bills between multiple people.",
                  href: "/tools/tip-calculator",
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

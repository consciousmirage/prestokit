"use client";

import { useState, useMemo } from "react";

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
      <span className="text-[#f0f0f5]">GPA Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Types & Grading Scales                                             */
/* ------------------------------------------------------------------ */

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: string;
  weight: string;
}

type GradingScale = "standard" | "plusMinus" | "plusMinusDetailed";

const GRADE_POINTS: Record<GradingScale, Record<string, number>> = {
  standard: {
    A: 4.0,
    B: 3.0,
    C: 2.0,
    D: 1.0,
    F: 0.0,
  },
  plusMinus: {
    "A+": 4.0,
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    "D-": 0.7,
    F: 0.0,
  },
  plusMinusDetailed: {
    "A+": 4.3,
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    "D-": 0.7,
    F: 0.0,
  },
};

const WEIGHT_BONUS: Record<string, number> = {
  regular: 0,
  honors: 0.5,
  ap: 1.0,
};

const SCALE_LABELS: Record<GradingScale, string> = {
  standard: "Standard (A-F)",
  plusMinus: "+/- Scale (A+ = 4.0)",
  plusMinusDetailed: "+/- Scale (A+ = 4.3)",
};

let nextId = 1;

function createCourse(): Course {
  return {
    id: nextId++,
    name: "",
    grade: "A",
    credits: "3",
    weight: "regular",
  };
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "How is GPA calculated?",
    answer:
      "GPA is calculated by multiplying each course's grade points by its credit hours, summing those values, and dividing by the total number of credit hours. For example, an A (4.0) in a 3-credit course and a B (3.0) in a 4-credit course gives you (4.0 x 3 + 3.0 x 4) / (3 + 4) = 24/7 = 3.43 GPA.",
  },
  {
    question: "What is the difference between weighted and unweighted GPA?",
    answer:
      "An unweighted GPA uses a standard 4.0 scale where all classes are treated equally. A weighted GPA gives extra points for harder classes: typically +0.5 for honors courses and +1.0 for AP/IB courses. So an A in an AP class could count as 5.0 instead of 4.0 on a weighted scale. Most high schools report both.",
  },
  {
    question: "What is a good GPA?",
    answer:
      "On an unweighted 4.0 scale, a 3.0 (B average) is generally considered 'good,' 3.5+ is 'very good,' and 3.7+ is 'excellent.' For college admissions to competitive universities, a 3.7+ unweighted GPA is typically expected. On a weighted scale, top students often have GPAs above 4.0 due to AP/honors coursework.",
  },
  {
    question: "Does this GPA calculator support plus/minus grading?",
    answer:
      "Yes, you can choose between three grading scales: Standard (A through F), +/- Scale where A+ equals 4.0, and a +/- Scale where A+ equals 4.3. Many colleges use the +/- system where, for example, a B+ is worth 3.3 and a B- is worth 2.7. Select the scale that matches your school's system.",
  },
  {
    question: "How do credit hours affect GPA?",
    answer:
      "Credit hours act as weights in the GPA calculation. A 4-credit course has more impact on your GPA than a 1-credit course. This means earning a high grade in a course with more credits will boost your GPA more than the same grade in a course with fewer credits. Most college courses are 3-4 credits.",
  },
  {
    question: "Can I calculate my cumulative GPA?",
    answer:
      "Yes, simply add all the courses you've taken across all semesters. Enter each course with its grade and credit hours, and the calculator will compute your cumulative GPA across all entries. You can also use the 'existing GPA' fields to combine your prior cumulative GPA with a new semester.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function GPACalculatorPage() {
  const [courses, setCourses] = useState<Course[]>([createCourse(), createCourse(), createCourse(), createCourse()]);
  const [scale, setScale] = useState<GradingScale>("plusMinus");
  const [useWeighted, setUseWeighted] = useState(false);
  const [existingGPA, setExistingGPA] = useState("");
  const [existingCredits, setExistingCredits] = useState("");

  const gradeOptions = Object.keys(GRADE_POINTS[scale]);

  const results = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;
    let validCourses = 0;

    for (const course of courses) {
      const credits = parseFloat(course.credits);
      if (isNaN(credits) || credits <= 0) continue;
      const basePoints = GRADE_POINTS[scale][course.grade];
      if (basePoints === undefined) continue;
      const bonus = useWeighted ? WEIGHT_BONUS[course.weight] : 0;
      totalPoints += (basePoints + bonus) * credits;
      totalCredits += credits;
      validCourses++;
    }

    const semesterGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;

    // Cumulative with existing
    const exGPA = parseFloat(existingGPA);
    const exCredits = parseFloat(existingCredits);
    let cumulativeGPA = semesterGPA;
    let cumulativeCredits = totalCredits;

    if (!isNaN(exGPA) && !isNaN(exCredits) && exCredits > 0) {
      const exPoints = exGPA * exCredits;
      cumulativeGPA = (exPoints + totalPoints) / (exCredits + totalCredits);
      cumulativeCredits = exCredits + totalCredits;
    }

    return {
      semesterGPA,
      cumulativeGPA,
      totalCredits,
      cumulativeCredits,
      validCourses,
    };
  }, [courses, scale, useWeighted, existingGPA, existingCredits]);

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const addCourse = () => setCourses((prev) => [...prev, createCourse()]);
  const removeCourse = (id: number) =>
    setCourses((prev) => prev.filter((c) => c.id !== id));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free GPA Calculator",
    description:
      "Calculate your GPA with weighted and unweighted options. Supports multiple grading scales and unlimited courses.",
    url: "https://prestokit.com/tools/gpa-calculator",
    applicationCategory: "EducationalApplication",
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

  function getGPAColor(gpa: number): string {
    if (gpa >= 3.7) return "#00e676";
    if (gpa >= 3.0) return "#7c6cf0";
    if (gpa >= 2.0) return "#ffd740";
    return "#ff5252";
  }

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
              GPA{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate your semester and cumulative GPA instantly. Supports
              weighted and unweighted GPA with multiple grading scales.
            </p>
          </div>

          {/* Settings */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Grading Scale */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
                  Grading Scale
                </label>
                <div className="space-y-2">
                  {(Object.keys(SCALE_LABELS) as GradingScale[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setScale(s)}
                      className={`w-full rounded-xl border py-3 px-4 text-sm font-semibold text-left transition-all ${
                        scale === s
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                          : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                      }`}
                    >
                      {SCALE_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weighted toggle + existing GPA */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
                  Options
                </label>
                <button
                  onClick={() => setUseWeighted(!useWeighted)}
                  className={`w-full flex items-center gap-3 rounded-xl border p-4 transition-all mb-4 ${
                    useWeighted
                      ? "border-[#00e676] bg-[#00e676]/10"
                      : "border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#00e676]/40"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      useWeighted ? "border-[#00e676] bg-[#00e676]" : "border-[#555566]"
                    }`}
                  >
                    {useWeighted && (
                      <svg className="w-3 h-3 text-[#0a0a0f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${useWeighted ? "text-white" : "text-[#8888a0]"}`}>
                    Use weighted GPA (Honors +0.5, AP/IB +1.0)
                  </span>
                </button>

                <div className="space-y-3">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide">
                    Combine with Existing GPA (optional)
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="5"
                      value={existingGPA}
                      onChange={(e) => setExistingGPA(e.target.value)}
                      placeholder="Prior GPA"
                      className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                    <input
                      type="number"
                      step="1"
                      min="0"
                      value={existingCredits}
                      onChange={(e) => setExistingCredits(e.target.value)}
                      placeholder="Prior Credits"
                      className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Table */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Courses</h2>

            <div className="space-y-3">
              {/* Header row */}
              <div className={`grid gap-3 text-xs text-[#8888a0] uppercase tracking-wide ${useWeighted ? "grid-cols-[1fr_100px_80px_100px_40px]" : "grid-cols-[1fr_100px_80px_40px]"}`}>
                <div>Course Name</div>
                <div>Grade</div>
                <div>Credits</div>
                {useWeighted && <div>Weight</div>}
                <div></div>
              </div>

              {courses.map((course) => (
                <div
                  key={course.id}
                  className={`grid gap-3 items-center ${useWeighted ? "grid-cols-[1fr_100px_80px_100px_40px]" : "grid-cols-[1fr_100px_80px_40px]"}`}
                >
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                    placeholder="Course name"
                    className="rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] py-2.5 px-3 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                  <select
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                    className="rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  >
                    {gradeOptions.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="1"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                    className="rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                  {useWeighted && (
                    <select
                      value={course.weight}
                      onChange={(e) => updateCourse(course.id, "weight", e.target.value)}
                      className="rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    >
                      <option value="regular">Regular</option>
                      <option value="honors">Honors</option>
                      <option value="ap">AP/IB</option>
                    </select>
                  )}
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="text-[#555566] hover:text-[#ff5252] transition-colors p-1"
                    title="Remove course"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={addCourse}
              className="mt-4 w-full rounded-xl border border-dashed border-[#1e1e2e] py-3 text-sm font-medium text-[#8888a0] hover:border-[#7c6cf0]/40 hover:text-[#7c6cf0] transition-all"
            >
              + Add Course
            </button>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 text-center">
              <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                Semester GPA
              </div>
              <div
                className="text-4xl font-bold"
                style={{ color: getGPAColor(results.semesterGPA) }}
              >
                {results.semesterGPA.toFixed(2)}
              </div>
              <div className="text-xs text-[#555566] mt-1">
                {results.totalCredits} credit hours &middot; {results.validCourses} courses
              </div>
            </div>

            <div className="rounded-2xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-6 text-center">
              <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                Cumulative GPA
              </div>
              <div
                className="text-4xl font-bold"
                style={{ color: getGPAColor(results.cumulativeGPA) }}
              >
                {results.cumulativeGPA.toFixed(2)}
              </div>
              <div className="text-xs text-[#555566] mt-1">
                {results.cumulativeCredits} total credits
              </div>
            </div>

            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 text-center">
              <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                Letter Grade
              </div>
              <div className="text-4xl font-bold text-white">
                {results.semesterGPA >= 3.7
                  ? "A"
                  : results.semesterGPA >= 3.3
                  ? "A-"
                  : results.semesterGPA >= 3.0
                  ? "B+"
                  : results.semesterGPA >= 2.7
                  ? "B"
                  : results.semesterGPA >= 2.3
                  ? "B-"
                  : results.semesterGPA >= 2.0
                  ? "C+"
                  : results.semesterGPA >= 1.7
                  ? "C"
                  : results.semesterGPA >= 1.0
                  ? "D"
                  : "F"}
              </div>
              <div className="text-xs text-[#555566] mt-1">
                Approximate equivalent
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Add Your Courses",
                  description:
                    "Enter each course with its grade and credit hours. Add as many courses as you need — there's no limit.",
                },
                {
                  step: "2",
                  title: "Choose Your Scale",
                  description:
                    "Select your grading scale (standard A-F or +/- system) and toggle weighted GPA for honors or AP courses.",
                },
                {
                  step: "3",
                  title: "See Your GPA",
                  description:
                    "View your semester and cumulative GPA instantly. Optionally enter your prior GPA to calculate your updated cumulative GPA.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-6 text-center"
                >
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
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 max-w-3xl mx-auto">
              {FAQ_DATA.map((item, i) => (
                <FAQItem key={i} question={item.question} answer={item.answer} />
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
                  title: "Percentage Calculator",
                  description:
                    "Calculate percentages, percentage change, increase, and decrease.",
                  href: "/tools/percentage-calculator",
                },
                {
                  title: "Word Counter",
                  description:
                    "Count words, characters, sentences, and get reading time estimates.",
                  href: "/tools/word-counter",
                },
                {
                  title: "Character Counter",
                  description:
                    "Count characters with social media limits for Twitter, Instagram, and more.",
                  href: "/tools/character-counter",
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

"use client";

import { useState, useRef } from "react";

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
      <span className="text-[#f0f0f5]">Resume Builder</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What should I include in my resume?",
    answer:
      "A strong resume includes your contact information, a professional summary or objective, work experience with measurable achievements, education, and relevant skills. Tailor each section to the specific job you're applying for, highlighting the most relevant experience first.",
  },
  {
    question: "How long should a resume be?",
    answer:
      "For most professionals, a one-page resume is ideal. If you have 10+ years of relevant experience, a two-page resume is acceptable. Entry-level candidates should always stick to one page. Focus on quality over quantity — every line should earn its place.",
  },
  {
    question: "What is the difference between a resume and a CV?",
    answer:
      "A resume is a concise 1-2 page summary of your skills and experience, common in the US and Canada. A CV (Curriculum Vitae) is a comprehensive document detailing your entire academic and professional history, common in Europe and for academic positions. This builder creates a resume-style document.",
  },
  {
    question: "Should I include an objective statement?",
    answer:
      "Modern resumes typically use a professional summary instead of an objective statement. A summary highlights your top skills and achievements in 2-3 sentences. Use the Summary field in this builder to write a compelling professional summary tailored to the role you want.",
  },
  {
    question: "How do I format my resume for ATS systems?",
    answer:
      "Applicant Tracking Systems (ATS) scan resumes for keywords from the job description. Use standard section headings (Experience, Education, Skills), include relevant keywords naturally, avoid tables and graphics, and use a clean single-column layout — exactly what this builder produces.",
  },
  {
    question: "Is this resume builder really free?",
    answer:
      "Yes, 100% free with no hidden fees. You can build and preview your resume without creating an account. Use the print function (Ctrl+P / Cmd+P) on the preview to save as PDF from your browser.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ResumeBuilderPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");

  const [experiences, setExperiences] = useState<Experience[]>([
    { id: "1", title: "", company: "", startDate: "", endDate: "", description: "" },
  ]);
  const [educations, setEducations] = useState<Education[]>([
    { id: "1", degree: "", school: "", year: "" },
  ]);

  const previewRef = useRef<HTMLDivElement>(null);

  const addExperience = () =>
    setExperiences((prev) => [
      ...prev,
      { id: Date.now().toString(), title: "", company: "", startDate: "", endDate: "", description: "" },
    ]);

  const updateExperience = (id: string, field: keyof Experience, value: string) =>
    setExperiences((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const removeExperience = (id: string) =>
    setExperiences((prev) => (prev.length > 1 ? prev.filter((e) => e.id !== id) : prev));

  const addEducation = () =>
    setEducations((prev) => [...prev, { id: Date.now().toString(), degree: "", school: "", year: "" }]);

  const updateEducation = (id: string, field: keyof Education, value: string) =>
    setEducations((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const removeEducation = (id: string) =>
    setEducations((prev) => (prev.length > 1 ? prev.filter((e) => e.id !== id) : prev));

  const handlePrint = () => {
    const content = previewRef.current;
    if (!content) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<!DOCTYPE html><html><head><title>${fullName || "Resume"} - Resume</title><style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Georgia', 'Times New Roman', serif; color: #1a1a1a; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.5; }
      h1 { font-size: 26px; margin-bottom: 4px; }
      h2 { font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1.5px solid #1a1a1a; padding-bottom: 4px; margin-top: 20px; margin-bottom: 10px; }
      h3 { font-size: 15px; margin-bottom: 2px; }
      .contact { font-size: 13px; color: #444; margin-bottom: 2px; }
      .summary { font-size: 13px; color: #333; margin-top: 10px; }
      .entry { margin-bottom: 14px; }
      .entry-header { display: flex; justify-content: space-between; align-items: baseline; }
      .entry-sub { font-size: 13px; color: #555; font-style: italic; }
      .entry-desc { font-size: 13px; color: #333; margin-top: 4px; white-space: pre-line; }
      .skills { font-size: 13px; color: #333; }
      @media print { body { padding: 20px; } }
    </style></head><body>`);

    // Name and contact
    win.document.write(`<h1>${fullName || "Your Name"}</h1>`);
    const contactParts = [email, phone, location, website].filter(Boolean);
    if (contactParts.length > 0) {
      win.document.write(`<div class="contact">${contactParts.join(" | ")}</div>`);
    }

    // Summary
    if (summary) {
      win.document.write(`<div class="summary">${summary}</div>`);
    }

    // Experience
    const filledExp = experiences.filter((e) => e.title || e.company);
    if (filledExp.length > 0) {
      win.document.write(`<h2>Experience</h2>`);
      filledExp.forEach((e) => {
        win.document.write(`<div class="entry">`);
        win.document.write(`<div class="entry-header"><h3>${e.title}${e.company ? ` — ${e.company}` : ""}</h3><span class="entry-sub">${[e.startDate, e.endDate].filter(Boolean).join(" – ")}</span></div>`);
        if (e.description) win.document.write(`<div class="entry-desc">${e.description}</div>`);
        win.document.write(`</div>`);
      });
    }

    // Education
    const filledEdu = educations.filter((e) => e.degree || e.school);
    if (filledEdu.length > 0) {
      win.document.write(`<h2>Education</h2>`);
      filledEdu.forEach((e) => {
        win.document.write(`<div class="entry"><div class="entry-header"><h3>${e.degree}${e.school ? ` — ${e.school}` : ""}</h3><span class="entry-sub">${e.year}</span></div></div>`);
      });
    }

    // Skills
    if (skills) {
      win.document.write(`<h2>Skills</h2><div class="skills">${skills}</div>`);
    }

    win.document.write(`</body></html>`);
    win.document.close();
    setTimeout(() => win.print(), 250);
  };

  const inputClass =
    "w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Resume Builder",
    description:
      "Build a professional resume online for free. Fill in your details and get a clean, formatted resume with live preview.",
    url: "https://prestokit.com/tools/resume-builder",
    applicationCategory: "BusinessApplication",
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Resume{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Builder
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Build a professional resume in minutes. Fill in your details, see a
              live preview, and print or save as PDF. Completely free.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Form */}
            <div className="space-y-4">
              {/* Personal Info */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-4">Personal Information</h2>
                <div className="space-y-3">
                  <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
                    <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Location (City, State)" value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} />
                    <input type="text" placeholder="Website / LinkedIn" value={website} onChange={(e) => setWebsite(e.target.value)} className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-4">Professional Summary</h2>
                <textarea
                  rows={3}
                  placeholder="Brief professional summary highlighting your key strengths..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className={inputClass + " resize-none"}
                />
              </div>

              {/* Experience */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-[#c0c0d0]">Work Experience</h2>
                  <button onClick={addExperience} className="text-xs text-[#9d90f5] hover:text-[#7c6cf0] font-medium">+ Add</button>
                </div>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <input type="text" placeholder="Job Title" value={exp.title} onChange={(e) => updateExperience(exp.id, "title", e.target.value)} className={inputClass} />
                        {experiences.length > 1 && (
                          <button onClick={() => removeExperience(exp.id)} className="ml-2 text-[#555566] hover:text-[#ff5252] text-lg shrink-0">&times;</button>
                        )}
                      </div>
                      <input type="text" placeholder="Company" value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} className={inputClass} />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Start Date" value={exp.startDate} onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)} className={inputClass} />
                        <input type="text" placeholder="End Date (or Present)" value={exp.endDate} onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)} className={inputClass} />
                      </div>
                      <textarea rows={2} placeholder="Key achievements and responsibilities..." value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} className={inputClass + " resize-none"} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-[#c0c0d0]">Education</h2>
                  <button onClick={addEducation} className="text-xs text-[#9d90f5] hover:text-[#7c6cf0] font-medium">+ Add</button>
                </div>
                <div className="space-y-4">
                  {educations.map((edu) => (
                    <div key={edu.id} className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <input type="text" placeholder="Degree / Certificate" value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} className={inputClass} />
                        {educations.length > 1 && (
                          <button onClick={() => removeEducation(edu.id)} className="ml-2 text-[#555566] hover:text-[#ff5252] text-lg shrink-0">&times;</button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="School / University" value={edu.school} onChange={(e) => updateEducation(edu.id, "school", e.target.value)} className={inputClass} />
                        <input type="text" placeholder="Year" value={edu.year} onChange={(e) => updateEducation(edu.id, "year", e.target.value)} className={inputClass} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-4">Skills</h2>
                <input
                  type="text"
                  placeholder="JavaScript, React, Project Management, Excel..."
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#1e1e2e] bg-white p-8 min-h-[600px]" ref={previewRef}>
                {/* Resume Preview */}
                <div className="font-serif">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {fullName || "Your Name"}
                  </h2>
                  {(email || phone || location || website) && (
                    <p className="text-xs text-gray-500 mb-1">
                      {[email, phone, location, website].filter(Boolean).join(" | ")}
                    </p>
                  )}
                  {summary && (
                    <p className="text-xs text-gray-600 mt-3 leading-relaxed">{summary}</p>
                  )}

                  {/* Experience */}
                  {experiences.some((e) => e.title || e.company) && (
                    <>
                      <div className="border-b border-gray-900 mt-5 mb-2">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-900 pb-1">
                          Experience
                        </h3>
                      </div>
                      {experiences.filter((e) => e.title || e.company).map((e) => (
                        <div key={e.id} className="mb-3">
                          <div className="flex justify-between items-baseline">
                            <h4 className="text-sm font-semibold text-gray-900">
                              {e.title}{e.company ? ` — ${e.company}` : ""}
                            </h4>
                            <span className="text-xs text-gray-400 italic shrink-0 ml-4">
                              {[e.startDate, e.endDate].filter(Boolean).join(" – ")}
                            </span>
                          </div>
                          {e.description && (
                            <p className="text-xs text-gray-600 mt-1 whitespace-pre-line leading-relaxed">{e.description}</p>
                          )}
                        </div>
                      ))}
                    </>
                  )}

                  {/* Education */}
                  {educations.some((e) => e.degree || e.school) && (
                    <>
                      <div className="border-b border-gray-900 mt-5 mb-2">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-900 pb-1">
                          Education
                        </h3>
                      </div>
                      {educations.filter((e) => e.degree || e.school).map((e) => (
                        <div key={e.id} className="mb-2">
                          <div className="flex justify-between items-baseline">
                            <h4 className="text-sm font-semibold text-gray-900">
                              {e.degree}{e.school ? ` — ${e.school}` : ""}
                            </h4>
                            <span className="text-xs text-gray-400 italic shrink-0 ml-4">{e.year}</span>
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  {/* Skills */}
                  {skills && (
                    <>
                      <div className="border-b border-gray-900 mt-5 mb-2">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-900 pb-1">
                          Skills
                        </h3>
                      </div>
                      <p className="text-xs text-gray-600">{skills}</p>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={handlePrint}
                className="w-full rounded-xl bg-[#7c6cf0] py-3.5 text-base font-semibold text-white transition-all hover:bg-[#6b5ce0]"
              >
                Print / Save as PDF
              </button>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16 mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Fill In Your Details",
                  description:
                    "Enter your personal information, work experience, education, and skills. Add or remove sections as needed.",
                },
                {
                  step: "2",
                  title: "Preview Your Resume",
                  description:
                    "See a live preview of your formatted resume as you type. The clean, professional layout updates in real time.",
                },
                {
                  step: "3",
                  title: "Print or Save as PDF",
                  description:
                    "Click the print button to open your resume in a new window. Use your browser's Save as PDF option to download it.",
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
                  title: "Business Card Generator",
                  description:
                    "Design professional business cards and download as high-resolution PNG.",
                  href: "/tools/business-card-generator",
                },
                {
                  title: "Invoice Generator",
                  description:
                    "Create professional invoices in seconds. Download as PDF instantly.",
                  href: "/tools/invoice-generator",
                },
                {
                  title: "Email Signature Creator",
                  description:
                    "Build beautiful HTML email signatures for Gmail, Outlook, and Apple Mail.",
                  href: "/tools/email-signature-creator",
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

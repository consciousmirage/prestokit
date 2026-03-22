"use client";

import { useState, useMemo, useCallback } from "react";

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
      <span className="text-[#f0f0f5]">Privacy Policy Generator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PolicyConfig {
  companyName: string;
  websiteUrl: string;
  contactEmail: string;
  effectiveDate: string;
  // Data collection
  collectsPersonalInfo: boolean;
  collectsEmail: boolean;
  collectsName: boolean;
  collectsPayment: boolean;
  collectsLocation: boolean;
  collectsUsageData: boolean;
  // Third parties
  usesGoogleAnalytics: boolean;
  usesCookies: boolean;
  usesThirdPartyAds: boolean;
  usesPaymentProcessors: boolean;
  usesSocialLogins: boolean;
  // Compliance
  gdprCompliant: boolean;
  ccpaCompliant: boolean;
  childrenPolicy: boolean;
  // Platform
  hasApp: boolean;
  hasNewsletter: boolean;
}

/* ------------------------------------------------------------------ */
/*  Policy Generator                                                   */
/* ------------------------------------------------------------------ */

function generatePolicy(config: PolicyConfig): string {
  const company = config.companyName || "[Your Company Name]";
  const website = config.websiteUrl || "[Your Website URL]";
  const email = config.contactEmail || "[your-email@example.com]";
  const date = config.effectiveDate || new Date().toISOString().split("T")[0];

  let policy = `PRIVACY POLICY

Last updated: ${date}

${company} ("we," "our," or "us") operates ${website}${config.hasApp ? " and our mobile application" : ""} (collectively, the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.

Please read this Privacy Policy carefully. By using the Service, you agree to the collection and use of information in accordance with this policy.

---

1. INFORMATION WE COLLECT

`;

  if (config.collectsPersonalInfo) {
    policy += `Personal Information
We may collect personally identifiable information that you voluntarily provide when using our Service, including but not limited to:
`;
    if (config.collectsName) policy += `- Full name\n`;
    if (config.collectsEmail) policy += `- Email address\n`;
    if (config.collectsPayment) policy += `- Payment information (credit card numbers, billing address)\n`;
    if (config.collectsLocation) policy += `- Location data\n`;
    policy += `- Any other information you choose to provide\n\n`;
  }

  if (config.collectsUsageData) {
    policy += `Usage Data
We automatically collect certain information when you access the Service, including:
- Your IP address
- Browser type and version
- Pages visited and time spent on pages
- Date and time of access
- Device type and operating system
- Referring website addresses
- Clickstream data

`;
  }

  if (config.usesCookies) {
    policy += `Cookies and Tracking Technologies
We use cookies, web beacons, and similar tracking technologies to collect and store information about your interactions with our Service. Cookies are small data files placed on your device.

Types of cookies we use:
- Essential Cookies: Required for the Service to function properly.
- Analytics Cookies: Help us understand how visitors interact with the Service.
${config.usesThirdPartyAds ? "- Advertising Cookies: Used to deliver relevant advertisements.\n" : ""}
You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some features of our Service.

`;
  }

  policy += `---

2. HOW WE USE YOUR INFORMATION

We may use the information we collect for purposes including:

- To provide, maintain, and improve our Service
- To process transactions and send related information
- To send you technical notices, updates, and support messages
${config.hasNewsletter ? "- To send you newsletters and marketing communications (with your consent)\n" : ""}- To respond to your comments, questions, and customer service requests
- To monitor and analyze trends, usage, and activities
- To detect, prevent, and address technical issues and fraud
- To comply with legal obligations

---

3. SHARING YOUR INFORMATION

We may share your information in the following situations:

- With Service Providers: We may share your information with third-party companies that perform services on our behalf, including:
`;

  if (config.usesGoogleAnalytics) policy += `  - Google Analytics (website analytics)\n`;
  if (config.usesPaymentProcessors) policy += `  - Payment processors (Stripe, PayPal, or similar)\n`;
  if (config.usesThirdPartyAds) policy += `  - Advertising partners\n`;
  if (config.usesSocialLogins) policy += `  - Social media platforms (for login functionality)\n`;

  policy += `
- For Legal Reasons: We may disclose your information if required to do so by law or in response to valid requests by public authorities.
- Business Transfers: In connection with a merger, acquisition, or sale of assets, your information may be transferred.
- With Your Consent: We may share your information for any other purpose with your consent.

---

4. DATA SECURITY

We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.

`;

  if (config.gdprCompliant) {
    policy += `---

5. YOUR RIGHTS UNDER GDPR (European Economic Area)

If you are a resident of the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR):

- Right to Access: You can request copies of your personal data.
- Right to Rectification: You can request correction of inaccurate or incomplete data.
- Right to Erasure: You can request deletion of your personal data under certain conditions.
- Right to Restrict Processing: You can request restriction of processing under certain conditions.
- Right to Data Portability: You can request transfer of your data to another organization or directly to you.
- Right to Object: You can object to our processing of your personal data.

To exercise any of these rights, please contact us at ${email}. We will respond to your request within 30 days.

Legal basis for processing: We process your data based on consent, contractual necessity, legal obligations, and/or legitimate interests.

`;
  }

  if (config.ccpaCompliant) {
    policy += `---

${config.gdprCompliant ? "6" : "5"}. YOUR RIGHTS UNDER CCPA (California)

If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA):

- Right to Know: You can request disclosure of the categories and specific pieces of personal information we have collected.
- Right to Delete: You can request deletion of personal information we have collected.
- Right to Opt-Out: You can opt out of the sale of your personal information. Note: We do not sell personal information.
- Right to Non-Discrimination: We will not discriminate against you for exercising your CCPA rights.

To exercise these rights, contact us at ${email}. We will verify your identity before processing your request and respond within 45 days.

`;
  }

  let sectionNum = 5;
  if (config.gdprCompliant) sectionNum++;
  if (config.ccpaCompliant) sectionNum++;

  if (config.childrenPolicy) {
    policy += `---

${sectionNum}. CHILDREN'S PRIVACY

Our Service is not directed to children under the age of 13 (or 16 in the EEA). We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us at ${email}. If we become aware that we have collected personal information from a child without parental consent, we will take steps to remove that information from our servers.

`;
    sectionNum++;
  }

  policy += `---

${sectionNum}. THIRD-PARTY LINKS

Our Service may contain links to third-party websites or services that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. We encourage you to review the privacy policy of every site you visit.

---

${sectionNum + 1}. CHANGES TO THIS PRIVACY POLICY

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top. You are advised to review this Privacy Policy periodically for any changes.

---

${sectionNum + 2}. CONTACT US

If you have any questions about this Privacy Policy, you can contact us:

- By email: ${email}
- By visiting: ${website}

---

This privacy policy was generated using PrestoKit (https://prestokit.com/tools/privacy-policy-generator) and should be reviewed by a legal professional before use.`;

  return policy;
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "Does every website need a privacy policy?",
    answer:
      "Yes. If your website collects any personal data (including through analytics tools like Google Analytics, contact forms, newsletter signups, or cookies), you are legally required to have a privacy policy in most jurisdictions. Laws like GDPR (Europe), CCPA (California), PIPEDA (Canada), and others mandate transparency about data collection. Even if not legally required in your jurisdiction, major platforms (Google, Apple, Facebook) require one for apps and advertising.",
  },
  {
    question: "What should a privacy policy include?",
    answer:
      "A comprehensive privacy policy should cover: what personal information you collect, how you collect it (forms, cookies, analytics), why you collect it (purpose), how you use the information, who you share it with (third-party services), how you protect the data, user rights (access, deletion, opt-out), cookie policy, children's privacy stance, how you handle changes to the policy, and contact information. The specific requirements vary by jurisdiction.",
  },
  {
    question: "Is a generated privacy policy legally valid?",
    answer:
      "A generated privacy policy provides a solid starting template that covers standard requirements. However, every business is unique, and we strongly recommend having a legal professional review your privacy policy before publishing it. This is especially important if you handle sensitive data (health, financial, children's data), operate in multiple jurisdictions, or have complex data processing activities.",
  },
  {
    question: "What is GDPR and does it apply to me?",
    answer:
      "The General Data Protection Regulation (GDPR) is a European Union law that governs how personal data of EU residents is collected, stored, and processed. It applies to any organization worldwide that collects data from EU residents — not just EU-based companies. If your website is accessible in Europe and collects any personal data, GDPR likely applies to you. Key requirements include obtaining explicit consent, providing data access/deletion rights, and reporting breaches within 72 hours.",
  },
  {
    question: "What is CCPA and does it apply to me?",
    answer:
      "The California Consumer Privacy Act (CCPA) gives California residents specific rights regarding their personal information. It applies to businesses that: do business in California AND (a) have annual gross revenue over $25 million, (b) buy/sell personal information of 100,000+ consumers, or (c) derive 50%+ of annual revenue from selling consumer personal information. Even if you don't meet these thresholds, complying with CCPA standards is good practice.",
  },
  {
    question: "How often should I update my privacy policy?",
    answer:
      "Review and update your privacy policy at least once a year, or whenever you: add new features that collect different data, start using new third-party services (analytics, payment processors), change how you handle or share data, expand to new markets or jurisdictions, or when relevant privacy laws change. Always update the 'Last updated' date and notify users of material changes.",
  },
];

/* ------------------------------------------------------------------ */
/*  Toggle Component                                                   */
/* ------------------------------------------------------------------ */

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-full flex items-start gap-3 rounded-xl border p-3.5 transition-all text-left ${
        checked
          ? "border-[#7c6cf0]/50 bg-[#7c6cf0]/5"
          : "border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#7c6cf0]/20"
      }`}
    >
      <div
        className={`mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all ${
          checked
            ? "border-[#7c6cf0] bg-[#7c6cf0]"
            : "border-[#555566]"
        }`}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <div>
        <span
          className={`text-sm font-medium ${
            checked ? "text-white" : "text-[#c0c0d0]"
          }`}
        >
          {label}
        </span>
        {description && (
          <p className="text-xs text-[#8888a0] mt-0.5">{description}</p>
        )}
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PrivacyPolicyGeneratorPage() {
  const [config, setConfig] = useState<PolicyConfig>({
    companyName: "",
    websiteUrl: "",
    contactEmail: "",
    effectiveDate: new Date().toISOString().split("T")[0],
    collectsPersonalInfo: true,
    collectsEmail: true,
    collectsName: true,
    collectsPayment: false,
    collectsLocation: false,
    collectsUsageData: true,
    usesGoogleAnalytics: true,
    usesCookies: true,
    usesThirdPartyAds: false,
    usesPaymentProcessors: false,
    usesSocialLogins: false,
    gdprCompliant: true,
    ccpaCompliant: true,
    childrenPolicy: true,
    hasApp: false,
    hasNewsletter: false,
  });

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const update = <K extends keyof PolicyConfig>(
    key: K,
    value: PolicyConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const policy = useMemo(() => generatePolicy(config), [config]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(policy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = policy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [policy]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([policy], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `privacy-policy-${config.companyName.replace(/\s+/g, "-").toLowerCase() || "website"}.txt`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }, [policy, config.companyName]);

  const handleDownloadHTML = useCallback(() => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy - ${config.companyName || "Website"}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; line-height: 1.7; color: #333; }
    h1 { font-size: 28px; margin-bottom: 8px; }
    h2 { font-size: 20px; margin-top: 32px; color: #111; }
    p, li { font-size: 15px; color: #444; }
    hr { border: none; border-top: 1px solid #e0e0e0; margin: 24px 0; }
    ul { padding-left: 20px; }
    .updated { color: #888; font-size: 14px; }
  </style>
</head>
<body>
${policy
  .split("\n")
  .map((line) => {
    if (line.startsWith("PRIVACY POLICY")) return `<h1>Privacy Policy</h1>`;
    if (line.startsWith("Last updated:")) return `<p class="updated">${line}</p>`;
    if (line.match(/^\d+\./)) return `<h2>${line}</h2>`;
    if (line.startsWith("---")) return `<hr>`;
    if (line.startsWith("- ")) return `<li>${line.slice(2)}</li>`;
    if (line.startsWith("  - ")) return `<li>${line.slice(4)}</li>`;
    if (line.trim() === "") return ``;
    return `<p>${line}</p>`;
  })
  .join("\n")}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `privacy-policy-${config.companyName.replace(/\s+/g, "-").toLowerCase() || "website"}.html`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }, [policy, config.companyName]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Privacy Policy Generator",
    description:
      "Generate a free, customizable privacy policy for your website or app. Covers GDPR, CCPA, cookies, and analytics.",
    url: "https://prestokit.com/tools/privacy-policy-generator",
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
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Privacy Policy{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Generate a comprehensive privacy policy for your website or app.
              Customize for GDPR, CCPA, cookies, analytics, and more. Copy or
              download instantly.
            </p>
          </div>

          {/* Mobile Tab Toggle */}
          <div className="lg:hidden mb-4">
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-[#12121a] border border-[#1e1e2e] p-1">
              <button
                onClick={() => setActiveTab("edit")}
                className={`py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "edit"
                    ? "bg-[#7c6cf0]/20 text-[#9d90f5]"
                    : "text-[#8888a0]"
                }`}
              >
                Configure
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "preview"
                    ? "bg-[#7c6cf0]/20 text-[#9d90f5]"
                    : "text-[#8888a0]"
                }`}
              >
                Preview
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div
              className={`space-y-4 ${
                activeTab === "preview" ? "hidden lg:block" : ""
              }`}
            >
              {/* Basic Info */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 space-y-4">
                <h2 className="text-sm font-semibold text-[#c0c0d0]">
                  Basic Information
                </h2>
                {[
                  {
                    key: "companyName" as keyof PolicyConfig,
                    label: "Company / Website Name",
                    placeholder: "Acme Inc.",
                    type: "text",
                  },
                  {
                    key: "websiteUrl" as keyof PolicyConfig,
                    label: "Website URL",
                    placeholder: "https://example.com",
                    type: "url",
                  },
                  {
                    key: "contactEmail" as keyof PolicyConfig,
                    label: "Contact Email",
                    placeholder: "privacy@example.com",
                    type: "email",
                  },
                  {
                    key: "effectiveDate" as keyof PolicyConfig,
                    label: "Effective Date",
                    placeholder: "",
                    type: "date",
                  },
                ].map((input) => (
                  <div key={input.key}>
                    <label className="block text-xs font-medium text-[#8888a0] mb-1.5">
                      {input.label}
                    </label>
                    <input
                      type={input.type}
                      value={config[input.key] as string}
                      onChange={(e) => update(input.key, e.target.value as never)}
                      placeholder={input.placeholder}
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-2.5 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>
                ))}
              </div>

              {/* Data Collection */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 space-y-2">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-2">
                  Data Collection
                </h2>
                <Toggle
                  label="Collects personal information"
                  description="Names, emails, or other PII via forms"
                  checked={config.collectsPersonalInfo}
                  onChange={(v) => update("collectsPersonalInfo", v)}
                />
                {config.collectsPersonalInfo && (
                  <div className="ml-8 space-y-2">
                    <Toggle label="Email addresses" checked={config.collectsEmail} onChange={(v) => update("collectsEmail", v)} />
                    <Toggle label="Names" checked={config.collectsName} onChange={(v) => update("collectsName", v)} />
                    <Toggle label="Payment information" checked={config.collectsPayment} onChange={(v) => update("collectsPayment", v)} />
                    <Toggle label="Location data" checked={config.collectsLocation} onChange={(v) => update("collectsLocation", v)} />
                  </div>
                )}
                <Toggle
                  label="Collects usage data"
                  description="IP addresses, browser info, pages visited"
                  checked={config.collectsUsageData}
                  onChange={(v) => update("collectsUsageData", v)}
                />
              </div>

              {/* Third-Party Services */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 space-y-2">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-2">
                  Third-Party Services
                </h2>
                <Toggle label="Google Analytics" checked={config.usesGoogleAnalytics} onChange={(v) => update("usesGoogleAnalytics", v)} />
                <Toggle label="Cookies" description="Any cookies beyond essential" checked={config.usesCookies} onChange={(v) => update("usesCookies", v)} />
                <Toggle label="Third-party advertising" checked={config.usesThirdPartyAds} onChange={(v) => update("usesThirdPartyAds", v)} />
                <Toggle label="Payment processors" description="Stripe, PayPal, etc." checked={config.usesPaymentProcessors} onChange={(v) => update("usesPaymentProcessors", v)} />
                <Toggle label="Social login" description="Sign in with Google, Facebook, etc." checked={config.usesSocialLogins} onChange={(v) => update("usesSocialLogins", v)} />
              </div>

              {/* Compliance & Features */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 space-y-2">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-2">
                  Compliance & Features
                </h2>
                <Toggle label="GDPR compliant" description="Required if accessible in Europe" checked={config.gdprCompliant} onChange={(v) => update("gdprCompliant", v)} />
                <Toggle label="CCPA compliant" description="Required for California users" checked={config.ccpaCompliant} onChange={(v) => update("ccpaCompliant", v)} />
                <Toggle label="Children's privacy section" description="COPPA compliance" checked={config.childrenPolicy} onChange={(v) => update("childrenPolicy", v)} />
                <Toggle label="Has a mobile app" checked={config.hasApp} onChange={(v) => update("hasApp", v)} />
                <Toggle label="Has a newsletter / email list" checked={config.hasNewsletter} onChange={(v) => update("hasNewsletter", v)} />
              </div>
            </div>

            {/* Preview Section */}
            <div
              className={`space-y-4 ${
                activeTab === "edit" ? "hidden lg:block" : ""
              }`}
            >
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-[#c0c0d0]">
                    Generated Policy
                  </h2>
                  <span className="text-xs text-[#555566]">
                    {policy.split(/\s+/).length} words
                  </span>
                </div>

                <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5 max-h-[600px] overflow-y-auto">
                  <pre className="text-xs text-[#c0c0d0] whitespace-pre-wrap font-mono leading-relaxed">
                    {policy}
                  </pre>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#7c6cf0] hover:bg-[#6b5ce0] px-4 py-3 text-sm font-semibold text-white transition-all shadow-lg shadow-[#7c6cf0]/20"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    {copied ? "Copied!" : "Copy Text"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#7c6cf0]/40 px-4 py-3 text-sm font-semibold text-[#c0c0d0] transition-all"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download .txt
                  </button>
                  <button
                    onClick={handleDownloadHTML}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#7c6cf0]/40 px-4 py-3 text-sm font-semibold text-[#c0c0d0] transition-all"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                    Download .html
                  </button>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="rounded-2xl border border-[#ff9100]/20 bg-[#ff9100]/5 p-5">
                <div className="flex gap-3">
                  <svg
                    className="w-5 h-5 text-[#ff9100] flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold text-[#ff9100] mb-1">
                      Legal Disclaimer
                    </h3>
                    <p className="text-xs text-[#a0a0b8] leading-relaxed">
                      This generator creates a template privacy policy based on
                      common practices. It is not legal advice. We strongly
                      recommend having a qualified attorney review your privacy
                      policy before publishing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16 mt-10">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Your Info",
                  description:
                    "Provide your company name, website URL, and contact email. Set the effective date for when the policy takes effect.",
                },
                {
                  step: "2",
                  title: "Configure Options",
                  description:
                    "Select what data you collect, which third-party services you use, and which privacy regulations you need to comply with.",
                },
                {
                  step: "3",
                  title: "Copy or Download",
                  description:
                    "Review the generated policy, then copy the text or download as .txt or .html. Add it to your website's privacy policy page.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-6 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-[#7c6cf0]/20 text-[#7c6cf0] font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#8888a0] leading-relaxed">
                    {item.description}
                  </p>
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
                <FAQItem
                  key={i}
                  question={item.question}
                  answer={item.answer}
                />
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
                  title: "Contract Generator",
                  description:
                    "Generate freelance contracts, NDAs, and service agreements.",
                  href: "/tools/contract-generator",
                },
                {
                  title: "Invoice Generator",
                  description:
                    "Create professional invoices in seconds, download as PDF.",
                  href: "/tools/invoice-generator",
                },
                {
                  title: "Business Name Generator",
                  description:
                    "AI-powered business name ideas with domain checks.",
                  href: "/tools/business-name-generator",
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
                  <p className="text-sm text-[#8888a0]">
                    {tool.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

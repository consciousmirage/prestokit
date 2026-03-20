"use client";

import { useState, useRef, useCallback } from "react";

type Template = "professional" | "modern" | "creative" | "compact";

interface SignatureData {
  fullName: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  github: string;
  imageUrl: string;
  logoUrl: string;
  accentColor: string;
}

const defaultData: SignatureData = {
  fullName: "",
  jobTitle: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  linkedin: "",
  twitter: "",
  instagram: "",
  github: "",
  imageUrl: "",
  logoUrl: "",
  accentColor: "#7c6cf0",
};

function buildSocialIcon(platform: string, url: string, color: string): string {
  if (!url) return "";
  const href =
    platform === "linkedin" ? (url.startsWith("http") ? url : `https://linkedin.com/in/${url}`) :
    platform === "twitter" ? (url.startsWith("http") ? url : `https://x.com/${url.replace("@", "")}`) :
    platform === "instagram" ? (url.startsWith("http") ? url : `https://instagram.com/${url.replace("@", "")}`) :
    platform === "github" ? (url.startsWith("http") ? url : `https://github.com/${url}`) : url;

  const labels: Record<string, string> = {
    linkedin: "LinkedIn",
    twitter: "X/Twitter",
    instagram: "Instagram",
    github: "GitHub",
  };

  return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="color:${color};text-decoration:none;font-size:12px;margin-right:12px;">${labels[platform] || platform}</a>`;
}

function generateProfessional(d: SignatureData): string {
  const socials = ["linkedin", "twitter", "instagram", "github"]
    .map((p) => buildSocialIcon(p, d[p as keyof SignatureData], d.accentColor))
    .filter(Boolean)
    .join("");

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333333;line-height:1.5;">
  <tr>
    <td style="padding-right:16px;vertical-align:top;">
      ${d.imageUrl ? `<img src="${d.imageUrl}" alt="${d.fullName}" width="80" height="80" style="border-radius:50%;object-fit:cover;display:block;" />` : ""}
    </td>
    <td style="vertical-align:top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:18px;font-weight:700;color:#111111;padding-bottom:2px;">${d.fullName || "Your Name"}</td></tr>
        ${d.jobTitle || d.company ? `<tr><td style="font-size:13px;color:#666666;padding-bottom:8px;">${d.jobTitle}${d.jobTitle && d.company ? " | " : ""}${d.company}</td></tr>` : ""}
        <tr><td style="border-top:2px solid ${d.accentColor};padding-top:8px;">
          <table cellpadding="0" cellspacing="0" border="0" style="font-size:13px;color:#555555;">
            ${d.email ? `<tr><td style="padding-bottom:2px;">Email:&nbsp;<a href="mailto:${d.email}" style="color:${d.accentColor};text-decoration:none;">${d.email}</a></td></tr>` : ""}
            ${d.phone ? `<tr><td style="padding-bottom:2px;">Phone:&nbsp;<a href="tel:${d.phone}" style="color:${d.accentColor};text-decoration:none;">${d.phone}</a></td></tr>` : ""}
            ${d.website ? `<tr><td style="padding-bottom:2px;">Web:&nbsp;<a href="${d.website.startsWith("http") ? d.website : "https://" + d.website}" style="color:${d.accentColor};text-decoration:none;">${d.website}</a></td></tr>` : ""}
          </table>
        </td></tr>
        ${socials ? `<tr><td style="padding-top:6px;">${socials}</td></tr>` : ""}
        ${d.logoUrl ? `<tr><td style="padding-top:10px;"><img src="${d.logoUrl}" alt="${d.company}" height="30" style="display:block;" /></td></tr>` : ""}
      </table>
    </td>
  </tr>
</table>`;
}

function generateModern(d: SignatureData): string {
  const socials = ["linkedin", "twitter", "instagram", "github"]
    .map((p) => buildSocialIcon(p, d[p as keyof SignatureData], d.accentColor))
    .filter(Boolean)
    .join("");

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333333;line-height:1.5;">
  <tr>
    <td style="border-left:4px solid ${d.accentColor};padding-left:16px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="vertical-align:top;">
            ${d.imageUrl ? `<img src="${d.imageUrl}" alt="${d.fullName}" width="70" height="70" style="border-radius:8px;object-fit:cover;display:block;margin-right:14px;" />` : ""}
          </td>
          <td style="vertical-align:top;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr><td style="font-size:18px;font-weight:700;color:#111111;">${d.fullName || "Your Name"}</td></tr>
              ${d.jobTitle ? `<tr><td style="font-size:13px;color:${d.accentColor};font-weight:600;padding-bottom:2px;">${d.jobTitle}</td></tr>` : ""}
              ${d.company ? `<tr><td style="font-size:13px;color:#888888;padding-bottom:6px;">${d.company}</td></tr>` : ""}
            </table>
          </td>
        </tr>
        <tr><td colspan="2" style="padding-top:10px;">
          <table cellpadding="0" cellspacing="0" border="0" style="font-size:12px;color:#555555;">
            <tr>
              ${d.email ? `<td style="padding-right:16px;"><a href="mailto:${d.email}" style="color:${d.accentColor};text-decoration:none;">${d.email}</a></td>` : ""}
              ${d.phone ? `<td style="padding-right:16px;"><a href="tel:${d.phone}" style="color:${d.accentColor};text-decoration:none;">${d.phone}</a></td>` : ""}
              ${d.website ? `<td><a href="${d.website.startsWith("http") ? d.website : "https://" + d.website}" style="color:${d.accentColor};text-decoration:none;">${d.website}</a></td>` : ""}
            </tr>
          </table>
        </td></tr>
        ${socials ? `<tr><td colspan="2" style="padding-top:8px;">${socials}</td></tr>` : ""}
        ${d.logoUrl ? `<tr><td colspan="2" style="padding-top:10px;"><img src="${d.logoUrl}" alt="${d.company}" height="28" style="display:block;" /></td></tr>` : ""}
      </table>
    </td>
  </tr>
</table>`;
}

function generateCreative(d: SignatureData): string {
  const socials = ["linkedin", "twitter", "instagram", "github"]
    .map((p) => buildSocialIcon(p, d[p as keyof SignatureData], "#ffffff"))
    .filter(Boolean)
    .join("");

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333333;line-height:1.5;max-width:500px;">
  <tr>
    <td style="background:${d.accentColor};padding:16px 20px;border-radius:10px 10px 0 0;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          ${d.imageUrl ? `<td style="vertical-align:middle;padding-right:14px;"><img src="${d.imageUrl}" alt="${d.fullName}" width="64" height="64" style="border-radius:50%;object-fit:cover;display:block;border:3px solid rgba(255,255,255,0.3);" /></td>` : ""}
          <td style="vertical-align:middle;">
            <span style="font-size:20px;font-weight:800;color:#ffffff;display:block;">${d.fullName || "Your Name"}</span>
            ${d.jobTitle ? `<span style="font-size:13px;color:rgba(255,255,255,0.85);display:block;">${d.jobTitle}${d.company ? ` @ ${d.company}` : ""}</span>` : ""}
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="background:#f8f8f8;padding:14px 20px;border-radius:0 0 10px 10px;border:1px solid #e5e5e5;border-top:none;">
      <table cellpadding="0" cellspacing="0" border="0" style="font-size:13px;color:#444444;width:100%;">
        <tr>
          ${d.email ? `<td style="padding-bottom:4px;"><a href="mailto:${d.email}" style="color:${d.accentColor};text-decoration:none;">${d.email}</a></td>` : ""}
        </tr>
        <tr>
          ${d.phone ? `<td style="padding-bottom:4px;"><a href="tel:${d.phone}" style="color:${d.accentColor};text-decoration:none;">${d.phone}</a></td>` : ""}
        </tr>
        ${d.website ? `<tr><td style="padding-bottom:4px;"><a href="${d.website.startsWith("http") ? d.website : "https://" + d.website}" style="color:${d.accentColor};text-decoration:none;">${d.website}</a></td></tr>` : ""}
        ${socials ? `<tr><td style="padding-top:6px;">${socials.replace(/color:[^;]+;/g, `color:${d.accentColor};`)}</td></tr>` : ""}
      </table>
      ${d.logoUrl ? `<img src="${d.logoUrl}" alt="${d.company}" height="26" style="display:block;margin-top:10px;" />` : ""}
    </td>
  </tr>
</table>`;
}

function generateCompact(d: SignatureData): string {
  const parts: string[] = [];
  if (d.fullName) parts.push(`<strong style="color:#111111;">${d.fullName}</strong>`);
  if (d.jobTitle) parts.push(`<span style="color:${d.accentColor};">${d.jobTitle}</span>`);
  if (d.company) parts.push(`<span>${d.company}</span>`);

  const contactParts: string[] = [];
  if (d.email) contactParts.push(`<a href="mailto:${d.email}" style="color:${d.accentColor};text-decoration:none;">${d.email}</a>`);
  if (d.phone) contactParts.push(`<a href="tel:${d.phone}" style="color:${d.accentColor};text-decoration:none;">${d.phone}</a>`);
  if (d.website) contactParts.push(`<a href="${d.website.startsWith("http") ? d.website : "https://" + d.website}" style="color:${d.accentColor};text-decoration:none;">${d.website}</a>`);

  const socialParts: string[] = [];
  if (d.linkedin) socialParts.push(buildSocialIcon("linkedin", d.linkedin, d.accentColor));
  if (d.twitter) socialParts.push(buildSocialIcon("twitter", d.twitter, d.accentColor));
  if (d.instagram) socialParts.push(buildSocialIcon("instagram", d.instagram, d.accentColor));
  if (d.github) socialParts.push(buildSocialIcon("github", d.github, d.accentColor));

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#555555;line-height:1.6;">
  <tr>
    ${d.imageUrl ? `<td style="vertical-align:middle;padding-right:12px;"><img src="${d.imageUrl}" alt="${d.fullName}" width="48" height="48" style="border-radius:50%;object-fit:cover;display:block;" /></td>` : ""}
    <td style="vertical-align:middle;">
      <span style="font-size:13px;">${parts.join(" &middot; ")}</span><br/>
      <span style="font-size:12px;">${contactParts.join(" &middot; ")}</span>
      ${socialParts.length > 0 ? `<br/><span style="font-size:12px;">${socialParts.join("")}</span>` : ""}
    </td>
  </tr>
</table>`;
}

function generateSignatureHTML(d: SignatureData, template: Template): string {
  switch (template) {
    case "professional": return generateProfessional(d);
    case "modern": return generateModern(d);
    case "creative": return generateCreative(d);
    case "compact": return generateCompact(d);
  }
}

const templates: { id: Template; label: string; desc: string }[] = [
  { id: "professional", label: "Professional", desc: "Clean & minimal" },
  { id: "modern", label: "Modern", desc: "Accent sidebar" },
  { id: "creative", label: "Creative", desc: "Bold & colorful" },
  { id: "compact", label: "Compact", desc: "One-line style" },
];

export default function EmailSignatureCreatorPage() {
  const [data, setData] = useState<SignatureData>(defaultData);
  const [template, setTemplate] = useState<Template>("professional");
  const [copiedRich, setCopiedRich] = useState(false);
  const [copiedHTML, setCopiedHTML] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const update = (field: keyof SignatureData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const signatureHTML = generateSignatureHTML(data, template);

  const copyRich = useCallback(async () => {
    try {
      const blob = new Blob([signatureHTML], { type: "text/html" });
      const textBlob = new Blob([signatureHTML], { type: "text/plain" });
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": blob,
          "text/plain": textBlob,
        }),
      ]);
      setCopiedRich(true);
      setTimeout(() => setCopiedRich(false), 2000);
    } catch {
      // Fallback: select and copy from preview
      if (previewRef.current) {
        const range = document.createRange();
        range.selectNodeContents(previewRef.current);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
        document.execCommand("copy");
        sel?.removeAllRanges();
        setCopiedRich(true);
        setTimeout(() => setCopiedRich(false), 2000);
      }
    }
  }, [signatureHTML]);

  const copyHTML = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(signatureHTML);
      setCopiedHTML(true);
      setTimeout(() => setCopiedHTML(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = signatureHTML;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiedHTML(true);
      setTimeout(() => setCopiedHTML(false), 2000);
    }
  }, [signatureHTML]);

  const inputClass =
    "w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-2.5 text-white text-sm placeholder-muted-dark focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <title>Free Email Signature Generator &mdash; PrestoKit</title>
      <meta name="description" content="Create professional HTML email signatures for Gmail, Outlook, and Apple Mail. Choose from 4 templates, customize colors, and copy with one click. Free, no signup." />

      {/* Hero / Header */}
      <div className="bg-hero-glow">
        <div className="max-w-6xl mx-auto px-4 pt-8 pb-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-6">
            <a href="/" className="hover:text-primary transition-colors">PrestoKit</a>
            <svg className="w-3 h-3 text-muted-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <a href="/tools" className="hover:text-primary transition-colors">Tools</a>
            <svg className="w-3 h-3 text-muted-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-white">Email Signature Creator</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Email Signature <span className="text-primary">Creator</span>
          </h1>
          <p className="text-muted-light text-lg max-w-2xl">
            Design professional HTML email signatures that work in Gmail, Outlook, and Apple Mail. Free, no signup.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* LEFT COLUMN: Form (3 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <div className="bg-brand-card border border-brand-border rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-muted-light flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Personal Info
              </h3>
              <input type="text" placeholder="Full Name" value={data.fullName} onChange={(e) => update("fullName", e.target.value)} className={inputClass} />
              <input type="text" placeholder="Job Title" value={data.jobTitle} onChange={(e) => update("jobTitle", e.target.value)} className={inputClass} />
              <input type="text" placeholder="Company Name" value={data.company} onChange={(e) => update("company", e.target.value)} className={inputClass} />
            </div>

            {/* Contact */}
            <div className="bg-brand-card border border-brand-border rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-muted-light flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Contact Details
              </h3>
              <input type="email" placeholder="Email Address" value={data.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
              <input type="tel" placeholder="Phone Number" value={data.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
              <input type="url" placeholder="Website (e.g. example.com)" value={data.website} onChange={(e) => update("website", e.target.value)} className={inputClass} />
            </div>

            {/* Social Links */}
            <div className="bg-brand-card border border-brand-border rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-muted-light flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                Social Links <span className="text-muted-dark text-xs font-normal">(optional)</span>
              </h3>
              <input type="text" placeholder="LinkedIn (URL or username)" value={data.linkedin} onChange={(e) => update("linkedin", e.target.value)} className={inputClass} />
              <input type="text" placeholder="X / Twitter (URL or @handle)" value={data.twitter} onChange={(e) => update("twitter", e.target.value)} className={inputClass} />
              <input type="text" placeholder="Instagram (URL or @handle)" value={data.instagram} onChange={(e) => update("instagram", e.target.value)} className={inputClass} />
              <input type="text" placeholder="GitHub (URL or username)" value={data.github} onChange={(e) => update("github", e.target.value)} className={inputClass} />
            </div>

            {/* Images */}
            <div className="bg-brand-card border border-brand-border rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-muted-light flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Images <span className="text-muted-dark text-xs font-normal">(optional)</span>
              </h3>
              <input type="url" placeholder="Profile Image URL" value={data.imageUrl} onChange={(e) => update("imageUrl", e.target.value)} className={inputClass} />
              <input type="url" placeholder="Company Logo URL" value={data.logoUrl} onChange={(e) => update("logoUrl", e.target.value)} className={inputClass} />
            </div>
          </div>

          {/* RIGHT COLUMN: Template, Preview, Actions (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Template Selector */}
            <div className="bg-brand-card border border-brand-border rounded-xl p-6">
              <label className="block text-sm font-semibold text-muted-light mb-3">Template</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t.id)}
                    className={`text-left p-3 rounded-lg transition-all border ${
                      template === t.id
                        ? "bg-primary/15 border-primary/50 shadow-lg shadow-primary/10"
                        : "bg-brand-card-hover border-brand-border hover:border-brand-border-hover"
                    }`}
                  >
                    <div className={`text-sm font-semibold ${template === t.id ? "text-primary" : "text-white"}`}>{t.label}</div>
                    <div className="text-xs text-muted mt-0.5">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color */}
            <div className="bg-brand-card border border-brand-border rounded-xl p-6">
              <label className="block text-sm font-semibold text-muted-light mb-3">Accent Color</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={data.accentColor}
                  onChange={(e) => update("accentColor", e.target.value)}
                  className="w-10 h-10 rounded-lg border border-brand-border cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={data.accentColor}
                  onChange={(e) => update("accentColor", e.target.value)}
                  className="w-32 bg-brand-dark border border-brand-border rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-primary transition-colors"
                />
                <div className="flex gap-2">
                  {["#7c6cf0", "#00e676", "#ff6b6b", "#ffa726", "#29b6f6", "#ec407a"].map((c) => (
                    <button
                      key={c}
                      onClick={() => update("accentColor", c)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${data.accentColor === c ? "border-white scale-110" : "border-transparent hover:scale-105"}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-brand-card border border-brand-border rounded-xl p-6">
              <label className="block text-sm font-semibold text-muted-light mb-4">Live Preview</label>
              <div className="bg-white rounded-xl p-6 min-h-[160px]">
                <div ref={previewRef} dangerouslySetInnerHTML={{ __html: signatureHTML }} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={copyRich}
                className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-brand-dark font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-accent/20 hover:shadow-accent/30"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                {copiedRich ? "Copied!" : "Copy to Clipboard"}
              </button>
              <button
                onClick={copyHTML}
                className="flex-1 flex items-center justify-center gap-2 bg-brand-card-hover hover:bg-brand-border text-white font-semibold py-3 px-6 rounded-xl border border-brand-border hover:border-brand-border-hover transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                {copiedHTML ? "Copied!" : "Copy HTML Code"}
              </button>
            </div>

            {/* Setup Instructions */}
            <div className="bg-brand-card border border-brand-border rounded-xl overflow-hidden">
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-brand-card-hover transition-colors"
              >
                <h3 className="text-sm font-semibold text-muted-light flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  How to Add Your Signature
                </h3>
                <svg className={`w-5 h-5 text-muted transition-transform ${showInstructions ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showInstructions && (
                <div className="px-6 pb-6 space-y-6">
                  {/* Gmail */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-red-500/20 text-red-400 rounded flex items-center justify-center text-xs font-bold">G</span>
                      Gmail
                    </h4>
                    <ol className="text-sm text-muted space-y-1 list-decimal list-inside">
                      <li>Click &quot;Copy to Clipboard&quot; above</li>
                      <li>Open Gmail &rarr; Settings (gear icon) &rarr; See all settings</li>
                      <li>Scroll down to &quot;Signature&quot; section</li>
                      <li>Create a new signature or edit existing</li>
                      <li>Delete any existing content, then paste (Ctrl+V / Cmd+V)</li>
                      <li>Click &quot;Save Changes&quot; at the bottom</li>
                    </ol>
                  </div>

                  {/* Outlook */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-500/20 text-blue-400 rounded flex items-center justify-center text-xs font-bold">O</span>
                      Outlook (Desktop)
                    </h4>
                    <ol className="text-sm text-muted space-y-1 list-decimal list-inside">
                      <li>Click &quot;Copy to Clipboard&quot; above</li>
                      <li>Open Outlook &rarr; File &rarr; Options &rarr; Mail &rarr; Signatures</li>
                      <li>Click &quot;New&quot; to create a signature</li>
                      <li>In the edit box, paste your signature (Ctrl+V)</li>
                      <li>Set as default for new messages and/or replies</li>
                      <li>Click OK</li>
                    </ol>
                  </div>

                  {/* Apple Mail */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-gray-500/20 text-gray-400 rounded flex items-center justify-center text-xs font-bold">A</span>
                      Apple Mail
                    </h4>
                    <ol className="text-sm text-muted space-y-1 list-decimal list-inside">
                      <li>Click &quot;Copy HTML Code&quot; above</li>
                      <li>Open Mail &rarr; Settings &rarr; Signatures</li>
                      <li>Click &quot;+&quot; to add a new signature</li>
                      <li>Open the signature file in Finder: ~/Library/Mail/V10/MailData/Signatures/</li>
                      <li>Edit the .mailsignature file and replace the body HTML with your copied code</li>
                      <li>Lock the file to prevent Mail from overwriting it</li>
                    </ol>
                  </div>

                  {/* Outlook Web */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-500/20 text-blue-400 rounded flex items-center justify-center text-xs font-bold">W</span>
                      Outlook on the Web
                    </h4>
                    <ol className="text-sm text-muted space-y-1 list-decimal list-inside">
                      <li>Click &quot;Copy to Clipboard&quot; above</li>
                      <li>Open Outlook.com &rarr; Settings (gear) &rarr; View all Outlook settings</li>
                      <li>Go to Mail &rarr; Compose and reply</li>
                      <li>Under &quot;Email signature,&quot; paste your signature</li>
                      <li>Click Save</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const QR_FAQS = [
  {
    q: "What is a QR code and how does it work?",
    a: "A QR (Quick Response) code is a two-dimensional barcode that stores information in a pattern of black and white squares. When you scan a QR code with your smartphone camera or a QR reader app, it decodes the pattern and performs an action — like opening a website, composing an email, or connecting to WiFi. QR codes were invented in 1994 by a Japanese automotive company and have since become a universal standard for quickly sharing information.",
  },
  {
    q: "What types of data can a QR code contain?",
    a: "QR codes can store several types of data including URLs (website links), plain text, email addresses with pre-filled subjects and body text, phone numbers for quick dialing, WiFi credentials for instant network connection, geographic coordinates, calendar events, and vCard contact information. Our generator supports URL, text, email, phone, and WiFi types — covering the most common business use cases.",
  },
  {
    q: "Do QR codes expire?",
    a: "Static QR codes — like the ones created with this generator — never expire. The data is encoded directly into the pattern itself, so it works as long as the QR code image exists and remains scannable. However, if your QR code points to a URL, the link itself could stop working if the website goes down or the page is moved. Dynamic QR codes (offered by paid services) can be edited after creation but may expire if the service is discontinued.",
  },
  {
    q: "What size should my QR code be for printing?",
    a: "The minimum recommended size for a printed QR code is 2 cm x 2 cm (about 0.8 inches) for close-range scanning like business cards or product labels. For posters or signs that will be scanned from a distance, use a larger size — a good rule of thumb is 1 cm of QR code width for every 10 cm of scanning distance. For our generator, the \"Large\" (500px) option works well for print, while \"Medium\" (300px) is fine for digital use.",
  },
  {
    q: "Can I customize the colors of my QR code?",
    a: "Yes, our QR code generator lets you customize both the foreground (dark modules) and background colors. However, for reliable scanning, maintain high contrast between the two colors. Dark foreground on a light background works best. Avoid using very light foreground colors or very dark background colors, as this can make the code difficult or impossible to scan. Always test your customized QR code before printing.",
  },
  {
    q: "Are QR codes free to create and use?",
    a: "Yes, creating and using QR codes is completely free. The QR code standard is open and not patented for common use. Our generator creates static QR codes at no cost, with no watermarks, no account required, and no limits on how many you can create. You can use these QR codes for any purpose — business cards, marketing materials, product packaging, restaurant menus, event tickets, and more.",
  },
  {
    q: "How do I test if my QR code works?",
    a: "After generating your QR code, test it by opening the camera app on your smartphone and pointing it at the QR code on your screen. Most modern phones (iPhone and Android) have built-in QR code scanning. If your phone does not automatically detect it, try a free QR reader app. Test from different distances and angles to make sure it scans reliably. Always test before printing a large batch of materials.",
  },
  {
    q: "Can I use QR codes on business cards and marketing materials?",
    a: "Absolutely. QR codes are widely used on business cards (linking to your website, LinkedIn, or digital vCard), brochures, flyers, posters, product packaging, restaurant menus, and trade show materials. They bridge the gap between physical and digital, making it easy for people to access your information with a quick scan. Use a QR code that links to a mobile-friendly page for the best user experience.",
  },
];

const RELATED_TOOLS_QR = [
  {
    name: "Email Signature Creator",
    description: "Design professional HTML email signatures for Gmail and Outlook.",
    href: "/tools/email-signature-creator",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    name: "Business Name Generator",
    description: "Generate creative business name ideas for your startup or brand.",
    href: "/tools/business-name-generator",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
  {
    name: "Invoice Generator",
    description: "Create and download professional PDF invoices for free.",
    href: "/tools/invoice-generator",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    name: "Receipt Maker",
    description: "Generate professional receipts for completed transactions.",
    href: "/tools/receipt-maker",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
];

type QRType = "url" | "text" | "email" | "phone" | "wifi";
type QRSize = "small" | "medium" | "large";
type WifiEncryption = "WPA" | "WEP" | "nopass";

const sizeMap: Record<QRSize, number> = {
  small: 200,
  medium: 300,
  large: 500,
};

export default function QRCodeGeneratorPage() {
  const [qrType, setQrType] = useState<QRType>("url");
  const [textInput, setTextInput] = useState("");
  const [emailAddr, setEmailAddr] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [phone, setPhone] = useState("");
  const [wifiName, setWifiName] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState<WifiEncryption>("WPA");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState<QRSize>("medium");
  const [qrUrl, setQrUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const buildQRData = useCallback((): string => {
    switch (qrType) {
      case "url":
        return textInput || "https://prestokit.com";
      case "text":
        return textInput || "Hello from PrestoKit";
      case "email": {
        const mailto = `mailto:${emailAddr}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        return mailto;
      }
      case "phone":
        return `tel:${phone}`;
      case "wifi":
        return `WIFI:T:${wifiEncryption};S:${wifiName};P:${wifiPassword};;`;
      default:
        return textInput;
    }
  }, [qrType, textInput, emailAddr, emailSubject, emailBody, phone, wifiName, wifiPassword, wifiEncryption]);

  useEffect(() => {
    const data = buildQRData();
    if (!data || data === "tel:" || data === "mailto:?subject=&body=") {
      setQrUrl("");
      return;
    }
    const px = sizeMap[size];
    const fgHex = fgColor.replace("#", "");
    const bgHex = bgColor.replace("#", "");
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${px}x${px}&data=${encodeURIComponent(data)}&color=${fgHex}&bgcolor=${bgHex}&format=png`;
    setQrUrl(url);
  }, [buildQRData, size, fgColor, bgColor]);

  const handleDownload = async () => {
    if (!qrUrl) return;
    setDownloading(true);
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `prestokit-qr-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed", err);
    }
    setDownloading(false);
  };

  const handleCopy = async () => {
    if (!qrUrl) return;
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const typeButtons: { type: QRType; label: string; icon: string }[] = [
    { type: "url", label: "URL", icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
    { type: "text", label: "Text", icon: "M4 6h16M4 12h16M4 18h7" },
    { type: "email", label: "Email", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { type: "phone", label: "Phone", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
    { type: "wifi", label: "WiFi", icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" },
  ];

  const placeholder = (): string => {
    switch (qrType) {
      case "url": return "https://example.com";
      case "text": return "Enter your text here...";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      {/* SEO Head */}
      <title>Free QR Code Generator &mdash; PrestoKit</title>
      <meta name="description" content="Generate QR codes for URLs, text, email, phone numbers, and WiFi credentials. Download as PNG. Free, no signup required." />

      {/* Hero / Header */}
      <div className="bg-hero-glow">
        <div className="max-w-5xl mx-auto px-4 pt-8 pb-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-6">
            <a href="/" className="hover:text-primary transition-colors">PrestoKit</a>
            <svg className="w-3 h-3 text-muted-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <a href="/tools" className="hover:text-primary transition-colors">Tools</a>
            <svg className="w-3 h-3 text-muted-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-white">QR Code Generator</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            QR Code <span className="text-primary">Generator</span>
          </h1>
          <p className="text-muted-light text-lg max-w-2xl">
            Generate QR codes for URLs, text, emails, phone numbers, and WiFi credentials. Free, instant, no signup.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN: Controls */}
          <div className="space-y-6">
            {/* Type Selector */}
            <div className="bg-brand-card border border-brand-border rounded-xl p-6">
              <label className="block text-sm font-semibold text-muted-light mb-3">QR Code Type</label>
              <div className="flex flex-wrap gap-2">
                {typeButtons.map((btn) => (
                  <button
                    key={btn.type}
                    onClick={() => setQrType(btn.type)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      qrType === btn.type
                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                        : "bg-brand-card-hover text-muted-light hover:text-white border border-brand-border hover:border-brand-border-hover"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={btn.icon} />
                    </svg>
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Fields */}
            <div className="bg-brand-card border border-brand-border rounded-xl p-6 space-y-4">
              <label className="block text-sm font-semibold text-muted-light mb-1">Content</label>

              {(qrType === "url" || qrType === "text") && (
                <input
                  type={qrType === "url" ? "url" : "text"}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={placeholder()}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-muted-dark focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              )}

              {qrType === "email" && (
                <div className="space-y-3">
                  <input
                    type="email"
                    value={emailAddr}
                    onChange={(e) => setEmailAddr(e.target.value)}
                    placeholder="recipient@example.com"
                    className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-muted-dark focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Subject (optional)"
                    className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-muted-dark focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    placeholder="Body (optional)"
                    rows={3}
                    className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-muted-dark focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  />
                </div>
              )}

              {qrType === "phone" && (
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-muted-dark focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              )}

              {qrType === "wifi" && (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={wifiName}
                    onChange={(e) => setWifiName(e.target.value)}
                    placeholder="Network Name (SSID)"
                    className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-muted-dark focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                  <input
                    type="password"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-muted-dark focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                  <div>
                    <label className="block text-xs text-muted mb-2">Encryption</label>
                    <div className="flex gap-2">
                      {(["WPA", "WEP", "nopass"] as WifiEncryption[]).map((enc) => (
                        <button
                          key={enc}
                          onClick={() => setWifiEncryption(enc)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            wifiEncryption === enc
                              ? "bg-primary/20 text-primary border border-primary/40"
                              : "bg-brand-dark text-muted border border-brand-border hover:border-brand-border-hover"
                          }`}
                        >
                          {enc === "nopass" ? "None" : enc}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Customization */}
            <div className="bg-brand-card border border-brand-border rounded-xl p-6 space-y-5">
              <label className="block text-sm font-semibold text-muted-light">Customization</label>

              {/* Colors */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted mb-2">Foreground Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-brand-border cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="flex-1 bg-brand-dark border border-brand-border rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted mb-2">Background Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-brand-border cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="flex-1 bg-brand-dark border border-brand-border rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Size */}
              <div>
                <label className="block text-xs text-muted mb-2">Size</label>
                <div className="flex gap-2">
                  {(["small", "medium", "large"] as QRSize[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                        size === s
                          ? "bg-primary/20 text-primary border border-primary/40"
                          : "bg-brand-dark text-muted border border-brand-border hover:border-brand-border-hover"
                      }`}
                    >
                      {s} ({sizeMap[s]}px)
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Preview + Actions */}
          <div className="space-y-6">
            {/* QR Preview */}
            <div className="bg-brand-card border border-brand-border rounded-xl p-6">
              <label className="block text-sm font-semibold text-muted-light mb-4">Preview</label>
              <div className="flex items-center justify-center rounded-xl p-8 min-h-[340px]" style={{ backgroundColor: bgColor }}>
                {qrUrl ? (
                  <img
                    ref={imgRef}
                    src={qrUrl}
                    alt="QR Code Preview"
                    className="max-w-full h-auto rounded"
                    style={{ imageRendering: "pixelated" }}
                  />
                ) : (
                  <div className="text-center text-muted-dark">
                    <svg className="w-16 h-16 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <p className="text-sm">Enter content to generate a QR code</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                disabled={!qrUrl || downloading}
                className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-brand-dark font-semibold py-3 px-6 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-accent/20 hover:shadow-accent/30"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {downloading ? "Downloading..." : "Download PNG"}
              </button>
              <button
                onClick={handleCopy}
                disabled={!qrUrl}
                className="flex-1 flex items-center justify-center gap-2 bg-brand-card-hover hover:bg-brand-border text-white font-semibold py-3 px-6 rounded-xl border border-brand-border hover:border-brand-border-hover transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
            </div>

            {/* Tips */}
            <div className="bg-brand-card border border-brand-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-muted-light mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tips
              </h3>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#8226;</span>
                  Use high contrast colors for best scan reliability
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#8226;</span>
                  WiFi QR codes let guests connect without typing passwords
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#8226;</span>
                  Larger sizes are better for print materials
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#8226;</span>
                  Always test your QR code before printing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ============================== HOW IT WORKS ============================== */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-2">How It Works</h2>
        <p className="text-muted text-center mb-12 max-w-xl mx-auto">
          Generate a custom QR code in three easy steps — completely free.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Choose Your Type",
              desc: "Select what kind of QR code you need — URL, text, email, phone number, or WiFi credentials.",
            },
            {
              step: "2",
              title: "Enter Your Content",
              desc: "Type in your data and customize the colors and size. Watch the preview update in real-time as you make changes.",
            },
            {
              step: "3",
              title: "Download or Copy",
              desc: "Download your QR code as a high-quality PNG image or copy it directly to your clipboard for instant use.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="relative rounded-2xl border border-brand-border bg-brand-card p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary text-xl font-bold">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================== FAQ SECTION ============================== */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-muted text-center mb-10 max-w-xl mx-auto">
          Everything you need to know about creating and using QR codes.
        </p>
        <div className="space-y-3">
          {QR_FAQS.map((faq, i) => (
            <QRFAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

      {/* ============================== RELATED TOOLS ============================== */}
      <section className="max-w-5xl mx-auto px-4 py-16 border-t border-brand-border">
        <h2 className="text-2xl font-bold text-center mb-2">
          Related Tools
        </h2>
        <p className="text-muted text-center mb-10">
          More free business tools to help you get things done.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RELATED_TOOLS_QR.map((tool) => (
            <a
              key={tool.name}
              href={tool.href}
              className="group rounded-2xl border border-brand-border bg-brand-card p-5 hover:border-primary/40 transition-all duration-200 hover:shadow-[0_0_30px_rgba(124,108,240,0.08)]"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <svg
                  className="h-5 w-5 text-primary"
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
              <h3 className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-muted-dark mt-1">{tool.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ============================== FAQ SCHEMA (JSON-LD) ============================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: QR_FAQS.map((faq) => ({
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
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Accordion Item                                                 */
/* ------------------------------------------------------------------ */

function QRFAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-brand-border bg-brand-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-brand-card-hover transition-colors"
      >
        <span className="text-sm font-medium text-muted-light pr-4">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-muted-dark flex-shrink-0 transition-transform duration-200 ${
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
        <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

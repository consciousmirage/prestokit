"use client";

import { useState, useEffect, useCallback, useRef } from "react";

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
    </div>
  );
}

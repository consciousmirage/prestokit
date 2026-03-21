"use client";

import { useState, useRef, useCallback } from "react";

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
      <span className="text-[#f0f0f5]">Image Compressor</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "How does browser-based image compression work?",
    answer:
      "This tool uses the HTML5 Canvas API to compress images entirely in your browser. When you upload an image, it is drawn onto an invisible canvas element. The canvas then exports the image at your chosen quality level using the toBlob() method, which re-encodes the image with lossy or lossless compression. No data is ever sent to a server.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "This compressor supports JPEG and PNG images. JPEG compression is lossy, meaning it reduces file size by discarding some image data based on your quality setting. PNG compression is lossless when exported as PNG, but you can also convert PNG to JPEG for significant size reduction.",
  },
  {
    question: "Will compressing my image reduce its quality?",
    answer:
      "JPEG compression is lossy, so lowering the quality slider will reduce visual fidelity. However, quality settings above 70-80% typically produce images that look virtually identical to the original while being significantly smaller. Use the before/after comparison to judge the results.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "Since everything runs in your browser, the only limit is your device's available memory. Most modern devices can handle images up to 20-30 MB without issues. Very large images (50 MB+) may be slow to process on older devices.",
  },
  {
    question: "Is my image data private?",
    answer:
      "Yes, completely. Your images never leave your device. All processing happens locally in your browser using the Canvas API. No images are uploaded to any server, and nothing is stored or logged. You can even use this tool offline after the page loads.",
  },
  {
    question: "Can I resize my image while compressing it?",
    answer:
      "Yes. Use the max width and max height fields to resize your image during compression. The image will be scaled down proportionally to fit within the specified dimensions. If your image is already smaller than the max dimensions, it will not be enlarged.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ImageCompressorPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [compressedUrl, setCompressedUrl] = useState<string>("");
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState("");
  const [maxHeight, setMaxHeight] = useState("");
  const [outputFormat, setOutputFormat] = useState<"image/jpeg" | "image/png">("image/jpeg");
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = useCallback(
    (file: File, q: number, mw: string, mh: string, fmt: "image/jpeg" | "image/png") => {
      setProcessing(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          const maxW = parseInt(mw) || 0;
          const maxH = parseInt(mh) || 0;

          if (maxW > 0 && width > maxW) {
            height = Math.round((height * maxW) / width);
            width = maxW;
          }
          if (maxH > 0 && height > maxH) {
            width = Math.round((width * maxH) / height);
            height = maxH;
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            setProcessing(false);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                setCompressedUrl(url);
                setCompressedSize(blob.size);
              }
              setProcessing(false);
            },
            fmt,
            fmt === "image/jpeg" ? q / 100 : undefined
          );
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      setOriginalFile(file);
      setOriginalSize(file.size);
      setOriginalUrl(URL.createObjectURL(file));
      setShowComparison(false);
      compressImage(file, quality, maxWidth, maxHeight, outputFormat);
    },
    [quality, maxWidth, maxHeight, outputFormat, compressImage]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleRecompress = useCallback(() => {
    if (originalFile) {
      compressImage(originalFile, quality, maxWidth, maxHeight, outputFormat);
    }
  }, [originalFile, quality, maxWidth, maxHeight, outputFormat, compressImage]);

  const handleDownload = () => {
    if (!compressedUrl || !originalFile) return;
    const ext = outputFormat === "image/jpeg" ? "jpg" : "png";
    const name = originalFile.name.replace(/\.[^.]+$/, "") + `-compressed.${ext}`;
    const a = document.createElement("a");
    a.href = compressedUrl;
    a.download = name;
    a.click();
  };

  const savedPercent =
    originalSize > 0 && compressedSize > 0
      ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
      : 0;

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-[#0a0a0f] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Image{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Compressor
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Compress images instantly in your browser. No upload needed —
              everything runs locally on your device.
            </p>
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all mb-6 ${
              dragOver
                ? "border-[#7c6cf0] bg-[#7c6cf0]/10"
                : "border-[#1e1e2e] bg-[#12121a]/60 hover:border-[#7c6cf0]/40"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
            <svg
              className="w-12 h-12 mx-auto mb-4 text-[#7c6cf0]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <p className="text-[#c0c0d0] font-medium mb-1">
              Drag & drop an image here, or click to browse
            </p>
            <p className="text-sm text-[#8888a0]">
              Supports JPEG, PNG, and WebP
            </p>
          </div>

          {/* Settings */}
          {originalFile && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
              <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                Compression Settings
              </h2>

              {/* Quality Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm text-[#8888a0]">
                    Quality
                  </label>
                  <span className="text-lg font-bold text-[#7c6cf0]">
                    {quality}%
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #7c6cf0 ${quality}%, #1e1e2e ${quality}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-[#555566] mt-1">
                  <span>1%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Resize + Format */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Max Width (px)
                  </label>
                  <input
                    type="number"
                    value={maxWidth}
                    onChange={(e) => setMaxWidth(e.target.value)}
                    placeholder="Auto"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Max Height (px)
                  </label>
                  <input
                    type="number"
                    value={maxHeight}
                    onChange={(e) => setMaxHeight(e.target.value)}
                    placeholder="Auto"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Output Format
                  </label>
                  <select
                    value={outputFormat}
                    onChange={(e) =>
                      setOutputFormat(e.target.value as "image/jpeg" | "image/png")
                    }
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  >
                    <option value="image/jpeg">JPEG</option>
                    <option value="image/png">PNG</option>
                  </select>
                </div>
              </div>

              {/* Recompress Button */}
              <button
                onClick={handleRecompress}
                disabled={processing}
                className="w-full flex items-center justify-center gap-2 bg-[#7c6cf0] hover:bg-[#6b5ce0] text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-[#7c6cf0]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Compressing...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Recompress with New Settings
                  </>
                )}
              </button>
            </div>
          )}

          {/* Results */}
          {compressedUrl && originalFile && !processing && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
              <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                Compression Results
              </h2>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                    Original Size
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {formatFileSize(originalSize)}
                  </div>
                </div>
                <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                    Compressed Size
                  </div>
                  <div className="text-2xl font-bold text-[#00e676]">
                    {formatFileSize(compressedSize)}
                  </div>
                </div>
                <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                    Space Saved
                  </div>
                  <div
                    className={`text-2xl font-bold ${
                      savedPercent > 0 ? "text-[#00e676]" : "text-red-400"
                    }`}
                  >
                    {savedPercent > 0 ? `${savedPercent}%` : `+${Math.abs(savedPercent)}%`}
                  </div>
                </div>
              </div>

              {/* Savings Bar */}
              <div className="mb-6">
                <div className="w-full h-4 rounded-full bg-[#0a0a0f] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#7c6cf0] to-[#00e676] transition-all duration-500"
                    style={{
                      width: `${Math.max(0, Math.min(100, savedPercent))}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-[#555566]">0%</span>
                  <span className="text-[#00e676] font-semibold">
                    {savedPercent > 0 ? `${savedPercent}% smaller` : "No savings"}
                  </span>
                  <span className="text-[#555566]">100%</span>
                </div>
              </div>

              {/* Before/After Toggle */}
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#7c6cf0]/40 py-3 px-6 text-sm text-[#c0c0d0] font-medium transition-all mb-4"
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {showComparison ? "Hide" : "Show"} Before / After Comparison
              </button>

              {showComparison && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="rounded-xl border border-[#1e1e2e] overflow-hidden">
                    <div className="bg-[#0a0a0f] px-4 py-2 text-xs text-[#8888a0] font-medium">
                      Original ({formatFileSize(originalSize)})
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={originalUrl}
                      alt="Original"
                      className="w-full h-auto max-h-80 object-contain bg-[#0a0a0f]"
                    />
                  </div>
                  <div className="rounded-xl border border-[#1e1e2e] overflow-hidden">
                    <div className="bg-[#0a0a0f] px-4 py-2 text-xs text-[#00e676] font-medium">
                      Compressed ({formatFileSize(compressedSize)})
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={compressedUrl}
                      alt="Compressed"
                      className="w-full h-auto max-h-80 object-contain bg-[#0a0a0f]"
                    />
                  </div>
                </div>
              )}

              {/* Download */}
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 bg-[#00e676] hover:bg-[#66ffa6] text-[#0a0a0f] font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-[#00e676]/20"
              >
                <svg
                  className="w-5 h-5"
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
                Download Compressed Image
              </button>
            </div>
          )}

          {/* How It Works */}
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Upload Your Image",
                  description:
                    "Drag and drop an image onto the upload area, or click to browse your files. Supports JPEG, PNG, and WebP formats of any size.",
                },
                {
                  step: "2",
                  title: "Adjust Settings",
                  description:
                    "Set your desired quality level (1-100%), optional max dimensions for resizing, and choose your output format. Higher quality means larger files.",
                },
                {
                  step: "3",
                  title: "Download Result",
                  description:
                    "View the compression results with size comparison and before/after preview. Download your compressed image with one click. All processing is 100% local.",
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
                  title: "QR Code Generator",
                  description:
                    "Create custom QR codes for URLs, text, email, and WiFi.",
                  href: "/tools/qr-code-generator",
                },
                {
                  title: "Color Palette Generator",
                  description:
                    "Generate beautiful color palettes for your designs.",
                  href: "/tools/color-palette-generator",
                },
                {
                  title: "JSON Formatter",
                  description:
                    "Format, validate, and beautify JSON data instantly.",
                  href: "/tools/json-formatter",
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

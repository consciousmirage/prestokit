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
      <span className="text-[#f0f0f5]">Markdown to HTML</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Simple Markdown Parser                                             */
/* ------------------------------------------------------------------ */

function parseMarkdown(md: string): string {
  let html = md;

  // Escape HTML entities in code blocks first - we need to handle code blocks before everything
  // Store code blocks to prevent them from being processed
  const codeBlocks: string[] = [];
  const inlineCodeBlocks: string[] = [];

  // Fenced code blocks (``` ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, _lang, code) => {
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n$/, "");
    const idx = codeBlocks.length;
    codeBlocks.push(`<pre class="bg-[#0a0a0f] border border-[#1e1e2e] rounded-lg p-4 overflow-x-auto my-3"><code>${escaped}</code></pre>`);
    return `%%CODEBLOCK_${idx}%%`;
  });

  // Inline code (`...`)
  html = html.replace(/`([^`]+)`/g, (_match, code) => {
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const idx = inlineCodeBlocks.length;
    inlineCodeBlocks.push(`<code class="bg-[#1a1a26] text-[#f0c674] px-1.5 py-0.5 rounded text-sm">${escaped}</code>`);
    return `%%INLINECODE_${idx}%%`;
  });

  // Tables
  html = html.replace(
    /^(\|.+\|)\n(\|[\s:|-]+\|)\n((?:\|.+\|\n?)+)/gm,
    (_match, headerRow: string, _separator: string, bodyRows: string) => {
      const headers = headerRow
        .split("|")
        .filter((c: string) => c.trim() !== "")
        .map((c: string) => `<th class="border border-[#1e1e2e] px-3 py-2 text-left text-[#9d90f5]">${c.trim()}</th>`)
        .join("");
      const rows = bodyRows
        .trim()
        .split("\n")
        .map((row: string) => {
          const cells = row
            .split("|")
            .filter((c: string) => c.trim() !== "")
            .map((c: string) => `<td class="border border-[#1e1e2e] px-3 py-2">${c.trim()}</td>`)
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");
      return `<table class="w-full border-collapse border border-[#1e1e2e] my-3"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
    }
  );

  // Horizontal rules
  html = html.replace(/^(---|\*\*\*|___)$/gm, '<hr class="border-[#1e1e2e] my-6" />');

  // Headings (must be before bold processing)
  html = html.replace(/^###### (.+)$/gm, '<h6 class="text-sm font-bold text-white mt-4 mb-2">$1</h6>');
  html = html.replace(/^##### (.+)$/gm, '<h5 class="text-base font-bold text-white mt-4 mb-2">$1</h5>');
  html = html.replace(/^#### (.+)$/gm, '<h4 class="text-lg font-bold text-white mt-5 mb-2">$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-white mt-5 mb-3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-white mt-6 mb-3">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-white mt-6 mb-4">$1</h1>');

  // Blockquotes
  html = html.replace(
    /^> (.+)$/gm,
    '<blockquote class="border-l-4 border-[#7c6cf0] pl-4 py-1 my-3 text-[#a0a0b8] italic">$1</blockquote>'
  );

  // Images (before links to avoid conflict)
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="max-w-full rounded-lg my-3" />'
  );

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-[#7c6cf0] underline hover:text-[#9d90f5]">$1</a>'
  );

  // Bold + Italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/___(.+?)___/g, "<strong><em>$1</em></strong>");

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.+?)_/g, "<em>$1</em>");

  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, "<del>$1</del>");

  // Unordered lists
  html = html.replace(
    /^((?:[\t ]*[-*+] .+\n?)+)/gm,
    (block) => {
      const items = block
        .trim()
        .split("\n")
        .map((line) => {
          const content = line.replace(/^[\t ]*[-*+] /, "");
          return `<li class="ml-4 list-disc">${content}</li>`;
        })
        .join("");
      return `<ul class="my-3 space-y-1">${items}</ul>`;
    }
  );

  // Ordered lists
  html = html.replace(
    /^((?:[\t ]*\d+\. .+\n?)+)/gm,
    (block) => {
      const items = block
        .trim()
        .split("\n")
        .map((line) => {
          const content = line.replace(/^[\t ]*\d+\. /, "");
          return `<li class="ml-4 list-decimal">${content}</li>`;
        })
        .join("");
      return `<ol class="my-3 space-y-1">${items}</ol>`;
    }
  );

  // Paragraphs: wrap remaining lines that aren't already HTML tags
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<table") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<hr") ||
        trimmed.startsWith("<img") ||
        trimmed.startsWith("%%CODEBLOCK")
      ) {
        return trimmed;
      }
      return `<p class="my-2 leading-relaxed">${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");

  // Restore code blocks
  codeBlocks.forEach((block, i) => {
    html = html.replace(`%%CODEBLOCK_${i}%%`, block);
  });
  inlineCodeBlocks.forEach((block, i) => {
    html = html.replace(`%%INLINECODE_${i}%%`, block);
  });

  return html;
}

/* ------------------------------------------------------------------ */
/*  Strip Tailwind classes for raw HTML output                         */
/* ------------------------------------------------------------------ */

function stripClasses(html: string): string {
  return html.replace(/ class="[^"]*"/g, "");
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What Markdown syntax is supported?",
    answer:
      "This converter supports the most common Markdown features: headings (# through ######), bold (**text**), italic (*text*), strikethrough (~~text~~), links, images, fenced code blocks, inline code, ordered and unordered lists, blockquotes, horizontal rules, and tables.",
  },
  {
    question: "How does the live preview work?",
    answer:
      "As you type Markdown in the left panel, the right panel instantly renders the HTML output. The parser runs on every keystroke using JavaScript in your browser, so there is no delay or server communication.",
  },
  {
    question: "What is the difference between 'Copy HTML' and 'Copy Rendered'?",
    answer:
      "'Copy HTML' copies the raw HTML source code (the tags like <h1>, <p>, etc.) that you can paste into an HTML file or CMS. 'Copy Rendered' copies the visual text content without HTML tags, preserving the formatted appearance for pasting into documents.",
  },
  {
    question: "Does this use any external libraries?",
    answer:
      "No. The Markdown parser is implemented entirely in JavaScript within this page. It handles common cases without any external dependencies. For production use with edge cases, consider libraries like marked or remark.",
  },
  {
    question: "Is my content stored or sent to a server?",
    answer:
      "No. All conversion happens entirely in your browser. Your Markdown content is never transmitted to any server, never stored, and never logged. You can use this tool with complete confidence for any content.",
  },
  {
    question: "Can I use this for blog posts and documentation?",
    answer:
      "Absolutely! This is a great tool for previewing Markdown content before publishing. Write your blog post or documentation in Markdown, preview how it will look, then copy the HTML to paste into your CMS, website builder, or static site generator.",
  },
];

/* ------------------------------------------------------------------ */
/*  Default sample                                                     */
/* ------------------------------------------------------------------ */

const SAMPLE_MD = `# Hello World

This is a **Markdown to HTML** converter. It supports *italic*, **bold**, and ***bold italic*** text.

## Features

- Headings (h1 through h6)
- **Bold** and *italic* text
- [Links](https://example.com)
- Inline \`code\` and code blocks
- Lists (ordered and unordered)

### Code Block

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> This is a blockquote. Great for highlighting quotes or callouts.

### Table

| Feature | Supported |
| --- | --- |
| Headings | Yes |
| Bold/Italic | Yes |
| Tables | Yes |

---

1. First item
2. Second item
3. Third item

That's it! Start editing to see the live preview.`;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function MarkdownToHtmlPage() {
  const [markdown, setMarkdown] = useState(SAMPLE_MD);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedRendered, setCopiedRendered] = useState(false);

  const htmlOutput = useMemo(() => parseMarkdown(markdown), [markdown]);
  const rawHtml = useMemo(() => stripClasses(htmlOutput), [htmlOutput]);

  const handleCopyHtml = async () => {
    try {
      await navigator.clipboard.writeText(rawHtml);
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  const handleCopyRendered = async () => {
    // Copy the text content (stripped of tags)
    const tmp = document.createElement("div");
    tmp.innerHTML = htmlOutput;
    const text = tmp.textContent || tmp.innerText || "";
    try {
      await navigator.clipboard.writeText(text);
      setCopiedRendered(true);
      setTimeout(() => setCopiedRendered(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  const handleClear = () => {
    setMarkdown("");
    setCopiedHtml(false);
    setCopiedRendered(false);
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-[#0a0a0f] text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Markdown to{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                HTML
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Convert Markdown to HTML with a live preview. Supports headings,
              bold, italic, links, code blocks, tables, lists, and more.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <button
              onClick={handleCopyHtml}
              disabled={!markdown.trim()}
              className="bg-[#7c6cf0] hover:bg-[#6b5ce0] text-white font-medium text-sm rounded-xl px-5 py-2.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {copiedHtml ? "HTML Copied!" : "Copy HTML"}
            </button>
            <button
              onClick={handleCopyRendered}
              disabled={!markdown.trim()}
              className="border border-[#7c6cf0]/30 hover:border-[#7c6cf0] text-[#9d90f5] font-medium text-sm rounded-xl px-5 py-2.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {copiedRendered ? "Text Copied!" : "Copy Rendered"}
            </button>
            <button
              onClick={handleClear}
              disabled={!markdown}
              className="text-xs text-[#8888a0] hover:text-white border border-[#1e1e2e] hover:border-[#7c6cf0]/40 rounded-lg px-3 py-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed ml-auto"
            >
              Clear
            </button>
          </div>

          {/* Editor Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {/* Markdown Input */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
              <label className="text-sm font-medium text-[#c0c0d0] mb-3 block">
                Markdown
              </label>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Type your Markdown here..."
                rows={24}
                spellCheck={false}
                className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-4 text-white text-sm font-mono placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* HTML Preview */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
              <label className="text-sm font-medium text-[#c0c0d0] mb-3 block">
                Preview
              </label>
              <div
                className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-4 text-sm text-[#e0e0ea] overflow-auto leading-relaxed prose-invert"
                style={{ height: "calc(24 * 1.625rem + 2rem)", maxHeight: "calc(24 * 1.625rem + 2rem)" }}
                dangerouslySetInnerHTML={{ __html: htmlOutput }}
              />
            </div>
          </div>

          {/* Raw HTML Output */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-[#c0c0d0]">
                Raw HTML Source
              </label>
              <button
                onClick={handleCopyHtml}
                disabled={!markdown.trim()}
                className="text-xs text-[#7c6cf0] hover:text-[#9d90f5] border border-[#7c6cf0]/30 hover:border-[#7c6cf0] rounded-lg px-3 py-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {copiedHtml ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-4 text-sm font-mono text-[#8888a0] overflow-auto max-h-64">
              <pre className="whitespace-pre-wrap break-words">{rawHtml || "HTML source will appear here..."}</pre>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Write Markdown",
                  description:
                    "Type or paste Markdown into the left panel. Use standard syntax: # for headings, ** for bold, * for italic, - for lists, and more.",
                },
                {
                  step: "2",
                  title: "See Live Preview",
                  description:
                    "The right panel instantly renders your Markdown as formatted HTML. The preview updates on every keystroke with zero delay.",
                },
                {
                  step: "3",
                  title: "Copy the Output",
                  description:
                    "Click 'Copy HTML' to grab the raw HTML source code, or 'Copy Rendered' to copy the plain text. View the source in the panel below.",
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
                  title: "JSON Formatter",
                  description:
                    "Format, validate, and minify JSON with syntax highlighting.",
                  href: "/tools/json-formatter",
                },
                {
                  title: "Word Counter",
                  description:
                    "Count words, characters, sentences, and paragraphs instantly.",
                  href: "/tools/word-counter",
                },
                {
                  title: "Text Case Converter",
                  description:
                    "Convert text between UPPERCASE, camelCase, snake_case, and more.",
                  href: "/tools/text-case-converter",
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

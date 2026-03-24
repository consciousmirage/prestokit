import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Color Contrast Checker | WCAG Accessibility Checker - PrestoKit",
  description:
    "Check color contrast ratios for WCAG 2.1 compliance. Test foreground and background colors for AA and AAA accessibility levels. Free online color contrast checker — no signup required.",
  keywords: [
    "color contrast checker",
    "wcag contrast",
    "accessibility color checker",
    "contrast ratio calculator",
    "wcag 2.1 contrast",
    "color accessibility",
    "aa contrast checker",
    "aaa contrast checker",
    "web accessibility",
    "ada color contrast",
    "color contrast tool",
    "accessible color combinations",
  ],
  openGraph: {
    title: "Free Color Contrast Checker | WCAG Accessibility Checker - PrestoKit",
    description:
      "Check color contrast ratios for WCAG 2.1 AA and AAA compliance. Live preview and pass/fail indicators. Free, no signup.",
    url: "https://prestokit.com/tools/color-contrast-checker",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/color-contrast-checker",
  },
};

export default function ColorContrastCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Typing Speed Test | Check Your WPM & Accuracy - PrestoKit",
  description:
    "Test your typing speed with this free online typing test. Measure your words per minute (WPM), accuracy percentage, and track your improvement over time. No signup required.",
  keywords: [
    "typing speed test",
    "typing test",
    "wpm test",
    "words per minute test",
    "typing speed checker",
    "free typing test",
    "typing practice",
    "keyboard speed test",
    "typing accuracy test",
    "online typing test",
    "how fast can I type",
    "typing speed calculator",
  ],
  openGraph: {
    title: "Free Typing Speed Test | Check Your WPM & Accuracy - PrestoKit",
    description:
      "Test your typing speed and accuracy with this free online WPM test. See real-time words per minute and accuracy stats. No signup required.",
    url: "https://prestokit.com/tools/typing-speed-test",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/typing-speed-test",
  },
};

export default function TypingSpeedTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Pomodoro Timer | Focus Timer & Productivity Tool - PrestoKit",
  description:
    "Boost your productivity with this free online Pomodoro timer. 25-minute work sessions, 5-minute breaks, session tracking, custom intervals, and audio notifications. No signup required.",
  keywords: [
    "pomodoro timer",
    "pomodoro technique",
    "focus timer",
    "productivity timer",
    "work timer",
    "study timer",
    "25 minute timer",
    "pomodoro online",
    "free pomodoro timer",
    "pomodoro clock",
    "concentration timer",
    "time management tool",
  ],
  openGraph: {
    title: "Free Pomodoro Timer | Focus Timer & Productivity Tool - PrestoKit",
    description:
      "Boost your focus with a free Pomodoro timer. 25-minute work sessions, 5-minute breaks, session tracking, and audio alerts. No signup required.",
    url: "https://prestokit.com/tools/pomodoro-timer",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/pomodoro-timer",
  },
};

export default function PomodoroTimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

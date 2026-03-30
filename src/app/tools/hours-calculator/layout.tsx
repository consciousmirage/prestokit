import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Hours Calculator | Time Duration Between Two Times - PrestoKit",
  description:
    "Calculate the number of hours and minutes between any two times. Add multiple time ranges for a running total. Get results in hours and minutes and decimal hours. Free, no signup.",
  keywords: [
    "hours calculator",
    "time duration calculator",
    "how many hours between two times",
    "time calculator",
    "hours and minutes calculator",
    "time difference calculator",
    "work hours calculator",
    "elapsed time calculator",
    "calculate time between times",
    "free hours calculator",
  ],
  openGraph: {
    title: "Free Hours Calculator | Time Duration Between Two Times - PrestoKit",
    description:
      "Add start and end times to calculate total hours and minutes. Supports multiple time ranges, AM/PM, and decimal output. Free, no signup.",
    url: "https://prestokit.com/tools/hours-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/hours-calculator",
  },
};

export default function HoursCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

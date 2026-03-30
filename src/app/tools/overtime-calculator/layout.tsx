import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Overtime Calculator | Time and a Half Pay Calculator - PrestoKit",
  description:
    "Calculate overtime pay instantly. Enter your hourly rate, regular hours, and overtime hours to see regular pay, overtime pay, total weekly pay, and effective hourly rate. Free, no signup.",
  keywords: [
    "overtime calculator",
    "overtime pay calculator",
    "time and a half calculator",
    "overtime hours calculator",
    "overtime pay rate",
    "double time calculator",
    "weekly pay calculator",
    "FLSA overtime calculator",
    "overtime wage calculator",
    "free overtime calculator",
  ],
  openGraph: {
    title: "Free Overtime Calculator | Time and a Half Pay - PrestoKit",
    description:
      "Calculate overtime pay with time and a half or double time. See regular pay, overtime pay, total weekly pay, and annual equivalent. Free, no signup.",
    url: "https://prestokit.com/tools/overtime-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/overtime-calculator",
  },
};

export default function OvertimeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

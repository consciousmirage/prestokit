import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Time Card Calculator | Weekly Timesheet & Overtime Calculator - PrestoKit",
  description:
    "Calculate hours worked per day and total weekly hours with this free time card calculator. Track regular and overtime hours, enter your hourly rate for gross pay. No signup required.",
  keywords: [
    "time card calculator",
    "hours worked calculator",
    "timesheet calculator",
    "weekly hours calculator",
    "work hours calculator",
    "overtime hours calculator",
    "time card hours",
    "payroll hours calculator",
    "employee time tracker",
    "free timesheet calculator",
  ],
  openGraph: {
    title: "Free Time Card Calculator | Weekly Timesheet & Overtime - PrestoKit",
    description:
      "Track hours worked per day, calculate weekly totals, regular vs. overtime hours, and gross pay. Free, no signup.",
    url: "https://prestokit.com/tools/time-card-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/time-card-calculator",
  },
};

export default function TimeCardCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hourly to Salary Calculator | Convert Hourly Rate to Annual Salary - PrestoKit",
  description:
    "Convert your hourly rate to annual salary instantly. See your yearly, monthly, biweekly, and weekly pay. Adjust hours per week and weeks per year for accurate results. Free hourly to salary calculator — no signup required.",
  keywords: [
    "hourly to salary calculator",
    "convert hourly rate to annual salary",
    "hourly to annual salary",
    "hourly wage to yearly salary",
    "salary converter",
    "hourly rate calculator",
    "annual salary from hourly",
    "how much is my hourly rate per year",
    "hourly pay to salary",
    "wage calculator",
    "pay rate converter",
    "hourly to yearly calculator",
  ],
  openGraph: {
    title: "Hourly to Salary Calculator | Convert Hourly Rate to Annual Salary - PrestoKit",
    description:
      "Convert hourly rate to annual salary. See yearly, monthly, biweekly, and weekly pay breakdowns. Free, no signup.",
    url: "https://prestokit.com/tools/hourly-to-salary",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/hourly-to-salary",
  },
};

export default function HourlyToSalaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

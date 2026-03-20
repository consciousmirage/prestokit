import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Pay Stub Creator — Generate Pay Stubs Online | PrestoKit",
  description:
    "Create professional pay stubs for free online. Add employer and employee details, earnings, deductions, and YTD totals. Download as PDF instantly. No sign-up required. 100% browser-based.",
  keywords: [
    "pay stub creator",
    "free pay stub generator",
    "online pay stub maker",
    "check stub creator",
    "payroll stub generator",
    "pay stub template",
    "employee pay stub",
    "pay stub PDF download",
    "paycheck stub maker",
    "self-employed pay stub",
  ],
  openGraph: {
    title: "Free Pay Stub Creator | PrestoKit",
    description:
      "Create professional pay stubs for free. Fill in earnings and deductions, download a PDF instantly. No sign-up required.",
    url: "https://prestokit.com/tools/pay-stub-creator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/pay-stub-creator",
  },
};

export default function PayStubCreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free BMI Calculator | Calculate Body Mass Index Online - PrestoKit",
  description:
    "Calculate your Body Mass Index (BMI) instantly with our free online calculator. Supports imperial and metric units. View your BMI category, healthy weight range, and visual scale. No signup required.",
  keywords: [
    "bmi calculator",
    "body mass index calculator",
    "bmi chart",
    "calculate bmi",
    "bmi scale",
    "healthy weight calculator",
    "weight calculator",
    "bmi checker",
    "free bmi calculator",
    "online bmi calculator",
  ],
  openGraph: {
    title: "Free BMI Calculator | Body Mass Index - PrestoKit",
    description:
      "Calculate your BMI instantly. View your category, healthy weight range, and visual scale. Imperial and metric supported. Free, no signup.",
    url: "https://prestokit.com/tools/bmi-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/bmi-calculator",
  },
};

export default function BMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

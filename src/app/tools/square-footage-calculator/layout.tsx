import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Square Footage Calculator | Area Calculator - PrestoKit",
  description:
    "Calculate square footage for any shape — rectangle, triangle, circle, or trapezoid. Convert between sq ft, sq meters, acres, and sq yards. Free online area calculator — no signup required.",
  keywords: [
    "square footage calculator",
    "area calculator",
    "sq ft calculator",
    "calculate square footage",
    "room size calculator",
    "floor area calculator",
    "square feet calculator",
    "area of rectangle",
    "area of circle",
    "area of triangle",
    "area of trapezoid",
    "square meters to square feet",
  ],
  openGraph: {
    title: "Free Square Footage Calculator | Area Calculator - PrestoKit",
    description:
      "Calculate area for any shape and convert between sq ft, sq meters, acres, and more. Free, no signup.",
    url: "https://prestokit.com/tools/square-footage-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/square-footage-calculator",
  },
};

export default function SquareFootageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

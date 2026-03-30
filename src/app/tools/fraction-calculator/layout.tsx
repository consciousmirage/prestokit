import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Fraction Calculator — Add, Subtract, Multiply & Divide Fractions | PrestoKit",
  description:
    "Add, subtract, multiply, and divide fractions instantly. See step-by-step solutions, simplified results, and decimal equivalents. Also simplify fractions and convert decimals to fractions. Free, no sign-up.",
  keywords: [
    "fraction calculator",
    "adding fractions calculator",
    "how to add fractions",
    "fraction simplifier",
    "dividing fractions calculator",
    "subtracting fractions",
    "multiplying fractions",
    "mixed number calculator",
    "decimal to fraction",
    "simplify fractions",
    "fraction math",
    "fractions calculator with steps",
  ],
  openGraph: {
    title: "Free Fraction Calculator — Add, Subtract, Multiply & Divide | PrestoKit",
    description:
      "Calculate fractions with step-by-step solutions. Add, subtract, multiply, divide, simplify, and convert. Free, no sign-up required.",
    url: "https://prestokit.com/tools/fraction-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/fraction-calculator",
  },
};

export default function FractionCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

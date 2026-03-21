import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Tip Calculator | Calculate Tips & Split Bills - PrestoKit",
  description:
    "Calculate tips and split bills instantly. Adjust tip percentage, split between multiple people, and round up. Free online tip calculator with visual breakdown.",
  keywords: [
    "tip calculator",
    "calculate tip",
    "bill splitter",
    "split bill calculator",
    "restaurant tip calculator",
    "gratuity calculator",
    "tip percentage calculator",
    "free tip calculator",
    "how much to tip",
    "tip split calculator",
  ],
  openGraph: {
    title: "Free Tip Calculator | Calculate Tips & Split Bills - PrestoKit",
    description:
      "Calculate tips and split bills instantly. Adjust percentages, split between people, and round up. Free, no signup.",
    type: "website",
    url: "https://prestokit.com/tools/tip-calculator",
  },
};

export default function TipCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

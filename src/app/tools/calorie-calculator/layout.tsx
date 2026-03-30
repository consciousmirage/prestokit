import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Calorie Calculator — TDEE, BMR & Daily Calorie Needs | PrestoKit",
  description:
    "Calculate your daily calorie needs using the Mifflin-St Jeor formula. Get your BMR, TDEE, and calorie targets for weight loss, maintenance, and weight gain. Includes macro breakdown. Free, no sign-up.",
  keywords: [
    "calorie calculator",
    "TDEE calculator",
    "how many calories should I eat",
    "calorie deficit calculator",
    "maintenance calories",
    "BMR calculator",
    "Mifflin-St Jeor",
    "daily calorie needs",
    "weight loss calories",
    "macro calculator",
    "calorie intake calculator",
    "how to calculate TDEE",
  ],
  openGraph: {
    title: "Free Calorie Calculator — TDEE & Daily Calorie Needs | PrestoKit",
    description:
      "Calculate BMR and TDEE with the Mifflin-St Jeor formula. Get calorie targets for weight loss, maintenance, and gain. Free, no sign-up.",
    url: "https://prestokit.com/tools/calorie-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/calorie-calculator",
  },
};

export default function CalorieCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

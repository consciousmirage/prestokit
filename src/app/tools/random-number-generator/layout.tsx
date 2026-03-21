import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Random Number Generator | Dice Roller, Coin Flip & More - PrestoKit",
  description:
    "Generate random numbers, roll dice, flip coins, and pick random items from a list. Multiple modes: number generator, random list, dice roller, coin flipper, and random picker. Free online randomizer tool.",
  keywords: [
    "random number generator",
    "dice roller",
    "coin flip",
    "random picker",
    "random number",
    "rng",
    "random list generator",
    "giveaway picker",
    "random selector",
    "free random number generator",
  ],
  openGraph: {
    title: "Free Random Number Generator | Dice, Coins & More - PrestoKit",
    description:
      "Generate random numbers, roll dice, flip coins, and pick random items from lists. Multiple modes with history. Free, no signup.",
    url: "https://prestokit.com/tools/random-number-generator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/random-number-generator",
  },
};

export default function RandomNumberGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

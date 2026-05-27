import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Sale Net Proceeds Calculator — Free | PrestoKit",
  description:
    "Calculate exactly how much you'll walk away with after selling your home. Includes agent commissions, closing costs, mortgage payoff, and repairs.",
  keywords: [
    "home sale net proceeds calculator",
    "how much will I make selling my house",
    "home sale profit calculator",
    "seller net proceeds",
    "what will I net from home sale",
  ],
  openGraph: {
    title: "Home Sale Net Proceeds Calculator — Free | PrestoKit",
    description:
      "Calculate exactly how much you'll walk away with after selling your home. Includes agent commissions, closing costs, mortgage payoff, and repairs.",
    type: "website",
    url: "https://prestokit.com/tools/home-sale-net-proceeds-calculator",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/home-sale-net-proceeds-calculator",
  },
};

export default function HomeSaleNetProceedsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cap Rate Calculator — Free | PrestoKit",
  description:
    "Calculate capitalization rate for rental properties. Enter property value and net operating income to find cap rate, gross yield, and cash-on-cash return.",
  keywords: [
    "cap rate calculator",
    "capitalization rate calculator",
    "rental property calculator",
    "investment property calculator",
    "NOI calculator",
    "real estate investment calculator",
  ],
  openGraph: {
    title: "Cap Rate Calculator — Free | PrestoKit",
    description:
      "Calculate capitalization rate for rental properties. Enter property value and net operating income to find cap rate, gross yield, and cash-on-cash return.",
    type: "website",
    url: "https://prestokit.com/tools/cap-rate-calculator",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/cap-rate-calculator",
  },
};

export default function CapRateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

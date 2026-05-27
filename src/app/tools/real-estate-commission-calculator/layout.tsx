import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Commission Calculator — Free | PrestoKit",
  description:
    "Calculate real estate agent commission and net proceeds instantly. Enter sale price and commission rate to see agent split, buyer's agent cut, and seller net.",
  keywords: [
    "real estate commission calculator",
    "realtor commission calculator",
    "agent commission calculator",
    "home sale commission",
    "real estate agent fee calculator",
  ],
  openGraph: {
    title: "Real Estate Commission Calculator — Free | PrestoKit",
    description:
      "Calculate real estate agent commission and net proceeds instantly. Enter sale price and commission rate to see agent split, buyer's agent cut, and seller net.",
    type: "website",
    url: "https://prestokit.com/tools/real-estate-commission-calculator",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/real-estate-commission-calculator",
  },
};

export default function RealEstateCommissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

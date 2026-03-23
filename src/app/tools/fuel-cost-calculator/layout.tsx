import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Fuel Cost Calculator | Gas Trip Cost Estimator - PrestoKit",
  description:
    "Calculate gas cost for any trip by distance, fuel efficiency (MPG), and gas price. Estimate road trip fuel expenses instantly. Free fuel cost calculator — no signup required.",
  keywords: [
    "fuel cost calculator",
    "gas cost calculator",
    "trip fuel cost",
    "gas trip calculator",
    "road trip gas cost",
    "fuel estimator",
    "mpg calculator",
    "gas mileage calculator",
    "driving cost calculator",
    "fuel expense calculator",
    "how much gas for a trip",
    "free fuel calculator",
  ],
  openGraph: {
    title: "Free Fuel Cost Calculator | Gas Trip Cost Estimator - PrestoKit",
    description:
      "Calculate gas cost for any trip by distance and MPG. Free, no signup.",
    url: "https://prestokit.com/tools/fuel-cost-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/fuel-cost-calculator",
  },
};

export default function FuelCostCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

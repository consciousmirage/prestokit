import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Electricity Cost Calculator | Power Consumption Calculator - PrestoKit",
  description:
    "Calculate how much electricity your appliances cost to run daily, monthly, and yearly. Compare multiple appliances and find energy savings. Free online electricity cost calculator — no signup required.",
  keywords: [
    "electricity cost calculator",
    "electric bill calculator",
    "power consumption calculator",
    "energy cost calculator",
    "wattage calculator",
    "appliance energy cost",
    "electricity usage calculator",
    "kWh calculator",
    "how much does it cost to run",
    "energy bill estimator",
    "electric cost per month",
    "power cost calculator",
  ],
  openGraph: {
    title: "Free Electricity Cost Calculator | Power Consumption Calculator - PrestoKit",
    description:
      "Calculate appliance electricity costs daily, monthly, and yearly. Compare multiple devices. Free, no signup.",
    url: "https://prestokit.com/tools/electricity-cost-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/electricity-cost-calculator",
  },
};

export default function ElectricityCostCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

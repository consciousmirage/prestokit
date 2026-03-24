import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Currency Converter | Exchange Rate Calculator - PrestoKit",
  description:
    "Convert between 15+ major world currencies instantly. Free online currency converter with approximate exchange rates for USD, EUR, GBP, JPY, CAD, AUD, and more. No signup required.",
  keywords: [
    "currency converter",
    "exchange rate calculator",
    "currency exchange",
    "convert currency",
    "USD to EUR",
    "EUR to USD",
    "money converter",
    "foreign exchange calculator",
    "forex calculator",
    "currency calculator",
    "exchange rate",
    "free currency converter",
  ],
  openGraph: {
    title: "Free Currency Converter | Exchange Rate Calculator - PrestoKit",
    description:
      "Convert between 15+ major currencies instantly. Free online exchange rate calculator — no signup required.",
    url: "https://prestokit.com/tools/currency-converter",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/currency-converter",
  },
};

export default function CurrencyConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

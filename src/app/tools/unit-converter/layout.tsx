import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Unit Converter | Convert Length, Weight, Temperature & More - PrestoKit",
  description:
    "Convert between units instantly. Length, weight, temperature, volume, area, speed, data, and time conversions. Free online unit converter with real-time results.",
  keywords: [
    "unit converter",
    "convert units online",
    "length converter",
    "weight converter",
    "temperature converter",
    "volume converter",
    "area converter",
    "speed converter",
    "data converter",
    "free unit converter",
  ],
  openGraph: {
    title: "Free Unit Converter | Convert Length, Weight, Temperature & More - PrestoKit",
    description:
      "Convert between units instantly across 8 categories. Length, weight, temperature, volume, area, speed, data, and time. Free, no signup.",
    type: "website",
    url: "https://prestokit.com/tools/unit-converter",
  },
};

export default function UnitConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

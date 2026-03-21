import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Time Zone Converter | Convert Times Between Zones - PrestoKit",
  description:
    "Convert times between time zones instantly. Compare up to 4 time zones at once. Supports all major zones including EST, PST, GMT, CET, JST, IST, and more. Free online time zone converter with daylight saving time support.",
  keywords: [
    "time zone converter",
    "timezone converter",
    "convert time zones",
    "time zone calculator",
    "EST to PST converter",
    "world clock converter",
    "time difference calculator",
    "international time converter",
    "GMT converter",
    "free time zone tool",
  ],
  openGraph: {
    title: "Free Time Zone Converter | Compare Times Across Zones - PrestoKit",
    description:
      "Convert times between time zones instantly. Compare up to 4 zones at once. All major time zones supported. Free, no signup.",
    type: "website",
    url: "https://prestokit.com/tools/timezone-converter",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/timezone-converter",
  },
};

export default function TimezoneConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

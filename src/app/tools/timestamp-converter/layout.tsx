import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Unix Timestamp Converter | Epoch to Date - PrestoKit",
  description:
    "Convert Unix timestamps to human-readable dates and vice versa. Free online epoch converter with multiple date formats, current timestamp display, and real-time conversion. No signup required.",
  keywords: [
    "unix timestamp converter",
    "epoch converter",
    "timestamp to date",
    "date to timestamp",
    "unix time converter",
    "epoch time converter",
    "unix timestamp to date",
    "date to unix timestamp",
    "epoch to human readable",
    "current unix timestamp",
    "timestamp calculator",
    "posix time converter",
  ],
  openGraph: {
    title: "Free Unix Timestamp Converter | Epoch to Date - PrestoKit",
    description:
      "Convert Unix timestamps to human-readable dates and vice versa. Free online epoch converter — no signup required.",
    url: "https://prestokit.com/tools/timestamp-converter",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/timestamp-converter",
  },
};

export default function TimestampConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

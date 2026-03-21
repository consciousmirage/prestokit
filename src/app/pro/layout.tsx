import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PrestoKit Pro — Premium Tools & Templates for $9/mo",
  description:
    "Upgrade to PrestoKit Pro for premium downloadable templates, exclusive tools, AI-powered features, and an ad-free experience. Cancel anytime.",
  openGraph: {
    title: "PrestoKit Pro — Premium Tools & Templates for $9/mo",
    description:
      "Upgrade to PrestoKit Pro for premium downloadable templates, exclusive tools, AI-powered features, and an ad-free experience. Cancel anytime.",
    url: "https://prestokit.com/pro",
    siteName: "PrestoKit",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PrestoKit Pro — Premium Tools & Templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PrestoKit Pro — Premium Tools & Templates for $9/mo",
    description:
      "Upgrade to PrestoKit Pro for premium downloadable templates, exclusive tools, and AI-powered features. Cancel anytime.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://prestokit.com/pro",
  },
};

export default function ProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

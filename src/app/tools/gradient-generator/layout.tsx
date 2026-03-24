import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free CSS Gradient Generator | Gradient Maker Online - PrestoKit",
  description:
    "Create beautiful CSS gradients with a visual editor. Generate linear and radial gradients with custom colors, directions, and angles. Copy ready-to-use CSS code. Free online gradient maker.",
  keywords: [
    "css gradient generator",
    "gradient maker",
    "css background gradient",
    "linear gradient generator",
    "radial gradient generator",
    "css gradient tool",
    "gradient creator",
    "css color gradient",
    "gradient css code",
    "background gradient maker",
    "web gradient generator",
    "gradient picker",
  ],
  openGraph: {
    title: "Free CSS Gradient Generator | Gradient Maker Online - PrestoKit",
    description:
      "Create beautiful CSS gradients with a visual editor. Generate linear and radial gradients and copy ready-to-use CSS code. Free, no signup.",
    url: "https://prestokit.com/tools/gradient-generator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/gradient-generator",
  },
};

export default function GradientGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

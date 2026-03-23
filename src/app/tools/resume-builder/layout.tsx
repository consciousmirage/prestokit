import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Resume Builder | Online CV Maker - PrestoKit",
  description:
    "Build a professional resume online for free. Fill in your details and get a clean, formatted resume with live preview. Free online resume builder — no signup required.",
  keywords: [
    "resume builder",
    "free resume builder",
    "online resume maker",
    "cv builder",
    "cv maker",
    "resume creator",
    "resume generator",
    "free cv builder",
    "professional resume",
    "resume template",
    "build resume online",
    "resume maker free",
  ],
  openGraph: {
    title: "Free Resume Builder | Online CV Maker - PrestoKit",
    description:
      "Build a professional resume online for free. Fill in your details and get a clean, formatted resume. No signup required.",
    url: "https://prestokit.com/tools/resume-builder",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/resume-builder",
  },
};

export default function ResumeBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

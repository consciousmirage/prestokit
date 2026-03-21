import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Business Resources & Digital Products",
  description:
    "Download free business resources — ChatGPT prompt packs, email templates, launch checklists, pricing calculators, and social media planners. No signup required.",
  keywords: [
    "free business resources",
    "free digital products",
    "chatgpt prompts business",
    "email templates bundle",
    "business launch checklist",
    "freelancer pricing calculator",
    "social media content planner",
    "free downloads",
    "small business tools",
  ],
  openGraph: {
    title: "Free Business Resources & Digital Products | PrestoKit",
    description:
      "Download free business resources — prompt packs, email templates, checklists, and more. No signup required.",
    url: "https://prestokit.com/products",
  },
  alternates: {
    canonical: "https://prestokit.com/products",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

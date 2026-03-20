import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Password Generator | Create Strong Secure Passwords - PrestoKit",
  description:
    "Generate strong, secure random passwords instantly. Customize length, include uppercase, lowercase, numbers, and special characters. Free online password generator with strength indicator.",
  keywords: [
    "password generator",
    "random password generator",
    "strong password generator",
    "secure password generator",
    "free password generator",
    "online password generator",
    "password creator",
    "generate strong password",
    "random password maker",
    "complex password generator",
  ],
  openGraph: {
    title: "Free Password Generator | Create Strong Secure Passwords - PrestoKit",
    description:
      "Generate strong, secure random passwords instantly. Customize length and character types. Free, no signup required.",
    type: "website",
    url: "https://prestokit.com/tools/password-generator",
  },
};

export default function PasswordGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

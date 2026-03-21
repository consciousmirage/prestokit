import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Account | PrestoKit",
  description:
    "Manage your PrestoKit Pro subscription, update payment methods, view invoices, and access premium content.",
  robots: { index: false, follow: false },
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

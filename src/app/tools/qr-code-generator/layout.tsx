import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free QR Code Generator | Create Custom QR Codes Online - PrestoKit",
  description:
    "Generate free QR codes for URLs, text, email, phone numbers, and WiFi. Customize colors, choose sizes, and download as PNG. No signup required.",
  keywords: [
    "free QR code generator",
    "QR code maker",
    "create QR code online",
    "custom QR code",
    "QR code for URL",
    "WiFi QR code generator",
    "QR code download PNG",
    "QR code creator",
    "QR code for business",
    "QR code no signup",
  ],
  openGraph: {
    title: "Free QR Code Generator | Create Custom QR Codes Online - PrestoKit",
    description:
      "Generate free QR codes for URLs, text, email, phone, and WiFi. Customize colors and download as PNG instantly.",
    type: "website",
    url: "https://prestokit.com/tools/qr-code-generator",
  },
};

export default function QRCodeGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Image Compressor | Compress JPEG & PNG Online - PrestoKit",
  description:
    "Compress images instantly in your browser. Reduce JPEG and PNG file sizes with adjustable quality. No upload needed — everything runs locally. Free online image compressor.",
  keywords: [
    "image compressor",
    "compress image online",
    "jpeg compressor",
    "png compressor",
    "reduce image size",
    "image optimizer",
    "compress photo online",
    "free image compressor",
    "browser image compression",
    "resize image online",
  ],
  openGraph: {
    title: "Free Image Compressor | Compress JPEG & PNG Online - PrestoKit",
    description:
      "Compress images instantly in your browser. Reduce JPEG and PNG file sizes with adjustable quality. No upload — 100% client-side.",
    type: "website",
    url: "https://prestokit.com/tools/image-compressor",
  },
};

export default function ImageCompressorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

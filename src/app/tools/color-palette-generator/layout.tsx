import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Color Palette Generator - Create Beautiful Color Schemes - PrestoKit",
  description:
    "Generate beautiful, harmonious color palettes for your designs. Choose from complementary, analogous, triadic, and monochromatic color harmonies. Export as CSS variables. Free online tool.",
  keywords: [
    "color palette generator",
    "color scheme generator",
    "color harmony tool",
    "complementary colors",
    "analogous colors",
    "triadic colors",
    "monochromatic palette",
    "CSS color variables",
    "hex color palette",
    "design color tool",
    "random color palette",
    "color picker",
  ],
  openGraph: {
    title: "Free Color Palette Generator - PrestoKit",
    description:
      "Generate beautiful color palettes with harmony modes. Export as CSS variables. Free, instant, no signup.",
    type: "website",
    url: "https://prestokit.com/tools/color-palette-generator",
  },
};

export default function ColorPaletteGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

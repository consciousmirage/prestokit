import { MetadataRoute } from "next";

const BASE_URL = "https://prestokit.com";

const guidePages = [
  "/guides",
  "/guides/how-to-create-invoice",
  "/guides/how-to-start-business",
  "/guides/freelancing-guide",
  "/guides/qr-code-guide",
];

const toolPages = [
  "/tools/invoice-generator",
  "/tools/qr-code-generator",
  "/tools/email-signature-creator",
  "/tools/business-name-generator",
  "/tools/profit-margin-calculator",
  "/tools/receipt-maker",
  "/tools/estimate-builder",
  "/tools/pay-stub-creator",
  "/tools/password-generator",
  "/tools/word-counter",
  "/tools/lorem-ipsum-generator",
  "/tools/percentage-calculator",
  "/tools/text-case-converter",
  "/tools/color-palette-generator",
  "/tools/json-formatter",
  "/tools/markdown-to-html",
  "/tools/image-compressor",
  "/tools/unit-converter",
  "/tools/tip-calculator",
  "/tools/date-calculator",
  "/tools/mortgage-calculator",
  "/tools/bmi-calculator",
  "/tools/salary-calculator",
  "/tools/random-number-generator",
  "/tools/invoice-templates",
  "/tools/contract-generator",
  "/tools/timezone-converter",
  "/tools/roi-calculator",
  "/tools/tax-calculator",
  "/tools/compound-interest-calculator",
  "/tools/paycheck-calculator",
  "/tools/business-card-generator",
  "/tools/privacy-policy-generator",
  "/tools/age-calculator",
  "/tools/gpa-calculator",
  "/tools/discount-calculator",
  "/tools/loan-calculator",
  "/tools/character-counter",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const home: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  const tools: MetadataRoute.Sitemap = toolPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const guides: MetadataRoute.Sitemap = guidePages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...home, ...tools, ...guides];
}

import { MetadataRoute } from "next";

const BASE_URL = "https://prestokit.com";

const toolPages = [
  "/tools/invoice-generator",
  "/tools/qr-code-generator",
  "/tools/email-signature-creator",
  "/tools/business-name-generator",
  "/tools/profit-margin-calculator",
  "/tools/receipt-maker",
  "/tools/estimate-builder",
  "/tools/pay-stub-creator",
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

  return [...home, ...tools];
}

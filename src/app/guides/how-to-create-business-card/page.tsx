import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Create a Business Card (Design Tips & Free Tool)",
  description:
    "Learn how to design a professional business card that makes a lasting impression. Covers layout, typography, essential information, and printing tips with a free business card generator.",
  keywords: [
    "how to create a business card",
    "business card design",
    "business card template",
    "business card generator",
    "professional business card",
    "business card layout",
    "business card printing",
    "design a business card",
    "free business card maker",
    "business card tips",
  ],
  openGraph: {
    title: "How to Create a Business Card (Design Tips & Free Tool)",
    description:
      "Complete guide to designing a professional business card. Covers layout, typography, content, and printing.",
    type: "article",
    url: "https://prestokit.com/guides/how-to-create-business-card",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Create a Business Card | PrestoKit",
    description:
      "Design a professional business card that makes a lasting impression. Free design tips and tools.",
  },
  alternates: {
    canonical: "https://prestokit.com/guides/how-to-create-business-card",
  },
};

const tocItems = [
  { id: "why-business-cards-matter", label: "Why Business Cards Still Matter" },
  { id: "essential-information", label: "Essential Information to Include" },
  { id: "design-principles", label: "Design Principles That Work" },
  { id: "typography-and-color", label: "Typography and Color Choices" },
  { id: "step-by-step", label: "Step-by-Step: Designing Your Card" },
  { id: "printing-tips", label: "Printing Tips and Paper Stock" },
  { id: "common-mistakes", label: "Common Business Card Mistakes" },
  { id: "tools", label: "Create Your Business Card Now" },
];

export default function HowToCreateBusinessCardPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Create a Business Card (Design Tips & Free Tool)",
    description:
      "Learn how to design a professional business card that makes a lasting impression. Covers layout, typography, essential information, and printing tips.",
    author: { "@type": "Organization", name: "PrestoKit" },
    publisher: { "@type": "Organization", name: "PrestoKit", url: "https://prestokit.com" },
    datePublished: "2026-03-22",
    dateModified: "2026-03-22",
    mainEntityOfPage: "https://prestokit.com/guides/how-to-create-business-card",
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="relative border-b border-brand-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow"
        />
        <div className="mx-auto max-w-[720px] px-6 pb-10 pt-12 sm:pt-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-white">
              PrestoKit
            </Link>
            <span className="text-muted-dark">/</span>
            <Link href="/guides" className="transition-colors hover:text-white">
              Guides
            </Link>
            <span className="text-muted-dark">/</span>
            <span className="text-muted-light">Business Cards</span>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            How to Create a Professional Business Card
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-light">
            A well-designed business card is one of the most cost-effective marketing tools you can have. This guide covers everything from what information to include to design principles, typography, and printing, so your card makes the right impression every time.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span>By PrestoKit Team</span>
            <span className="text-muted-dark">|</span>
            <span>Last updated: March 2026</span>
            <span className="text-muted-dark">|</span>
            <span>9 min read</span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="mx-auto max-w-[720px] px-6 py-12">
        <nav className="mb-12 rounded-2xl border border-brand-border bg-brand-card/40 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-dark">
            Table of Contents
          </h2>
          <ol className="space-y-2">
            {tocItems.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex items-start gap-3 text-sm text-muted-light transition-colors hover:text-primary-light"
                >
                  <span className="mt-px font-mono text-xs text-muted-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="prose-custom">
          <section id="why-business-cards-matter" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Why Business Cards Still Matter
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              In an increasingly digital world, a physical business card might seem outdated. It is not. Business cards remain one of the most direct and personal ways to share your contact information. When you hand someone a card, you are creating a tangible reminder of your meeting that sits on their desk, in their wallet, or on their corkboard.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              Research consistently shows that face-to-face connections lead to stronger business relationships, and a business card extends that moment beyond the handshake. Digital alternatives like sharing a LinkedIn URL or texting a vCard have their place, but they lack the tactile, memorable quality of a well-designed physical card.
            </p>
            <p className="text-muted-light leading-relaxed">
              A business card also signals professionalism. When someone asks &ldquo;Do you have a card?&rdquo; and you pull out a crisp, well-designed one, it says you are prepared, established, and take your work seriously. Having no card to offer can leave the opposite impression.
            </p>
          </section>

          <section id="essential-information" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Essential Information to Include
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Less is more on a business card. Include only what someone needs to contact you and understand what you do:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Your name.</strong> Use the name people will actually search for or ask about. If you go by a nickname professionally, use that.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Job title or role.</strong> Keep it clear and concise. &ldquo;Graphic Designer&rdquo; or &ldquo;Marketing Consultant&rdquo; instantly communicates what you do. Avoid vague titles like &ldquo;Chief Visionary.&rdquo;</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Company or brand name.</strong> If applicable, include your business name and logo. This reinforces brand recognition.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Phone number.</strong> Include the number you actually answer for business calls. One number is enough.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Email address.</strong> Use a professional email, ideally one on your own domain (you@yourbusiness.com), not a free Gmail address.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Website or portfolio URL.</strong> If you have a website, include it. Keep the URL short and clean.</span>
              </li>
            </ul>
            <p className="text-muted-light leading-relaxed">
              Optional additions include a QR code linking to your website, your physical address (if clients visit you), and one or two social media handles relevant to your industry. Do not include every social platform you are on. Choose the one or two most relevant to your professional life.
            </p>
          </section>

          <section id="design-principles" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Design Principles That Work
            </h2>

            <h3 className="text-lg font-semibold text-white mb-3">Embrace White Space</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              The most common business card mistake is cramming too much onto a 3.5 x 2 inch card. White space (or negative space) is not wasted space. It makes your card easier to read, looks more professional, and draws the eye to the most important information. If your card feels crowded, remove something.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Create Visual Hierarchy</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Not all information is equally important. Your name should be the largest text on the card. Your title or company name comes next. Contact details are the smallest text. This hierarchy guides the reader&rsquo;s eye naturally from most important to supporting information.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Stick to Consistent Branding</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Your business card should look like it belongs to the same brand as your website, email signature, and any other materials. Use the same colors, fonts, and logo placement. Consistency builds recognition and trust.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Use Both Sides</h3>
            <p className="text-muted-light leading-relaxed">
              You are paying for both sides of the card, so use them. A common approach is putting your logo and tagline on one side and your contact details on the other. Alternatively, use the back for a QR code, a brief list of your services, or a memorable design element.
            </p>
          </section>

          {/* Mid-article CTA */}
          <div className="my-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Design your business card in minutes.
            </h3>
            <p className="text-sm text-muted-light mb-5">
              PrestoKit&rsquo;s free Business Card Generator lets you choose a layout, enter your details, and download a print-ready design instantly.
            </p>
            <Link
              href="/tools/business-card-generator"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
            >
              Create Business Card
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <section id="typography-and-color" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Typography and Color Choices
            </h2>

            <h3 className="text-lg font-semibold text-white mb-3">Font Selection</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Use no more than two fonts on your business card. A common combination is a serif or bold sans-serif for your name and a clean sans-serif for contact details. Make sure the smallest text on your card (usually phone number and email) is at least 7-8 points. Anything smaller becomes difficult to read, especially for older clients.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Color Strategy</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Limit your palette to two or three colors. Your brand&rsquo;s primary color should dominate, with a neutral (black, white, or gray) for text. Avoid neon or overly bright colors that look cheap when printed. If your brand uses vibrant colors, use them as accents rather than backgrounds.
            </p>
            <p className="text-muted-light leading-relaxed">
              Dark backgrounds with light text can look striking but are harder to read and more expensive to print (more ink coverage). If you go this route, ensure the contrast ratio is high enough that all text remains legible.
            </p>
          </section>

          <section id="step-by-step" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Step-by-Step: Designing Your Card
            </h2>
            <div className="space-y-6">
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Step 1: Gather Your Information</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Write down every piece of information you want on the card. Then ruthlessly edit. Remove anything that is not essential for someone to contact you or understand what you do.
                </p>
              </div>
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Step 2: Choose Your Layout</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Decide between a horizontal or vertical layout. Horizontal is traditional and works well for most businesses. Vertical cards stand out and work well for creative professionals. Consider how the card will be stored. Most card holders are designed for horizontal cards.
                </p>
              </div>
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Step 3: Place Your Logo</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Position your logo where it feels natural but does not overpower the contact information. Top-left, centered at top, or on the reverse side are all solid placements. Size it appropriately. A logo that takes up half the card is too big.
                </p>
              </div>
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Step 4: Arrange Contact Details</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Group related information together. Your name and title should be near each other. Phone, email, and website can be grouped below. Align text consistently. Left-aligned text is the easiest to scan.
                </p>
              </div>
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Step 5: Review at Actual Size</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Print a test copy at actual size (3.5 x 2 inches for US standard). What looks great on a computer screen may be unreadable when printed at real business card dimensions. Check font sizes, spacing, and overall balance.
                </p>
              </div>
            </div>
          </section>

          <section id="printing-tips" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Printing Tips and Paper Stock
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              The paper stock you choose affects how your card feels in someone&rsquo;s hand. A thick, high-quality card stock immediately communicates quality. Here are the most common options:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">14pt or 16pt card stock.</strong> The industry standard. Thick enough to feel substantial, affordable to print. 16pt has a slightly more premium feel.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Matte finish.</strong> Smooth, non-reflective, easy to write on. Gives a modern, understated look. Great for minimal designs.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Gloss finish.</strong> Shiny, vibrant colors. Makes photos and colorful designs pop. Can feel less premium to some people and shows fingerprints.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Soft-touch lamination.</strong> A velvety coating that feels luxurious. More expensive but creates a memorable tactile experience.</span>
              </li>
            </ul>
            <p className="text-muted-light leading-relaxed">
              Always order a sample or proof before printing a large batch. Colors on screen look different when printed, and you want to catch any issues before committing to 500 or 1,000 cards.
            </p>
          </section>

          <section id="common-mistakes" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Common Business Card Mistakes
            </h2>
            <div className="space-y-4">
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Too much information</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Listing every social media platform, your fax number, three phone numbers, and a mission statement makes the card unreadable. Edit ruthlessly.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Using a free template without customization</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Generic templates are recognizable. At minimum, customize colors, fonts, and layout to match your brand. A card that looks like everyone else&rsquo;s defeats the purpose.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Cheap paper stock</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  A flimsy card gets thrown away. Spend the extra few dollars for proper card stock. The cost difference between cheap and premium printing is often just $10-20 for 500 cards.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Outdated information</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Handing someone a card with a crossed-out phone number or an old email address is worse than having no card. Order smaller batches if your details change frequently.
                </p>
              </div>
            </div>
          </section>

          <section id="tools" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Create Your Business Card Now
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              Ready to design your card? PrestoKit&rsquo;s free Business Card Generator lets you choose a professional layout, enter your details, and download a print-ready design in minutes. No design skills needed.
            </p>

            <Link
              href="/tools/business-card-generator"
              className="group flex items-start gap-5 rounded-2xl border border-brand-border bg-brand-card/40 p-6 transition-all hover:bg-brand-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-3xl" style={{ backgroundColor: "#e91e6315" }}>
                {"\uD83C\uDFB4"}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-primary-light transition-colors">
                  Free Business Card Generator
                </h3>
                <p className="mt-1 text-sm text-muted-light">
                  Choose a layout, enter your details, customize colors and fonts, and download a print-ready business card. No signup required.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-light opacity-0 group-hover:opacity-100 transition-opacity">
                  Open tool
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
          </section>
        </div>

        {/* Related Guides */}
        <section className="mt-16 border-t border-brand-border pt-12">
          <h2 className="text-xl font-bold text-white mb-6">Related Guides</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/guides/how-to-start-business"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                How to Start a Small Business
              </h3>
              <p className="mt-1 text-sm text-muted">
                Complete guide from idea to launch, including registration and first customers.
              </p>
            </Link>
            <Link
              href="/guides/how-to-create-invoice"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                How to Create a Professional Invoice
              </h3>
              <p className="mt-1 text-sm text-muted">
                A complete guide to invoicing that gets you paid on time, every time.
              </p>
            </Link>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mt-12 border-t border-brand-border pt-12">
          <h2 className="text-xl font-bold text-white mb-6">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/tools/business-card-generator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Business Card Generator
              </h3>
            </Link>
            <Link
              href="/tools/qr-code-generator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                QR Code Generator
              </h3>
            </Link>
            <Link
              href="/tools/email-signature-creator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Email Signature Creator
              </h3>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}

import Link from "next/link";

const tocItems = [
  { id: "what-is-qr", label: "What Is a QR Code?" },
  { id: "how-they-work", label: "How QR Codes Work" },
  { id: "types", label: "Static vs. Dynamic QR Codes" },
  { id: "business-uses", label: "QR Codes in Business" },
  { id: "best-practices", label: "QR Code Best Practices" },
  { id: "size-printing", label: "Size and Printing Guidelines" },
  { id: "tracking", label: "QR Code Tracking and Analytics" },
  { id: "creative-uses", label: "Creative QR Code Use Cases" },
  { id: "create", label: "Create Your QR Code" },
];

export default function QRCodeGuidePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative border-b border-brand-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow"
        />
        <div className="mx-auto max-w-[720px] px-6 pb-10 pt-12 sm:pt-16">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-white">
              PrestoKit
            </Link>
            <span className="text-muted-dark">/</span>
            <Link href="/guides" className="transition-colors hover:text-white">
              Guides
            </Link>
            <span className="text-muted-dark">/</span>
            <span className="text-muted-light">QR Codes</span>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            QR Codes &mdash; The Complete Guide
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-light">
            From the basics of how QR codes work to advanced business applications, printing guidelines, and creative use cases. Everything you need to use QR codes effectively in 2026.
          </p>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span>By PrestoKit Team</span>
            <span className="text-muted-dark">|</span>
            <span>Last updated: March 2026</span>
            <span className="text-muted-dark">|</span>
            <span>11 min read</span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="mx-auto max-w-[720px] px-6 py-12">
        {/* Table of Contents */}
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

        {/* Content */}
        <div className="prose-custom">
          {/* Section 1 */}
          <section id="what-is-qr" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              What Is a QR Code?
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              A QR code (Quick Response code) is a two-dimensional barcode that stores information in a grid of black and white squares. Unlike traditional barcodes that hold data in one direction (horizontal lines), QR codes store data both horizontally and vertically, allowing them to hold significantly more information in a much smaller space.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              QR codes were invented in 1994 by Masahiro Hara at Denso Wave, a subsidiary of Toyota. The original purpose was tracking automotive parts during manufacturing. The technology was designed to be scanned quickly and at any angle, which is where the &ldquo;Quick Response&rdquo; name comes from.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              Today, QR codes are everywhere. Restaurants use them for menus, businesses print them on marketing materials, product packaging includes them for additional information, and payment systems in many countries are built entirely around them. The COVID-19 pandemic accelerated QR code adoption globally, and usage has only continued to grow.
            </p>
            <p className="text-muted-light leading-relaxed">
              A single QR code can store up to 4,296 alphanumeric characters or 7,089 numeric digits. In practice, most QR codes contain much less data &mdash; typically a URL, a short text string, contact information, or WiFi credentials.
            </p>
          </section>

          {/* Section 2 */}
          <section id="how-they-work" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              How QR Codes Work
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Understanding the anatomy of a QR code helps you use them more effectively, especially when it comes to design customization and troubleshooting scanning issues.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">The Structure</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Every QR code has several key components that work together to make scanning reliable.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span><strong className="text-white">Finder patterns.</strong> The three large squares in three corners of the code. These help scanners detect and orient the QR code, regardless of the angle or rotation. This is why QR codes can be scanned upside down or at an angle.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span><strong className="text-white">Alignment patterns.</strong> Smaller squares that help correct distortion, especially in larger QR codes. They ensure the code can be read even if the surface is slightly curved or the scan angle is not perfectly straight.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span><strong className="text-white">Timing patterns.</strong> Alternating black and white modules that run between the finder patterns. These help the scanner determine the size of the data grid.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span><strong className="text-white">Data and error correction area.</strong> The remaining space contains the actual encoded data plus redundant error correction information that allows the code to remain scannable even when partially damaged.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span><strong className="text-white">Quiet zone.</strong> The blank margin around the QR code. This white border (at least 4 modules wide) helps scanners distinguish the code from its surroundings. Cutting into the quiet zone is a common mistake that causes scanning failures.</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">Error Correction</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              QR codes use Reed-Solomon error correction, which allows the code to be read even when parts are damaged, dirty, or obscured. There are four levels of error correction:
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-3 text-muted-light text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Level L (Low):</strong> Recovers up to 7% damage. Smallest QR code size.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Level M (Medium):</strong> Recovers up to 15% damage. Good general-purpose choice.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Level Q (Quartile):</strong> Recovers up to 25% damage. Use when the code may get scuffed.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Level H (High):</strong> Recovers up to 30% damage. Best for adding logos or for harsh environments.</span>
              </div>
            </div>
            <p className="text-muted-light leading-relaxed">
              Higher error correction means the QR code can survive more damage, but it also makes the code visually denser (more modules). Level M is the standard default. Use Level H when you plan to place a logo in the center of the code.
            </p>
          </section>

          {/* Section 3 */}
          <section id="types" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Static vs. Dynamic QR Codes
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              This is the most important distinction in QR codes, and understanding it will save you time, money, and headaches.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-3">Static QR Codes</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-light">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    Data is encoded directly in the pattern
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-light">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    Cannot be edited after creation
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-light">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    Work without any internet or servers
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-light">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    Free forever, no subscription needed
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-light">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    No scan tracking or analytics
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-3">Dynamic QR Codes</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-light">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                    Points to a redirect URL, not the final destination
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-light">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                    Destination can be changed at any time
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-light">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                    Requires an active redirect service
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-light">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                    Usually requires a paid subscription
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-light">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                    Provides scan tracking and analytics
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">Which Should You Use?</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Use <strong className="text-white">static QR codes</strong> when: the destination will not change (your website URL, contact info, WiFi password), you want the code to work permanently without any ongoing service, or you are creating codes for personal use.
            </p>
            <p className="text-muted-light leading-relaxed">
              Use <strong className="text-white">dynamic QR codes</strong> when: you are printing on physical materials (packaging, flyers, signage) and might need to update the destination later, you need scan analytics to measure campaign performance, or you want the ability to fix a broken link without reprinting.
            </p>
          </section>

          {/* Section 4 */}
          <section id="business-uses" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              QR Codes in Business
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              QR codes are one of the most versatile tools in a business owner&rsquo;s toolkit. Here are the most effective ways businesses use them today.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Marketing and Advertising</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Add QR codes to print ads, flyers, brochures, and billboards to bridge the gap between physical and digital. A QR code on a poster can link to a landing page, a product demo video, or a special offer. This makes every physical touchpoint trackable and actionable.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Product Packaging</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              QR codes on packaging can link to: nutritional information, user manuals, assembly instructions, warranty registration, recipe ideas, product origin and sustainability information, or customer reviews. This extends the value of your packaging without cluttering it with text.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Restaurants and Hospitality</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              QR code menus became ubiquitous during the pandemic and have stayed because they are genuinely useful. They eliminate printing costs, allow instant menu updates (out-of-stock items, daily specials, seasonal changes), and can link to online ordering systems. Hotels use them for room service menus, local guides, and WiFi access.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Payments</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              In many markets, QR code payments have become the standard. Customers scan a code at the point of sale to pay via their mobile banking app or payment service. Even in the US, services like Venmo and Cash App use QR codes for peer-to-peer payments.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Business Cards</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              A QR code on your business card can encode your full contact information (vCard format), which the recipient can save directly to their phone without manual typing. This significantly increases the chance your contact details actually get saved.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Events and Ticketing</h3>
            <p className="text-muted-light leading-relaxed">
              QR codes serve as digital tickets, check-in passes, and information hubs at events. Attendees scan to register, access event schedules, connect to WiFi, download materials, or join networking platforms. Event organizers use them to track attendance and manage access control.
            </p>
          </section>

          {/* Mid-article CTA */}
          <div className="my-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Create a QR code in seconds.
            </h3>
            <p className="text-sm text-muted-light mb-5">
              PrestoKit&rsquo;s free QR Code Generator supports URLs, text, WiFi, contacts, and more. No signup required.
            </p>
            <Link
              href="/tools/qr-code-generator"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
            >
              Generate Free QR Code
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Section 5 */}
          <section id="best-practices" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              QR Code Best Practices
            </h2>

            <h3 className="text-lg font-semibold text-white mb-3">Always Test Before Printing</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              This is the number one rule. Before sending anything to print, test your QR code on at least three different devices: an iPhone, an Android phone, and a tablet if possible. Test in different lighting conditions and from the expected scanning distance. A QR code that fails to scan in the real world is a wasted investment.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Maintain High Contrast</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              QR scanners rely on contrast between the dark modules and the light background. The classic black-on-white combination works best. If you want to use custom colors, keep the dark modules dark and the background light. Never use similar colors for both (like dark blue on black, or light gray on white). A good rule: maintain at least a 40% contrast ratio.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Preserve the Quiet Zone</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              The white space around your QR code (the quiet zone) is not optional. It needs to be at least 4 modules wide on all sides. Do not place text, images, or borders right up against the code edges. Crowding the quiet zone is the most common cause of scanning problems.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Provide Context</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Never display a QR code without a brief explanation of what it does. &ldquo;Scan for menu,&rdquo; &ldquo;Scan to save 20%,&rdquo; or &ldquo;Scan to watch the demo&rdquo; gives people a reason to pull out their phone. A naked QR code with no context gets ignored by most people.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Link to Mobile-Optimized Pages</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              QR codes are scanned on smartphones. If your code links to a website, that page must be fully mobile-responsive. Sending someone to a desktop-only page after they scan a QR code is a poor experience that will cost you conversions.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Keep URLs Short</h3>
            <p className="text-muted-light leading-relaxed">
              Shorter URLs produce simpler (less dense) QR codes, which are easier to scan and print at smaller sizes. Use URL shorteners if your destination URL is long, or use a dynamic QR code service that handles the redirect.
            </p>
          </section>

          {/* Section 6 */}
          <section id="size-printing" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Size and Printing Guidelines
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              Getting the size right is critical. A QR code that is too small will not scan. A code that is too large wastes valuable space on your design.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">The 10:1 Distance Rule</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              The standard guideline is that the QR code should be at least 1/10th of the intended scanning distance. If someone will scan the code from 30 cm (about a foot) away &mdash; like a business card or product label &mdash; the code should be at least 3 cm wide. If they will scan from 3 meters (10 feet) away &mdash; like a poster on a wall &mdash; the code should be at least 30 cm (12 inches) wide.
            </p>

            <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5 mb-6">
              <h3 className="text-base font-semibold text-white mb-3">Recommended Minimum Sizes</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-light">Business card</span>
                  <span className="text-white font-medium">2 cm (0.8 in)</span>
                </div>
                <div className="h-px bg-brand-border" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-light">Product label</span>
                  <span className="text-white font-medium">2.5 cm (1 in)</span>
                </div>
                <div className="h-px bg-brand-border" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-light">Flyer or brochure</span>
                  <span className="text-white font-medium">3 cm (1.2 in)</span>
                </div>
                <div className="h-px bg-brand-border" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-light">Table tent or placard</span>
                  <span className="text-white font-medium">4 cm (1.6 in)</span>
                </div>
                <div className="h-px bg-brand-border" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-light">Poster (A3/A2)</span>
                  <span className="text-white font-medium">10+ cm (4+ in)</span>
                </div>
                <div className="h-px bg-brand-border" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-light">Billboard or banner</span>
                  <span className="text-white font-medium">30+ cm (12+ in)</span>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">Printing Tips</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Use vector formats.</strong> Export your QR code as SVG or EPS for print. These scale to any size without losing quality. PNG works at large sizes (300 DPI or higher) but avoid JPG, which introduces compression artifacts that can interfere with scanning.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Print a test first.</strong> Before running 10,000 copies, print one and test it. Different printers and paper stocks can affect readability. Glossy paper can cause glare issues under certain lighting.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Avoid curved surfaces.</strong> QR codes work best on flat surfaces. If you must print on a curved surface (like a bottle), increase the size and use high error correction (Level H).</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Consider the material.</strong> Matte paper and cardstock provide the most reliable scanning. Foil, embossing, and reflective materials can cause problems. If using special materials, always test extensively.</span>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section id="tracking" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              QR Code Tracking and Analytics
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              One of the biggest advantages of QR codes over traditional print media is the ability to track engagement. With the right setup, you can measure exactly how many people interact with your physical materials.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">What You Can Track</h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span><strong className="text-white">Total scans:</strong> How many times the code was scanned overall.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span><strong className="text-white">Unique scans:</strong> How many individual devices scanned the code (filters out repeated scans from the same person).</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span><strong className="text-white">Location:</strong> Approximate geographic location of scans, useful for understanding regional engagement.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span><strong className="text-white">Time and date:</strong> When scans occur, helping you identify peak engagement times.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span><strong className="text-white">Device type:</strong> iOS vs Android, which can inform your mobile optimization priorities.</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">Tracking With Static QR Codes</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Static QR codes do not have built-in tracking, but you can still measure engagement by using UTM parameters in your URLs. Append parameters like <code className="rounded bg-brand-card px-1.5 py-0.5 text-sm text-primary-light">?utm_source=flyer&utm_medium=qr&utm_campaign=spring2026</code> to your destination URL. Google Analytics or any web analytics tool will then show you exactly how much traffic came from each QR code.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Tracking With Dynamic QR Codes</h3>
            <p className="text-muted-light leading-relaxed">
              Dynamic QR code services provide built-in dashboards with scan analytics. Because every scan passes through their redirect server, they can capture detailed data automatically. This is one of the main reasons businesses choose dynamic codes for marketing campaigns.
            </p>
          </section>

          {/* Section 8 */}
          <section id="creative-uses" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Creative QR Code Use Cases
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              Beyond the standard business applications, QR codes enable some genuinely creative implementations.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">WiFi Sharing</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Create a QR code that automatically connects devices to your WiFi network. Guests scan the code and are connected instantly without needing to type a password. Perfect for offices, Airbnbs, coffee shops, and events. The code encodes the network name, password, and encryption type.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Interactive Product Labels</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Link to video tutorials, assembly guides, or behind-the-scenes content about how a product was made. Wine bottles can link to tasting notes and vineyard stories. Clothing tags can link to care instructions and styling suggestions. This turns static packaging into a rich media experience.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Real Estate</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Put QR codes on yard signs that link to virtual tours, photo galleries, floor plans, and agent contact information. Buyers can explore a property from the sidewalk without scheduling a showing. This is especially effective for open houses and commercial listings.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Education and Training</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Teachers and trainers use QR codes in textbooks, worksheets, and presentations to link to supplementary videos, interactive quizzes, or reference materials. Students scan to access additional resources without typing long URLs.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Scavenger Hunts and Gamification</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Brands and event organizers create QR code scavenger hunts where each code reveals a clue, unlocks a discount, or adds points to a leaderboard. This turns marketing into an interactive experience that people actually enjoy participating in.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Memorial and Personal</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  QR codes on gravestones and memorial plaques link to online tributes, photo galleries, and stories about the person. In a lighter vein, QR codes are used on wedding invitations to link to RSVPs, registries, and event details.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9 - CTA */}
          <section id="create" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Create Your QR Code
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              Ready to create your own QR code? PrestoKit&rsquo;s free QR Code Generator lets you create high-quality codes for URLs, text, WiFi networks, contact information, and more. No signup, no watermarks, and completely free.
            </p>

            {/* Tool Card */}
            <Link
              href="/tools/qr-code-generator"
              className="group flex items-start gap-5 rounded-2xl border border-brand-border bg-brand-card/40 p-6 transition-all hover:bg-brand-card hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-3xl" style={{ backgroundColor: "#00e67615" }}>
                {"\uD83D\uDCF1"}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">
                  Free QR Code Generator
                </h3>
                <p className="mt-1 text-sm text-muted-light">
                  Generate QR codes for URLs, text, WiFi, contacts, and more. Customize colors and download in high resolution. No signup, completely free.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
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
              <span className="text-2xl">{"\uD83D\uDE80"}</span>
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                How to Start a Small Business
              </h3>
              <p className="mt-1 text-sm text-muted">
                Complete guide from idea to launch, including essential tools for your business.
              </p>
            </Link>
            <Link
              href="/guides/freelancing-guide"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <span className="text-2xl">{"\uD83D\uDCBC"}</span>
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                Freelancing 101
              </h3>
              <p className="mt-1 text-sm text-muted">
                Everything you need to know about starting and growing a freelance career.
              </p>
            </Link>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mt-12 border-t border-brand-border pt-12">
          <h2 className="text-xl font-bold text-white mb-6">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/tools/qr-code-generator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <span className="text-2xl">{"\uD83D\uDCF1"}</span>
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-accent transition-colors">
                QR Code Generator
              </h3>
            </Link>
            <Link
              href="/tools/business-name-generator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <span className="text-2xl">{"\uD83D\uDCA1"}</span>
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Business Name Generator
              </h3>
            </Link>
            <Link
              href="/tools/email-signature-creator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <span className="text-2xl">{"\u2709\uFE0F"}</span>
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

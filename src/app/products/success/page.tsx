import Link from "next/link";

export const metadata = {
  title: "Purchase Complete! | PrestoKit",
  robots: { index: false, follow: false },
};

export default function ProductSuccessPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        {/* Success icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 shadow-lg shadow-accent/10">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-accent" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-white">
          Thank you!
        </h1>
        <p className="mt-4 text-lg text-muted-light">
          Your purchase is complete. Check your email for the download link and receipt.
        </p>

        <div className="mt-10 rounded-2xl border border-brand-border bg-brand-card/40 p-8">
          <h2 className="text-lg font-semibold text-white mb-3">
            What happens next?
          </h2>
          <ul className="space-y-3 text-left text-sm text-muted-light">
            <li className="flex items-start gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-shrink-0 text-accent" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              You&apos;ll receive a confirmation email with your download link within minutes.
            </li>
            <li className="flex items-start gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-shrink-0 text-accent" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              All templates are yours to keep forever — no recurring charges.
            </li>
            <li className="flex items-start gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-shrink-0 text-accent" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Commercial license included — use for your business or client work.
            </li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/#tools"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            Continue Using Tools
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium text-muted transition-colors hover:text-white"
          >
            Browse more products
          </Link>
        </div>
      </div>
    </div>
  );
}

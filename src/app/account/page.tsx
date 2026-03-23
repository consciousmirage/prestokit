const PORTAL_URL = "https://billing.stripe.com/p/login/eVq6oIgtm9HF96c9Mm0x200";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
            <svg
              className="w-7 h-7 text-primary-light"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Your Account
          </h1>
          <p className="mt-3 text-muted-light">
            Manage your PrestoKit Pro subscription
          </p>
        </div>

        {/* Manage Subscription Card */}
        <div className="rounded-2xl border border-brand-border bg-brand-card/60 p-8 sm:p-10 mb-8">
          <h2 className="text-xl font-bold text-white mb-3">
            Pro Subscription
          </h2>
          <p className="text-muted-light mb-6">
            View your subscription status, update payment details, download invoices, or cancel your plan. Everything is managed securely through Stripe.
          </p>
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
            Manage Subscription
          </a>
        </div>

        {/* What you can do */}
        <div className="rounded-2xl border border-brand-border bg-brand-card/40 p-8">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-dark mb-6">
            From the portal you can
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "View subscription status", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { label: "Update payment method", icon: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" },
              { label: "Download invoices", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
              { label: "Cancel anytime", icon: "M6 18L18 6M6 6l12 12" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl border border-brand-border/50 bg-brand-dark/50 px-4 py-3"
              >
                <svg
                  className="w-5 h-5 text-accent flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span className="text-sm text-muted-light">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Not a subscriber CTA */}
        <div className="mt-10 text-center">
          <p className="text-muted mb-3">Don&apos;t have a Pro subscription yet?</p>
          <a
            href="/pro"
            className="text-sm font-medium text-primary-light transition-colors hover:text-white"
          >
            Learn about PrestoKit Pro &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

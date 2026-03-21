# PrestoKit Pro — Stripe Integration Plan

**Price:** $9/month recurring subscription
**Stack:** Next.js 14 (App Router) on Vercel
**Current state:** No Stripe package installed, no API routes exist, no auth system. All 12 tools are client-side. The homepage has a "Pro" section with a disabled "Join the Waitlist" button.

---

## 1. What Needs to Happen in Stripe Dashboard

### Step A — Create the Product

1. Go to https://dashboard.stripe.com/products
2. Click **+ Add product**
3. Fill in:
   - **Name:** `PrestoKit Pro`
   - **Description:** `Unlimited access to PrestoKit Pro features — AI tools, saved templates, custom branding, bulk generation, and priority access to new tools.`
4. Under **Pricing**, set:
   - **Pricing model:** Standard pricing
   - **Price:** `$9.00`
   - **Billing period:** Monthly
   - **Currency:** USD
5. Click **Save product**

### Step B — Copy the Price ID

After saving, you'll land on the product page. Under the **Pricing** section you'll see something like:

```
$9.00 USD / month    price_1Oxxxxxxxxxxxxxxxx
```

**Copy that `price_xxx...` ID.** You'll need it for the environment variable `STRIPE_PRICE_ID`.

### Step C — Get Your API Keys

1. Go to https://dashboard.stripe.com/apikeys
2. You'll see two keys:
   - **Publishable key** — starts with `pk_live_` (or `pk_test_` in test mode)
   - **Secret key** — starts with `sk_live_` (or `sk_test_` in test mode)
3. Copy both. You'll need them for environment variables.

> **Important:** Start in **Test Mode** first (toggle at the top-right of the Stripe dashboard). This gives you test keys so you can try the whole flow without real charges. When ready to go live, repeat with live keys.

---

## 2. Three Integration Approaches (Simplest to Most Complete)

### Option A: Stripe Payment Link (RECOMMENDED TO START — Zero Code)

**Effort:** 5 minutes. No code changes at all.
**How it works:** Stripe generates a hosted checkout URL. You paste it into your button.

This is the fastest possible path to accepting money.

### Option B: Stripe Checkout Session via API Route

**Effort:** ~1 hour of code work.
**How it works:** A Next.js API route creates a Stripe Checkout Session, then redirects the user to Stripe's hosted checkout page. After payment, Stripe redirects back to a success page.

This gives you more control (dynamic pricing, metadata, discount codes) but requires writing code.

### Option C: Full Subscription System with Webhooks + Auth

**Effort:** Several hours to a couple of days.
**How it works:** Full system with user accounts, subscription status tracking, webhook handling for renewals/cancellations, and gated Pro features.

This is the "real" version you'd build eventually, but it's overkill for an MVP.

---

## 3. RECOMMENDED: Start with Stripe Payment Links (Option A)

### Why This First

- Zero code changes needed
- Can be live in 5 minutes
- Still a real Stripe subscription — customers get billed monthly, can cancel, etc.
- You can swap in the coded version (Option B) later without disrupting subscribers
- Lets you validate that people will actually pay $9/mo before building infrastructure

### How to Create a Payment Link

1. Go to https://dashboard.stripe.com/payment-links
2. Click **+ New**
3. Select the **PrestoKit Pro** product ($9/mo) you created in Step 1
4. Configure:
   - **After payment:** Redirect to `https://prestokit.com/pro/welcome` (or just `https://prestokit.com` for now)
   - **Collect email:** Yes
   - **Allow promotion codes:** Optional (nice for launch discounts)
5. Click **Create link**
6. Stripe gives you a URL like: `https://buy.stripe.com/xxxxxxxx`

### What to Change in the Code

One single change in `src/app/page.tsx` — swap the disabled button for a real link:

**Current code (lines 436-441):**
```tsx
<button
  disabled
  className="rounded-xl bg-primary/20 px-6 py-3 text-sm font-semibold text-primary-light transition-colors cursor-not-allowed"
>
  Join the Waitlist (Coming Soon)
</button>
```

**Replace with:**
```tsx
<a
  href="https://buy.stripe.com/YOUR_PAYMENT_LINK_HERE"
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
>
  Get PrestoKit Pro — $9/mo
</a>
```

That's it. Deploy to Vercel and you're accepting subscriptions.

---

## 4. Code Plan for Option B (Stripe Checkout API Route)

When you're ready to graduate from Payment Links, here's the full code plan.

### 4a. Install Dependencies

```bash
npm install stripe
```

### 4b. Environment Variables

Add these to `.env.local` (for local dev) and to Vercel dashboard (for production):

| Variable | Value | Where to find it |
|----------|-------|-------------------|
| `STRIPE_SECRET_KEY` | `sk_test_...` or `sk_live_...` | https://dashboard.stripe.com/apikeys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` or `pk_live_...` | Same page |
| `STRIPE_PRICE_ID` | `price_1Oxxxxxxxx` | Product page in Stripe |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | After setting up webhook endpoint |
| `NEXT_PUBLIC_SITE_URL` | `https://prestokit.com` | Your domain |

### 4c. Files to Create

```
src/
  app/
    api/
      checkout/
        route.ts          ← Creates a Stripe Checkout Session
      webhook/
        route.ts          ← Handles Stripe webhook events (optional for MVP)
    pro/
      success/
        page.tsx          ← "Thank you" page after payment
      welcome/
        page.tsx          ← Landing page for new Pro subscribers
  lib/
    stripe.ts             ← Stripe client initialization
```

### 4d. File Contents

#### `src/lib/stripe.ts` — Stripe Client

```ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});
```

#### `src/app/api/checkout/route.ts` — Create Checkout Session

```ts
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pro/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/#pro`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
```

#### `src/app/api/webhook/route.ts` — Webhook Handler (Optional for MVP)

```ts
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      // A customer just subscribed
      const session = event.data.object;
      console.log("New subscriber:", session.customer_email);
      // TODO: Send welcome email, grant access, etc.
      break;

    case "customer.subscription.deleted":
      // A customer cancelled
      console.log("Subscription cancelled");
      // TODO: Revoke access
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
```

#### `src/app/pro/success/page.tsx` — Success Page

```tsx
export default function ProSuccess() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <div className="mb-6 text-6xl">🎉</div>
      <h1 className="text-3xl font-bold text-white">
        Welcome to PrestoKit Pro!
      </h1>
      <p className="mt-4 text-lg text-muted-light">
        Your subscription is active. You now have access to all Pro features.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light"
      >
        Start Using Pro Tools
      </a>
    </div>
  );
}
```

#### Update `src/app/page.tsx` — Pro Section Button

Replace the disabled button with a checkout trigger:

```tsx
<button
  onClick={async () => {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }}
  className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
>
  Get PrestoKit Pro — $9/mo
</button>
```

Note: This requires adding `"use client"` to the top of `page.tsx` OR extracting the button into a separate client component.

---

## 5. What the User Needs to Do (Step-by-Step for Non-Technical)

### For Option A (Payment Link — do this first):

1. **Log in to Stripe** at https://dashboard.stripe.com
2. **Toggle to Test Mode** (switch in top-right) to practice first
3. **Create the product:**
   - Go to Products > + Add product
   - Name: "PrestoKit Pro"
   - Price: $9/month
   - Save
4. **Create a Payment Link:**
   - Go to Payment Links > + New
   - Select "PrestoKit Pro"
   - Set "After payment" redirect to `https://prestokit.com`
   - Create the link
5. **Give me the Payment Link URL** — I'll swap it into the code
6. **Test it** with Stripe's test card: `4242 4242 4242 4242` (any future expiry, any CVC)
7. When ready to go live: **repeat steps 3-4 in Live Mode** and give me the live Payment Link URL

### For Option B (API Route — do this when graduating from Payment Links):

1. **Get your API keys:**
   - Go to https://dashboard.stripe.com/apikeys
   - Copy the Publishable key and Secret key
2. **Get the Price ID:**
   - Go to Products > PrestoKit Pro
   - Copy the price ID (starts with `price_`)
3. **Add environment variables in Vercel:**
   - Go to https://vercel.com → your project → Settings → Environment Variables
   - Add each variable listed in section 4b above
   - Make sure to add them for Production (and Preview/Development if you want)
4. **Set up the webhook:**
   - Go to https://dashboard.stripe.com/webhooks
   - Click "+ Add endpoint"
   - URL: `https://prestokit.com/api/webhook`
   - Events to listen for: `checkout.session.completed`, `customer.subscription.deleted`
   - Copy the signing secret → add as `STRIPE_WEBHOOK_SECRET` in Vercel
5. **Redeploy** the app on Vercel after adding environment variables

---

## 6. MVP vs Full Version

### MVP (Start Here)

- **Payment Link approach** — zero code, live in 5 minutes
- No user accounts, no login system
- Pro is essentially "pay for access to something" — but since all tools are client-side, we need to decide what Pro actually unlocks (see below)
- For now, Pro could simply be:
  - **A "thank you" / VIP feel** — paying customers get early access to new tools via email
  - **A members-only page** with premium templates, bulk export tools, or downloadable resources
  - **Email-delivered content** — after payment, customers get an email with Pro resources

### What Does "Pro" Actually Unlock?

This is the critical question. Current homepage promises:
1. AI-powered invoice writing and auto-fill
2. Save and reuse templates across all tools
3. Custom branding: logo, colors, and fonts on every document
4. Bulk generation: create 100 QR codes or invoices at once
5. Priority access to new tools before everyone else
6. Export in every format: PDF, PNG, SVG, CSV

**Honest assessment:** Features 1-4 require significant engineering work. Feature 5 is just early access (easy). Feature 6 is partially already there (PDFs work on free tools).

**Recommended MVP approach for what Pro unlocks:**

- **Phase 1 (now):** Pro = early access to new tools + a private "Pro Tools" page with 2-3 exclusive tools that free users don't have access to. Gate the page with a simple access code or token sent via email after payment.
- **Phase 2 (next):** Add custom branding (logo upload on invoices, receipts, etc.) as the first real Pro feature.
- **Phase 3 (later):** Saved templates, bulk generation, AI features.

### Full Version (Build Later)

- User authentication (NextAuth.js or Clerk)
- Database to track subscription status (Supabase or PlanetScale)
- Webhook-driven subscription lifecycle management
- Gated Pro features that check subscription status before rendering
- Customer portal for managing billing (Stripe provides this hosted)
- Dunning management for failed payments

---

## 7. Recommendation Summary

| Step | What | Effort | When |
|------|------|--------|------|
| **1** | Create Stripe product + Payment Link | 5 min | Now |
| **2** | Swap the waitlist button for the Payment Link | 1 min code change | Now |
| **3** | Create a simple `/pro/welcome` page | 15 min | Now |
| **4** | Upgrade to Checkout API route (Option B) | 1 hour | When you want promo codes or metadata |
| **5** | Add webhook handling | 30 min | When you need to track cancellations |
| **6** | Add auth + subscription gating | 4-8 hours | When you have enough Pro subscribers to justify it |

**Bottom line:** Start with a Stripe Payment Link today. It takes 5 minutes, costs nothing, and you can start accepting $9/mo subscriptions immediately. Iterate from there based on what subscribers actually want.

---

## 8. Stripe Test Card Numbers (For Testing)

| Card Number | Result |
|-------------|--------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 3220` | Triggers 3D Secure authentication |
| `4000 0000 0000 0002` | Declined |

Use any future expiry date, any 3-digit CVC, any name/zip.

---

## 9. Files That Will Be Modified/Created

### For Payment Link approach (Option A):
- `src/app/page.tsx` — change one button (disabled → link to Payment Link URL)

### For API route approach (Option B):
- `package.json` — add `stripe` dependency
- `src/lib/stripe.ts` — NEW: Stripe client
- `src/app/api/checkout/route.ts` — NEW: checkout endpoint
- `src/app/api/webhook/route.ts` — NEW: webhook endpoint
- `src/app/pro/success/page.tsx` — NEW: post-payment page
- `src/app/page.tsx` — update Pro section button
- `.env.local` — NEW: environment variables (local dev)
- Vercel dashboard — environment variables (production)

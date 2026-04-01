import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "Stripe not configured." }, { status: 500 });
    }

    const stripe = new Stripe(secretKey);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prestokit.com";

    const body = await request.json();
    const { email } = body;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "ListingAI Pro — Unlimited",
              description: "Unlimited MLS listing descriptions, headlines & social captions. Cancel anytime.",
              images: [],
            },
            unit_amount: 3900,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: `${siteUrl}/listing-ai/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/listing-ai`,
      metadata: { product: "listing-ai-pro" },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("Listing checkout error:", err);
    const message = err instanceof Error ? err.message : "Checkout failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

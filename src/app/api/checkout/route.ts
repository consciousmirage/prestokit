import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const PRODUCTS: Record<string, { name: string; price: number; description: string }> = {
  "business-starter-bundle": {
    name: "PrestoKit Business Starter Bundle",
    price: 2900, // $29.00 in cents
    description:
      "30+ professional business templates: invoices, contracts, financial dashboards, email sequences, content calendars, and more.",
  },
  "freelancer-toolkit": {
    name: "The Complete Freelancer Toolkit",
    price: 1900, // $19.00
    description:
      "Everything you need to run a freelance business: client contracts, proposal templates, pricing calculator, invoice pack, and project tracker.",
  },
  "ai-business-toolkit": {
    name: "AI Business Toolkit — 200+ Prompts & Workflows",
    price: 2900, // $29.00
    description:
      "200+ tested AI prompts organized by business function: marketing, sales, email, social media, operations, and finance. Complete workflow guides included.",
  },
};

export async function POST(request: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: "Stripe is not configured." },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey);
    const body = await request.json();
    const { productId } = body;

    const product = PRODUCTS[productId];
    if (!product) {
      return NextResponse.json(
        { error: "Invalid product." },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prestokit.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/products/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/products`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("Checkout error:", err);
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

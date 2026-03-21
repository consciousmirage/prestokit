import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        {
          error:
            "Stripe is not configured. The STRIPE_SECRET_KEY environment variable is missing.",
        },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey);

    const body = await request.json();
    const { customerId } = body;

    if (!customerId || typeof customerId !== "string") {
      return NextResponse.json(
        { error: "A valid customer ID is required." },
        { status: 400 }
      );
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: "https://prestokit.com/account",
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (err: unknown) {
    console.error("Portal session error:", err);

    // Check for the specific error when Customer Portal is not configured
    const stripeErr = err as { type?: string; code?: string; message?: string };
    if (
      stripeErr.type === "StripeInvalidRequestError" &&
      stripeErr.message?.includes("portal")
    ) {
      return NextResponse.json(
        {
          error:
            "The Stripe Customer Portal has not been configured yet. Please enable it in your Stripe Dashboard under Settings > Customer Portal.",
        },
        { status: 400 }
      );
    }

    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

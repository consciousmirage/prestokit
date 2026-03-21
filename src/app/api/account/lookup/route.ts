import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        {
          found: false,
          error:
            "Stripe is not configured. The STRIPE_SECRET_KEY environment variable is missing.",
        },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey);

    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { found: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    // Look up customer by email in Stripe
    const customers = await stripe.customers.list({
      email: email.toLowerCase().trim(),
      limit: 1,
    });

    if (customers.data.length === 0) {
      return NextResponse.json({ found: false });
    }

    const customer = customers.data[0];

    // Get their subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      limit: 1,
    });

    const subscription = subscriptions.data[0] || null;

    const response: {
      found: boolean;
      customer: {
        id: string;
        email: string | null;
        name: string | null;
      };
      subscription?: {
        id: string;
        status: string;
        plan: string;
        currentPeriodEnd: number;
        cancelAtPeriodEnd: boolean;
      };
    } = {
      found: true,
      customer: {
        id: customer.id,
        email: customer.email ?? null,
        name: customer.name ?? null,
      },
    };

    if (subscription) {
      const firstItem = subscription.items.data[0];
      const planName = firstItem?.price?.nickname || "PrestoKit Pro";
      // In Stripe API 2026-02-25, current_period_end is on the subscription item
      const currentPeriodEnd = firstItem?.current_period_end ?? 0;

      response.subscription = {
        id: subscription.id,
        status: subscription.status,
        plan: planName,
        currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      };
    }

    return NextResponse.json(response);
  } catch (err: unknown) {
    console.error("Account lookup error:", err);
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json(
      { found: false, error: message },
      { status: 500 }
    );
  }
}

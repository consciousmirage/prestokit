import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import Stripe from "stripe";

function buildPrompt(data: {
  propertyType: string;
  beds: string;
  baths: string;
  sqft: string;
  features: string[];
  customFeatures: string;
  neighborhood: string;
  tone: string;
}) {
  const featureList = [
    ...data.features,
    ...(data.customFeatures ? [data.customFeatures] : []),
  ].join(", ");

  return `You are an award-winning real estate copywriter who writes compelling, conversion-focused MLS listings. Generate a complete property listing package based on the details below.

Property Details:
- Type: ${data.propertyType}
- Bedrooms: ${data.beds}
- Bathrooms: ${data.baths}
- Square Footage: ${data.sqft} sq ft
- Key Features: ${featureList || "Not specified"}
- Neighborhood/Location Highlights: ${data.neighborhood || "Not specified"}
- Writing Tone: ${data.tone}

Generate THREE clearly labeled sections:

**MLS DESCRIPTION**
Write 150-200 words. Use evocative, specific language. No price mentions. No first person. No address. Start with a strong opening sentence. Highlight the most compelling features naturally woven into the narrative. End with a call to action or lifestyle statement.

**HEADLINE**
One line, maximum 10 words. No address. Make it memorable and benefit-focused.

**SOCIAL CAPTION**
60-80 words, conversational tone appropriate for Instagram/Facebook. Include 6-8 relevant real estate hashtags at the end on a new line.

Be creative, specific, and compelling. Make buyers want to schedule a showing immediately.`;
}

function parseResponse(text: string): { description: string; headline: string; social: string } {
  const descMatch = text.match(/\*\*MLS DESCRIPTION\*\*\s*([\s\S]*?)(?=\*\*HEADLINE\*\*|$)/i);
  const headlineMatch = text.match(/\*\*HEADLINE\*\*\s*([\s\S]*?)(?=\*\*SOCIAL CAPTION\*\*|$)/i);
  const socialMatch = text.match(/\*\*SOCIAL CAPTION\*\*\s*([\s\S]*?)$/i);

  return {
    description: descMatch?.[1]?.trim() || text.trim(),
    headline: headlineMatch?.[1]?.trim() || "",
    social: socialMatch?.[1]?.trim() || "",
  };
}

async function verifyPaidSession(sessionId: string): Promise<boolean> {
  if (!sessionId) return false;
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) return false;
    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid" || session.status === "complete";
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { propertyType, beds, baths, sqft, features, customFeatures, neighborhood, tone, sessionId } = body;

    if (!propertyType || !beds || !baths) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Verify paid status for unlimited use
    const isPaid = sessionId ? await verifyPaidSession(sessionId) : false;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Service not configured." }, { status: 500 });
    }

    const groq = new Groq({ apiKey });
    const prompt = buildPrompt({ propertyType, beds, baths, sqft, features: features || [], customFeatures: customFeatures || "", neighborhood: neighborhood || "", tone: tone || "Professional & Traditional" });

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      max_tokens: 700,
      temperature: 0.82,
    });

    const text = completion.choices[0]?.message?.content || "";
    const parsed = parseResponse(text);

    return NextResponse.json({ ...parsed, isPaid });
  } catch (err: unknown) {
    console.error("Generate listing error:", err);
    const message = err instanceof Error ? err.message : "Generation failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

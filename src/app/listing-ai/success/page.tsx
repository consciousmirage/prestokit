"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const SESSION_KEY = "listingai_session";

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id") || "";
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }
    // Store session ID — the generate API will verify it with Stripe
    localStorage.setItem(SESSION_KEY, sessionId);
    // Clear free use counter since they're now paid
    localStorage.removeItem("listingai_uses");
    setStatus("success");
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 rounded-full border-2 border-[#10b981] border-t-transparent" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex h-screen flex-col items-center justify-center px-6 text-center">
        <p className="text-white mb-4">Something went wrong verifying your payment.</p>
        <Link href="/listing-ai" className="text-[#10b981] underline">
          Return to ListingAI
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center" style={{ background: "#0a0a14" }}>
      <div
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
        style={{ background: "#10b98120" }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <h1 className="mb-3 text-4xl font-bold text-white">You're all set!</h1>
      <p className="mb-8 max-w-md text-base leading-relaxed" style={{ color: "#8888a8" }}>
        Welcome to <strong className="text-white">ListingAI Pro</strong>. You now have unlimited listing generations.
        Your access is saved to this browser automatically.
      </p>

      <Link
        href="/listing-ai"
        className="rounded-xl px-8 py-3.5 text-base font-semibold text-white transition-all hover:opacity-90"
        style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
      >
        Start Generating Listings →
      </Link>

      <p className="mt-6 text-sm" style={{ color: "#4a4a6a" }}>
        Questions? Email us at{" "}
        <a href="mailto:hello@prestokit.com" className="text-[#10b981]">
          hello@prestokit.com
        </a>
      </p>
    </div>
  );
}

export default function ListingAISuccess() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 rounded-full border-2 border-[#10b981] border-t-transparent" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

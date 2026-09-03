import { NextRequest, NextResponse } from "next/server";
import { RESERVED_WORDS, MIN_LENGTH, MAX_LENGTH, quoteShortHandle } from "@/app/lib/config";

// A small fixed set of "already taken" handles so the demo has
// something to reject besides reserved words. In production this
// would be a lookup against the DNS zone / database.
const TAKEN = new Set([
  "alex", "sam", "jordan", "kai", "nova", "leo", "max", "eve",
  "dev", "code", "shop", "team", "hello", "me", "you", "ai",
]);

const HANDLE_PATTERN = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

type CheckResult = {
  handle: string;
  valid: boolean;
  available: boolean;
  reason?: string;
  tier: "standard" | "premium";
  price: number;
};

function evaluate(raw: string): CheckResult {
  const handle = raw.trim().toLowerCase();

  if (handle.length < MIN_LENGTH) {
    return { handle, valid: false, available: false, reason: `Must be at least ${MIN_LENGTH} characters.`, tier: "standard", price: 0 };
  }
  if (handle.length > MAX_LENGTH) {
    return { handle, valid: false, available: false, reason: `Must be ${MAX_LENGTH} characters or fewer.`, tier: "standard", price: 0 };
  }
  if (!HANDLE_PATTERN.test(handle)) {
    return {
      handle,
      valid: false,
      available: false,
      reason: "Use lowercase letters, numbers, and hyphens only. Can't start or end with a hyphen.",
      tier: "standard",
      price: 0,
    };
  }
  if (handle.includes("--")) {
    return { handle, valid: false, available: false, reason: "No consecutive hyphens.", tier: "standard", price: 0 };
  }
  if (RESERVED_WORDS.includes(handle)) {
    return { handle, valid: false, available: false, reason: "This handle is reserved for internal use.", tier: "standard", price: 0 };
  }

  const tier: "standard" | "premium" = handle.length <= 3 ? "premium" : "standard";
  const price = tier === "premium" ? quoteShortHandle(handle) : 12;

  if (TAKEN.has(handle)) {
    return { handle, valid: true, available: false, reason: "Already claimed.", tier, price };
  }

  return { handle, valid: true, available: true, tier, price };
}

export async function GET(req: NextRequest) {
  const handle = req.nextUrl.searchParams.get("handle") ?? "";

  // Simulate real network + DNS-zone lookup latency.
  await new Promise((r) => setTimeout(r, 260 + Math.random() * 220));

  const result = evaluate(handle);
  return NextResponse.json(result, { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const handle = typeof body.handle === "string" ? body.handle : "";
  await new Promise((r) => setTimeout(r, 260 + Math.random() * 220));
  const result = evaluate(handle);
  return NextResponse.json(result, { status: 200 });
}

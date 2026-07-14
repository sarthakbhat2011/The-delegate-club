import { NextResponse } from "next/server";
import { z } from "zod";

// In-memory rate limiting map for basic protection.
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

const applicationSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting & Brute Force Protection
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 5;

    let rateLimitInfo = rateLimitMap.get(ip);
    
    if (!rateLimitInfo || now > rateLimitInfo.resetTime) {
      rateLimitInfo = { count: 1, resetTime: now + windowMs };
    } else {
      rateLimitInfo.count++;
      if (rateLimitInfo.count > maxRequests) {
        return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
      }
    }
    rateLimitMap.set(ip, rateLimitInfo);

    // 2. Input Validation
    const body = await req.json();
    const result = applicationSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json({ error: "Invalid input data", details: result.error.issues }, { status: 400 });
    }

    const { fullName, email } = result.data;

    // 3. Mock Database operation
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate success
    return NextResponse.json({ success: true, id: "mock-id-123" }, { status: 201 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

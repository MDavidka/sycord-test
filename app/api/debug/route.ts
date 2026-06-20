import { NextResponse } from "next/server";
import { dokployHealthCheck } from "@/lib/dokploy";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await dokployHealthCheck();

  if (result.ok) {
    return NextResponse.json({
      status: "ok",
      message: "Dokploy API is reachable and responding.",
      data: result.data,
    });
  }

  return NextResponse.json({
    status: "error",
    message: result.error?.message || "Dokploy API is not reachable.",
    code: result.error?.code || "UNKNOWN",
    configured: !!process.env.DOKPLOY_API_KEY,
    apiUrl: process.env.DOKPLOY_API_URL || "https://sycord.site/api",
  }, { status: result.status || 503 });
}

import { NextResponse } from "next/server";
import { dokployHealth, getDokployConfig } from "@/lib/dokploy";

export async function GET() {
  const config = getDokployConfig();
  const health = await dokployHealth();

  return NextResponse.json({
    ready: health.ready,
    message: health.message,
    config: {
      baseUrl: config.baseUrl,
      apiKeyConfigured: config.hasKey,
    },
    timestamp: new Date().toISOString(),
  });
}

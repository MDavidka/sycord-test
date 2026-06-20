const DOKPLOY_BASE_URL = process.env.DOKPLOY_URL || "http://localhost:3000";
const DOKPLOY_API_KEY = process.env.DOKPLOY_API_KEY || "";

interface DokployResponse<T = unknown> {
  ok: boolean;
  status: number;
  data?: T;
  error?: { code: string; message: string; issues?: unknown[] };
}

async function dokployRequest<T = unknown>(
  method: "GET" | "POST",
  path: string,
  body?: Record<string, unknown>,
  query?: Record<string, string>,
  formData?: FormData,
  options?: { noAuth?: boolean }
): Promise<DokployResponse<T>> {
  const url = new URL(`${DOKPLOY_BASE_URL}/api${path}`);
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, v);
    });
  }

  const headers: Record<string, string> = { accept: "application/json" };
  if (!options?.noAuth && DOKPLOY_API_KEY) {
    headers["x-api-key"] = DOKPLOY_API_KEY;
  }

  let fetchBody: FormData | string | undefined;
  if (formData) {
    fetchBody = formData;
  } else if (body) {
    headers["Content-Type"] = "application/json";
    fetchBody = JSON.stringify(body);
  }

  try {
    const res = await fetch(url.toString(), { method, headers, body: fetchBody });
    const json = await res.json().catch(() => null);
    if (res.ok) {
      return { ok: true, status: res.status, data: json as T };
    }
    return { ok: false, status: res.status, error: json as DokployResponse["error"] };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: { code: "NETWORK_ERROR", message: err instanceof Error ? err.message : "Unknown network error" },
    };
  }
}

export async function dokployHealth(): Promise<{ ready: boolean; message: string }> {
  const result = await dokployRequest("GET", "/project.all");
  if (result.ok) return { ready: true, message: `Dokploy API reachable at ${DOKPLOY_BASE_URL}` };
  if (result.status === 401) return { ready: true, message: `Dokploy API reachable at ${DOKPLOY_BASE_URL} (auth required)` };
  return { ready: false, message: result.error?.message || "Dokploy API unreachable" };
}

export function getDokployConfig() {
  return { baseUrl: DOKPLOY_BASE_URL, hasKey: !!DOKPLOY_API_KEY };
}

export { dokployRequest, DOKPLOY_BASE_URL, DOKPLOY_API_KEY };
export type { DokployResponse };

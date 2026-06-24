const DOKPLOY_API_URL = process.env.DOKPLOY_API_URL || "https://sycord.site/api";
const DOKPLOY_API_KEY = process.env.DOKPLOY_API_KEY || "";

export interface DokployResponse<T = unknown> {
  ok: boolean;
  status: number;
  data?: T;
  error?: {
    code: string;
    message: string;
    issues?: unknown[];
  };
}

async function dokployRequest<T = unknown>(
  method: "GET" | "POST",
  path: string,
  body?: Record<string, unknown>,
  query?: Record<string, string>
): Promise<DokployResponse<T>> {
  if (!DOKPLOY_API_KEY) {
    return {
      ok: false,
      status: 401,
      error: {
        code: "MISSING_API_KEY",
        message: "DOKPLOY_API_KEY environment variable is not set.",
      },
    };
  }

  const url = new URL(`${DOKPLOY_API_URL}/${path}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value);
      }
    });
  }

  try {
    const headers: Record<string, string> = {
      "x-api-key": DOKPLOY_API_KEY,
      accept: "application/json",
    };

    if (body) {
      headers["content-type"] = "application/json";
    }

    const res = await fetch(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = res.headers.get("content-type") || "";
    let data: unknown = null;

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: {
          code: res.status === 400 ? "BAD_REQUEST"
            : res.status === 401 ? "UNAUTHORIZED"
            : res.status === 403 ? "FORBIDDEN"
            : res.status === 404 ? "NOT_FOUND"
            : "INTERNAL_SERVER_ERROR",
          message: typeof data === "object" && data !== null && "message" in data
            ? String((data as Record<string, unknown>).message)
            : res.statusText,
          issues: typeof data === "object" && data !== null && "issues" in data
            ? (data as Record<string, unknown>).issues as unknown[]
            : undefined,
        },
      };
    }

    return { ok: true, status: res.status, data: data as T };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: {
        code: "NETWORK_ERROR",
        message: err instanceof Error ? err.message : "Network request failed",
      },
    };
  }
}

export async function dokployGet<T = unknown>(
  path: string,
  query?: Record<string, string>
): Promise<DokployResponse<T>> {
  return dokployRequest<T>("GET", path, undefined, query);
}

export async function dokployPost<T = unknown>(
  path: string,
  body?: Record<string, unknown>
): Promise<DokployResponse<T>> {
  return dokployRequest<T>("POST", path, body);
}

export async function dokployHealthCheck(): Promise<DokployResponse<unknown>> {
  return dokployGet("project.all");
}

export { DOKPLOY_API_URL, DOKPLOY_API_KEY };

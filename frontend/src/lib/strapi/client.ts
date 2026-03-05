const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface FetchOptions {
  path: string;
  params?: Record<string, string>;
  revalidate?: number;
}

export async function strapiGet<T>(options: FetchOptions): Promise<T | null> {
  const { path, params = {}, revalidate = 60 } = options;

  const url = new URL(`/api${path}`, STRAPI_URL);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (STRAPI_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  }

  try {
    const res = await fetch(url.toString(), {
      headers,
      next: { revalidate },
    });

    if (!res.ok) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[Strapi] ${res.status} ${res.statusText} — ${path}`);
      }
      return null;
    }

    return (await res.json()) as T;
  } catch {
    // Strapi is unreachable — fall back to constants
    if (process.env.NODE_ENV === "development") {
      console.warn(`[Strapi] Unreachable — ${path}`);
    }
    return null;
  }
}

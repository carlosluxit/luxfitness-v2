const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/** Convert a relative Strapi media URL to an absolute URL */
export function strapiMediaUrl(
  media: { url: string } | null | undefined
): string | null {
  if (!media?.url) return null;
  if (media.url.startsWith("http")) return media.url;
  return `${STRAPI_URL}${media.url}`;
}

/** Unwrap a Strapi collection response into a plain array */
export function normalizeCollection<T>(
  response: { data: T[] } | null
): T[] {
  if (!response?.data) return [];
  return response.data;
}

/** Unwrap a Strapi single-type response into a plain object */
export function normalizeSingle<T>(
  response: { data: T } | null
): T | null {
  if (!response?.data) return null;
  return response.data;
}

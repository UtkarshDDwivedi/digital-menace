/**
 * Resolves the YouTube OAuth callback redirect URI.
 * - In local development: uses YOUTUBE_REDIRECT_URI (or falls back to localhost)
 * - In production (Vercel): ensures a production URL is used (preventing localhost leakage)
 */
export function getYouTubeRedirectUri(request: Request): string {
  const envUri = process.env.YOUTUBE_REDIRECT_URI;
  const isProduction =
    process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL);

  if (envUri) {
    // If deployed to production but env var was mistakenly copied as localhost,
    // automatically derive from the incoming request's production origin.
    if (isProduction && envUri.includes("localhost")) {
      return new URL("/api/youtube/callback", request.url).toString();
    }
    return envUri;
  }

  return new URL("/api/youtube/callback", request.url).toString();
}


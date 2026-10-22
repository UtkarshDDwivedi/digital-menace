/**
 * Resolves the YouTube OAuth callback redirect URI.
 * Directly uses process.env.YOUTUBE_REDIRECT_URI (configured in .env.local and Vercel).
 */
export function getYouTubeRedirectUri(request?: Request): string {
  const envUri = process.env.YOUTUBE_REDIRECT_URI?.trim();
  if (envUri) {
    return envUri;
  }

  // Fallback only if the environment variable is not defined:
  if (request) {
    const forwardedHost = request.headers.get("x-forwarded-host");
    const host =
      forwardedHost ||
      request.headers.get("host") ||
      process.env.VERCEL_URL;

    if (host) {
      const isLocalhost =
        host.includes("localhost") || host.includes("127.0.0.1");
      const proto = isLocalhost ? "http" : "https";
      const cleanHost = host.replace(/^https?:\/\//, "");
      return `${proto}://${cleanHost}/api/youtube/callback`;
    }
  }

  return "http://localhost:3000/api/youtube/callback";
}


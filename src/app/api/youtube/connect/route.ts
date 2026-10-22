import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth/server";
import { getYouTubeRedirectUri } from "@/lib/youtube";

const STATE_COOKIE = "youtube_oauth_state";

export async function GET(request: Request) {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    return NextResponse.redirect(
      new URL("/auth/sign-in?callbackURL=%2Fyoutube", request.url),
    );
  }

  const clientId = process.env.YOUTUBE_CLIENT_ID;
  const redirectUri = getYouTubeRedirectUri(request);
  console.log("[YouTube OAuth Connect] Using redirectUri:", redirectUri);

  if (!clientId) {
    return NextResponse.json(
      { error: "YOUTUBE_CLIENT_ID environment variable is missing." },
      { status: 500 },
    );
  }

  const state = randomBytes(32).toString("hex");
  const cookieStore = await cookies();

  cookieStore.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/youtube/callback",
    maxAge: 10 * 60,
  });

  const googleUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");

  googleUrl.searchParams.set("client_id", clientId);
  googleUrl.searchParams.set("redirect_uri", redirectUri);
  googleUrl.searchParams.set("response_type", "code");
  googleUrl.searchParams.set(
    "scope",
    "https://www.googleapis.com/auth/youtube.readonly",
  );
  googleUrl.searchParams.set("access_type", "offline");
  googleUrl.searchParams.set("include_granted_scopes", "true");
  googleUrl.searchParams.set("state", state);
  googleUrl.searchParams.set("prompt", "consent");

  return NextResponse.redirect(googleUrl);
}

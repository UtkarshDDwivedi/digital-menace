import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth/server";
import { db } from "@/db";
import { connectedAccounts } from "@/db/schema";
import { getYouTubeRedirectUri } from "@/lib/youtube";

const STATE_COOKIE = "youtube_oauth_state";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const error = requestUrl.searchParams.get("error");
  const code = requestUrl.searchParams.get("code");
  const state = requestUrl.searchParams.get("state");

  if (error) {
    return NextResponse.redirect(
      new URL(`/youtube?error=${encodeURIComponent(error)}`, request.url),
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      new URL("/youtube?error=missing_code_or_state", request.url),
    );
  }

  const cookieStore = await cookies();
  const savedState = cookieStore.get(STATE_COOKIE)?.value;

  // Clear the state cookie
  cookieStore.set(STATE_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/youtube/callback",
    maxAge: 0,
  });

  if (!savedState || savedState !== state) {
    return NextResponse.redirect(
      new URL("/youtube?error=invalid_state", request.url),
    );
  }

  const { data: session } = await auth.getSession();

  if (!session?.user) {
    return NextResponse.redirect(
      new URL("/auth/sign-in?callbackURL=%2Fyoutube", request.url),
    );
  }

  const clientId = process.env.YOUTUBE_CLIENT_ID;
  const clientSecret = process.env.YOUTUBE_CLIENT_SECRET;
  const redirectUri = getYouTubeRedirectUri(request);
  console.log("[YouTube OAuth Callback] Using redirectUri:", redirectUri);

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(
      new URL("/youtube?error=missing_credentials", request.url),
    );
  }

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errText = await tokenResponse.text();
      console.error("YouTube token exchange failed:", errText);
      return NextResponse.redirect(
        new URL("/youtube?error=token_exchange_failed", request.url),
      );
    }

    const tokens = (await tokenResponse.json()) as {
      access_token: string;
      refresh_token?: string;
      expires_in?: number;
      scope?: string;
      token_type?: string;
    };

    let platformUserId = session.user.id;
    let username = session.user.name || session.user.email || "YouTube User";

    const channelResponse = await fetch(
      "https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      },
    );

    if (channelResponse.ok) {
      const channelData = (await channelResponse.json()) as {
        items?: Array<{
          id: string;
          snippet?: {
            title?: string;
            customUrl?: string;
          };
        }>;
      };

      if (channelData.items && channelData.items.length > 0) {
        const item = channelData.items[0];
        platformUserId = item.id;
        username = item.snippet?.customUrl || item.snippet?.title || username;
      }
    }

    const tokenExpiresAt = tokens.expires_in
      ? new Date(Date.now() + tokens.expires_in * 1000)
      : null;

    await db
      .insert(connectedAccounts)
      .values({
        userId: session.user.id,
        platform: "youtube",
        platformUserId,
        username,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        tokenExpiresAt,
        scopes: tokens.scope,
      })
      .onConflictDoUpdate({
        target: [connectedAccounts.userId, connectedAccounts.platform],
        set: {
          platformUserId,
          username,
          accessToken: tokens.access_token,
          ...(tokens.refresh_token
            ? { refreshToken: tokens.refresh_token }
            : {}),
          tokenExpiresAt,
          scopes: tokens.scope,
          updatedAt: new Date(),
        },
      });

    return NextResponse.redirect(
      new URL("/youtube?connected=true", request.url),
    );
  } catch (err) {
    console.error("YouTube OAuth callback error:", err);
    return NextResponse.redirect(
      new URL("/youtube?error=callback_failed", request.url),
    );
  }
}

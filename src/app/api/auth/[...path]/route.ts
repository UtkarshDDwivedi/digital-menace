import { auth } from "@/lib/auth/server";
import { NextRequest, NextResponse } from "next/server";

const handlers = auth.handler();

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
export const PATCH = handlers.PATCH;

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const isSignOut = path && path.join("/") === "sign-out";

  let response: Response;
  try {
    response = await handlers.POST(request, context);
  } catch (err) {
    console.error("Error in auth POST handler:", err);
    if (isSignOut) {
      response = NextResponse.json({ success: true });
    } else {
      throw err;
    }
  }

  // If this is sign-out, ensure all session cookies are expired on the client regardless of upstream status
  if (isSignOut) {
    const res = new Response(response.body, {
      status:
        response.status >= 200 && response.status < 400
          ? response.status
          : 200,
      headers: new Headers(response.headers),
    });

    const cookiesToClear = [
      "__Secure-neon-auth.session_token",
      "__Secure-neon-auth.local.session_data",
      "__Secure-neon-auth.session_challenge",
      "neon-auth.session_token",
      "neon-auth.local.session_data",
      "better-auth.session_token",
      "better-auth.session_data",
    ];

    for (const cookieName of cookiesToClear) {
      res.headers.append(
        "Set-Cookie",
        `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax`
      );
    }

    return res;
  }

  return response;
}

import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { auth } from "@/lib/auth/server";
import { db } from "@/db";
import { connectedAccounts } from "@/db/schema";

export async function POST() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1. Fetch current access token to revoke it with Google (best-effort)
  const [account] = await db
    .select({
      accessToken: connectedAccounts.accessToken,
    })
    .from(connectedAccounts)
    .where(
      and(
        eq(connectedAccounts.userId, session.user.id),
        eq(connectedAccounts.platform, "youtube"),
      ),
    )
    .limit(1);

  if (account?.accessToken) {
    try {
      await fetch(
        `https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(account.accessToken)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
    } catch (err) {
      console.warn("Failed to revoke token with Google:", err);
    }
  }

  // 2. Delete the record from connectedAccounts
  await db
    .delete(connectedAccounts)
    .where(
      and(
        eq(connectedAccounts.userId, session.user.id),
        eq(connectedAccounts.platform, "youtube"),
      ),
    );

  return NextResponse.json({ success: true });
}

export const DELETE = POST;


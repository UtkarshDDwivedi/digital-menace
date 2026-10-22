import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { auth } from "@/lib/auth/server";
import { db } from "@/db";
import { connectedAccounts } from "@/db/schema";

export async function GET() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    return NextResponse.json({
      isConnected: false,
      account: null,
    });
  }

  const [account] = await db
    .select({
      id: connectedAccounts.id,
      platformUserId: connectedAccounts.platformUserId,
      username: connectedAccounts.username,
      createdAt: connectedAccounts.createdAt,
    })
    .from(connectedAccounts)
    .where(
      and(
        eq(connectedAccounts.userId, session.user.id),
        eq(connectedAccounts.platform, "youtube"),
      ),
    )
    .limit(1);

  return NextResponse.json({
    isConnected: Boolean(account),
    account: account ?? null,
  });
}


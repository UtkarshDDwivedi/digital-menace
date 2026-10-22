import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { SiYoutube } from "@icons-pack/react-simple-icons";
import { ArrowLeft, CheckCircle2, Shield } from "lucide-react";

import { auth } from "@/lib/auth/server";
import { db } from "@/db";
import { connectedAccounts } from "@/db/schema";
import { SignOutButton } from "@/components/auth/sign-out-button";
import DisconnectYouTubeButton from "@/components/DisconnectYouTubeButton";
import ProfileMenu from "@/components/auth/profile-menu";

async function AccountContent() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  const [youtubeAccount] = await db
    .select()
    .from(connectedAccounts)
    .where(
      and(
        eq(connectedAccounts.userId, session.user.id),
        eq(connectedAccounts.platform, "youtube"),
      ),
    )
    .limit(1);

  return (
    <div className="grow flex flex-col min-h-screen">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 md:px-8 bg-background/85 backdrop-blur-md border-b border-black/10 shadow-sm transition-all">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-bold shadow-[2px_2px_0px_#171717] transition hover:bg-neutral-50 active:translate-y-0.5"
        >
          <ArrowLeft size={16} />
          <span>Platforms</span>
        </Link>
        <ProfileMenu />
      </header>

      <main className="mx-auto w-full max-w-2xl p-4 sm:p-6 pb-16">
        <div className="rounded-[2rem] border-2 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_#171717]">
          {/* Header */}
          <div className="border-b border-neutral-100 pb-5">
            <span className="rounded-md border border-black/20 bg-neutral-100 px-2.5 py-0.5 text-xs font-black uppercase tracking-wider text-black">
              User Profile
            </span>
            <h1 className="text-3xl font-black text-black mt-2">
              {session.user.name || "Your Account"}
            </h1>
            <p className="text-sm text-neutral-500 mt-1">{session.user.email}</p>
          </div>

          {/* Connected Platforms */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-black text-black flex items-center gap-2">
                <Shield size={18} />
                <span>Connected Platforms</span>
              </h2>
            </div>

            <div className="rounded-2xl border-2 border-black bg-neutral-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl border-2 border-black bg-[#FF5D5D] text-white shadow-[2px_2px_0px_#171717]">
                    <SiYoutube size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-black text-black">YouTube</p>
                      {youtubeAccount && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-600 bg-emerald-50 px-2 py-0.2 text-[10px] font-bold text-emerald-700">
                          <CheckCircle2 size={10} />
                          Connected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500">
                      {youtubeAccount
                        ? `@${youtubeAccount.username}`
                        : "Not connected"}
                    </p>
                  </div>
                </div>

                <div>
                  {youtubeAccount ? (
                    <DisconnectYouTubeButton
                      redirectOnDisconnect={false}
                      className="inline-flex items-center gap-1 rounded-full border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-100 hover:text-red-700 active:translate-y-0.5"
                    />
                  ) : (
                    <a
                      href="/api/youtube/connect"
                      className="inline-flex items-center gap-1 rounded-full border-2 border-black bg-black px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-neutral-800 active:translate-y-0.5 shadow-[2px_2px_0px_#171717]"
                    >
                      Connect
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sign Out */}
          <div className="mt-8 border-t border-neutral-100 pt-6 flex items-center justify-between">
            <p className="text-xs text-neutral-500">
              Session ID: <span className="font-mono">{session.user.id.slice(0, 8)}...</span>
            </p>
            <SignOutButton />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-2xl p-8">
          <p className="text-muted-foreground">Loading your account...</p>
        </main>
      }
    >
      <AccountContent />
    </Suspense>
  );
}

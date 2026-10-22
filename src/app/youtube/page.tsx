import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { and, desc, eq } from "drizzle-orm";
import { SiYoutube } from "@icons-pack/react-simple-icons";
import { ArrowLeft, Flame, Clock } from "lucide-react";

import { auth } from "@/lib/auth/server";
import { db } from "@/db";
import { connectedAccounts, roastResults } from "@/db/schema";
import ProfileMenu from "@/components/auth/profile-menu";
import DisconnectYouTubeButton from "@/components/DisconnectYouTubeButton";

async function YouTubePageContent() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/auth/sign-in?callbackURL=%2Fyoutube");
  }

  const [connected] = await db
    .select()
    .from(connectedAccounts)
    .where(
      and(
        eq(connectedAccounts.userId, session.user.id),
        eq(connectedAccounts.platform, "youtube"),
      ),
    )
    .limit(1);

  // If not connected, redirect back to homepage to open the connect modal
  if (!connected) {
    redirect("/?connect=youtube");
  }

  // Fetch past YouTube roasts for this user
  const pastRoasts = await db
    .select()
    .from(roastResults)
    .where(
      and(
        eq(roastResults.userId, session.user.id),
        eq(roastResults.platform, "youtube"),
      ),
    )
    .orderBy(desc(roastResults.createdAt));

  return (
    <div className="grow flex flex-col min-h-screen">
      {/* Sticky Top Navigation */}
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

      <main className="mx-auto w-full max-w-4xl p-4 sm:p-6 pb-16">
        {/* Hero Section */}
        <div className="overflow-hidden rounded-[2.5rem] border-2 border-black bg-[#FF5D5D] p-6 sm:p-10 ">
          {/* Header */}
          <div className="flex items-center gap-4">
            <span className="flex size-14 sm:size-16 items-center justify-center rounded-2xl border-2 border-black bg-white shadow-[3px_3px_0px_#171717]">
              <SiYoutube size={36} className="text-[#FF0000]" />
            </span>
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
                YouTube Roasts
              </h1>
            </div>
          </div>

          {/* Action Row: Connected Channel Card beside Generate Roast Button */}
          <div className="mt-8 flex flex-col md:flex-row md:items-stretch justify-between gap-4">
            {/* Account Disconnect Card */}
            <div className="flex items-center justify-center sm:justify-between gap-3 sm:gap-4 rounded-2xl border-2 border-black bg-white px-4 py-3 sm:px-5 sm:py-4 shadow-[4px_4px_0px_#171717] grow">
              <div className="min-w-0 flex items-center">
                <p className="text-base sm:text-lg font-black text-black truncate leading-none">
                  {connected.username}
                </p>
              </div>
              <div className="shrink-0 flex items-center">
                <DisconnectYouTubeButton className="inline-flex items-center gap-1.5 rounded-xl border-2 border-black bg-neutral-100 px-3 py-2 text-xs font-bold text-neutral-700 shadow-[2px_2px_0px_#171717] transition hover:bg-red-50 hover:text-red-600 hover:border-red-600 active:translate-y-0.5" />
              </div>
            </div>

            {/* Generate Roast Button */}
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl border-2 border-black bg-black px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg font-black text-white shadow-[4px_4px_0px_#171717] transition hover:bg-neutral-800 active:translate-y-0.5 shrink-0"
            >
              <Flame size={22} className="text-orange-400" />
              <span>Generate New Roast</span>
            </button>
          </div>
        </div>

        {/* Past Roasts Section */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-black text-black flex items-center gap-2">
              <Clock size={22} />
              <span>Past Roasts</span>
            </h3>
            <span className="text-xs font-bold text-neutral-500">
              {pastRoasts.length} {pastRoasts.length === 1 ? "roast" : "roasts"}
            </span>
          </div>

          {pastRoasts.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-neutral-300 bg-white/60 p-10 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border-2 border-neutral-300 bg-neutral-100 text-neutral-400 mb-3">
                <Flame size={26} />
              </div>
              <h4 className="text-lg font-bold text-black">No roasts yet</h4>
              <p className="text-sm text-neutral-500 mt-1 max-w-md mx-auto">
                You haven&apos;t generated any YouTube roasts yet. Click
                &ldquo;Generate New Roast&rdquo; above to get your first roast!
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {pastRoasts.map((roast) => (
                <div
                  key={roast.id}
                  className="rounded-2xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_#171717] flex flex-col justify-between"
                >
                  <p className="text-sm font-medium leading-relaxed text-black/90">
                    &ldquo;{roast.roast}&rdquo;
                  </p>
                  <p className="text-xs text-neutral-400 font-mono mt-4">
                    {new Date(roast.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default function YouTubePage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center p-8">
          <p className="text-sm font-bold text-neutral-600">
            Loading your YouTube roasts...
          </p>
        </main>
      }
    >
      <YouTubePageContent />
    </Suspense>
  );
}

import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { and, desc, eq } from "drizzle-orm";
import { SiYoutube } from "@icons-pack/react-simple-icons";
import {
  ArrowLeft,
  Flame,
  Clock,
  Sparkles,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

import { auth } from "@/lib/auth/server";
import { db } from "@/db";
import { connectedAccounts, roastResults } from "@/db/schema";
import ProfileMenu from "@/components/auth/profile-menu";
import DisconnectYouTubeButton from "@/components/DisconnectYouTubeButton";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function YouTubePageContent({ searchParams }: PageProps) {
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

  const params = await searchParams;
  const isJustConnected = params.connected === "true";

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
      {/* Top Navigation */}
      <header className="flex items-center justify-between m-4 md:mx-8">
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
        {/* Success Alert if freshly linked */}
        {isJustConnected && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border-2 border-black bg-emerald-100 p-4 text-emerald-950 shadow-[4px_4px_0px_#171717]">
            <CheckCircle2
              size={22}
              className="shrink-0 text-emerald-700 mt-0.5"
            />
            <div className="text-sm">
              <p className="font-bold">YouTube Account Connected!</p>
              <p className="text-xs text-emerald-800 mt-0.5">
                Successfully connected as <strong>{connected.username}</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="overflow-hidden rounded-[2.5rem] border-2 border-black bg-[#FF5D5D] p-6 sm:p-10 shadow-[8px_8px_0px_#171717]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="flex size-16 items-center justify-center rounded-2xl border-2 border-black bg-white shadow-[3px_3px_0px_#171717]">
                <SiYoutube size={36} className="text-[#FF0000]" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md border border-black/20 bg-white/70 px-2 py-0.5 text-xs font-black uppercase tracking-wider text-black">
                    Platform 01
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-black/20 bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-800">
                    <span className="size-1.5 rounded-full bg-emerald-600" />
                    Connected
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight mt-1">
                  YouTube Roasts
                </h1>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-black bg-white p-3.5 shadow-[3px_3px_0px_#171717] sm:max-w-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                Connected Channel
              </p>
              <p className="text-sm font-black text-black truncate mt-0.5">
                {connected.username}
              </p>
              <div className="flex items-center gap-3 mt-2.5 pt-2 border-t border-neutral-100">
                <a
                  href="/api/youtube/connect"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-black transition"
                >
                  <RefreshCw size={12} />
                  <span>Reconnect</span>
                </a>
                <span className="text-neutral-300">|</span>
                <DisconnectYouTubeButton />
              </div>
            </div>
          </div>

          {/* Roast Engine Card (Placeholder for generating new roasts) */}
          <div className="mt-8 rounded-3xl border-2 border-black bg-white p-6 sm:p-8 shadow-[5px_5px_0px_#171717]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                  <Sparkles size={14} className="text-amber-600" />
                  Roast Engine
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-black mt-2">
                  Ready to Roast
                </h2>
                <p className="text-sm text-neutral-600 mt-1 max-w-lg">
                  Analyze your recent watch history, favorite creators, and questionable 3 AM rabbit holes.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-black bg-black px-6 py-4 text-base font-black text-white shadow-[4px_4px_0px_#171717] transition hover:bg-neutral-800 active:translate-y-0.5 shrink-0"
              >
                <Flame size={20} className="text-orange-400" />
                <span>Generate New Roast</span>
              </button>
            </div>
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

export default function YouTubePage({ searchParams }: PageProps) {
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
      <YouTubePageContent searchParams={searchParams} />
    </Suspense>
  );
}

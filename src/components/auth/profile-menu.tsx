"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  LogIn,
  LogOut,
  UserRound,
  UserPlus,
} from "lucide-react";

import { authClient } from "@/lib/auth/client";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user ?? null;

  const initial = (user?.name || user?.email || "?").charAt(0).toUpperCase();

  async function handleSignOut() {
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Failed to sign out:", error);
        return;
      }

      setIsOpen(false);
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Failed to sign out:", error);
    } finally {
      setIsSigningOut(false);
    }
  }

  if (isPending) {
    return (
      <div
        className="h-12 w-12 animate-pulse rounded-xl bg-neutral-200"
        aria-label="Loading profile"
      />
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Open profile menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex h-12 items-center gap-2 rounded-xl border border-neutral-200 bg-white p-1.5 text-black transition hover:bg-neutral-50"
      >
        {user ? (
          user.image ? (
            // Using a regular image URL avoids needing to configure
            // external image domains in next.config.ts.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name || "Profile picture"}
              className="h-9 w-9 rounded-lg object-cover"
            />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-sm font-bold text-white">
              {initial}
            </span>
          )
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">
            <UserRound size={20} />
          </span>
        )}

        <ChevronDown
          size={16}
          className={`mr-1 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close profile menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
          />

          <div
            role="menu"
            className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-neutral-200 bg-white p-2 text-black shadow-lg"
          >
            {user ? (
              <>
                <div className="border-b border-neutral-100 px-3 py-3">
                  <p className="truncate text-sm font-semibold">
                    {user.name || "Your account"}
                  </p>
                  <p className="truncate text-xs text-neutral-500">
                    {user.email}
                  </p>
                </div>

                <div className="py-1">
                  <Link
                    href="/account"
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-neutral-100"
                  >
                    <UserRound size={17} />
                    My account
                  </Link>
                </div>

                <div className="border-t border-neutral-100 pt-1">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <LogOut size={17} />
                    {isSigningOut ? "Signing out..." : "Sign out"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="px-3 py-3">
                  <p className="text-sm font-semibold">
                    Welcome to Digital Menace
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Sign in to save your roasts and view your history.
                  </p>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/auth/sign-in"
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg bg-black px-3 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
                  >
                    <LogIn size={17} />
                    Sign in
                  </Link>

                  <Link
                    href="/auth/sign-up"
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-neutral-100"
                  >
                    <UserPlus size={17} />
                    Create an account
                  </Link>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

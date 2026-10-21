"use client";

import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.replace("/auth/sign-in");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded-md bg-black px-4 py-2 text-white hover:bg-neutral-800"
    >
      Sign out
    </button>
  );
}
import { Suspense } from "react";
import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/auth/sign-out-button";

async function AccountContent() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  return (
    <main className="mx-auto w-full max-w-3xl p-8">
      <h1 className="text-3xl font-bold">
        Welcome, {session.user.name || session.user.email}
      </h1>

      <p className="mt-2 text-muted-foreground">
        You are successfully signed in.
      </p>

      <p className="mt-4 text-sm text-muted-foreground">
        Your authentication session is working.
      </p>

      <SignOutButton />
    </main>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-3xl p-8">
          <p className="text-muted-foreground">
            Loading your account...
          </p>
        </main>
      }
    >
      <AccountContent />
    </Suspense>
  );
}
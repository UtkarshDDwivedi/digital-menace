"use client";

import { NeonAuthUIProvider } from "@neondatabase/auth-ui";
import { authClient } from "@/lib/auth/client";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <NeonAuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => router.refresh()}
      defaultTheme="light"
      social={{
        providers: ["google"],
      }}
    >
      {children}
    </NeonAuthUIProvider>
  );
}
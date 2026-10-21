import { Suspense } from "react";
import { AuthView } from "@neondatabase/auth-ui";

function AuthPageContent({ params }: { params: Promise<{ path: string }> }) {
  return <AuthViewContent params={params} />;
}

async function AuthViewContent({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  return <AuthView path={path} />;
}

export default function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">
            Loading authentication...
          </p>
        }
      >
        <AuthPageContent params={params} />
      </Suspense>
    </main>
  );
}

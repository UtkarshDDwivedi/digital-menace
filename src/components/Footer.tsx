import Link from "next/link";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="mt-auto border-t border-black/10 px-6 py-5 text-neutral-600">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <p className="text-xs font-bold text-black">
            © {currentYear} Digital Menace. All rights reserved.
          </p>
          <p className="text-[11px] text-neutral-500">
            Created for entertainment and satirical purposes.
          </p>
        </div>

        <nav
          aria-label="Legal navigation"
          className="flex items-center gap-6 text-xs font-bold"
        >
          <Link
            href="/privacy-policy"
            className="text-neutral-600 transition hover:text-black hover:underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          <span className="text-neutral-300">|</span>
          <Link
            href="/terms-of-service"
            className="text-neutral-600 transition hover:text-black hover:underline underline-offset-4"
          >
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}

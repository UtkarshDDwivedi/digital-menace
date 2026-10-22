import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, ExternalLink } from "lucide-react";
import ProfileMenu from "@/components/auth/profile-menu";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Digital Menace",
  description:
    "Privacy Policy for Digital Menace explaining how user data is collected, used, and protected.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 22, 2026";

  return (
    <div className="grow flex flex-col min-h-screen">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 md:px-8 bg-background/85 backdrop-blur-md border-b border-black/10 shadow-sm transition-all">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-bold shadow-[2px_2px_0px_#171717] transition hover:bg-neutral-50 active:translate-y-0.5"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
        <ProfileMenu />
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-4xl p-4 sm:p-8 pb-16">
        <div className="rounded-[2.5rem] border-2 border-black bg-white p-6 sm:p-12 shadow-[8px_8px_0px_#171717]">
          {/* Document Header */}
          <div className="border-b-2 border-black/10 pb-8">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-black/20 bg-neutral-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-black">
              <ShieldCheck size={14} className="text-emerald-600" />
              Legal Document
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mt-3">
              Privacy Policy
            </h1>
            <p className="text-sm font-medium text-neutral-500 mt-2">
              Last updated: {lastUpdated} • Operated by Utkarsh Dhar (Individual Developer)
            </p>
          </div>

          {/* Policy Body */}
          <article className="mt-8 space-y-8 text-neutral-800 leading-relaxed text-sm sm:text-base">
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                1. Introduction
              </h2>
              <p>
                Welcome to <strong>Digital Menace</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;),
                operated by independent developer Utkarsh Dhar, based in India. Digital Menace is an
                entertainment application that uses artificial intelligence to generate satirical,
                humorous roasts based on publicly accessible profile and activity data from platforms you
                choose to connect.
              </p>
              <p>
                We respect your privacy and are committed to protecting any information you share with us.
                This Privacy Policy outlines how your data is collected, processed, stored, and protected
                when you use our service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                2. Information We Collect
              </h2>
              <p>We collect only the minimum information necessary to provide the service:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Account & Authentication Information:</strong> When you register or sign in
                  via Neon Auth (including social login such as Google Sign-In), we receive your basic
                  profile information such as your name, email address, and profile picture.
                </li>
                <li>
                  <strong>Connected Platform Data (YouTube):</strong> When you explicitly connect your
                  YouTube account, we request read-only OAuth permissions (
                  <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs font-mono font-bold">
                    youtube.readonly
                  </code>
                  ). We receive your YouTube Channel ID, channel username/handle, and public
                  playlist or subscription metadata required to craft your roast.
                </li>
                <li>
                  <strong>Generated Roast History:</strong> The roasts created by our AI engine are saved
                  to your account along with timestamps so you can review your roast history.
                </li>
                <li>
                  <strong>Tokens and Credentials:</strong> OAuth access tokens and refresh tokens are
                  securely stored in our database so that we can communicate with the platform APIs
                  without prompting you to log in repeatedly.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                3. Third-Party API Services & Disclosures
              </h2>

              <div className="rounded-2xl border-2 border-black bg-neutral-50 p-5 space-y-3">
                <h3 className="text-lg font-black text-black">
                  YouTube API Services & Google User Data
                </h3>
                <p>
                  Digital Menace uses <strong>YouTube API Services</strong> to access public YouTube
                  channel information and viewing metadata on your behalf.
                </p>
                <p>
                  By connecting your YouTube account, you also agree to be bound by the{" "}
                  <a
                    href="https://www.youtube.com/t/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-black underline underline-offset-2 hover:text-neutral-600"
                  >
                    YouTube Terms of Service
                    <ExternalLink size={12} />
                  </a>{" "}
                  and acknowledge Google&apos;s data practices outlined in the{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-black underline underline-offset-2 hover:text-neutral-600"
                  >
                    Google Privacy Policy
                    <ExternalLink size={12} />
                  </a>
                  .
                </p>
                <p>
                  <strong>Revoking Access:</strong> You can disconnect your YouTube account inside Digital
                  Menace at any time (which immediately revokes our stored token with Google), or you can
                  revoke access directly via the{" "}
                  <a
                    href="https://myaccount.google.com/permissions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-black underline underline-offset-2 hover:text-neutral-600"
                  >
                    Google Security Settings Page
                    <ExternalLink size={12} />
                  </a>
                  .
                </p>
              </div>

              <div className="rounded-2xl border-2 border-black bg-neutral-50 p-5 space-y-3">
                <h3 className="text-lg font-black text-black">
                  Google Gemini API (AI Roasting)
                </h3>
                <p>
                  We send sanitized snippets of your public metadata (such as channel title and public
                  playlist/interest topics) to the <strong>Google Gemini API</strong> to generate
                  satirical roasts. We do not transmit sensitive personal identifiers or private messages.
                  Data sent to Gemini is processed in accordance with Google&apos;s API developer terms
                  and is not used to train models without your authorization.
                </p>
              </div>

              <div className="rounded-2xl border-2 border-black bg-neutral-50 p-5 space-y-3">
                <h3 className="text-lg font-black text-black">
                  Future Platform Integrations
                </h3>
                <p>
                  As we expand to additional platforms (such as GitHub, Spotify, Instagram, or Reddit),
                  we will only request the minimum read-only permissions necessary to evaluate public
                  activity for roast generation. Each integration will follow the same opt-in, revocable
                  OAuth consent flow.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                4. Cookies & Tracking Technologies
              </h2>
              <p>
                Digital Menace <strong>does not use any third-party analytics, tracking pixels, or
                advertising cookies</strong> (e.g., Google Analytics, Meta Pixel, PostHog, etc.).
              </p>
              <p>We use strictly essential cookies:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Session Cookies:</strong> Used by Neon Auth to maintain your signed-in state.
                </li>
                <li>
                  <strong>OAuth Security Cookies:</strong> Short-lived, HttpOnly state cookies used
                  solely to prevent Cross-Site Request Forgery (CSRF) during the OAuth connection flow.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                5. How We Use and Share Your Data
              </h2>
              <p>We use your information exclusively to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Authenticate your identity and manage your user account.</li>
                <li>Fetch your connected platform data to synthesize satirical roasts.</li>
                <li>Save and display your personal roast history within your dashboard.</li>
              </ul>
              <p className="font-bold text-black mt-2">
                We never sell, rent, monetize, or trade your personal data or connected platform data to
                advertisers, data brokers, or third parties.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                6. Data Retention and Deletion
              </h2>
              <p>
                Your account details, linked platform tokens, and generated roast history remain in our
                database for as long as your account is active and you choose not to delete them.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Disconnecting Accounts:</strong> When you click &ldquo;Disconnect&rdquo; in the
                  app, your OAuth tokens and account link are immediately and permanently removed from our
                  database and revoked with Google.
                </li>
                <li>
                  <strong>Account Deletion & Data Removal:</strong> We are introducing a direct, self-serve
                  in-app deletion button. In the meantime, or at any time, you can request immediate and
                  permanent deletion of all your personal data, connected accounts, and roast history by
                  emailing us at{" "}
                  <a
                    href="mailto:utkarshdhar05@gmail.com"
                    className="font-bold text-black underline hover:text-neutral-600"
                  >
                    utkarshdhar05@gmail.com
                  </a>
                  . We will process your deletion request promptly.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                7. Data Security
              </h2>
              <p>
                We implement industry-standard security measures, including HTTPS encryption in transit,
                serverless PostgreSQL with secure encryption at rest via Neon, and secure HttpOnly cookie
                flags to protect your information against unauthorized access, loss, or disclosure.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                8. Age & General Audience
              </h2>
              <p>
                Digital Menace is intended for a general audience. We do not knowingly collect personal
                information from children under the age of 13 (or under the applicable age of digital
                consent in your jurisdiction). If you believe a child has provided us with personal
                information, please contact us immediately, and we will take steps to delete that data.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                9. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect feature changes or legal
                requirements. Any changes will be posted on this page with an updated &ldquo;Last
                updated&rdquo; date. Your continued use of the service constitutes acceptance of any
                revisions.
              </p>
            </section>

            <section className="space-y-3 border-t-2 border-black/10 pt-6">
              <h2 className="text-xl sm:text-2xl font-black text-black flex items-center gap-2">
                <Mail size={20} />
                <span>10. Contact Us</span>
              </h2>
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or your personal
                data, please contact:
              </p>
              <div className="rounded-2xl border-2 border-black bg-neutral-50 p-4 font-mono text-sm space-y-1">
                <p>
                  <strong>Operator:</strong> Utkarsh Dhar (Individual Developer)
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:utkarshdhar05@gmail.com"
                    className="font-bold text-black underline hover:text-neutral-600"
                  >
                    utkarshdhar05@gmail.com
                  </a>
                </p>
                <p>
                  <strong>Jurisdiction:</strong> India
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}


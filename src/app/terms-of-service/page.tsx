import Link from "next/link";
import { ArrowLeft, FileText, AlertCircle, Mail, ExternalLink } from "lucide-react";
import ProfileMenu from "@/components/auth/profile-menu";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Digital Menace",
  description:
    "Terms of Service governing the use of Digital Menace AI-powered satirical roasting platform.",
};

export default function TermsOfServicePage() {
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
              <FileText size={14} className="text-black" />
              Terms of Agreement
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mt-3">
              Terms of Service
            </h1>
            <p className="text-sm font-medium text-neutral-500 mt-2">
              Last updated: {lastUpdated} • Governed by the laws of India
            </p>
          </div>

          {/* Terms Body */}
          <article className="mt-8 space-y-8 text-neutral-800 leading-relaxed text-sm sm:text-base">
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using <strong>Digital Menace</strong> (&ldquo;the Service&rdquo;),
                operated by independent developer Utkarsh Dhar (&ldquo;Developer&rdquo;, &ldquo;we&rdquo;,
                &ldquo;our&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;).
                If you do not agree with any part of these Terms, you must discontinue your use of the
                Service immediately.
              </p>
            </section>

            {/* Crucial AI Satire Box */}
            <div className="rounded-2xl border-2 border-black bg-amber-50 p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-black">
                <AlertCircle size={22} className="shrink-0" />
                <h2 className="text-xl font-black text-black">
                  2. Satire & Entertainment Disclaimer (Important)
                </h2>
              </div>
              <p className="text-neutral-800">
                Digital Menace is designed <strong>strictly for entertainment, parody, and satirical
                humor</strong>.
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-neutral-800">
                <li>
                  All &ldquo;roasts&rdquo; are generated automatically by artificial intelligence
                  (Google Gemini API) based on public metadata.
                </li>
                <li>
                  Roasts represent comedic hyperbole and <strong>do not constitute statements of fact,
                  moral judgments, professional advice, or defamatory claims</strong>.
                </li>
                <li>
                  By using this application, you acknowledge that the roasts may include playful teasing,
                  exaggeration, or sarcasm. You agree not to take the generated content seriously or
                  personally.
                </li>
              </ul>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                3. User Eligibility & Accounts
              </h2>
              <p>
                Digital Menace is available to a general audience. You must have the legal capacity to
                enter into these Terms in your jurisdiction.
              </p>
              <p>
                When creating an account or logging in, you agree to provide authentic information and
                maintain the security of your authentication session. You are responsible for any
                activities conducted through your account.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                4. Third-Party Integrations & YouTube Terms
              </h2>
              <p>
                When you connect third-party platforms (such as YouTube, or future platforms like GitHub,
                Spotify, Instagram, or Reddit), you grant Digital Menace read-only permission to retrieve
                public account metadata to produce your roast.
              </p>
              <div className="rounded-2xl border-2 border-black/10 bg-neutral-50 p-4 space-y-2">
                <p className="font-bold text-black">YouTube API Services:</p>
                <p>
                  Our application accesses YouTube Data API Services. By connecting your YouTube account,
                  you also agree to be bound by the{" "}
                  <a
                    href="https://www.youtube.com/t/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-black underline hover:text-neutral-600"
                  >
                    YouTube Terms of Service
                    <ExternalLink size={12} />
                  </a>
                  . You can revoke Digital Menace&apos;s access at any time via your account settings or
                  via{" "}
                  <a
                    href="https://myaccount.google.com/permissions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-black underline hover:text-neutral-600"
                  >
                    Google&apos;s Security Permissions
                    <ExternalLink size={12} />
                  </a>
                  .
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                5. Prohibited Conduct
              </h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>
                  Use the Service to harass, intimidate, defame, threaten, or stalk any individual.
                </li>
                <li>
                  Attempt to bypass authentication, scrape data, or disrupt the operation of the
                  Service.
                </li>
                <li>
                  Connect accounts or credentials that you do not own or do not have explicit
                  authorization to link.
                </li>
                <li>
                  Use any automated systems, bots, or unauthorized scripts to extract data or spam the
                  roast generation API.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                6. Intellectual Property
              </h2>
              <p>
                The Digital Menace name, logos, original software code, artwork, and visual design
                elements are the intellectual property of Utkarsh Dhar.
              </p>
              <p>
                All platform trademarks, logos, and brand names (e.g., YouTube, Google, Spotify, GitHub,
                Instagram, Reddit) are the property of their respective trademark holders and are used
                here solely for nominative, identification, and compatibility purposes.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                7. Data Retention & Account Deletion
              </h2>
              <p>
                Your roasts and account records are retained in our database until you delete them or
                close your account.
              </p>
              <p>
                You can disconnect any external platform at any time using the in-app controls. You can
                also request the permanent deletion of your account and all associated data by contacting{" "}
                <a
                  href="mailto:utkarshdhar05@gmail.com"
                  className="font-bold text-black underline hover:text-neutral-600"
                >
                  utkarshdhar05@gmail.com
                </a>
                . A self-serve deletion tool is also being introduced directly within your account
                dashboard.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                8. Disclaimer of Warranties
              </h2>
              <p className="uppercase text-xs sm:text-sm font-semibold text-neutral-700 bg-neutral-100 p-4 rounded-xl border border-neutral-200">
                THE SERVICE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS
                WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT
                THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, ACCURATE, OR ERROR-FREE.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                9. Limitation of Liability
              </h2>
              <p className="uppercase text-xs sm:text-sm font-semibold text-neutral-700 bg-neutral-100 p-4 rounded-xl border border-neutral-200">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE DEVELOPER BE
                LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, OR FOR
                ANY LOSS OF DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION
                WITH YOUR USE OF THE SERVICE OR ANY AI-GENERATED CONTENT.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                10. Governing Law & Jurisdiction
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of{" "}
                <strong>India</strong>, without regard to conflict of law principles. Any legal suit,
                action, or proceeding arising out of or related to these Terms or the Service shall be
                instituted exclusively within the competent courts located in India.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                11. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. When updates occur, we
                will revise the &ldquo;Last updated&rdquo; date at the top of this page. Your continued use
                of the Service following the posting of changes constitutes your acceptance of the updated
                Terms.
              </p>
            </section>

            <section className="space-y-3 border-t-2 border-black/10 pt-6">
              <h2 className="text-xl sm:text-2xl font-black text-black flex items-center gap-2">
                <Mail size={20} />
                <span>12. Contact Information</span>
              </h2>
              <p>If you have any questions about these Terms of Service, please contact us at:</p>
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
                  <strong>Location:</strong> India
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


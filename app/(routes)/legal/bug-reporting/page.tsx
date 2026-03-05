 "use client";

import Link from "next/link";
import { ArrowLeft, Turtle } from "lucide-react";
import { motion } from "framer-motion";

export default function BugReportingPage() {
  const lastUpdated = "January 1, 2026";

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary/20 selection:text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center text-white shadow-md shadow-primary/20">
              <Turtle size={18} />
            </div>
            <span>JIROSHI</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-primary flex items-center gap-2 transition-colors">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4 text-slate-900 tracking-tight text-center">
            Bug Reporting & Security Disclosure
          </h1>
          <p className="text-slate-500 mb-12 text-center">Last Updated: {lastUpdated}</p>

          <div className="prose prose-slate max-w-none space-y-10 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">
                1. How to Report Bugs or Security Issues
              </h2>
              <p className="mt-4">
                If you notice any bugs, issues, or potential security vulnerabilities while using Jiroshi, we truly
                appreciate you taking the time to let us know.
              </p>
              <p className="mt-4">
                You can report them by emailing us at{" "}
                <a href="mailto:app.jiroshi@gmail.com" className="text-primary hover:underline font-medium">
                  app.jiroshi@gmail.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">
                2. Not a Bug Bounty Program
              </h2>
              <div className="mt-4 space-y-4">
                <p>
                  It is important to understand that{" "}
                  <span className="font-semibold text-slate-900">
                    this is strictly not a bug bounty program
                  </span>
                  . While we value and appreciate responsible reports,{" "}
                  <span className="font-semibold text-slate-900">
                    there are no rewards, incentives, or monetary payouts of any kind
                  </span>{" "}
                  associated with reporting bugs or vulnerabilities.
                </p>
                <p>
                  By sending a report, you acknowledge that you are doing so voluntarily, without any expectation of
                  compensation or recognition.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">
                3. MVP Status and Scope of Fixes
              </h2>
              <div className="mt-4 space-y-4">
                <p>
                  Jiroshi is currently an{" "}
                  <span className="font-semibold text-slate-900">MVP (Minimum Viable Product)</span> and not a
                  full-fledged, production-grade platform yet.
                </p>
                <p>
                  This means our primary focus is on validating the core experience and critical flows. As a result,{" "}
                  <span className="font-semibold text-slate-900">
                    minor issues, cosmetic bugs, or smaller edge cases may be intentionally deprioritized
                  </span>{" "}
                  or not addressed immediately.
                </p>
                <p>
                  We will prioritise fixing issues that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Impact core functionality or prevent normal usage of the product.</li>
                  <li>Pose a reasonable security risk or data integrity concern.</li>
                  <li>Cause significant confusion or break critical user journeys.</li>
                </ul>
                <p>
                  Simpler bugs that can be reasonably overlooked at this MVP stage may not be fixed right away, even if
                  reported. This is a deliberate product decision while we evolve the platform.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">
                4. Responsible Behaviour
              </h2>
              <p className="mt-4">
                If you discover a security-related issue, please do not publicly disclose details before we have had a
                reasonable opportunity to investigate and address it. Avoid any actions that could harm other users,
                compromise data, or disrupt the platform.
              </p>
              <p className="mt-4">
                By reporting issues privately and responsibly, you help us improve the stability and safety of Jiroshi
                for everyone.
              </p>
            </section>

            <section className="pt-6 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Contact</h2>
              <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
                <p className="text-slate-700">
                  For all bug reports, security concerns, or questions about this page, please write to:
                </p>
                <p className="font-bold text-slate-900">Email:</p>
                <a href="mailto:app.jiroshi@gmail.com" className="text-primary hover:underline text-lg">
                  app.jiroshi@gmail.com
                </a>
              </div>
            </section>
          </div>
        </motion.div>
      </main>

      <footer className="py-12 border-t border-slate-100 bg-slate-50/50">
        <div className="container mx-auto px-4 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Jiroshi Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}


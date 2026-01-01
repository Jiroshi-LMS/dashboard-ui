"use client";

import Link from "next/link";
import { ArrowLeft, Turtle } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsPage() {
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
                    <h1 className="text-4xl font-bold mb-4 text-slate-900 tracking-tight">Terms & Conditions</h1>
                    <p className="text-slate-500 mb-12">Last Updated: {lastUpdated}</p>

                    <div className="prose prose-slate max-w-none space-y-12 text-slate-600 leading-relaxed">
                        <section>
                            <p className="text-lg">
                                These Terms & Conditions (“Terms”) govern your use of Jiroshi’s platform, APIs, and services. By accessing or using Jiroshi, you agree to these Terms.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">1. Eligibility</h2>
                            <p>You must be legally capable of entering into a binding agreement to use the platform.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">2. Platform Overview</h2>
                            <p>Jiroshi provides:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>API-based infrastructure for building course platforms</li>
                                <li>Instructor dashboards</li>
                                <li>Student authentication and enrollment systems</li>
                            </ul>
                            <p>Jiroshi does not provide a hosted frontend or marketplace.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">3. Account Responsibility</h2>
                            <p>You are responsible for:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>All activity under your account</li>
                                <li>Maintaining accurate information</li>
                                <li>Securing access credentials and API keys</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">4. API Keys & Security</h2>
                            <p>API keys are unique credentials issued to instructors. You are solely responsible for maintaining API key confidentiality.</p>
                            <p>Jiroshi is not liable for misuse, loss, or damage caused by compromised keys. Compromised keys must be rotated or revoked immediately.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">5. Content & Intellectual Property</h2>
                            <p>You retain ownership of content you upload. You grant Jiroshi a limited license to store and serve content for platform functionality.</p>
                            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 mt-6">
                                <h3 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-wider opacity-50">Content Protection Limitation</h3>
                                <p className="mb-4 font-medium">Jiroshi does not guarantee protection against copying, downloading, or redistribution of content. Absolute prevention of content theft is not possible.</p>
                                <p className="text-sm">Jiroshi shall not be held liable for unauthorized content use by third parties.</p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">6. Payments</h2>
                            <p>Jiroshi does not currently process payments. Any payment handling is the sole responsibility of instructors. Future payment features may introduce additional terms.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">7. Acceptable Use</h2>
                            <p>You agree not to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Abuse or overload the platform</li>
                                <li>Attempt unauthorized access</li>
                                <li>Use the platform for illegal or harmful activities</li>
                                <li>Circumvent rate limits or security controls</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">8. Platform Availability</h2>
                            <p>The platform is provided “as is” and “as available.”</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>No guarantee of uptime, availability, or uninterrupted access</li>
                                <li>Features may change, evolve, or be discontinued during the MVP phase</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">9. Suspension & Termination</h2>
                            <p>We reserve the right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Suspend or terminate accounts for abuse, misuse, or security risks</li>
                                <li>Restrict access without prior notice if necessary to protect the platform</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">10. Limitation of Liability</h2>
                            <p>To the maximum extent permitted by law, Jiroshi is not liable for indirect, incidental, or consequential damages. This includes data loss, revenue loss, or unauthorized access.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">11. Indemnification</h2>
                            <p>You agree to indemnify and hold Jiroshi harmless from claims arising from your use of the platform, your content, or violations of these Terms.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">12. Changes to Terms</h2>
                            <p>We may update these Terms as the platform evolves. Continued use constitutes acceptance of updated Terms.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">13. Governing Law</h2>
                            <p>These Terms shall be governed by the laws of India.</p>
                        </section>

                        <section className="pt-12 border-t border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">14. Contact</h2>
                            <div className="bg-slate-50 p-6 rounded-2xl space-y-2">
                                <p><strong>Email:</strong> <a href="mailto:app.jiroshi@gmail.com" className="text-primary hover:underline">app.jiroshi@gmail.com</a></p>
                                <p><strong>Company:</strong> Jiroshi</p>
                                <p><strong>Website:</strong> <a href="https://jiroshi.com" className="text-primary hover:underline">jiroshi.com</a></p>
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

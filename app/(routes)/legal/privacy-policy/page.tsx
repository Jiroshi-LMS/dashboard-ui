"use client";

import Link from "next/link";
import { ArrowLeft, Turtle } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPage() {
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
                    <h1 className="text-4xl font-bold mb-4 text-slate-900 tracking-tight">Privacy Policy</h1>
                    <p className="text-slate-500 mb-12">Last Updated: {lastUpdated}</p>

                    <div className="prose prose-slate max-w-none space-y-12 text-slate-600 leading-relaxed">
                        <section>
                            <p className="text-lg">
                                Jiroshi (“we”, “our”, “us”) provides a headless learning management platform that enables instructors and developers to build and manage course platforms using APIs.
                            </p>
                            <p className="mt-4">
                                This Privacy Policy explains how we collect, use, store, and protect personal information when you use our platform, APIs, dashboards, and services. By using Jiroshi, you agree to this Privacy Policy.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">1. Information We Collect</h2>
                            <p>We collect only the information required to operate the platform.</p>

                            <div className="space-y-4 mt-6">
                                <div>
                                    <h3 className="font-bold text-slate-800">1.1 Instructor Information</h3>
                                    <p className="mb-2">When an instructor creates an account, we may collect:</p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Name or display name</li>
                                        <li>Email address</li>
                                        <li>Account credentials</li>
                                        <li>Generated API keys</li>
                                        <li>Basic account and usage metadata</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-800">1.2 Student Information</h3>
                                    <p className="mb-2">Student data is collected on behalf of instructors (tenants) and may include:</p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Identifier (email, phone number, or custom identifier chosen by the instructor)</li>
                                        <li>Authentication credentials (securely hashed)</li>
                                        <li>Enrollment and access data</li>
                                    </ul>
                                    <p className="text-sm mt-3 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
                                        Jiroshi does not determine the identifier format or student data schema — this is controlled by the instructor.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-800">1.3 Technical & Usage Information</h3>
                                    <p className="mb-2">We may automatically collect:</p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>IP address</li>
                                        <li>Request metadata (timestamps, endpoints, response codes)</li>
                                        <li>Logs required for debugging, rate limiting, and security monitoring</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">2. How We Use Information</h2>
                            <p>We use information strictly to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Authenticate users and API requests</li>
                                <li>Provide platform features and access control</li>
                                <li>Maintain security and prevent abuse</li>
                                <li>Monitor system performance and reliability</li>
                                <li>Communicate service-related updates</li>
                            </ul>
                            <p className="font-medium text-slate-900">We do not use personal data for advertising, profiling, or resale.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">3. Content Delivery & Media Access</h2>
                            <p>At the current stage of the platform, course media (including videos and static assets) may be served using static URLs or similar delivery mechanisms.</p>
                            <p>While we take reasonable measures to restrict unauthorized access, we cannot guarantee complete prevention of content copying, redistribution, or misuse. Instructors are responsible for deciding what content they upload and how it is distributed.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">4. Payments</h2>
                            <p>At this time, Jiroshi does not process, store, or handle payment information. Payments, if any, are handled externally by instructors using third-party tools.</p>
                            <p className="text-sm italic">This policy will be updated when native payment functionality is introduced.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">5. Data Ownership & Role</h2>
                            <p>Instructors own and control the student data they collect. Jiroshi acts as a data processor, providing infrastructure and APIs. Instructors are responsible for compliance with applicable laws regarding student data.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">6. API Key Security</h2>
                            <p>API keys are used to authenticate and authorize access to Jiroshi APIs. We implement reasonable safeguards such as secure storage, access controls, and rate limiting.</p>
                            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-sm">
                                <p><strong>Responsibility:</strong> Instructors are responsible for securely storing their API keys. Secret keys must never be exposed in client-side or public environments.</p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">7. Data Storage & Security</h2>
                            <p>We use reasonable technical and organizational measures to protect data, including secure password hashing, token-based authentication, and encrypted communication (HTTPS).</p>
                            <p className="text-sm">No system is completely secure, and users acknowledge inherent risks when using internet-based services.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">8. Data Retention</h2>
                            <p>Data is retained while accounts remain active. Logs and technical data may be retained temporarily for security and debugging. Instructors may request account deletion, subject to technical and legal limitations.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">9. Data Sharing</h2>
                            <p>We do not sell or rent personal data. Data may be shared only with service providers required to operate the platform, to comply with legal obligations, or to protect platform integrity or user safety.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">10. Cookies & Tokens</h2>
                            <p>Authentication tokens may be stored in HTTP-only cookies for browser-based clients. Cookies are used strictly for authentication and security purposes.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">11. Children’s Privacy</h2>
                            <p>Jiroshi is not specifically designed for children. Instructors are responsible for ensuring compliance with local laws when providing access to minors.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">12. Changes to This Policy</h2>
                            <p>We may update this Privacy Policy as the platform evolves. Significant changes will be communicated via the platform or documentation.</p>
                        </section>

                        <section className="pt-12 border-t border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">13. Contact</h2>
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

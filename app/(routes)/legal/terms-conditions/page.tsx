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
                    <h1 className="text-4xl font-bold mb-4 text-slate-900 tracking-tight text-center">Terms & Conditions</h1>
                    <p className="text-slate-500 mb-12 text-center">Last Updated: {lastUpdated}</p>

                    <div className="prose prose-slate max-w-none space-y-12 text-slate-600 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">1. Acceptance of Terms</h2>
                            <p className="mt-4">
                                Welcome to Jiroshi. By accessing or using our website and services, you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our services.
                            </p>
                            <p className="mt-4">
                                "Jiroshi" refers to the platform and services provided by Jiroshi. "You" or "User" refers to the individual, organization, or entity using our Services.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">2. Description of Services</h2>
                            <p>
                                Jiroshi is a software-as-a-service (SaaS) platform that provides infrastructure and tools for educators and organizations to create, manage, and operate online learning platforms and courses ("Services").
                            </p>
                            <p>
                                We provide the tools to manage content, users, and enrollments. We do not create the course content itself, nor do we employ the instructors who use our platform.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">3. User Eligibility and Account Responsibility</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Eligibility:</strong> You must be at least 18 years old or have legal parental/guardian consent to use our Services.</li>
                                <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and API keys. You are fully responsible for all activities that occur under your account.</li>
                                <li><strong>Accuracy:</strong> You agree to provide accurate, current, and complete information during the registration process.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">4. Subscriptions, Payments, and Billing</h2>
                            <p>
                                Jiroshi operates on a subscription model. By subscribing to a plan, you agree to pay the fees associated with that plan.
                            </p>
                            <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl">
                                <h3 className="font-bold text-slate-900 mb-2">Payment Processing</h3>
                                <p className="mb-4">
                                    Payments for Jiroshi subscriptions are processed utilizing secure third-party payment gateway providers (such as Razorpay, Stripe, etc.).
                                </p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Jiroshi <strong>does not</strong> directly collect or store your sensitive payment card or banking information.</li>
                                    <li>All payment tracking is done via the transaction ID provided by the payment gateway.</li>
                                    <li>You agree to the terms and conditions of the respective payment gateway used for the transaction.</li>
                                </ul>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">5. Refunds and Cancellations</h2>
                            <p>
                                Our policies regarding subscription cancellations and refunds are governed by our separate <strong>Refund & Cancellation Policy</strong>. Please refer to that document for detailed information on eligibility and processes for refunds.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">6. Acceptable Use of the Platform</h2>
                            <p>You agree not to use the platform for any unlawful purpose or any purpose prohibited under this clause. You agree not to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Host, display, upload, modify, publish, transmit, store, update or share any information that belongs to another person and to which you do not have any right.</li>
                                <li>Upload content that is defamatory, obscene, pornographic, pedophilic, invasive of another's privacy, or otherwise unlawful.</li>
                                <li>Interfere with or disrupt the integrity or performance of the platform.</li>
                                <li>Attempt to gain unauthorized access to the platform or related systems.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">7. Intellectual Property Rights</h2>
                            <p>
                                <strong>Your Content:</strong> You retain ownership of all course content, videos, and materials you upload to Jiroshi. You grant us a limited license to store, process, and display this content solely for the purpose of providing the Services.
                            </p>
                            <p>
                                <strong>Our IP:</strong> Jiroshi retains all rights, title, and interest in and to the platform, including our software, designs, trademarks, logos, and code.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">8. Limitation of Liability</h2>
                            <p>
                                To the maximum extent permitted by law, Jiroshi shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">9. Account Suspension or Termination</h2>
                            <p>
                                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                            </p>
                            <p>
                                Upon termination, your right to use the Services will immediately cease. If you wish to terminate your account, you may specificially request for account deletion or simply discontinue using the Service.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">10. Governing Law</h2>
                            <p>
                                These Terms shall be governed and construed in accordance with the laws of <strong>India</strong>, without regard to its conflict of law provisions. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in India.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">11. Changes to Terms</h2>
                            <p>
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                            </p>
                        </section>

                        <section className="pt-12 border-t border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">12. Contact Information</h2>
                            <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
                                <p>If you have any questions about these Terms, please contact us:</p>
                                <div>
                                    <p className="font-bold text-slate-900">Email:</p>
                                    <a href="mailto:app.jiroshi@gmail.com" className="text-primary hover:underline text-lg">app.jiroshi@gmail.com</a>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">Platform:</p>
                                    <p>Jiroshi</p>
                                </div>
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

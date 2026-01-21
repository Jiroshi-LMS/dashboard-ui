"use client";

import Link from "next/link";
import { ArrowLeft, Turtle } from "lucide-react";
import { motion } from "framer-motion";

export default function RefundPolicyPage() {
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
                    <h1 className="text-4xl font-bold mb-4 text-slate-900 tracking-tight text-center">Refund & Cancellation Policy</h1>
                    <p className="text-slate-500 mb-12 text-center">Last Updated: {lastUpdated}</p>

                    <div className="prose prose-slate max-w-none space-y-12 text-slate-600 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">1. Overview</h2>
                            <p className="mt-4">
                                At Jiroshi, we strive to provide the best possible experience for our users. This Refund and Cancellation Policy outlines the terms under which refunds may be granted and how subscriptions can be cancelled. We handle all refund and cancellation requests manually through our support channels.
                            </p>
                            <p className="mt-4">
                                Please read this policy carefully before making a purchase.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">2. Eligibility for Refunds</h2>
                            <p className="mt-4">
                                We offer refunds under specific conditions to ensure fairness. You may be eligible for a refund if you request it within <strong>7 days</strong> of your initial payment date.
                            </p>
                            <p className="mt-4">
                                To be eligible, you must have:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Purchased a subscription directly through Jiroshi.</li>
                                <li>Submitted your request within the 7-day refund window.</li>
                                <li>Not violated our Terms and Conditions.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">3. Conditions for Refunds</h2>
                            <h3 className="text-lg font-semibold text-slate-900 mt-4">When Refunds are Granted:</h3>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li><strong>Technical Issues:</strong> If you experience critical technical errors that prevent you from using the platform, and we are unable to resolve them within a reasonable timeframe.</li>
                                <li><strong>Billing Errors:</strong> If you were charged incorrectly or multiple times for the same subscription period due to a system error.</li>
                                <li><strong>Accidental Purchase:</strong> If you accidentally purchased a subscription and have not significantly used the service (subject to review).</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-slate-900 mt-6">When Refunds are NOT Granted:</h3>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li><strong>Change of Mind:</strong> If you simply decide you no longer want the service after the 7-day window.</li>
                                <li><strong>Partial Use:</strong> We do not offer pro-rata refunds for partially used subscription periods.</li>
                                <li><strong>Violation of Terms:</strong> If your account has been suspended or terminated due to a violation of our Terms and Conditions.</li>
                                <li><strong>Outside Refund Window:</strong> Requests made after 7 days from the payment date.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">4. Subscription Cancellation</h2>
                            <p className="mt-4">
                                You may cancel your subscription at any time. Since Jiroshi handles billing manually or through third-party links, there may not be an automated "Cancel" button in your dashboard.
                            </p>
                            <p className="mt-4">
                                <strong>To Cancel:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Email our support team at <a href="mailto:app.jiroshi@gmail.com" className="text-primary hover:underline">app.jiroshi@gmail.com</a> with the subject line "Cancellation Request".</li>
                                <li>Include your registered email address and user details.</li>
                            </ul>
                            <p className="mt-4">
                                Once cancelled, you will retain access to the platform until the end of your current billing cycle. You will not be charged for the subsequent renewal.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">5. How to Request a Refund</h2>
                            <p className="mt-4">
                                To request a refund, please follow these steps:
                            </p>
                            <ol className="list-decimal pl-6 space-y-2 mt-2">
                                <li>Contact us via email at <a href="mailto:app.jiroshi@gmail.com" className="text-primary hover:underline">app.jiroshi@gmail.com</a>.</li>
                                <li>Use the subject line "Refund Request".</li>
                                <li>Provide your proof of payment (transaction ID or receipt).</li>
                                <li>Briefly explain the reason for your refund request.</li>
                            </ol>
                            <p className="mt-4">
                                Our support team will review your request and respond within 24-48 hours.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">6. Processing Timelines & Method</h2>
                            <p className="mt-4">
                                If your refund request is approved:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li><strong>Processing Time:</strong> Refunds are typically processed within <strong>5 to 7 business days</strong> after approval.</li>
                                <li><strong> refund Method:</strong> Refunds will be issued to the <strong>original payment method</strong> used for the transaction.</li>
                                <li><strong>Third-Party Processing:</strong> Please note that payments and refunds are processed by third-party providers (such as Razorpay or Stripe). The time it takes for the funds to appear in your account may depend on your bank or the payment provider's policies.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">7. Disputes & Chargebacks</h2>
                            <p className="mt-4">
                                If you have an issue with a charge, we encourage you to contact us first at <a href="mailto:app.jiroshi@gmail.com" className="text-primary hover:underline">app.jiroshi@gmail.com</a> to resolve the matter amicably. Raising a dispute or chargeback with your bank or credit card provider may delay the resolution process and could result in the suspension of your account while the dispute is investigated.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">8. Contact Us</h2>
                            <p className="mt-4">
                                If you have any questions about this Refund and Cancellation Policy, please contact us:
                            </p>
                            <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <p className="font-semibold text-slate-900">Jiroshi Support</p>
                                <p className="mt-1">Email: <a href="mailto:app.jiroshi@gmail.com" className="text-primary hover:underline">app.jiroshi@gmail.com</a></p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}

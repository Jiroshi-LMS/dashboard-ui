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
                    <h1 className="text-4xl font-bold mb-4 text-slate-900 tracking-tight text-center">Privacy Policy</h1>
                    <p className="text-slate-500 mb-12 text-center">Last Updated: {lastUpdated}</p>

                    <div className="prose prose-slate max-w-none space-y-12 text-slate-600 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">1. Introduction</h2>
                            <p className="mt-4">
                                Welcome to Jiroshi (“we”, “our”, “us”). Jiroshi is a software-as-a-service (SaaS) platform that helps educators, coaching institutes, and organizations create and manage online learning platforms.
                            </p>
                            <p className="mt-4">
                                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>jiroshi.com</strong> and use our services. By using Jiroshi, you agree to the collection and use of information in accordance with this policy. This policy is drafted in compliance with applicable laws, including the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 of India.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">2. Information We Collect</h2>
                            <p>We collect information to provide and improve our services to you.</p>

                            <div className="space-y-4 mt-6">
                                <div>
                                    <h3 className="font-bold text-slate-800">2.1 Personal Information</h3>
                                    <p className="mb-2">We may collect personal identification information that strictly enables us to provide our services, such as:</p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Name</li>
                                        <li>Email address</li>
                                        <li>Phone number (if provided)</li>
                                        <li>Billing address (for invoice generation)</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-800">2.2 Account Information</h3>
                                    <p className="mb-2">To manage your account, we store:</p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Login credentials (securely encrypted)</li>
                                        <li>Subscription plan details</li>
                                        <li>Platform settings and preferences</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-800">2.3 Usage Data</h3>
                                    <p className="mb-2">We automatically collect data on how the platform is accessed and used:</p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Log data (IP address, browser type, device info)</li>
                                        <li>Pages visited and time spent</li>
                                        <li>API usage logs for security and performance monitoring</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">3. How We Use Your Information</h2>
                            <p>We use the collected information for the following purposes:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>To provide, operate, and maintain our SaaS platform</li>
                                <li>To manage your registration and account</li>
                                <li>To process your subscription and payments (via third-party processors)</li>
                                <li>To improved our platform, user experience, and features</li>
                                <li>To communicate with you regarding updates, security alerts, and support</li>
                                <li>To comply with legal obligations and enforce our terms</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">4. Payment Information</h2>
                            <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl">
                                <p className="font-medium text-slate-900 mb-2">We do not store your sensitive payment card details.</p>
                                <p>
                                    Jiroshi is a paid subscription service. All payments are processed by third-party payment gateways (such as Razorpay, Stripe, or others).
                                </p>
                                <p className="mt-4">
                                    When you make a payment, you will be redirected to the secure portal of our payment provider. These providers adhere to strict security standards (like PCI-DSS) to ensure your payment information is safe. We only receive confirmation of your payment and limited billing details (such as transaction ID and date) to update your subscription status.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">5. Data Storage and Security</h2>
                            <p>
                                We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Encryption:</strong> All data in transit is encrypted using SSL/TLS protocols.</li>
                                <li><strong>Access Control:</strong> Access to personal data is restricted to authorized personnel only.</li>
                                <li><strong>Secure Infrastructure:</strong> Our servers are hosted in secure data centers with robust security protections.</li>
                            </ul>
                            <p className="text-sm italic mt-2">
                                While we strive to use commercially acceptable means to protect your personal data, no method of transmission over the Internet is 100% secure.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">6. Cookies</h2>
                            <p>
                                We use cookies and similar tracking technologies to track activity on our service and hold certain information.
                            </p>
                            <p>
                                We use strictly necessary cookies to keep you logged in and ensure secure access to your dashboard. You can instruct your browser to refuse all cookies, but you may not be able to use some portions of our service if you do so.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">7. User Rights</h2>
                            <p>As a user, you have rights regarding your personal data:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li><strong>Right to Access:</strong> You can request copies of your personal data.</li>
                                <li><strong>Right to Correction:</strong> You can request that we correct any information you believe is inaccurate.</li>
                                <li><strong>Right to Deletion:</strong> You can request that we delete your personal data, subject to legal retention requirements.</li>
                            </ul>
                            <p>To exercise these rights, please contact us at our support email.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">8. Data Retention</h2>
                            <p>
                                We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">9. Changes to This Policy</h2>
                            <p>
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                            </p>
                        </section>

                        <section className="pt-12 border-t border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">10. Contact Us</h2>
                            <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
                                <p>If you have any questions about this Privacy Policy, please contact us:</p>
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

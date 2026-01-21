"use client";

import Link from "next/link";
import { ArrowLeft, Turtle, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactUsPage() {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary/20 selection:text-primary flex flex-col">
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

            <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4">
                <div className="w-full max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center w-full"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-900 mb-6">
                            <Mail size={32} />
                        </div>
                        <h1 className="text-4xl font-bold mb-4 text-slate-900 tracking-tight">Contact Us</h1>
                        <p className="text-lg text-slate-600 mb-12">
                            Have questions about Jiroshi? Whether you need help with your subscription, have billing inquiries, or just want to learn more about the platform, we're here to help.
                        </p>

                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-center space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Email Support</h3>
                                <p className="text-slate-600 mb-4">
                                    For general inquiries, support requests, and billing questions, please email us directly. We aim to respond to all inquiries within <strong>1 to 2 business days</strong>.
                                </p>
                                <a
                                    href="mailto:app.jiroshi@gmail.com"
                                    className="inline-flex items-center justify-center gap-2 text-primary font-semibold hover:underline text-lg"
                                >
                                    <Mail size={20} />
                                    app.jiroshi@gmail.com
                                </a>
                            </div>

                            <div className="border-t border-slate-200 pt-8">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Submit an Inquiry</h3>
                                <p className="text-slate-600 mb-6">
                                    Alternatively, you can fill out our inquiry form. This helps us gather all the necessary details to serve you better.
                                </p>
                                <a
                                    href="https://docs.google.com/forms/d/e/1FAIpQLSeVYO6ZCwYZwC4t8KMcf5EuGd0pvBG-00XtZk5cz29p2NyMIw/viewform?usp=sharing&ouid=117500777682926002737"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Open Inquiry Form
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>

                        <div className="mt-12 text-slate-500 text-sm">
                            <p>
                                Please note: We do not offer phone support at this time. All official communication is handled via email or our inquiry form.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

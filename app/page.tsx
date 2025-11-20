"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Layers, LayoutDashboard, Zap, Globe, ShieldCheck, Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Zap size={20} fill="currentColor" />
            </div>
            JIROSHI
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">
              Login
            </Link>
            <Link href="/instructor/dashboard">
              <Button className="font-semibold shadow-lg shadow-primary/20">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-50 mix-blend-screen" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] opacity-30" />
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-xs font-medium mb-8 text-muted-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              v2.0 is now live
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              The Headless LMS <br />
              <span className="text-primary">for Developers</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Build your own course platform with our powerful APIs.
              Manage content, users, and payments while retaining full control over your frontend.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/instructor/dashboard">
                <Button size="lg" className="h-12 px-8 text-base rounded-full shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
                  Start Building Free
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full bg-background/50 backdrop-blur-sm border-border hover:bg-secondary/50">
                Read Documentation
              </Button>
            </motion.div>

            {/* Code Preview */}
            <motion.div
              className="mt-20 mx-auto max-w-5xl rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs text-muted-foreground font-mono ml-2">install.sh</div>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="text-sm font-mono text-left text-muted-foreground">
                  <code>
                    <span className="text-primary">npm</span> install @jiroshi/sdk<br />
                    <span className="text-primary">const</span> jiroshi = <span className="text-yellow-500">new</span> Jiroshi(API_KEY);<br />
                    <br />
                    <span className="text-muted-foreground/50">{"// Fetch your courses"}</span><br />
                    <span className="text-primary">const</span> courses = <span className="text-primary">await</span> jiroshi.courses.list();
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-secondary/30 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to scale</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Powerful features designed for modern course platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Globe className="w-10 h-10 text-blue-500" />}
                title="Global CDN"
                description="Deliver your content lightning fast to students anywhere in the world with our edge network."
              />
              <FeatureCard
                icon={<ShieldCheck className="w-10 h-10 text-green-500" />}
                title="Secure Payments"
                description="Integrated payment processing with support for 135+ currencies and fraud protection."
              />
              <FeatureCard
                icon={<LayoutDashboard className="w-10 h-10 text-purple-500" />}
                title="Rich Analytics"
                description="Deep insights into student engagement, revenue, and course performance."
              />
              <FeatureCard
                icon={<Code2 className="w-10 h-10 text-pink-500" />}
                title="Developer First"
                description="Built by developers for developers. TypeScript typed SDKs and comprehensive docs."
              />
              <FeatureCard
                icon={<Layers className="w-10 h-10 text-yellow-500" />}
                title="Content Management"
                description="Flexible content modeling for video, text, quizzes, and interactive assignments."
              />
              <FeatureCard
                icon={<Rocket className="w-10 h-10 text-orange-500" />}
                title="Instant Deploy"
                description="Push your changes and see them live instantly. Zero downtime deployments."
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Launch in minutes, <br />not months.</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Stop reinventing the wheel. Jiroshi handles the heavy lifting of video hosting,
                  user management, and payments so you can focus on your product.
                </p>

                <div className="space-y-8">
                  <Step
                    number="01"
                    title="Create your account"
                    desc="Sign up and get your API keys instantly. No credit card required for development."
                  />
                  <Step
                    number="02"
                    title="Upload content"
                    desc="Use our dashboard or API to upload videos, documents, and course materials."
                  />
                  <Step
                    number="03"
                    title="Build your frontend"
                    desc="Use your favorite framework (Next.js, React, Vue) to build a custom learning experience."
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-3xl" />
                <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl">
                  <div className="space-y-4">
                    <div className="h-8 w-3/4 bg-muted rounded animate-pulse" />
                    <div className="h-32 w-full bg-muted/50 rounded animate-pulse delay-75" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-muted/50 rounded animate-pulse delay-150" />
                      <div className="h-24 bg-muted/50 rounded animate-pulse delay-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to start building?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of developers building the next generation of education platforms.
            </p>
            <Link href="/instructor/dashboard">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-2xl shadow-primary/30 hover:scale-105 transition-transform duration-300">
                Get Your API Keys
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 font-bold text-lg mb-4">
                <Zap size={18} className="text-primary" /> JIROSHI
              </div>
              <p className="text-sm text-muted-foreground">
                The headless LMS for modern developers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Features</Link></li>
                <li><Link href="#" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Documentation</Link></li>
                <li><Link href="#" className="hover:text-foreground">Guides</Link></li>
                <li><Link href="#" className="hover:text-foreground">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">About</Link></li>
                <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Jiroshi Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors duration-300 group"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 p-3 rounded-xl bg-secondary w-fit group-hover:bg-primary/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

function Step({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-bold text-primary text-xl border border-border">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}


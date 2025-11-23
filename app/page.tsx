"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight, Code2, Layers, LayoutDashboard, Zap, Globe, ShieldCheck, Rocket, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Components ---

function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative border border-slate-200 bg-white overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 187, 167, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00bba71a_1px,transparent_1px),linear-gradient(to_bottom,#00bba71a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 opacity-40 blur-[100px]"></div>
      <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-teal-200/40 opacity-40 blur-[100px]"></div>
    </div>
  );
}

function FloatingElement({ children, delay = 0, x = 20, y = 20 }: { children: React.ReactNode, delay?: number, x?: number, y?: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -y, 0],
        x: [0, x, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}

// --- Main Page ---

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-primary/20 selection:text-primary font-sans">
      <AnimatedGrid />

      {/* Floating Navbar */}
      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl rounded-full border border-slate-200 bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center text-white shadow-md shadow-primary/20">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">JIROSHI</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {['Features', 'How it Works', 'Pricing', 'Docs'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase().replace(/\s/g, '-')}`} className="hover:text-primary transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors hidden sm:block">
              Login
            </Link>
            <Link href="/instructor/dashboard">
              <Button size="sm" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 font-semibold px-6 shadow-lg shadow-slate-900/20">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 lg:pt-52 lg:pb-40 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-sm font-medium text-teal-700 mb-8 hover:bg-teal-100 transition-colors cursor-pointer"
              >
                <span className="flex h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_#00bba7]"></span>
                Jiroshi v2.0 is now available
                <ArrowRight className="w-3 h-3 ml-1 text-teal-500" />
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-slate-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                The Headless LMS
                <br />
                <span className="relative inline-block">
                  <span className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-teal-200/50 blur-2xl opacity-50"></span>
                  <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-600">
                    for Developers
                  </span>
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Build your own course platform with our powerful APIs.
                Manage content, users, and payments while retaining full control over your frontend.
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <Link href="/instructor/dashboard">
                  <Button size="lg" className="h-14 px-8 text-base rounded-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_-5px_rgba(0,187,167,0.4)] hover:shadow-[0_0_30px_-5px_rgba(0,187,167,0.5)] transition-all duration-300">
                    Start Building Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/documentation-view/apis" target="_blank">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-base rounded-full bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300">
                    <Terminal className="mr-2 w-5 h-5" />
                    Read Documentation
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-1/2 left-10 hidden lg:block pointer-events-none">
              <FloatingElement delay={0} x={10} y={20}>
                <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 backdrop-blur-md shadow-xl shadow-slate-200/50">
                  <Code2 className="w-8 h-8 text-blue-500" />
                </div>
              </FloatingElement>
            </div>
            <div className="absolute top-1/3 right-10 hidden lg:block pointer-events-none">
              <FloatingElement delay={1} x={-15} y={25}>
                <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 backdrop-blur-md shadow-xl shadow-slate-200/50">
                  <ShieldCheck className="w-8 h-8 text-green-500" />
                </div>
              </FloatingElement>
            </div>

            {/* Code Preview / Dashboard Mockup */}
            <motion.div
              className="mt-24 relative max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.4, type: "spring" }}
              style={{ perspective: "1000px" }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-teal-400 rounded-2xl blur opacity-30"></div>
              <div className="relative rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="text-xs text-slate-400 font-mono ml-2 flex-1 text-center">dashboard.jiroshi.com</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0 min-h-[400px]">
                  {/* Sidebar Mock */}
                  <div className="hidden md:block col-span-2 border-r border-slate-100 p-4 space-y-4 bg-slate-50/30">
                    <div className="h-8 w-full bg-slate-200 rounded animate-pulse" />
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-6 w-full bg-slate-100 rounded animate-pulse" />
                      ))}
                    </div>
                  </div>
                  {/* Main Content Mock */}
                  <div className="col-span-12 md:col-span-10 p-8 bg-white">
                    <div className="flex justify-between items-center mb-8">
                      <div className="space-y-2">
                        <div className="h-8 w-48 bg-slate-100 rounded animate-pulse" />
                        <div className="h-4 w-64 bg-slate-50 rounded animate-pulse" />
                      </div>
                      <div className="h-10 w-32 bg-primary/10 rounded animate-pulse" />
                    </div>
                    <div className="grid grid-cols-3 gap-6 mb-8">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-32 rounded-xl bg-slate-50 border border-slate-100 p-4 space-y-3">
                          <div className="h-8 w-8 rounded-full bg-slate-200" />
                          <div className="h-6 w-24 bg-slate-200 rounded" />
                          <div className="h-8 w-16 bg-slate-200 rounded" />
                        </div>
                      ))}
                    </div>
                    <div className="h-64 rounded-xl bg-slate-50 border border-slate-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-100/50 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-teal-50/30 to-white -z-10" />
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                Everything you need to scale
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Powerful features designed for modern course platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Globe className="w-6 h-6 text-blue-500" />, title: "Global CDN", desc: "Deliver content lightning fast worldwide." },
                { icon: <ShieldCheck className="w-6 h-6 text-green-500" />, title: "Secure Payments", desc: "Integrated processing for 135+ currencies." },
                { icon: <LayoutDashboard className="w-6 h-6 text-purple-500" />, title: "Rich Analytics", desc: "Deep insights into student engagement." },
                { icon: <Code2 className="w-6 h-6 text-pink-500" />, title: "Developer First", desc: "Typed SDKs and comprehensive docs." },
                { icon: <Layers className="w-6 h-6 text-yellow-500" />, title: "Content Management", desc: "Flexible modeling for all content types." },
                { icon: <Rocket className="w-6 h-6 text-orange-500" />, title: "Instant Deploy", desc: "Zero downtime deployments." },
              ].map((feature, i) => (
                <SpotlightCard key={i} className="p-8">
                  <div className="mb-6 p-3 rounded-xl bg-teal-50 w-fit border border-teal-100 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works - Animated Lines */}
        <section id="how-it-works" className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-slate-900">
                  Launch in minutes, <br />
                  <span className="text-primary">not months.</span>
                </h2>
                <p className="text-slate-600 text-lg mb-12">
                  Stop reinventing the wheel. Jiroshi handles the heavy lifting of video hosting,
                  user management, and payments.
                </p>

                <div className="space-y-12 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-slate-200"></div>

                  {[
                    { num: "01", title: "Create Account", desc: "Get your API keys instantly." },
                    { num: "02", title: "Upload Content", desc: "Drag & drop your course materials." },
                    { num: "03", title: "Build Frontend", desc: "Use Next.js, Vue, or any framework." }
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      className="flex gap-8 relative"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border border-primary flex items-center justify-center font-bold text-primary z-10 shadow-lg shadow-primary/10">
                        {step.num}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-slate-900">{step.title}</h3>
                        <p className="text-slate-600">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-teal-400 rounded-3xl blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-slate-200" />
                      <div className="w-3 h-3 rounded-full bg-slate-200" />
                    </div>
                    <div className="text-xs text-slate-400 font-mono">API Response</div>
                  </div>
                  <div className="space-y-4 font-mono text-sm">
                    <div className="text-purple-600">GET /api/v1/courses</div>
                    <div className="text-slate-500">200 OK</div>
                    <pre className="text-slate-600 bg-slate-50 p-4 rounded-xl overflow-x-auto border border-slate-100">
                      {`{
  "data": [
    {
      "id": "c_123",
      "title": "Advanced React",
      "price": 4900,
      "instructor": {
        "name": "Sarah Drasner"
      }
    }
  ]
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-white to-white -z-10" />

          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-slate-900">
              Ready to start building?
            </h2>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
              Join thousands of developers building the next generation of education platforms.
            </p>
            <Link href="/instructor/dashboard">
              <Button size="lg" className="h-16 px-12 text-lg rounded-full bg-slate-900 text-white hover:bg-slate-800 font-bold shadow-2xl shadow-slate-900/20 hover:scale-105 transition-transform duration-300">
                Get Your API Keys
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-200 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 font-bold text-lg mb-4 text-slate-900">
                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white">
                  <Zap size={14} fill="currentColor" />
                </div>
                JIROSHI
              </div>
              <p className="text-sm text-slate-500">
                The headless LMS for modern developers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Guides</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Jiroshi Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

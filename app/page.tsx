"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight, Code2, Layers, LayoutDashboard, Zap, Globe, ShieldCheck, Rocket, Terminal, Turtle, Check, Menu, X } from "lucide-react";
import { useState } from "react";
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

const navMenuItems = [
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "How it Works",
    href: "#how-it-works",
  },
  {
    name: "Docs",
    href: "/documentation-view/apis",
    target: "_blank",
  },
  {
    name: "Pilot Program",
    href: "#pilot-program",
  }
];

// --- Main Page ---

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-primary/20 selection:text-primary font-sans">
      <AnimatedGrid />

      {/* Floating Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 md:top-6 md:left-1/2 md:-translate-x-1/2 z-50 w-full md:w-[90%] md:max-w-5xl md:rounded-full border-b md:border border-slate-200 bg-white/80 backdrop-blur-xl md:backdrop-blur-none shadow-lg shadow-slate-200/50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center text-white shadow-md shadow-primary/20">
              <Turtle size={18} />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">JIROSHI</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {navMenuItems.map((item) => (
              <Link key={item.name} href={item.href} target={item.target} className="hover:text-primary transition-colors relative group">
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
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

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-slate-600 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl rounded-b-[2rem] overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navMenuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target={item.target}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-600 hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="h-px bg-slate-100 my-2" />
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-600 hover:text-primary transition-colors"
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </motion.nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-52 lg:pb-40 overflow-hidden">
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
                Jiroshi v1.0 is now available
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-slate-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                A Headless LMS
                <br />
                <span className="relative inline-block">
                  <span className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-teal-200/50 blur-2xl opacity-50"></span>
                  <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-600">
                    built for Developers
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
                Build your own course platform using clean, flexible APIs.
                Manage content, users, and enrollments — without building an LMS from scratch.
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
                    Start Building with APIs
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/documentation-view/apis" target="_blank">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-base rounded-full bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300">
                    <Terminal className="mr-2 w-5 h-5" />
                    Read API Documentation
                  </Button>
                </Link>
                <Link href="#pilot-program">
                  <Button variant="ghost" size="lg" className="h-14 px-8 text-base rounded-full text-teal-600 hover:text-teal-700 hover:bg-teal-50 font-bold group">
                    <Zap className="mr-2 w-5 h-5 group-hover:fill-teal-600 transition-all" />
                    Join Pilot Plan
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`h-32 rounded-xl bg-slate-50 border border-slate-100 p-4 space-y-3 ${i === 3 ? 'sm:hidden lg:block' : ''}`}>
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
                Everything you need to launch
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Core features designed for API-first course platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <ShieldCheck className="w-6 h-6" />, title: "Secure Authentication", desc: "JWT-based student authentication with tenant isolation." },
                { icon: <LayoutDashboard className="w-6 h-6" />, title: "Instructor Dashboard", desc: "Manage courses, students, and API keys from one place." },
                { icon: <Terminal className="w-6 h-6" />, title: "Developer-First APIs", desc: "Predictable REST APIs with real, detailed documentation." },
                { icon: <Layers className="w-6 h-6" />, title: "Flexible Course Modeling", desc: "Design lessons and content without rigid constraints." },
                { icon: <Rocket className="w-6 h-6" />, title: "Fast to Launch", desc: "Go live without building LMS infrastructure." },
                { icon: <Globe className="w-6 h-6" />, title: "Headless by Design", desc: "Bring your own frontend, framework, or mobile app." },
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
                  Launch in hours, <br />
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
                    { num: "03", title: "Build Frontend", desc: "Use Next.js, Vue, or any framework." },
                    { num: "04", title: "Launch", desc: "Launch your platform in hours." },
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
                    <div className="text-purple-600">GET /api/v1/public/courses/</div>
                    <div className="text-slate-500">200 OK</div>
                    <pre className="text-slate-600 bg-slate-50 p-4 rounded-xl overflow-x-auto border border-slate-100">
                      {`{
  "status": true,
  "results": true,
  "message": "Successfully Fetched",
  "data": {
    "results": [
      {
        "uuid": "11111111-aaaa-bbbb-cccc-000000000001",
        "title": "Introduction to Backend Systems",
        "description": "Learn the fundamentals of backend development.",
        "thumbnail": "<course_thumbnail>",
        "duration": "12500.50",
        "created_at": "2025-01-10T10:00:00Z",
        "is_enrolled": false
      },
      {
        "uuid": "22222222-aaaa-bbbb-cccc-000000000002",
        "title": "Advanced API Design",
        "description": "Deep dive into scalable API architectures.",
        "thumbnail": "<course_thumbnail>",
        "duration": "42500.75",
        "created_at": "2025-01-05T08:30:00Z",
        "is_enrolled": true
      }
    ],
    "pagination": {
      "next": null,
      "previous": null,
      "next_cursor": null,
      "previous_cursor": null
    }
  },
  "error_code": null
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-32 relative bg-slate-50/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                Simple pricing, no lock-in
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Start free. Pay only when you need advanced features.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <SpotlightCard className="p-10 border-2 border-teal-500/20">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Free Plan</h3>
                    <p className="text-slate-500">Everything you need to launch your first course platform.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-bold text-slate-900">₹0</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10">
                  {[
                    "Course & lesson APIs",
                    "Student authentication",
                    "Enrollment system",
                    "Instructor dashboard",
                    "Public & secret API keys"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600">
                      <Check className="w-5 h-5 text-teal-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/instructor/dashboard">
                  <Button className="w-full h-12 rounded-full bg-slate-900 text-white hover:bg-slate-800">
                    Get Started
                  </Button>
                </Link>
              </SpotlightCard>

              {/* Pro Plan */}
              <SpotlightCard className="p-10 opacity-80 group/pro">
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider">
                  Pro (Coming Soon)
                </div>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Pro Plan</h3>
                    <p className="text-slate-500">Built for growing platforms and paid courses.</p>
                  </div>
                </div>
                <ul className="space-y-4 mb-10 text-slate-400">
                  {[
                    "Built-in payments & checkout",
                    "Payment-guarded enrollments",
                    "Webhooks & automation",
                    "Advanced analytics",
                    "Priority support"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-slate-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full h-12 rounded-full border-slate-200 text-slate-400 hover:bg-white hover:text-slate-400 cursor-not-allowed">
                  Join Waitlist
                </Button>
              </SpotlightCard>
            </div>
          </div>
        </section>

        {/* Payments Information Section */}
        <section className="py-32 relative overflow-hidden bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="p-6 sm:p-12 rounded-3xl bg-teal-50/50 border border-teal-100/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck size={120} className="text-teal-500" />
              </div>
              <h2 className="text-3xl font-bold mb-8 text-slate-900">
                Payments are coming — but you can sell today
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  Native payments are currently under development. Until then, Jiroshi is designed to work with real-world payment workflows.
                </p>
                <p>
                  Many instructors collect payments using payment links, QR codes, or direct transfers. Once payment is confirmed, student accounts are created and enrollments are handled via Jiroshi APIs.
                </p>
                <p className="font-medium text-teal-700">
                  When built-in payments are released, enrollments will automatically be protected by payment checks — without breaking changes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Non-Developer Instructor Section */}
        <section id="pilot-program" className="py-32 relative bg-slate-900 text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          </div>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  Not a developer? <br />
                  <span className="text-primary text-3xl md:text-4xl">That’s okay.</span>
                </h2>
                <div className="space-y-6 text-slate-300 text-lg">
                  <p>
                    Jiroshi is API-first, but you don’t need to write code to use it.
                  </p>
                  <p>
                    Many instructors work with a developer, or empower themselves with AI tools like <span className="text-primary font-semibold">Cursor, Anti-Gravity, or ChatGPT</span> to build their own custom platforms using our pre-built APIs.
                  </p>
                  <div className="p-6 rounded-2xl bg-teal-500/10 border border-teal-500/20 mt-8 relative group">
                    <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-primary/20">
                      Pilot Program
                    </div>
                    <p className="text-teal-100 font-medium mb-2 italic">
                      "We want you to succeed."
                    </p>
                    <p className="text-slate-300 text-sm mb-4">
                      For the first few instructors, we are offering to <strong>setup and pilot your platform for absolutely free</strong>. Use our infrastructure as a service while we help you launch your dream system.
                    </p>
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=app.jiroshi@gmail.com&su=Jiroshi Pilot Program Application&body=Hi Jiroshi Team,%0D%0A%0D%0AI'm interested in the free Pilot Program. Here is some information about my platform:%0D%0A%0D%0A- Name:%0D%0A- Course Topic:%0D%0A- Contact Information:%0D%0A- Existing Website (if any):%0D%0A%0D%0AThank you!"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-5 h-9 shadow-lg shadow-primary/20">
                        Apply for Free Pilot
                      </Button>
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Instructor manages content", desc: "Using the Jiroshi Dashboard", icon: <LayoutDashboard size={20} /> },
                    { title: "Build with AI or Developers", desc: "Using Cursor, Anti-Gravity & APIs", icon: <Code2 size={20} /> },
                    { title: "Payments handled externally", desc: "Links, UPI, or Transfers", icon: <Globe size={20} /> },
                    { title: "Launch your platform", desc: "Free Pilot setup available", icon: <Rocket size={20} /> }
                  ].map((box, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    >
                      <div className="mb-4 text-primary">{box.icon}</div>
                      <h4 className="font-bold mb-2 text-sm">{box.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-medium">{box.desc}</p>
                    </motion.div>
                  ))}
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
              Build your education platform without rebuilding the wheel.
            </p>
            <Link href="/instructor/dashboard">
              <Button size="lg" className="h-16 px-12 text-lg rounded-full bg-slate-900 text-white hover:bg-slate-800 font-bold shadow-2xl shadow-slate-900/20 hover:scale-105 transition-transform duration-300">
                Generate API Keys
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
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                  <Turtle size={14} />
                </div>
                JIROSHI
              </div>
              <p className="text-sm text-slate-500">
                A headless LMS built for API-first teams.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/" className="hover:text-primary transition-colors">Landing</Link></li>
                <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-primary transition-colors">How it works</Link></li>
                <li><Link href="/instructor/dashboard" className="hover:text-primary transition-colors">API</Link></li>
                <li><Link href="/documentation-view/apis" className="hover:text-primary transition-colors">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900">Support</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="mailto:app.jiroshi@gmail.com" className="hover:text-primary transition-colors">Contact</a></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Feedback</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/legal/privacy-policy" className="hover:text-primary transition-colors">Privacy Policies</Link></li>
                <li><Link href="/legal/terms-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
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

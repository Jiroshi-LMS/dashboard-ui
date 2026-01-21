"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight, Code2, Layers, LayoutDashboard, Zap, Globe, ShieldCheck, Rocket, Terminal, Turtle, Check, Menu, X, Plus, Github } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchInstructor } from "@/feature/instructor/instructorSlice";
import { authLiterals } from "@/lib/constants/common";

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
        name: "About",
        href: "#about",
    },
    {
        name: "Who is it for",
        href: "#who-is-it-for",
    },
    {
        name: "Pricing",
        href: "#pricing",
    },
    {
        name: "Support",
        href: "#support",
    }
];

export default function LandingPageClient() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { loggedIn, status } = useAppSelector((state) => state.instructor);

    useEffect(() => {
        const token = localStorage.getItem(authLiterals.ACCESS);
        if (token && !loggedIn && status === 'idle') {
            dispatch(fetchInstructor());
        }
    }, [dispatch, loggedIn, status]);

    return (
        <div className="w-full min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-primary/20 selection:text-primary font-sans">
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
                            <Link key={item.name} href={item.href} className="hover:text-primary transition-colors relative group">
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-4">
                            {!loggedIn && (
                                <Link href="/auth/login" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors hidden sm:block">
                                    Login
                                </Link>
                            )}
                            {loggedIn ? (
                                <Link href="/instructor/dashboard">
                                    <Button size="sm" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 font-semibold px-6 shadow-lg shadow-slate-900/20">
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/auth/signup">
                                    <Button size="sm" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 font-semibold px-6 shadow-lg shadow-slate-900/20">
                                        Get Started
                                    </Button>
                                </Link>
                            )}
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
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-slate-600 hover:text-primary transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="h-px bg-slate-100 my-2" />
                            {!loggedIn ? (
                                <Link
                                    href="/auth/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-slate-600 hover:text-primary transition-colors"
                                >
                                    Login
                                </Link>
                            ) : (
                                <Link
                                    href="/instructor/dashboard"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-primary transition-colors"
                                >
                                    Go to Dashboard
                                </Link>
                            )}
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
                                Trusted by educators across India
                            </motion.div>

                            {/* Headline */}
                            <motion.h1
                                className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.1] text-slate-900"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                            >
                                Your Online Learning Platform,
                                <br />
                                <span className="relative inline-block">
                                    <span className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-teal-200/50 blur-2xl opacity-50"></span>
                                    <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-600">
                                        Made Simple
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
                                Jiroshi is a software-as-a-service platform that helps educators and organizations
                                create, manage, and operate their own online learning platforms with ease.
                            </motion.p>

                            {/* Buttons */}
                            <motion.div
                                className="flex flex-col sm:flex-row items-center gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                            >
                                <Link href="/auth/signup">
                                    <Button size="lg" className="h-14 px-8 text-base rounded-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_-5px_rgba(0,187,167,0.4)] hover:shadow-[0_0_30px_-5px_rgba(0,187,167,0.5)] transition-all duration-300">
                                        Get Started
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link href="#about">
                                    <Button variant="outline" size="lg" className="h-14 px-8 text-base rounded-full bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300">
                                        Learn More
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
                                    <div className="text-xs text-slate-400 font-mono ml-2 flex-1 text-center">jiroshi.com</div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-0 min-h-[400px]">
                                    {/* Sidebar Mock */}
                                    <div className="hidden md:flex col-span-2 border-r border-slate-100 p-4 flex-col gap-6 bg-slate-50/30">
                                        <div className="flex items-center gap-2 px-2">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                            <div className="h-4 w-16 bg-slate-200 rounded" />
                                        </div>
                                        <div className="space-y-4">
                                            {[
                                                { icon: <LayoutDashboard size={14} />, label: "Dashboard" },
                                                { icon: <Layers size={14} />, label: "Courses" },
                                                { icon: <Globe size={14} />, label: "API Keys" },
                                                { icon: <Zap size={14} />, label: "Analytics" }
                                            ].map((item, i) => (
                                                <div key={i} className={cn(
                                                    "flex items-center gap-3 px-2 py-1.5 rounded-md transition-colors",
                                                    i === 0 ? "bg-white shadow-sm border border-slate-100 text-primary" : "text-slate-400"
                                                )}>
                                                    {item.icon}
                                                    <span className="text-[10px] font-medium">{item.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Main Content Mock */}
                                    <div className="col-span-12 md:col-span-10 p-4 md:p-8 bg-white">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                            <div className="space-y-1">
                                                <h3 className="text-xl font-bold text-slate-900">Instructor Dashboard</h3>
                                                <p className="text-xs text-slate-500">Welcome back, Instructor!</p>
                                            </div>
                                            <Button size="sm" className="rounded-full bg-primary text-white text-xs h-8 px-4">
                                                <Plus className="w-3 h-3 mr-1.5" />
                                                Create Course
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                            {[
                                                { label: "Total Courses", value: "5", color: "text-blue-600", bg: "bg-blue-50" },
                                                { label: "Total Signups", value: "100", color: "text-green-600", bg: "bg-green-50" },
                                                { label: "Total Enrollments", value: "150", color: "text-primary", bg: "bg-teal-50" }
                                            ].map((stat, i) => (
                                                <div key={i} className={`rounded-xl border border-slate-100 p-4 space-y-1 ${i === 2 ? 'hidden lg:block' : ''}`}>
                                                    <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">{stat.label}</div>
                                                    <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                                                    <div className="text-[10px] text-slate-400">+12 from last month</div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-bold text-slate-900">Recent Courses</h4>
                                                <Button variant="ghost" size="sm" className="text-[10px] text-primary h-7">View All</Button>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {[
                                                    { title: "Next.js for Beginners", students: "450 Students", color: "bg-blue-100/50" },
                                                    { title: "Advanced Backend Systems", students: "280 Students", color: "bg-purple-100/50" },
                                                    { title: "UI Design Principles", students: "890 Students", color: "bg-teal-100/50" },
                                                    { title: "Python for Data Science", students: "1.2k Students", color: "bg-orange-100/50" }
                                                ].map((course, i) => (
                                                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-white shadow-sm hover:border-primary/20 transition-colors ${i > 1 ? 'hidden sm:flex' : ''}`}>
                                                        <div className={`w-10 h-10 rounded-lg ${course.color} flex items-center justify-center`}>
                                                            <Layers size={18} className="text-slate-600" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-[11px] font-bold text-slate-900 truncate">{course.title}</p>
                                                            <p className="text-[9px] text-slate-500">{course.students}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* What is Jiroshi Section */}
                <section id="about" className="py-32 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-teal-50/30 to-white -z-10" />
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                                    What is Jiroshi?
                                </h2>
                            </div>

                            <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
                                <p>
                                    Jiroshi is a software-as-a-service (SaaS) platform designed for educators, trainers, coaching institutes, and organizations who want to deliver online courses to their students.
                                </p>
                                <p>
                                    With Jiroshi, you can create and organize your courses and lessons, manage student registrations, and control who has access to your content. The platform provides a simple dashboard where you can upload videos, add course descriptions, and track your students.
                                </p>
                                <p>
                                    Jiroshi is a paid subscription service. Users subscribe to a plan and pay a recurring fee to access the platform and its features. This allows educators to focus on teaching while we handle the technology.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                                {[
                                    { icon: <Layers className="w-6 h-6" />, title: "Course Management", desc: "Create and organize your courses with videos, lessons, and descriptions." },
                                    { icon: <ShieldCheck className="w-6 h-6" />, title: "Student Access Control", desc: "Manage who can access your courses and track enrollments." },
                                    { icon: <LayoutDashboard className="w-6 h-6" />, title: "Simple Dashboard", desc: "Easy-to-use control panel for managing your entire learning platform." },
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
                    </div>
                </section>

                {/* Who is Jiroshi for Section */}
                <section id="who-is-it-for" className="py-32 relative overflow-hidden">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                                    Who is Jiroshi for?
                                </h2>
                                <p className="text-slate-600 text-lg">
                                    Jiroshi is built for anyone who wants to teach online.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    { title: "Independent Educators", desc: "Teachers, tutors, and subject experts who want to sell their courses online." },
                                    { title: "Coaching Institutes", desc: "Coaching centers and training academies looking for a branded learning platform." },
                                    { title: "Corporate Trainers", desc: "Organizations that need to train employees or partners through online modules." },
                                    { title: "Content Creators", desc: "Professionals who want to monetize their knowledge through video courses." },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-primary">
                                                <Check className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2 text-slate-900">{item.title}</h3>
                                                <p className="text-slate-600">{item.desc}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* How Pricing Works Section */}
                <section id="pricing" className="py-32 relative bg-slate-50/50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                                    How Pricing Works
                                </h2>
                            </div>

                            <div className="space-y-8 text-lg text-slate-600 leading-relaxed mb-16">
                                <p>
                                    Jiroshi operates on a subscription-based pricing model. Users pay a recurring fee to access the platform and use its features. This means you pay a fixed amount each month or year to keep your learning platform running.
                                </p>
                                <p>
                                    We offer different subscription tiers to match your needs. Whether you are an individual educator just starting out, or a large organization with many students, there is a plan that fits your requirements.
                                </p>
                                <p>
                                    Subscription fees cover access to the platform, student management tools, course creation features, and customer support. Pricing details are shared during the signup process.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <SpotlightCard className="p-10 border-2 border-teal-500/20">
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Subscription Plans</h3>
                                        <p className="text-slate-500">Choose a plan that fits your needs.</p>
                                    </div>
                                    <ul className="space-y-4 mb-10">
                                        {[
                                            "Monthly or yearly subscription options",
                                            "Fixed recurring fees with no hidden charges",
                                            "Upgrade or downgrade anytime",
                                            "Cancel your subscription at any time"
                                        ].map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-600">
                                                <Check className="w-5 h-5 text-teal-500" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href="/auth/signup">
                                        <Button className="w-full h-12 rounded-full bg-slate-900 text-white hover:bg-slate-800">
                                            {loggedIn ? "Go to Dashboard" : "Get Started"}
                                        </Button>
                                    </Link>
                                </SpotlightCard>

                                <SpotlightCard className="p-10">
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">What You Get</h3>
                                        <p className="text-slate-500">All plans include essential features.</p>
                                    </div>
                                    <ul className="space-y-4 mb-10">
                                        {[
                                            "Course and lesson management",
                                            "Student registration and access control",
                                            "Dashboard for managing your platform",
                                            "Customer support via email"
                                        ].map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-600">
                                                <Check className="w-5 h-5 text-teal-500" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </SpotlightCard>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Payments and Support Section */}
                <section id="support" className="py-32 relative overflow-hidden bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                                    Payments and Support
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                                <div className="p-8 rounded-2xl bg-teal-50/50 border border-teal-100/50">
                                    <div className="mb-4 p-3 rounded-xl bg-white w-fit border border-teal-100 text-primary">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-slate-900">Secure Payment Processing</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        All payments for Jiroshi subscriptions are processed through trusted third-party payment providers. We do not process or store your payment card details directly. Your payment information is handled securely by our payment partners.
                                    </p>
                                </div>

                                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="mb-4 p-3 rounded-xl bg-white w-fit border border-slate-100 text-primary">
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-slate-900">Billing Support</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        For any questions about payments, billing, invoices, or subscription management, please contact our support team. We are here to help you with any payment-related queries.
                                    </p>
                                </div>
                            </div>

                            <div className="p-8 md:p-12 rounded-3xl bg-slate-900 text-white text-center">
                                <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
                                <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                                    For payment queries, billing support, or general questions about your subscription, reach out to us at:
                                </p>
                                <a href="mailto:app.jiroshi@gmail.com" className="inline-flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors">
                                    app.jiroshi@gmail.com
                                </a>
                                <p className="text-slate-400 mt-4 text-sm">
                                    We typically respond within 24-48 hours.
                                </p>
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
                            Ready to get started?
                        </h2>
                        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
                            Join educators across India who trust Jiroshi for their online learning platforms.
                        </p>
                        <Link href="/auth/signup">
                            <Button size="lg" className="h-16 px-12 text-lg rounded-full bg-slate-900 text-white hover:bg-slate-800 font-bold shadow-2xl shadow-slate-900/20 hover:scale-105 transition-transform duration-300">
                                Create Your Account
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
                                Online learning platform for educators and organizations.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-slate-900">Platform</h4>
                            <ul className="space-y-2 text-sm text-slate-500">
                                <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                                <li><Link href="#about" className="hover:text-primary transition-colors">About</Link></li>
                                <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                                <li><Link href="/auth/signup" className="hover:text-primary transition-colors">Get Started</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-slate-900">Support</h4>
                            <ul className="space-y-2 text-sm text-slate-500">
                                <li><a href="mailto:app.jiroshi@gmail.com" className="hover:text-primary transition-colors">Contact Us</a></li>
                                <li><Link href="#support" className="hover:text-primary transition-colors">Billing Support</Link></li>
                                <li><a href="https://forms.gle/cNtkxWTjX1jiXMe88" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Feedback</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-slate-900">Legal</h4>
                            <ul className="space-y-2 text-sm text-slate-500">
                                <li><Link href="/legal/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/legal/terms-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
                        © {new Date().getFullYear()} Jiroshi. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

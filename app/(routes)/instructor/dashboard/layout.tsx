"use client"

import Link from "next/link";
import { DashboardSidebar } from "@/app/components/organism/InstructorDashboard/DashboardSidebar";
import { SidebarInset, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useRedirectForLoggedOut } from "@/feature/instructor/instructorHooks";
import Loader from "@/app/components/atoms/Loader";
import { useEffect, useState } from "react";
import { profile_completion } from "@/lib/constants/instructorConstants";
import { useRouter } from "next/navigation";
import { page } from "@/lib/constants/RouteConstants";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const { instructor, status, error } = useRedirectForLoggedOut();
  const [isMounted, setIsMounted] = useState(false);
  const { open, setOpen, isMobile } = useSidebar();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (instructor) {
      if (instructor?.profile_completion_status === profile_completion.PENDING) router.replace(page.SET_PROFILE)
    }
  }, [instructor])

  if (status === 'failed' && error) {
    return <div className="h-screen w-screen flex justify-center items-center text-red-400 text-2xl font-bold">
      Error: {error}. Please check your connection...
    </div>;
  }

  if (typeof window === 'undefined' || !isMounted || status === 'loading' || status === 'idle') return <Loader className="h-screen" />

  return (
    <>
      <DashboardSidebar profile={instructor} />
      <SidebarInset className="overflow-x-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 lg:hidden">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-border mx-2" />
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Instructor Dashboard</p>
        </header>
        <header className="hidden lg:flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-border mx-2" />
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Instructor Dashboard</p>
        </header>

        {/* Backdrop for Desktop (Mobile is handled by Sheet) */}
        {open && !isMobile && (
          <div
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-300"
            onClick={() => setOpen(false)}
          />
        )}

        <main className="flex-1 w-full overflow-y-auto bg-slate-50/50">
          <div className="container max-w-7xl mx-auto p-4 pt-2">
            {children}
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
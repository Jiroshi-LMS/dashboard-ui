"use client"

import Link from "next/link";
import { DashboardSidebar } from "@/app/components/organism/InstructorDashboard/DashboardSidebar";
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

  if (!isMounted || status === 'loading' || status === 'idle') return <Loader className="h-screen" />

  return (
    <>
      <DashboardSidebar profile={instructor} />
      {children}
    </>
  );
}
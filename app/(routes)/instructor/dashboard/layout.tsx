"use client"

import Link from "next/link";
import { DashboardSidebar } from "@/app/components/organism/InstructorDashboard/DashboardSidebar";
import { useRedirectForLoggedOut } from "@/feature/instructor/instructorHooks";
import Loader from "@/app/components/atoms/Loader";
import { useEffect } from "react";
import { profile_completion } from "@/lib/constants/instructorConstants";
import { useRouter } from "next/navigation";
import { page } from "@/lib/constants/RouteConstants";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const {instructor, status: instructorFetchingStatus} = useRedirectForLoggedOut()

  useEffect(() => {
    if (instructor) {
      if (instructor?.profile_completion_status === profile_completion.PENDING) router.replace(page.SET_PROFILE)
    }
  }, [instructor])

  return (
    <>
      {
        (!instructor && instructorFetchingStatus !== 'succeeded') ?
        <Loader className="h-screen"/> :
        <>
          <DashboardSidebar profile={instructor} />
          {children}
        </>
      }
    </>
  );
}
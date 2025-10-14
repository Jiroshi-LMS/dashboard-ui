"use client"

import Link from "next/link";
import { DashboardSidebar } from "@/app/components/organism/InstructorDashboard/DashboardSidebar";
import { useRedirectForLoggedOut } from "@/feature/instructor/instructorHooks";
import Loader from "@/app/components/atoms/Loader";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {instructor, status: instructorFetchingStatus} = useRedirectForLoggedOut()

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
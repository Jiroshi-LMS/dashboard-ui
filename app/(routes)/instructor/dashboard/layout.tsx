import Link from "next/link";
import { DashboardSidebar } from "@/app/components/organisms/InstructorDashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <DashboardSidebar />
        {children}
    </>
  );
}
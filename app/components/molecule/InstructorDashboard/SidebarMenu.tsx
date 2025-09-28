"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  LayoutDashboardIcon,
  GraduationCapIcon,
  UsersIcon,
  ChartAreaIcon,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const utilItems = [
  {
    title: "Dashboard",
    url: "/instructor/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Courses",
    url: "/instructor/dashboard/courses",
    icon: GraduationCapIcon,
  },
  {
    title: "Students",
    url: "/instructor/dashboard/students",
    icon: UsersIcon,
  },
  {
    title: "Analytics",
    url: "/instructor/dashboard/analytics",
    icon: ChartAreaIcon,
  },
];

export function SiderbarMenuContent() {
  const pathname = usePathname();
  return (
    <>
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                {utilItems.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <Link href={item.url}  className={isActive ? "bg-teal-500 text-white hover:bg-teal-500 hover:text-white" : ""}>
                        <item.icon />
                        <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                )})}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    </>
  );
}
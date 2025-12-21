"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  LayoutDashboardIcon,
  GraduationCapIcon,
  UsersIcon,
  ChartAreaIcon,
  NetworkIcon,
  KeyIcon,
  BookOpenIcon,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { page } from "@/lib/constants/RouteConstants";

// Menu items.
const utilItems = [
  {
    title: "Dashboard",
    url: page.DASHBOARD_HOME,
    icon: LayoutDashboardIcon,
  },
  {
    title: "Courses",
    url: page.LIST_COURSE,
    icon: GraduationCapIcon,
  },
  {
    title: "Students",
    url: "/instructor/dashboard/students",
    icon: UsersIcon,
  },
  // {
  //   title: "Analytics",
  //   url: "/instructor/dashboard/analytics",
  //   icon: ChartAreaIcon,
  // },
  {
    title: "Manage API Keys",
    url: "/instructor/dashboard/api-keys",
    icon: NetworkIcon,
  },
  {
    title: "Documentation",
    url: "/documentation-view/apis",
    icon: BookOpenIcon,
    target: "_blank",
  }
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
                    <Link href={item.url} className={isActive ? "bg-teal-500 text-white hover:bg-teal-500 hover:text-white" : ""} {...(item.target && { target: "_blank" })}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
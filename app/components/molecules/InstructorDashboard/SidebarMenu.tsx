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
  UserPlusIcon,
  HeadsetIcon,
  FormInputIcon,
  AlertCircle,
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
  {
    title: "Enrollments",
    url: "/instructor/dashboard/enrollments",
    icon: UserPlusIcon,
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
  },
  {
    title: "Report Issue",
    url: "https://mail.google.com/mail/?view=cm&fs=1&to=app.jiroshi@gmail.com&su=Bug%20Report%20-%20Jiroshi&body=Please%20describe%20the%20issue%20below:%0A%0A---%0AIssue%20Summary:%0A%0ASteps%20to%20Reproduce:%0A1.%20%0A2.%20%0A3.%20%0A%0AExpected%20Behavior:%0A%0AActual%20Behavior:%0A%0AAPI%20Endpoint%20(if%20any):%0A%0AAdditional%20Details:%0AScreenshots%20(if%20any):%0A---",
    icon: AlertCircle,
    target: "_blank",
  },
  {
    title: "Support",
    url: "https://mail.google.com/mail/?view=cm&fs=1&to=app.jiroshi@gmail.com&su=Jiroshi Pilot Program Application&body=Hi Jiroshi Team,%0D%0A%0D%0AI'm interested in the free Pilot Program. Here is some information about my platform:%0D%0A%0D%0A- Name:%0D%0A- Course Topic:%0D%0A- Contact Information:%0D%0A- Existing Website (if any):%0D%0A%0D%0AThank you!",
    icon: HeadsetIcon,
    target: "_blank",
  },
  {
    title: "Feedback",
    url: "https://forms.gle/cNtkxWTjX1jiXMe88",
    icon: FormInputIcon,
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
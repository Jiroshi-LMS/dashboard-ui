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
    url: "#",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Courses",
    url: "#",
    icon: GraduationCapIcon,
  },
  {
    title: "Students",
    url: "#",
    icon: UsersIcon,
  },
  {
    title: "Analytics",
    url: "#",
    icon: ChartAreaIcon,
  },
];

export function SiderbarMenuContent() {
  return (
    <>
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                {utilItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    </>
  );
}
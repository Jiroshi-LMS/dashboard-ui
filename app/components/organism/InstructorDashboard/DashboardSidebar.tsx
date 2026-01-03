import {
  Sidebar,
  SidebarContent
} from "@/components/ui/sidebar"
import { SidebarFooterContent, SidebarHeaderContent } from "../../molecules/InstructorDashboard/SidebarContent";
import { SiderbarMenuContent } from "../../molecules/InstructorDashboard/SidebarMenu"
import { Instructor } from "@/feature/instructor/instructorTypes";

export function DashboardSidebar({ profile }: { profile: Instructor | null }) {
  return (
    <Sidebar collapsible="icon" className="z-40 [&_[data-slot=sidebar-gap]]:w-(--sidebar-width-icon)!">
      <SidebarHeaderContent />
      <SidebarContent>
        <SiderbarMenuContent />
      </SidebarContent>
      <SidebarFooterContent profile={profile} />
    </Sidebar>
  )
}
import {
  Sidebar,
  SidebarContent
} from "@/components/ui/sidebar"
import { SidebarFooterContent, SidebarHeaderContent } from "../../molecules/InstructorDashboard/SidebarContent";
import { SiderbarMenuContent } from "../../molecules/InstructorDashboard/SidebarMenu"
import { Instructor } from "@/feature/instructor/instructorTypes";

export function DashboardSidebar({profile} :{profile: Instructor | null}) {
  return (
    <Sidebar>
      <SidebarHeaderContent />
      <SidebarContent>
        <SiderbarMenuContent />
      </SidebarContent>
      <SidebarFooterContent profile={profile} />
    </Sidebar>
  )
}
import {
  Sidebar,
  SidebarContent
} from "@/components/ui/sidebar"
import { SidebarFooterContent, SidebarHeaderContent } from "../../molecules/InstructorDashboard/SidebarContent";
import { SiderbarMenuContent } from "../../molecules/InstructorDashboard/SidebarMenu"

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeaderContent />
      <SidebarContent>
        <SiderbarMenuContent />
      </SidebarContent>
      <SidebarFooterContent />
    </Sidebar>
  )
}
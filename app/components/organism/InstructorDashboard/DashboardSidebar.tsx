import {
  Sidebar,
  SidebarContent
} from "@/components/ui/sidebar"
import { SidebarFooterContent, SidebarHeaderContent } from "../../molecule/InstructorDashboard/SidebarContent";
import { SiderbarMenuContent } from "../../molecule/InstructorDashboard/SidebarMenu"

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
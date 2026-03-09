import {
  Sidebar,
  SidebarContent
} from "@/components/ui/sidebar"
import { SidebarFooterContent, SidebarHeaderContent } from "../../molecules/InstructorDashboard/SidebarContent";
import { SiderbarMenuContent } from "../../molecules/InstructorDashboard/SidebarMenu"
import { Instructor } from "@/feature/instructor/instructorTypes";
import { ThemeToggle } from "@/app/components/atoms/ThemeToggle";

export function DashboardSidebar({ profile }: { profile: Instructor | null }) {
  return (
    <Sidebar collapsible="icon" className="z-40 [&_[data-slot=sidebar-gap]]:w-(--sidebar-width-icon)!">
      <SidebarHeaderContent />
      <SidebarContent>
        <SiderbarMenuContent />
      </SidebarContent>
      <div className="border-t border-slate-200/80 dark:border-slate-800 relative h-12 overflow-hidden">
        {/* Expanded sidebar: full toggle row */}
        <div className="absolute inset-0 px-3 py-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 transition-all duration-200 opacity-100 visible delay-200 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:invisible group-data-[collapsible=icon]:delay-0 pointer-events-auto group-data-[collapsible=icon]:pointer-events-none">
          <span>Appearance</span>
          <ThemeToggle compact />
        </div>
        {/* Collapsed sidebar: icon-only button */}
        <div className="absolute inset-0 flex justify-center items-center py-2 transition-all duration-200 opacity-0 invisible delay-0 group-data-[collapsible=icon]:opacity-100 group-data-[collapsible=icon]:visible group-data-[collapsible=icon]:delay-200 pointer-events-none group-data-[collapsible=icon]:pointer-events-auto">
          <ThemeToggle iconOnly />
        </div>
      </div>
      <SidebarFooterContent profile={profile} />
    </Sidebar>
  )
}
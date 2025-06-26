import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/layout/dashboard-header"

export default function DashboardPage() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <DashboardContent />
      </SidebarInset>
    </>
  )
}

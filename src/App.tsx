import { Routes, Route, Navigate } from "react-router-dom"
import { DashboardPage } from "./pages/DashboardPage"
import { SidebarProvider } from "@/components/ui/sidebar"

function App() {
  return (
    <SidebarProvider defaultOpen={true}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/analytics" element={<DashboardPage />} />
        <Route path="/crm" element={<DashboardPage />} />
        <Route path="/ecommerce" element={<DashboardPage />} />
        <Route path="/academy" element={<DashboardPage />} />
        <Route path="/logistics" element={<DashboardPage />} />
      </Routes>
    </SidebarProvider>
  )
}

export default App

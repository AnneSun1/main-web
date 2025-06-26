"use client"

import type * as React from "react"
import {
  Home,
  BarChart3,
  Users,
  ShoppingCart,
  GraduationCap,
  Truck,
  FileText,
  Mail,
  MessageCircle,
  Calendar,
  Kanban,
  Receipt,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const mainMenuItems = [
  {
    title: "CRM",
    icon: Users,
    isActive: false,
  },
  {
    title: "Analytics",
    icon: BarChart3,
    isActive: true,
  },
  {
    title: "eCommerce",
    icon: ShoppingCart,
    isActive: false,
  },
  {
    title: "Academy",
    icon: GraduationCap,
    isActive: false,
  },
  {
    title: "Logistics",
    icon: Truck,
    isActive: false,
  },
]

const appsAndPagesItems = [
  {
    title: "eCommerce",
    icon: ShoppingCart,
    hasSubmenu: true,
  },
  {
    title: "Academy",
    icon: GraduationCap,
    hasSubmenu: true,
  },
  {
    title: "Logistics",
    icon: Truck,
    hasSubmenu: true,
  },
  {
    title: "Email",
    icon: Mail,
    hasSubmenu: false,
  },
  {
    title: "Chat",
    icon: MessageCircle,
    hasSubmenu: false,
  },
  {
    title: "Calendar",
    icon: Calendar,
    hasSubmenu: false,
  },
  {
    title: "Kanban",
    icon: Kanban,
    hasSubmenu: false,
  },
  {
    title: "Invoice",
    icon: Receipt,
    hasSubmenu: true,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="none" className="w-64" {...props}>
      <SidebarHeader className="border-b border-border/40 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold text-sm">
              M
            </div>
            <span className="text-xl font-bold text-foreground">Nova Vacation</span>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback className="bg-muted">U</AvatarFallback>
          </Avatar>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-4">
        {/* Dashboards Section */}
        <div className="mb-6">
          <Collapsible defaultOpen>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between px-3 py-2 h-auto font-medium text-foreground hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <Home className="h-5 w-5" />
                  <span>Dashboards</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="h-5 px-2 text-xs">
                    5
                  </Badge>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="space-y-1 pl-8">{/* Submenu items would go here */}</div>
            </CollapsibleContent>
          </Collapsible>
        </div>

       

        {/* Front Pages Section */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="w-full justify-between px-3 py-2 h-auto font-medium text-foreground hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5" />
              <span>Front Pages</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Apps & Pages Section */}
        <div>
          <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Apps & Pages
          </div>
          <div className="space-y-1 mt-2">
            {appsAndPagesItems.map((item) => (
              <Button
                key={item.title}
                variant="ghost"
                className="w-full justify-between px-3 py-2 h-auto font-medium text-foreground hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </div>
                {item.hasSubmenu && <ChevronRight className="h-4 w-4" />}
              </Button>
            ))}
          </div>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

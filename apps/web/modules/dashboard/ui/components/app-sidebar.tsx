"use client";

import Link from "next/link";
import { NavUser } from "@/modules/dashboard/ui/components/nav-user";
import { NavMain } from "@/modules/dashboard/ui/components/nav-main";
import { LayoutDashboard, Wrench, Tag, FileText, Code, Newspaper } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";

const data = {
  navMain: [
    {
      title: "Painel",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Ferramentas",
      url: "/dashboard/tools",
      icon: Wrench,
    },
    {
      title: "Categorias",
      url: "/dashboard/categories",
      icon: Tag,
    },
    {
      title: "Páginas",
      url: "/dashboard/pages",
      icon: FileText,
    },
    {
      title: "Posts",
      url: "/dashboard/posts",
      icon: Newspaper,
    },
    {
      title: "Scripts",
      url: "/dashboard/scripts",
      icon: Code,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link href="/dashboard" className="flex items-center cursor-pointer">
                <span className="text-xl font-bold leading-none tracking-tight">PDFs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

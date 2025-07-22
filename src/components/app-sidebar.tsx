"use client";

import {
  IconBuildingStore,
  IconCategory,
  IconHelp,
  IconSettings,
} from "@tabler/icons-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChartNoAxesCombined, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "public/logo.svg";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

import { useTranslations } from "next-intl";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations();
  const navMain = [
    {
      title: t("statistic"),
      url: "/admin/dashboard",
      icon: ChartNoAxesCombined,
    },
    {
      title: t("users"),
      url: "/admin/dashboard/users",
      icon: Users,
    },
    {
      title: t("products"),
      url: "/admin/dashboard/products",
      icon: IconBuildingStore,
    },
    {
      title: t("categories"),
      url: "/admin/dashboard/categories",
      icon: IconCategory,
    },
  ];
  const navSecondary = [
    {
      title: t("settings"),
      url: "#",
      icon: IconSettings,
    },
    {
      title: t("getHelp"),
      url: "#",
      icon: IconHelp,
    },
  ];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/admin/dashboard">
              <Image
                src={logo}
                alt="logo"
                className="w-32 lg:w-36 rtl:scale-x-[-1]"
                priority
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

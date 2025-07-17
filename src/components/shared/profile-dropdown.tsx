"use client";
import { cn } from "@/lib/utils";
import {
  LogIn,
  LogOut,
  ShoppingBag,
  Star,
  User,
  UserPlus,
  UserRound,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";

const publicLinks = [
  { title: "signin", href: "/signin", Icon: LogIn },
  { title: "signup", href: "/signup", Icon: UserPlus },
];

const profileLinks = [
  { title: "myAccount", href: "/account", Icon: User },
  { title: "myOrder", href: "/orders", Icon: ShoppingBag },
  { title: "myReviews", href: "/reviews", Icon: Star },
  { title: "signout", href: "#", Icon: LogOut },
];

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const isLogged = false;
  const links = isLogged ? profileLinks : publicLinks;
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "rounded-full focus:outline-none p-2 bg-transparent cursor-pointer",
            open && " bg-main text-white"
          )}
        >
          <UserRound />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 min-w-60 text-white relative">
        <div className="absolute inset-0 -z-1 bg-gradient-to-tr blur-2xl from-[#ef7df6] via-black to-black" />
        <ul className="list-none *:hover:bg-black/20 text-sm">
          {links.map((item, i) => (
            <li key={i}>
              <Link
                href={item.href}
                className="flex gap-2 tracking-widest items-center p-2"
              >
                <item.Icon />
                <span>{t(item.title)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

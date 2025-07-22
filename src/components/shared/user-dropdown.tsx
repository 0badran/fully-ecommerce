"use client";
import { cn } from "@/lib/utils";
import { useUser } from "@stackframe/stack";
import {
  CircleX,
  LogIn,
  LogOut,
  Undo2,
  User,
  UserPlus,
  UserRound,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const publicLinks = [
  { title: "signin", href: "/signin", Icon: LogIn },
  { title: "signup", href: "/signup", Icon: UserPlus },
];

const profileLinks = [
  { title: "myAccount", href: "/account", Icon: User },
  { title: "myReturns", href: "/account/returns", Icon: Undo2 },
  { title: "myCancellations", href: "/account/cancellations", Icon: CircleX },
  { title: "signout", href: "#", Icon: LogOut },
];

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const user = useUser();
  const links = user ? profileLinks : publicLinks;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {user ? (
          <Avatar className="cursor-pointer size-10">
            <AvatarImage src={user.profileImageUrl || ""} />
            <AvatarFallback className="bg-main text-white">
              {user.displayName?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        ) : (
          <button
            className={cn(
              "rounded-full focus:outline-none size-10 bg-transparent cursor-pointer",
              open && " bg-main text-white"
            )}
          >
            <UserRound className="mx-auto" />
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 min-w-60 text-white relative">
        <div className="absolute inset-0 -z-1 bg-gradient-to-tr blur-2xl from-[#ef7df6] via-black to-black" />
        <ul className="list-none *:hover:bg-black/20 text-sm">
          {links.map((item, i) => (
            <li
              key={i}
              onClick={() => {
                if (item.title === "signout") {
                  user?.signOut();
                }
                setOpen(false);
              }}
            >
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

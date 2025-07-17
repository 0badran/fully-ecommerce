"use client";
import { cn } from "@/lib/utils";
import { AlignJustify, Heart, Search, ShoppingCart, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { Input } from "../ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import ProfileDropdown from "./profile-dropdown";
import { usePathname } from "next/navigation";

interface Props {
  links: { title: string; href: string }[];
}

export default function NavbarSheet({ links }: Props) {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="cursor-pointer">
        {open ? <X /> : <AlignJustify />}
      </SheetTrigger>
      <SheetContent className="px-2 space-y-2">
        <ul className="mt-10 space-y-2">
          {links.map((item) => (
            <li
              key={item.href}
              className={cn(
                `hover:bg-secondary px-3 py-1 rounded`,
                pathname === item.href && "bg-secondary"
              )}
            >
              <Link href={item.href}>{t(item.title)}</Link>
            </li>
          ))}
        </ul>
        <div className="flex justify-around items-center gap-4">
          <Heart />
          <ShoppingCart />
          <ProfileDropdown />
        </div>

        <search className="relative">
          <Input
            type="search"
            name="search"
            id="search"
            placeholder={t("searchPlaceholder")}
            className="h-10 px-4 w-full bg-secondary placeholder:text-black/50 placeholder:text-sm placeholder:md:text-base"
          />
          <Search className="absolute end-3 top-1/2 -translate-y-1/2" />
        </search>
      </SheetContent>
    </Sheet>
  );
}

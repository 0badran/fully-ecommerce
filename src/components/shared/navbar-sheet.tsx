"use client";
import {
  AlignJustify,
  Heart,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

interface Props {
  links: { title: string; href: string }[];
  isLinkActive: (link: string) => boolean;
}

export default function NavbarSheet({ links, isLinkActive }: Props) {
  const [open, setOpen] = useState(false);
  const t = useTranslations();

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
                isLinkActive(item.href) && "bg-secondary"
              )}
            >
              <Link href={item.href}>{t(item.title)}</Link>
            </li>
          ))}
        </ul>
        <div className="flex justify-around items-center gap-4">
          <Heart />
          <ShoppingCart />
          <UserRound />
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

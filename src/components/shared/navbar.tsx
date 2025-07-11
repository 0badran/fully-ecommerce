"use client";
import { cn } from "@/lib/utils";
import { Heart, Search, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LocaleTrigger from "./locale-trigger";
import { useTranslations } from "next-intl";
import { Input } from "../ui/input";
import NavbarSheet from "./navbar-sheet";
const links = [
  { title: "home", href: "/" },
  { title: "contact", href: "/contact" },
  { title: "about", href: "/about" },
];
export default function Navbar() {
  const pathname = usePathname();
  const isLinkActive = (link: string) => pathname === link;
  const t = useTranslations();

  return (
    <nav className="border-b border-black/30">
      <div className="bg-black text-white p-2">
        <div className="container flex items-center">
          <div className="justify-self-center w-full line-clamp-1 text-center">
            <span>{t("headOffer")}</span>
            <Link href={"#"} className="text-white underline ml-2 font-medium">
              {t("shopNow")}
            </Link>
          </div>
          <LocaleTrigger />
        </div>
      </div>
      <div className="container flex justify-between items-center mt-7 lg:mt-12 mb-4">
        <div className="text-lg sm:text-2xl font-bold">{t("exclusive")}</div>

        {/* Start Desktop Nav */}
        <ul className="hidden md:flex justify-center items-center gap-4 lg:gap-7">
          {links.map((item) => (
            <li
              key={item.href}
              className={cn(
                `hover:underline underline-offset-4`,
                isLinkActive(item.href) && "underline"
              )}
            >
              <Link href={item.href}>{t(item.title)}</Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-4">
          <search className="relative">
            <Input
              type="search"
              name="search"
              id="search"
              placeholder={t("searchPlaceholder")}
              className="h-10 px-4 min-w-[270px] lg:min-w-xs bg-secondary placeholder:text-black/50"
            />
            <Search className="absolute end-3 top-1/2 -translate-y-1/2" />
          </search>
          <Heart />
          <ShoppingCart />
          <UserRound />
        </div>
        {/* End Desktop Nav */}

        {/* Start Mobile Nav */}
        <div className="block md:hidden">
          <NavbarSheet links={links} isLinkActive={isLinkActive} />
        </div>
        {/* End Mobile Nav */}
      </div>
    </nav>
  );
}

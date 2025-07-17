"use client";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "public/logo.png";
import { Input } from "../ui/input";
import CartLink from "./cart-link";
import LocaleTrigger from "./locale-trigger";
import NavbarSheet from "./navbar-sheet";
import ProfileDropdown from "./profile-dropdown";
import ShopNow from "./shop-now";
import WishlistLink from "./wishlist-link";
const links = [
  { title: "home", href: "/" },
  { title: "contact", href: "/contact" },
  { title: "about", href: "/about" },
];
export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <nav className="border-b border-black/30">
      <div className="bg-black text-white p-2">
        <div className="container flex items-center">
          <div className="justify-center flex flex-1 gap-2 text-center">
            <p className="line-clamp-1">{t("headOffer")}</p>
            <div className="hidden md:block">
              <ShopNow href="#" />
            </div>
          </div>
          <LocaleTrigger />
        </div>
      </div>
      <div className="container flex justify-between items-center mt-7 lg:mt-12 mb-4">
        <Link href={"/"}>
          <Image src={logo} alt="logo" className="w-36" priority />
        </Link>

        {/* Start Desktop Nav */}
        <ul className="hidden md:flex justify-center items-center gap-4 lg:gap-7">
          {links.map((item) => (
            <li
              key={item.href}
              className={cn(
                `hover:underline underline-offset-4`,
                pathname === item.href && "underline"
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
          <WishlistLink />
          <CartLink />
          <ProfileDropdown />
        </div>
        {/* End Desktop Nav */}

        {/* Start Mobile Nav */}
        <div className="block md:hidden">
          <NavbarSheet links={links} />
        </div>
        {/* End Mobile Nav */}
      </div>
    </nav>
  );
}

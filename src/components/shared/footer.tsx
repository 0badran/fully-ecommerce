import Image from "next/image";
import React from "react";
import qr from "public/qr.png";
import googlePlay from "public/google-play.png";
import appStore from "public/app-store.png";
import { useTranslations } from "next-intl";
import { Input } from "../ui/input";
import logo from "public/logo.png";
import {
  Facebook,
  Instagram,
  Linkedin,
  SendHorizontal,
  Twitter,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="bg-black text-white pt-12 pb-4 mt-20 space-y-10">
      <div className="container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-7 md:gap-10 lg:gap-16">
        {/* Exclusive */}
        <div className="">
          <Link href={"/"}>
            <Image src={logo} alt="logo" className="w-36" priority />
          </Link>
          <h3 className="sm:text-lg font-medium mb-2">{t("subscribe")}</h3>
          <p className="text-xs sm:text-base mb-4">{t("getOffer")}</p>
          <form className="flex items-center border-[1.5px] border-white rounded overflow-hidden">
            <Input
              type="email"
              placeholder={t("emailPlaceholder")}
              className="bg-transparent placeholder:text-xs px-2 sm:px-4 py-2 text-white focus:outline-none focus-visible:ring-0 border-0 flex-1"
            />
            <button
              type="submit"
              className="px-3 sm:px-4 py-2 rtl:scale-x-[-1] hover:bg-main cursor-pointer transition"
            >
              <SendHorizontal className="size-4 sm:size-auto" />
            </button>
          </form>
        </div>
        {/* Support */}
        <div className="space-y-2 text-xs sm:text-base">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            {t("support")}
          </h2>
          <p>{t("address")}</p>
          <p>0ahmedbadran@gmail.com</p>
          <p>+201063806110</p>
        </div>
        {/* Account */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            {t("account")}
          </h2>
          <ul className="space-y-2 text-xs sm:text-base">
            <li>
              <Link href="#">{t("myAccount")}</Link>
            </li>
            <li>
              <Link href="#">{t("signinSignup")}</Link>
            </li>
            <li>
              <Link href="#">{t("cart")}</Link>
            </li>
            <li>
              <Link href="#">{t("wishlist")}</Link>
            </li>
          </ul>
        </div>
        {/* Quick Link */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            {t("quickLinks")}
          </h2>
          <ul className="space-y-2 text-xs sm:text-base">
            <li>
              <Link href="#">{t("privacy")}</Link>
            </li>
            <li>
              <Link href="#">{t("terms")}</Link>
            </li>
            <li>
              <Link href="#">{t("contact")}</Link>
            </li>
          </ul>
        </div>
        {/* Download App */}
        <div>
          <h2 className="text-xl sm:text-2xl font-medium mb-4">
            {t("downloadApp")}
          </h2>
          <p className="text-white/40 text-sm mb-2">{t("saveNewUser")}</p>
          <div className="flex items-center gap-2 mb-2">
            <Image src={qr} alt="QR Code" className="size-20 rounded" />
            <div className="flex flex-col gap-2">
              <Image
                src={googlePlay}
                alt="Google Play"
                className="w-26 h-7.5"
              />
              <Image src={appStore} alt="App Store" className="w-26 h-7.5" />
            </div>
          </div>
          <div className="flex gap-4 mt-2">
            <Link href="#">
              <Facebook className="size-5 sm:auto" />
            </Link>
            <Link href="#">
              <Twitter className="size-5 sm:auto" />
            </Link>
            <Link href="#">
              <Instagram className="size-5 sm:auto" />
            </Link>
            <Link href="#">
              <Linkedin className="size-5 sm:auto" />
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center text-white/40 text-sm border-t border-white/40 pt-3">
        <span className="text-lg font-light align-middle">&copy;</span>{" "}
        {t("copyright", { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}

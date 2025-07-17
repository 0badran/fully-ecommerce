"use client";

import MainButton from "@/components/shared/main-button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import authSide from "public/auth-side.webp";

export default function SigninPage() {
  const t = useTranslations();
  return (
    <main className="max-md:container flex flex-col md:flex-row md:me-[9%] gap-10 md:gap-20 mt-10 max-md:justify-center max-md:text-center items-center">
      {/* Image side */}
      <aside>
        <Image
          src={authSide}
          alt={t("authSideAlt")}
          className="max-md:size-50 max-md:rounded-full md:w-200 object-cover md:h-175"
        />
      </aside>

      {/* Form side */}
      <aside className="space-y-10 flex-1">
        {/* Headline */}
        <section>
          <h1 className="mb-5 font-medium text-2xl md:text-4xl">
            {t("welcomeBack")}
          </h1>
          <p>{t("enterDetails")}</p>
        </section>

        <form action="" className="space-y-7">
          <div className="">
            <Input
              type="email"
              name="email"
              placeholder={t("emailOrPhone")}
              className="border-0 border-b-2 rounded-none focus-visible:ring-0 shadow-none"
            />
          </div>

          <div className="">
            <Input
              type="password"
              name="password"
              placeholder={t("password")}
              className="border-0 border-b-2 rounded-none focus-visible:ring-0 shadow-none mb-4"
            />
            <Link href="/forget-password" className="text-main">
              {t("forgetPassword")}
            </Link>
          </div>

          <MainButton
            type="submit"
            text={t("createAccountBtn")}
            className="w-full"
          />

          <p className="text-center">
            {t("noHaveAccount")}?{" "}
            <Link
              href={"/signup"}
              className="inline align-middle underline underline-offset-4"
            >
              {t("createAccount")}
            </Link>
          </p>
        </form>
      </aside>
    </main>
  );
}

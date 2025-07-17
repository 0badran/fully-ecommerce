"use client";

import CountrySelect from "@/components/shared/country-select";
import MainButton from "@/components/shared/main-button";
import RePhoneInput from "@/components/shared/re-phone-input";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import authSide from "public/auth-side.webp";
import { useState } from "react";

export default function SignupPage() {
  const [country, setCountry] = useState("EG");
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
            {t("createAccount")}
          </h1>
          <p>{t("enterDetails")}</p>
        </section>

        <form action="" className="space-y-7">
          <div className="">
            <Input
              type="text"
              name="name"
              placeholder={t("name")}
              className="border-0 border-b-2 rounded-none focus-visible:ring-0 shadow-none"
            />
          </div>
          <div className="">
            <Input
              type="email"
              name="email"
              placeholder={t("email")}
              className="border-0 border-b-2 rounded-none focus-visible:ring-0 shadow-none"
            />
          </div>
          <div className="">
            <RePhoneInput
              onChange={() => {}}
              name="phone"
              placeholder={t("phone")}
              className="border-0 border-b-2 rounded-none shadow-none px-3 py-1"
            />
          </div>
          <CountrySelect
            value={country}
            onChange={setCountry}
            className="shadow-none border-b-2 focus-visible:ring-0 rounded-none"
            placeholder={t("country")}
          />
          <div className="">
            <Input
              type="date"
              name="birthdate"
              defaultValue={"1999-07-02"}
              placeholder={t("birthdate")}
              className="border-0 border-b-2 rounded-none focus-visible:ring-0 shadow-none"
            />
          </div>
          <div className="">
            <Input
              type="password"
              name="password"
              placeholder={t("password")}
              className="border-0 border-b-2 rounded-none focus-visible:ring-0 shadow-none"
            />
          </div>

          <MainButton
            type="submit"
            text={t("createAccountBtn")}
            className="w-full"
          />

          <p className="text-center">
            {t("alreadyHaveAccount")}{" "}
            <Link
              href={"/signin"}
              className="inline align-middle underline underline-offset-4"
            >
              {t("signin")}
            </Link>
          </p>
        </form>
      </aside>
    </main>
  );
}

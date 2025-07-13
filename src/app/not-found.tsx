"use client";

import Breadcrumbs from "@/components/shared/breadcrumbs";
import MainButton from "@/components/shared/main-button";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations();

  return (
    <section className="container mt-5">
      <Breadcrumbs links={[{ href: "#", label: t("error404") }]} />
      <div className="flex flex-col text-center gap-4 justify-center items-center">
        <h2 className="text-[40px] sm:text-[60px] md:text-[70px] lg:text-[100px] font-medium">
          {t("notfound")}
        </h2>
        <p>{t("notfoundDes")}</p>
        <Link href={"/"}>
          <MainButton text={t("backHome")} />
        </Link>
      </div>
    </section>
  );
}

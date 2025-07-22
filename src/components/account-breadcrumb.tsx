"use client";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function AccountBreadcrumb() {
  const pathname = usePathname();
  const labels = pathname.split("/").slice(1);
  const t = useTranslations();

  return (
    <Breadcrumbs
      links={labels.map((label) => ({ label: t(label), href: `/${label}` }))}
    />
  );
}

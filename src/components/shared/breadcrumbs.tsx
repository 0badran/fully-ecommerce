import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function Breadcrumbs({
  links,
}: {
  links: Array<{ label: string; href: string }>;
}) {
  const t = useTranslations();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={"/"}>{t("home")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {links.map(({ label, href }, i) => (
          <React.Fragment key={i}>
            /
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={href}
                  className={cn(links.length === i + 1 && "text-black")}
                >
                  {label}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

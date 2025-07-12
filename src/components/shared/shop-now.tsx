import { useTranslations } from "next-intl";
import Link from "next/link";
import { ElementType } from "react";

export default function ShopNow({
  href,
  Icon,
}: {
  href: string;
  Icon?: ElementType;
}) {
  const t = useTranslations();
  return (
    <Link href={href} className="flex gap-2 font-medium">
      <span className="underline underline-offset-6 font-medium">
        {t("shopNow")}
      </span>
      {Icon && <Icon className="rtl:rotate-180" />}
    </Link>
  );
}

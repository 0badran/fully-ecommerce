"use client";
import { useTransition } from "react";
import { Locale } from "@/i18n/config";
import { useLocale } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { setUserLocale } from "@/cookies";

export default function LocaleTrigger() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <Select disabled={isPending} value={locale} onValueChange={onChange}>
      <SelectTrigger className="w-28 p-0 justify-end rtl:justify-start gap-2 text-white border-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ar">العربية</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  );
}

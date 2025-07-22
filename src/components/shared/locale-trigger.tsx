"use client";
import { setUserLocale } from "@/cookies";
import { Locale } from "@/i18n/config";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

export default function LocaleTrigger({ className }: { className?: string }) {
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
      <SelectTrigger
        className={cn(
          "w-28 p-0 justify-end rtl:justify-start gap-2 text-white focus-visible:ring-0 border-0",
          className
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ar">العربية</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  );
}

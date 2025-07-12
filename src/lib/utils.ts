import { Locale } from "@/i18n/config";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
type Dir = "rtl" | "ltr";

export function dirHelper(locale: Locale): "rtl" | "ltr" {
  return { ar: "rtl", en: "ltr" }[locale] as Dir;
}

import { getUserLocale } from "@/cookies";
import { NextIntlClientProvider } from "next-intl";

export const cache = "force-cache";

export default async function NextIntProvider({
  children,
}: // localePromise,
Readonly<{
  children: React.ReactNode;
  // localePromise: Promise<Locale>;
}>) {
  const locale = await getUserLocale();
  return (
    <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>
  );
}

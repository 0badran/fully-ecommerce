"use client";
import MainButton from "@/components/shared/main-button";
import { Button } from "@/components/ui/button";
import { Bug } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Bug className="h-16 w-16 text-red-500" />
      <h1 className="text-3xl font-bold text-black">{error.message}</h1>
      <div className="flex gap-4 mt-4">
        <MainButton text={t("tryAgain")} onClick={() => reset()} />
        <Button asChild variant="secondary">
          <Link href="/">{t("backToHome")}</Link>
        </Button>
      </div>
    </div>
  );
}

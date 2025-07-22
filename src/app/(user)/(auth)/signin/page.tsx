"use client";

import { signIn } from "@/actions";
import MainButton from "@/components/shared/main-button";
import { Input } from "@/components/ui/input";
import { OAuthButton } from "@stackframe/stack";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import authSide from "public/auth-side.webp";
import { useActionState, useCallback, useEffect } from "react";
import { toast } from "sonner";

export default function SigninPage() {
  const [state, action, pending] = useActionState(signIn, null);
  const t = useTranslations();

  const fromResult = useCallback(() => {
    if (state?.error) {
      const { error } = state;
      if (Array.isArray(error)) {
        return toast.error(
          <ul className="px-3 list-disc">
            {error.map((e, i) => (
              <li key={i}>{e.message}</li>
            ))}
          </ul>
        );
      }
      return toast.error(t(error));
    }
  }, [state, t]);

  useEffect(() => {
    fromResult();
  }, [fromResult]);

  return (
    <main className="container flex flex-col md:flex-row gap-10 mt-10 max-md:justify-center max-md:text-center items-center md:justify-between">
      {/* Image side */}
      <aside className="ms-break-out">
        <Image
          src={authSide}
          alt={t("authSideAlt")}
          className="max-md:size-50 max-md:rounded-full md:size-120 xl:min-w-200 object-cover xl:min-h-175"
        />
      </aside>

      {/* Form side */}
      <aside className="space-y-7 w-full md:flex-1">
        {/* Headline */}
        <section>
          <h1 className="mb-10 font-medium text-2xl md:text-4xl">
            {t("welcomeBack")}
          </h1>
          <p>{t("enterDetails")}</p>
        </section>

        <form action={action} className="space-y-7">
          <div className="">
            <Input
              type="email"
              name="email"
              required
              placeholder={t("emailOrPhone")}
              className="border-0 border-b-2 rounded-none focus-visible:ring-0 shadow-none"
            />
          </div>

          <div className="">
            <Input
              type="password"
              name="password"
              required
              minLength={6}
              placeholder={t("password")}
              className="border-0 border-b-2 rounded-none focus-visible:ring-0 shadow-none mb-4"
            />
            <Link href="/forget-password" className="text-main">
              {t("forgetPassword")}
            </Link>
          </div>

          <MainButton
            type="submit"
            disabled={pending}
            text={t("createAccountBtn")}
            className="w-full"
          />
          <div className="oauth-button">
            <OAuthButton type="sign-in" provider="google" />
          </div>

          <p className="text-center">
            {t("noHaveAccount")}?{" "}
            <Link
              href={"/signup"}
              className="inline align-middle underline underline-offset-4"
            >
              {t("createAccount")}
            </Link>
          </p>
        </form>
      </aside>
    </main>
  );
}

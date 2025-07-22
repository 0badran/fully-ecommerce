"use client";

import { signUp } from "@/actions";
import CountrySelect from "@/components/shared/country-select";
import MainButton from "@/components/shared/main-button";
import RePhoneInput from "@/components/shared/re-phone-input";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { OAuthButton } from "@stackframe/stack";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import authSide from "public/auth-side.webp";
import { useActionState, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthdate: undefined,
    country: "EG",
  });

  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const [state, action, pending] = useActionState(signUp, null);

  const formResult = useCallback(() => {
    if (state?.error) {
      const { error } = state;
      // Display error list
      if (Array.isArray(error)) {
        return toast.error(
          <ul className="px-3 list-disc">
            {error.map((err) => (
              <li key={err.path + `${Math.random()}`}>{err.message}</li>
            ))}
          </ul>
        );
      }

      if (error === "KnownError<USER_EMAIL_ALREADY_EXISTS>") {
        return toast.error(t("userExist"));
      }
      return t("unknownUserError");
    }
  }, [state, t]);

  useEffect(() => {
    formResult();
  }, [formResult]);

  const updateForm = (key: keyof typeof form, value: string | Date) =>
    setForm((prev) => {
      return { ...prev, [key]: value };
    });

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
      <form
        action={(formData) => {
          formData.append("country", form.country);
          formData.append("birthdate", form.birthdate + "");
          return action(formData);
        }}
        className="space-y-7 w-full md:flex-1 max-w-lg"
      >
        {/* Headline */}
        <section>
          <h1 className="mb-10 font-medium text-2xl md:text-4xl">
            {t("createAccount")}
          </h1>
          <p>{t("enterDetails")}</p>
        </section>

        {/* Name */}
        <div className="">
          <Input
            type="text"
            required
            name="name"
            value={form.name}
            onChange={(e) => updateForm("name", e.target.value)}
            placeholder={t("name")}
            className="border-0 border-b-2 rounded-none focus-visible:ring-0 shadow-none"
          />
        </div>

        {/* Email */}
        <div className="">
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => updateForm("email", e.target.value)}
            required
            placeholder={t("email")}
            className="border-0 border-b-2 rounded-none focus-visible:ring-0 shadow-none"
          />
        </div>

        {/* Phone */}
        <div className="">
          <RePhoneInput
            name="phone"
            required
            value={form.phone}
            onChange={(value) => updateForm("phone", value as string)}
            min={10}
            placeholder={t("phone")}
            className="border-0 border-b-2 rounded-none shadow-none px-3 py-1"
          />
        </div>

        {/* Country */}
        <CountrySelect
          value={form.country}
          onChange={(value) => updateForm("country", value)}
          className="shadow-none border-b-2 focus-visible:ring-0 rounded-none"
          placeholder={t("country")}
        />

        {/* Birthdate */}
        <div className="">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              className={cn(
                "shadow-none text-description border-b-2 px-3 py-1 w-full text-start flex items-center justify-between focus-visible:ring-0 rounded-none",
                form.birthdate && "text-black"
              )}
            >
              {form.birthdate
                ? format(form.birthdate, "yyyy-MM-dd")
                : t("birthdate")}
              <ChevronDown size={16} />
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={form.birthdate}
                captionLayout="dropdown"
                onSelect={(date) => {
                  updateForm("birthdate", date as Date);
                  setOpen(false);
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Password */}
        <div className="">
          <Input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={(e) => updateForm("password", e.target.value)}
            minLength={6}
            placeholder={t("password")}
            className="border-0 border-b-2 rounded-none focus-visible:ring-0 shadow-none"
          />
        </div>

        <MainButton
          type="submit"
          disabled={pending}
          text={t("createAccountBtn")}
          className="w-full"
        />
        <div className="oauth-button">
          <OAuthButton type="sign-up" provider="google" />
        </div>
        <p className="text-center">
          {t("alreadyHaveAccount")}{" "}
          <Link
            href={"/signin"}
            className="inline align-middle underline underline-offset-4"
          >
            {t("signin")}
          </Link>
        </p>
      </form>
    </main>
  );
}

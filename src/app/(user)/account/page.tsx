"use client";
import { updateAccount } from "@/actions";
import CountrySelect from "@/components/shared/country-select";
import EditUserAvatar from "@/components/shared/edit-user-avatar";
import MainButton from "@/components/shared/main-button";
import RePhoneInput from "@/components/shared/re-phone-input";
import AccountFormSkeleton from "@/components/skeleton/account-form-skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@stackframe/stack";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import z from "zod";

export default function AccountPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    if (redirect === "signup") {
      toast.info("Signup successfully, look at email to verify your account.", {
        position: "top-center",
      });
    }
  }, [redirect]);

  return (
    <div className="flex flex-col items-start gap-8 w-full">
      <Card className="w-full mx-auto p-6">
        <h2 className="text-main text-lg font-semibold mb-5">
          {t("editProfile")}
        </h2>
        <Suspense fallback={<AccountFormSkeleton />}>
          <UpdateUserDataForm t={t} />
        </Suspense>
      </Card>
    </div>
  );
}

function UpdateUserDataForm({ t }: { t: (v: string) => string }) {
  const user = useUser();
  const userMetadata = user?.clientMetadata as UserMetadata;
  const [viewMode, setViewMode] = useState(true);
  const [pending, setPending] = useState(false);
  const [passwordPending, setPasswordPending] = useState(false);

  const [form, setForm] = useState({
    name: user?.displayName || "",
    email: user?.primaryEmail || "",
    phone: userMetadata?.phone,
    country: userMetadata?.country,
  });

  if (!user) return;

  async function updateUser(formData: FormData) {
    setPending(true);
    const { error } = await updateAccount(formData);
    setPending(false);
    if (error) {
      if (Array.isArray(error)) {
        toast.error(error.map((item) => item.message));
        return;
      }
      toast.error(t("error"));
      return;
    }
    toast(t("userUpdated"));
    setViewMode(true);
  }

  const updateFormInputs = (key: keyof typeof form, value: string | Date) =>
    setForm((prev) => {
      if (viewMode) {
        setViewMode(false);
      }
      return { ...prev, [key]: value };
    });

  return (
    <>
      <form
        action={(formData) => {
          formData.append("country", form.country);
          updateUser(formData);
        }}
        className="space-y-6"
      >
        {/* Edit user avatar */}
        <EditUserAvatar
          user={{
            id: user.id,
            displayName: user.displayName,
            profileImageUrl: user.profileImageUrl,
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="space-y-4">
            <Label htmlFor="name">{t("name")}</Label>
            <Input
              id="name"
              name="name"
              type="text"
              className="bg-secondary"
              value={form.name}
              onChange={(e) => updateFormInputs("name", e.target.value)}
            />
          </div>
          {/* Email */}
          <div className="space-y-4">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              className="bg-secondary"
              disabled={true}
            />
          </div>
          {/* Phone */}
          <div className="space-y-4">
            <Label htmlFor="phone">{t("phone")}</Label>
            <RePhoneInput
              className="bg-secondary w-full h-9 md:h-12.5 rounded px-2"
              value={form.phone}
              onChange={(v) => updateFormInputs("phone", v!)}
              name="phone"
              countryCallingCodeEditable={true}
              defaultValue={""}
            />
          </div>
          {/* Country */}
          <div className="space-y-4">
            <Label htmlFor="country">{t("country")}</Label>
            <CountrySelect
              id="country"
              className="bg-secondary hover:bg-secondary w-full h-9 md:h-12.5 rounded px-2"
              value={form.country}
              onChange={(v) => updateFormInputs("country", v)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <Button
            onClick={() => {
              setForm({
                name: user!.displayName + "",
                email: user!.primaryEmail + "",
                phone: userMetadata?.phone,
                country: userMetadata?.country,
              });
              setViewMode(true);
            }}
            type="button"
            variant={"outline"}
          >
            {t("cancel")}
          </Button>
          <MainButton
            type={"submit"}
            onClick={() => setViewMode(false)}
            text={t("saveChanges")}
            className="px-8"
            disabled={viewMode || pending}
          />
        </div>
      </form>

      {/* Change Password */}
      {(() => {
        if (user?.hasPassword) {
          async function changePassword(formData: FormData) {
            const schema = z
              .object({
                password: z.string(t("nonempty")).min(6, t("minPassword")),
                newPassword: z.string(t("nonempty")).min(6, t("minPassword")),
                confirmNewPassword: z
                  .string(t("nonempty"))
                  .min(8, t("minPassword")),
              })
              .refine((data) => data.confirmNewPassword === data.newPassword, {
                error: t("passwordMismatch"),
                path: ["confirmNewPassword"],
              });

            const validationResult = schema.safeParse({
              password: formData.get("password"),
              newPassword: formData.get("new-password"),
              confirmNewPassword: formData.get("confirm-new-password"),
            });

            if (validationResult.error) {
              toast.error(
                validationResult.error.issues?.map(
                  (item) => item.message
                ) /* Return messages error as array */
              );
              return;
            }
            const { data } = validationResult;
            setPasswordPending(true);
            const error = await user?.updatePassword({
              oldPassword: data.password,
              newPassword: data.newPassword,
            });
            setPasswordPending(false);

            if (error) {
              if (error?.errorCode === "PASSWORD_CONFIRMATION_MISMATCH") {
                toast.error(t("currentPasswordInvalid"));
                return;
              }
              toast.error(t("unknownPasswordError"));
              return;
            }
            toast.success("passwordUpdated");
          }

          return (
            <form action={changePassword} className="space-y-2">
              <hr className="space-y-4" />

              <h3 className="text-2xl mb-5">{t("passwordChanges")}</h3>
              <Input
                type="password"
                name="password"
                placeholder={t("currentPassword")}
                className="bg-secondary"
              />
              <Input
                type="password"
                name="new-password"
                placeholder={t("newPassword")}
                className="bg-secondary"
              />
              <Input
                type="password"
                name="confirm-new-password"
                placeholder={t("confirmNewPassword")}
                className="bg-secondary mb-5"
              />
              <MainButton
                type={"submit"}
                text={t("updatePassword")}
                disabled={passwordPending}
              />
            </form>
          );
        }
      })()}
    </>
  );
}

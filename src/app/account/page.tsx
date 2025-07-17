"use client";
import CountrySelect from "@/components/shared/country-select";
import MainButton from "@/components/shared/main-button";
import RePhoneInput from "@/components/shared/re-phone-input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function AccountPage() {
  const [country, setCountry] = useState("EG");
  const t = useTranslations();
  return (
    <div className="flex flex-col items-start gap-8 w-full">
      <Card className="w-full mx-auto p-6">
        <h2 className="text-main text-lg font-semibold mb-6">
          {t("editProfile")}
        </h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label htmlFor="name">{t("name")}</Label>
              <Input
                id="name"
                type="text"
                defaultValue="Md"
                className="bg-secondary"
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                defaultValue="rimel111@gmail.com"
                className="bg-secondary"
                disabled
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="phone">{t("phone")}</Label>
              <RePhoneInput
                className="bg-secondary w-full h-9 md:h-12.5 rounded px-2"
                id="phone"
                onChange={(e) => console.log(e)}
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="country">{t("country")}</Label>
              <CountrySelect
                id="country"
                value={country}
                onChange={setCountry}
                className="bg-secondary hover:bg-secondary w-full h-9 md:h-12.5 rounded px-2"
                placeholder={t("country")}
              />
            </div>
          </div>
          <div className="space-y-2 mt-6">
            <Label>{t("passwordChanges")}</Label>
            <Input
              type="password"
              placeholder={t("currentPassword")}
              className="bg-secondary"
            />
            <Input
              type="password"
              placeholder={t("newPassword")}
              className="bg-secondary"
            />
            <Input
              type="password"
              placeholder={t("confirmNewPassword")}
              className="bg-secondary"
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant={"outline"}>
              {t("cancel")}
            </Button>
            <MainButton
              type="submit"
              text={t("saveChanges")}
              className="px-8"
            />
          </div>
        </form>
      </Card>
    </div>
  );
}

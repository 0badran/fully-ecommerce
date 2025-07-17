"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MainButton from "@/components/shared/main-button";
import { useTranslations } from "next-intl";
import RePhoneInput from "@/components/shared/re-phone-input";

export default function AddressPage() {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-8 w-full">
      <Card className="w-full max-w-2xl mx-auto p-8 bg-white border border-gray-200 shadow-sm">
        <h2 className="text-main text-lg font-semibold mb-6">
          {t("manageAddresses")}
        </h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label htmlFor="address">{t("address")}</Label>
              <Input id="address" type="text" className="bg-secondary" />
            </div>

            <div className="space-y-4">
              <Label htmlFor="phone">{t("phone")}</Label>
              <RePhoneInput
                className="bg-secondary w-full h-9 md:h-12.5 rounded px-2"
                id="phone"
                onChange={(e) => console.log(e)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label htmlFor="zip">{t("zipCode")}</Label>
              <Input id="zip" type="text" className="bg-secondary" />
            </div>
            <div className="space-y-4">
              <Label htmlFor="city">{t("townCity")}</Label>
              <Input
                id="city"
                type="text"
                className="bg-secondary w-full md:h-12.5 rounded"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <MainButton
              type="submit"
              text={t("saveAddress")}
              className="px-8"
            />
          </div>
        </form>
      </Card>
    </div>
  );
}

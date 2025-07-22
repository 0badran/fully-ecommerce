"use client";
import { saveAddress } from "@/actions";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import MainButton from "@/components/shared/main-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddressBooking } from "@/db/schema";
import { useTranslations } from "next-intl";
import Image from "next/image";
import product from "public/product.png";
import { useState } from "react";
import { toast } from "sonner";

export default function Checkout({
  address,
}: {
  address: AddressBooking["select"] | null;
}) {
  const t = useTranslations();
  const [pending, setPending] = useState(false);

  async function handleSaveAddress(formData: FormData) {
    setPending(true);
    const result = await saveAddress(formData);
    setPending(false);

    if (result?.error) {
      toast.error(
        Array.isArray(result.error)
          ? result.error.map((e) => e.message).join("\n")
          : result.error
      );
      return;
    }

    toast.success(t("saveAddress"));
  }

  return (
    <main className="container mt-10 space-y-10">
      <Breadcrumbs links={[{ href: "/checkout", label: t("checkout") }]} />
      <h1 className="text-4xl font-medium mb-10">{t("billingDetails")}</h1>

      <section className="flex flex-col md:justify-between md:flex-row gap-4 md:gap-0">
        <form action={handleSaveAddress} className="space-y-6 lg:min-w-md">
          <div className="space-y-4">
            <Label htmlFor="name">
              {t("name")}
              <span className="text-main">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              className="bg-secondary w-full md:h-12.5 rounded"
              defaultValue={address?.name || ""}
              required
            />
          </div>
          <div className="space-y-4">
            <Label htmlFor="email">
              {t("email")}
              <span className="text-main">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="bg-secondary w-full md:h-12.5 rounded"
              defaultValue={address?.email || ""}
              required
            />
          </div>
          <div className="space-y-4">
            <Label htmlFor="street">
              {t("streetAddress")}
              <span className="text-main">*</span>
            </Label>
            <Input
              id="street"
              name="street"
              type="text"
              className="bg-secondary w-full md:h-12.5 rounded"
              defaultValue={address?.address || ""}
              required
            />
          </div>
          <div className="space-y-4">
            <Label htmlFor="city">
              {t("townCity")}
              <span className="text-main">*</span>
            </Label>
            <Input
              id="city"
              name="city"
              type="text"
              className="bg-secondary w-full md:h-12.5 rounded"
              defaultValue={address?.city || ""}
              required
            />
          </div>
          <div className="space-y-4">
            <Label htmlFor="phone">
              {t("phone")}
              <span className="text-main">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              className="bg-secondary w-full md:h-12.5 rounded"
              defaultValue={address?.phone || ""}
              required
            />
          </div>
          <div className="space-y-4">
            <Label htmlFor="phone2">{t("anotherPhoneOptional")}</Label>
            <Input
              type="tel"
              id="phone2"
              name="phone2"
              className="bg-secondary w-full md:h-12.5 rounded"
              defaultValue={address?.phone2 || ""}
            />
          </div>

          <MainButton
            text={t("saveAddress")}
            type="submit"
            disabled={pending}
          />
        </form>

        <div className="mt-6 space-y-8 lg:min-w-sm">
          <div className="max-h-75 space-y-6 overflow-y-auto scroll-smooth">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card
                key={i}
                className="flex-row justify-between py-0 items-center shadow-none border-0"
              >
                <div className="flex items-center gap-1 justify-center text-center">
                  <Image src={product} alt="product cart" className="size-10" />
                  <span className="truncate">H1 Gamepad</span>
                </div>
                <span>$10</span>
              </Card>
            ))}
          </div>
          <div className="border-b border-black pb-2 flex justify-between items-center">
            <p>Subtotal:</p>
            <p>$30</p>
          </div>
          <div className="border-b border-black pb-2 flex justify-between items-center">
            <p>Subtotal:</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Total:</p>
            <p>$30</p>
          </div>
          <form action="" className="flex gap-2">
            <Input
              type="text"
              placeholder="Coupon code"
              className="rounded h-[56px] border-black"
            />
            <MainButton text="Apply coupon" />
          </form>
          <MainButton text="Process to checkout" />
        </div>
      </section>
    </main>
  );
}

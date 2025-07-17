"use client";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import MainButton from "@/components/shared/main-button";
import RePhoneInput from "@/components/shared/re-phone-input";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import Image from "next/image";
import product from "public/product.png";
export default function CheckoutPage() {
  const t = useTranslations();

  return (
    <main className="container mt-10 space-y-10">
      <Breadcrumbs
        links={[
          { href: "/account", label: t("account") },
          { href: "/checkout", label: t("checkout") },
        ]}
      />
      <h1 className="text-4xl font-medium mb-10">{t("billingDetails")}</h1>
      <section className="flex flex-col md:justify-between md:flex-row gap-4 md:gap-0">
        <form action="" className="space-y-6 lg:min-w-md">
          <div className="space-y-4">
            <Label htmlFor="name">
              {t("name")}
              <span className="text-main">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              className="bg-secondary w-full md:h-12.5 rounded"
            />
          </div>
          <div className="space-y-4">
            <Label htmlFor="street">
              {t("streetAddress")}
              <span className="text-main">*</span>
            </Label>
            <Input
              id="street"
              type="text"
              className="bg-secondary w-full md:h-12.5 rounded"
            />
          </div>
          <div className="space-y-4">
            <Label htmlFor="city">
              {t("townCity")}
              <span className="text-main">*</span>
            </Label>
            <Input
              id="city"
              type="text"
              className="bg-secondary w-full md:h-12.5 rounded"
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
            <Label htmlFor="phone2">{t("anotherPhoneOptional")}</Label>
            <Input
              type="tel"
              className="bg-secondary w-full md:h-12.5 rounded"
              id="phone2"
            />
          </div>
          <div className="space-y-4">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="text"
              className="bg-secondary w-full md:h-12.5 rounded"
            />
          </div>
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

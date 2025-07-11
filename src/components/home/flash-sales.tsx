"use client";
import { usePrevNextButtons } from "@/hooks/use-prev-next-buttons";
import { dirHelper } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { CountdownTimer } from "../shared/countdown";
import MainButton from "../shared/main-button";
import ProductCard from "../shared/product-card";
import SpecialTitle from "../shared/special-title";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

export default function FlashSales() {
  const locale = useLocale();
  const [api, setApi] = useState<CarouselApi>();
  const { NextButton, PrevButton } = usePrevNextButtons(api);
  const t = useTranslations();
  return (
    <section className="space-y-8">
      <SpecialTitle text={t("today")} />
      <div className="md:flex justify-between items-center">
        <div className="md:flex max-md:space-y-10 md:gap-10 items-center">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-3xl md:text-4xl">
              {t("flashSales")}
            </h2>
            <div className="flex md:hidden gap-2 items-center">
              {PrevButton}
              {NextButton}
            </div>
          </div>
          <CountdownTimer date={new Date("2025-08-11")} />
        </div>
        <div className="hidden md:flex gap-2 items-center">
          {PrevButton}
          {NextButton}
        </div>
      </div>
      <Carousel
        opts={{
          loop: true,
          direction: dirHelper(locale) as "rtl",
          align: "start",
        }}
        setApi={setApi}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, i) => (
            <CarouselItem
              key={i}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center">
        <MainButton text={t("viewAllProducts")} className="w-[236px]" />
      </div>
    </section>
  );
}

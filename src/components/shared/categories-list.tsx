"use client";
import { usePrevNextButtons } from "@/hooks/use-prev-next-buttons";
import { dirHelper } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import SpecialTitle from "../shared/special-title";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import CategoryCard from "./category-card";

export default function CategoriesList() {
  const locale = useLocale();
  const [api, setApi] = useState<CarouselApi>();
  const { NextButton, PrevButton } = usePrevNextButtons(api);
  const t = useTranslations();

  return (
    <section className="space-y-8">
      <SpecialTitle text="Categories" />
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-3xl md:text-4xl">
          {t("browseByCategory")}
        </h2>
        <div className="flex gap-2 items-center">
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
        <CarouselContent className="py-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <CarouselItem
              key={i}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <CategoryCard />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

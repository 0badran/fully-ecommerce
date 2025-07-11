"use client";
import { usePrevNextButtons } from "@/hooks/use-prev-next-buttons";
import { dirHelper } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import MainButton from "../shared/main-button";
import ProductCard from "../shared/product-card";
import SpecialTitle from "../shared/special-title";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

export default function OurProducts() {
  const locale = useLocale();
  const [api, setApi] = useState<CarouselApi>();
  const { NextButton, PrevButton } = usePrevNextButtons(api);
  const t = useTranslations();
  return (
    <section className="space-y-8">
      <SpecialTitle text={t("products")} />
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-3xl md:text-4xl">
          {t("exploreOurProducts")}
        </h2>
        <div className="flex gap-2 items-center">
          {PrevButton}
          {NextButton}
        </div>
      </div>
      {(() => {
        const products = Array.from({ length: 16 });
        const productsPerSlide = 8;
        const slidesCount = Math.ceil(products.length / productsPerSlide);
        return (
          <Carousel
            opts={{
              loop: true,
              direction: dirHelper(locale),
              align: "start",
            }}
            setApi={setApi}
          >
            <CarouselContent>
              {Array.from({ length: slidesCount }).map((_, i) => (
                <CarouselItem key={i}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products
                      .slice(i * productsPerSlide, (i + 1) * productsPerSlide)
                      .map((_, j) => (
                        <ProductCard key={j} />
                      ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        );
      })()}
      <div className="flex justify-center">
        <MainButton text={t("viewAllProducts")} className="w-[236px]" />
      </div>
    </section>
  );
}

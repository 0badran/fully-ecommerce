"use client";
import { useDotButton } from "@/hooks/use-dot-button";
import { cn, dirHelper } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import iphoneIcon from "public/iphone-icon.png";
import iphone from "public/iphone.png";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import CategoriesMenu from "../shared/categories-menu";

export default function Hero() {
  const locale = useLocale();
  const [api, setApi] = useState<CarouselApi>();
  const { scrollSnaps, selectedIndex, onDotButtonClick } = useDotButton(api);
  const t = useTranslations();
  useEffect(() => {}, [selectedIndex]);

  return (
    <section className="md:grid grid-cols-12 gap-12">
      <div className="md:col-span-3 md:border-e border-black/30">
        <CategoriesMenu />
      </div>
      <Carousel
        opts={{
          loop: true,
          direction: dirHelper(locale) as "rtl",
        }}
        plugins={[Autoplay()]}
        className="bg-black text-white px-2 md:px-0 pt-6 md:pt-10 pb-4 md:pb-6 col-span-9 mt-5 md:mt-10"
        setApi={setApi}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, i) => (
            <CarouselItem key={i} className="flex justify-evenly items-center">
              <div className="space-y-10">
                <div className="flex gap-4 items-center">
                  <Image
                    src={iphoneIcon}
                    alt="iphone Icon"
                    className="w-10 h-12"
                  />
                  <p>iPhone 14 Series</p>
                </div>
                <h1 className="text-2xl md:text-5xl max-w-[295px] font-semibold">
                  Up to 10% off Voucher
                </h1>
                <Link href={"#"} className="text-white flex gap-4 font-medium">
                  <span className="underline underline-offset-6 font-medium">
                    {t("shopNow")}
                  </span>
                  <ArrowRight />
                </Link>
              </div>
              <Image
                src={iphone}
                className="w-[150px] md:w-auto"
                alt="iphone image"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center gap-2 mt-4">
          {scrollSnaps.map((_, i) => (
            <button
              onClick={() => {
                onDotButtonClick(i);
              }}
              key={i}
              className={cn(
                "size-3 rounded-full cursor-pointer bg-description",
                selectedIndex === i && "bg-main size-3.5 border-2 border-white"
              )}
            ></button>
          ))}
        </div>
      </Carousel>
    </section>
  );
}

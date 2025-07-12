"use client";
import { useDotButton } from "@/hooks/use-dot-button";
import { cn, dirHelper } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { useLocale } from "next-intl";
import Image from "next/image";
import iphoneIcon from "public/iphone-icon.png";
import iphone from "public/iphone.png";
import { useState } from "react";
import CategoriesMenu from "../shared/categories-menu";
import ShopNow from "../shared/shop-now";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const locale = useLocale();
  const [api, setApi] = useState<CarouselApi>();
  const { scrollSnaps, selectedIndex, onDotButtonClick } = useDotButton(api);

  return (
    <section className="md:grid grid-cols-12 gap-12">
      <div className="md:col-span-3 md:border-e border-black/30">
        <CategoriesMenu />
      </div>
      <Carousel
        opts={{
          loop: true,
          direction: dirHelper(locale),
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
                <ShopNow href="#" Icon={ArrowRight} />
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

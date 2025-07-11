import Image from "next/image";
import banner from "public/banner.webp";
import MainButton from "../shared/main-button";
import { useTranslations } from "next-intl";
import { CountdownTimer } from "../shared/countdown";

export default function Banner() {
  const t = useTranslations();

  return (
    <div className="bg-black text-white p-12 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
      {/* Text Content */}
      <div className="">
        <p className="text-main font-semibold mb-4">{t("categories")}</p>
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-6">
          Enhance Your <br /> Music Experience
        </h1>
        {/* Countdown Timer */}
        <CountdownTimer date={new Date("2025-08-11")} />
        {/* Button */}
        <MainButton text="Buy Now!" className="w-[170px] mt-10" />
      </div>
      {/* Product Image */}
      <div className="flex-shrink-0 relative z-1">
        <div className="bg-[#D9D9D9] absolute inset-0 -z-1 blur-3xl rounded-full" />
        <Image
          src={banner}
          alt="Speaker"
          className="w-full max-w-sm md:max-w-xs lg:max-w-md"
        />
      </div>
    </div>
  );
}

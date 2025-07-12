import { useTranslations } from "next-intl";
import SpecialTitle from "../shared/special-title";
import Image from "next/image";
import playstation from "public/playstation.webp";
import woman from "public/woman.webp";
import perfume from "public/perfume.webp";
import speakers from "public/speakers.webp";
import ShopNow from "../shared/shop-now";

export default function Collections() {
  const t = useTranslations();

  return (
    <section className="space-y-8">
      <SpecialTitle text={t("featured")} />
      <h2 className="font-semibold text-3xl md:text-4xl">{t("newArrival")}</h2>
      <div className="grid text-white grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black rounded relative p-5 pb-0 md:p-10 pt-15 md:pb-0">
          <div className="absolute start-5 bottom-5 md:start-10 md:bottom-10 space-y-3 md:space-y-5">
            <h3 className="text-xl md:text-2xl font-semibold">
              {t("playstation")}
            </h3>
            <p className="max-w-[270px] max-md:text-sm">{t("psDescription")}</p>
            <ShopNow href="#" />
          </div>
          <Image
            src={playstation}
            alt="playstation and controller"
            className="h-full"
          />
        </div>

        <div>
          <div className="bg-black flex justify-between items-end mb-4 p-5 pb-0 md:p-10 md:pb-0 rounded">
            <div className="space-y-2 mb-5 md:mb-10">
              <h3 className="text-xl md:text-2xl font-semibold">
                {t("womenCollection")}
              </h3>
              <p className="max-w-[270px] max-md:text-sm">
                {t("womenCollDescription")}
              </p>
              <ShopNow href="#" />
            </div>
            <Image
              src={woman}
              alt={t("womenCollection")}
              className="rtl:scale-x-[-1]"
            />
          </div>

          <div className="flex gap-4">
            <div className="bg-black p-5 md:p-10 rounded relative">
              <div className="absolute start-4 bottom-3 md:start-8 md:bottom-6 space-y-1">
                <h3 className="text-xl md:text-2xl font-semibold">
                  {t("speakers")}
                </h3>
                <p className="max-w-[270px] max-md:text-sm">
                  {t("speDescription")}
                </p>
                <ShopNow href="#" />
              </div>
              <Image
                src={speakers}
                alt={t("speakers")}
                className="max-h-[220px]"
              />
            </div>
            <div className="bg-black p-5 md:p-10 rounded relative">
              <div className="absolute start-4 bottom-3 md:start-8 md:bottom-6 space-y-1">
                <h3 className="text-xl md:text-2xl font-semibold">
                  {t("perfume")}
                </h3>
                <p className="max-w-[270px] max-md:text-sm">
                  {t("perDescription")}
                </p>
                <ShopNow href="#" />
              </div>
              <Image
                src={perfume}
                alt={t("perfume")}
                className="max-h-[220px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

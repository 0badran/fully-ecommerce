import { useTranslations } from "next-intl";
import ProductCard from "../shared/product-card";
import SpecialTitle from "../shared/special-title";
import MainButton from "./main-button";

export default function BestSelling() {
  const t = useTranslations();
  return (
    <section className="space-y-8">
      <SpecialTitle text={t("thisMonth")} />
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-3xl md:text-4xl">
          {t("bestSelling")}
        </h2>
        <MainButton text={t("viewAll")} className="w-[155px]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCard key={i} />
        ))}
      </div>
    </section>
  );
}

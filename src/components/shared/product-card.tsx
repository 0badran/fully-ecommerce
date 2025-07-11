import { Card } from "@/components/ui/card";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import product from "public/product.png";
import { Rate } from "./rate";
import { useTranslations } from "next-intl";

export default function ProductCard() {
  const t = useTranslations();
  return (
    <Card
      aria-label="product card"
      className="p-0 overflow-hidden rounded shadow-none border-0"
    >
      <div
        aria-label="card header"
        className="bg-secondary relative  group overflow-hidden"
      >
        <div
          aria-label="discount"
          className="bg-main text-xs rounded w-12.5 h-6.5 absolute text-center top-2 start-2 leading-6.5 text-white"
        >
          40%
        </div>
        <Image
          src={product}
          className="object-contain mx-auto size-[140px] lg:w-[172px] lg:h-[152px]"
          alt="product"
        />
        <div aria-label="card actions">
          <button className="cursor-pointer absolute top-2 end-2 bg-white p-2 rounded-full">
            <Heart />
          </button>
          <button className="cursor-pointer absolute top-14 end-2 bg-white p-2 rounded-full">
            <Eye />
          </button>
          <button className="cursor-pointer w-full transition-transform duration-300 lg:translate-y-full group-hover:translate-y-0 text-white p-3 font-medium bg-black">
            {t("addToCart")}
          </button>
        </div> 
      </div>
      <div aria-label="card body" className="font-medium">
        <h3>HAVIT HV-G92 Gamepad</h3>
        <span className="text-main">$120</span>{" "}
        <span className="line-through text-description">$160</span>
        <div className="flex gap-2">
          <Rate rating={3.5} /> <span className="text-description">(40)</span>
        </div>
      </div>
    </Card>
  );
}

import Banner from "@/components/home/banner";
import Collections from "@/components/home/collections";
import FlashSales from "@/components/home/flash-sales";
import Hero from "@/components/home/hero";
import OurProducts from "@/components/home/our-products";
import Services from "@/components/home/services";
import BestSelling from "@/components/shared/best-selling";
import CategoriesList from "@/components/shared/categories-list";

export default function Home() {
  return (
    <main className="container space-y-20">
      <Hero />
      <FlashSales />
      <hr className="border-black/30" />
      <CategoriesList />
      <hr className="border-black/30" />
      <BestSelling />
      <Banner />
      <OurProducts />
      <Collections />
      <Services />
    </main>
  );
}

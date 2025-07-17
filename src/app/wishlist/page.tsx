import ProductCard from "@/components/shared/product-card";
import SpecialTitle from "@/components/shared/special-title";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  return (
    <main className="container mt-10 space-y-20">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-description text-xl">Wishlist (4)</h1>
        <Button variant="outline">Move All To Bag</Button>
      </div>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCard key={i} isWishlistCard={true} />
        ))}
      </section>
      <section>
        <div className="flex justify-between items-center mb-10">
          <SpecialTitle text="Just for you" />
          <Button variant="outline">See All</Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCard key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}

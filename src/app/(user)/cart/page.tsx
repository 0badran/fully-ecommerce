"use client";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import MainButton from "@/components/shared/main-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import product from "public/product.png";
import { useState } from "react";

export default function CartPage() {
  const [quantities, setQuantities] = useState([3, 4]);
  return (
    <main className="container mt-10 space-y-20">
      <Breadcrumbs links={[{ label: "cart", href: "/cart" }]} />
      <section className="space-y-6">
        <Card className="grid grid-cols-4 text-sm md:text-base text-center justify-between p-5  border-0 items-center mb-10">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Subtotal</span>
        </Card>
        {Array.from({ length: 2 }).map((_, i) => (
          <Card
            key={i}
            className="grid grid-cols-4 text-center justify-between text-sm md:text-base items-center p-5 border-0"
          >
            <div className="flex items-center gap-1 justify-center text-center">
              <Image src={product} alt="product cart" className="size-10" />
              <span className="truncate">H1 Gamepad</span>
            </div>
            <span>$10</span>
            <Input
              type="number"
              value={Math.max(1, quantities[i])}
              className="w-18 h-11 rounded mx-auto border-black focus-visible:border-black focus-visible:ring-0"
              onChange={(e) => {
                const newQuantities = [...quantities];
                newQuantities[i] = +e.target.value;
                setQuantities(newQuantities);
              }}
            />
            <span>${quantities[i] * 10}</span>
          </Card>
        ))}
        <Button variant={"outline"} className="border-black w-50">
          Return To Shop
        </Button>
      </section>
      <section className="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between">
        <form action="" className="flex gap-2">
          <Input
            type="text"
            placeholder="Coupon code"
            className="rounded h-[56px] border-black"
          />
          <MainButton text="Apply coupon" />
        </form>
        <Card className="border-black p-6 rounded min-w-sm">
          Card total
          <div className="border-b flex justify-between items-center">
            <p>Subtotal:</p>
            <p>$30</p>
          </div>
          <div className="border-b flex justify-between items-center">
            <p>Subtotal:</p>
            <p>Free</p>
          </div>
          <div className="">
            <div className="flex justify-between items-center">
              <p>Total:</p>
              <p>$30</p>
            </div>
            <MainButton text="Process to checkout" className="block mx-auto" />
          </div>
        </Card>
      </section>
    </main>
  );
}

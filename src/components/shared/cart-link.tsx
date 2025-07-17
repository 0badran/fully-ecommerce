import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartLink() {
  return (
    <Link href={"/cart"} className="p-2 relative">
      <ShoppingCart />
      <span className="absolute rounded-full size-4 text-white text-center text-xs leading-4 bg-main top-1 right-1">
        5
      </span>
    </Link>
  );
}

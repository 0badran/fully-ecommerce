import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistLink() {
  return (
    <Link
      href={"/wishlist"}
      className="size-10 flex items-center justify-center relative"
    >
      <Heart />
      <span className="absolute rounded-full size-4 text-white text-center text-xs leading-4 bg-main top-1 right-1">
        2
      </span>
    </Link>
  );
}

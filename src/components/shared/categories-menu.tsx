import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const categories = [
  "Woman's Fashion",
  "Men's Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby's & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];

export default function CategoriesMenu() {
  return (
    // mobile viewport true else false
    <NavigationMenu viewport={false} className="block max-w-none h-full">
      <div className="flex flex-col	justify-between h-full pt-3 md:pt-10 pe-3">
        {categories.map((category, i) => (
          <NavigationMenuItem key={i} className="w-full font-normal list-none">
            {i in [0, 1] ? (
              <>
                <NavigationMenuTrigger className="w-full text-xs lg:text-sm text-nowrap font-normal justify-between">
                  {category}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="left-full z-1">
                  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    {categories.map((category, i) => (
                      <li key={i} className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link href="#">{category}</Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                asChild
                className="text-xs lg:text-sm text-nowrap"
              >
                <Link href="#">{category}</Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </div>
    </NavigationMenu>
  );
}

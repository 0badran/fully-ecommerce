import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Product } from "@/types/product";
import { useTranslations } from "next-intl";
import Image from "next/image";
export interface ProductDetailsDrawerProps {
  product: Product["select"];
  open: boolean;
  setOpen: (v: boolean) => void;
}

export default function ProductDetailsDrawer({
  product,
  open,
  setOpen,
}: ProductDetailsDrawerProps) {
  const t = useTranslations();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="max-w-md mx-auto">
        <DrawerHeader>
          <DrawerTitle>{product.title}</DrawerTitle>
          <DrawerDescription>{product.price}</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 px-6 pb-6">
          <div className="flex flex-col items-center gap-2">
            {product.thumbnail && (
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={80}
                height={80}
                className="rounded-full border object-cover"
              />
            )}
            <Badge
              variant={(product.stock || 0) > 5 ? "outline" : "destructive"}
            >
              {product.stock}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="font-medium">{t("description")}</span>
            {product.description}
            <span className="font-medium">{t("rating")}</span>
            <span>{product.rating}</span>
            <span className="font-medium">{t("discount")}</span>
            <span>{product.discount || "-"}</span>
            <span className="font-medium">{t("createdAt")}</span>
            <span>
              {product.createdAt
                ? new Date(product.createdAt).toLocaleString()
                : "-"}
            </span>
            <span className="font-medium">{t("updatedAt")}</span>
            <span>
              {product.updatedAt
                ? new Date(product.updatedAt).toLocaleString()
                : "-"}
            </span>
            <span className="font-medium">{t("deletedAt")}</span>
            <span>
              {product.deletedAt
                ? new Date(product.deletedAt).toLocaleString()
                : "-"}
            </span>
          </div>
          <DrawerClose asChild>
            <Button variant="outline" className="mt-4 w-full">
              {t("close")}
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

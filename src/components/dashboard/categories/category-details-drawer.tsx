"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Category } from "@/types/category";

export interface CategoryDetailsDrawerProps {
  category: Category["select"];
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CategoryDetailsDrawer({
  category,
  open,
  setOpen,
}: CategoryDetailsDrawerProps) {
  const t = useTranslations();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="max-w-md mx-auto">
        <DrawerHeader>
          <DrawerTitle>{category.title}</DrawerTitle>
          <DrawerDescription>{category.slug}</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 px-6 pb-6">
          {category.thumbnail && (
            <div className="flex justify-center">
              <Image
                src={category.thumbnail}
                alt={category.title}
                width={120}
                height={120}
                className="rounded-lg border object-cover"
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="font-medium">{t("createdAt")}</span>
            <span>
              {category.createdAt
                ? new Date(category.createdAt).toLocaleString()
                : "-"}
            </span>

            <span className="font-medium">{t("updatedAt")}</span>
            <span>
              {category.updatedAt
                ? new Date(category.updatedAt).toLocaleString()
                : "-"}
            </span>

            <span className="font-medium">{t("deletedAt")}</span>
            <span>
              {category.deletedAt
                ? new Date(category.deletedAt).toLocaleString()
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

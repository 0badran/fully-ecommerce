"use client";

import { updateProduct } from "@/actions";
import MainButton from "@/components/shared/main-button";
import ReusableForm, { FieldConfig } from "@/components/shared/reusable-form";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Product } from "@/types/product";
import UploadFile from "@/components/shared/upload-file";
import Image from "next/image";

interface Props {
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
  product: Product["select"];
}

export default function UpdateProductDrawer({
  openDrawer,
  setOpenDrawer,
  product,
}: Props) {
  const isMobile = useIsMobile();
  const t = useTranslations();
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ formData }: { formData: FormData }) =>
      updateProduct(formData, product.id),
    onSuccess: () => {
      setOpenDrawer(false);
      toast.success(t("updated"));
      qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: any) => {
      if (Array.isArray(err)) {
        toast.error(
          err.map((e: any, i: number) => <div key={i}>{e.message}</div>)
        );
      } else {
        toast.error(t("error"));
      }
    },
  });

  function onSubmit(formData: FormData) {
    const price = parseFloat(formData.get("price") as string);
    const discount = parseFloat((formData.get("discount") as string) || "0");
    if (discount > price) {
      toast.error(t("discountTooLarge"));
      return;
    }
    mutation.mutate({ formData });
  }

  const fields: FieldConfig[] = [
    { name: "title", label: t("title"), value: product.title },
    { name: "slug", label: t("slug"), value: product.slug },
    { name: "price", label: t("price"), value: String(product.price) },
    {
      name: "categoryId",
      label: t("categoryId"),
      type: "select",
      value: String(product.categoryId),
    },
    {
      name: "discount",
      label: t("discount"),
      value: String(product.discount ?? ""),
    },
    {
      name: "discountType",
      label: t("discountType"),
      type: "select",
      value: product.discountType ?? "fixed",
    },
    { name: "thumbnail", label: t("thumbnail"), type: "file" },
    { name: "gallery", label: t("gallery"), type: "files" },
    {
      name: "description",
      label: t("description"),
      type: "textarea",
      value: product.description,
    },
    { name: "stock", label: t("stock"), value: String(product.stock) },
  ];

  return (
    <Drawer
      open={openDrawer}
      onOpenChange={setOpenDrawer}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t("edit")}</DrawerTitle>
          <DrawerDescription>{t("modifyDetails")}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 overflow-y-auto flex flex-col gap-4">
          <UploadFile
            actionFn={async () => {}}
            id={product.id + ""}
            renderUI={(open) => (
              <div className="flex flex-col items-center gap-4">
                <div className="w-48 h-48 relative border rounded-lg overflow-hidden shadow">
                  <Image
                    src={product.thumbnail || "/not-found"}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <Button onClick={() => open()}>{t("uploadImg")}</Button>
              </div>
            )}
          />
          <ReusableForm
            formFields={fields}
            formAction={onSubmit}
            className="flex flex-col gap-4"
            renderButton={
              <MainButton text={t("submit")} disabled={mutation.isPending} />
            }
          />
          <DrawerClose asChild>
            <Button variant="outline">{t("close")}</Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

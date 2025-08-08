"use client";

import { createProduct } from "@/actions";
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

interface Props {
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
}

export default function CreateProductDrawer({
  openDrawer,
  setOpenDrawer,
}: Props) {
  const isMobile = useIsMobile();
  const t = useTranslations();
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      setOpenDrawer(false);
      toast.success(t("created"));
      qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: any) => {
      if (Array.isArray(err)) {
        toast.error(err.map((e) => <div key={e.message}>{e.message}</div>));
      } else {
        toast.error("");
      }
    },
  });

  function onSubmit(formData: FormData) {
    // local validation: discount < price
    const price = parseFloat(formData.get("price") as string);
    const discount = parseFloat((formData.get("discount") as string) || "0");
    if (discount > price) {
      toast.error(t("discountTooLarge"));
      return;
    }

    mutation.mutate(formData);
  }

  const fieldsCreate: FieldConfig[] = [
    { name: "title", label: t("title") },
    { name: "price", label: t("price") },
    {
      name: "categoryId",
      label: t("categoryId"),
      type: "select",
      options: [{ title: "", value: "" }],
    },
    {
      name: "discount",
      label: t("discount"),
    },
    {
      name: "discountType",
      label: t("discountType"),
      type: "select",
      options: [{ title: "", value: "" }],
    },
    { name: "thumbnail", label: t("thumbnail"), type: "file" },
    { name: "gallery", label: t("gallery"), type: "files" },
    {
      name: "description",
      label: t("description"),
      type: "textarea",
    },
    { name: "stock", label: t("stock") },
  ];

  return (
    <Drawer
      open={openDrawer}
      onOpenChange={setOpenDrawer}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t("createNew")}</DrawerTitle>
          <DrawerDescription>{t("enterDetails")}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 overflow-y-auto flex flex-col gap-4">
          <ReusableForm
            formFields={fieldsCreate}
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

"use client";

import { updateCategory } from "@/actions";
import MainButton from "@/components/shared/main-button";
import ReusableForm, { FieldConfig } from "@/components/shared/reusable-form";
import UploadFile from "@/components/shared/upload-file";
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
import { Category } from "@/types/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { toast } from "sonner";

interface Props {
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
  category: Category["select"];
}

export default function UpdateCategoryDrawer({
  openDrawer,
  setOpenDrawer,
  category,
}: Props) {
  const isMobile = useIsMobile();
  const t = useTranslations();
  const qc = useQueryClient();

  const mutation = useMutation<
    unknown,
    any,
    { formData: FormData; id: number }
  >({
    mutationFn: ({ formData, id }) => updateCategory(formData, id),
    onSuccess: () => {
      setOpenDrawer(false);
      toast.success(t("updated"));
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: any) => {
      if (Array.isArray(err)) {
        toast.error(err.map((e) => <div key={e.message}>{e.message}</div>));
      } else {
        toast.error(typeof err === "string" ? err : t("error"));
      }
    },
  });

  const fieldsUpdate: FieldConfig[] = [
    {
      name: "title",
      label: t("title"),
      value: category.title,
      required: true,
    },
  ];

  return (
    <Drawer
      open={openDrawer}
      onOpenChange={setOpenDrawer}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t("updateCategory")}</DrawerTitle>
          <DrawerDescription>{t("editCategoryDetails")}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 overflow-y-auto flex flex-col gap-4">
          <UploadFile
            actionFn={async () => {}}
            id="category id"
            renderUI={() => (
              <div className="flex flex-col items-center gap-4">
                <div className="w-48 h-48 relative border rounded-lg overflow-hidden shadow">
                  <Image
                    src={category.thumbnail || "/not-found"}
                    alt={category.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <Button onClick={() => open()}>{t("uploadImg")}</Button>
              </div>
            )}
          />
          <ReusableForm
            formFields={fieldsUpdate}
            formAction={(formData) =>
              mutation.mutate({ formData, id: category.id })
            }
            className="flex flex-col gap-4"
            renderButton={
              <MainButton
                text={t("saveChanges")}
                disabled={mutation.isPending}
              />
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

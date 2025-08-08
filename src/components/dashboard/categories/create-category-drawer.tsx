"use client";

import { createCategory } from "@/actions";
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

export default function CreateCategoryDrawer({
  openDrawer,
  setOpenDrawer,
}: Props) {
  const isMobile = useIsMobile();
  const t = useTranslations();
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      setOpenDrawer(false);
      toast.success(t("created"));
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

  const fieldsCreate: FieldConfig[] = [
    {
      name: "title",
      label: t("title"),
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
          <DrawerTitle>{t("createCategory")}</DrawerTitle>
          <DrawerDescription>{t("enterCategoryDetails")}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 overflow-y-auto flex flex-col gap-4">
          <ReusableForm
            formFields={fieldsCreate}
            formAction={mutation.mutate}
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

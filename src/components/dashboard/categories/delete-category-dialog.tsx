"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteCategory } from "@/server-functions/categories";
import { Category } from "@/types/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export type DeleteCategoryDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  categories: Category["select"][];
};

export default function DeleteCategoryDialog({
  open,
  setOpen,
  categories,
}: DeleteCategoryDialogProps) {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success(t("deleted"));
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setOpen(false);
    },
    onError: () => {
      toast.error(t("error"));
      setOpen(false);
    },
  });

  function onConfirm() {
    categories.forEach((cat) => {
      mutation.mutate(cat.slug);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("deleteCategoryTitle")}</DialogTitle>
          <DialogDescription>
            {t("deleteCategoriesConfirm", { count: categories.length })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t("cancel")}
          </Button>
          <Button
            variant="destructive"
            disabled={mutation.isPending}
            onClick={onConfirm}
          >
            {t("confirmDelete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

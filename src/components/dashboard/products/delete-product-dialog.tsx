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
import { deleteProduct } from "@/server-functions/products";
import { Product } from "@/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export type DeleteProductDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  products: Product["select"][] | null;
};

export default function DeleteProductDialog({
  open,
  setOpen,
  products,
}: DeleteProductDialogProps) {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success(t("productDeleted"));
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
    },
    onError: () => {
      toast.success(t("error"));
      setOpen(false);
    },
  });

  if (!products) return null;

  function onConfirm() {
    products?.forEach((item) => {
      mutation.mutate(item.id);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("deleteUserTitle")}</DialogTitle>
          <DialogDescription>
            {t("deleteProductsConfirm", { count: products.length })}
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

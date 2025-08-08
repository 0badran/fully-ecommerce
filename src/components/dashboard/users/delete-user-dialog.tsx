"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteUser } from "@/server-functions/users";

export type DeleteUserDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  users: { ids: string[]; names: string[] } | null;
};

export default function DeleteUserDialog({
  open,
  setOpen,
  users,
}: DeleteUserDialogProps) {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success(t("userDeleted"));
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpen(false);
    },
    onError: () => {
      toast.success(t("error"));
      setOpen(false);
    },
  });

  if (!users) return null;
  function onConfirm() {
    users?.ids?.forEach((id) => {
      mutation.mutate(id);
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("deleteUserTitle")}</DialogTitle>
          <DialogDescription>
            {users.names.length > 1 ? (
              t("deleteUsersConfirm", { count: users.names.length })
            ) : (
              <>
                {t("deleteUserConfirm")}{" "}
                <span className="font-bold">{users.names[0]}</span>
              </>
            )}
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

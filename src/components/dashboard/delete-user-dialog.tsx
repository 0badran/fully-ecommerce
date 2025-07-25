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

export type DeleteUserDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  users: { emails: string[]; names: string[] } | null;
  onConfirm: () => void;
};

export default function DeleteUserDialog({
  open,
  onOpenChange,
  users,
  onConfirm,
}: DeleteUserDialogProps) {
  const t = useTranslations();
  if (!users) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("deleteUserTitle")}</DialogTitle>
          <DialogDescription>
            {users.names.length > 1
              ? t("deleteUsersConfirm", { count: users.names.length })
              : t("deleteUserConfirm", { name: users.names[0] })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {t("confirmDelete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

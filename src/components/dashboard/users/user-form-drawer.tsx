"use client";

import { signUp, updateAccount } from "@/actions";
import MainButton from "@/components/shared/main-button";
import ReusableForm from "@/components/shared/reusable-form";
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
import { UserSelect } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

type UserFormProps = { mode: "update"; user: UserSelect } | { mode: "create" };
type OpenMethod = {
  openDrawer: boolean;
  setOpenDrawer: (v: boolean) => void;
};

export default function UserFormDrawer(props: UserFormProps & OpenMethod) {
  const { mode, openDrawer, setOpenDrawer } = props;
  const user = mode === "update" ? props.user : undefined;
  const isMobile = useIsMobile();
  const t = useTranslations();
  const queryClient = useQueryClient();
  const createUserMutation = useMutation({
    mutationKey: ["users"],
    mutationFn: ({ i, f, r }: { i: any; f: FormData; r?: boolean }) =>
      signUp(i, f, r),
    onSuccess: (data) => {
      const { error } = data;
      if (error) {
        if (Array.isArray(error)) {
          toast.error(
            <>
              {error.map((err, i) => (
                <div key={i}>{err.message}</div>
              ))}
            </>
          );
          return;
        }
        if (error === "USER_EMAIL_ALREADY_EXISTS") {
          toast.error(t("userExist"));
          return;
        }
        toast.error(t("unknownUserError"));
        return;
      }
      setOpenDrawer(false);
      toast.success(t("userCreated"));
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const updateUserMutation = useMutation({
    mutationKey: ["users"],
    mutationFn: ({ f, userId }: { f: FormData; userId?: string }) =>
      updateAccount(f, userId),
    onSuccess: (data) => {
      const { error } = data;

      if (error) {
        if (Array.isArray(error)) {
          toast.error(
            <>
              {error.map((err, i) => (
                <div key={i}>{err.message}</div>
              ))}
            </>
          );
          return;
        }
        toast.error(t("error"));
        return;
      }
      setOpenDrawer(false);
      toast.success(t("userUpdated"));
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const formFieldsUpdateMode = [
    {
      name: "name",
      label: t("name"),
      value: user?.name,
    },
    {
      name: "email",
      label: t("email"),
      disabled: true,
      value: user?.email,
    },
    {
      name: "phone",
      label: t("phone"),
      value: user?.phone,
    },
    {
      name: "country",
      label: t("country"),
      value: user?.country,
    },
  ];

  const formFieldsCreateMode = [
    {
      name: "name",
      label: t("name"),
    },
    {
      name: "email",
      label: t("email"),
    },
    {
      name: "phone",
      label: t("phone"),
    },
    {
      name: "country",
      label: t("country"),
    },
    {
      name: "birthdate",
      label: t("birthdate"),
    },
    {
      name: "password",
      label: t("password"),
    },
    {
      name: "confirmPassword",
      label: t("confirmPassword"),
    },
  ];

  async function fireAction(formData: FormData) {
    // Create new user
    if (props.mode === "create") {
      createUserMutation.mutate({ i: null, f: formData, r: true });
      return;
    }

    // Update user
    updateUserMutation.mutate({ f: formData, userId: user?.id });
  }

  return (
    <Drawer
      open={openDrawer}
      onOpenChange={setOpenDrawer}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>
            {mode === "update" && user ? user.name : t("createNewUser")}
          </DrawerTitle>
          <DrawerDescription>
            {mode === "update" ? t("updateUser") : t("enterUserData")}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <ReusableForm
            formFields={
              mode === "create" ? formFieldsCreateMode : formFieldsUpdateMode
            }
            formAction={fireAction}
            className="flex flex-col gap-4"
            renderButton={
              <MainButton
                text={t("submit")}
                disabled={
                  createUserMutation.isPending || updateUserMutation.isPending
                }
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

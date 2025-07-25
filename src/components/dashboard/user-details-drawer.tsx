import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { UserTableRow } from "@/lib/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import CountryFlag from "../shared/country-flag";

export interface UserDetailsDrawerProps {
  user: UserTableRow;
  open: boolean;
  setOpen: (v: boolean) => void;
}

export default function UserDetailsDrawer({
  user,
  open,
  setOpen,
}: UserDetailsDrawerProps) {
  const t = useTranslations();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="max-w-md mx-auto">
        <DrawerHeader>
          <DrawerTitle>{user.name}</DrawerTitle>
          <DrawerDescription>{user.email}</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 px-6 pb-6">
          <div className="flex flex-col items-center gap-2">
            {user.profilePhoto ? (
              <Image
                src={user.profilePhoto}
                alt={user.name}
                width={80}
                height={80}
                className="rounded-full border object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl">
                {user.name[0]}
              </div>
            )}
            <Badge
              variant={user.status ? "default" : "outline"}
              className={user.status ? "bg-green-500" : "bg-red-500 text-white"}
            >
              {user.status ? t("active") : t("inactive")}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="font-medium">{t("country")}</span>
            <CountryFlag countryCode={user.country} />
            <span className="font-medium">{t("phone")}</span>
            <span>{user.phone}</span>
            <span className="font-medium">{t("birthdate")}</span>
            <span>{user.birthdate}</span>
            <span className="font-medium">{t("createdAt")}</span>
            <span>
              {user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}
            </span>
            <span className="font-medium">{t("updatedAt")}</span>
            <span>
              {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "-"}
            </span>
            <span className="font-medium">{t("deletedAt")}</span>
            <span>
              {user.deletedAt ? new Date(user.deletedAt).toLocaleString() : "-"}
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

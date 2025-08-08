import {
  SendMessageTarget,
  UsersDeletedTarget,
  UserSelect,
} from "@/types/user";
import { IconDotsVertical } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";

import CountryFlag from "@/components/shared/country-flag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle2, XCircle } from "lucide-react";
import { t } from "@/types";

export default function createUserColumns(
  t: t,
  handlers: {
    setSelectedUserDetails: (user: UserSelect | null) => void;
    setSelectedUserUpdate: (user: UserSelect | null) => void;
    setSendMessageTarget: (target: SendMessageTarget) => void;
    setUsersDeletedTarget: (target: UsersDeletedTarget) => void;
  }
) {
  const columns: ColumnDef<UserSelect>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex justify-center items-center ps-4">
          <Checkbox
            className="border-black"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label={t("selectAll")}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center items-center ps-4">
          <Checkbox
            className="border-black"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={t("selectRow")}
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "header",
      header: t("header"),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-1">
            <Avatar>
              <AvatarImage src={row.original.profilePhoto} />
              <AvatarFallback>{row.original.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="align-middle">{row.original.name}</span>
          </div>
        );
      },
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header: t("email"),
      cell: ({ row }) => (
        <div className="">
          <Badge variant="outline" className="text-muted-foreground px-1.5">
            {row.original.email}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: () => <div className="w-full">{t("phone")}</div>,
      cell: ({ row }) => (
        <div>{row.original.phone ? row.original.phone : "-"}</div>
      ),
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.status ? (
            <CheckCircle2 className="text-green-500" />
          ) : (
            <XCircle className="text-red-500" />
          )}
        </Badge>
      ),
    },
    {
      accessorKey: "country",
      header: () => <div className="w-full">{t("country")}</div>,
      cell: ({ row }) =>
        row.original.country ? (
          <CountryFlag countryCode={row.original.country} />
        ) : (
          "-"
        ),
    },
    {
      id: "actions",
      header: ({ table }) => {
        const selectedRows = table.getFilteredSelectedRowModel().rows;
        if (!selectedRows.length) {
          return null;
        }
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                size="icon"
              >
                <IconDotsVertical />
                <span className="sr-only">{t("openMenu")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem
                onClick={() => {
                  handlers.setSendMessageTarget({
                    emails: selectedRows.map((r) => r.original.email),
                    names: selectedRows.map((r) => r.original.name),
                  });
                }}
              >
                {t("sendMessage")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  handlers.setUsersDeletedTarget({
                    ids: selectedRows.map((r) => r.original.id),
                    names: selectedRows.map((r) => r.original.name),
                  })
                }
              >
                {t("delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">{t("openMenu")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem
              onClick={() => handlers.setSelectedUserDetails(row.original)}
            >
              {t("view")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handlers.setSelectedUserUpdate(row.original)}
            >
              {t("edit")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                handlers.setSendMessageTarget({
                  emails: [row.original.email],
                  names: [row.original.name],
                })
              }
            >
              {t("sendMessage")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() =>
                handlers.setUsersDeletedTarget({
                  ids: [row.original.id],
                  names: [row.original.name],
                })
              }
            >
              {t("delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  return columns;
}

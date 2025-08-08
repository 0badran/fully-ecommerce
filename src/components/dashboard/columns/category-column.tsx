import { IconDotsVertical } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";

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
import { t } from "@/types";
import { Category } from "@/types/category";

export default function createCategoriesColumns(
  t: t,
  handlers: {
    setSelectedCategoryDetails: (cat: Category["select"] | null) => void;
    setSelectedCategoryUpdate: (cat: Category["select"] | null) => void;
    setSelectedCategoriesDelete: (targets: Category["select"][]) => void;
  }
): ColumnDef<Category["select"]>[] {
  return [
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
            onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
            aria-label={t("selectAll")}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center items-center ps-4">
          <Checkbox
            className="border-black"
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
            aria-label={t("selectRow")}
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: t("title"),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={row.original.thumbnail || "/not-found.png"}
              alt={row.original.title}
            />
            <AvatarFallback>
              {row.original.title.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{row.original.title}</span>
        </div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "slug",
      header: t("slug"),
      cell: ({ row }) => row.original.slug,
    },
    {
      accessorKey: "thumbnail",
      header: t("thumbnail"),
      cell: ({ row }) =>
        row.original.thumbnail ? (
          <Badge className="px-2 py-1">{t("hasThumbnail")}</Badge>
        ) : (
          <Badge variant="outline" className="px-2 py-1">
            {t("none")}
          </Badge>
        ),
    },
    {
      id: "actions",
      header: ({ table }) => {
        const selected = table.getFilteredSelectedRowModel().rows;
        if (!selected.length) return null;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="data-[state=open]:bg-muted text-muted-foreground"
              >
                <IconDotsVertical />
                <span className="sr-only">{t("openMenu")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  handlers.setSelectedCategoriesDelete(
                    selected as unknown as Category["select"][]
                  )
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
              size="icon"
              className="data-[state=open]:bg-muted text-muted-foreground"
            >
              <IconDotsVertical />
              <span className="sr-only">{t("openMenu")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem
              onClick={() => handlers.setSelectedCategoryDetails(row.original)}
            >
              {t("view")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handlers.setSelectedCategoryUpdate(row.original)}
            >
              {t("edit")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() =>
                handlers.setSelectedCategoriesDelete([row.original])
              }
            >
              {t("delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}

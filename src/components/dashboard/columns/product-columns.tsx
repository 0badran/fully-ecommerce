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
import { Product } from "@/types/product";

export default function createProductsColumns(
  t: t,
  handlers: {
    setSelectedProductDetails: (product: Product["select"] | null) => void;
    setSelectedProductUpdate: (product: Product["select"] | null) => void;
    setSelectedProductsDelete: (target: Product["select"][]) => void;
  }
) {
  const columns: ColumnDef<Product["select"]>[] = [
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
              <AvatarImage src={row.original.thumbnail || "/not-found"} />
              <AvatarFallback>
                {row.original.title.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="align-middle">{row.original.title}</span>
          </div>
        );
      },
      enableHiding: false,
    },
    {
      accessorKey: "price",
      header: t("price"),
      cell: ({ row }) => row.original.price,
    },
    {
      accessorKey: "stock",
      header: () => <div className="w-full">{t("stock")}</div>,
      cell: ({ row }) => (
        <Badge
          variant={(row.original.stock || 0) > 5 ? "outline" : "destructive"}
          className="text-muted-foreground px-1.5"
        >
          {row.original.stock}
        </Badge>
      ),
    },
    {
      accessorKey: "rating",
      header: () => <div className="w-full">{t("rating")}</div>,
      cell: ({ row }) => row.original.rating || "-",
    },
    {
      accessorKey: "category type",
      header: t("categoryType"),
      cell: ({ row }) => row.original.categoryId,
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
                variant="destructive"
                onClick={() =>
                  handlers.setSelectedProductsDelete(
                    selectedRows as unknown as Product["select"][]
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
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">{t("openMenu")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem
              onClick={() => handlers.setSelectedProductDetails(row.original)}
            >
              {t("view")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handlers.setSelectedProductUpdate(row.original)}
            >
              {t("edit")}
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => handlers.setSelectedProductsDelete([row.original])}
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

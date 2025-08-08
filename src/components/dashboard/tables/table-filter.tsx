import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserSelect } from "@/types/user";
import { IconChevronDown, IconLayoutColumns } from "@tabler/icons-react";
import { Table } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { ElementType } from "react";

export interface UsersTableHeaderProps {
  table: Table<UserSelect>;
  tabs: Array<{
    value: string;
    onAction: () => void;
    Icon: ElementType;
  }>;
}

export function TableFilter({ table, tabs }: UsersTableHeaderProps) {
  const t = useTranslations();
  return (
    <div className="flex items-center justify-between">
      <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
        {tabs.map(({ value, onAction, Icon }) => (
          <TabsTrigger key={value} value={value} onClick={onAction}>
            <span className="block max-[500px]:hidden">{t(value)}</span>
            <Icon className="block min-[500px]:hidden" />
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <IconLayoutColumns />
              <span className="hidden lg:inline">{t("customizeColumns")}</span>
              <span className="lg:hidden">{t("columns")}</span>
              <IconChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {t(column.id)}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

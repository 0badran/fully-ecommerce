"use client";

import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconLayoutColumns,
  IconUsersGroup,
} from "@tabler/icons-react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import SendMessageDrawer from "@/components/dashboard/send-message-drawer";
import UserDetailsDrawer from "@/components/dashboard/user-details-drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useUsers from "@/hooks/dashboard/use-users";
import { UserTableRow } from "@/lib/types";
import { dirHelper } from "@/lib/utils";
import { CheckCircle2, UserCheck, UserPlus, XCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import CountryFlag from "../shared/country-flag";
import MainButton from "../shared/main-button";
import TableSkeleton from "../skeleton/table-skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserFormDrawer from "./user-form-drawer";

export function UsersTable() {
  const t = useTranslations();

  const columns: ColumnDef<UserTableRow>[] = [
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
                  setSendMessageTarget({
                    emails: selectedRows.map((r) => r.original.email),
                    names: selectedRows.map((r) => r.original.name),
                  });
                }}
              >
                {t("sendMessage")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
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
              onClick={() => setSelectedUserDetails(row.original)}
            >
              {t("view")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSelectedUserUpdate(row.original)}
            >
              {t("edit")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                setSendMessageTarget({
                  emails: [row.original.email],
                  names: [row.original.name],
                })
              }
            >
              {t("sendMessage")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              {t("delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const { users, isLoading, error } = useUsers();
  const [data, setData] = useState(users || []);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedUserDetails, setSelectedUserDetails] =
    useState<UserTableRow | null>(null);
  const [selectedUserUpdate, setSelectedUserUpdate] =
    useState<UserTableRow | null>(null);
  const [openDrawerFormCreate, setOpenDrawerFormCreate] = useState(false);
  const [sendMessageTarget, setSendMessageTarget] = useState<{
    emails: string[];
    names: string[];
  } | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [tabValues, setTabValues] = useState<"allUser" | "activeUsers">(
    "allUser"
  );
  const locale = useLocale();

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  useEffect(() => {
    setData(users || []);
  }, [users]);

  return (
    <Tabs
      defaultValue="allUser"
      className="w-full flex-col justify-start gap-6"
      dir={dirHelper(locale)}
    >
      {/* Create user button */}
      <MainButton
        text={t("createUser")}
        className="w-fit"
        Icon={UserPlus}
        onClick={() => setOpenDrawerFormCreate(true)}
      />

      <UserFormDrawer
        mode="create"
        openDrawer={openDrawerFormCreate}
        setOpenDrawer={setOpenDrawerFormCreate}
      />

      {sendMessageTarget && (
        <SendMessageDrawer
          open={!!sendMessageTarget}
          setOpen={(open) => !open && setSendMessageTarget(null)}
          users={sendMessageTarget}
        />
      )}

      {selectedUserDetails && (
        <UserDetailsDrawer
          open={!!selectedUserDetails}
          setOpen={(open) => !open && setSelectedUserDetails(null)}
          user={selectedUserDetails}
        />
      )}

      {selectedUserUpdate && (
        <UserFormDrawer
          user={selectedUserUpdate}
          mode="update"
          openDrawer={!!selectedUserUpdate}
          setOpenDrawer={(open) => !open && setSelectedUserUpdate(null)}
        />
      )}

      {(() => {
        if (isLoading) {
          return <TableSkeleton />;
        }
        if (!users || error) {
          throw new Error(t("error"));
        }
        return (
          <>
            <div className="flex items-center justify-between">
              <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
                <TabsTrigger
                  value="allUser"
                  onClick={() => {
                    setTabValues("allUser");
                    setData(users);
                  }}
                >
                  <span className="block max-[500px]:hidden">
                    {t("allUser")}
                  </span>
                  <IconUsersGroup className="block min-[500px]:hidden" />
                </TabsTrigger>

                <TabsTrigger
                  value="activeUsers"
                  onClick={() => {
                    setTabValues("activeUsers");
                    setData(data.filter((user) => user.status));
                  }}
                >
                  <span className="block max-[500px]:hidden">
                    {t("activeUsers")}
                  </span>
                  <UserCheck className="block min-[500px]:hidden" />
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <IconLayoutColumns />
                      <span className="hidden lg:inline">
                        {t("customizeColumns")}
                      </span>
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

            <TabsContent
              value={tabValues}
              className="relative flex flex-col gap-4 overflow-auto"
            >
              <div className="overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader className="bg-muted sticky top-0 z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id} className="text-start">
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>

                  <TableBody className="**:data-[slot=table-cell]:first:w-8">
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          {t("noResults")}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between px-4">
                <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
                  {table.getFilteredSelectedRowModel().rows.length} {t("of")}{" "}
                  {table.getFilteredRowModel().rows.length} {t("rowsSelected")}
                </div>
                <div className="flex w-full items-center gap-8 lg:w-fit">
                  <div className="hidden items-center gap-2 lg:flex">
                    <Label
                      htmlFor="rows-per-page"
                      className="text-sm font-medium"
                    >
                      {t("rowsPerPage")}
                    </Label>
                    <Select
                      value={`${table.getState().pagination.pageSize}`}
                      onValueChange={(value) => {
                        table.setPageSize(Number(value));
                      }}
                    >
                      <SelectTrigger
                        size="sm"
                        className="w-20"
                        id="rows-per-page"
                      >
                        <SelectValue
                          placeholder={table.getState().pagination.pageSize}
                        />
                      </SelectTrigger>
                      <SelectContent side="top">
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                          <SelectItem key={pageSize} value={`${pageSize}`}>
                            {pageSize}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex w-fit items-center justify-center text-sm font-medium">
                    {t("page")} {table.getState().pagination.pageIndex + 1}{" "}
                    {t("of")} {table.getPageCount()}
                  </div>
                  <div className="ml-auto flex items-center gap-2 lg:ml-0">
                    <Button
                      variant="outline"
                      className="hidden h-8 w-8 p-0 lg:flex"
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                    >
                      <span className="sr-only">{t("goToFirstPage")}</span>
                      <IconChevronsLeft className="rtl:rotate-180" />
                    </Button>
                    <Button
                      variant="outline"
                      className="size-8"
                      size="icon"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      <span className="sr-only">{t("goToPreviousPage")}</span>
                      <IconChevronLeft className="rtl:rotate-180" />
                    </Button>
                    <Button
                      variant="outline"
                      className="size-8"
                      size="icon"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      <span className="sr-only">{t("goToNextPage")}</span>
                      <IconChevronRight className="rtl:rotate-180" />
                    </Button>
                    <Button
                      variant="outline"
                      className="hidden size-8 lg:flex"
                      size="icon"
                      onClick={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                      }
                      disabled={!table.getCanNextPage()}
                    >
                      <span className="sr-only">{t("goToLastPage")}</span>
                      <IconChevronsRight className="rtl:rotate-180" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </>
        );
      })()}
    </Tabs>
  );
}

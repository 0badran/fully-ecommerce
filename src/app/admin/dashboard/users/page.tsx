"use client";

import createUserColumns from "@/components/dashboard/columns/user-columns";
import { TableDataView } from "@/components/dashboard/tables/table-data-view";
import { TableFilter } from "@/components/dashboard/tables/table-filter";
import { TablePagination } from "@/components/dashboard/tables/table-pagination";
import { UserModals } from "@/components/dashboard/users/user-modals";
import MainButton from "@/components/shared/main-button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useTable } from "@/hooks/dashboard/use-table";
import useUsers from "@/hooks/dashboard/use-users";
import { dirHelper } from "@/lib/utils";
import { UserSelect } from "@/types/user";
import { IconUsersGroup } from "@tabler/icons-react";
import { UserCheck, UserPlus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

export default function UserTablePage() {
  const t = useTranslations();

  const [selectedUserDetails, setSelectedUserDetails] =
    useState<UserSelect | null>(null);
  const [selectedUserUpdate, setSelectedUserUpdate] =
    useState<UserSelect | null>(null);
  const [openDrawerFormCreate, setOpenDrawerFormCreate] = useState(false);
  const [sendMessageTarget, setSendMessageTarget] = useState<{
    emails: string[];
    names: string[];
  } | null>(null);
  const [usersDeletedTarget, setUsersDeletedTarget] = useState<{
    ids: string[];
    names: string[];
  } | null>(null);

  const columns = createUserColumns(t, {
    setSelectedUserDetails,
    setSelectedUserUpdate,
    setSendMessageTarget,
    setUsersDeletedTarget,
  });

  const { users, isLoading, error } = useUsers();

  const [tabValues, setTabValues] = useState<"allUser" | "activeUsers">(
    "allUser"
  );
  const locale = useLocale();

  const { table, setData } = useTable({
    initialData: users!,
    columns,
  });

  const updateUsersState = useCallback(() => {
    setData(users!);
  }, [setData, users]);

  useEffect(() => {
    updateUsersState();
  }, [updateUsersState]);

  if (isLoading) {
    return;
  }

  if (!users || error) {
    throw new Error(t("error"));
  }

  const usersTabs = [
    {
      value: "allUser",
      Icon: IconUsersGroup,
      onAction: () => {
        setTabValues("allUser");
        setData(users);
      },
    },
    {
      value: "activeUsers",
      Icon: UserCheck,
      onAction: () => {
        setTabValues("activeUsers");
        setData(users.filter((user) => user.status));
      },
    },
  ];

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

      <TableFilter tabs={usersTabs} table={table} />

      <TabsContent
        value={tabValues}
        className="relative flex flex-col gap-4 overflow-auto"
      >
        <TableDataView table={table} columns={columns} />

        <TablePagination table={table} />
      </TabsContent>

      <UserModals
        selectedUserDetails={selectedUserDetails}
        setSelectedUserDetails={setSelectedUserDetails}
        openDrawerFormCreate={openDrawerFormCreate}
        selectedUserUpdate={selectedUserUpdate}
        sendMessageTarget={sendMessageTarget}
        setOpenDrawerFormCreate={setOpenDrawerFormCreate}
        setSelectedUserUpdate={setSelectedUserUpdate}
        setSendMessageTarget={setSendMessageTarget}
        setUsersDeletedTarget={setUsersDeletedTarget}
        usersDeletedTarget={usersDeletedTarget}
      />
    </Tabs>
  );
}

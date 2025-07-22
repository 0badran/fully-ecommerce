import { UserDataTable } from "@/components/user-data-table";
import { getUsers } from "@/services";

export default async function UsersPage() {
  const users = await getUsers();

  if (!users) {
    return;
  }
  return <UserDataTable data={users} />;
}

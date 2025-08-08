import {
  SendMessageTarget,
  UsersDeletedTarget,
  UserSelect,
} from "@/types/user";
import UserFormDrawer from "./user-form-drawer";
import UserDetailsDrawer from "./user-details-drawer";
import SendMessageDrawer from "./send-message-drawer";
import DeleteUserDialog from "./delete-user-dialog";

export interface UsersModalsProps {
  selectedUserDetails: UserSelect | null;
  setSelectedUserDetails: (user: UserSelect | null) => void;
  selectedUserUpdate: UserSelect | null;
  setSelectedUserUpdate: (user: UserSelect | null) => void;
  openDrawerFormCreate: boolean;
  setOpenDrawerFormCreate: (open: boolean) => void;
  sendMessageTarget: SendMessageTarget | null;
  setSendMessageTarget: (target: SendMessageTarget | null) => void;
  usersDeletedTarget: UsersDeletedTarget | null;
  setUsersDeletedTarget: (target: UsersDeletedTarget | null) => void;
}

export function UserModals({
  openDrawerFormCreate,
  selectedUserDetails,
  selectedUserUpdate,
  sendMessageTarget,
  setOpenDrawerFormCreate,
  setSelectedUserDetails,
  setSelectedUserUpdate,
  setSendMessageTarget,
  setUsersDeletedTarget,
  usersDeletedTarget,
}: UsersModalsProps) {
  return (
    <>
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

      {usersDeletedTarget && (
        <DeleteUserDialog
          open={!!usersDeletedTarget}
          setOpen={(open) => !open && setUsersDeletedTarget(null)}
          users={usersDeletedTarget}
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
    </>
  );
}

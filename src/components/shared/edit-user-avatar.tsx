import { cn } from "@/lib/utils";
import { changeUserPhoto } from "@/server-functions/users";
import { UserAvatar } from "@/types/user";
import { Image as Photo } from "lucide-react";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UploadFile from "./upload-file";

export default function EditUserAvatar({
  user,
  className,
}: {
  user: UserAvatar | null;
  className?: string;
}) {
  const t = useTranslations();

  return (
    <UploadFile
      actionFn={changeUserPhoto}
      id={user!.id}
      renderUI={(open) => (
        <div>
          <Avatar className={cn("size-25 mx-auto mt-5", className)}>
            <AvatarImage src={user!.profileImageUrl!} />
            <AvatarFallback>{user?.displayName?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <button
            type="button"
            onClick={() => open()}
            className="text-center text-xs cursor-pointer mt-1 mx-auto items-center flex gap-1"
          >
            <Photo size={16} />
            {t("uploadImg")}
          </button>
        </div>
      )}
    />
  );
}

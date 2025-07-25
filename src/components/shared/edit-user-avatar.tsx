import { insertCloudinaryFile } from "@/actions";
import { UserAvatar } from "@/lib/types";
import { Image as Photo } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

export default function EditUserAvatar({
  user,
  className,
}: {
  user: UserAvatar | null;
  className?: string;
}) {
  const t = useTranslations();

  return (
    <CldUploadWidget
      signatureEndpoint={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/sign-cloudinary-params`}
      onSuccess={(result) => {
        insertCloudinaryFile(result?.info, user!.id);
        toast.success(t("updateUserImg"));
      }}
    >
      {({ open }) => {
        return (
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
        );
      }}
    </CldUploadWidget>
  );
}

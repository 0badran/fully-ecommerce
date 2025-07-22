import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export default function UserDropdownSkeleton({
  className,
}: {
  className?: string;
}) {
  return <Skeleton className={cn("size-12 rounded-full", className)} />;
}

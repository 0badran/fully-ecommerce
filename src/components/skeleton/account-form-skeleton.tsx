import { Skeleton } from "../ui/skeleton";

export default function AccountFormSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="size-25 mx-auto rounded-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-9 md:h-12.5 w-full" />
        <Skeleton className="h-9 md:h-12.5 w-full" />
        <Skeleton className="h-9 md:h-12.5 w-full" />
        <Skeleton className="h-9 md:h-12.5 w-full" />
      </div>
    </div>
  );
}

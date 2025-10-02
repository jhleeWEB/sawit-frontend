import { Skeleton } from "@heroui/react";

export default function CommunityHeaderSkeleton() {
  return (
    <div className="col-start-1 col-span-2 w-full mb-[60px]">
      <div className="relative min-h-[128px] rounded-xl w-full">
        <Skeleton className="absolute inset-0 rounded-xl" />
        <div className="absolute w-full px-8 pr-0 bottom-[-50px] flex items-end">
          <Skeleton className="w-[100px] h-[100px] shrink-0 rounded-full border-white border-[4px]" />
          <div className="w-full flex justify-between pl-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-56 rounded-lg" />
            </div>
            <div className="flex gap-2 items-center">
              <Skeleton className="h-10 w-32 rounded-full" />
              <Skeleton className="h-10 w-28 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

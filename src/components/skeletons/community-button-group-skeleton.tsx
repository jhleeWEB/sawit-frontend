import { Divider, Skeleton } from "@heroui/react";

export default function CommunityButtonGroupSkeleton() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-2">
        <Skeleton className="w-[36px] h-[36px] rounded-full" />
        <Skeleton className="w-[40%] h-[20px] rounded-lg" />
      </div>
      <Skeleton className="w-[60%] h-[36px] rounded-lg mb-2" />
      <Skeleton className="w-full h-[500px] rounded-lg mb-2" />
      <div className="flex gap-2">
        <Skeleton className="w-[80px] h-[28px] rounded-full" />
        <Skeleton className="w-[80px] h-[28px] rounded-full" />
        <Skeleton className="w-[80px] h-[28px] rounded-full" />
      </div>
      <Divider className="my-4" />
    </section>
  );
}

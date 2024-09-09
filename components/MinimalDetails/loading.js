import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="flex items-center justify-center w-full aspect-[3/4] absolute top-0">
      <Skeleton
        className="w-full h-full"
        style={{ backgroundColor: "#272e41" }}
      />
    </div>
  );
};

export default SkeletonLoader;

import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = ({ limit }) => {
  return (
    <div className="grid max-sm:grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(6rem,1fr))] gap-6 w-full h-full">
      {[...Array(limit)].map((_, index) => (
        <Skeleton key={index} className="max-sm:w-[11rem] max-sm:h-[15rem] w-[6.3rem] h-[9rem]" style={{ backgroundColor: "#272e41" }} />
      ))}
    </div>
  );
};

export default SkeletonLoader;

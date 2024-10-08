import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = ({ limit }) => {
  return (
    <div className="grid mt-20 max-sm:grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-6 w-full h-full padding">
      {[...Array(limit)].map((_, index) => (
        <div key={index} className="flex items-center justify-center flex-col mb-4">
          <Skeleton className="w-full h-[16rem]" style={{ backgroundColor: '#272e41' }} />
          <Skeleton className="w-36 h-4 mt-2" style={{ backgroundColor: '#272e41' }} />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
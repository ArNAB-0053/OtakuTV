import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = ({ limit, className }) => {
  return (
    <div className={className}>
      {[...Array(limit)].map((_, index) => (
        <div key={index} className="flex items-center justify-center flex-col w-full">
          <Skeleton className="w-full h-[15rem]" style={{ backgroundColor: '#272e41' }} />
          <Skeleton className="w-36 h-4 mt-2" style={{ backgroundColor: '#272e41' }} />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
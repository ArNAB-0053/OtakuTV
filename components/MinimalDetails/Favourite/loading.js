import { Skeleton } from "@/components/ui/skeleton";

const Loading = ({ limit }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 w-full h-full place-items-center overflow-hidden">
      {[...Array(limit)].map((_, index) => (
        <div key={index} className="flex items-center justify-center flex-col mb-4">
          <Skeleton className="w-full h-[15rem]" style={{ backgroundColor: '#272e41' }} />
          <Skeleton className="w-full h-4 mt-2" style={{ backgroundColor: '#272e41' }} />
        </div>
      ))}
    </div>
  );
};

export default Loading;
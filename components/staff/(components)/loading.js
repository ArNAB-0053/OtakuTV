import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = ({ limit }) => {
  return (
    <div className="grid grid-cols-2 grid-rows-auto sm:max-lg:grid-cols-3 lg:max-xl:grid-cols-4 xl:grid-cols-3 place-items-start gap-x-4 w-full">
      {[...Array(limit)].map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-center my-3"
        >
          <Skeleton
            className="w-[3rem] lg:w-[4.5rem] h-[3rem] lg:h-[4.5rem] rounded-full mr-3"
            style={{ backgroundColor: "#272e41" }}
          />
          <div className="flex flex-col flex-wrap items-start justify-center w-36">
            <Skeleton
              className="w-full h-[1.3rem]"
              style={{ backgroundColor: "#272e41" }}
            />
            <Skeleton
              className="w-full h-[1rem] mt-2"
              style={{ backgroundColor: "#272e41" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;

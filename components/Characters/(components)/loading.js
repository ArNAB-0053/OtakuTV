import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = ({ limit }) => {
  return (
    <>
      {[...Array(limit)].map((_, index) => (
        <div key={index} className="flex items-start justify-between gap-x-4 w-full my-3">
          <div className="flex items-center justify-center">
            <Skeleton
              className="w-[3rem] lg:w-[4.5rem] h-[3rem] lg:h-[4.5rem] mr-3 rounded-full"
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
          <div className="flex items-center justify-center max-md:mt-4">
            <div className="flex flex-col flex-wrap items-end justify-center w-36">
              <Skeleton
                className="w-full h-[1.3rem]"
                style={{ backgroundColor: "#272e41" }}
              />
              <Skeleton
                className="w-full h-[1rem] mt-2"
                style={{ backgroundColor: "#272e41" }}
              />
            </div>
            <Skeleton
              className="w-[3rem] lg:w-[4.5rem] h-[3rem] lg:h-[4.5rem] ml-3 rounded-full"
              style={{ backgroundColor: "#272e41" }}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;

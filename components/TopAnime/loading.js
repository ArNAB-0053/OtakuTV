import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = ({ limit }) => {
  return (
    <div className="w-full flex gap-4 items-start justify-start flex-col mb-4 bg-bgtop">
      {[...Array(limit)].map((_, index) =>
        index === 0 ? (
          <>
            <div
              key={index}
              className="flex items-start justify-start flex-col mb-4 h-[17rem] gap-4"
            >
              <Skeleton
                className="w-[22rem] h-[14rem]"
                style={{ backgroundColor: "#272e41" }}
              />
              <Skeleton
                className="w-64 h-8"
                style={{ backgroundColor: "#272e41" }}
              />
              <span className="flex items-start justify-start gap-2">
                <Skeleton
                  className="w-8 h-5"
                  style={{ backgroundColor: "#272e41" }}
                />
                <Skeleton
                  className="w-8 h-5"
                  style={{ backgroundColor: "#272e41" }}
                />
                <Skeleton
                  className="w-8 h-5"
                  style={{ backgroundColor: "#272e41" }}
                />
              </span>
            </div>
          </>
        ) : (
          <>
            <div
              key={index}
              className="flex items-center justify-center h-[5rem] gap-2"
            >
              <Skeleton
                className="w-[5rem] h-[5rem]"
                style={{ backgroundColor: "#272e41" }}
              />
              <div className="flex flex-col flex-start justify-start w-full gap-2">
                <Skeleton
                  className="w-64 h-5"
                  style={{ backgroundColor: "#272e41" }}
                />
                <span className="flex items-start justify-start gap-x-2">
                  <Skeleton
                    className="w-8 h-5"
                    style={{ backgroundColor: "#272e41" }}
                  />
                  <Skeleton
                    className="w-8 h-5"
                    style={{ backgroundColor: "#272e41" }}
                  />
                  <Skeleton
                    className="w-8 h-5"
                    style={{ backgroundColor: "#272e41" }}
                  />
                </span>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default SkeletonLoader;

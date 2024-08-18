import PaginationTemplate from "./PaginationTemplate";

const Skeleton = () => {
  return (
    <div>
      <PaginationTemplate
        url="https://api.jikan.moe/v4/top/anime?filter=bypopularity&"
      />
    </div>
  );
};

export default Skeleton;

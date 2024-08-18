import PaginationTemplate from "@/components/PaginationTemplate";

const page = () => {
  return (
    <div>
      <PaginationTemplate url="https://api.jikan.moe/v4/top/anime?filter=bypopularity&" />
    </div>
  );
};

export default page;

import PaginationTemplate from "@/components/PaginationCom/PaginationTemplate";

const page = () => {
  return (
    <div>
      <PaginationTemplate url="https://api.jikan.moe/v4/top/anime?filter=upcoming&" />
    </div>
  );
};

export default page;

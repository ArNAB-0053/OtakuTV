import PaginationTemplate from "@/components/PaginationCom/PaginationTemplate";

const page = () => {
  return (
    <div>
      <PaginationTemplate url="https://api.jikan.moe/v4/seasons/now?" />
    </div>
  );
};

export default page;

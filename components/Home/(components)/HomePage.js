import { useRouter } from "next/router";
import PaginationTemplate from "../PaginationCom/PaginationTemplate";

const HomePage = () => {
  const router = useRouter();
  const { search } = router.query;

  return (
    <div>
      <PaginationTemplate url={`/api/anime/search?query=${encodeURIComponent(search)}`} />
    </div>
  );
};

export default HomePage;

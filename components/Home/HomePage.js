import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import PaginationTemplate from "../PaginationTemplate";

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

import { fetchAnimeData } from "@/components/Home/(components)/fetchAnimeData";
import Home from "@/components/Home/Home";


export default async function Page() {
  const animeData = await fetchAnimeData();

  return (
    <div>
      <Home animeData={animeData} />
    </div>
  );
}

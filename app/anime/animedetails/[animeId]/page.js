import Trailer from "@/components/Trailer/Trailer";
import Staff from "@/components/staff/Staff";
import Characters from "@/components/Characters/Characters";
import Recom from "@/components/Recommendation/Recom";
import Details from "@/components/MinimalDetails/Details";
import TopAnime from "@/components/TopAnime/TopAnime";

export async function fetchAnime(animeId) {
  const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data.data;
}

const Page = async ({ params }) => {
  const { animeId } = params;
  const anime = await fetchAnime(animeId);

  return (
    <div className="w-screen overflow-x-hidden flex items-start justify-start flex-col padding">
      <Details anime={anime} />
      <div className="w-full flex items-start justify-start h-auto gap-6 flex-col xl:flex-row">
        <div className="w-full sm:max-lg:w-[85%] lg:w-[65%]">
          <Trailer vdolink={anime.trailer?.embed_url} />
          <Characters animeID={anime.mal_id} />
          <Staff animeID={anime.mal_id} />
        </div>
        <div className="w-full xl:w-[25%]">
          <TopAnime />
        </div>
      </div>
      <Recom animeId={anime.mal_id} />
    </div>
  );
};

export default Page;

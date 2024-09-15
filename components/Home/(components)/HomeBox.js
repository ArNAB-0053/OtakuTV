import AnimeCarousel from "./AnimeCarousel";

const HomeBox = ({ animeData }) => {
  return (
    <div className="padding w-screen relative">
      <AnimeCarousel animeData={animeData} />
    </div>
  );
};

export default HomeBox;

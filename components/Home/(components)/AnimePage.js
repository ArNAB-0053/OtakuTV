import { fetchAnimeData } from '@/components/Home/FetchAnimeData';
import HomeBox from '@/components/Home/HomeBox';

export async function getStaticProps() {
  const animeData = await fetchAnimeData();
  
  return {
    props: {
      animeData,
    },
    revalidate: 86400, // Revalidate every 24 hours
  };
}

const AnimePage = ({ animeData }) => {
  return <HomeBox animeData={animeData} />;
};

export default AnimePage;

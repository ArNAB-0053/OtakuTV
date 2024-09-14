import PaginationTemplate from "../PaginationCom/PaginationTemplate";
import HomeBox from "./(components)/HomeBox";

const Home = () => {
  return (
    <main className="mb-10">
      <HomeBox/>
      <p className="text-center text-destructive text-md -mt-4 mb-4 px-6">If you enjoy the website, please consider sharing it with your friends. Thank you!</p>
      <PaginationTemplate/>
    </main>
  );
};

export default Home;

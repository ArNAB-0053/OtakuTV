import PaginationTemplate from "@/components/PaginationTemplate";
import HomeBox from "./HomeBox";

const Home = () => {
  return (
    <main className="">
      <HomeBox/>
      <p className="text-center text-destructive text-md -mt-4 mb-4 px-6">If you enjoy the website, please consider sharing it with your friends. Thank you!</p>
      <PaginationTemplate />
    </main>
  );
};

export default Home;

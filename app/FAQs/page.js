import "@/styles/Privacy_Term.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

const FAQs = () => {
  return (
    <div className="background-Term-Policy mt-4 lg:mt-[2.1rem] p-8 md:p-16 lg:px-28 xl:px-36  text-white/70 flex items-center justify-between">
      <Accordion type="single" collapsible className="w-full lg:w-[27rem] xl:w-[30rem] text-start ">
        <h2 className="text-3xl font-bold mb-8">
          Frequently Asked Questions(FAQs)
        </h2>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Otaku.tv?</AccordionTrigger>
          <AccordionContent className="text-start">
            Otaku.tv is a personal project aimed at anime enthusiasts to review
            and discuss anime. It is not affiliated with any official anime
            streaming services or intended for piracy.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is Otaku.tv free to use?</AccordionTrigger>
          <AccordionContent className="text-start">
            Yes, Otaku.tv is completely free to use. It’s a learning platform
            and hobby project for anime fans.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is Otaku.tv legal?</AccordionTrigger>
          <AccordionContent className="text-start">
            Yes, Otaku.tv is a personal project designed to help anime
            enthusiasts track their shows and share their opinions. It is not a
            platform for streaming or hosting anime and complies with all
            copyright laws.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            How do I add anime to my favorites?
          </AccordionTrigger>
          <AccordionContent className="text-start">
            You can add anime to your favorites by visiting an anime’s detail
            page and clicking the "Add to Favorites" button.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            How do I remove an anime from my favorites?
          </AccordionTrigger>
          <AccordionContent className="text-start">
            You can remove anime from your favorites directly from the Favorites
            page by clicking the delete icon on any anime.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-start">
            What kind of anime content can I find on Otaku.tv?
          </AccordionTrigger>
          <AccordionContent className="text-start">
            Otaku.tv allows users to review, comment, and rate a vast variety of
            anime series across genres. You can explore shows based on ratings,
            reviews, and user preferences.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger>
            Can I update my profile information?
          </AccordionTrigger>
          <AccordionContent className="text-start">
            Absolutely! You can update your profile picture, username, and other
            preferences from the settings page after logging into your account.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger>Is there a mobile app available?</AccordionTrigger>
          <AccordionContent className="text-start">
            Currently, Otaku.tv is only available as a web application. A mobile
            app may be considered in the future.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div>
        <Image
          src="/faq.png" // Add your logo image here
          alt="AniWatch Logo"
          width={500}
          height={660}
          className="max-lg:hidden"
        />
      </div>
    </div>
  );
};

export default FAQs;

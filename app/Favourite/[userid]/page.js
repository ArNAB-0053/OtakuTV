"use client";
import ViewFav from "@/components/MinimalDetails/Favourite/ViewFav";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "./loading";
import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa";

const Page = ({ params }) => {
  const router = useRouter();
  const { userid } = params;
  const { user, isSignedIn } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isSignedIn) {
        router.push("/sign-in");
      } else {
        setLoading(false);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [isSignedIn, router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="py-10 flex items-center justify-center flex-col ">
      <h2 className="text-2xl w-full text-white/70 text-center mb-5 tracking-tighter font-semibold bg-bgtop py-8 inline-flex items-center justify-center gap-x-3">
        <p className="font-[Macondo]">Hi,</p> {user.firstName}
      </h2>
      <Button className="PlaywriteCU flex items-center justify-center text-red-50 gap-x-3 tracking-widest">
        <FaHeart color="red" />
        Favourites
      </Button>
      {userid ? <ViewFav userID={userid} /> : <div>Loading...</div>}
    </div>
  );
};

export default Page;

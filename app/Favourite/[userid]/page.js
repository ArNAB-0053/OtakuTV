"use client";
import ViewFav from "@/components/MinimalDetails/Favourite/ViewFav";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "./loading";


const Page = ({ params }) => {
  const router = useRouter();
  const { userid } = params;
  const { isSignedIn } = useUser();
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
    <div className="padding">
      <h2 className="text-2xl text-white/20 text-center mb-5 uppercase tracking-tighter font-semibold">Favourites...</h2>
      {userid ? <ViewFav userID={userid} /> : <div>Loading...</div>}
    </div>
  );
};

export default Page;

'use client'
import ViewFav from '@/components/MinimalDetails/Favourite/ViewFav';
import { useUser } from "@clerk/nextjs";
import React from 'react';

const Page = ({ params }) => {
  const { userid } = params; 
  const { isSignedIn } = useUser(); 
  if (!isSignedIn) return <div>Please sign in to view your favorites.</div>;

  return (
    <div className="padding">
      <h1>Favorites</h1>
      {userid ? <ViewFav userID={userid} /> : <div>Loading...</div>}
    </div>
  );
};

export default Page;

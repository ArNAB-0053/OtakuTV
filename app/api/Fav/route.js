import connectMongodb from "@/lib/mongodb";
import Favorite from "@/lib/models/favoriteSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userID, userName, animeID, imageUrl, animeName } = await req.json();
    
    if (!userID || !userName || !animeID || !imageUrl || !animeName) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectMongodb();

    // Check if favorite already exists
    const existingFavorite = await Favorite.findOne({ userID, animeID });
    if (existingFavorite) {
      return NextResponse.json(
        { message: "Favorite already exists" },
        { status: 409 }
      );
    }

    const newFavorite = await Favorite.create({
      userID,
      userName,
      animeID,
      imageUrl,
      animeName
    });

    return NextResponse.json(
      { message: "Favorite created", newFavorite },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating favorite:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userID = searchParams.get("userID");
  const animeID = searchParams.get("animeID");

  if (!userID) {
    return NextResponse.json(
      { message: "userID query parameter is required" },
      { status: 400 }
    );
  }

  await connectMongodb();
  try {
    const filter = { userID };
    const favorites = await Favorite.find(filter);

    if (animeID) {
      const isFavorite = favorites.some(fav => fav.animeID === parseInt(animeID));
      return NextResponse.json({ exists: isFavorite });
    }

    return NextResponse.json({ favorites });
  } catch (err) {
    console.error("Error fetching favorites:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function DELETE(req) {
  const { userID, animeID } = await req.json();

  if (!userID || !animeID) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  await connectMongodb();

  try {
    const result = await Favorite.deleteOne({ userID, animeID });

    if (result.deletedCount > 0) {
      return NextResponse.json(
        { message: "Favorite removed successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Favorite not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
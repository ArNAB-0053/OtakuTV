import connectMongodb from "@/lib/mongodb";
import Comment from "@/lib/models/commentSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userID, userName, comment, animeID, hasImage, imageUrl } =
      await req.json();
    if (!userID || !userName || !comment || !animeID || !hasImage) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    await connectMongodb();
    const newComment = await Comment.create({
      userID,
      userName,
      comment,
      animeID,
      hasImage,
      imageUrl,
    });
    return NextResponse.json(
      { message: "Comment created", newComment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const animeID = searchParams.get("animeID");

  if (!animeID) {
    return NextResponse.json(
      { message: "animeID query parameter is required" },
      { status: 400 }
    );
  }

  await connectMongodb();
  try {
    const comments = await Comment.find({ animeID });
    return NextResponse.json({ comments });
  } catch (err) {
    console.error("Error fetching comments:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

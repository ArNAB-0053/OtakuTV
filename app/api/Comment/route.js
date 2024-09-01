import connectMongodb from "@/lib/mongodb";
import Comment from "@/lib/models/commentSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userID, userName, comment } = await req.json();
    if (!userID || !userName || !comment)
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    await connectMongodb();
    const newComment = await Comment.create({ userID, userName, comment });
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

export async function GET() {
  await connectMongodb();
  try {
    const comments = await Comment.find();
    return NextResponse.json({ comments });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    animeID: { type: Number, required: true },
    userID: { type: String, required: true },
    userName: { type: String, required: true },
    comment: { type: String, required: true },
    hasImage: { type: Boolean, required: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;

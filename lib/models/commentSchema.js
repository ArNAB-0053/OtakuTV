import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    userID: { type: String, required: true },
    userName: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;

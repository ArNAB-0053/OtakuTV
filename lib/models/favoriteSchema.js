import mongoose, { Schema } from "mongoose";

const favSchema = new Schema(
  {
    animeID: { type: Number, required: true },
    userID: { type: String, required: true },
    userName: { type: String, required: true },
    imageUrl: {type: String, required: true},
    animeName: {type: String, required: true}
  },
  { timestamps: true, collection: 'favorites' }
);

const Favorite = mongoose.models.Favorite || mongoose.model("Favorite", favSchema);
export default Favorite;

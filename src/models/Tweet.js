import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    email: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export const Tweet =
  mongoose.models.Tweet || mongoose.model("Tweet", TweetSchema);

import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/dataBase";
import { Tweet } from "@/models/Tweet";
import { User } from "@/models/User";

export async function POST(req) {
  await makeSureDbIsReady();
  const { text, author } = await req.json();

  if (!text || !author || !author._id) {
    return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 });
  }

  // Fetch author to embed name/email for denormalizing
  const user = await User.findById(author._id);
  if (!user) {
    return NextResponse.json({ success: false, error: "User not found" }, { status: 400 });
  }

  const newTweet = await Tweet.create({
    text,
    author: { _id: user._id, name: user.name, email: user.email },
  });

  return NextResponse.json({ success: true, tweet: {
    id: newTweet._id,
    text: newTweet.text,
    author: newTweet.author,
    createdAt: newTweet.createdAt,
  }});
}

export async function GET() {
  await makeSureDbIsReady();
  const tweets = await Tweet.find().sort({ createdAt: -1 }).lean();
  // Format for frontend
  const result = tweets.map(t => ({
    id: t._id,
    text: t.text,
    author: t.author,
    timestamp: t.createdAt,
  }));
  return NextResponse.json({ success: true, tweets: result });
}

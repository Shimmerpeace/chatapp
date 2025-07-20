//api/auth/login/route.js
import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/dataBase";
import { User } from "@/models/User";

export async function POST(req) {
  await makeSureDbIsReady();

  let data;
  try {
    data = await req.json();
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Invalid or empty JSON input." },
      { status: 400 }
    );
  }
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    user: {
      name: user.name,
      email: user.email,
      _id: user._id,
    },
  });
}
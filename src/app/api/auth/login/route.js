//api/auth/login/route.js
import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/dataBase";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Use only environment variable for JWT secret in production
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set.");
}
// JWT secret (in production, use an environment variable)

export async function POST(req) {
  try {
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
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing credentials." },
        { status: 400 }
      );
    }

    // Find user in the database
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { _id: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        _id: user._id.toString()
      }
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax"
    });
    return response;
  } catch (error) {
    console.log("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

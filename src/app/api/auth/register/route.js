//api/auth/register/route.js
import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/dataBase";
import { User } from "@/models/User";
import { hashPassword, signJwt } from "@/lib/useAuth";

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

    let { name, email, password } = data;
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }
    email = email.trim().toLowerCase();
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password too short" },
        { status: 400 }
      );
    }
    // Basic email format check optional!
    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //   return NextResponse.json(
    //     { success: false, error: "Invalid email format" },
    //     { status: 400 }
    //   );
    // }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password (for registration)** Hashes password manually with bcrypt before creating user.
    const hashedPassword = await hashPassword(password);
    // Create user
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
    });
    // Generate a token
    const token = signJwt({ _id: user._id, email: user.email });

    const response = NextResponse.json({
      success: true,
      user: { 
        name: user.name, 
        email: user.email, 
        _id: user._id,
       },
       token,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (e) {
    console.log("Route error:", e); // Log for yourself!
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}


/**
 import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/dataBase";
import { User } from "@/models/User";
// Optional: import bcrypt for password hashing
import bcrypt from "bcryptjs";

export async function POST(req) {
  await makeSureDbIsReady();

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }
  
  const { name, email, password } = body || {};

  if (!name || !email || !password) {
    return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
  }

  if (await User.findOne({ email })) {
    return NextResponse.json({ success: false, error: "Email already registered" }, { status: 400 });
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });

  return NextResponse.json(
    { success: true, user: { name: user.name, email: user.email, _id: user._id } },
    { status: 201 }
  );
}
 */

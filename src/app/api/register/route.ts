// src/app/api/register/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToMongoDB from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(request: Request) {
  console.log("Request received at /api/register");
  try {
    await connectToMongoDB();

    const { name, email, password } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("User registered successfully", user._id);

    return NextResponse.json(
      { message: "User registered successfully", userId: user._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

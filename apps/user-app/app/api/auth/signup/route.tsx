import { NextRequest, NextResponse } from "next/server";

import db from "@repo/db/client";
import bcrypt from "bcrypt";
import { z } from "zod";

// Zod schema for validation
const SignupSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone Number must be at least 10 digits")
    .max(15, "Phone Number must be at most 15 digits"),
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  otp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
});

// Handle POST request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = SignupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.message },
        { status: 400 }
      );
    }

    const { email, phone, password, otp } = parsed.data;

    // Verify OTP
    const storedOtp = await db.otp.findFirst({
      where: { phone, otp },
    });

    if (!storedOtp || storedOtp.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.user.findFirst({
      where: { email, number: phone },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        number: phone,
        password: hashedPassword,
      },
    });

    // Optionally delete OTP
    await db.otp.deleteMany({ where: { phone: email } });

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

import { NextResponse } from "next/server";

// POST orqali yangi kod yaratish va javob berish
export async function POST(request: Request) {
  // Misol uchun, 1 ta random kod yaratamiz
  const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
  
  return NextResponse.json({ code: randomCode });
}

// GET: shunchaki test yoki frontend uchun
export async function GET() {
  return NextResponse.json({ message: "Use POST to generate codes" });
}

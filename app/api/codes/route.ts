import { NextResponse } from "next/server";

// Kodlar vaqtincha server xotirasida saqlanadi
let codes: string[] = [];

// GET: barcha kodlarni olish
export async function GET() {
  return NextResponse.json({ items: codes });
}

// POST: yangi kod qo‘shish
export async function POST(request: Request) {
  const newCodes: string[] = await request.json();
  codes = [...codes, ...newCodes];
  return NextResponse.json({ success: true, items: codes });
}

// Internal functions (faqat server ichida ishlatiladi)
function resetCodes() {
  codes = [];
}

function getCodes() {
  return codes;
}

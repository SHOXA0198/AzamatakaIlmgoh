import { NextResponse } from "next/server";
import { addCodes } from "../route"; // codes massivini ishlatish uchun

function randomCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export async function POST(req: Request) {
  const body = await req.json();
  const { count, limit, types } = body;

  const newCodes: any[] = [];

  for (const t of types) {
    for (let i = 0; i < count; i++) {
      newCodes.push({
        _id: crypto.randomUUID(),
        code: randomCode(),
        testType: t,
        used: 0,
        limit: limit,
      });
    }
  }

  addCodes(newCodes);

  return NextResponse.json({ ok: true, added: newCodes.length });
}

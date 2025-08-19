import { NextResponse } from "next/server";

// Kodlar vaqtincha xotirada saqlanadi
let codes: any[] = [];

export async function GET() {
  return NextResponse.json({ items: codes });
}

// Agar keyinchalik POST orqali kod qo‘shmoqchi bo‘lsangiz shu yerda ishlatishingiz mumkin
export function addCodes(newOnes: any[]) {
  codes = [...codes, ...newOnes];
}

export function getCodes() {
  return codes;
}

export function resetCodes() {
  codes = [];
}

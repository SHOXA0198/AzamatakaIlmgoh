
import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  const form = await request.formData()
  const file = form.get('file') as File | null
  if (!file) return NextResponse.json({ success: false, message: 'Fayl topilmadi' })
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const filename = `${Date.now()}-${file.name}`.replace(/\s+/g,'_')
  const filepath = path.join(process.cwd(), 'public', 'uploads', filename)
  await writeFile(filepath, buffer)
  const url = `/uploads/${filename}`
  return NextResponse.json({ success: true, url })
}

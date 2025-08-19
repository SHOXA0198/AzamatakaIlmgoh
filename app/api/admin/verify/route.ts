
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { code } = await request.json()
    if (!code) {
      return NextResponse.json({ success: false, message: 'Kod kiritilmagan' })
    }
    const normalized = String(code).toUpperCase().trim()
    if (normalized !== 'AZAMATALI') {
      return NextResponse.json({ success: false, message: 'Noto\'g\'ri kod' })
    }
    const res = NextResponse.json({ success: true })
    // Set HttpOnly cookie for admin
    res.cookies.set('admin_code', 'AZAMATALI', { httpOnly: true, path: '/', maxAge: 60 * 60 * 8 })
    return res
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Server xatosi' })
  }
}

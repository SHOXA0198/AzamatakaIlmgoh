import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(request: Request) {
  try {
    await connectDB()
    
    const { username, password } = await request.json()
    
    if (!username || !password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Username va parol kiritilishi kerak' 
      })
    }

    if (password.length < 6) {
      return NextResponse.json({ 
        success: false, 
        message: 'Parol kamida 6 ta belgi bo\'lishi kerak' 
      })
    }

    const existingUser = await User.findOne({ username })
    
    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        message: 'Bu username allaqachon mavjud' 
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    
    const user = await User.create({
      username,
      password: hashedPassword
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Foydalanuvchi muvaffaqiyatli yaratildi',
      userId: user._id
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Server xatosi' 
    })
  }
}
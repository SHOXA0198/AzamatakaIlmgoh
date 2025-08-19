import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Code from '@/models/Code'

export async function POST(request: Request) {
  try {
    await connectDB()
    
    const { code } = await request.json()
    
    if (!code) {
      return NextResponse.json({ 
        success: false, 
        message: 'Kod kiritilmagan' 
      })
    }

    const codeDoc = await Code.findOne({ 
      code: code.toUpperCase(), 
      isActive: true 
    })

    if (!codeDoc) {
      return NextResponse.json({ 
        success: false, 
        message: 'Kod topilmadi yoki faol emas' 
      })
    }

    if (codeDoc.used >= codeDoc.limit) {
      return NextResponse.json({ 
        success: false, 
        message: 'Kod limiti tugagan' 
      })
    }

    return NextResponse.json({ 
      success: true, 
      testType: codeDoc.testType,
      remainingUses: codeDoc.limit - codeDoc.used
    })

  } catch (error) {
    console.error('Code verification error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Server xatosi' 
    })
  }
}
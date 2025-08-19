import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Question from '@/models/Question'

export async function GET(request: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(request.url)
  const examType = (searchParams.get('examType') || searchParams.get('testType') || '').toUpperCase()
  const section = searchParams.get('section') || undefined

  const query: any = {}
  if (examType) query.examType = examType
  if (section) query.section = section

  const items = await Question.find(query).sort({ createdAt: -1 }).lean()
  return NextResponse.json({ success: true, items })
}

export async function POST(request: NextRequest) {
  await connectDB()
  try {
    const body = await request.json()
    const { question, type = 'mcq', options = [], correct, section, examType } = body

    if (!question || !examType) {
      return NextResponse.json({ success: false, message: 'question and examType are required' }, { status: 400 })
    }

    const payload: any = { question, type, section, examType: String(examType).toUpperCase() }
    if (type === 'mcq') {
      if (!Array.isArray(options) || options.length < 2) {
        return NextResponse.json({ success: false, message: 'MCQ requires at least 2 options' }, { status: 400 })
      }
      payload.options = options
      payload.correct = correct ?? options[0]
    } else if (type === 'boolean') {
      payload.correct = typeof correct === 'string' ? correct.toLowerCase() === 'true' : !!correct
      payload.options = []
    } else {
      if (typeof correct !== 'string' || !correct.trim()) {
        return NextResponse.json({ success: false, message: 'Short answer requires a correct string' }, { status: 400 })
      }
      payload.correct = correct.trim()
      payload.options = []
    }

    const item = await Question.create(payload)
    return NextResponse.json({ success: true, item })
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 })
  }
}

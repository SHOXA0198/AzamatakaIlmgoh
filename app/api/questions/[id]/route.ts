import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Question from '@/models/Question'

type Params = { params: { id: string } }

export async function DELETE(_: Request, { params }: Params) {
  await connectDB()
  await Question.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}

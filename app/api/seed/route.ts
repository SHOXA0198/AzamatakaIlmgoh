import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Question from '@/models/Question'

export async function POST() {
  await connectDB()
  // wipe existing demo by a marker (section starts with DEMO-)
  await Question.deleteMany({ section: /^DEMO-/ })

  const demo: any[] = [
    // IELTS - DEMO sections
    { examType: 'IELTS', section: 'DEMO-Listening', type: 'mcq', question: 'IELTS Listening: Correct answer which one?', options: ['A','B','C','D'], correct: 'B' },
    { examType: 'IELTS', section: 'DEMO-Listening', type: 'boolean', question: 'IELTS Listening has 40 questions?', correct: true },
    { examType: 'IELTS', section: 'DEMO-Reading', type: 'short', question: 'How many bands does IELTS use (max)?', correct: '9' },
    { examType: 'IELTS', section: 'DEMO-Reading', type: 'mcq', question: 'Which skill is NOT tested in IELTS Academic Reading?', options: ['Skimming','Scanning','Editing audio','Detailed reading'], correct: 'Editing audio' },

    // CEFR
    { examType: 'CEFR', section: 'DEMO-Grammar', type: 'mcq', question: 'Choose the correct form: She ____ to school.', options: ['go','goes','gone','going'], correct: 'goes' },
    { examType: 'CEFR', section: 'DEMO-Grammar', type: 'boolean', question: 'C2 is higher than B2.', correct: true },
    { examType: 'CEFR', section: 'DEMO-Reading', type: 'short', question: 'Write any synonym of "fast".', correct: 'quick' },

    // SAT
    { examType: 'SAT', section: 'DEMO-Math', type: 'short', question: 'SAT maximum score?', correct: '1600' },
    { examType: 'SAT', section: 'DEMO-Math', type: 'boolean', question: 'SAT includes a Writing section.', correct: true },
    { examType: 'SAT', section: 'DEMO-English', type: 'mcq', question: 'Pick a synonym of "beneficial".', options: ['harmful','useful','useless','trivial'], correct: 'useful' },
  ]

  await Question.insertMany(demo)
  const count = await Question.countDocuments({ section: /^DEMO-/ })
  return NextResponse.json({ success: true, inserted: demo.length, totalDemo: count })
}

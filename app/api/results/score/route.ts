
import { NextResponse } from 'next/server'
/* no DB save here */
import Result from '@/models/Result'

// Simplified IELTS band conversion (example mapping, adjust as needed)
function ieltsBand(correct: number, total: number) {
  const pct = (correct/total)*100
  if (pct >= 90) return 9
  if (pct >= 82) return 8
  if (pct >= 74) return 7
  if (pct >= 65) return 6
  if (pct >= 56) return 5
  if (pct >= 47) return 4
  return 3
}

// Simplified SAT scoring (raw->scaled placeholder)
function satScaled(raw: number, maxRaw: number) {
  const scaled = Math.round(200 + (raw / maxRaw) * 600) // 200..800
  return Math.min(800, Math.max(200, scaled))
}

// Simplified CEFR level
function cefrLevel(pct: number) {
  if (pct >= 90) return 'C2'
  if (pct >= 75) return 'C1'
  if (pct >= 60) return 'B2'
  if (pct >= 45) return 'B1'
  if (pct >= 30) return 'A2'
  return 'A1'
}

export async function POST(request: Request) {
  // no db
  const body = await request.json()
  const { userId, testType, sectionScores } = body
  // sectionScores: { correct: number, total: number } per section key
  let score: any = {}

  if (testType === 'IELTS') {
    const L = ieltsBand(sectionScores.listening.correct, sectionScores.listening.total)
    const R = ieltsBand(sectionScores.reading.correct, sectionScores.reading.total)
    // Writing not auto-graded here -> expect 0..9 from rubric or 0 treat as pending
    const W = sectionScores.writing?.band ?? 0
    const overall = Math.round(((L + R + W) / 3) * 2) / 2 // round to .5
    score = { listening: L, reading: R, writing: W, overall }
  } else if (testType === 'SAT') {
    const M = satScaled(sectionScores.math.correct, sectionScores.math.total)
    const E = satScaled(sectionScores.english.correct, sectionScores.english.total)
    const total = M + E
    score = { math: M, english: E, total }
  } else if (testType === 'CEFR') {
    const lPct = (sectionScores.listening.correct/sectionScores.listening.total)*100
    const rPct = (sectionScores.reading.correct/sectionScores.reading.total)*100
    const w = sectionScores.writing?.score ?? 0 // 0..100
    const avg = (lPct + rPct + w) / 3
    const level = cefrLevel(avg)
    score = { average: Math.round(avg), level }
  }

  return NextResponse.json({ success: true, score })
}

'use client'

import useSWR from 'swr'
import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { convertScore } from '@/lib/score'

const fetcher = (url: string) => fetch(url).then(r=>r.json())

export default function TestPage() {
  const [answers, setAnswers] = useState<any>({})
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testType = typeof window !== 'undefined' ? (sessionStorage.getItem('testType') || 'IELTS') : 'IELTS'
  const { data } = useSWR(`/api/questions?examType=${testType}`, fetcher)
  const items = data?.items || []

  const sections: string[] = useMemo(()=>{
    const set = new Set<string>()
    items.forEach((q:any)=> set.add(q.section || 'General'))
    return Array.from(set)
  }, [items])

  const [step, setStep] = useState(0)
  const currentSection = sections[step] || 'General'
  const sectionItems = items.filter((q:any)=> (q.section || 'General') === currentSection)

  function setAnswer(id: string, value: any) {
    setAnswers((prev:any)=>({ ...prev, [id]: value }))
  }
  function eq(a:any,b:any) {
    if (typeof a === 'string' && typeof b === 'string') return a.trim().toLowerCase() === b.trim().toLowerCase()
    return a === b
  }

  function finish() {
    const total = items.length
    let raw = 0
    const perSection: Record<string,{raw:number,total:number,details:any[]}> = {}
    const details = items.map((q:any)=>{
      const sec = q.section || 'General'
      perSection[sec] ||= { raw:0, total:0, details:[] }
      perSection[sec].total += 1

      const ans = answers[q._id]
      const ok = eq(ans, q.correct)
      if (ok) { raw += 1; perSection[sec].raw += 1 }
      const row = { id: q._id, ok, your: ans, correct: q.correct, type: q.type, question: q.question, section: sec }
      perSection[sec].details.push(row)
      return row
    })
    const converted = convertScore(raw, total, testType)
    setResult({ raw, total, converted, details, perSection })
    setSubmitted(true)
  }

  if (!data) return <div className="p-6 text-white">Loading...</div>

  if (submitted) {
    const sKeys = Object.keys(result.perSection)
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Card>
          <CardHeader><CardTitle>Natija: {result.raw}/{result.total} — {result.converted}</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              {sKeys.map((sec)=>{
                const pr = result.perSection[sec]
                const conv = convertScore(pr.raw, pr.total, testType)
                return (
                  <div key={sec} className="p-3 rounded border">
                    <div className="font-semibold">{sec}: {pr.raw}/{pr.total} — {conv}</div>
                  </div>
                )
              })}
            </div>

            <div className="space-y-2">
              {result.details.map((d:any, i:number)=>(
                <div key={d.id} className={"p-3 rounded border " + (d.ok ? "bg-green-50" : "bg-red-50")}>
                  <div className="font-medium">{i+1}. [{d.section}] {d.question}</div>
                  <div>{d.ok ? "✅ To'g'ri" : "❌ Noto'g'ri"}</div>
                  {!d.ok && <div className="text-sm opacity-80">Siz: {String(d.your || '')} — To'g'ri: {String(d.correct)}</div>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Test: {testType}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Section steps */}
          <div className="flex flex-wrap gap-2">
            {sections.map((sec, i)=>(
              <button key={sec} className={"px-3 py-1 rounded border " + (i===step?'bg-white':'bg-transparent')} onClick={()=>setStep(i)}>
                {i+1}. {sec}
              </button>
            ))}
          </div>

          {/* Current section questions */}
          <div className="space-y-4">
            <div className="text-base font-semibold">Bo‘lim: {currentSection}</div>
            {sectionItems.map((q:any, idx:number)=>(
              <div key={q._id} className="p-4 rounded-lg border bg-white">
                <div className="mb-2 font-semibold">{idx+1}. {q.question}</div>

                {q.type === 'mcq' && (
                  <div className="space-y-2">
                    {q.options?.map((opt:string)=>(
                      <label key={opt} className="flex items-center gap-2">
                        <input type="radio" name={q._id} onChange={()=>setAnswer(q._id, opt)} checked={answers[q._id]===opt} />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {q.type === 'boolean' && (
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={()=>setAnswer(q._id, true)} className={answers[q._id]===true ? 'ring-2' : ''}>True</Button>
                    <Button type="button" variant="outline" onClick={()=>setAnswer(q._id, false)} className={answers[q._id]===false ? 'ring-2' : ''}>False</Button>
                  </div>
                )}

                {q.type === 'short' && (
                  <Input placeholder="Your answer..." value={answers[q._id] || ''} onChange={e=>setAnswer(q._id, e.target.value)} />
                )}
              </div>
            ))}
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-between">
            <Button variant="outline" disabled={step===0} onClick={()=>setStep(s=>Math.max(0, s-1))}>Prev</Button>
            {step < sections.length-1 ? (
              <Button onClick={()=>setStep(s=>Math.min(sections.length-1, s+1))}>Next Section</Button>
            ) : (
              <Button onClick={finish}>Finish & See Result</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

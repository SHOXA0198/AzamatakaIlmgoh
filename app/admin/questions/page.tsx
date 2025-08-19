'use client'

import useSWR from 'swr'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const fetcher = (url: string) => fetch(url).then(r=>r.json())

export default function AdminQuestionsPage() {
  const { data, mutate } = useSWR('/api/questions', fetcher)
  const [examType, setExamType] = useState<'IELTS'|'CEFR'|'SAT'>('IELTS')
  const [section, setSection] = useState('General')
  const [type, setType] = useState<'mcq'|'short'|'boolean'>('mcq')
  const [question, setQuestion] = useState('')
  const [optionsCsv, setOptionsCsv] = useState('')
  const [correct, setCorrect] = useState('')

  const submit = async () => {
    const payload: any = { examType, section, type, question }
    if (type === 'mcq') payload.options = optionsCsv.split(',').map(s=>s.trim()).filter(Boolean)
    payload.correct = type === 'boolean' ? (String(correct).toLowerCase() === 'true') : correct

    await fetch('/api/questions', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) })
    await mutate()
    setQuestion(''); setOptionsCsv(''); setCorrect('')
  }

  const remove = async (id: string) => {
    await fetch('/api/questions/'+id, { method: 'DELETE' })
    mutate()
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="flex items-center justify-between"><CardTitle>Yangi savol qo‘shish</CardTitle><Button variant="outline" onClick={async()=>{await fetch('/api/seed',{method:'POST'}); alert('Demo savollar yuklandi');}}>Seed Demo Data</Button></CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Exam Type</Label>
            <select className="border rounded px-3 py-2" value={examType} onChange={(e)=>setExamType(e.target.value as any)}>
              <option>IELTS</option>
              <option>CEFR</option>
              <option>SAT</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Section</Label>
            <Input value={section} onChange={(e)=>setSection(e.target.value)} placeholder="Listening / Reading / Writing / Math / English ..." />
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <select className="border rounded px-3 py-2" value={type} onChange={(e)=>setType(e.target.value as any)}>
              <option value="mcq">Multiple Choice</option>
              <option value="short">Short Answer</option>
              <option value="boolean">True / False</option>
            </select>
          </div>

          <div className="md:col-span-3 space-y-2">
            <Label>Question</Label>
            <Textarea value={question} onChange={(e)=>setQuestion(e.target.value)} />
          </div>

          {type === 'mcq' && (
            <div className="md:col-span-2 space-y-2">
              <Label>Options (comma separated)</Label>
              <Input value={optionsCsv} onChange={(e)=>setOptionsCsv(e.target.value)} placeholder="A,B,C,D" />
            </div>
          )}

          <div className="space-y-2">
            <Label>Correct Answer</Label>
            {type === 'boolean' ? (
              <select className="border rounded px-3 py-2" value={String(correct)} onChange={(e)=>setCorrect(e.target.value)}>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            ) : (
              <Input value={correct} onChange={(e)=>setCorrect(e.target.value)} placeholder={type==='mcq'?'Write the exact option text':'Correct text'} />
            )}
          </div>

          <div className="flex items-end">
            <Button onClick={submit}>Save Question</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Mavjud savollar</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Question</TableHead>
                <TableHead>Correct</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.items?.map((q:any) => (
                <TableRow key={q._id}>
                  <TableCell>{q.examType}</TableCell>
                  <TableCell>{q.section}</TableCell>
                  <TableCell>{q.type}</TableCell>
                  <TableCell className="max-w-[320px] truncate">{q.question}</TableCell>
                  <TableCell>{String(q.correct)}</TableCell>
                  <TableCell><Button variant="destructive" onClick={()=>remove(q._id)}>Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

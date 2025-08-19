'use client'

import useSWR from 'swr'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const fetcher = (url: string) => fetch(url).then(r=>r.json())

export default function AdminCodesPage() {
  const { data, mutate } = useSWR('/api/codes', fetcher)
  const [count, setCount] = useState(400)
  const [limit, setLimit] = useState(200)

  const generate = async () => {
    await fetch('/api/codes/generate', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ count, limit, types: ['IELTS','SAT','CEFR'] }) })
    mutate()
  }

  const exportCsv = () => {
    const items = (data?.items||[])
    const csv = ['code,testType,used,limit'].concat(items.map((c:any)=>[c.code,c.testType||'',c.used,c.limit].join(','))).join('\n')
    const blob = new Blob([csv], {type:'text/csv'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'codes.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const copyAll = async () => {
    const txt = (data?.items||[]).map((c:any)=>c.code).join('\n')
    await navigator.clipboard.writeText(txt)
    alert('Copied!')
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader><CardTitle>Kodlar generatori</CardTitle></CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Kodlar soni (har tur uchun)</Label>
            <Input type="number" value={count} onChange={(e)=>setCount(parseInt(e.target.value||'0'))} />
          </div>
          <div className="space-y-2">
            <Label>Foydalanuvchi limiti</Label>
            <Input type="number" value={limit} onChange={(e)=>setLimit(parseInt(e.target.value||'0'))} />
          </div>
          <div className="flex items-end gap-3">
            <Button onClick={generate}>Generate</Button>
            <Button variant="outline" onClick={exportCsv}>Export CSV</Button>
            <Button variant="outline" onClick={copyAll}>Copy All</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Mavjud kodlar</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kod</TableHead>
                <TableHead>Imtihon</TableHead>
                <TableHead>Ishlatilgan</TableHead>
                <TableHead>Limit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.items?.map((c:any) => (
                <TableRow key={c._id}>
                  <TableCell className="font-mono">{c.code}</TableCell>
                  <TableCell>{c.testType || '-'}</TableCell>
                  <TableCell>{c.used}</TableCell>
                  <TableCell>{c.limit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

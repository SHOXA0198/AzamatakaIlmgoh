
'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, BookOpen, Key } from 'lucide-react'

export default function AdminPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">Ilmgoh Admin</h1>
          <p className="text-sm text-muted-foreground">Boshqaruv paneli</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Savollar
            </CardTitle>
            <CardDescription>IELTS / SAT / CEFR uchun CRUD</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/questions">
              <Button>Savollarni boshqarish</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" /> Kodlar
            </CardTitle>
            <CardDescription>Imtihon kodlari (400 tadan) va limitlar</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/codes">
              <Button>Kodlarni boshqarish</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

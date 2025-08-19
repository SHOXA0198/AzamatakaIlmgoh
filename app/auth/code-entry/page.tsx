'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, BookOpen, KeyRound, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'

export default function CodeEntryPage() {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) {
      setError('Iltimos, kodni kiriting')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Check if admin code
      if (code.toUpperCase() === 'AZAMATALI') {
        router.push('/admin')
        return
      }

      const response = await fetch('/api/codes/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.toUpperCase() })
      })

      const data = await response.json()

      if (data.success) {
        // Store code in session storage for test access
        sessionStorage.setItem('testCode', code.toUpperCase())
        sessionStorage.setItem('testType', data.testType)
        router.push('/test')
      } else {
        setError(data.message || 'Kod xato yoki muddati tugagan')
      }
    } catch (error) {
      console.error('Code verification error:', error)
      setError('Xatolik yuz berdi. Qayta urinib ko\'ring.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary/5 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Ilmgoh</h1>
              <p className="text-sm text-secondary">Mock Test Platform</p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <Card className="shadow-xl border border-secondary/20">
          <CardHeader className="text-center">
            <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <KeyRound className="h-8 w-8 text-secondary" />
            </div>
            <CardTitle className="text-2xl text-primary">Kodni kiriting</CardTitle>
            <CardDescription className="text-primary/60">
              Test boshlash uchun maxsus kodingizni kiriting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-primary font-medium">Test kodi</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Kodingizni kiriting..."
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="text-center text-lg font-mono tracking-wider border-secondary/30 focus:border-secondary"
                  maxLength={20}
                />
                <p className="text-xs text-primary/50 text-center">
                  Katta-kichik harflar farqi yo'q
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Tekshirilmoqda...
                  </div>
                ) : (
                  'Testni boshlash'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-primary/60 hover:text-primary transition-colors inline-flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Bosh sahifaga qaytish
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="mt-6 grid grid-cols-1 gap-3">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-primary mb-1">Test turlari</h4>
                  <p className="text-sm text-primary/70">
                    IELTS, SAT va CEFR testlari mavjud
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/5 border-secondary/20">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                  <KeyRound className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <h4 className="font-medium text-secondary mb-1">Admin Panel</h4>
                  <p className="text-sm text-secondary/80">
                    Admin paneliga kirish uchun maxsus kod
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
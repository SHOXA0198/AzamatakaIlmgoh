import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Users, Award, Clock, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Professional Mock Tests",
      description: "IELTS, SAT va CEFR test turlari bo'yicha sifatli mashq imtihonlari"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Kod orqali kirish",
      description: "Xavfsiz kod tizimi orqali testlarga kiring"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Real-time natijalar",
      description: "Test yakunida natijalaringizni darhol ko'ring"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Vaqt nazorati",
      description: "Haqiqiy imtihon sharoitida vaqt bilan ishlash"
    }
  ]

  const testTypes = [
    {
      name: "IELTS",
      sections: ["Listening", "Reading", "Writing"],
      description: "International English Language Testing System",
      color: "bg-primary/5 border-primary/20 text-primary"
    },
    {
      name: "SAT",
      sections: ["Math", "English"],
      description: "Scholastic Assessment Test",
      color: "bg-secondary/5 border-secondary/20 text-secondary"
    },
    {
      name: "CEFR",
      sections: ["Listening", "Reading", "Writing"],
      description: "Common European Framework of Reference",
      color: "bg-primary/10 border-primary/30 text-primary"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary/5 to-primary/5">
      {/* Header */}
      <header className="border-b border-secondary/20 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Ilmgoh</h1>
                <p className="text-sm text-secondary">Mock Test Platform</p>
              </div>
            </div>
            <Link href="/auth/code-entry">
              <Button className="btn-primary">
                Testni boshlash
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/30 font-medium">
              Professional Mock Test Platform
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              IELTS, SAT va CEFR
              <br />
              <span className="text-secondary">Mock Testlari</span>
            </h1>
            <p className="text-xl text-primary/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Professional darajadagi mock testlar bilan o'zingizni haqiqiy imtihonga tayyorlang. 
              Zamonaviy interfeys va aniq natijalar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/code-entry">
                <Button size="lg" className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Kodni kiritib testni boshlang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center space-x-2 text-sm text-primary/60">
                <CheckCircle className="h-4 w-4 text-secondary" />
                <span>Kod orqali xavfsiz kirish</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Types Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Mavjud Test Turlari</h2>
            <p className="text-primary/70 text-lg max-w-2xl mx-auto">
              Har bir test turi bo'yicha professional sifatdagi savollar va real-time natija hisoblash
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testTypes.map((test, index) => (
              <Card key={test.name} className="hover:shadow-xl transition-all duration-300 border border-secondary/20 shadow-md animate-slide-in hover:border-secondary/40" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{test.name}</CardTitle>
                    <Badge className={test.color}>
                      {test.sections.length} bo'lim
                    </Badge>
                  </div>
                  <CardDescription className="text-base text-primary/60">
                    {test.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {test.sections.map((section) => (
                      <div key={section} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-secondary" />
                        <span className="text-sm text-primary">{section}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Nima uchun Ilmgoh?</h2>
            <p className="text-primary/70 text-lg max-w-2xl mx-auto">
              Zamonaviy texnologiyalar va foydalanuvchi-friendly interfeys bilan qurilgan platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border border-secondary/20 shadow-md animate-fade-in hover:border-secondary/40 bg-white" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-4 text-secondary">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-primary">{feature.title}</h3>
                  <p className="text-primary/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Tayyor bo'lsangiz, testni boshlang!</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Maxsus kodingiz bilan professional mock testlarga kirish va o'z darajangizni aniqlash
          </p>
          <Link href="/auth/code-entry">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-semibold text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Kodni kiritish
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-secondary/20 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-primary">Ilmgoh</span>
            </div>
            <p className="text-primary/60 text-sm text-center md:text-right">
              © 2024 Ilmgoh. Professional Mock Test Platform.
              <br />
              IELTS, SAT va CEFR testlariga tayyorgarlik platformasi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
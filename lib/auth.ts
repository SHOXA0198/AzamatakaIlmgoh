import bcrypt from 'bcryptjs'
import { NextAuthOptions, DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectDB from './mongodb'
import User from '@/models/User'

// TypeScript uchun session.user va User tipini kengaytirish
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      username: string
      isAdmin: boolean
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    username: string
    isAdmin: boolean
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null

        try {
          await connectDB()
          const user = await User.findOne({ username: credentials.username })

          if (!user) return null

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
          if (!isPasswordValid) return null

          return {
            id: user._id.toString(),
            username: user.username,
            isAdmin: user.isAdmin
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username
        token.isAdmin = user.isAdmin
        token.sub = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub ?? ''
        session.user.username = token.username ?? ''
        session.user.isAdmin = token.isAdmin ?? false
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/login'
  },
  session: {
    strategy: 'jwt'
  }
}

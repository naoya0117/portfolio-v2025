import NextAuth from "@auth/nextjs"
import { CredentialsProvider } from "@auth/core/providers/credentials"
import bcrypt from "bcryptjs"

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
          return {
            id: "1",
            email: `${ADMIN_USERNAME}@admin.local`,
            name: "Admin",
            username: ADMIN_USERNAME
          }
        }

        return null
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = (user as any).username
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).username = token.username
      }
      return session
    },
  },
  secret: process.env.AUTH_SECRET || "your-secret-key",
})
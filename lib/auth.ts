import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session?.user && user) {
        (session.user as any).id = user.id
        
        // Get user's subscription info
        const subscription = await prisma.subscription.findUnique({
          where: { userId: user.id },
        })
        
        ;(session.user as any).plan = subscription?.plan || 'free'
        ;(session.user as any).subscriptionStatus = subscription?.status || 'inactive'
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // Auto-create email settings for new users
      if (user.email && account?.provider === 'google') {
        try {
          await prisma.emailSettings.upsert({
            where: { userId: user.id },
            create: {
              userId: user.id,
              fromName: user.name || 'Your Business',
              fromEmail: user.email,
              replyTo: user.email,
            },
            update: {},
          })
        } catch (error) {
          console.error('Error creating email settings:', error)
        }
      }
      return true
    },
  },
  session: {
    strategy: "database",
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
}

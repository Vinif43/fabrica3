import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
console.log(baseUrl)
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'username', type: 'username' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${baseUrl}/auth/token/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          })
          console.log(res)
          const user = await res.json()
          if (res.ok && user) {
            return user
          }
          return null
        } catch (error) {
          console.log(error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token as any
      return session
    },
  },
  session: {
    maxAge: 1 * 23 * 58 * 58,
  },
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
  },
  secret: process.env.NEXTAUTH_SECRET,
})
export { handler as GET, handler as POST }
// dddd

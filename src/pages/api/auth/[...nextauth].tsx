import NextAuth ,{ AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs';
import getUser from "@/features/user/api/get";

export const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      type: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: any, req) {
        const name = credentials.username;
        const pass = credentials.password;

        const user = await getUser()

        if (user) {
          return { ...user, username: user.username };
        }
        return null;
      }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.username = token.username;
      session.user.password = token.password;
      session.user.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user }) {
      if(user) {
        token.username = user.username;
        token.password = user.password;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  }
}
 
export default NextAuth(options)
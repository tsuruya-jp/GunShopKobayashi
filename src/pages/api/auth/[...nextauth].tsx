import NextAuth ,{ AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
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
        const name:string = credentials.username;
        const pass:string = credentials.password;

        const message = {
          name: name,
          pass: pass
        }

        const user = await getUser(message)

        if (user) {
          return  user;
        }
        return null;
      }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if(token) {
        session.user.username = token.username;
      }
      return Promise.resolve(session);
    },
    async jwt({ token, user }) {
      const isSignIn = user ? true : false;
      if(isSignIn) {
        token.username = user.username;
      }
      return Promise.resolve(token);
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/admin/login",
  }
}
 
export default NextAuth(options)
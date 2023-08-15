import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken?: string;
      username?: string;
      password?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username?: string;
    password?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    username?: string;
    password?: string;
  }
}

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.password) {
          return null;
        }
        
        const hash = process.env.ADMIN_PASSWORD_HASH;
        if (!hash) {
          console.error("ADMIN_PASSWORD_HASH environment variable is not set.");
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, hash);
        
        if (isValid) {
          return { id: "admin", name: "Admin" };
        }
        
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // Only one admin user
        (session.user as any).id = token.sub;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  }
};

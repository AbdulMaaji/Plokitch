import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./validations";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          // In a real app, you would check against a database here
          // For now, we'll return a mock user
          const { password } = validatedFields.data;
          
          if (password === "plokitch-agent-2026") {
            return {
              id: "admin-1",
              name: "System Admin",
              email: "admin@plokitch.com",
              role: "ADMIN",
            };
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});

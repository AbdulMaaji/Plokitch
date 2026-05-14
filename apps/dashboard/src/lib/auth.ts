import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./validations";
import { validateAdminPassword } from "./config/secrets";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { password } = validatedFields.data;
          
          // Environment-isolated operational session protection
          if (validateAdminPassword(password)) {
            return {
              id: "operational-admin",
              name: "Operational Console",
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
    signIn: "/admin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
});

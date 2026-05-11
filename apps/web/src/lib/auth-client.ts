import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { Auth } from "../../server/src/lib/auth";

// In development, the Fastify server runs on port 4000
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const authClient = createAuthClient({
  baseURL,
  plugins: [
    inferAdditionalFields<Auth>()
  ]
});

export const { signIn, signUp, signOut, useSession } = authClient;

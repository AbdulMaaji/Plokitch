import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

// In development, the Fastify server runs on port 4000
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const authClient = createAuthClient({
  baseURL,
  plugins: [
    inferAdditionalFields({
      user: {
        role: { type: "string", required: false },
        phone: { type: "string", required: false },
        isActive: { type: "boolean", required: false }
      }
    } as const)
  ]
});

export const { signIn, signUp, signOut, useSession } = authClient;

import type { FastifyInstance } from "fastify";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";

/**
 * Auth routes — Better Auth handler catch-all.
 * All /api/auth/* requests are forwarded to Better Auth.
 */
export async function authRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: ["GET", "POST"],
    url: "/api/auth/*",
    async handler(request, reply) {
      try {
        const url = new URL(
          request.url,
          `${request.protocol}://${request.hostname}`
        );

        const headers = fromNodeHeaders(request.headers);

        const req = new Request(url.toString(), {
          method: request.method,
          headers,
          ...(request.body
            ? { body: JSON.stringify(request.body) }
            : {}),
        });

        const response = await auth.handler(req);

        reply.status(response.status);
        response.headers.forEach((value: string, key: string) => {
          reply.header(key, value);
        });

        const body = await response.text();
        return reply.send(body || null);
      } catch (error) {
        fastify.log.error({ err: error }, "Auth handler error");
        return reply.status(500).send({
          success: false,
          error: "Internal authentication error",
          code: "AUTH_FAILURE",
        });
      }
    },
  });
}

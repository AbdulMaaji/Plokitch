import type { FastifyInstance } from "fastify";
import { db } from "../db/index.js";
import { order, vendor, riderProfile } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middleware/auth.middleware.js";

/**
 * Location routes — /api/location
 * Provides aggregated coordinate data for map views
 */
export async function locationRoutes(fastify: FastifyInstance) {
  // GET /api/location/order/:orderId
  // Returns all map coordinates for an order (kitchen, rider, destination)
  fastify.get(
    "/api/location/order/:orderId",
    { preHandler: [requireAuth] },
    async (request, reply) => {
      const { orderId } = request.params as { orderId: string };

      const orderData = await db.query.order.findFirst({
        where: eq(order.id, orderId),
        with: {
          vendor: true,
        },
      });

      if (!orderData) {
        return reply.status(404).send({
          success: false,
          error: "Order not found",
        });
      }

      // Get rider's current location if a rider is assigned
      let riderLocation: { lat: number; lng: number } | null = null;
      if (orderData.riderId) {
        const rider = await db.query.riderProfile.findFirst({
          where: eq(riderProfile.userId, orderData.riderId),
        });
        if (rider?.currentLocation) {
          riderLocation = rider.currentLocation;
        }
      }

      // Kitchen location from vendor
      const kitchenLocation = orderData.vendor?.location
        ? {
            lat: orderData.vendor.location.lat ?? null,
            lng: orderData.vendor.location.lng ?? null,
          }
        : null;

      // Delivery location from order
      const deliveryLocation =
        orderData.deliveryLat && orderData.deliveryLng
          ? {
              lat: parseFloat(orderData.deliveryLat),
              lng: parseFloat(orderData.deliveryLng),
            }
          : orderData.deliveryAddress?.lat && orderData.deliveryAddress?.lng
          ? {
              lat: orderData.deliveryAddress.lat,
              lng: orderData.deliveryAddress.lng,
            }
          : null;

      return reply.send({
        success: true,
        data: {
          orderId,
          status: orderData.status,
          kitchen: kitchenLocation,
          rider: riderLocation,
          delivery: deliveryLocation,
          riderId: orderData.riderId,
        },
      });
    }
  );

  // POST /api/location/rider/ping
  // Rider pings their current position (rate-limited DB write)
  fastify.post(
    "/api/location/rider/ping",
    { preHandler: [requireAuth] },
    async (request, reply) => {
      const session = (request as any).session;
      const body = request.body as {
        lat: number;
        lng: number;
      };

      if (!body.lat || !body.lng) {
        return reply.status(400).send({
          success: false,
          error: "lat and lng are required",
        });
      }

      const [updated] = await db
        .update(riderProfile)
        .set({
          currentLocation: { lat: body.lat, lng: body.lng },
          updatedAt: new Date(),
        })
        .where(eq(riderProfile.userId, session.user.id))
        .returning();

      if (!updated) {
        return reply.status(404).send({
          success: false,
          error: "Rider profile not found",
        });
      }

      return reply.send({ success: true, data: { lat: body.lat, lng: body.lng } });
    }
  );
}

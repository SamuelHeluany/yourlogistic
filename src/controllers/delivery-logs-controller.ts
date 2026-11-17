import { prisma } from "@/database/prisma.js";
import { deliveryLogsSchema } from "@/schema/delivery-logs.js";
import { AppError } from "@/utils/app-error.js";
import { Request, Response } from "express";

export class DeliveryLogsController {
  async create(request: Request, response: Response) {
    const { delivery_id, description } = deliveryLogsSchema.parse(request.body);

    const delivery = await prisma.delivery.findUnique({
      where: {
        id: delivery_id,
      },
    });
    // verifica se o pedido existe
    if (!delivery) {
      throw new AppError("Delivery not found.", 404);
    }
    // verifica se o pedido ja foi enviado
    if (delivery.status === "processing") {
      throw new AppError("Change delivery status to shipped.");
    }

    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description,
      },
    });

    return response.status(201).json();
  }
}

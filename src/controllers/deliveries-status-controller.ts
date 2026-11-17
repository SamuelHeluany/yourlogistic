import { prisma } from "@/database/prisma.js";
import { paramsSchema, statusSchema } from "@/schema/delivery-status.js";
import { Request, Response } from "express";

export class DeliveryStatusController {
  async update(request: Request, response: Response) {
    const { id } = paramsSchema.parse(request.params);
    const { status } = statusSchema.parse(request.body);

    await prisma.delivery.update({
      data: {
        status,
      },
      where: {
        id,
      },
    });
    // Quando mudar o status, registra no log ja a primeira movimentação da entrega
    await prisma.deliveryLog.create({
      data: {
        deliveryId: id,
        description: status,
      },
    });

    return response.json();
  }
}

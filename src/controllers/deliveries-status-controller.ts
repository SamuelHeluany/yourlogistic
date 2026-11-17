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

    return response.json();
  }
}

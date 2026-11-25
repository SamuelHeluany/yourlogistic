import { prisma } from "@/database/prisma.js";
import { deliveriesSchema } from "@/schema/deliveries.js";
import { AppError } from "@/utils/app-error.js";
import { Request, Response } from "express";

export class DeliveriesController {
  async execute(request: Request, response: Response) {
    const { user_id, description } = deliveriesSchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    const createdDelivery = await prisma.delivery.create({
      data: {
        userId: user_id,
        description,
      },
    });

    return response.status(201).json({ createdDelivery });
  }
}

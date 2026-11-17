import { prisma } from "@/database/prisma.js";
import { deliveriesSchema } from "@/schema/deliveries.js";
import { Request, Response } from "express";

export class DeliveriesController {
  async execute(request: Request, response: Response) {
    const { user_id, description } = deliveriesSchema.parse(request.body);

    await prisma.delivery.create({
      data: {
        userId: user_id,
        description,
      },
    });

    return response.status(201).json();
  }
}

import { Request, Response } from "express";
import { prisma } from "@/database/prisma.js";
// get dos deliveries incluindo nome e email

export class GetDeliveriesController {
  async execute(request: Request, response: Response) {
    const deliveries = await prisma.delivery.findMany({
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    return response.status(200).json(deliveries);
  }
}

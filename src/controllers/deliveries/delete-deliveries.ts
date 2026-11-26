import { prisma } from "@/database/prisma.js";
import { AppError } from "@/utils/app-error.js";
import { checkIfIdIsValid, invalidIdResponse } from "@/utils/validation.js";
import { Request, Response } from "express";

export class DeleteDeliveryController {
  async execute(request: Request, response: Response) {
    const deliveryId = request.params?.deliveryId;

    if (!checkIfIdIsValid(deliveryId)) {
      return invalidIdResponse();
    }

    const delivery = await prisma.delivery.findUnique({
      where: { id: deliveryId },
    });

    if (!delivery) {
      throw new AppError("Delivery not found.", 404);
    }

    const deletedDelivery = await prisma.delivery.delete({
      where: { id: deliveryId },
    });

    return response.status(200).json({ deletedDelivery });
  }
}

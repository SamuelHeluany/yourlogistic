import { prisma } from "@/database/prisma.js";
import { updateDeliverySchema } from "@/schema/deliveries/update-delivery.js";
import { AppError } from "@/utils/app-error.js";
import { checkIfIdIsValid, invalidIdResponse } from "@/utils/validation.js";
import { Request, Response } from "express";
import { ZodError } from "zod";

export class UpdateDeliveryController {
  async execute(request: Request, response: Response) {
    try {
      const deliveryId = request.params?.deliveryId;

      if (!checkIfIdIsValid(deliveryId)) {
        return invalidIdResponse();
      }

      const { description } = updateDeliverySchema.parse(request.body);

      const updatedDelivery = await prisma.delivery.update({
        where: {
          id: deliveryId,
        },
        data: {
          description,
        },
      });

      return response.status(200).json({ updatedDelivery });
    } catch (error) {
      console.error(error);
      if (error instanceof ZodError) {
        throw new AppError(error.issues.map((i) => i.message).join(", "), 400);
      }
      throw new AppError("Server error.", 500);
    }
  }
}

import { prisma } from "@/database/prisma.js";
import { AppError } from "@/utils/app-error.js";
import { checkIfIdIsValid, invalidIdResponse } from "@/utils/validation.js";
import { Request, Response } from "express";

export class DeleteUserController {
  async execute(request: Request, response: Response) {
    const userId = request.params?.userId;

    if (!checkIfIdIsValid(userId)) {
      return invalidIdResponse();
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    const { password, ...userWithoutPassword } = deletedUser;

    response.status(200).json({ userWithoutPassword });
  }
}

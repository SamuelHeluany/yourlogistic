import { prisma } from "@/database/prisma.js";
import { updateUserSchema } from "@/schema/users/update-user.js";
import { AppError } from "@/utils/app-error.js";
import { checkIfIdIsValid, invalidIdResponse } from "@/utils/validation.js";
import { hash } from "bcrypt";
import { Request, Response } from "express";
import { ZodError } from "zod";

type UpdateUserRouteParams = { userId: string };

export class UpdateUserController {
  async execute(request: Request<UpdateUserRouteParams>, response: Response) {
    try {
      const userId = request.params?.userId;

      if (!checkIfIdIsValid(userId)) {
        return invalidIdResponse();
      }

      const data = updateUserSchema.parse(request.body);

      if (data.email) {
        const userWithProvidedEmail = await prisma.user.findFirst({
          where: {
            email: data.email,
          },
        });

        if (userWithProvidedEmail) {
          throw new AppError("User email already exists, please provide a valid one.");
        }
      }
      const userUpdated = { ...data };

      if (data.password) {
        userUpdated.password = await hash(data.password, 8);
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: userUpdated,
      });

      const { password: _, ...userWithoutPassword } = updatedUser;

      return response.status(200).json({ userWithoutPassword });
    } catch (error) {
      console.error(error);
      if (error instanceof ZodError) {
        throw new AppError(error.issues.map((i) => i.message).join(", "), 400);
      }
      throw error;
    }
  }
}

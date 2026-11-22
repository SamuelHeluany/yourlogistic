import { prisma } from "@/database/prisma.js";
import { createUserSchema } from "@/schema/users.js";
import { AppError } from "@/utils/app-error.js";
import { hash } from "bcrypt";
import { Request, Response } from "express";

export class UsersController {
  async execute(request: Request, response: Response) {
    const { name, email, password } = createUserSchema.parse(request.body);

    const userWithProvidedEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userWithProvidedEmail) {
      throw new AppError("User email already exists, please provide a valid one.");
    }

    // passa a senha e o 8(quantas vezes repete o processo de hash)
    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // desestrutura do user e separa o password, passando um retorno sem o password para ficar mais seguro
    const { password: _, ...userWithoutPassword } = user;

    return response.status(201).json(userWithoutPassword);
  }
}

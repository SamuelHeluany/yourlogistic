import { authConfig } from "@/configs/auth.js";
import { prisma } from "@/database/prisma.js";
import { sessionUserSchema } from "@/schema/session.js";
import { AppError } from "@/utils/app-error.js";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export class SessionsController {
  async execute(request: Request, response: Response) {
    const { email, password } = sessionUserSchema.parse(request.body);

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Invalid email or password", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = jwt.sign({ role: user.role ?? "costumer" }, secret, {
      subject: user.id,
      expiresIn,
    });

    const { password: hashedPassword, ...userWithoutPassword } = user;

    return response.json({ token, user: userWithoutPassword });
  }
}

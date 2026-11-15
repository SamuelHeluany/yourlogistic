import { createUserSchema } from "@/schema/users.js";
import { hash } from "bcrypt";
import { Request, Response } from "express";

export class UsersController {
  async execute(request: Request, response: Response) {
    const body = request.body;

    const { name, email, password } = createUserSchema.parse(body);

    // passa a senha e o 8(quantas vezes repete o processo de hash)
    const hashedPassword = await hash(password, 8);

    const createdUser = {
      ...body,
      hashedPassword,
    };
    return response.json({ message: "ok", createdUser });
  }
}

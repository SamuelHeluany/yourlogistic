import { createUserSchema } from "@/schema/users.js";
import { Request, Response } from "express";

export class UsersController {
  execute(request: Request, response: Response) {
    const body = request.body;

    createUserSchema.parse(body);

    return response.json({ message: "ok" });
  }
}

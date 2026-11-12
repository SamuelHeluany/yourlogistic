import { Request, Response } from "express";

export class UsersController {
  execute(request: Request, response: Response) {
    return response.json({ message: "ok" });
  }
}

import { Request, Response } from "express";

export class DeliveriesController {
  execute(request: Request, response: Response) {
    return response.json({ message: "ok" });
  }
}

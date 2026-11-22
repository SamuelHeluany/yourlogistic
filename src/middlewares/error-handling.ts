import { AppError } from "@/utils/app-error.js";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandling(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  // verifica se tiver erro ele for instancia do AppError e retorna o status e mensagem
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }
  // verifica se o erro é uma instancia do zod e responde com statuscode e o erro do zod
  if (error instanceof ZodError) {
    return response.status(400).json({ message: "Validation error", issues: error.format() });
  }

  return response.status(500).json({ message: error.message });
}

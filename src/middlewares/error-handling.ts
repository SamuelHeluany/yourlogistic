import { AppError } from "@/utils/app-error.js";
import { Request, Response, NextFunction } from "express";

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

  return response.status(500).json({ message: error.message });
}

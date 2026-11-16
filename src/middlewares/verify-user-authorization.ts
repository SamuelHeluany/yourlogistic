import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/app-error.js";

export function verifyUserAuthorization(role: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    // verifica se nao existe o usuario, se true... error
    if (!request.user) {
      throw new AppError("Unauthorized", 401);
    }

    // verifica se a role do usuario nao existe dentre as roles, se true, error
    if (!role.includes(request.user.role)) {
      throw new AppError("Unauthorized", 401);
    }

    return next();
  };
}

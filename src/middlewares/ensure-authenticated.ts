import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "@/configs/auth.js";
import { AppError } from "@/utils/app-error.js";

interface TokenPayLoad {
  role: string;
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  try {
    // pega o token
    const authHeader = request.headers.authorization;

    // verifica se tem conteudo(token)
    if (!authHeader) {
      throw new AppError("JWT token not found", 401);
    }

    // retira o bearer do token.
    // como retira o bearer que ta na primeira posição, pega só o token que esta na segunda posição (ex: bearer f90sdf90ds8f09f8sdf089s8)
    const [, token] = authHeader.split(" ");

    // pega a role e o sub renomeia como user_id
    // verifica o token e o secret
    const { role, sub: user_id } = verify(token, authConfig.jwt.secret) as TokenPayLoad;

    // adiciona o user dentro da requisição
    // esta inserindo o usuario dentro da requisição mas precisa tipar o usuário, criando no types/express.d.ts
    request.user = {
      id: user_id,
      role,
    };

    return next;
  } catch (error) {
    throw new AppError("Invalid JWT token", 401);
  }
}

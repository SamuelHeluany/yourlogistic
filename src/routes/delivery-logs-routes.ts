import { DeliveryLogsController } from "@/controllers/delivery-logs-controller.js";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated.js";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization.js";
import { Router } from "express";

export const deliveryLogsRoutes = Router();
const deliveryLogsController = new DeliveryLogsController();

// aplica a autenticação e autorização direto na rota, sem deixar que seja aplicado a todas as rotas
deliveryLogsRoutes.post("/", ensureAuthenticated, verifyUserAuthorization(["sale"]), deliveryLogsController.create);

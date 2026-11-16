import { Router } from "express";
import { DeliveriesController } from "@/controllers/deliveries-controller.js";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated.js";

export const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();
// adiciona a todas as rotas de delivery o middleware de autenticação do usuário, ou seja, requer o JWT TOKEN
deliveriesRoutes.use(ensureAuthenticated);
deliveriesRoutes.post("/", deliveriesController.execute);

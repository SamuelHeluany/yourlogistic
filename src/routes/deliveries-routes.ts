import { Router } from "express";
import { DeliveriesController } from "@/controllers/deliveries-controller.js";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated.js";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization.js";

export const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();
// adiciona a todas as rotas de delivery o middleware de autenticação do usuário, ou seja, requer o JWT TOKEN
// adiciona tambem a autorização do usuario, se ele for usuario com a role sale(vendedor), ele vai poder executar a rota deliveries
deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]));
deliveriesRoutes.post("/", deliveriesController.execute);
deliveriesRoutes.get("/", deliveriesController.index);

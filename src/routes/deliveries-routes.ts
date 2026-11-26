import { Router } from "express";
import { DeliveriesController } from "@/controllers/deliveries/create-delivery-controller.js";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated.js";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization.js";
import { DeliveryStatusController } from "@/controllers/deliveries/update-delivery-status-controller.js";
import { GetDeliveriesController } from "@/controllers/deliveries/get-deliveries-controller.js";
import { UpdateDeliveryController } from "@/controllers/deliveries/update-delivery.js";

export const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();
const getDeliveriesController = new GetDeliveriesController();
const updateDeliveryController = new UpdateDeliveryController();
const deliveryStatusController = new DeliveryStatusController();
// adiciona a todas as rotas de delivery o middleware de autenticação do usuário, ou seja, requer o JWT TOKEN
// adiciona tambem a autorização do usuario, se ele for usuario com a role sale(vendedor), ele vai poder executar a rota deliveries
deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]));
deliveriesRoutes.post("/", deliveriesController.execute);
deliveriesRoutes.get("/", getDeliveriesController.execute);

// rota para dar update no status, passando o id do delivery como params
deliveriesRoutes.patch("/:deliveryId", ensureAuthenticated, updateDeliveryController.execute);
deliveriesRoutes.patch("/:id/status", ensureAuthenticated, deliveryStatusController.update);

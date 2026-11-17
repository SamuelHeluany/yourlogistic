import { Router } from "express";
import { usersRoutes } from "./users-route.js";
import { sessionRoutes } from "./sessions-routes.js";
import { deliveriesRoutes } from "./deliveries-routes.js";
import { deliveryLogsRoutes } from "./delivery-logs-routes.js";

export const routes = Router();
// define que para rota users, passa o usersRoutes
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionRoutes);
routes.use("/deliveries", deliveriesRoutes);
routes.use("/delivery-logs", deliveryLogsRoutes);

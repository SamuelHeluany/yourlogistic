import { Router } from "express";
import { sessionRoutes, usersRoutes } from "./users-route.js";

export const routes = Router();
// define que para rota users, passa o usersRoutes
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionRoutes);

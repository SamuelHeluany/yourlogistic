import { Router } from "express";
import { UsersController } from "@/controllers/users-controller.js";

// passa o router
export const usersRoutes = Router();
// passa o usersController
const usersController = new UsersController();
// da um post com o execute do usersController
usersRoutes.post("/", usersController.execute);

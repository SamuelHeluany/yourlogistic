import { Router } from "express";
import { CreateUserController } from "@/controllers/users/create-user-controller.js";
import { DeleteUserController } from "@/controllers/users/delete-user-controller.js";

// Create user
export const usersRoutes = Router();
// passa o CreateUserController
const createUserController = new CreateUserController();
// da um post com o execute do CreateUserController
usersRoutes.post("/", createUserController.execute);

// Delete user
const deleteUserController = new DeleteUserController();
usersRoutes.delete("/:userId", deleteUserController.execute);

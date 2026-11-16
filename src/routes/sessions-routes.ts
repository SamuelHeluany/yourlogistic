import { SessionsController } from "@/controllers/sessions-constroller.js";
import { Router } from "express";

export const sessionRoutes = Router();
const sessionsController = new SessionsController();
sessionRoutes.post("/", sessionsController.execute);

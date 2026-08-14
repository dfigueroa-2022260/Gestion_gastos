import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { perfil } from "./usuario.controller";

const router = Router();

router.get("/me", authMiddleware, perfil);

export default router;

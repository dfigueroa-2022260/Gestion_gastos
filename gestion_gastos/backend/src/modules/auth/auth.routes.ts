import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import { login, registro } from "./auth.controller";
import { loginSchema, registroSchema } from "./auth.schema";

const router = Router();

router.post("/registro", validate(registroSchema), registro);
router.post("/login", validate(loginSchema), login);

export default router;

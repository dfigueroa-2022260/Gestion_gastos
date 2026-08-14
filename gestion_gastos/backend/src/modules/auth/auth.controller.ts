import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { iniciarSesion, registrarUsuario } from "./auth.service";

export const registro = asyncHandler(async (req: Request, res: Response) => {
  const resultado = await registrarUsuario(req.body);
  res.status(201).json(resultado);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const resultado = await iniciarSesion(req.body);
  res.status(200).json(resultado);
});

import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { obtenerPerfil } from "./usuario.service";

export const perfil = asyncHandler(async (req: Request, res: Response) => {
  const usuario = await obtenerPerfil(req.usuarioId as string);
  res.status(200).json(usuario);
});

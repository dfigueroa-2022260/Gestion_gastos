import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtPayload {
  usuarioId: string;
}

export const generarToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
};

export const verificarToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
};

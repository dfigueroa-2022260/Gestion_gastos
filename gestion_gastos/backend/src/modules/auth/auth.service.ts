import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { generarToken } from "../../utils/jwt.util";
import { comparePassword, hashPassword } from "../../utils/password.util";
import { LoginInput, RegistroInput } from "./auth.schema";

export const registrarUsuario = async (data: RegistroInput) => {
  const existente = await prisma.usuario.findUnique({
    where: { email: data.email },
  });

  if (existente) {
    throw new AppError("Ya existe una cuenta con ese correo", 409);
  }

  const passwordHash = await hashPassword(data.password);

  const usuario = await prisma.usuario.create({
    data: {
      nombre: data.nombre,
      email: data.email,
      password: passwordHash,
    },
  });

  const token = generarToken({ usuarioId: usuario.id });

  return {
    token,
    usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
  };
};

export const iniciarSesion = async (data: LoginInput) => {
  const usuario = await prisma.usuario.findUnique({
    where: { email: data.email },
  });

  if (!usuario) {
    throw new AppError("Credenciales invalidas", 401);
  }

  const passwordValida = await comparePassword(data.password, usuario.password);

  if (!passwordValida) {
    throw new AppError("Credenciales invalidas", 401);
  }

  const token = generarToken({ usuarioId: usuario.id });

  return {
    token,
    usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
  };
};

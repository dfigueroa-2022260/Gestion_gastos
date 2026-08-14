# Cash Track — Backend

API REST para la app de gestion de gastos. Node.js + Express + TypeScript + Prisma + PostgreSQL.

## Arquitectura por modulos

```
src/
  config/        env y cliente de Prisma
  middlewares/   auth, validacion (zod) y manejo de errores
  utils/         jwt, hash de password, AppError, asyncHandler
  modules/
    auth/        registro y login
    usuarios/    perfil del usuario autenticado
    categorias/  CRUD de categorias de gasto
    gastos/      CRUD de gastos + resumen por categoria
  app.ts         configuracion de express
  server.ts      arranque del servidor
```

Cada modulo sigue el mismo patron: `*.routes.ts` -> `*.controller.ts` -> `*.service.ts` (y `*.schema.ts` cuando valida entrada).

## Poner en marcha

1. Instalar dependencias:
   ```
   pnpm install
   ```
2. Copiar `.env.example` a `.env` y ajustar `DATABASE_URL` con tu PostgreSQL local.
3. Generar el cliente y correr migraciones:
   ```
   pnpm prisma:generate
   pnpm prisma:migrate
   ```
4. Levantar el servidor en modo desarrollo:
   ```
   pnpm dev
   ```

La API queda en `http://localhost:4000/api`.

## Endpoints principales

- `POST /api/auth/registro` — crea usuario, devuelve token
- `POST /api/auth/login` — devuelve token
- `GET /api/usuarios/me` — perfil (requiere `Authorization: Bearer <token>`)
- `GET|POST /api/categorias`, `PUT|DELETE /api/categorias/:id`
- `GET|POST /api/gastos`, `PUT|DELETE /api/gastos/:id`
- `GET /api/gastos/resumen` — total gastado por categoria

## Nota Windows + pnpm

Si `pnpm install` falla al generar el cliente de Prisma por `strictDepBuilds`, corre:
```
pnpm approve-builds
```
y aprueba el postinstall de `@prisma/client` / `prisma`.

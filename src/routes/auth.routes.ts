import { Hono } from "hono";
import { HonoApp } from '../lib/utils/types';
import { AuthController } from "../core/auth/auth.controller";
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "../core/auth/auth.model";
import { createUserSchema } from "../core/user/user.model";

const authRouter: HonoApp = new Hono();
const authController = new AuthController();

authRouter
  .post("/login", zValidator("json", loginSchema), authController.login)
  .post("/register", zValidator("json", createUserSchema), authController.register)

export default authRouter;
  
import { Hono } from "hono";
import { UserController } from "../core/user/user.controller";
import { UserService } from "../core/user/user.service";
import { UserRepository } from "../core/user/user.repository";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema, updateUserSchema } from "../core/user/user.model";
import { authMiddleware } from "../lib/middlewares/auth";
import { AppVariables } from "../lib/utils/types";

const userRouter = new Hono<{ Variables: AppVariables }>();

const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);

userRouter.use("*", authMiddleware());

userRouter
  .get("/", controller.getAll)
  .get("/:id", controller.getOne)
  .get("/email/:email", controller.getByEmail)
  .post("/", zValidator("json", createUserSchema), controller.post)
  .patch("/:id", zValidator("json", updateUserSchema), controller.patch)
  .delete("/:id", controller.remove)
  .post("/delete", controller.removeMultiple);


export default userRouter;


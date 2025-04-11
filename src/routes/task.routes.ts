import { Hono } from "hono";
import { TaskController } from "../core/task/task.controller";
import { TaskService } from "../core/task/task.service";
import { TaskRepository } from "../core/task/task.repository";
import { zValidator } from "@hono/zod-validator";
import { createTaskSchema, updateTaskSchema } from "../core/task/task.model";
import { authMiddleware } from "../lib/middlewares/auth";
import { AppVariables } from "../lib/utils/types";

const taskRouter = new Hono<{ Variables: AppVariables }>();

const repository = new TaskRepository();
const service = new TaskService(repository);
const controller = new TaskController(service);

taskRouter.use("*", authMiddleware());

taskRouter
  .get("/", controller.getAll)
  .get("/:id", controller.getOne)
  .get("/project/:projectId", controller.getByProjectId)
  .get("/assignee/:userId", controller.getByAssigneeId)
  .get("/status/:statusId", controller.getByStatusId)
  .post("/", zValidator("json", createTaskSchema), controller.post)
  .patch("/:id", zValidator("json", updateTaskSchema), controller.patch)
  .delete("/:id", controller.remove)
  .post("/delete", controller.removeMultiple);

export default taskRouter; 
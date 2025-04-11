import { Hono } from "hono";
import { ProjectController } from "../core/project/project.controller";
import { ProjectService } from "../core/project/project.service";
import { ProjectRepository } from "../core/project/project.repository";
import { zValidator } from "@hono/zod-validator";
import { createProjectSchema, updateProjectSchema } from "../core/project/project.model";
import { authMiddleware } from "../lib/middlewares/auth";
import { AppVariables } from "../lib/utils/types";

const projectRouter = new Hono<{ Variables: AppVariables }>();

const repository = new ProjectRepository();
const service = new ProjectService(repository);
const controller = new ProjectController(service);

projectRouter.use("*", authMiddleware());

projectRouter
  .get("/", controller.getAll)
  .get("/:id", controller.getOne)
  .get("/name/:name", controller.getByName)
  .get("/company/:companyId", controller.getByCompanyId)
  .post("/", zValidator("json", createProjectSchema), controller.post)
  .patch("/:id", zValidator("json", updateProjectSchema), controller.patch)
  .delete("/:id", controller.remove)
  .post("/delete", controller.removeMultiple);

export default projectRouter; 
import { Hono } from "hono";
import { TeamController } from "../core/team/team.controller";
import { TeamService } from "../core/team/team.service";
import { TeamRepository } from "../core/team/team.repository";
import { zValidator } from "@hono/zod-validator";
import { createTeamSchema, updateTeamSchema } from "../core/team/team.model";
import { authMiddleware } from "../lib/middlewares/auth";
import { AppVariables } from "../lib/utils/types";

const teamRouter = new Hono<{ Variables: AppVariables }>();

const repository = new TeamRepository();
const service = new TeamService(repository);
const controller = new TeamController(service);

teamRouter.use("*", authMiddleware());

teamRouter
  .get("/", controller.getAll)
  .get("/:id", controller.getOne)
  .get("/name/:name", controller.getByName)
  .get("/company/:companyId", controller.getByCompanyId)
  .post("/", zValidator("json", createTeamSchema), controller.post)
  .patch("/:id", zValidator("json", updateTeamSchema), controller.patch)
  .delete("/:id", controller.remove)
  .post("/delete", controller.removeMultiple);

export default teamRouter; 
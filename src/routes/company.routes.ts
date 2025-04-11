import { Hono } from "hono";
import { CompanyController } from "../core/company/company.controller";
import { CompanyService } from "../core/company/company.service";
import { CompanyRepository } from "../core/company/company.repository";
import { zValidator } from "@hono/zod-validator";
import { createCompanySchema, updateCompanySchema } from "../core/company/company.model";
import { authMiddleware } from "../lib/middlewares/auth";
import { AppVariables } from "../lib/utils/types";

const companyRouter = new Hono<{ Variables: AppVariables }>();

const repository = new CompanyRepository();
const service = new CompanyService(repository);
const controller = new CompanyController(service);

companyRouter.use("*", authMiddleware());

companyRouter
  .get("/", controller.getAll)
  .get("/:id", controller.getOne)
  .get("/slug/:slug", controller.getBySlug)
  .post("/", zValidator("json", createCompanySchema), controller.post)
  .patch("/:id", zValidator("json", updateCompanySchema), controller.patch)
  .delete("/:id", controller.remove)
  .post("/delete", controller.removeMultiple);

export default companyRouter; 
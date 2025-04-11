import { InferSelectModel } from "drizzle-orm";
import { projectsTable } from "../../database/schemas/projects.schema";
import { z } from "zod";

export type Project = InferSelectModel<typeof projectsTable>;

export type CreateProjectDto = Project;

export type UpdateProjectDto = Omit<Partial<CreateProjectDto>, "id" | "slug">;

export type ReadProjectDto = Project;

export const createProjectSchema = z.object({
  name: z.string().min(2).max(255),
  slug: z.string().min(2).max(100),
  description: z.string().optional(),
  companyId: z.number(),
  active: z.boolean().optional(),
});

export const updateProjectSchema = z.object({
  name: z.string().min(2).max(255).optional(),
  description: z.string().optional(),
  active: z.boolean().optional(),
}); 
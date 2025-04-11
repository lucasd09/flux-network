import { InferSelectModel } from "drizzle-orm";
import { teamsTable } from "../../database/schemas/teams.schema";
import { z } from "zod";

export type Team = InferSelectModel<typeof teamsTable>;

export type CreateTeamDto = Team;

export type UpdateTeamDto = Omit<Partial<CreateTeamDto>, "id" | "slug">;

export type ReadTeamDto = Team;

export const createTeamSchema = z.object({
  name: z.string().min(2).max(255),
  slug: z.string().min(2).max(100),
  description: z.string().optional(),
  companyId: z.number(),
  active: z.boolean().optional(),
});

export const updateTeamSchema = z.object({
  name: z.string().min(2).max(255).optional(),
  description: z.string().optional(),
  active: z.boolean().optional(),
}); 
import { InferSelectModel } from "drizzle-orm";
import { companiesTable } from "../../database/schemas";
import { z } from "zod";

export type Company = InferSelectModel<typeof companiesTable>;

export type CreateCompanyDto = Company;

export type UpdateCompanyDto = Omit<Partial<CreateCompanyDto>, "id" | "slug">;

export type ReadCompanyDto = Company;

export const createCompanySchema = z.object({
  name: z.string().min(2).max(255),
  slug: z.string().min(2).max(100),
  logo: z.string().max(255).optional(),
  active: z.boolean().optional(),
});

export const updateCompanySchema = z.object({
  name: z.string().min(2).max(255).optional(),
  logo: z.string().max(255).optional(),
  active: z.boolean().optional(),
}); 
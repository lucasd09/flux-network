import { InferSelectModel } from "drizzle-orm";
import { usersTable } from "../../database/schemas";
import { z } from "zod";
export type User = InferSelectModel<typeof usersTable>;

export type CreateUserDto = User & {
  password: string;
};

export type UpdateUserDto = Omit<Partial<CreateUserDto>, "id" | "email">;

export type ReadUserDto = Omit<User, "passwordHash">;

export const createUserSchema = z.object({
  name: z.string().min(2).max(255).optional(),
  email: z.string().email(),
  password: z.string(),
  avatar: z.string().optional(),
  companyId: z.string(),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).max(255).optional(),
  password: z.string().optional(),
  avatar: z.string().optional(),
});

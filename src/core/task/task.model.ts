import { InferSelectModel } from "drizzle-orm";
import { tasksTable } from "../../database/schemas/tasks.schema";
import { z } from "zod";

export type Task = InferSelectModel<typeof tasksTable>;

export type CreateTaskDto = Task;

export type UpdateTaskDto = Omit<Partial<CreateTaskDto>, "id">;

export type ReadTaskDto = Task;

export const createTaskSchema = z.object({
  title: z.string().min(2).max(255),
  description: z.string().optional(),
  projectId: z.number(),
  assignedTo: z.number().optional(),
  status: z.string(),
  priority: z.string(),
  dueDate: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  estimatedHours: z.number().optional(),
  active: z.boolean().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(2).max(255).optional(),
  description: z.string().optional(),
  assignedTo: z.number().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  dueDate: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  estimatedHours: z.number().optional(),
  active: z.boolean().optional(),
}); 
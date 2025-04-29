import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { tasksTable } from "./tasks.schema";
import { createdAt, id, updatedAt } from "./utils";
import { usersTable } from "./users.schema";

export const timeEntriesTable = sqliteTable("time_entries", {
  id: id(),
  taskId: integer("task_id")
    .notNull()
    .references(() => tasksTable.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  description: text("description"),
  startTime: text("start_time").notNull(),
  endTime: text("end_time"),
  durationMinutes: integer("duration_minutes"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const timeEntriesRelations = relations(timeEntriesTable, ({ one }) => ({
  task: one(tasksTable, {
    fields: [timeEntriesTable.taskId],
    references: [tasksTable.id],
  }),
  user: one(usersTable, {
    fields: [timeEntriesTable.userId],
    references: [usersTable.id],
  }),
}));

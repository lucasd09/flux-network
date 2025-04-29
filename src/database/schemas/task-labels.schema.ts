import { relations } from "drizzle-orm";
import {
  sqliteTable,
  text,
  primaryKey,
  integer,
} from "drizzle-orm/sqlite-core";
import { tasksTable } from "./tasks.schema";
import { labelsTable } from "./labels.schema";

export const taskLabelsTable = sqliteTable(
  "task_labels",
  {
    taskId: integer("task_id")
      .notNull()
      .references(() => tasksTable.id, { onDelete: "cascade" }),
    labelId: integer("label_id")
      .notNull()
      .references(() => labelsTable.id, { onDelete: "cascade" }),
    createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
  },
  (table) => [primaryKey({ columns: [table.taskId, table.labelId] })],
);

export const taskLabelsRelations = relations(taskLabelsTable, ({ one }) => ({
  task: one(tasksTable, {
    fields: [taskLabelsTable.taskId],
    references: [tasksTable.id],
  }),
  label: one(labelsTable, {
    fields: [taskLabelsTable.labelId],
    references: [labelsTable.id],
  }),
}));

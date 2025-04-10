import { relations } from "drizzle-orm";
import { int, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core";
import { tasksTable } from "./tasks.schema";
import { labelsTable } from "./labels.schema";

export const taskLabelsTable = sqliteTable(
	"task_labels",
	{
		taskId: int("task_id")
			.notNull()
			.references(() => tasksTable.id, { onDelete: "cascade" }),
		labelId: int("label_id")
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

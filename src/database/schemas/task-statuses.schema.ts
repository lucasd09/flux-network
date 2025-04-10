import { relations } from "drizzle-orm";
import {
	sqliteTable,
	text,
	int,
	integer,
} from "drizzle-orm/sqlite-core";
import { tasksTable } from "./tasks.schema";
import { createdAt, id, updatedAt } from "./utils";
import { companiesTable } from "./companies.schema";

export const taskStatusesTable = sqliteTable("task_statuses", {
	id: id(),
	name: text("name", { length: 100 }).notNull(),
	description: text("description"),
	color: text("color", { length: 50 }),
	companyId: int("company_id")
		.notNull()
		.references(() => companiesTable.id, { onDelete: "cascade" }),
	orderIndex: integer("order_index").default(0),
	isDefault: integer("is_default", { mode: "boolean" }).default(false),
	updatedAt: createdAt(),
	createdAt: updatedAt(),
});

export const taskStatusesRelations = relations(
	taskStatusesTable,
	({ one, many }) => ({
		company: one(companiesTable, {
			fields: [taskStatusesTable.companyId],
			references: [companiesTable.id],
		}),
		tasks: many(tasksTable),
	}),
);

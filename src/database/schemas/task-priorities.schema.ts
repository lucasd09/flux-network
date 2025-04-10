import { relations } from "drizzle-orm";
import {
	sqliteTable,
	text,
	integer,
	int,
} from "drizzle-orm/sqlite-core";
import { tasksTable } from "./tasks.schema";
import { createdAt, id, updatedAt } from "./utils";
import { companiesTable } from "./companies.schema";

export const taskPrioritiesTable = sqliteTable("task_priorities", {
	id: id(),
	name: text("name", { length: 100 }).notNull(),
	description: text("description"),
	color: text("color", { length: 50 }),
	companyId: int("company_id")
		.notNull()
		.references(() => companiesTable.id, { onDelete: "cascade" }),
	level: integer("level").notNull(),
	isDefault: integer("is_default", { mode: "boolean" }).default(false),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
});

export const taskPrioritiesRelations = relations(
	taskPrioritiesTable,
	({ one, many }) => ({
		company: one(companiesTable, {
			fields: [taskPrioritiesTable.companyId],
			references: [companiesTable.id],
		}),
		tasks: many(tasksTable),
	}),
);

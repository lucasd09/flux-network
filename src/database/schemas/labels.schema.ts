import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { companiesTable } from "./companies.schema";
import { taskLabelsTable } from "./task-labels.schema";
import { createdAt, id, updatedAt } from "./utils";

export const labelsTable = sqliteTable("labels", {
	id: id(),
	name: text("name", { length: 100 }).notNull(),
	color: text("color", { length: 50 }),
	companyId: int("company_id")
		.notNull()
		.references(() => companiesTable.id, { onDelete: "cascade" }),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
});

export const labelsRelations = relations(labelsTable, ({ one, many }) => ({
	company: one(companiesTable, {
		fields: [labelsTable.companyId],
		references: [companiesTable.id],
	}),
	taskLabels: many(taskLabelsTable),
}));

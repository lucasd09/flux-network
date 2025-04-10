import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt, id, updatedAt } from "./utils";
import { relations } from "drizzle-orm";
import { rolePermissionsTable } from "./role-permissions.schema";

export const permissionsTable = sqliteTable("permissions", {
	id: id(),
	name: text("name", { length: 100 }).notNull().unique(),
	description: text("description"),
	module: text("module", { length: 100 }).notNull(),
	action: text("action", { length: 100 }).notNull(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
});

export const permissionsRelations = relations(permissionsTable, ({ many }) => ({
	rolePermissions: many(rolePermissionsTable),
}));
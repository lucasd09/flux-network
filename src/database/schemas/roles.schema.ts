import { sqliteTable, text, int, integer } from "drizzle-orm/sqlite-core";
import { createdAt, id, updatedAt } from "./utils";
import { relations } from "drizzle-orm";
import { companiesTable } from "./companies.schema";
import { rolePermissionsTable } from "./role-permissions.schema";
import { userRolesTable } from "./user-roles.schema";

export const rolesTable = sqliteTable("roles", {
	id: id(),
	name: text("name", { length: 100 }).notNull(),
	description: text("description"),
	companyId: int("company_id")
		.notNull()
		.references(() => companiesTable.id, { onDelete: "cascade" }),
	isSystem: integer("is_system", { mode: "boolean" }).default(false),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
});

export const rolesRelations = relations(rolesTable, ({ one, many }) => ({
	company: one(companiesTable, {
		fields: [rolesTable.companyId],
		references: [companiesTable.id],
	}),
	userRoles: many(userRolesTable),
	rolePermissions: many(rolePermissionsTable),
}));
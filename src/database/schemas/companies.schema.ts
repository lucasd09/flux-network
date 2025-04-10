import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { usersTable } from "./users.schema";
import { createdAt, id, updatedAt } from "./utils";
import { projectsTable } from "./projects.schema";
import { teamsTable } from "./teams.schema";
import { rolesTable } from "./roles.schema";

export const companiesTable = sqliteTable("companies", {
	id: id(),
	name: text("name", { length: 255 }).notNull(),
	slug: text("slug", { length: 100 }).notNull().unique(),
	logo: text("logo", { length: 255 }),
	active: integer("active", { mode: "boolean" }).default(true),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
});

export const companiesRelations = relations(companiesTable, ({ many }) => ({
	users: many(usersTable),
	teams: many(teamsTable),
	projects: many(projectsTable),
	roles: many(rolesTable),
}));
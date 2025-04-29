import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt, id, updatedAt } from "./utils";
import { relations } from "drizzle-orm";
import { teamProjectsTable } from "./team-projects.schema";
import { teamMembersTable } from "./team-members.schema";
import { companiesTable } from "./companies.schema";

export const teamsTable = sqliteTable("teams", {
  id: id(),
  name: text("name", { length: 255 }).notNull(),
  description: text("description"),
  companyId: integer("company_id")
    .notNull()
    .references(() => companiesTable.id, { onDelete: "cascade" }),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const teamsRelations = relations(teamsTable, ({ one, many }) => ({
  company: one(companiesTable, {
    fields: [teamsTable.companyId],
    references: [companiesTable.id],
  }),
  members: many(teamMembersTable),
  projects: many(teamProjectsTable),
}));

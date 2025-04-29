import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt, id, updatedAt } from "./utils";
import { relations } from "drizzle-orm";
import { teamProjectsTable } from "./team-projects.schema";
import { tasksTable } from "./tasks.schema";
import { companiesTable } from "./companies.schema";

export const projectsTable = sqliteTable("projects", {
  id: id(),
  name: text("name", { length: 255 }).notNull(),
  description: text("description"),
  companyId: integer("company_id")
    .notNull()
    .references(() => companiesTable.id, { onDelete: "cascade" }),
  startDate: text("start_date"),
  endDate: text("end_date"),
  status: text("status", { length: 50 }).default("active"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const projectsRelations = relations(projectsTable, ({ one, many }) => ({
  company: one(companiesTable, {
    fields: [projectsTable.companyId],
    references: [companiesTable.id],
  }),
  teamProjects: many(teamProjectsTable),
  tasks: many(tasksTable),
}));

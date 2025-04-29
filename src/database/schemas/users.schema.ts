import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id } from "./utils";
import { companiesTable } from "./companies.schema";
import { relations } from "drizzle-orm";
import { tasksTable } from "./tasks.schema";
import { rolesTable } from "./roles.schema";

export const usersTable = sqliteTable("users", {
  id: id(),
  email: text("email", { length: 255 }).notNull().unique(),
  name: text("name", { length: 255 }).notNull(),
  passwordHash: text("password_hash", { length: 255 }).notNull(),
  avatar: text("avatar", { length: 255 }),
  companyId: integer("company_id")
    .notNull()
    .references(() => companiesTable.id, { onDelete: "cascade" }),
});

export const usersRelations = relations(usersTable, ({ one, many }) => ({
  company: one(companiesTable, {
    fields: [usersTable.companyId],
    references: [companiesTable.id],
  }),
  tasks: many(tasksTable),
  role: many(rolesTable),
}));

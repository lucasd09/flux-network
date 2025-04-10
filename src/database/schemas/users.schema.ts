import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id } from "./utils";

export const usersTable = sqliteTable("users", {
  id: id(),
  email: text("email", { length: 255 }).notNull().unique(),
  name: text("name", { length: 255 }).notNull(),
  passwordHash: text("password_hash", { length: 255 }).notNull(),
  avatar: text("avatar", { length: 255 }),
});

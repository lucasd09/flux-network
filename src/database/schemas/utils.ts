import { integer, text } from "drizzle-orm/sqlite-core";

export const id = () => integer().primaryKey({ autoIncrement: true });

export const createdAt = () =>
  text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString());

export const updatedAt = () =>
  text("updated_at")
    .notNull()
    .$onUpdate(() => new Date().toISOString());

import { Next } from "hono";
import { createDatabase } from "../../database";
import { AppContext } from "../utils/types";

export const databaseMiddleware = async (c: AppContext, next: Next) => {
  const db = createDatabase(c.env.TURSO_DATABASE_URL, c.env.TURSO_AUTH_TOKEN);
  c.set("db", db);
  await next();
};
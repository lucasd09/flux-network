import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schemas";

export function createDatabase(dbUrl: string, authToken: string) {
  if (!dbUrl) {
    throw new Error("TURSO_DATABASE_URL is not set");
  }

  if (!authToken) {
    throw new Error("TURSO_AUTH_TOKEN is not set");
  }

  const client = createClient({
    url: dbUrl,
    authToken: authToken,
  });

  return drizzle({ client, schema });
}

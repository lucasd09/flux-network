import { AnySQLiteColumn, AnySQLiteTable } from "drizzle-orm/sqlite-core";
import { Context, Hono } from 'hono';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from '../../database/schemas';
import { JWTPayload } from "hono/utils/jwt/types";

export type BaseSQLiteTable = AnySQLiteTable & {
  id: AnySQLiteColumn<{ data: number }>;
};

export type BaseSchema = Record<string, unknown>;

export interface Env {
  TURSO_DATABASE_URL: string;
  TURSO_AUTH_TOKEN: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
}

export interface AppVariables {
  user: JWTPayload;
  db: LibSQLDatabase<typeof schema>;
}

export interface AppContext extends Context {
  Variables?: AppVariables;
  Bindings?: Env;
}

export type HonoApp = Hono<{ 
  Variables: AppVariables;
  Bindings: Env;
}>;

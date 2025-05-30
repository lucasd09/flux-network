import { relations } from "drizzle-orm";
import { sqliteTable, primaryKey, integer } from "drizzle-orm/sqlite-core";
import { permissionsTable } from "./permissions.schema";
import { createdAt } from "./utils";
import { rolesTable } from "./roles.schema";
export const rolePermissionsTable = sqliteTable(
  "role_permissions",
  {
    roleId: integer("role_id")
      .notNull()
      .references(() => rolesTable.id, { onDelete: "cascade" }),
    permissionId: integer("permission_id")
      .notNull()
      .references(() => permissionsTable.id, { onDelete: "cascade" }),
    createdAt: createdAt(),
  },
  (table) => [primaryKey({ columns: [table.roleId, table.permissionId] })],
);

export const rolePermissionsRelations = relations(
  rolePermissionsTable,
  ({ one }) => ({
    role: one(rolesTable, {
      fields: [rolePermissionsTable.roleId],
      references: [rolesTable.id],
    }),
    permission: one(permissionsTable, {
      fields: [rolePermissionsTable.permissionId],
      references: [permissionsTable.id],
    }),
  }),
);

import { int, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core";
import { createdAt } from "./utils";
import { relations } from "drizzle-orm";
import { teamsTable } from "./teams.schema";
import { usersTable } from "./users.schema";

export const teamMembersTable = sqliteTable(
	"team_members",
	{
		teamId: int("team_id")
			.notNull()
			.references(() => teamsTable.id, { onDelete: "cascade" }),
		userId: int("user_id")
			.notNull()
			.references(() => usersTable.id, { onDelete: "cascade" }),
		role: text("role", { length: 50 }).default("member"),
		joinedAt: createdAt(),
	},
	(table) => [primaryKey({ columns: [table.userId, table.teamId] })],
);

export const teamMembersRelations = relations(teamMembersTable, ({ one }) => ({
	team: one(teamsTable, {
		fields: [teamMembersTable.teamId],
		references: [teamsTable.id],
	}),
	user: one(usersTable, {
		fields: [teamMembersTable.userId],
		references: [usersTable.id],
	}),
}));

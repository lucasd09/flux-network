import {
	int,
	integer,
	sqliteTable,
	text
} from "drizzle-orm/sqlite-core";
import { createdAt, id, updatedAt } from "./utils";
import { projectsTable } from "./projects.schema";
import { relations } from "drizzle-orm";
import { taskStatusesTable } from "./task-statuses.schema";
import { taskPrioritiesTable } from "./task-priorities.schema";
import { commentsTable } from "./comments.schema";
import { taskLabelsTable } from "./task-labels.schema";
import { timeEntriesTable } from "./time-entries.schema";
import { usersTable } from "./users.schema";

export const tasksTable = sqliteTable("tasks", {
	id: id(),
	title: text("title", { length: 255 }).notNull(),
	description: text("description"),
	projectId: int("project_id")
		.notNull()
		.references(() => projectsTable.id, { onDelete: "cascade" }),
	statusId: int("status_id")
		.notNull()
		.references(() => taskStatusesTable.id),
	priorityId: int("priority_id").references(() => taskPrioritiesTable.id),
	assigneeId: int("assignee_id").references(() => usersTable.id),
	creatorId: int("creator_id")
		.notNull()
		.references(() => usersTable.id),
	dueDate: text("due_date"),
	estimatedHours: integer("estimated_hours"),
	completedAt: text("completed_at"),
	parentTaskId: int("parent_task_id").references((): any => tasksTable.id, {
		onDelete: "set null",
	}),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
});

export const tasksRelations = relations(tasksTable, ({ one, many }) => ({
	project: one(projectsTable, {
		fields: [tasksTable.projectId],
		references: [projectsTable.id],
	}),
	status: one(taskStatusesTable, {
		fields: [tasksTable.statusId],
		references: [taskStatusesTable.id],
	}),
	priority: one(taskPrioritiesTable, {
		fields: [tasksTable.priorityId],
		references: [taskPrioritiesTable.id],
	}),
	assignee: one(usersTable, {
		fields: [tasksTable.assigneeId],
		references: [usersTable.id],
		relationName: "assignee",
	}),
	creator: one(usersTable, {
		fields: [tasksTable.creatorId],
		references: [usersTable.id],
		relationName: "creator",
	}),
	parentTask: one(tasksTable, {
		fields: [tasksTable.parentTaskId],
		references: [tasksTable.id],
		relationName: "parentTask",
	}),
	subtasks: many(tasksTable, {
		relationName: "parentTask",
	}),
	comments: many(commentsTable),
	taskLabels: many(taskLabelsTable),
	timeEntries: many(timeEntriesTable),
}));

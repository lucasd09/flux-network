import { BaseRepository } from "../../lib/base/base.repository";
import { tasksTable } from "../../database/schemas/tasks.schema";
import { CreateTaskDto, ReadTaskDto, UpdateTaskDto, Task } from "./task.model";
import { AppContext } from "../../lib/utils/types";

export class TaskRepository extends BaseRepository<
  typeof tasksTable,
  Task,
  CreateTaskDto,
  UpdateTaskDto,
  ReadTaskDto
> {
  constructor() {
    super(tasksTable);
  }

  async findByProjectId(c: AppContext, projectId: number) {
    const data = await this.findByColumn(c, "projectId", projectId);
    return data;
  }

  async findByAssigneeId(c: AppContext, userId: number) {
    const data = await this.findByColumn(c, "assigneeId", userId);
    return data;
  }

  async findByStatusId(c: AppContext, statusId: number) {
    const data = await this.findByColumn(c, "statusId", statusId);
    return data;
  }
} 
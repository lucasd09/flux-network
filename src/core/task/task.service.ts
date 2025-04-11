import { BaseService } from "../../lib/base/base.service";
import { NotFoundError } from "../../lib/utils/errors";
import { Task, CreateTaskDto, UpdateTaskDto, ReadTaskDto } from "./task.model";
import { TaskRepository } from "./task.repository";
import { AppContext } from "../../lib/utils/types";

export class TaskService extends BaseService<
  Task,
  CreateTaskDto,
  UpdateTaskDto,
  ReadTaskDto
> {
  constructor(protected readonly repository: TaskRepository) {
    super(repository);
  }

  async findByProjectId(c: AppContext, projectId: number) {
    const data = await this.repository.findByProjectId(c, projectId);
    return data;
  }

  async findByAssigneeId(c: AppContext, userId: number) {
    const data = await this.repository.findByAssigneeId(c, userId);
    return data;
  }

  async findByStatusId(c: AppContext, statusId: number) {
    const data = await this.repository.findByStatusId(c, statusId);
    return data;
  }
} 
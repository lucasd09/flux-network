import { BaseController } from "../../lib/base/base.controller";
import { Task, CreateTaskDto, UpdateTaskDto, ReadTaskDto } from "./task.model";
import { TaskService } from "./task.service";
import { AppContext } from "../../lib/utils/types";

export class TaskController extends BaseController<
  Task,
  CreateTaskDto,
  UpdateTaskDto,
  ReadTaskDto
> {
  constructor(protected readonly service: TaskService) {
    super(service);
  }

  getByProjectId = async (c: AppContext) => {
    try {
      const projectId = Number(c.req.param("projectId"));
      const data = await this.service.findByProjectId(c, projectId);
      return c.json({ success: true, data });
    } catch (error: any) {
      return c.json(
        { success: false, message: error.message },
        error.status || 500,
      );
    }
  }

  getByAssigneeId = async (c: AppContext) => {
    try {
      const userId = Number(c.req.param("userId"));
      const data = await this.service.findByAssigneeId(c, userId);
      return c.json({ success: true, data });
    } catch (error: any) {
      return c.json(
        { success: false, message: error.message },
        error.status || 500,
      );
    }
  }

  getByStatusId = async (c: AppContext) => {
    try {
      const statusId = Number(c.req.param("statusId"));
      const data = await this.service.findByStatusId(c, statusId);
      return c.json({ success: true, data });
    } catch (error: any) {
      return c.json(
        { success: false, message: error.message },
        error.status || 500,
      );
    }
  }
} 
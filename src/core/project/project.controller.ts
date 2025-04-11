import { BaseController } from "../../lib/base/base.controller";
import { Project, CreateProjectDto, UpdateProjectDto, ReadProjectDto } from "./project.model";
import { ProjectService } from "./project.service";
import { AppContext } from "../../lib/utils/types";

export class ProjectController extends BaseController<
  Project,
  CreateProjectDto,
  UpdateProjectDto,
  ReadProjectDto
> {
  constructor(protected readonly service: ProjectService) {
    super(service);
  }

  getByName = async (c: AppContext) => {
    try {
      const name = c.req.param("name");
      const data = await this.service.findByName(c, name);
      return c.json({ success: true, data });
    } catch (error: any) {
      return c.json(
        { success: false, message: error.message },
        error.status || 500,
      );
    }
  }

  getByCompanyId = async (c: AppContext) => {
    try {
      const companyId = Number(c.req.param("companyId"));
      const data = await this.service.findByCompanyId(c, companyId);
      return c.json({ success: true, data });
    } catch (error: any) {
      return c.json(
        { success: false, message: error.message },
        error.status || 500,
      );
    }
  }
} 
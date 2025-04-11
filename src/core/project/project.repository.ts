import { BaseRepository } from "../../lib/base/base.repository";
import { projectsTable } from "../../database/schemas/projects.schema";
import { CreateProjectDto, ReadProjectDto, UpdateProjectDto, Project } from "./project.model";
import { AppContext } from "../../lib/utils/types";

export class ProjectRepository extends BaseRepository<
  typeof projectsTable,
  Project,
  CreateProjectDto,
  UpdateProjectDto,
  ReadProjectDto
> {
  constructor() {
    super(projectsTable);
  }

  async findByName(c: AppContext, name: string) {
    const [data] = await this.findByColumn(c, "name", name);
    return data;
  }

  async findByCompanyId(c: AppContext, companyId: number) {
    const data = await this.findByColumn(c, "companyId", companyId);
    return data;
  }
} 
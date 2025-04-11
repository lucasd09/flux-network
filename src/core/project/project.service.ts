import { BaseService } from "../../lib/base/base.service";
import { NotFoundError } from "../../lib/utils/errors";
import { Project, CreateProjectDto, UpdateProjectDto, ReadProjectDto } from "./project.model";
import { ProjectRepository } from "./project.repository";
import { AppContext } from "../../lib/utils/types";

export class ProjectService extends BaseService<
  Project,
  CreateProjectDto,
  UpdateProjectDto,
  ReadProjectDto
> {
  constructor(protected readonly repository: ProjectRepository) {
    super(repository);
  }

  async findByName(c: AppContext, name: string) {
    const data = await this.repository.findByName(c, name);

    if (!data) {
      throw new NotFoundError("Project not found");
    }

    return data;
  }

  async findByCompanyId(c: AppContext, companyId: number) {
    const data = await this.repository.findByCompanyId(c, companyId);
    return data;
  }
} 
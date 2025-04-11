import { BaseService } from "../../lib/base/base.service";
import { NotFoundError } from "../../lib/utils/errors";
import { Team, CreateTeamDto, UpdateTeamDto, ReadTeamDto } from "./team.model";
import { TeamRepository } from "./team.repository";
import { AppContext } from "../../lib/utils/types";

export class TeamService extends BaseService<
  Team,
  CreateTeamDto,
  UpdateTeamDto,
  ReadTeamDto
> {
  constructor(protected readonly repository: TeamRepository) {
    super(repository);
  }

  async findByName(c: AppContext, name: string) {
    const data = await this.repository.findByName(c, name);

    if (!data) {
      throw new NotFoundError("Team not found");
    }

    return data;
  }

  async findByCompanyId(c: AppContext, companyId: number) {
    const data = await this.repository.findByCompanyId(c, companyId);
    return data;
  }
} 
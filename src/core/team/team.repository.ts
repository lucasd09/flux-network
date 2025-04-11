import { BaseRepository } from "../../lib/base/base.repository";
import { teamsTable } from "../../database/schemas/teams.schema";
import { CreateTeamDto, ReadTeamDto, UpdateTeamDto, Team } from "./team.model";
import { AppContext } from "../../lib/utils/types";

export class TeamRepository extends BaseRepository<
  typeof teamsTable,
  Team,
  CreateTeamDto,
  UpdateTeamDto,
  ReadTeamDto
> {
  constructor() {
    super(teamsTable);
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
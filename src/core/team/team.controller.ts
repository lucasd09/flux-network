import { BaseController } from "../../lib/base/base.controller";
import { Team, CreateTeamDto, UpdateTeamDto, ReadTeamDto } from "./team.model";
import { TeamService } from "./team.service";
import { AppContext } from "../../lib/utils/types";

export class TeamController extends BaseController<
  Team,
  CreateTeamDto,
  UpdateTeamDto,
  ReadTeamDto
> {
  constructor(protected readonly service: TeamService) {
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
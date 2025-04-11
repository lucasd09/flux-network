import { BaseController } from "../../lib/base/base.controller";
import { Company, CreateCompanyDto, UpdateCompanyDto, ReadCompanyDto } from "./company.model";
import { CompanyService } from "./company.service";
import { AppContext } from "../../lib/utils/types";

export class CompanyController extends BaseController<
  Company,
  CreateCompanyDto,
  UpdateCompanyDto,
  ReadCompanyDto
> {
  constructor(protected readonly service: CompanyService) {
    super(service);
  }

  getBySlug = async (c: AppContext) => {
    try {
      const slug = c.req.param("slug");
      const data = await this.service.findBySlug(c, slug);
      return c.json({ success: true, data });
    } catch (error: any) {
      return c.json(
        { success: false, message: error.message },
        error.status || 500,
      );
    }
  }
} 
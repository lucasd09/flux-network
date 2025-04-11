import { BaseService } from "../../lib/base/base.service";
import { NotFoundError } from "../../lib/utils/errors";
import { Company, CreateCompanyDto, UpdateCompanyDto, ReadCompanyDto } from "./company.model";
import { CompanyRepository } from "./company.repository";
import { AppContext } from "../../lib/utils/types";

export class CompanyService extends BaseService<
  Company,
  CreateCompanyDto,
  UpdateCompanyDto,
  ReadCompanyDto
> {
  constructor(protected readonly repository: CompanyRepository) {
    super(repository);
  }

  async findBySlug(c: AppContext, slug: string) {
    const data = await this.repository.findBySlug(c, slug);

    if (!data) {
      throw new NotFoundError("Company not found");
    }

    return data;
  }
} 
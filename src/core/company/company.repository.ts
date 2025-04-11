import { BaseRepository } from "../../lib/base/base.repository";
import { companiesTable } from "../../database/schemas/companies.schema";
import { CreateCompanyDto, ReadCompanyDto, UpdateCompanyDto, Company } from "./company.model";
import { AppContext } from "../../lib/utils/types";

export class CompanyRepository extends BaseRepository<
  typeof companiesTable,
  Company,
  CreateCompanyDto,
  UpdateCompanyDto,
  ReadCompanyDto
> {
  constructor() {
    super(companiesTable);
  }

  async findBySlug(c: AppContext, slug: string) {
    const [data] = await this.findByColumn(c, "slug", slug);
    return data;
  }
} 
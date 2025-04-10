import { BaseSQLiteTable } from "../utils/types";
import { BaseRepository } from "./base.repository";
import { AppContext } from "../utils/types";

export class BaseService<
  TEntity,
  CreateDto extends {},
  UpdateDto extends Partial<CreateDto>,
  ReadDto,
> {
  constructor(
    protected readonly repository: BaseRepository<
      BaseSQLiteTable,
      TEntity,
      CreateDto,
      UpdateDto,
      ReadDto
    >,
  ) {}

  create = (c: AppContext, data: CreateDto): Promise<TEntity> => {
    return this.repository.create(c, data);
  }

  createMultiple = (c: AppContext, data: CreateDto[]): Promise<{ id: number | null }[]> => {
    return this.repository.createMultiple(c, data);
  }

  findAll = (c: AppContext): Promise<ReadDto[]> => {
    return this.repository.findAll(c);
  }

  findOne = (c: AppContext, id: number): Promise<ReadDto | null> => {
    return this.repository.findOne(c, id);
  }

  update = (c: AppContext, id: number, data: UpdateDto): Promise<TEntity> => {
    return this.repository.update(c, id, data);
  }

  remove = (c: AppContext, id: number): Promise<void> => {
    return this.repository.remove(c, id);
  }

  removeMultiple = (c: AppContext, ids: number[]): Promise<void> => {
    return this.repository.removeMultiple(c, ids);
  }
}

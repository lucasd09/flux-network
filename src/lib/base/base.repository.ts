import {
  eq,
  getTableColumns,
  inArray,
  InferInsertModel,
  InferSelectModel,
} from "drizzle-orm";
import { BaseSQLiteTable } from "../utils/types";
import { AppContext } from "../utils/types";

export class BaseRepository<
  TTable extends BaseSQLiteTable,
  TEntity = InferSelectModel<TTable>,
  CreateDto extends InferInsertModel<TTable> = InferInsertModel<TTable>,
  UpdateDto extends Partial<CreateDto> = Partial<CreateDto>,
  ReadDto = InferSelectModel<TTable>,
> {
  constructor(protected readonly table: TTable) {}

  async create(c: AppContext, data: CreateDto) {
    const db = c.get("db");
    const [created] = await db.insert(this.table).values(data).returning();

    return created as TEntity;
  }

  async createMultiple(c: AppContext, data: CreateDto[]) {
    const db = c.get("db");
    const created = await db
      .insert(this.table)
      .values(data)
      .returning({ id: this.table.id });

    return created;
  }

  async findAll(c: AppContext): Promise<ReadDto[]> {
    const db = c.get("db");
    const results = await db.select().from(this.table);

    return results as ReadDto[];
  }

  async findOne(c: AppContext, id: number): Promise<ReadDto | null> {
    const db = c.get("db");
    const [result] = await db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id))
      .limit(1);

    return (result as ReadDto) || null;
  }

  async findByColumn<TColumn extends keyof TEntity>(
    c: AppContext,
    column: TColumn,
    value: TEntity[TColumn],
  ): Promise<TEntity[]> {
    const db = c.get("db");
    const columns = getTableColumns(this.table);

    const data = await db
      .select()
      .from(this.table)
      .where(eq(columns[column as string], value));

    return data as TEntity[];
  }

  async update(c: AppContext, id: number, data: UpdateDto) {
    const db = c.get("db");
    const updated = await db
      .update(this.table)
      .set(data)
      .where(eq(this.table.id, id))
      .returning();

    return updated as TEntity;
  }

  async remove(c: AppContext, id: number): Promise<void> {
    const db = c.get("db");
    await db.delete(this.table).where(eq(this.table.id, id));
  }

  async removeMultiple(c: AppContext, ids: number[]) {
    const db = c.get("db");
    await db.delete(this.table).where(inArray(this.table.id, ids));
  }
}

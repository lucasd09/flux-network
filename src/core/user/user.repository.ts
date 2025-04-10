import { BaseRepository } from "../../lib/base/base.repository";
import { usersTable } from "../../database/schemas";
import { CreateUserDto, ReadUserDto, UpdateUserDto, User } from "./user.model";
import { AppContext } from "../../lib/utils/types";
import { hashPassword } from "../../lib/utils/password";

export class UserRepository extends BaseRepository<
  typeof usersTable,
  User,
  CreateUserDto,
  UpdateUserDto,
  ReadUserDto
> {
  constructor() {
    super(usersTable);
  }

  async create(c: AppContext, data: CreateUserDto): Promise<User> {
    const passwordHash = await hashPassword(data.password);
    
    const db = c.get("db");

    const [result] = await db
      .insert(usersTable)
      .values({ ...data, passwordHash })
      .returning({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
      });

    return result as User;
  }
}

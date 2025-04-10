import { BaseService } from "../../lib/base/base.service";
import { NotFoundError } from "../../lib/utils/errors";
import { User, CreateUserDto, UpdateUserDto, ReadUserDto } from "./user.model";
import { UserRepository } from "./user.repository";
import { AppContext } from "../../lib/utils/types";
export class UserService extends BaseService<
  User,
  CreateUserDto,
  UpdateUserDto,
  ReadUserDto
> {
  constructor(protected readonly repository: UserRepository) {
    super(repository);
  }

  async findByEmail(c: AppContext, email: string) {
    const [data] = await this.repository.findByColumn(c, "email", email);

    if (!data) {
      return;
    }

    return data;
  }
}

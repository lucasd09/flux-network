import { BaseController } from "../../lib/base/base.controller";
import { User, CreateUserDto, UpdateUserDto, ReadUserDto } from "./user.model";
import { UserService } from "./user.service";
import { AppContext } from "../../lib/utils/types";

export class UserController extends BaseController<
  User,
  CreateUserDto,
  UpdateUserDto,
  ReadUserDto
> {
  constructor(protected readonly service: UserService) {
    super(service);
  }

  getByEmail = async (c: AppContext) => {
    try {
      const email = c.req.param("email");

      const data = await this.service.findByEmail(c, email);
      
      if (!data) {
        return c.json({ success: false, message: "User not found" }, 404);
      }

      const { passwordHash, ...userData } = data;
      
      return c.json({ success: true, data: userData });
    } catch (error: any) {
      return c.json(
        { success: false, message: error.message },
        error.status || 500,
      );
    }
  }
}

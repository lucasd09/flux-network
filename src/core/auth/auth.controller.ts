import { AuthService } from "./auth.service";
import { AppContext } from "../../lib/utils/types";

export class AuthController {
  protected readonly service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  login = async (c: AppContext) => {
    const { email, password } = await c.req.json();
    const { payload, accessToken } = await this.service.login(c, email, password);

    return c.json({ payload, accessToken });
  }
  
  register = async (c: AppContext) => {
    const data = await c.req.json();
    const user = await this.service.register(c, data);
    
    return c.json(user);
  }
}

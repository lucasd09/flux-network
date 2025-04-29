import { HTTPException } from "hono/http-exception";
import { AppContext } from "../../lib/utils/types";
import { UserService } from "../user/user.service";
import { UserRepository } from "../user/user.repository";
import { JWTPayload } from "hono/utils/jwt/types";
import { sign, verify } from "hono/jwt";
import { CreateUserDto } from "../user/user.model";
import { verifyPassword } from "../../lib/utils/password";

export class AuthService {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService(new UserRepository());
  }

  generateTokens(c: AppContext, payload: JWTPayload): Promise<string> {
    const secret = c.env.JWT_SECRET;
    const expiresInSeconds = Number(c.env.JWT_EXPIRES_IN) || 3600;

    payload.exp = Math.floor(Date.now() / 1000) + expiresInSeconds;

    const accessToken = sign(payload, secret, "HS256");
    return accessToken;
  }

  async verifyToken(token: string, c: AppContext): Promise<JWTPayload> {
    try {
      return await verify(token, c.env.JWT_SECRET, "HS256");
    } catch (_error) {
      throw new HTTPException(401, { message: "Invalid or expired token" });
    }
  }

  async authenticate(token: string, c: AppContext): Promise<boolean> {
    const payload = await this.verifyToken(token, c);

    return !!payload;
  }

  async login(c: AppContext, email: string, password: string) {
    const user = await this.userService.findByEmail(c, email);
    if (!user) {
      throw new HTTPException(401, { message: "Invalid credentials" });
    }

    const isPasswordValid = await verifyPassword(user.passwordHash, password);
    if (!isPasswordValid) {
      throw new HTTPException(401, { message: "Invalid credentials" });
    }

    const payload = {
      companyId: user.companyId,
      userId: user.id,
      email: user.email,
    };
    const accessToken = await this.generateTokens(c, payload);

    return { payload, accessToken };
  }

  async register(c: AppContext, data: CreateUserDto) {
    const userFound = await this.userService.findByEmail(c, data.email);
    if (userFound) {
      throw new HTTPException(400, { message: "User already exists" });
    }

    const user = await this.userService.create(c, data);

    const payload = {
      companyId: user.companyId,
      userId: user.id,
      email: user.email,
    };
    const accessToken = await this.generateTokens(c, payload);

    return { payload, accessToken };
  }
}

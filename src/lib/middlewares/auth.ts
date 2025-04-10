import { MiddlewareHandler } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { AuthService } from "../../core/auth/auth.service";

export const authMiddleware = (): MiddlewareHandler => {
  const authService = new AuthService();

  return bearerAuth({ 
    verifyToken: (token, c) => authService.authenticate(token, c)
  });
};
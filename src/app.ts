import { Hono } from "hono";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import { HonoApp } from "./lib/utils/types";
import { databaseMiddleware } from "./lib/middlewares/database";

const app: HonoApp = new Hono();

app.use("*", databaseMiddleware);

app.route("/users", userRouter);
app.route("/auth", authRouter);

export default app;

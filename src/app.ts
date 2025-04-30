import { Hono } from "hono";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import companyRouter from "./routes/company.routes";
import projectRouter from "./routes/project.routes";
import teamRouter from "./routes/team.routes";
import taskRouter from "./routes/task.routes";
import { HonoApp } from "./lib/utils/types";
import { databaseMiddleware } from "./lib/middlewares/database";
import { cors } from "hono/cors";

const app: HonoApp = new Hono();

app.use("*", databaseMiddleware);
app.use("*", cors());

app.route("/users", userRouter);
app.route("/auth", authRouter);
app.route("/companies", companyRouter);
app.route("/projects", projectRouter);
app.route("/teams", teamRouter);
app.route("/tasks", taskRouter);

export default app;

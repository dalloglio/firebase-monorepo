import express from "express";
import { UserRouter } from "./infra/router";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello World!");
});

UserRouter.route(app);

export default app;

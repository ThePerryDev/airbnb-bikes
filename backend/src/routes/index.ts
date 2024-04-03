import { Router, Request, Response } from "express";
import user from "./user";

const routes = Router();

routes.use("/user", user);

//aceita qualquer método HTTP ou URL
routes.use((_: Request, res: Response) =>
  res.json({ error: "Requisição desconhecida" })
);

export default routes;

import { Router } from "express";

const homeRouter = Router();

homeRouter.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

export default homeRouter;

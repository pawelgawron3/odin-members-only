import { Router } from "express";
import requireAuth from "../utils/requireAuth.js";
import messagesController from "../controllers/messagesController.js";

const messagesRouter = Router();

messagesRouter.get("/new", requireAuth, messagesController.getNewMessageForm);
messagesRouter.post("/new", (req, res) => {
  res.send("Good");
});

export default messagesRouter;

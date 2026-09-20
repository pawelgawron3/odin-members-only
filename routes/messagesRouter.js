import { Router } from "express";
import { requireAuth, requireAdminAuth } from "../utils/requireAuth.js";
import messagesController from "../controllers/messagesController.js";

const messagesRouter = Router();

messagesRouter.get("/new", requireAuth, messagesController.getNewMessageForm);
messagesRouter.post("/new", requireAuth, messagesController.createNewMessage);

messagesRouter.post(
  "/delete/:id",
  requireAuth,
  requireAdminAuth,
  messagesController.deleteMessage,
);

export default messagesRouter;

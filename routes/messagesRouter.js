import { Router } from "express";
import messagesController from "../controllers/messagesController.js";

const messagesRouter = Router();

messagesRouter.get("/new", messagesController.getNewMessageForm);

export default messagesRouter;

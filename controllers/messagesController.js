import { db } from "../db/queries.js";

const messagesController = {
  getNewMessageForm(req, res) {
    res.render("new-message");
  },
};

export default messagesController;

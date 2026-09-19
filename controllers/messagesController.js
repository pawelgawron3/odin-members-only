import { db } from "../db/queries.js";

const messagesController = {
  getNewMessageForm(req, res) {
    res.render("new-message");
  },

  async createNewMessage(req, res) {
    try {
      const userId = req.user.id;
      const message = req.body;

      await db.addMessage(userId, message);

      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },
};

export default messagesController;

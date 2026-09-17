import { db } from "../db/queries.js";

const homeController = {
  async getHomepage(req, res) {
    const messages = await db.getMessages();

    res.render("home", { messages });
  },
};

export default homeController;

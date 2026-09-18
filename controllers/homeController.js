import { db } from "../db/queries.js";
import formatDate from "../utils/formatDate.js";

const homeController = {
  async getHomepage(req, res) {
    const messages = await db.getMessages();

    res.render("home", { messages, formatDate });
  },
};

export default homeController;

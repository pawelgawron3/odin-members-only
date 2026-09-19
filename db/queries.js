import pool from "./pool.js";

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
}

async function registerNewAccount(user) {
  const SQL = `
    INSERT INTO users (firstname, lastname, username, password)
    VALUES ($1, $2, $3, $4)
  `;

  await pool.query(SQL, [
    user.firstname,
    user.lastname,
    user.username,
    user.hashedPassword,
  ]);
}

async function getMessages() {
  const SQL = `
    SELECT u.username, m.title, m.text, m.created_at 
    FROM messages AS m JOIN users AS u ON m.user_id = u.id
  `;

  const { rows } = await pool.query(SQL);
  return rows;
}

async function addMessage(userId, message) {
  const SQL = `
    INSERT INTO messages (title, text, user_id)
    VALUES ($1, $2, $3)
  `;

  await pool.query(SQL, [message.title, message.text, userId]);
}

async function updateMembershipStatus(userId) {
  const SQL = `
    UPDATE users
    SET membership_status = true
    WHERE id = $1
  `;

  await pool.query(SQL, [userId]);
}

export const db = {
  getUserById,
  getUserByUsername,
  registerNewAccount,
  getMessages,
  addMessage,
  updateMembershipStatus,
};

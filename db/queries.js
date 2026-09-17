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

export const db = {
  getUserById,
  getUserByUsername,
  registerNewAccount,
};

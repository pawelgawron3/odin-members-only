import pool from "./pool.js";

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

export const db = {
  getUserById,
};

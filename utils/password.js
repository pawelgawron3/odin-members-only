import bcrypt from "bcryptjs";

export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

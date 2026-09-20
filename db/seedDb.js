import "dotenv/config";
import { Client } from "pg";
import { hashPassword } from "../utils/password.js";

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  const { rows } = await client.query("SELECT COUNT(*) FROM users");
  if (Number(rows[0].count) > 0) {
    console.log("Database already seeded.");
    await client.end();
    return;
  }

  const adminPassword = await hashPassword(process.env.ADMIN_PASSWORD);
  const gregPassword = await hashPassword(process.env.USER_GREG_PASSWORD);
  const natePassword = await hashPassword(process.env.USER_NATE_PASSWORD);
  const fernandoPassword = await hashPassword(
    process.env.USER_FERNANDO_PASSWORD,
  );

  const SQL = `
    INSERT INTO users (firstname, lastname, username, password, membership_status, is_admin)
    VALUES 
        ('Thomas', 'Meknes', 'admin', '${adminPassword}', true, true),
        ('Gregory', 'Novak', 'realGreg', '${gregPassword}', false, false),
        ('Nate', 'Rabatt', 'goldfish', '${natePassword}', false, false),
        ('Fernando', 'Sucre', '3.5Nando', '${fernandoPassword}', true, false);

    INSERT INTO messages (title, text, user_id, created_at)
    VALUES
        ('Welcome everybody!', 'This is the very first message, hope y''all doing just fine.', 1, NOW() - INTERVAL '4 days'),
        ('Welcome', 'Just wanted to say hi', 2, NOW() - INTERVAL '3 days'),
        ('Does anyone else feel like they''re being watched?', 'I don''t know if I''m imagining things, but someone has been following the same routine as me for the past few days. Maybe it''s nothing. Still, if anyone else has noticed something similar, I''d like to hear about it.', 2, NOW() - INTERVAL '2 days'),
        ('Re: Does anyone else feel like they''re being watched?', 'You''re not the only one. I''ve noticed the same thing lately. Probably just coincidence, but I wouldn''t ignore your instincts.', 3, NOW() - INTERVAL '1 day'),
        ('Hotel in Panama', 'Have you ever been at the Fin Del Camino hotel in Panama City? #justwondering', 4, NOW());
`;

  console.log("seeding...");

  await client.query(SQL);
  await client.end();

  console.log("seeding done!");
}

main();

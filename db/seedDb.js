import "dotenv/config";
import { Client } from "pg";

const SQL = `
    INSERT INTO users (firstname, lastname, username, password, membership_status, is_admin)
    VALUES 
        ('Thomas', 'Meknes', 'admin', 'Qwerty9876543210', true, true),
        ('Gregory', 'Novak', 'realGreg', 'grenoVak11$', false, false),
        ('Nate', 'Rabatt', 'goldfish', 'PasswOrdOrNot9', false, false),
        ('Fernando', 'Sucre', '3.5Nando', 'itsNando35', true, false);

    INSERT INTO messages (title, text, user_id)
    VALUES
        ('Welcome everybody!', 'This is the very first message, hope y''all doing just fine.', 1),
        ('Welcome', 'Just wanted to say hi', 2),
        ('Does anyone else feel like they''re being watched?', 'I don''t know if I''m imagining things, but someone has been following the same routine as me for the past few days. Maybe it''s nothing. Still, if anyone else has noticed something similar, I''d like to hear about it.', 2),
        ('Re: Does anyone else feel like they''re being watched?', 'You''re not the only one. I''ve noticed the same thing lately. Probably just coincidence, but I wouldn''t ignore your instincts.', 3),
        ('Hotel in Panama', 'Have you ever been at the Fin Del Camino hotel in Panama City? #justwondering', 4);

`;

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

  console.log("seeding...");

  await client.query(SQL);
  await client.end();

  console.log("seeding done!");
}

main();

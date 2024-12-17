import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { clubs, categorys, receptions, venues,  users, tournaments } from '../lib/placeholder-data';

const client = await db.connect();

async function seedClubs() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS clubs (
      id SERIAL NOT NULL,
      club_name VARCHAR(255) NOT NULL,
      club_email VARCHAR(64) NOT NULL UNIQUE,
      club_address VARCHAR(128) NOT NULL,
      club_phonenumber VARCHAR(32) NOT NULL,
      club_faxnumber VARCHAR(32) NOT NULL,
      PRIMARY KEY (id)
    );
  `;

  const insertedClubs = await Promise.all(
    clubs.map(
      (club) => client.sql`
        INSERT INTO clubs (club_name, club_email, club_address, club_phonenumber, club_faxnumber)
        VALUES (${club.club_name}, ${club.club_email},${club.club_address},${club.club_phonenumber},${club.club_faxnumber} )
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedClubs;
}


async function seedCategorys() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS categorys (
      id SERIAL NOT NULL,
      category_name VARCHAR(255) NOT NULL,
      PRIMARY KEY (id)
    );
  `;

  const insertedCategorys = await Promise.all(
    categorys.map(
      (category) => client.sql`
        INSERT INTO categorys (category_name)
        VALUES (${category.category_name} )
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCategorys;
}

async function seedVenues() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS venues (
      id SERIAL NOT NULL,
      venue_name VARCHAR(255) NOT NULL,
      venue_postmail VARCHAR(32) NOT NULL,
      venue_address VARCHAR(255) NOT NULL,
      venue_phonenumber VARCHAR(32) NOT NULL,
      venue_faxnumber VARCHAR(32) NOT NULL,
      PRIMARY KEY (id)
    );
  `;

  const insertedVenues = await Promise.all(
    venues.map(
      (venue) => client.sql`
        INSERT INTO venues (venue_name, venue_postmail, venue_address, venue_phonenumber, venue_faxnumber)
        VALUES (${venue.venue_name}, ${venue.venue_postmail}, ${venue.venue_address}, ${venue.venue_phonenumber}, ${venue.venue_faxnumber} )
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedVenues;
}

async function seedReceptions() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS receptions (
       id SERIAL NOT NULL,
       name VARCHAR(128) NOT NULL,
       age  VARCHAR(64),
       email VARCHAR(128) NOT NULL,
       club_id integer NOT NULL,
       category_id integer NOT NULL,
       user_id TEXT NOT NULL,
       date DATE NOT NULL,
       PRIMARY KEY (id)
     );
  `;

  const insertedReceptions = await Promise.all(
    receptions.map(
      (reception) => client.sql`
        INSERT INTO receptions (name, age, email, club_id, category_id, user_id, date)
        VALUES (${reception.name},${reception.age},${reception.email},${reception.club_id},${reception.category_id},${reception.user_id},${reception.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );
  return insertedReceptions;
}

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL NOT NULL,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      PRIMARY KEY (id)
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (name, email, password)
        VALUES (${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}


async function seedTournaments() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS tournaments (
      id SERIAL NOT NULL,
      tournament_name VARCHAR(255) NOT NULL,
      venue_id integer NOT NULL,
      club_id integer NOT NULL,
      date DATE NOT NULL,
      PRIMARY KEY (id)
    );
  `;

  const insertedTournaments = await Promise.all(
    tournaments.map(
      (tournament) => client.sql`
        INSERT INTO tournaments (tournament_name, venue_id, club_id, date)
        VALUES (${tournament.tournament_name}, ${tournament.venue_id},${tournament.club_id},${tournament.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedTournaments;
}

export async function GET() {
  // return Response.json({
  //  message:
  //    'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
   try {
    await client.sql`BEGIN`;
//    await seedUsers();
//    await seedClubs();
//    await seedCategorys();
//    await seedReceptions();
      await seedTournaments();
//    await seedVenues();

     await client.sql`COMMIT`;

     return Response.json({ message: 'Database seeded successfully' });
   } catch (error) {
     await client.sql`ROLLBACK`;
     return Response.json({ error }, { status: 500 });
   }
}

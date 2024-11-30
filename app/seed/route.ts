import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { clubs, categorys, receptions, users } from '../lib/placeholder-data';

const client = await db.connect();

async function seedReceptions() {
   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

   await client.sql`
     CREATE TABLE IF NOT EXISTS receptions (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        age  VARCHAR(64),
        email VARCHAR(128) NOT NULL,
        club_id UUID NOT NULL,
        category_id UUID NOT NULL,
        date DATE NOT NULL
      );
   `;

   const insertedReceptions = await Promise.all(
     receptions.map(
       (reception) => client.sql`
         INSERT INTO receptions (name, age, email, club_id, category_id, date)
         VALUES (${reception.name},${reception.age},${reception.email},${reception.club_id},${reception.category_id},${reception.date})
         ON CONFLICT (id) DO NOTHING;
       `,
     ),
   );
   return insertedReceptions;
 }

 async function seedClubs() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS clubs (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      club_name VARCHAR(255) NOT NULL,
      club_email VARCHAR(64) NOT NULL UNIQUE,
      club_address VARCHAR(128) NOT NULL
    );
  `;

  const insertedClubs = await Promise.all(
    clubs.map(
      (club) => client.sql`
        INSERT INTO clubs (id, club_name, club_email, club_address)
        VALUES (${club.id}, ${club.club_name}, ${club.club_email},${club.club_address} )
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
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      category_name VARCHAR(255) NOT NULL
    );
  `;

  const insertedCategorys = await Promise.all(
    categorys.map(
      (category) => client.sql`
        INSERT INTO categorys (id, category_name)
        VALUES (${category.id}, ${category.category_name} )
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
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      venue_name VARCHAR(255) NOT NULL
    );
  `;

  const insertedVenues = await Promise.all(
    venues.map(
      (venue) => client.sql`
        INSERT INTO venues (id, venue_name)
        VALUES (${venue.id}, ${venue.venue_name} )
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedVenues;
}

/*
async function seedReceptions() {
   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

   await client.sql`
     CREATE TABLE IF NOT EXISTS receptions (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       club_id UUID NOT NULL,
       name VARCHAR(255) NOT NULL,
       age VARCHAR(255) NOT NULL,
       date DATE NOT NULL
     );
   `;

   const insertedReceptions = await Promise.all(
     receptions.map(
       (reception) => client.sql`
         INSERT INTO receptions (club_id, name, age, date)
         VALUES (${reception.club_id}, ${reception.name}, ${reception.age}, ${reception.date})
         ON CONFLICT (id) DO NOTHING;
       `,
     ),
   );

   return insertedReceptions;
}
*/

export async function GET() {
  // return Response.json({
  //  message:
  //    'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
   try {
     await client.sql`BEGIN`;
//     await seedClubs();
     await seedCategorys();
//     await seedReceptions();
     await client.sql`COMMIT`;

     return Response.json({ message: 'Database seeded successfully' });
   } catch (error) {
     await client.sql`ROLLBACK`;
     return Response.json({ error }, { status: 500 });
   }
}

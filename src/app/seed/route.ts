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

// async function seedClubs() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS clubs (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       password TEXT NOT NULL
//     );
//   `;

//   const insertedClubs = await Promise.all(
//     clubs.map(
//       (club) => client.sql`
//         INSERT INTO clubs (id, name, email, password)
//         VALUES (${club.id}, ${club.name}, ${club.email},${club.password} )
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedClubs;
// }

/*
async function seedCategorys() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS categorys (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;

  const insertedCategorys = await Promise.all(
    categorys.map(
      (category) => client.sql`
        INSERT INTO categorys (id, name)
        VALUES (${category.id}, ${category.name} )
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCategorys;
}
*/
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
// async function seedClubs() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS clubs (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL,
//       image_url VARCHAR(255) NOT NULL
//     );
//   `;

//   const insertedClubs = await Promise.all(
//     clubs.map(
//       (club) => client.sql`
//         INSERT INTO clubs (id, name, email, image_url)
//         VALUES (${club.id}, ${club.name}, ${club.email}, ${club.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedClubs;
// }

async function seedUsers() {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

export async function GET() {
  // return Response.json({
  //  message:
  //    'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
   try {
     await client.sql`BEGIN`;
  //   await seedClubs();
  //   await seedCategorys();
  //   await seedReceptions();
       await seedUsers();

     await client.sql`COMMIT`;

     return Response.json({ message: 'Database seeded successfully' });
   } catch (error) {
     await client.sql`ROLLBACK`;
     return Response.json({ error }, { status: 500 });
   }
}

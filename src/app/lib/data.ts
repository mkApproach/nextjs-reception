import { sql } from '@vercel/postgres';
import {
  ClubField,
  ClubsTableType,
  TournamentsTableType,
  CategoryField,
  ReceptionForm,
  ReceptionsTable,
  LatestReceptionRaw,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchLatestReceptions() {
  noStore();
  try {
    const data = await sql<LatestReceptionRaw>`
      SELECT receptions.name,receptions.age, clubs.club_name, categorys.category_name, receptions.id
      FROM receptions
      JOIN clubs ON receptions.club_id = clubs.id
      JOIN categorys ON receptions.category_id = categorys.id
      ORDER BY receptions.date DESC
      LIMIT 5`;

    const latestReceptions = data.rows.map((reception) => ({
      ...reception,
      name: formatCurrency(reception.name),
    }));
    return latestReceptions;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest receptions.');
  }
}


const ITEMS_PER_PAGE = 6;
export async function fetchFilteredReceptions(
  query: string,
  currentPage: number,
  user_id: string,
  tourn_id: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const receptions = await sql<ReceptionsTable>`
      SELECT
        receptions.id,
        receptions.name,
        receptions.age,
        receptions.email,
        receptions.user_id,
        receptions.date,
        clubs.club_name,
        categorys.category_name
      FROM receptions
      JOIN clubs ON receptions.club_id = clubs.id
      JOIN categorys ON receptions.category_id = categorys.id
      WHERE

        receptions.user_id = ${ user_id } AND
        receptions.tourn_id = ${ tourn_id }   
        AND
         (
        clubs.club_name ILIKE ${`%${query}%`} OR
        categorys.category_name ILIKE ${`%${query}%`} OR
        receptions.name::text ILIKE ${`%${query}%`} OR
        receptions.date::text ILIKE ${`%${query}%`} OR
        receptions.age ILIKE ${`%${query}%`}
        )      
      ORDER BY receptions.date DESC, receptions.id DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return receptions.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch receptions.');
  }
}

export async function fetchReceptionsPages(query: string, user_id: string, tourn_id: number) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM receptions
    JOIN clubs ON receptions.club_id = clubs.id
    JOIN categorys ON receptions.category_id = categorys.id
    WHERE
        receptions.user_id = ${ user_id } AND
        receptions.tourn_id = ${ tourn_id }
        AND 
         (
        clubs.club_name ILIKE ${`%${query}%`} OR
        categorys.category_name ILIKE ${`%${query}%`} OR
        receptions.name::text ILIKE ${`%${query}%`} OR
        receptions.date::text ILIKE ${`%${query}%`} OR
        receptions.age ILIKE ${`%${query}%`}
        ) 
    

  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of receptions.');
  }
}

export async function fetchReceptionById(id: number) {
  noStore();
  try {
    const data = await sql<ReceptionForm>`
      SELECT
        receptions.id,
        receptions.club_id,
        receptions.category_id,
        receptions.name,
        receptions.age,
        receptions.email,
        receptions.user_id,
        receptions.tourn_id       
      FROM receptions
      WHERE receptions.id = ${id};
    `;

    const reception = data.rows.map((reception) => ({
      ...reception,
      // Convert name from cents to dollars
      name: reception.name,
    }));

    return reception[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch reception.');
  }
}

export async function fetchClubs() {
  noStore();
  try {
    const data = await sql<ClubField>`
      SELECT
        id,
        club_name
      FROM clubs
      ORDER BY id ASC
    `;

    const clubs = data.rows;
    return clubs;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all clubs.');
  }
}

export async function fetchCategorys() {
  noStore();
  try {
    const data = await sql<CategoryField>`
      SELECT
        id,
        category_name
      FROM categorys
      ORDER BY id ASC
    `;

    const categorys = data.rows;
    return categorys;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all categorys.');
  }
}


export async function fetchFilteredClubs(query: string) {
  noStore();
  try {
    const data = await sql<ClubsTableType>`
		SELECT
		  id,
		  club_name,
		  club_email,
      club_address,
      club_phonenumber,
      club_faxnumber
		FROM clubs
		WHERE
		  club_name ILIKE ${`%${query}%`} OR
      club_email ILIKE ${`%${query}%`}
		GROUP BY id, club_name, club_email, club_address
		ORDER BY id ASC
	  `;

    const clubs = data.rows.map((club) => ({
      ...club,
    }));

    return clubs;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch club table.');
  }
}

export async function fetchFilteredTournaments(query: string) {
  noStore();
  try {
    const data = await sql<TournamentsTableType>`
		SELECT
		  tournaments.id,
		  tournaments.tournament_name,
      tournaments.date,
      clubs.club_name,
      venues.venue_name
		FROM tournaments
      JOIN clubs ON tournaments.club_id = clubs.id
      JOIN venues ON tournaments.venue_id = venues.id
		WHERE
		  tournaments.tournament_name ILIKE ${`%${query}%`} OR 
      clubs.club_name ILIKE ${`%${query}%`} OR
      venues.venue_name ILIKE ${`%${query}%`} OR
      tournaments.date::text ILIKE ${`%${query}%`}

		ORDER BY tournaments.id ASC
	  `;

    const tournaments = data.rows.map((tournament) => ({
      ...tournament,
    }));

    return tournaments;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch tournament table.');
  }
}

export async function fetchTournamentById(id: number) {
  noStore();
  try {
    const data = await sql<TournamentsTableType>`
      SELECT
      tournaments.id,
      tournaments.tournament_name
      FROM tournaments
      WHERE tournaments.id = ${id};
    `;

    const tournament = data.rows.map((tournament) => ({
      ...tournament,
      // Convert name from cents to dollars
      name: tournament.tournament_name,
    }));

    return tournament[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tournament.');
  }
}
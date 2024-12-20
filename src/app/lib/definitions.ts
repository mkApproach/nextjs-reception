// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Venue = { // 会場
  id: number;
  venue_name: string;
  venue_postmail: string;
  venue_address: string;
  venue_phonenumber: string;
  venue_faxnumber: string;
};


export type Tournament = { // 大会
  id: number;
  tournament_name: string;
  venue_id: number;
  club_id: number;
  date: string;
};

export type TournamentsTableType = {
  id: number;
  tournament_name: string;
  date: string;
  club_name: string;
  venue_name: string;
};

export type FormattedTournamentsTable = {
  id: number;
  tournament_name: string;
  date: string;
  club_name: string;
  venue_name: string;

};

export type Club = {  // クラブ・個人
  id: number;
  club_name: string;
  club_email: string;
  club_address: string;
  club_phonenumber: string;
  club_faxnumber: string;
};

export type Category = {  // 種目
  id: number;
  category_name: string;
};


export type Reception = {
  id: number;
  name: string;
  age: string;
  email: string;
  club_id: number;
  category_id: number;
  tourn_id: number;
  user_id: string;
  date: string;
};



export type LatestReception = {
  id: number;
  name: string;
  age: string;
  email: string;
  club_id: number;
  category_id: number;
  tourn_id: number;
  user_id: string;
  date: string;
};

// The database returns a number for name, but we later format it to a string with the formatCurrency function
export type LatestReceptionRaw = Omit<LatestReception, 'name'> & {
  name: number;
};

export type ReceptionsTable = {
  id: number;
  name: string;
  age: string;
  email: string;
  date: string;
  club_name: string;
  category_name: string;
  tourn_id: number;
};


export type ClubsTableType = {
  id: number;
  club_name: string;
  club_email: string;
  club_address: string;
  club_phonenumber: string;
  club_faxnumber: string;
};

export type FormattedClubsTable = {
  id: number;
  club_name: string;
  club_email: string;
  club_address: string;
  club_phonenumber: string;
  club_faxnumber: string;
};

export type ClubField = {
  id: number;
  club_name: string;
};

export type CategoryField = {
  id: number;
  category_name: string;
};



export type ReceptionForm = {
  id: number;
  name: string;
  age: string;
  email: string;
  club_id: number;
  category_id: number;
  tourn_id: number;
  user_id: number
  date: string;
};

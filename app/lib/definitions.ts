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
  id: string;
  venue_name: string;
  venue_postmail: string;
  venue_address: string;
  venue_phonenumber: string;
};


export type Tournament = { // 大会
  id: string;
  name: string;
};

export type Club = {  // クラブ・個人
  id: string;
  club_name: string;
  club_email: string;
  club_address: string;
};

export type Category = {  // 種目
  id: string;
  category_name: string;
};


export type Reception = {
  id: string;
  name: string;
  age: string;
  email: string;
  club_id: string;
  category_id: string;
  date: string;
};



export type LatestReception = {
  id: string;
  name: string;
  age: string;
  email: string;
  club_id: string;
  category_id: string;
  date: string;
};

// The database returns a number for name, but we later format it to a string with the formatCurrency function
export type LatestReceptionRaw = Omit<LatestReception, 'name'> & {
  name: number;
};

export type ReceptionsTable = {
  id: string;
  name: string;
  age: string;
  email: string;
  date: string;
  club_name: string;
  category_name: string;
};


export type ClubsTableType = {
  id: string;
  club_name: string;
  club_email: string;
  club_address: string;
};

export type FormattedClubsTable = {
  id: string;
  club_name: string;
  club_email: string;
  club_address: string;
};

export type ClubField = {
  id: string;
  club_name: string;
  club_email: string;
  club_address: string;
};

export type CategoryField = {
  id: string;
  category_name: string;
};



export type ReceptionForm = {
  id: string;
  name: string;
  age: string;
  email: string;
  club_id: string;
  category_id: string;
  date: string;
};

// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const clubs = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    club_name: '日高町卓球クラブ',
    club_email: 'evil@rabbit.com',
    club_address: '豊岡市日高町十戸',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    club_name: '豊岡市卓球クラブ',
    club_email: 'delba@oliveira.com',
    club_address: '豊岡市',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    club_name: '出石町卓球クラブ',
    club_email: 'lee@robinson.com',
    club_address: '豊岡市出石町',
  },
];

const categorys = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    category_name: '一般男子',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    category_name: '一般女子',
  },
];

const receptions = [
  {
    name: '西田　清',
    age: '66',
    email: 'lee@robinson.com',
    club_id: clubs[0].id,
    category_id: categorys[0].id,
    date: '2024-11-25',
  },
  {
    name: '中嶋　美行',
    age: '66', 
    email: 'lee@robinson.com',
    club_id: clubs[0].id,
    category_id: categorys[0].id,
    date: '2024-11-25',
  },
  {
    name: '井本　千陽',
    age: '大学一年生', 
    email: 'lee@robinson.com',
    club_id: clubs[0].id,
    category_id: categorys[1].id,
    date: '2024-11-25',
  },
  {
    name: '西田　清',
    age: '66',
    email: 'lee@robinson.com',
    club_id: clubs[0].id,
    category_id: categorys[0].id,
    date: '2024-11-25',
  },
  {
    name: '中嶋　美行',
    age: '66', 
    email: 'lee@robinson.com',
    club_id: clubs[0].id,
    category_id: categorys[0].id,
    date: '2024-11-25',
  },
  {
    name: '井本　千陽',
    age: '大学一年生', 
    email: 'lee@robinson.com',
    club_id: clubs[0].id,
    category_id: categorys[1].id,
    date: '2024-11-25',
  },
];





export { users, clubs, categorys, receptions };

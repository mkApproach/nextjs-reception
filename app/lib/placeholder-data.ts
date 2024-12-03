// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    name: '木内　盛雄',
    email: 'kinai-ap@cameo.plalaor.jp',
    password: 'Approach3533',
  },
  {
    name: '石川　恵美',
    email: 'emi-ap@cameo.plalaor.jp',
    password: 'Approach3533',
  },
];

const clubs = [
  {
    club_name: '日高町卓球クラブ',
    club_email: 'evil@rabbit.com',
    club_address: '豊岡市日高町十戸',
    club_phonenumber: '0796-24-1810',
    club_faxnumber: '0796-24-1812',
  },
  {
    club_name: '豊岡市卓球クラブ',
    club_email: 'delba@oliveira.com',
    club_address: '豊岡市',
    club_phonenumber: '0796-24-1810',
    club_faxnumber: '0796-24-1812',
  },
  {
    club_name: '出石町卓球クラブ',
    club_email: 'lee@robinson.com',
    club_address: '豊岡市出石町',
    club_phonenumber: '0796-24-1810',
    club_faxnumber: '0796-24-1812',
  },
];

const venues = [
  {
    venue_name: '豊岡市立総合体育館',
    venue_postmail: 'evil@rabbit.com',
    venue_address: '豊岡市大磯町1番75号',
    venue_phonenumber: '0796-24-1810',
    venue_faxnumber: '0796-24-1812',

  },
  {
    venue_name: '日高文化体育館',
    venue_postmail: 'hidaka@oliveira.com',
    venue_address: '豊岡市日高町祢布９５４−６',
    venue_phonenumber: '0796-42-2505',
    venue_faxnumber: '0796-42-2505',
  },
  {
    venue_name: 'ロードスカイ卓球場',
    venue_postmail: 'lee@robinson.com',
    venue_address: '豊岡市日高町山本１０１',
    venue_phonenumber: '0796-42-5581',
    venue_faxnumber: '0796-42-5581',
  },
];

const categorys = [
  {
    category_name: '一般男子',
  },
  {
    category_name: '一般女子',
  },
];

const receptions = [
  {
    name: '西田　清',
    age: '66',
    email: 'lee@robinson.com',
    club_id: 1,
    category_id: 1,
    date: '2024-11-25',
  },
  {
    name: '中嶋　美行',
    age: '66', 
    email: 'lee@robinson.com',
    club_id: 1,
    category_id: 1,
    date: '2024-11-25',
  },
  {
    name: '井本　千陽',
    age: '大学一年生', 
    email: 'lee@robinson.com',
    club_id: 1,
    category_id: 2,
    date: '2024-11-25',
  },
  {
    name: '日下部　幸夫',
    age: '66',
    email: 'lee@robinson.com',
    club_id: 1,
    category_id: 1,
    date: '2024-11-25',
  },
  {
    name: '谷口 　康之',
    age: '71', 
    email: 'lee@robinson.com',
    club_id: 2,
    category_id: 1,
    date: '2024-11-25',
  },
  {
    name: '宮口　直美',
    age: '大学一年生', 
    email: 'lee@robinson.com',
    club_id: 1,
    category_id: 2,
    date: '2024-11-25',
  },
];





export { users, clubs, categorys, receptions, venues };

// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: '木内　盛雄',
    email: 'kinai-ap@cameo.plala.or.jp',
    password: 'Approach3533',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: '晴山　紋音',
    email: 'ayane-ap@cameo.plala.or.jp',
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

const tournaments = [
  {
    tournament_name: '第52回日高オープン卓球大会',
    venue_id: 2,
    club_id: 1,
    date: '2024-12-08',
  },
  {
    tournament_name: '第53回日高オープン卓球大会',
    venue_id: 2,
    club_id: 1,
    date: '2025-12-07',
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
    name: '西田　清 2024',
    age: '66',
    email: 'lee@robinson.com',
    club_id: 1,
    category_id: 1,
    tourn_id: 1,
    user_id: users[0].id,
    date: '2024-11-25',
  },
  {
    name: '中嶋　美行 2024',
    age: '66', 
    email: 'lee@robinson.com',
    club_id: 1,
    category_id: 1,
    tourn_id: 1,
    user_id: users[0].id,
    date: '2024-11-25',
  },
  {
    name: '井本　千陽 2024',
    age: '大学一年生', 
    email: 'lee@robinson.com',
    club_id: 1,
    category_id: 2,
    tourn_id: 1,
    user_id: users[0].id,
    date: '2024-11-25',
  },
  {
    name: '石井　杏奈 2024',
    age: '25',
    email: 'anna@robinson.com',
    club_id: 1,
    category_id: 1,
    tourn_id: 1,
    user_id: users[0].id,
    date: '2024-11-25',
  },
  {
    name: '綾瀬　はるか 2024',
    age: '36', 
    email: 'lee@robinson.com',
    club_id: 1,
    category_id: 1,
    tourn_id: 1,
    user_id: users[1].id,
    date: '2024-11-25',
  },
  {
    name: '清原　果耶 2024',
    age: '大学四年生', 
    email: 'lee@robinson.com',
    club_id: 1,
    category_id: 2,
    tourn_id: 1,
    user_id: users[1].id,
    date: '2024-11-25',
  },

  {
    name: '西田　清',
    age: '66',
    email: 'lee@robinson.com',
    club_id: 1,
    category_id: 1,
    tourn_id: 2,
    user_id: users[0].id,
    date: '2024-11-25',
  },
  {
    name: '中嶋　美行',
    age: '66', 
    email: 'lee@robinson.com',
    club_id: 1,
    category_id: 1,
    tourn_id: 2,
    user_id: users[0].id,
    date: '2024-11-25',
  },
  {
    name: '井本　千陽',
    age: '大学一年生', 
    email: 'lee@robinson.com',
    club_id: 1,
    category_id: 2,
    tourn_id: 2,
    user_id: users[0].id,
    date: '2024-11-25',
  },
  {
    name: '石井　杏奈',
    age: '25',
    email: 'anna@robinson.com',
    club_id: 1,
    category_id: 1,
    tourn_id: 2,
    user_id: users[0].id,
    date: '2024-11-25',
  },
  {
    name: '綾瀬　はるか',
    age: '36', 
    email: 'lee@robinson.com',
    club_id: 1,
    category_id: 1,
    tourn_id: 2,
    user_id: users[1].id,
    date: '2024-11-25',
  },
  {
    name: '清原　果耶',
    age: '大学四年生', 
    email: 'lee@robinson.com',
    club_id: 1,
    category_id: 2,
    tourn_id: 2,
    user_id: users[1].id,
    date: '2024-11-25',
  },
]



export { users, clubs, categorys, receptions, venues, tournaments };

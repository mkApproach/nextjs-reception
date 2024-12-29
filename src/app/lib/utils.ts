export const formatCurrency = (name: number) => {
  return (name / 100).toLocaleString('en-JP', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-JP',
) => {
 
  const tergetdate = new Date(dateStr);

  const year = tergetdate.getFullYear();
  const month = tergetdate.getMonth() + 1;
  const date = tergetdate.getDate();
  const day = tergetdate.getDay();
  const week = ["日", "月", "火", "水", "木", "金", "土"][day];

//  console.log(tergetdate)

  return `${year}年${month}月${date}日  (${week})`

};


export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

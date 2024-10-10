export const createLastMonthRange = (date: Date) => {
  const start = new Date(date.getFullYear(), date.getMonth() - 1, 1, 0, 0, 0, 0);
  const end = new Date(date.getFullYear(), date.getMonth(), 0, 23, 59, 59, 999);

  return { start, end };
};

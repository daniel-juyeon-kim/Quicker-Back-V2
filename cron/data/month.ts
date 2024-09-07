export const createLastMonthRange = (date: Date) => {
  const start = generateMonth(date.getMonth() - 1);
  const end = generateMonth(date.getMonth());

  return { start, end };
};

const generateMonth = (month: number) => {
  return new Date(new Date().getFullYear(), month, 1, 0, 0, 0, 0);
};

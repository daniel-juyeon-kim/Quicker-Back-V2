import { AverageOfCostAttributes } from "../maria/models/AverageOfCost";

export const createLastMonthRange = (date: Date) => {
  const startDate = generateMonth(date.getMonth() - 1);
  const endDate = generateMonth(date.getMonth());

  return { startDate, endDate };
};

const generateMonth = (month: number) => {
  const date = new Date();

  date.setMonth(month);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);

  return date;
};

export const createAverageTable = (): AverageOfCostAttributes => {
  return {
    date: "",
    "5KM": 0,
    "10KM": 0,
    "15KM": 0,
    "20KM": 0,
    "25KM": 0,
    "30KM": 0,
    "40KM": 0,
    "50KM": 0,
    "60KM": 0,
    "60+KM": 0,
  };
};

import { DistanceKeys } from "../../../../cron/types";

export const createTable = (list: { key: DistanceKeys; value: number }[]) => {
  const table = {
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

  list.forEach(({ key, value }) => {
    table[key] = value;
  });

  return table;
};

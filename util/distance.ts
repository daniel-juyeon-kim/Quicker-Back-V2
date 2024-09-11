import { isUndefined, validateNumeric } from ".";
import { DistanceKeys } from "../cron/types";

const DISTANCES = [5, 10, 15, 20, 25, 30, 40, 50, 60] as const;

export const findDistanceKey = (km: number): DistanceKeys => {
  validateNumeric(km);

  const distance = DISTANCES.find((DISTANCE) => km <= DISTANCE);

  return isUndefined(distance) ? "60+KM" : (`${distance}KM` as DistanceKeys);
};

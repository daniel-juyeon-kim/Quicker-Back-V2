import { AverageOfCostAttributes } from "../maria/models/AverageOfCost";

type DistanceUnitTypes = keyof AverageOfCostAttributes;
type DistanceUnits = Exclude<DistanceUnitTypes, 'date'>;

const units = [5, 10, 15, 20, 25, 30, 40, 50, 60]

export const classifyDistance = (distance: number) => {
  return ((distance: number) => {
    for (const unit of units) {
      if (distance <= unit) {
        return unit + "KM" as DistanceUnits;
      }
    }
    return "60+KM";
  })(distance)
};

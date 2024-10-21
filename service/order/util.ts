import { TRANSPORTATION_ALLOW_VALUES } from "../../validator/schema/routes/order/custom-validator";

type Transportation = (typeof TRANSPORTATION_ALLOW_VALUES)[number];

const createEmptyTransportationObject = () =>
  TRANSPORTATION_ALLOW_VALUES.reduce(
    (acc, key) => {
      acc[key] = 0;
      return acc;
    },
    {} as Record<Transportation, 1 | 0>,
  );

export const createBasicTransportationEntity = (array: Transportation[]) => {
  return array.reduce((acc, key) => {
    acc[key] = 1;
    return acc;
  }, createEmptyTransportationObject());
};

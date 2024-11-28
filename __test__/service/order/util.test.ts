import { createBasicTransportationEntity } from "../../../service/order/util";

describe("createBasicTransportationEntity 테스트", () => {
  test("배열에 존재하면 1 없으면 0", () => {
    expect(createBasicTransportationEntity(["bike", "scooter", "walking"])).toEqual({
      bicycle: 0,
      bike: 1,
      car: 0,
      scooter: 1,
      truck: 0,
      walking: 1,
    });
  });
});

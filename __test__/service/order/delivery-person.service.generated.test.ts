import { mock, mockClear } from "jest-mock-extended";
import { CurrentDeliveryLocationRepository } from "../../../database";
import { DeliveryPersonService } from "../../../service/order/delivery-person/delivery-person.service";

jest.mock("../../../database");

const repository = mock<CurrentDeliveryLocationRepository>();
const service = new DeliveryPersonService(repository);

beforeEach(() => {
  mockClear(repository);
});

describe("DeliveryPersonService", () => {
  describe("findCurrentLocation()", () => {
    test("통과하는 테스트", async () => {
      const orderId = "1";

      await service.findCurrentLocation(orderId);

      expect(repository.findCurrentLocationByOrderId).toHaveBeenCalledWith(1);
    });
  });
});

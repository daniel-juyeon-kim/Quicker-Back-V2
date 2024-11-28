import { mock, mockClear } from "jest-mock-extended";
import { LocationRepository } from "../../../database/type-orm/repository/location/location.repository";
import { OrderLocationServiceImpl } from "../../../service/order/location/order-location.service.impl";

const repository = mock<LocationRepository>();
const service = new OrderLocationServiceImpl(repository);

beforeEach(() => {
  mockClear(repository);
});

describe("OrderLocationServiceImpl", () => {
  test("findDepartureAndDestination()", async () => {
    const orderId = "1";

    await service.findDepartureAndDestination(orderId);

    expect(repository.findDestinationDepartureByOrderId).toHaveBeenCalledWith(1);
  });
});

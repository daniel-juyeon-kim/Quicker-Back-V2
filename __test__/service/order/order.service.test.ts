import { mock, mockClear } from "jest-mock-extended";
import { OrderRepository } from "../../../database";

import { OrderService } from "../../../service/order/order.service";
import { OrderServiceImpl } from "../../../service/order/order.service.impl";

const repository = mock<OrderRepository>();
const service = new OrderServiceImpl(repository);

beforeEach(() => {
  mockClear(repository);
});

describe("OrderService 테스트", () => {
  describe("createOrder 테스트", () => {
    test("통과하는 테스트", async () => {
      const body: Parameters<OrderService["createOrder"]>[0] = {
        walletAddress: "0x123456789abcdef",
        detail: "Fragile, handle with care",
        transportation: ["truck"],
        product: {
          width: 20,
          length: 30,
          height: 40,
          weight: 10,
        },
        destination: {
          x: 37.7749,
          y: -122.4194,
        },
        departure: {
          x: 34.0522,
          y: -118.2437,
        },
        sender: {
          name: "John Doe",
          phone: "123-456-7890",
        },
        receiver: {
          name: "Jane Smith",
          phone: "987-654-3210",
        },
      };

      await service.createOrder(body);

      const expectResult = {
        ...body,
        transportation: {
          bike: 0,
          car: 0,
          scooter: 0,
          walking: 0,
          bicycle: 0,
          truck: 1,
        },
      };

      expect(repository.create).toHaveBeenCalledWith(expectResult);
    });
  });

  test("findAllOrderDetail()", async () => {
    await service.findAllOrderDetail("1,2,3,4");
    expect(repository.findAllCreatedOrDeliveredOrderDetailByOrderIds).toHaveBeenCalledWith([1, 2, 3, 4]);
  });
});

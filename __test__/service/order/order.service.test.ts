import { mock, mockClear } from "jest-mock-extended";
import { AverageCostRepository, OrderRepository } from "../../../database";

import { createLastMonth } from "../../../core";
import { OrderService } from "../../../service/order/order.service";
import { OrderServiceImpl } from "../../../service/order/order.service.impl";

const averageRepository = mock<AverageCostRepository>();
const orderRepository = mock<OrderRepository>();
const service = new OrderServiceImpl({
  orderRepository,
  averageRepository,
});

beforeEach(() => {
  mockClear(orderRepository);
  mockClear(averageRepository);
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

      expect(orderRepository.create).toHaveBeenCalledWith(expectResult);
    });
  });

  describe("findAllOrderDetail()", () => {
    test("통과하는 테스트", async () => {
      await service.findAllOrderDetail("1,2,3,4");

      expect(orderRepository.findAllCreatedOrDeliveredOrderDetailByOrderIds).toHaveBeenCalledWith([1, 2, 3, 4]);
    });
  });

  describe("findLatestOrderAverageCost()", () => {
    test("통과하는 테스트", async () => {
      averageRepository.findAverageCostByDateAndDistanceUnit.mockResolvedValue(100);

      const distance = "50";
      const result = await service.findLatestOrderAverageCost(distance);

      expect(result).toEqual({ averageCost: 100 });
      expect(averageRepository.findAverageCostByDateAndDistanceUnit).toHaveBeenCalledWith({
        distanceUnit: "50KM",
        lastMonth: createLastMonth(new Date()),
      });
    });
  });
});

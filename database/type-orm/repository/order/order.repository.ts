import { TRANSPORTATION_ALLOW_VALUES } from "../../../../validator/schema/routes/order/custom-validator";
import { OrderControllerRequestData } from "../../../../validator/schema/routes/order/order-controller-request-data";

type BasicTransportationEntity = {
  transportation: Record<(typeof TRANSPORTATION_ALLOW_VALUES)[number], 1 | 0>;
};

export interface OrderRepository {
  create(
    body: Omit<OrderControllerRequestData["createOrder"], "transportation"> & BasicTransportationEntity,
  ): Promise<void>;
}

import { isNull, isUndefined } from "../../util";
import { Distance, Order, Price } from "../types";

export class Combiner {
  public combineById(prices: Price[], distances: Distance[]): Order[] {
    return prices.map(this.combineWithDistance(distances)).filter((orderInfo) => !isNull(orderInfo));
  }

  private combineWithDistance(distances: Distance[]) {
    return (price: Price) => {
      const distance = distances.find((distance) => price.orderNumber === distance.orderId);

      if (isUndefined(distance)) {
        return null;
      }
      return { id: distance.orderId, km: distance.km, price: price.price };
    };
  }
}

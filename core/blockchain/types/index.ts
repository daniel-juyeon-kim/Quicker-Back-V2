export type OrderPrice = {
  orderNumber: number;
  price: number;
};

export type Blockchain = {
  getOrderPrices(orderIds: number[]): Promise<(OrderPrice | undefined)[]>;
};

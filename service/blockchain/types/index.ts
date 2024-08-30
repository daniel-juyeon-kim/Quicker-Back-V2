export interface Blockchain {
  getOrderPrices(orderIds: number[]): Promise<
    (
      | {
          orderNumber: number;
          price: number;
        }
      | undefined
    )[]
  >;
}

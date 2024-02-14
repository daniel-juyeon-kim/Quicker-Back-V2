import Caver from "caver-js";
import { QUICKER_DLVR_PROXY_ABI, QUICKER_DLVR_PROXY_ADDRESS } from "../klaytnApi/ContractInfo";

export class BlockChain {
    private contract
  
    constructor(klaytn_baobob_provider : string) {
      this.contract = new Caver(klaytn_baobob_provider).contract.create(
        // @ts-ignore
        QUICKER_DLVR_PROXY_ABI,
        QUICKER_DLVR_PROXY_ADDRESS,
      );
    }
  
    private async getOrderPrice (id : number) {
      return await this.contract.call("orderList", id);
    }
  
    private filter(blockChains: PromiseSettledResult<{orderNumber: number; price: number;}>[]) {
      return blockChains.map((blockChain) => {
        if (blockChain.status === "fulfilled") {
          return blockChain.value;
        }
      });
    };
  
    async getOrderPrices(orderIds: number[]) {
      const prices = await Promise.allSettled(
        orderIds.map(async (orderid) => {
          const order = await this.getOrderPrice(orderid)
          return {
            orderNumber: parseInt(order.orderNumber),
            price: parseInt(order.orderPrice),
          };
        }),
      );
      return this.filter(prices);
    }
  }
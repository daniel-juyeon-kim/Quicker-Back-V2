import { Blockchain } from "../../service/blockchain";
import { TmapApi } from "../../service/tmap-api";
import { isUndefined } from "../../util";
import { DB } from "./db";

export class ExternalApi {
  constructor(
    private db: DB,
    private blockChain: Blockchain,
    private tmapApi: TmapApi,
  ) {}

  public async findPrice(ids: number[]) {
    return (await this.blockChain.getOrderPrices(ids)).filter((price) => !isUndefined(price));
  }

  public async findDistance(orderIds: number[]) {
    const locations = await this.db.findLocation(orderIds);
    return await this.tmapApi.requestRouteDistances(locations);
  }
}

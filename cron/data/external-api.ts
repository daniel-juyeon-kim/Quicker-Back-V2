import { Blockchain, TmapApi } from "../../core";
import { DestinationDepartureLocation } from "../../database";

import { isFulfilled, isNull, isUndefined } from "../../util";

export class ExternalApi {
  private blockchain: Blockchain;
  private tmapApi: TmapApi;

  constructor({ blockchain: blockchain, tmapApi }: { blockchain: Blockchain; tmapApi: TmapApi }) {
    this.blockchain = blockchain;
    this.tmapApi = tmapApi;
  }

  public async findAllPriceByIds(Ids: number[]) {
    return (await this.blockchain.getOrderPrices(Ids)).filter((price) => !isUndefined(price));
  }

  public async findAllDistance(locations: DestinationDepartureLocation[]) {
    return (await this.tmapApi.requestRouteDistances(locations))
      .filter(isFulfilled)
      .map((distance) => distance.value)
      .filter((distance) => !isNull(distance));
  }
}

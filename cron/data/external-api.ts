import { Blockchain, TmapApi } from "../../core";
import { Location } from "../../maria/commands/location";

import { isFulfilled, isNull, isUndefined } from "../../util";

export class ExternalApi {
  private blockchain: Blockchain;
  private tmapApi: TmapApi;

  constructor({ blockchain: blockchain, tmapApi }: Dependency) {
    this.blockchain = blockchain;
    this.tmapApi = tmapApi;
  }

  public async findPrice(Ids: number[]) {
    return (await this.blockchain.getOrderPrices(Ids)).filter((price) => !isUndefined(price));
  }

  public async findDistance(locations: Location[]) {
    return (await this.tmapApi.requestRouteDistances(locations))
      .filter(isFulfilled)
      .map((distance) => distance.value)
      .filter((distance) => !isNull(distance));
  }
}

type Dependency = {
  blockchain: Blockchain;
  tmapApi: TmapApi;
};

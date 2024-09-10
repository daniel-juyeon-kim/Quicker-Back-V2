import { Location } from "../../maria/commands/location";
import { Blockchain } from "../../service/blockchain";
import { TmapApi } from "../../service/tmap-api";
import { isUndefined } from "../../util";

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
    return this.tmapApi.requestRouteDistances(locations);
  }
}

type Dependency = {
  blockchain: Blockchain;
  tmapApi: TmapApi;
};

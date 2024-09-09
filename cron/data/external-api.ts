import { Location } from "../../maria/commands/location";
import { Blockchain } from "../../service/blockchain";
import { TmapApi } from "../../service/tmap-api";
import { isUndefined } from "../../util";

export class ExternalApi {
  private blockChain: Blockchain;
  private tmapApi: TmapApi;

  constructor({ blockChain, tmapApi }: Dependency) {
    this.blockChain = blockChain;
    this.tmapApi = tmapApi;
  }

  public async findPrice(Ids: number[]) {
    return (await this.blockChain.getOrderPrices(Ids)).filter((price) => !isUndefined(price));
  }

  public async findDistance(locations: Location[]) {
    return this.tmapApi.requestRouteDistances(locations);
  }
}

type Dependency = {
  blockChain: Blockchain;
  tmapApi: TmapApi;
};

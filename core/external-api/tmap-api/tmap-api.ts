import fetch from "node-fetch";

import { DestinationDepartureLocation } from "../../../database";
import { isNull, validateResponse } from "../../../util";
import { validateEnvValue } from "../../../util/env";
import { EnvConfig } from "../../../util/env/types";
import { TmapApiError } from "./tmap-api.error";
import { RequestBody, ResponseBody } from "./types";

export class TmapApi {
  private readonly REQUEST_API_URL = `https://apis.openapi.sk.com/tmap/routes?version=1&format=json&appKey=`;
  private readonly appKey: string;
  private readonly KM = 1000;

  constructor(appKey: EnvConfig["tmapApiKey"]) {
    validateEnvValue("appKey", appKey);

    this.appKey = appKey;
  }

  public async requestRouteDistances(locations: DestinationDepartureLocation[]) {
    const promises = locations.map(async (location) => {
      const requestBody = {
        totalValue: 2,
        startX: location.departure.x.toString(),
        startY: location.departure.y.toString(),
        endX: location.destination.x.toString(),
        endY: location.destination.y.toString(),
      };

      const distance = await this.requestRouteDistance(requestBody);

      return isNull(distance) ? null : { orderId: location.id, km: distance };
    });

    return await Promise.allSettled(promises);
  }

  private async requestRouteDistance(body: RequestBody) {
    try {
      const response = await fetch(this.REQUEST_API_URL + this.appKey, {
        method: "POST",
        body: JSON.stringify(body),
      });

      await validateResponse(response);

      const responseBody = (await response.json()) as ResponseBody;
      return responseBody.features[0].properties.totalDistance / this.KM;
    } catch (e) {
      throw new TmapApiError(e);
    }
  }
}

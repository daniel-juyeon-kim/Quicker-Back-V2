import fetch from "node-fetch";
import { Location } from "../../maria/commands/location";
import { isFulfilled, isNull, validateResponse } from "../../util";
import { validateEnvValue } from "../../util/env";
import { EnvConfig } from "../../util/env/types";
import { ErrorMessage, ErrorMessageBot } from "../slack";
import { ErrorResponseBody, RequestBody, ResponseBody } from "./types";

export class TmapApi {
  private readonly REQUEST_API_URL = `https://apis.openapi.sk.com/tmap/routes?version=1&format=json&appKey=`;
  private readonly appKey: string;
  private readonly slackbot: ErrorMessageBot;
  private readonly KM = 1000;

  constructor(appKey: EnvConfig["tmapApiKey"], slackbot: ErrorMessageBot) {
    validateEnvValue("appKey", appKey);

    this.appKey = appKey;
    this.slackbot = slackbot;
  }

  public async requestRouteDistances(locations: Location[]) {
    const promises = locations.map(async (location) => {
      const requestBody = {
        totalValue: 2,
        startX: location.Departure.X.toString(),
        startY: location.Departure.Y.toString(),
        endX: location.Destination.X.toString(),
        endY: location.Destination.Y.toString(),
      };

      const distance = await this.requestRouteDistance(requestBody);

      return isNull(distance) ? null : { orderId: location.id, km: distance };
    });

    return (await Promise.allSettled(promises))
      .filter(isFulfilled)
      .map((distance) => distance.value)
      .filter((distance) => !isNull(distance));
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
      const error = new Error((e as ErrorResponseBody).toString());
      const errorMessage = new ErrorMessage({ error, date: new Date() });
      this.slackbot.sendMessage(errorMessage);
      return null;
    }
  }
}

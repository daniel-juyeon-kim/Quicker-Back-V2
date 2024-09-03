import { Location } from "../../maria/commands/location";
import { isFulfilled, isUndefined } from "../../util";
import { Env, validateEnvValue } from "../../util/env";
import { ErrorMessage, ErrorMessageBot } from "../slack";
import { RequestRouteDistanceBody, RouteDistance } from "./types";

export class TmapApi {
  private readonly requestApiUrl = `https://apis.openapi.sk.com/tmap/routes?version=1&format=json&appKey=`;
  private readonly appKey: string;
  private readonly slackbot: ErrorMessageBot;
  private readonly KM = 1000;

  constructor(appKey: Env, slackbot: ErrorMessageBot) {
    validateEnvValue("appKey", appKey);

    this.appKey = appKey;
    this.slackbot = slackbot;
  }

  public async requestRouteDistances(locations: Location[]) {
    const promises = locations.map(async (location) => {
      const requestBody = {
        startX: location.Departure.X.toString(),
        startY: location.Departure.Y.toString(),
        endX: location.Destination.X.toString(),
        endY: location.Destination.Y.toString(),
      };

      const distance = await this.requestRouteDistance(requestBody);

      return { orderId: location.id, km: distance };
    });

    return (await Promise.allSettled(promises))
      .filter(<T>(result: PromiseSettledResult<T>): result is PromiseFulfilledResult<T> => isFulfilled(result))
      .map((result) => result.value)
      .filter((result): result is { orderId: number; km: number } => !isUndefined(result.km));
  }

  private async requestRouteDistance(body: RequestRouteDistanceBody) {
    try {
      const fetchedData = await fetch(this.requestApiUrl + this.appKey, {
        method: "POST",
        body: JSON.stringify(body),
      });

      const response = (await fetchedData.json()) as RouteDistance;
      return response.features[0].properties.totalDistance / this.KM;
    } catch (e) {
      const error = e as Error;
      this.slackbot.sendMessage(new ErrorMessage(error, new Date()));
    }
  }
}

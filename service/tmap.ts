import fetch from "node-fetch";
import { Location } from "../maria/commands/location";

interface Body {
  startX: string;
  startY: string;
  endX: string;
  endY: string;
}

interface ExpectType {
  features : {
    properties : { 
      totalDistance : number
    }
  }[]
}

export class TmapApi {
  async requestRouteDistance (body: Body, appKey: string) {
    const response = await fetch(
      `https://apis.openapi.sk.com/tmap/routes?version=1&format=json&appKey=${appKey}`,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    );
    const data = await response.json() as ExpectType; 
    return data.features[0].properties.totalDistance / 1000;
  };

  async requestRouteDistances (locations: Location [], appKey: string) {
    return await Promise.allSettled(
      locations.map(async(location) => {
        const body = {
          startX: location.Departure.X.toString(),
          startY: location.Departure.Y.toString(),
          endX: location.Destination.X.toString(),
          endY: location.Destination.Y.toString(),
        };
        const distance = await this.requestRouteDistance(body, appKey);
        return {
          orderId: location.id,
          km: distance,
        };
      })
    )
  }
}
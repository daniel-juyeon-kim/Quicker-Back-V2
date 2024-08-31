export interface RequestRouteDistanceBody {
  startX: string;
  startY: string;
  endX: string;
  endY: string;
}

export interface RouteDistance {
  features: {
    properties: {
      totalDistance: number;
    };
  }[];
}

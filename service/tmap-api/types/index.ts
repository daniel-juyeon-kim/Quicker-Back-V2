export interface RequestBody {
  startX: string;
  startY: string;
  endX: string;
  endY: string;
}

export interface ResponseBody {
  type: "FeatureCollection";
  features: [
    {
      type: "Feature";
      properties: {
        totalDistance: number;
        totalTime: number;
        totalFare: number;
        taxiFare: number;
      };
    },
  ];
}
export type ErrorResponseBody = {
  error: {
    id: string;
    category: string;
    code: string;
    message: string;
  };
};

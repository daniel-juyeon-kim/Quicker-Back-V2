import { mock } from "jest-mock-extended";
import fetch from "node-fetch";

import { TmapApi, TmapApiError } from "../../core";
import { DestinationDepartureLocation } from "../../database/type-orm/repository/location/location.repository";
import { EnvConfig } from "../../util/env/types";

const mockAppKey: EnvConfig["tmapApiKey"] = "test-app-key";

jest.mock("node-fetch");

const tmapApi = new TmapApi(mockAppKey);

describe("TmapApi", () => {
  describe("requestRouteDistances()", () => {
    test("실패하는 테스트, 요청 후 에러 발생 시 TmapApiError를 던짐 ", async () => {
      const error = new Error("Fetch failed");
      (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(error);

      const mockLocation = mock<DestinationDepartureLocation>({
        id: 1,
        departure: { x: 127.1, y: 37.5 },
        destination: { x: 126.9, y: 37.6 },
      });

      await expect(tmapApi.requestRouteDistances([mockLocation])).resolves.toStrictEqual([
        {
          status: "rejected",
          reason: new TmapApiError(error),
        },
      ]);
    });
  });
});

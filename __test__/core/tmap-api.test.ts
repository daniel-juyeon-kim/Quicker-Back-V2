import { mock } from "jest-mock-extended";
import fetch from "node-fetch";

import { TmapApi, TmapApiError } from "../../core";
import { Location } from "../../maria/commands/location";
import { EnvConfig } from "../../util/env/types";

const mockAppKey: EnvConfig["tmapApiKey"] = "test-app-key";

jest.mock("node-fetch");

const tmapApi = new TmapApi(mockAppKey);
describe("TmapApi", () => {
  describe("requestRouteDistances()", () => {
    test("실패하는 테스트, 요청 후 에러 발생기 TmapApiError를 던짐 ", async () => {
      const error = new Error("Fetch failed");
      (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(error);

      const mockLocation = mock<Location>({
        id: 1,
        Departure: { X: 127.1, Y: 37.5 },
        Destination: { X: 126.9, Y: 37.6 },
      });
      const result = (await tmapApi.requestRouteDistances([mockLocation]))[0] as PromiseRejectedResult;

      expect(result.reason).toBeInstanceOf(TmapApiError);
      expect(result.reason.error).toStrictEqual(error);
    });
  });
});

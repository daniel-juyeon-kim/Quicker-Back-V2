import fetch from "node-fetch";
import { NaverSmsApi, SmsApiError } from "../../core";
import { EnvConfig } from "../../util/env/types";

jest.mock("node-fetch");

const envObject: EnvConfig["nhnApi"] = {
  accesskey: "accesskey",
  secretkey: "secretkey",
  serviceId: "serviceId",
  fromNumber: "01012341234",
};

const sms = new NaverSmsApi(envObject);

describe("NaverSmsApi 테스트", () => {
  describe("sendDeliveryTrackingMessage() 테스트", () => {
    test("실패 처리 테스트, SmsApiError를 던짐", async () => {
      const deliveryTrackingUrl = "https://~~~~";
      const receiverPhoneNumber = "01012341234";

      const error = new Error("알 수 없는 에러");
      (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(error);

      await expect(sms.sendDeliveryTrackingMessage(deliveryTrackingUrl, receiverPhoneNumber)).rejects.toStrictEqual(
        new SmsApiError(error),
      );
    });
  });
});

import { mock, mockClear } from "jest-mock-extended";
import { DeliveryUrlCreator, SmsApi } from "../../../core";
import { Receiver } from "../../../database";
import { DeliveryUrlMessage } from "../../../service/order/delivery-url-message";

const smsApi = mock<SmsApi>();
const urlCreator = mock<DeliveryUrlCreator>();

const deliveryUrlMessage = new DeliveryUrlMessage({ smsApi, urlCreator });

beforeEach(async () => {
  mockClear(smsApi);
  mockClear(urlCreator);
});

describe("DeliveryUrlMessage 테스트", () => {
  describe("sendToReceiver() 테스트", () => {
    test("통과하는 테스트", async () => {
      const receiver = new Receiver();
      receiver.phone = "01012341234";

      const body = { orderId: 1, walletAddress: "지갑주소" };

      const url = "http://~~~~~~";
      urlCreator.createUrl.mockReturnValueOnce(url);

      await deliveryUrlMessage.sendToReceiver(receiver, body);

      expect(urlCreator.createUrl).toHaveBeenCalledWith(body);
      expect(smsApi.sendDeliveryTrackingMessage).toHaveBeenCalledWith(url, receiver.phone);
    });

    test("실패하는 테스트, messageSender에서 오류발생", async () => {
      const receiver = new Receiver();
      receiver.phone = "01012341234";

      const body = { orderId: 1, walletAddress: "지갑주소" };

      smsApi.sendDeliveryTrackingMessage.mockRejectedValueOnce(new Error("알 수 없는 에러"));

      await expect(deliveryUrlMessage.sendToReceiver(receiver, body)).rejects.toStrictEqual(
        new Error("알 수 없는 에러"),
      );
    });
  });
});

import { DeliveryUrlCreator, SmsApi } from "../../core";
import { Receiver } from "../../database";

export class DeliveryUrlMessage {
  private readonly smsApi: SmsApi;
  private readonly urlCreator: DeliveryUrlCreator;

  constructor({ smsApi, urlCreator }: { smsApi: SmsApi; urlCreator: DeliveryUrlCreator }) {
    this.smsApi = smsApi;
    this.urlCreator = urlCreator;
  }

  async sendToReceiver(receiver: Receiver, body: { orderId: number; walletAddress: string }) {
    const url = this.urlCreator.createUrl(body);

    await this.smsApi.sendDeliveryTrackingMessage(url, receiver.phone);
  }
}

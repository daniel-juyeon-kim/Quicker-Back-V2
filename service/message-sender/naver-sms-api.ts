import CryptoJS from "crypto-js";
import fetch from "node-fetch";
import { validateEnv } from "../../util/env";
import { EnvConfig } from "../../util/env/types";
import { ErrorMessage, ErrorMessageBot } from "../slack";
import { MessageSender } from "./types";

export class NaverSmsApi implements MessageSender {
  private readonly messageTemplate = `\n[Quicker]\n\n반갑습니다, 고객님.\n고객님의 소중한 상품이 배송 예정입니다.\n\n※ 실시간 배송정보\n `;
  private readonly method = "POST";
  private readonly accesskey: string;
  private readonly secretkey: string;
  private readonly requestApiUrl: string;
  private readonly fromNumber: string;
  private readonly slackBot: ErrorMessageBot;

  constructor(envObject: EnvConfig["nhnApi"], slackbot: ErrorMessageBot) {
    this.slackBot = slackbot;

    validateEnv(envObject);

    this.accesskey = envObject.accesskey;
    this.secretkey = envObject.secretkey;
    this.requestApiUrl = `https://sens.apigw.ntruss.com/sms/v2/services/${envObject.serviceId}/messages`;
    this.fromNumber = envObject.fromNumber;
  }

  public async sendDeliveryTrackingMessage(deliveryTrackingUrl: string, receiverPhoneNumber: string) {
    const timestamp = new Date().getTime().toString();
    const hmac = this.makeSignature(timestamp);
    const headers = {
      "Content-Type": "application/json",
      "x-ncp-apigw-timestamp": timestamp,
      "x-ncp-iam-access-key": this.accesskey,
      "x-ncp-apigw-signature-v2": hmac,
    };

    try {
      await fetch(this.requestApiUrl, {
        method: this.method,
        headers,
        body: JSON.stringify({
          type: "LMS",
          from: this.fromNumber,
          content: this.messageTemplate + deliveryTrackingUrl,
          messages: [
            {
              to: receiverPhoneNumber,
            },
          ],
        }),
      });
    } catch (e) {
      const error = e as Error;
      this.slackBot.sendMessage(new ErrorMessage(error, new Date()));
    }
  }

  private makeSignature(timestamp: string) {
    const space = " ";
    const newLine = "\n";

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, this.secretkey);
    hmac.update(this.method);
    hmac.update(space);
    hmac.update(this.requestApiUrl);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(this.accesskey);

    const hash = hmac.finalize();

    return hash.toString(CryptoJS.enc.Base64);
  }
}

import CryptoJS from "crypto-js";
import fetch from "node-fetch";
import { validateResponse } from "../../../util";
import { validateEnv } from "../../../util/env";
import { EnvConfig } from "../../../util/env/types";
import { Body, Headers, SmsApi } from "./sms-api";
import { SmsApiError } from "./sms-api.error";

export class NaverSmsApi implements SmsApi {
  private readonly messageTemplate = `\n[Quicker]\n\n반갑습니다, 고객님.\n고객님의 소중한 상품이 배송 예정입니다.\n\n※ 실시간 배송정보\n `;
  private readonly method = "POST";
  private readonly accesskey: string;
  private readonly secretkey: string;
  private readonly apiUrl: string;
  private readonly fromNumber: string;

  constructor(envObject: EnvConfig["nhnApi"]) {
    validateEnv(envObject);

    this.accesskey = envObject.accesskey;
    this.secretkey = envObject.secretkey;
    this.apiUrl = `https://sens.apigw.ntruss.com/sms/v2/services/${envObject.serviceId}/messages`;
    this.fromNumber = envObject.fromNumber;
  }

  public async sendDeliveryTrackingMessage(deliveryTrackingUrl: string, receiverPhoneNumber: string) {
    try {
      const requestData = this.createRequestData(deliveryTrackingUrl, receiverPhoneNumber);

      const response = await this.requestApi(requestData);

      validateResponse(response);
    } catch (e) {
      throw new SmsApiError(e);
    }
  }

  private createRequestData(deliveryTrackingUrl: string, to: string) {
    const timestamp = new Date().getTime().toString();
    const hmac = this.makeSignature(timestamp);
    const headers = {
      "Content-Type": "application/json",
      "x-ncp-apigw-timestamp": timestamp,
      "x-ncp-iam-access-key": this.accesskey,
      "x-ncp-apigw-signature-v2": hmac,
    };

    const body = {
      type: "LMS",
      from: this.fromNumber,
      content: this.messageTemplate + deliveryTrackingUrl,
      messages: [
        {
          to,
        },
      ],
    };

    return { headers, body };
  }

  private async requestApi({ headers, body }: { headers: Headers; body: Body }) {
    return await fetch(this.apiUrl, {
      headers,
      method: this.method,
      body: JSON.stringify(body),
    });
  }

  private makeSignature(timestamp: string) {
    const space = " ";
    const newLine = "\n";

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, this.secretkey);
    hmac.update(this.method);
    hmac.update(space);
    hmac.update(this.apiUrl);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(this.accesskey);

    const hash = hmac.finalize();

    return hash.toString(CryptoJS.enc.Base64);
  }
}

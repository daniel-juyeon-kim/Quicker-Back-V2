import CryptoJS from "crypto-js";
import fetch from "node-fetch";
import { validateEnv } from "../util/env";
import { EnvConfig } from "../util/env/types";

export interface Body {
  type: "SMS" | "MMS" | "LMS";
  from: string;
  content: string;
  messages: [
    {
      to: string;
    },
  ];
}

interface MessageSender {
  sendMessage(body: unknown): Promise<void>;
}

export class NHNAPI implements MessageSender {
  private messageTemplate = `\n[Quicker]\n\n반갑습니다, 고객님.\n고객님의 소중한 상품이 배송 예정입니다.\n\n※ 실시간 배송정보\n `;
  private method = "POST";
  private accesskey: string;
  private secretkey: string;
  private url: string;
  private fromNumber: string;

  constructor(envObject: EnvConfig["nhnApi"]) {
    validateEnv(envObject);

    this.accesskey = envObject.accesskey;
    this.secretkey = envObject.secretkey;
    this.url = `/sms/v2/services/${envObject.serviceId}/messages`;
    this.fromNumber = envObject.fromNumber;
  }

  public generateIncludeUrlBody(url: string, to: string): Body {
    return {
      type: "LMS" as const,
      from: this.fromNumber,
      content: this.generateUrlMessage(url),
      messages: [
        {
          to: to,
        },
      ],
    };
  }

  private generateUrlMessage(url: string) {
    return this.messageTemplate + url;
  }

  public async sendMessage(body: Body) {
    const timestamp = new Date().getTime().toString();
    const hmac = this.makeSignature(timestamp);
    const headers = {
      "Content-Type": "application/json",
      "x-ncp-apigw-timestamp": timestamp,
      "x-ncp-iam-access-key": this.accesskey,
      "x-ncp-apigw-signature-v2": hmac,
    };
    await fetch(`https://sens.apigw.ntruss.com${this.url}`, {
      method: this.method,
      headers: headers,
      body: JSON.stringify(body),
    });
  }

  private makeSignature(timestamp: string) {
    const space = " ";
    const newLine = "\n";

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, this.secretkey);
    hmac.update(this.method);
    hmac.update(space);
    hmac.update(this.url);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(this.accesskey);

    const hash = hmac.finalize();

    return hash.toString(CryptoJS.enc.Base64);
  }
}

import CryptoJS from "crypto-js";
import fetch from "node-fetch";

export interface Body {
  type: "SMS" | "MMS" | "LMS";
  from: string;
  content: string;
  messages: [{
      to: string;
  }];
}

interface Keys {
  [key : string] : string
}

export class NHNAPI {
  private messageTemplate = `\n[Quicker]\n\n반갑습니다, 고객님.\n고객님의 소중한 상품이 배송 예정입니다.\n\n※ 실시간 배송정보\n `;
  private method = "POST";
  private accessKey;
  private secretKey;
  private url;
  private fromNumber;
  private whiteListNumbers

  constructor({accessKey , secretKey , serviceId, fromNumber, whiteList1, whiteList2, whiteList3 } : Keys) {
    this.accessKey = accessKey
    this.secretKey = secretKey
    this.url = `/sms/v2/services/${serviceId}/messages`
    this.fromNumber = fromNumber
    this.whiteListNumbers = [whiteList1, whiteList2, whiteList3]
  }

  public generateIncludeUrlBody (url : string, to : string) : Body {
    return {
      type: "LMS" as const,
      from: this.fromNumber,
      content: this.generateUrlMessage(url),
      messages: [{
          to: to,
      }]
    }
  }

  private generateUrlMessage (url: string) {
    return this.messageTemplate +  url
  }

  public async sendMessage (body: Body) {
    if (!this.isWhiteListNumber(body.messages[0].to)) return 
    
    const timestamp = new Date().getTime().toString()
    const hmac = this.makeSignature(timestamp)
    const headers = {
      "Content-Type": "application/json",
      "x-ncp-apigw-timestamp": timestamp,
      "x-ncp-iam-access-key": this.accessKey,
      "x-ncp-apigw-signature-v2": hmac,
    };
    
    return await fetch(`https://sens.apigw.ntruss.com${this.url}`, {
      method: this.method,
      headers: headers,
      body: JSON.stringify(body),
    });
  }

  private makeSignature(timestamp : string) {
    const space = " ";
    const newLine = "\n";

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, this.secretKey);
    hmac.update(this.method);
    hmac.update(space);
    hmac.update(this.url);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(this.accessKey);

    const hash = hmac.finalize();

    return hash.toString(CryptoJS.enc.Base64);
  }

  private isWhiteListNumber (toNumber: string) {
    return this.whiteListNumbers.includes(toNumber)
  }
}
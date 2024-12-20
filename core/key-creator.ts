import crypto from "crypto";
import CryptoJS from "crypto-js";
import { validateEnvValue } from "../util/env";
import { EnvConfig } from "../util/env/types";

export class KeyCreator {
  constructor(private readonly key: string) {}

  createReceiverUrlParameterValue<T extends object>(body: T, cryptoKey: string) {
    return CryptoJS.AES.encrypt(JSON.stringify(body), cryptoKey).toString();
  }

  createDbUserId(phoneNumber: string) {
    return crypto.createHmac("sha256", this.key).update(phoneNumber).digest("hex");
  }
}

export class DbPkCreator {
  constructor(private readonly key: string) {}

  createUserPk(phoneNumber: string) {
    return crypto.createHmac("sha256", this.key).update(phoneNumber).digest("hex");
  }
}

export class DeliveryUrlCreator {
  private readonly encryptKey: string;
  private readonly baseUrl: string;

  constructor({
    encryptKey,
    baseUrl,
  }: {
    encryptKey: EnvConfig["urlCryptoKey"];
    baseUrl: EnvConfig["clientServerDomain"];
  }) {
    validateEnvValue("urlCryptoKey", encryptKey);
    validateEnvValue("clientServerDomain", baseUrl);

    this.encryptKey = encryptKey;
    this.baseUrl = baseUrl;
  }

  createUrl<T extends object>(body: T) {
    // NOTE:
    // 클라이언트에서 주문 아이디와 지갑주소를 통해 복호화 함,
    // 해당 url정보를 받는 사람은 수취인은 가입이 되어있지 않을 수 있어서 orderId와 walletAddress 정보가 필요함
    const encryptedUrlParameter = this.createUrlParameter(body);

    return this.baseUrl + "recipient/?key=" + encryptedUrlParameter;
  }

  private createUrlParameter<T extends object>(body: T) {
    return CryptoJS.AES.encrypt(JSON.stringify(body), this.encryptKey).toString();
  }
}

import crypto from "crypto";
import CryptoJS from "crypto-js";

export class KeyCreator {
  constructor(private readonly key: string) {}

  createRecipientUrlParameterValue(phoneNumber: string, cryptoKey: string) {
    return CryptoJS.AES.encrypt(JSON.stringify(phoneNumber), cryptoKey).toString();
  }

  createDbUserId(phoneNumber: string) {
    return crypto.createHmac("sha256", this.key).update(phoneNumber).digest("hex");
  }
}

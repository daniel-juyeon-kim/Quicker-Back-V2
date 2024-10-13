import crypto from "crypto";
import CryptoJS from "crypto-js";

export class KeyCreator {
  createRecipientUrlParameterValue(phoneNumber: string, cryptoKey: string) {
    return CryptoJS.AES.encrypt(JSON.stringify(phoneNumber), cryptoKey).toString();
  }

  createDbUserId(phoneNumber: string, secret: string) {
    return crypto.createHmac("sha256", secret).update(phoneNumber).digest("hex");
  }
}

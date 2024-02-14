import CryptoJS from "crypto-js";
import crypto from "crypto";

export class Crypto {
  encrypt(data: any, cryptoKey : string) { 
    return CryptoJS.AES.encrypt(JSON.stringify(data), cryptoKey).toString();
  }

  decrypt(encryptedText: string, cryptoKey : string) {
    const bytes  = CryptoJS.AES.decrypt( encryptedText, cryptoKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  encryptForUserInfo = (body: any, secret : string) => {
    const user = body.User;
    const userBirthDate = body.Birthday;
    //NOTE : 전화번호를 기반으로 암호화한 id 사용
    const hashed = crypto
      .createHmac("sha256", secret)
      .update(user.contact)
      .digest("hex");
    user.id = hashed;
    userBirthDate.id = hashed;
    return {
      hashed,
      user,
      userBirthDate,
    };
  };
}
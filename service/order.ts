import { cacheOrderInstance, orderInstance, roomInstance, userInstance } from "../maria/commands";
import { Crypto } from "./cryto";
import { NaverSmsApi } from "./message-sender/naver-sms-api";

export const updateOrder = async (body: any, nhnApi: NaverSmsApi, cryptoInstance: Crypto, cryptoKey: string) => {
  const userWalletAddress = body.userWalletAddress;
  const orderId = body.orderId;

  const deliver = await userInstance.findId(userWalletAddress);

  if (deliver === null) {
    throw new Error("회원이 아님");
  }

  await orderInstance.update(deliver.id, orderId);
  cacheOrderInstance.create(orderId);

  const requesterId = await orderInstance.findRequesterId(orderId);

  if (requesterId === null) {
    throw new Error("의뢰인 아이디를 찾을 수 없습니다.");
  }

  await roomInstance.create(orderId, deliver.id, requesterId.ID_REQ);

  const receiverPhoneNumber = await orderInstance.findReceiverPhoneNumber(orderId);

  if (receiverPhoneNumber === null) {
    throw new Error("수취인의 전화번호에 대한 정보가 없습니다.");
  }

  const encryptedUrl = cryptoInstance.encrypt(body, cryptoKey);

  const url = process.env.CLIENT_SERVER_DOMAIN + "receipient/?key=" + encryptedUrl;

  await nhnApi.sendDeliveryTrackingMessage(url, receiverPhoneNumber.PHONE);
};

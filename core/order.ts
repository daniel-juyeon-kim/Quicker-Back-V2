import { cacheOrderInstance, orderInstance, roomInstance, userInstance } from "../maria/commands";
import { KeyCreator } from "./key-creator";
import { MessageSender } from "./message-sender";

export const updateOrder = async (
  body: any,
  messageSender: MessageSender,
  cryptoInstance: KeyCreator,
  cryptoKey: string,
) => {
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

  const encryptedUrl = cryptoInstance.createRecipientUrlParameterValue(body, cryptoKey);

  const url = process.env.CLIENT_SERVER_DOMAIN + "receipient/?key=" + encryptedUrl;

  await messageSender.sendDeliveryTrackingMessage(url, receiverPhoneNumber.PHONE);
};

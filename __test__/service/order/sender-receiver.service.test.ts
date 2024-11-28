import { mock } from "jest-mock-extended";
import { OrderParticipantRepository } from "../../../database";
import { SenderReceiverService } from "../../../service/order/sender-receiver/sender-receiver.service";

const repository = mock<OrderParticipantRepository>();
const service = new SenderReceiverService(repository);

beforeEach(() => {});
describe("SenderReceiverService", () => {
  test("findSenderReceiverInfo()", async () => {
    const orderId = "1";

    await service.findSenderReceiverInfo(orderId);

    expect(repository.findSenderReceiverInfoByOrderId).toHaveBeenCalledWith(1);
  });
});

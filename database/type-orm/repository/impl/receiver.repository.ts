import { EntityManager } from "typeorm";
import { UnknownDataBaseError } from "../../../../core";
import { Receiver } from "../../entity/receiver.entity";
import { NotExistDataError } from "../../util";
import { AbstractRepository } from "../abstract-repository";

export class ReceiverRepository extends AbstractRepository {
  async findPhoneNumberByOrderId(manager: EntityManager, orderId: number) {
    try {
      const receiver = await manager.findOne(Receiver, {
        select: {
          id: true,
          phone: true,
        },
        where: { id: orderId },
      });

      this.validateNotNull(receiver);

      return receiver;
    } catch (error) {
      if (error instanceof NotExistDataError) {
        throw new NotExistDataError(`${orderId} 에 해당되는 데이터가 존재하지 않습니다.`);
      }
      throw new UnknownDataBaseError(error);
    }
  }
}

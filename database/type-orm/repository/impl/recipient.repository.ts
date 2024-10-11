import { Repository } from "typeorm";
import { Recipient } from "../../entity/recipient.entity";
import { AbstractRepository } from "../abstract-repository";

export class RecipientRepository extends AbstractRepository {
  constructor(private readonly repository: Repository<Recipient>) {
    super();
  }

  async findPhoneNumberByOrderId(orderId: number) {
    const phoneNumber = await this.repository.findOne({
      select: {
        id: true,
        phone: true,
      },
      where: { id: orderId },
    });

    this.validateNotNull(phoneNumber);

    return phoneNumber;
  }
}

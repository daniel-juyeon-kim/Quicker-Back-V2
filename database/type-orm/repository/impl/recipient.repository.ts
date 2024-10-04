import { DataSource } from "typeorm";
import { Recipient } from "../../entity/recipient.entity";
import { AbstractRepository } from "../abstract-repository";

export class RecipientRepository extends AbstractRepository<Recipient> {
  constructor(dataSource: DataSource) {
    super(dataSource, Recipient);
  }

  async findPhoneNumber(orderId: number) {
    const phoneNumber = await this.repository.findOne({
      select: {
        id: true,
        phone: true,
      },
      where: { id: orderId },
    });

    this.validateNull(phoneNumber);

    return phoneNumber;
  }
}

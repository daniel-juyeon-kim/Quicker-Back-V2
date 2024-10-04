import { initializeDataSource } from "../../../../../database/type-orm";
import { Recipient } from "../../../../../database/type-orm/entity/recipient.entity";
import { RecipientRepository } from "../../../../../database/type-orm/repository/impl/recipient.repository";
import { testAppDataSource } from "../data-source";

const recipientRepository = new RecipientRepository(testAppDataSource);

beforeEach(async () => {
  await initializeDataSource(testAppDataSource);

  const recipient = testAppDataSource.manager.create(Recipient, {
    id: 1,
    name: "이름",
    phone: "01012341234",
  });
  await testAppDataSource.manager.save(recipient);
});

describe("recipientRepository 테스트", () => {
  test("findPhoneNumber 테스트", async () => {
    await expect(recipientRepository.findPhoneNumber(1)).resolves.toEqual({ id: 1, phone: "01012341234" });
  });
});

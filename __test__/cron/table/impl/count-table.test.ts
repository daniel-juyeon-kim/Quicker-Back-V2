import { CountTable } from "../../../../cron/table/impl/count-table";
import { createTable } from "./util";

const countTable = new CountTable();

describe("CountTable 테스트", () => {
  test("정상동작", () => {
    const orderInfos = [
      { id: 1, price: 10, km: 5 },
      { id: 2, price: 20, km: 15 },
      { id: 11, price: 110, km: 60 },
      { id: 16, price: 160, km: 61 },
      { id: 15, price: 150, km: 63 },
      { id: 14, price: 140, km: 64 },
    ];
    const expectTableValues = [
      { key: "5KM", value: 1 },
      { key: "15KM", value: 1 },
      { key: "60KM", value: 1 },
      { key: "60+KM", value: 3 },
    ] as Parameters<typeof createTable>[0];

    const expectResult = createTable(expectTableValues);

    expect(countTable.create(orderInfos)).toStrictEqual(expectResult);
  });
});

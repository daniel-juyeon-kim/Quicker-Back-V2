import { SumTable } from "../../../../cron/table/impl/sum-table";
import { createTable } from "./util";

const sumTable = new SumTable();

describe("CountTable 테스트", () => {
  test("통과하는 테스트", () => {
    const orderInfos = [
      { id: 1, price: 10, km: 5 },
      { id: 2, price: 20, km: 15 },
      { id: 11, price: 110, km: 60 },
      { id: 16, price: 160, km: 61 },
      { id: 15, price: 150, km: 63 },
      { id: 14, price: 140, km: 64 },
    ];
    const expectTableValues = [
      { key: "5KM", value: 10 },
      { key: "15KM", value: 20 },
      { key: "60KM", value: 110 },
      { key: "60+KM", value: 450 },
    ] as Parameters<typeof createTable>[0];

    const expectResult = createTable(expectTableValues);

    expect(sumTable.create(orderInfos)).toStrictEqual(expectResult);
  });
});

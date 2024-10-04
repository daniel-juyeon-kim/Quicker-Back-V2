import { DataSource, ObjectLiteral, ObjectType, Repository } from "typeorm";
import { isNull } from "../../../util";

export abstract class AbstractRepository<T extends ObjectLiteral> {
  protected readonly repository: Repository<T>;

  constructor(dataSource: DataSource, entity: ObjectType<T>) {
    this.repository = dataSource.getRepository(entity);
  }

  protected validateNull<T>(data: T | null): asserts data is T {
    if (isNull(data)) {
      throw new Error("데이터를 찾지 못했습니다.");
    }
  }
}

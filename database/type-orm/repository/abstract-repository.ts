import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { isNull } from "../../../util";

export abstract class AbstractRepository<Entity extends ObjectLiteral> {
  protected abstract readonly repository: Repository<Entity>;
  protected abstract readonly entity: EntityTarget<Entity>;

  constructor(protected readonly dataSource: DataSource) {}

  protected validateNull<T>(data: T | null): asserts data is T {
    if (isNull(data)) {
      throw new Error("데이터를 찾지 못했습니다.");
    }
  }
}

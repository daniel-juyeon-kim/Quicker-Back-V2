import { DataSource, ObjectLiteral, Repository } from "typeorm";
import { isNull } from "../../../util";

type ClassType<T> = { new (): T };

export abstract class AbstractRepository<Entity extends ObjectLiteral> {
  protected readonly repository: Repository<Entity>;

  constructor(dataSource: DataSource, entity: ClassType<Entity>) {
    this.repository = dataSource.getRepository(entity);
  }

  protected validateNull<T>(data: T | null): asserts data is T {
    if (isNull(data)) {
      throw new Error("데이터를 찾지 못했습니다.");
    }
  }
}

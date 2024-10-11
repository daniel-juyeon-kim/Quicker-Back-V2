import { isNull } from "../../../util";

export abstract class MongoRepository {
  protected validateNull<T>(data: T | null): asserts data is T {
    if (isNull(data)) {
      throw new Error("데이터가 존재하지 않습니다.");
    }
  }
}

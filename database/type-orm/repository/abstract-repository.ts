import { isNull } from "../../../util";

export abstract class AbstractRepository {
  protected validateNotNull<T>(data: T | null): asserts data is T {
    if (isNull(data)) {
      throw new Error("데이터를 찾지 못했습니다.");
    }
  }
}

import { isNull } from "../../../util";
import { NotExistDataError } from "../util";

export abstract class AbstractRepository {
  protected readonly ERROR_MESSAGE_NOT_EXIST_DATA = "데이터가 존재하지 않습니다.";

  protected validateNotNull<T>(data: T | null): asserts data is T {
    if (isNull(data)) {
      throw new NotExistDataError(this.ERROR_MESSAGE_NOT_EXIST_DATA);
    }
  }
}

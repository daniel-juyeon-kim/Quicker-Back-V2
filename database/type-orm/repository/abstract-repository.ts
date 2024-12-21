import { isNull } from "../../../util";
import { NotExistDataError } from "../util";

export abstract class AbstractRepository {
  protected readonly ERROR_MESSAGE_NOT_EXIST_DATA = "데이터가 존재하지 않습니다.";

  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  protected validateNotNull<F extends Object, T>(findOption: F, data: T | null): asserts data is T {
    if (isNull(data)) {
      throw new NotExistDataError(`${findOption.toString()}에 대한 데이터가 존재하지 않습니다.`);
    }
  }
}

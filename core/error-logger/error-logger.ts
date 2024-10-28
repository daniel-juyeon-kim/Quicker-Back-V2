import winston, { Logger, transport } from "winston";

export class ErrorLogger {
  private readonly configure = {
    level: "error",
    format: winston.format.prettyPrint(),
  };
  private readonly logger: Logger;

  constructor({ logger, transportation }: { logger: Logger; transportation: transport }) {
    logger.configure({ ...this.configure, transports: transportation });
    this.logger = logger;
  }

  log({ error, date }: { error: unknown; date: Date }) {
    const localDateTime = date.toLocaleString();

    this.logger.log(this.configure.level, localDateTime, error);
  }
}

/**
 * 외부 요청을 요하는 api
 * - ExternalApiError
 *  - tmap
 *    - TmapError
 *  - ErrorMessageBotError
 *    - slack
 *  - SMSApiError
 *    - SMS
 *
 * 1. 에러 헨들러가 모든 에러를 잡아서 처리
 *  - 해야하는것
 *    - 에러 헨들러가 코어 모듈의 에러를 감지하기 위해 별도의 에러 레이어 생성
 *    - 에러 헨들러에 로직 추가
 *  - 장점
 *    - 로거의 주입이 없어서 별도의 모킹이 줄어듬 -> 테스트 코드가 간결해짐
 *  - 단점
 *    - 레이어에 대한 코드를 작성해야함
 *    - 에러 헨들러에 로직도 추가해야함 -> 클래스가 비대해짐 -> 하위 컨트롤러로 해결 가능하긴 함
 */

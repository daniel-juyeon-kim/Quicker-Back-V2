## 프로젝트 설명

[이전 프로젝트(Quicker)](https://github.com/daniel-juyeon-kim/Quicker_reactJS)에서 부족한 부분을 개선하여 고도화한 프로젝트입니다.

## 수행 내역

### 테스트 코드 작성

#### 문제

리팩토링 과정에서 변경, 추가에 따라 검증에 요구되는 비용이 증가하는 문제가 있었습니다.

- 변경이 발생하면 같은 동작을 보장하기 어려움
- 변경이 발생할 때마다 검증해야 함
- 수작업으로 검증하는 방식은 일시적이고 시간 소모가 큼
- 어디까지 검증했는지 기억하기 어려움

#### 해결

- 구현이나 변경 후 테스트 코드를 작성하여 의도대로 동작하는지 테스트(테스트 커버리지 95.52%)
- 테스트 코드를 통해 지속적이면서 빠른 검증 가능

### Github Action을 통한 CI/CD 파이프라인 구축

#### 문제

- 다른 환경에서도 잘 돌아가는지 테스트 필요
- 코드 리뷰의 부재
- PR 후 수작업으로 서버에 접속해서 업데이트해야 함
  - 만약 같은 파트의 팀원이 있다면 해당 팀원의 PR에 일일이 업데이트해야 함, 이는 개발에 병목이 발생

#### 해결

> **CI/CD 파이프라인**<br>
> PR -> 테스트 -> GPT 코드 리뷰 - PR merge -> 도커 이미지 빌드 -> EC2 인스턴스 배포

- 테스트 과정을 통해 다른 환경에서 검증
- PR 과정에 GPT를 이용한 코드 리뷰 추가
- 도커 이미지 빌드 + EC2 인스턴스 배포 자동화s(5분 -> 0분)

### Docker 설정

#### 문제

- EC2 인스턴스 생성 후, 인스턴스에서 프로젝트를 배포하기 위한 초기 설정을 하는 시간 소모가 큼
- 팀원의 개발 환경이 달라서 문제 발생

#### 해결

- 도커를 통한 배포로 개발자가 인스턴스를 설정하는 시간을 단축(1시간 -> 10분)
- 개발 환경에 사용할 도커 설정 파일을 작성하여 해결

### Sequelize에서 TypeORM으로 변경

#### 문제

- 동시성 문제
- 프로젝트 설계 과정에서 DB 설계에 결함과 불필요한 부분이 존재
- DB 테스트가 로컬 환경에 의존(테스트가 로컬 DB에 의존)
- DB 계층의 에러 핸들링 부족

##### Sequelize를 사용하면서 겪은 문제

- TypeScript를 지원하지만, 상대적으로 불편함
- 알아야 하는 정보와 작성해야 하는 코드가 많음
  - sequelize-auto로 해결하다 보니 해당 라이브러리에 의존적이고 ORM에 대한 이해, 학습 부족

#### 해결

TypeScript를 지원하는 ORM 중 다운로드, 러닝 커브, 데코레이터 지원 때문에 TypeORM을 선택했습니다.

Sequelize에서 TypeORM으로 변경하기 위해 TypeORM을 [테스트](https://github.com/daniel-juyeon-kim/study-typeorm)를 통해 학습했습니다.

- transaction 적용으로 동시성 문제 해결
- 기존 Sequelize로 구현된 부분을 TypeORM으로 재구현하면서 DB 재설계
- 인메모리 DB를 통한 테스트 작성
- repository 계층에서 발생한 문제는 데이터베이스 계층의 에러를 던짐으로써 에러 컨트롤러가 적절하게 처리하도록 수정

### Swagger를 통한 API 문서 작성

#### 문제

- 시간이 지나면서 개발한 API의 응답이 기억나지 않음
- 프론트 인원이 API 연동을 해야 하는 상황에서는 API 문서는 필수
- 기존 API 설계에 결함 존재

#### 해결

API 재설계, Swagger를 통해 API 문서를 작성했습니다.

### 아키텍처 개선

#### 문제

- 비즈니스 로직에 필요한 의존성(레포지토리, 외부 API 등)을 서비스 계층으로 혼동
- 컨트롤러가 여러 가지 작업을 수행(컨트롤러에 요청과 응답, 비지니스 로직이 모여있음)
- 에러 컨트롤의 단순한 에러 처리로 프론트에서는 정확한 에러 핸들링이 어려움

#### 해결

![alt text](<docs/서버 구조 아키텍처.drawio.svg>)

- /service -> /core로 변경
- service 계층 추가
- 에러 컨트롤러가 각 계층의 에러를 핸들링하도록 수정

<details>
  <summary>전 후 비교</summary>

#### 전

```ts
export class ErrorController {
  handler(err: HTTPError, req: Request, res: Response, next: NextFunction) {
    if (err.status === 404) {
      res.send({ error_message: err.message });
      next();
    } else {
      console.error(err);
      slackBot.sendMessage(err);
      res.json({ errorMessage: err.message });
      next();
    }
  }
}
```

#### 후

```ts
export interface ErrorController {
  handleError: ErrorRequestHandler;
}
```

```ts
export class ErrorControllerImpl implements ErrorController {
  private readonly databaseErrorController;
  private readonly unknownErrorController;
  private readonly externalApiErrorController;

  constructor({
    databaseErrorController,
    unknownErrorController,
    externalApiErrorController,
  }: {
    databaseErrorController: DataBaseErrorController;
    unknownErrorController: UnknownErrorController;
    externalApiErrorController: ExternalApiErrorController;
  }) {
    this.databaseErrorController = databaseErrorController;
    this.unknownErrorController = unknownErrorController;
    this.externalApiErrorController = externalApiErrorController;
  }

  handleError = async (error: ErrorTypes, _: Request, res: Response, next: NextFunction) => {
    const date = new Date();

    // 1. 데이터베이스 계층 에러
    this.databaseErrorController.handle({ error, res, date });
    // 2. 외부 api 에러 확인
    await this.externalApiErrorController.handle({ error, res, date });
    // 3. 알 수 없는 에러
    await this.unknownErrorController.handle({ error, res, date });
  };
}
```

```ts
export class DataBaseErrorController implements SubErrorController {
  handle({ error, res, date }: { error: ErrorTypes; res: Response; date: Date }) {
    if (error instanceof DataBaseError) {
      this.handleDuplicateDataError({ error, res });
      this.handleNotExistDataError({ error, res });
      this.handleBusinessRuleConflictDataError({ error, res });
    }
  }

  private handleDuplicateDataError({ error, res }: { error: DataBaseError; res: Response }) {
    if (error instanceof DuplicatedDataError) {
      res.send(new HttpErrorResponse(409, error.message));
    }
  }

  private handleNotExistDataError({ error, res }: { error: DataBaseError; res: Response }) {
    if (error instanceof NotExistDataError) {
      res.send(new HttpErrorResponse(404, error.message));
    }
  }

  private handleBusinessRuleConflictDataError({ error, res }: { error: DataBaseError; res: Response }) {
    if (error instanceof BusinessRuleConflictDataError) {
      res.send(new HttpErrorResponse(422, error.message));
    }
  }
}
```

```ts
export class UnknownErrorController implements SubErrorController {
  private readonly messageBot;
  private readonly logger;

  constructor({ messageBot, logger }: { messageBot: ErrorMessageBot; logger: ErrorLogger }) {
    this.messageBot = messageBot;
    this.logger = logger;
  }

  async handle({ error, res, date }: { error: ErrorTypes; res: Response; date: Date }) {
    if (error instanceof UnknownError) {
      await this.sendSlackMessage({ error, date });
      this.logger.log({ error, date });

      res.send(new HttpErrorResponse(500));
    }
  }

  private async sendSlackMessage({ error, date }: { error: ErrorTypes; date: Date }) {
    try {
      const errorMessage = new ErrorMessage({ date, error });

      await this.messageBot.sendMessage(errorMessage);
    } catch (error) {
      this.logger.log({ error, date });
    }
  }
}
```

```ts
export class ExternalApiErrorController implements SubErrorController {
  private readonly errorMessageBotErrorHandler: ErrorMessageBotErrorHandler;
  private readonly smsApiErrorHandler: SmsApiErrorHandler;
  private readonly tmapApiErrorHandler: TmapApiErrorHandler;

  constructor({
    errorMessageBotErrorHandler,
    smsApiErrorHandler,
    tmapApiErrorHandler,
  }: {
    errorMessageBotErrorHandler: ErrorMessageBotErrorHandler;
    smsApiErrorHandler: SmsApiErrorHandler;
    tmapApiErrorHandler: TmapApiErrorHandler;
  }) {
    this.errorMessageBotErrorHandler = errorMessageBotErrorHandler;
    this.smsApiErrorHandler = smsApiErrorHandler;
    this.tmapApiErrorHandler = tmapApiErrorHandler;
  }

  async handle({ error, res, date }: { error: ErrorTypes; res: Response; date: Date }) {
    if (error instanceof ExternalApiError) {
      this.errorMessageBotErrorHandler.handle({ error, date });
      await this.smsApiErrorHandler.handle({ error, date });
      await this.tmapApiErrorHandler.handle({ error, date });
      res.send(new HttpErrorResponse(502));
    }
  }
}
```

```ts
export class ErrorMessageBotErrorHandler extends AbstractExternalApiErrorHandler {
  constructor(logger: ErrorLogger) {
    super(logger);
  }

  handle({ error, date }: { error: ExternalApiError; date: Date }) {
    if (error instanceof ErrorMessageBotError) {
      this.logger.log({ error, date });
    }
  }
}
```

```ts
export class SmsApiErrorHandler extends CommonExternalApiErrorHandler {
  async handle({ error, date }: { error: ExternalApiError; date: Date }) {
    if (error instanceof SmsApiError) {
      await this.sendErrorMessageBySlack({ error, date });
      this.logger.log({ error, date });
    }
  }
}
```

```ts
export class TmapApiErrorHandler extends CommonExternalApiErrorHandler {
  async handle({ error, date }: { error: ExternalApiError; date: Date }) {
    if (error instanceof TmapApiError) {
      await this.sendErrorMessageBySlack({ error, date });
      this.logger.log({ error, date });
    }
  }
}
```

</details>

### 리팩토링

#### 문제

아래의 코드가 파일 하나로 작성되어 있어서 테스트, 유지보수에 어려움이 있었습니다.

- 월간 거리당 평균 의뢰금을 계산하는 스케줄러
- PATCH /order/{orderId}/delivery-person의 서비스

#### 해결

<details>
    <summary>월간 거리당 평균 의뢰금을 계산하는 스케줄러</summary>

#### 전

```ts
import dotenv from "dotenv";
dotenv.config({path : "../../.env"})

import config from "../../config";
import { averageInstance, cacheOrderInstance, locationInstance } from "../../maria/commands";
import sequelizeConnector from "../../maria/connector/sequelize-connector";
import { AverageOfCostAttributes, initModels } from "../../maria/models/init-models";
import { blockChain, tmapApi } from "../../service";
// 설정
initModels(sequelizeConnector);

type Km = ({
  orderId: number;
  km: number;
} | undefined)

type BlockChain = ({
  orderNumber: number;
  price: number;
} | undefined)

type Distance = "5KM" | "10KM" | "15KM" | "20KM" | "25KM" | "30KM" | "40KM" | "50KM" | "60KM" | "60+KM"

interface Combine {
  price: number | undefined;
  orderId?: number | undefined;
  km?: number | undefined;
}

class MonthGenerator {
  getFirstDay (month : number) {
    const date = new Date();
    date.setMonth(month);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date
  }
}

class Converter {
  private distanceUnits = [5, 10, 15, 20, 25, 30, 40, 50, 60]
  removeCurlBrackets (order : {id : number , [key : string] : any}[]) {
    const idList: number[] = [];
    order.map((order) => {
      idList[idList.length]=order.id
    });
    return idList;
  }
  
  combineById (kms : Km [] , blockChains : BlockChain []) {
    const result = [];
    for (const distance of kms) {
      for (const blockChain of blockChains) {
        if (distance?.orderId === blockChain?.orderNumber) {
          result[result.length] = {
            ...distance,
            price: blockChain?.price,
          };
          break;
        }
      }
    }
    return result;
  }

  convertCountList (template : Template ,combine : Combine []) {
    const countList = template.getAverageOfCostAttributesTemplate()

    combine.map((element) => {
      for (const unit of this.distanceUnits) {
        if (element.km && element.price && element.orderId) {
          if (element.km > 60) {
            countList["60+KM"] += 1
            break;
          }
          else if (element.km < unit) {
            const key = unit + "KM" as Distance
            countList[key] += 1
            break;
          }
        }
      }
    })
    return countList
  }

  convertSumList (template : Template, combine : Combine []) {
    const sumList = template.getAverageOfCostAttributesTemplate()

    combine.map((element) => {
      for (const unit of this.distanceUnits) {
        if (element.km && element.price && element.orderId) {
          if (element.km > 60) {
            sumList["60+KM"] += element.price
            break;
          }
          else if (element.km < unit) {
            const key = unit + "KM" as Distance
            sumList[key] += element.price
            break;
          }
        }
      }
    })
    return sumList
  }
}

class StateChecker {
  returnFulfilled(promiseDistances : PromiseSettledResult<{
    orderId: number;
    km: number;
  }>[]) {
    return promiseDistances.map((promiseDistance) => {
      if (promiseDistance.status === 'fulfilled') return promiseDistance.value
    })
  }
}

class AverageCostCalculator {
  calculateAverage (template : Template, {countList, sumList} : {[key : string] : AverageOfCostAttributes}) {
    const averageTemp = template.getAverageOfCostAttributesTemplate()
    for (const key in countList) {
      if (key !== "date") {
        const unit = key as Distance  
        if (sumList[unit] !== 0) {
          averageTemp[unit] = Math.round(sumList[unit] / countList[unit]);
        }
      }
    }
    return averageTemp
  }
}

class Template {
  getAverageOfCostAttributesTemplate () {
    return {
      date: new Date().toISOString(),
      "5KM": 0,
      "10KM": 0,
      "15KM": 0,
      "20KM": 0,
      "25KM": 0,
      "30KM": 0,
      "40KM": 0,
      "50KM": 0,
      "60KM": 0,
      "60+KM": 0,
    };
  }
}

export const main = async () => {
  const converter = new Converter()
  const stateChecker = new StateChecker()
  const calculator = new AverageCostCalculator()
  const monthGenerator = new MonthGenerator()
  const template = new Template()
  
  const startDate = monthGenerator.getFirstDay(new Date().getMonth() - 1)
  const endDate = monthGenerator.getFirstDay(new Date().getMonth())

  const orderIds = await cacheOrderInstance.findAllId(startDate, endDate)
  const filteredOrderIds = converter.removeCurlBrackets(orderIds)

  const locations = await locationInstance.findAll(filteredOrderIds) 
  const prices = await blockChain.getOrderPrices(filteredOrderIds)
  
  if (filteredOrderIds.length !== 0 || prices.length !== 0) {
    const distances = await tmapApi.requestRouteDistances(locations , config.tmap.apiKey as string)
    const fulfilledDistances = stateChecker.returnFulfilled(distances)
    const combinedData = converter.combineById(fulfilledDistances, prices)

    const countList = converter.convertCountList(template,combinedData)
    const sumList = converter.convertSumList(template, combinedData)
    const average = calculator.calculateAverage(template, {countList,sumList})  
    await averageInstance.create(average);
  }
};
```

#### 후

- Sequelize에서 import -> Typeorm repository DI로 변경
- 테스트 추가

##### 설계

```markdown

- [x] /cron
  - [x] CronService({ ErrorMessageBot, DataService, TableService })
    - [x] run()
  - [x] /data
    - [x] DataService
      - [x] findAllLastMonthOrderPriceAndDistance(date: Date): {id: number; km: number; price: number }[]
      - [x] saveAverageTable(table: Table) : void
    - [x] 내부 데이터, DB
      - [x] 평균 테이블 저장, saveAverageTable(table: Table)
      - [x] 주문 아이디 조회, findAllLastMonthOrderId(startDate: Date, endDate: Date): number[]
      - [x] 출발지 도착지 정보 조회, findAllDestinationDeparture(ids: number[]): DestinationDepartureLocation[]
    - [x] 외부 데이터, ExternalApi
      - [x] 금액 조회, findAllPriceByIds(ids: number[]) => {orderNumber: number; price: number;}[]
      - [x] 거리 조회, findAllDistance(locations: DestinationDepartureLocation[] ): {orderId: number; km: number;}[]
    - [x] Combiner(거리와 금액을, id를 기준으로 통합한 주문 정보 생성)
      - [x] id로 주문 정보 통합, combineById(prices: Price[], distances: Distance[]): {id: number, km: number, price: number}[]
  - [x] /table
    - [x] 테이블과 관련된 내용 처리 TableService
      - [x] 각 거리당 평균을 계산한 테이블 생성, createAverageTable(PriceAndDistance[]): Table
    - [x] AbstractTable
      - [x] 빈 테이블 생성, protected createTable(): Table
    - [x] SumTable(합 테이블)
      - [x] 생성, create(OrderInfo[]): Table
    - [x] CountTable(카운트 테이블)
      - [x] 생성, create(OrderInfo[]): Table
    - [x] AverageTable(평균 테이블)
      - [x] 생성, create(sumTable: Table, countTable: Table): table
  - [x] /types, 각종 타입 관리
```

</details>

<details>
  <summary>PATCH /order/{orderId}/delivery-person</summary>

#### 전

```ts
import { Crypto } from "./cryto";
import { cacheOrderInstance, orderInstance, roomInstance, userInstance } from "../maria/commands";
import { NHNAPI } from "./nhn-api";

export const updateOrder = async (body: any, nhnApi : NHNAPI, cryptoInstance : Crypto, cryptoKey : string) => {
  const userWalletAddress = body.userWalletAddress;
  const orderId = body.orderId;

  const deliver = await userInstance.findId(userWalletAddress);

  if (deliver === null) {
    throw new Error("회원이 아님");
  }

  await orderInstance.update(deliver.id, orderId);
  cacheOrderInstance.create(orderId);

  const requesterId = await orderInstance.findRequesterId(orderId);

  if (requesterId === null) {
    throw new Error("의뢰인 아이디를 찾을 수 없습니다.");
  }

  await roomInstance.create(orderId, deliver.id, requesterId.ID_REQ);

  const receiverPhoneNumber = await orderInstance.findReceiverPhoneNumber(orderId);

  if (receiverPhoneNumber === null) {
    throw new Error("수취인의 전화번호에 대한 정보가 없습니다.");
  }
  const encryptedUrl = cryptoInstance.encrypt(body, cryptoKey);

  const url = process.env.CLIENT_SERVER_DOMAIN + "receipient/?key=" + encryptedUrl;

  const messageBody = nhnApi.generateIncludeUrlBody(url, receiverPhoneNumber.PHONE)

  await nhnApi.sendMessage(messageBody)
};

export const classifyDistance = async (query: any) => {
  type Distance =
    | "5KM"
    | "10KM"
    | "15KM"
    | "20KM"
    | "25KM"
    | "30KM"
    | "40KM"
    | "50KM"
    | "60KM"
    | "60+KM";
  let classifiedDistance: Distance = "5KM";
  const distance: number = query.distance;
  const classifyDistance = (distance: number) => {
    const listDistance = [5, 10, 15, 20, 25, 30, 40, 50, 60];
    for (const distanceUnit of listDistance) {
      if (distance <= distanceUnit) {
        return (distanceUnit + "KM") as Distance;
      } else if (60 < distance) {
        return "60+KM" as Distance;
      }
    }
  };
  classifiedDistance = classifyDistance(distance) as Distance;
  return classifiedDistance;
};
```

#### 후

```ts
export class DeliveryPersonService {
  private readonly dataSource: DataSource;
  private readonly orderRepository: OrderRepository;
  private readonly receiverRepository: ReceiverRepository;
  private readonly deliverUrlMessage: DeliveryUrlMessage;
  private readonly deliveryPersonMatchedDateRepository: DeliveryPersonMatchedDateRepository;
  private readonly currentDeliveryLocationRepository: CurrentDeliveryLocationRepository;

  constructor({
    dataSource,
    orderRepository,
    receiverRepository,
    deliveryUrlMessage,
    deliveryPersonMatchedDateRepository,
    currentDeliveryLocationRepository,
  }: {
    dataSource: DataSource;
    orderRepository: OrderRepository;
    receiverRepository: ReceiverRepository;
    deliveryPersonMatchedDateRepository: DeliveryPersonMatchedDateRepository;
    deliveryUrlMessage: DeliveryUrlMessage;
    currentDeliveryLocationRepository: CurrentDeliveryLocationRepository;
  }) {
    this.dataSource = dataSource;
    this.orderRepository = orderRepository;
    this.receiverRepository = receiverRepository;
    this.deliverUrlMessage = deliveryUrlMessage;
    this.deliveryPersonMatchedDateRepository = deliveryPersonMatchedDateRepository;
    this.currentDeliveryLocationRepository = currentDeliveryLocationRepository;
  }

  ...

  async matchDeliveryPersonAtOrder({
    orderId: stringTypeOrderId,
    walletAddress,
  }: {
    orderId: string;
    walletAddress: string;
  }) {
    await this.dataSource.transaction(async (manager) => {
      const orderId = parseInt(stringTypeOrderId);

      await this.orderRepository.updateDeliveryPersonAtOrder(manager, { orderId, walletAddress });
      await this.deliveryPersonMatchedDateRepository.create(manager, orderId);
      const receiver = await this.receiverRepository.findPhoneNumberByOrderId(manager, orderId);

      await this.deliverUrlMessage.sendToReceiver(receiver, { orderId, walletAddress });
    });
  }
}
```

```ts
export class OrderRepositoryImpl extends AbstractRepository implements OrderRepository {
  constructor(private readonly repository: Repository<Order>) {
    super();
  }

  async updateDeliveryPersonAtOrder(
    manager: Parameters<OrderRepository["updateDeliveryPersonAtOrder"]>[0],
    { orderId, walletAddress }: Parameters<OrderRepository["updateDeliveryPersonAtOrder"]>[1],
  ) {
    try {
      const deliverPerson = await manager.findOneBy(User, { walletAddress });

      if (isNull(deliverPerson)) {
        throw new NotExistDataError(`${walletAddress} 에 대응되는 사용자가 존재하지 않습니다.`);
      }

      const order = await manager.findOne(Order, {
        relations: { requester: true },
        select: {
          requester: { walletAddress: true },
        },
        where: { id: orderId },
      });

      if (isNull(order)) {
        throw new NotExistDataError(`${orderId} 에 대응되는 주문이 존재하지 않습니다.`);
      }

      if (deliverPerson.walletAddress === order.requester.walletAddress) {
        throw new BusinessRuleConflictDataError(`${walletAddress}가 의뢰인의 지갑주소와 동일합니다.`);
      }

      await manager.update(Order, { id: orderId }, { deliveryPerson: deliverPerson });
    } catch (error) {
      if (error instanceof NotExistDataError) {
        throw error;
      } else if (error instanceof BusinessRuleConflictDataError) {
        throw error;
      }
      throw new UnknownDataBaseError(error);
    }
  }
  ...
}
```

```ts
export class DeliveryPersonMatchedDateRepository extends AbstractRepository {
  constructor(private readonly repository: Repository<DeliveryPersonMatchedDate>) {
    super();
  }

  async create(manager: EntityManager, orderId: number) {
    try {
      const existMatchedDate = await manager.findOneBy(DeliveryPersonMatchedDate, { id: orderId });

      if (!isNull(existMatchedDate)) {
        throw new DuplicatedDataError(`${orderId}에 대해 중복된 데이터가 존재합니다.`);
      }

      const matchedDate = new DeliveryPersonMatchedDate();
      matchedDate.id = orderId;

      await manager.insert(DeliveryPersonMatchedDate, matchedDate);
    } catch (error) {
      if (error instanceof DuplicatedDataError) {
        throw error;
      }
      throw new UnknownDataBaseError(error);
    }
  }
  ...
}
```

```ts
export class ReceiverRepository extends AbstractRepository {
  async findPhoneNumberByOrderId(manager: EntityManager, orderId: number) {
    try {
      const receiver = await manager.findOne(Receiver, {
        select: {
          id: true,
          phone: true,
        },
        where: { id: orderId },
      });

      this.validateNotNull(receiver);

      return receiver;
    } catch (error) {
      if (error instanceof NotExistDataError) {
        throw new NotExistDataError(`${orderId} 에 해당되는 데이터가 존재하지 않습니다.`);
      }
      throw new UnknownDataBaseError(error);
    }
  }
}
```

```ts
export class DeliveryUrlMessage {
  private readonly smsApi: SmsApi;
  private readonly urlCreator: DeliveryUrlCreator;

  constructor({ smsApi, urlCreator }: { smsApi: SmsApi; urlCreator: DeliveryUrlCreator }) {
    this.smsApi = smsApi;
    this.urlCreator = urlCreator;
  }

  async sendToReceiver(receiver: Receiver, body: { orderId: number; walletAddress: string }) {
    const url = this.urlCreator.createUrl(body);

    await this.smsApi.sendDeliveryTrackingMessage(url, receiver.phone);
  }
}
```

</details>

### 기타

- ESLint, Prettier를 이용한 코드 포멧팅
- 요청 데이터에 대한 유효성 검사
- HTTP 응답 코드, 메시지로 프론트에 명확한 응답을 보내도록 수정

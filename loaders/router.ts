import { Application } from "express";
import swaggerUi from "swagger-ui-express";

import { errorController } from "../controllers";
import notFound from "../routes/not-found";

import chat from "../routes/chat";
import order from "../routes/order";
import user from "../routes/user";
import swaggerDocumentV1 from "../swagger.v1.json";
import swaggerDocumentV2 from "../swagger.v2.json";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => console.log("dataSource 초기화 완료"))
  .catch((error) => {
    console.error("dataSource 초기화 실패");
    throw error;
  });

export const router = {
  routing: (app: Application) => {
    // 서비스용 라우터
    app.use("/chat", chat);
    app.use("/user", user);
    app.use("/orders", order);

    // 블록체인 라우터
    // app.use("/caver", caverLimiter, Caver);

    // api 문서
    app.use("/api-docs/v1", swaggerUi.serveFiles(swaggerDocumentV1), swaggerUi.setup(swaggerDocumentV1));
    app.use("/api-docs/v2", swaggerUi.serveFiles(swaggerDocumentV2), swaggerUi.setup(swaggerDocumentV2));

    // 존재하지 않는 라우트
    app.use("*", notFound);

    // 에러 컨트롤러
    app.use(errorController.handleError);
  },
} as const;

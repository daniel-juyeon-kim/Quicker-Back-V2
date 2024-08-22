import { Application } from "express";

import { errorController } from "../controllers";
import { caverLimiter } from "../middlewares";
import {
  Caver,
  associateOrder,
  averageCost,
  currentLocation,
  home,
  notFound,
  order,
  orders,
  register,
  room,
  user,
} from "../routes";

const routing = (app: Application) => {
  // 개발용 라우터
  app.use("/", home);
  app.use("/AssociateOrder", associateOrder);

  // 서비스용 라우터
  app.use("/room", room);
  app.use("/user", user);
  app.use("/order", order);
  app.use("/orders", orders);
  app.use("/register", register);
  app.use("/current-deliver-location", currentLocation);
  app.use("/average", averageCost);

  // 블록체인 라우터
  app.use("/caver", caverLimiter, Caver);

  // 에러 컨트롤러
  app.use("*", notFound);
  app.use(errorController);
};

export default routing;

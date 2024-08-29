import express from "express";

import chat from "./chat/socket";
import { config } from "./config";

import setUpMiddleware from "./loaders/middleware";
import initializePort from "./loaders/port";
import routing from "./loaders/router";

const startServer = () => {
  const app = express();

  setUpMiddleware(app);
  routing(app);
  const server = initializePort(app, config.port);

  // 채팅 서버
  chat(server);
};

startServer();

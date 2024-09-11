import express from "express";

import chat from "./chat/socket";
import { config } from "./config";
import { middleware, port, router } from "./loaders";

const server = {
  start: () => {
    const app = express();

    middleware.init(app);
    router.routing(app);
    const serverInstance = port.init(app, config.port);

    // 채팅 서버
    chat(serverInstance);
  },
} as const;

server.start();

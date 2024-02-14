import express from "express";

import chat from "./chat/socket";
import router from "./loaders/express";
import loader from "./loaders/loader";
import port from "./loaders/port";

const startServer = () => {
    const app = express();

    loader.init(app);

    router.handle(app);
    
    const server = port.init(app)
    
    chat(server)
}

startServer();

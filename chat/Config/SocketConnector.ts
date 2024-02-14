require("dotenv").config();

const { Server } = require("socket.io");

export default (server: any) => {
  return new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
};

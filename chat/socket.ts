import { Server } from "socket.io";
import { chatMessageRepository } from "../database";

const main = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket"],
    connectionStateRecovery: {},
  });

  try {
    // 이벤트 설정
    io.on("connect", (socket) => {
      console.log(`connect ${socket.id}`);
      console.log("접속 : " + socket.id);
      // 임의의 채팅방 이름
      let roomName = "";
      // 이벤트 관리
      socket.on("joinRoom", async (receiveRoomName: receiveRoomName) => {
        roomName = receiveRoomName.roomName;
        socket.join(roomName);
        // db 내용 불러옴
        try {
          const messages = await chatMessageRepository.findAllMessageByOrderId(parseInt(roomName));

          if (messages !== undefined) {
            socket.emit("loadMessage", messages);
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      });
      socket.on("sendMessage", (receiveMessage: Message, done: Function) => {
        // 해당 방에 전부 메세지 보냄
        // 메세지, 아이디, 시간 포함
        socket.to(roomName).emit("sendMessage", {
          id: receiveMessage.sender,
          message: receiveMessage.data,
          date: new Date().toISOString(),
        });
        try {
          chatMessageRepository.saveMessage(parseInt(roomName), {
            walletAddress: receiveMessage.sender,
            message: receiveMessage.data,
            date: new Date(),
          });
          done();
        } catch (error) {
          console.log(error);
          throw error;
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
};

interface Message {
  data: string;
  sender: string;
}

interface receiveRoomName {
  roomName: string;
}

export default main;

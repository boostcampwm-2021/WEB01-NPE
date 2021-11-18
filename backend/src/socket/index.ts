import * as socketio from "socket.io";
import { verify } from "jsonwebtoken";

interface SessionUser {
  userId: number;
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: string;
}

const roomUsers: Record<string, object[]> = {};

export default (io: socketio.Server) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    const user = verify(token, "keyboard cat") as SessionUser;
    next();
  });

  io.on("connection", (socket) => {
    console.log(socket.id + " is connected");

    socket.on("joinRoom", ({ questionId }: { questionId: string }) => {
      const token = socket.handshake.auth.token;
      const user = verify(token, "keyboard cat") as SessionUser;

      // 4명 미만인지 확인. 4명 이상이면 disconnect
      if (!roomUsers[questionId]) {
        roomUsers[questionId] = [user];
      } else if (roomUsers[questionId].length >= 4) {
        socket.disconnect();
        return;
      } else {
        roomUsers[questionId].push(user);
      }

      const roomName = questionId;
      socket.join(roomName);
    });

    socket.on("disconnect", (reason) => {
      console.log(socket.id + " is disconnected. reason : " + reason);
    });
  });
};

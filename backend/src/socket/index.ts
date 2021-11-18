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

// roomId to user Object
const roomUsers: Record<string, SessionUser[]> = {};
// userId to roomId
const usersRoom: Record<string, string> = {};

export default (io: socketio.Server) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    const user = verify(token, "keyboard cat") as SessionUser;
    if (!user) return;
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
        usersRoom[user.userId] = questionId;
      } else if (roomUsers[questionId].length >= 4) {
        socket.disconnect();
        return;
      } else {
        roomUsers[questionId].push(user);
        usersRoom[user.userId] = questionId;
      }

      const roomName = questionId;
      socket.join(roomName);
    });

    socket.on("disconnect", (reason) => {
      console.log(socket.id + " is disconnected. reason : " + reason);

      const token = socket.handshake.auth.token;
      const user = verify(token, "keyboard cat") as SessionUser;
      const userId = user.userId;
      const roomId = usersRoom[userId];

      roomUsers[roomId] = roomUsers[roomId].filter(
        (user) => user.userId !== userId
      );
      delete usersRoom[userId];
      console.log(`room ${roomId} -> ${roomUsers[roomId].length} users left`);
    });
  });
};

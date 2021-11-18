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
    //console.log(socket.id + " is connected");

    socket.on("joinRoom", ({ questionId }: { questionId: string }) => {
      const token = socket.handshake.auth.token;
      const user = verify(token, "keyboard cat") as SessionUser;

      const roomName = questionId;
      // 4명 미만인지 확인. 4명 이상이면 disconnect
      if (!roomUsers[roomName]) {
        roomUsers[roomName] = [user];
        usersRoom[user.userId] = roomName;
      } else if (roomUsers[roomName].length >= 4) {
        socket.disconnect();
        return;
      } else {
        roomUsers[roomName].push(user);
        usersRoom[user.userId] = roomName;
      }

      socket.join(roomName);
      console.log(
        `${user.user.name} joining ${roomName} -> ${roomUsers[roomName].length}/4`
      );
    });

    socket.on("disconnect", (reason) => {
      //console.log(socket.id + " is disconnected. reason : " + reason);

      const token = socket.handshake.auth.token;
      const user = verify(token, "keyboard cat") as SessionUser;
      const userId = user.userId;
      const roomName = usersRoom[userId];

      roomUsers[roomName] = roomUsers[roomName].filter(
        (user) => user.userId !== userId
      );
      delete usersRoom[userId];
      console.log(
        `${user.user.name} leaving ${roomName} -> ${roomUsers[roomName].length}/4`
      );
    });
  });
};

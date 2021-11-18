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
interface UsersType {
  [roomName: string]: {
    [socketId: string]: SessionUser;
  };
}

const users: UsersType = {};

export default (io: socketio.Server) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    const user = verify(token, "keyboard cat") as SessionUser;
    console.log(user);
    next();
  });

  io.on("connection", (socket) => {
    console.log(socket.id + " is connected");
    let roomName = "";
    socket.on("joinRoom", ({ questionId }: { questionId: string }) => {
      roomName = questionId;
      socket.join(roomName);
      const token = socket.handshake.auth.token;
      const user = verify(token, "keyboard cat") as SessionUser;
      if (users[roomName] === undefined) {
        users[roomName] = {};
      }
      users[roomName][socket.id] = user;
      socket.emit("init users", users[roomName]);
      socket.to(roomName).emit("user join", [socket.id, user]);
    });
    socket.on("disconnect", (reason) => {
      // delete users[roomName][socket!.id];
      console.log(socket.id + " is disconnected. reason : " + reason);
    });

    socket.on("chat", (chatItem) => {
      console.log(roomName);
      console.log(roomName, chatItem);
      io.to(roomName).emit("chat", chatItem);
    });
  });
};

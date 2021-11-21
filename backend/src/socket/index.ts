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
    if (!user) return;
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
      socket.emit("init users", [
        users[roomName],
        Object.keys(users[roomName]).length,
      ]);
      socket.to(roomName).emit("user join", [socket.id, user]);
    });
    socket.on("disconnect", (reason) => {
      const userName = users[roomName][socket!.id].user.name;
      io.to(roomName).emit("user exit", [socket!.id, userName]);
      delete users[roomName][socket!.id];
      console.log(socket.id + " is disconnected. reason : " + reason);
    });

    socket.on("chat", (chatItem) => {
      io.to(roomName).emit("chat", chatItem);
    });

    socket.emit("me", socket.id);

    socket.on("callUser", (data) => {
      console.log("to", data.userToCall);
      io.to(data.userToCall).emit("callUser", {
        signal: data.signalData,
        from: data.from,
        name: data.name,
      });
    });

    socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal);
    });
  });
};

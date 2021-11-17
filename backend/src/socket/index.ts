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

export default (io: socketio.Server) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    const user = verify(token, "keyboard cat") as SessionUser;
    console.log(user);
    next();
  });

  io.on("connection", (socket) => {
    console.log(socket.id + " is connected");

    socket.on("joinRoom", ({ questionId }: { questionId: string }) => {
      const roomName = questionId;
      socket.join(roomName);
    });

    socket.on("disconnect", (reason) => {
      console.log(socket.id + " is disconnected. reason : " + reason);
    });
  });
};

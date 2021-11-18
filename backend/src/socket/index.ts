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

let users = {};
export default (io: socketio.Server) => {
  io.on("connection", (socket) => {
    console.log(socket.id + " is connected");

    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded");
    });

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

    // socket.on("disconnect", (reason) => {
    //   console.log(socket.id + " is disconnected. reason : " + reason);
    // });
  });
};

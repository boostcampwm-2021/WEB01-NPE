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
interface CodeType {
  tabList: string[];
  index: string;
}

const users: UsersType = {};
const codes: CodeType = { tabList: [], index: "0" };
let streamUserList: string[] = [];

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
      socket.emit("init users", users[roomName]);
      socket.to(roomName).emit("user join", [socket.id, user]);
      io.to(roomName).emit("user count", Object.keys(users[roomName]).length);
    });
    socket.on("disconnect", (reason) => {
      const userName = users[roomName][socket!.id].user.name;
      io.to(roomName).emit("user exit", [socket!.id, userName]);
      delete users[roomName][socket!.id];
      io.to(roomName).emit("user count", Object.keys(users[roomName]).length);
      console.log(socket.id + " is disconnected. reason : " + reason);
    });

    socket.on("chat", (chatItem) => {
      io.to(roomName).emit("chat", chatItem);
    });
    socket.on("stream:join", () => {
      if (!streamUserList.includes(socket.id)) {
        streamUserList.push(socket.id);
      }
      io.sockets.to(socket.id).emit("stream:userList", streamUserList);
    });

    socket.on("stream:disconnect", () => {
      streamUserList = streamUserList.filter(
        (socketId) => socketId !== socket.id
      );
      io.sockets.to(socket.id).emit("stream:userList", streamUserList);
    });

    socket.on("stream:candidate", (data) => {
      socket.to(data.receiveSocketId).emit("stream:receiveCandidate", {
        candidate: data.candidate,
        sendSocketId: data.sendSocketId,
      });
    });

    socket.on("stream:offer", (data) => {
      socket.to(data.receiveSocketId).emit("stream:receiveOffer", {
        sdp: data.sdp,
        sendSocketId: data.sendSocketId,
      });
    });
    socket.on("stream:answer", (data) => {
      socket.to(data.receiveSocketId).emit("stream:receiveAnswer", {
        sdp: data.sdp,
        sendSocketId: data.sendSocketId,
      });
    });

    socket.on("code", (code) => {
      if (code.tabList !== undefined) {
        codes.tabList = [...code.tabList];
        codes.index = code.index;
      }
      io.to(roomName).emit("code", codes);
    });
  });
};

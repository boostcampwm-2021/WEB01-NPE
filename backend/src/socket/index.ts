import * as socketio from "socket.io";
import { verify } from "jsonwebtoken";

interface SessionUser {
  userId: number;
  user: {
    name: string;
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
  [roomName: string]: {
    tabList: string[];
    index: string;
  };
}

interface UsersType2 {
  [roomName: string]: string[];
}
let streamUsers: any = [];

let test: UsersType2 = {};
const users: UsersType = {};
const codes: CodeType = {};
export default (io: socketio.Server) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    const user = verify(token, "keyboard cat") as SessionUser;
    if (!user) return;
    next();
  });

  io.on("connection", (socket) => {
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

    socket.on("chat", (chatItem) => {
      io.to(roomName).emit("chat", chatItem);
    });

    socket.on("code", (code) => {
      if (codes[roomName] === undefined) {
        codes[roomName] = { tabList: [], index: "0" };
      }
      if (code.tabList !== undefined) {
        codes[roomName].tabList = [...code.tabList];
        codes[roomName].index = code.index;
      }
      io.to(roomName).emit("code", codes[roomName]);
    });

    socket.on("join", () => {
      console.log("join!!");
      if (test[roomName] === undefined) {
        test[roomName] = [socket.id];
      } else {
        test[roomName].push(socket.id);
      }

      io.to(socket.id).emit("all_users", test[roomName]);
    });
    socket.on("sendMessage", (msg) => {
      console.log(msg);
      const data = { id: socket.id, msg };
      io.emit("respondMessage", msg);
    });

    socket.on("disconnect", () => {
      const userName = users[roomName][socket!.id].user.name;
      io.to(roomName).emit("user exit", [socket!.id, userName]);
      delete users[roomName][socket!.id];
      io.to(roomName).emit("user count", Object.keys(users[roomName]).length);
      test[roomName] = test[roomName].filter((user: any) => user !== socket.id);
      io.emit("user_exit", { id: socket.id });
    });

    socket.on("offer", (data) => {
      socket
        .to(data.offerReceiveID)
        .emit("getOffer", { sdp: data.sdp, offerSendID: data.offerSendID });
    });
    socket.on("answer", (data) => {
      socket
        .to(data.answerReceiveID)
        .emit("getAnswer", { sdp: data.sdp, answerSendID: data.answerSendID });
    });
    socket.on("candidate", (data) => {
      socket.to(data.candidateReceiveID).emit("getCandidate", {
        candidate: data.candidate,
        candidateSendID: data.candidateSendID,
      });
    });
  });
};
